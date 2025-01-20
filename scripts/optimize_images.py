#!/usr/bin/env python3
from PIL import Image, ImageDraw
import os
import sys
from pathlib import Path
import subprocess
import math

def create_circular_mask(size):
    """Create a circular mask"""
    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + size, fill=255)
    return mask

def convert_heif_to_png(input_path, output_path):
    """Convert HEIF image to PNG using sips (macOS built-in tool)"""
    try:
        subprocess.run(['sips', '-s', 'format', 'png', input_path, '--out', output_path], 
                      check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error converting HEIF to PNG: {e}")
        return False

def optimize_image(input_path, output_dir, quality=85, max_size=(800, 800)):
    """
    Optimize an image for web use by:
    1. Converting from HEIF if necessary
    2. Resizing if larger than max_size while maintaining aspect ratio
    3. Converting to RGB if necessary
    4. Making the image circular
    5. Optimizing compression
    """
    try:
        print(f"Processing file: {input_path}")
        print(f"File exists: {os.path.exists(input_path)}")
        print(f"File size: {os.path.getsize(input_path)} bytes")
        
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        print(f"Output directory created: {output_dir}")
        
        # Check if file is HEIF
        file_type = subprocess.run(['file', input_path], capture_output=True, text=True).stdout
        is_heif = 'HEIF' in file_type
        
        if is_heif:
            print("Detected HEIF format, converting to PNG first...")
            temp_png = os.path.join(output_dir, "temp.png")
            if not convert_heif_to_png(input_path, temp_png):
                raise Exception("Failed to convert HEIF to PNG")
            input_path = temp_png
            print("Conversion successful")
        
        # Open the image
        print("Attempting to open image...")
        with Image.open(input_path) as img:
            print(f"Image opened successfully. Mode: {img.mode}, Size: {img.size}")
            
            # Convert to RGBA to support transparency
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # Calculate new size maintaining aspect ratio
            width, height = img.size
            # Make it square first
            size = min(width, height)
            left = (width - size) // 2
            top = (height - size) // 2
            img = img.crop((left, top, left + size, top + size))
            
            # Resize if needed
            if size > max_size[0]:
                new_size = (max_size[0], max_size[0])
                print(f"Resizing from {img.size} to {new_size}...")
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # Create circular mask
            mask = create_circular_mask(img.size)
            
            # Create new image with transparency
            output = Image.new('RGBA', img.size, (0, 0, 0, 0))
            output.paste(img, mask=mask)
            
            # Generate output filename
            output_filename = f"optimized_{Path(input_path).stem}.png"
            if output_filename.startswith("optimized_temp"):
                output_filename = "optimized_image.png"
            output_path = os.path.join(output_dir, output_filename)
            print(f"Saving to: {output_path}")
            
            # Save optimized image
            output.save(output_path, 'PNG', optimize=True)
            
            # Clean up temp file if it exists
            if is_heif and os.path.exists(temp_png):
                os.remove(temp_png)
            
            # Print results
            original_size = os.path.getsize(input_path)
            optimized_size = os.path.getsize(output_path)
            print(f"\nOptimization Results:")
            print(f"Original size: {original_size/1024:.1f}KB")
            print(f"Optimized size: {optimized_size/1024:.1f}KB")
            print(f"Reduction: {100 - (optimized_size/original_size*100):.1f}%")
            print(f"Saved to: {output_path}\n")
            
            return output_path
            
    except Exception as e:
        print(f"Error processing {input_path}")
        print(f"Error details: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback
        traceback.print_exc()
        return None

def main():
    # Set paths
    input_path = "/Users/alessiocavatassi/Downloads/eduorologi2.png"
    output_dir = "/Users/alessiocavatassi/the-dukes-chrono-eb/public/images/watches"
    
    print("\nStarting image optimization...")
    print(f"Input path: {input_path}")
    print(f"Output directory: {output_dir}\n")
    
    # Optimize image
    optimize_image(input_path, output_dir)

if __name__ == "__main__":
    main()
