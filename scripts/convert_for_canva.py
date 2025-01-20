#!/usr/bin/env python3
from PIL import Image
import os
from pathlib import Path

def convert_image(input_path, output_dir):
    """Convert image to a Canva-compatible format"""
    try:
        # Open the image
        with Image.open(input_path) as img:
            # Convert to RGB
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Get original filename without extension
            filename = Path(input_path).stem
            # Create new filename
            output_filename = f"{filename}_canva.jpg"
            output_path = os.path.join(output_dir, output_filename)
            
            # Save as high-quality JPEG
            img.save(output_path, 'JPEG', quality=95)
            print(f"Converted {input_path} to {output_path}")
            
            return output_path
    except Exception as e:
        print(f"Error converting {input_path}: {str(e)}")
        return None

def main():
    # Directory contenente le immagini originali
    source_dir = "/Users/alessiocavatassi/Downloads"
    # Directory per le immagini convertite
    output_dir = "/Users/alessiocavatassi/Downloads/canva_ready"
    
    # Crea la directory di output se non esiste
    os.makedirs(output_dir, exist_ok=True)
    
    # Trova tutte le immagini eduorologi*.png
    for i in range(1, 15):
        input_file = os.path.join(source_dir, f"eduorologi{i}.png")
        if os.path.exists(input_file):
            convert_image(input_file, output_dir)

if __name__ == "__main__":
    main()
