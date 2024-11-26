#!/usr/bin/env python3
import os
import subprocess
from pathlib import Path

def convert_with_sips(input_path, output_dir):
    """Convert image using sips command"""
    try:
        # Create output filename
        filename = Path(input_path).stem
        output_path = os.path.join(output_dir, f"{filename}_converted.jpg")
        
        # Run sips command
        cmd = ['sips', '-s', 'format', 'jpeg', input_path, '--out', output_path]
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"Converted {input_path} to {output_path}")
            return output_path
        else:
            print(f"Error converting {input_path}: {result.stderr}")
            return None
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")
        return None

def main():
    # Directory contenente le immagini originali
    source_dir = "/Users/alessiocavatassi/Downloads"
    # Directory per le immagini convertite
    output_dir = "/Users/alessiocavatassi/Downloads/canva_ready"
    
    # Crea la directory di output se non esiste
    os.makedirs(output_dir, exist_ok=True)
    
    # Converti tutte le immagini eduorologi*.png
    for i in range(1, 15):
        input_file = os.path.join(source_dir, f"eduorologi{i}.png")
        if os.path.exists(input_file):
            convert_with_sips(input_file, output_dir)

if __name__ == "__main__":
    main()
