#!/usr/bin/env python3
import os
import shutil
import subprocess

def find_watch_images(directory):
    """Find all eduorologi images in the specified directory"""
    result = subprocess.run(['find', directory, '-type', 'f', '-name', 'eduorologi*.png'], 
                          capture_output=True, text=True)
    return result.stdout.strip().split('\n')

def main():
    # Directory dove cercare le immagini
    source_dir = "/Users/alessiocavatassi/Downloads"
    
    # Directory di destinazione nel progetto
    dest_dir = "/Users/alessiocavatassi/the-dukes-chrono-eb/public/images/watches"
    
    # Assicurati che la directory di destinazione esista
    os.makedirs(dest_dir, exist_ok=True)
    
    # Trova tutte le immagini
    watch_files = find_watch_images(source_dir)
    
    # Rimuovi eventuali stringhe vuote
    watch_files = [f for f in watch_files if f]
    
    if not watch_files:
        print("Nessuna immagine trovata in", source_dir)
        return
    
    print(f"Trovate {len(watch_files)} immagini")
    
    # Copia ogni immagine nella directory di destinazione
    for watch_file in watch_files:
        if os.path.exists(watch_file):
            filename = os.path.basename(watch_file)
            dest_path = os.path.join(dest_dir, filename)
            print(f"Copiando {filename} in {dest_path}")
            shutil.copy2(watch_file, dest_path)
            print(f"Copiato con successo: {filename}")

if __name__ == "__main__":
    main()
