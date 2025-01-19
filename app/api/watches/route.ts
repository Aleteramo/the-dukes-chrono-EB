import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';
import { promises as fsPromises } from 'fs';


// Enum types for watch properties
type WatchCondition = 'NEW' | 'EXCELLENT' | 'VERY_GOOD' | 'GOOD' | 'FAIR' | 'FOR_PARTS';
type WatchStatus = 'AVAILABLE' | 'SOLD' | 'RESERVED';

// Configuration constants
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'watches');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Utility functions for safe data extraction and validation
function safeGetString(formData: FormData, key: string, defaultValue: string = ''): string {
  const value = formData.get(key)?.toString().trim();
  return value && value.length > 0 ? value : defaultValue;
}

function safeGetYear(formData: FormData, key: string): number {
  const value = formData.get(key)?.toString();
  const year = value ? parseInt(value, 10) : new Date().getFullYear();
  return year >= 1900 && year <= new Date().getFullYear() ? year : new Date().getFullYear();
}

function safeGetPrice(formData: FormData, key: string): number {
  const value = formData.get(key)?.toString();
  const price = value ? parseFloat(value) : 0;
  return price > 0 ? price : 0;
}

const safeGetCondition = (formData: FormData, key: string): WatchCondition => {
  const value = formData.get(key)?.toString().toUpperCase();
  const validConditions: WatchCondition[] = ['NEW', 'EXCELLENT', 'VERY_GOOD', 'GOOD', 'FAIR', 'FOR_PARTS'];
  if (value && validConditions.includes(value as WatchCondition)) {
    return value as WatchCondition;
  }
  return 'EXCELLENT'; // default value
};

// Slug generation utility
function generateSlug(brand: string, model: string): string {
  return `${brand}-${model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Image validation and saving utilities
async function validateImage(file: File): Promise<{ isValid: boolean; error?: string }> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type for ${file.name}. Allowed types: JPEG, PNG, WebP, GIF`
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File ${file.name} too large. Maximum size is 10MB`
    };
  }

  return { isValid: true };
}

async function saveImage(file: File): Promise<string> {
  try {
    // Validate the image first
    const validationResult = await validateImage(file);
    if (!validationResult.isValid) {
      throw new Error(validationResult.error || 'Invalid image');
    }

    // Create unique filename
    const uniqueFileName = `${uuidv4()}_${file.name.replace(/\s+/g, '_')}`;
    const fullPath = path.join(UPLOAD_DIR, uniqueFileName);

    // Ensure upload directory exists
    await mkdir(UPLOAD_DIR, { recursive: true });

    // Convert File to Uint8Array and save
    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);

    // Ensure directory is writable
    try {
      await writeFile(fullPath, buffer, { 
        mode: 0o755 // Ensure write permissions
      });
    } catch (writeError) {
      console.error('Detailed file write error:', {
        errorMessage: writeError instanceof Error ? writeError.message : 'Unknown write error',
        filePath: fullPath,
        fileSize: buffer.length,
        uploadDir: UPLOAD_DIR
      });
      throw new Error(`Failed to write file to ${fullPath}: ${writeError instanceof Error ? writeError.message : 'Unknown write error'}`);
    }

    // Verify file was written successfully
    const stats = await fsPromises.stat(fullPath);
    if (stats.size !== buffer.length) {
      throw new Error(`File size mismatch. Expected ${buffer.length} bytes, wrote ${stats.size} bytes`);
    }

    // Return the public URL with the correct path
    return `/images/watches/${uniqueFileName}`;
  } catch (error) {
    console.error('Complete image save error:', {
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size
    });
    throw new Error(`Failed to save image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}


