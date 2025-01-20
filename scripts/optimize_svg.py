#!/usr/bin/env python3
import os
import subprocess
from pathlib import Path
import shutil
from cairosvg import svg2png
import re

def remove_background_from_svg(svg_content):
    """Remove white background from SVG content"""
    # Rimuovi qualsiasi rettangolo di sfondo bianco
    svg_content = re.sub(r'<rect[^>]*?fill="(?:white|#ffffff)"[^>]*?/>', '', svg_content)
    svg_content = re.sub(r'<rect[^>]*?style="[^"]*?fill:\s*(?:white|#ffffff)[^"]*?"[^>]*?/>', '', svg_content)
    
    # Rimuovi eventuali definizioni di sfondo nel tag svg
    svg_content = re.sub(r'<svg([^>]*?)style="[^"]*?background-color:\s*(?:white|#ffffff)[^"]*?"', r'<svg\1', svg_content)
    
    # Aggiungi attributo per forzare lo sfondo trasparente
    if not 'style="background:transparent"' in svg_content:
        svg_content = svg_content.replace('<svg', '<svg style="background:transparent"', 1)
    
    return svg_content

def optimize_svg(input_path, output_dir, target_name):
    """Optimize SVG and create PNG version"""
    try:
        # Read SVG content
        with open(input_path, 'r', encoding='utf-8') as f:
            svg_content = f.read()
        
        # Remove background
        svg_content = remove_background_from_svg(svg_content)
        
        # Create paths
        svg_output = os.path.join(output_dir, f"{target_name}.svg")
        png_output = os.path.join(output_dir, f"{target_name}.png")
        
        # Save modified SVG
        with open(svg_output, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        
        # Convert to PNG using CairoSVG with transparency
        svg2png(url=svg_output,
               write_to=png_output,
               output_width=1024,
               output_height=1024,
               background_color='transparent')
        
        print(f"Processed {target_name}:")
        print(f"- SVG saved to: {svg_output}")
        print(f"- PNG saved to: {png_output}")
        
        return svg_output, png_output
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")
        return None, None

def main():
    # File di input
    input_file = "/Users/alessiocavatassi/Downloads/Progetto senza titolo (1).svg"
    # Directory di destinazione nel progetto
    output_dir = "/Users/alessiocavatassi/the-dukes-chrono-eb/public/images/watches"
    
    # Crea la directory di output se non esiste
    os.makedirs(output_dir, exist_ok=True)
    
    # Processa il file SVG
    if os.path.exists(input_file):
        optimize_svg(input_file, output_dir, "eduorologi1")
    else:
        print(f"File non trovato: {input_file}")

if __name__ == "__main__":
    main()
