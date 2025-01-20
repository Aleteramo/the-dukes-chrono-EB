// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  
  try {
    // Leggi i dati del form
    const formData = await request.formData()
    const file = formData.get('image') as File
    const watchId = formData.get('watchId') as string

    if (!file || !watchId) {
      return NextResponse.json({ error: 'File o watchId mancanti' }, { status: 400 })
    }

    // Converti File in buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Genera nome file unico
    const filename = `watch-${watchId}-${Date.now()}${path.extname(file.name)}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'watches')
    
    // Assicurati che la directory esista
    await fs.mkdir(uploadDir, { recursive: true })

    // Salva il file
    const fullPath = path.join(uploadDir, filename)
    await fs.writeFile(fullPath, buffer)

    // Salva nel database
    const newImage = await prisma.watchImage.create({
      data: {
        url: `/uploads/watches/${filename}`,
        watchId: watchId
      }
    })

    return NextResponse.json(newImage, { status: 200 })
  } catch (error) {
    console.error('Errore durante l\'upload:', error)
    return NextResponse.json({ error: 'Errore durante l\'upload' }, { status: 500 })
  }
}