// Comprehensive field validation
async function validateFields(formData: FormData): Promise<string[]> {
  const errors: string[] = [];

  // Required fields validation
  const requiredFields = ['brand', 'model', 'categoryId', 'year', 'price', 'condition'];
  requiredFields.forEach(field => {
    const value = formData.get(field)?.toString().trim();
    if (!value || value.length === 0) {
      errors.push(`${field} is required`);
    }
  });

  // Brand and model length validation
  const brand = safeGetString(formData, 'brand');
  const model = safeGetString(formData, 'model');
  
  if (brand.length < 2 || brand.length > 50) {
    errors.push('Brand must be between 2 and 50 characters');
  }

  if (model.length < 2 || model.length > 100) {
    errors.push('Model must be between 2 and 100 characters');
  }

  // Price validation
  const price = safeGetPrice(formData, 'price');
  if (price < 0 || price > 1000000) {
    errors.push('Price must be between 0 and 1,000,000');
  }

  // Year validation
  const year = safeGetYear(formData, 'year');
  if (year < 1900 || year > new Date().getFullYear()) {
    errors.push(`Year must be between 1900 and ${new Date().getFullYear()}`);
  }

  return errors;
}

// Image processing utility
async function processImages(formData: FormData): Promise<{ 
  urls: string[]; 
  errors: string[]; 
}> {
  const imageUrls: string[] = [];
  const imageErrors: string[] = [];

  // Collect image files
  const imageFiles = formData.getAll('images') as File[];

  for (const file of imageFiles) {
    if (file.size > 0) {
      try {
        const validationResult = await validateImage(file);
        
        if (!validationResult.isValid) {
          imageErrors.push(validationResult.error || 'Invalid image');
          continue;
        }

        const savedImageUrl = await saveImage(file);
        imageUrls.push(savedImageUrl);
      } catch (error) {
        imageErrors.push(`Image processing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }

  return { urls: imageUrls, errors: imageErrors };
}

// Main POST handler for watch creation
export async function POST(req: NextRequest) {
  console.group('Watch Creation API');
  console.log('Received request at:', new Date().toISOString());

  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session ? 'Authenticated' : 'Not Authenticated');

    if (!session?.user) {
      console.log('Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure upload directory exists
    await mkdir(UPLOAD_DIR, { recursive: true });
    const formData = await req.formData();
   
    // Log received data
    for (const [key, value] of Array.from(formData.entries())) {
      console.log(`Received ${key}:`, value);
    }

    // Validate fields and process images
    const fieldErrors = await validateFields(formData);
    if (fieldErrors.length > 0) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: fieldErrors 
      }, { status: 400 });
    }

    const { urls: imageUrls, errors: imageErrors } = await processImages(formData);
    if (imageErrors.length > 0) {
      return NextResponse.json({ 
        error: 'Image processing failed', 
        details: imageErrors 
      }, { status: 400 });
    }

    // Create watch in database
    const watch = await prisma.watch.create({
      data: {
        brand: safeGetString(formData, 'brand'),
        model: safeGetString(formData, 'model'),
        description: safeGetString(formData, 'description'),
        year: safeGetYear(formData, 'year'),
        price: safeGetPrice(formData, 'price'),
        material: safeGetString(formData, 'material'),
        movement: safeGetString(formData, 'movement'),
        condition: safeGetCondition(formData, 'condition'),
        slug: generateSlug(
          safeGetString(formData, 'brand'),
          safeGetString(formData, 'model')
        ),
        category: {
          connect: {
            id: safeGetString(formData, 'categoryId')
          }
        },
        images: {
          create: imageUrls.map(url => ({ url }))
        }
      }
    });

    console.log('Watch created successfully:', watch);
    console.groupEnd();

    return NextResponse.json(watch, { status: 201 });

  } catch (error) {
    console.error('Error creating watch:', error);
    console.groupEnd();
   
    return NextResponse.json({
      error: 'Failed to create watch',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Optional: GET handler to retrieve watches
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Safely handle URL creation
    const url = req.url || '';
    const { searchParams } = new URL(url, `http://localhost`);

    // Optional query parameters for filtering
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const status = searchParams.get('status') as WatchStatus;

    const watches = await prisma.watch.findMany({
      where: status ? { status } : {},
      skip: (page - 1) * limit,
      take: limit,
      include: {
        images: true,
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const total = await prisma.watch.count({
      where: status ? { status } : {}
    });

    return NextResponse.json({
      watches,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error in GET watches:', error);
    return NextResponse.json({
      error: 'Failed to retrieve watches',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}