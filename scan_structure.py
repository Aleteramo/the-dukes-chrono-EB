import os

def scan_project_structure(start_path, level=1, max_level=3):
    if level > max_level:
        return
    for item in os.listdir(start_path):
        item_path = os.path.join(start_path, item)
        print('  ' * level + '|-- ' + item)
        if os.path.isdir(item_path):
            scan_project_structure(item_path, level + 1, max_level)

# Esegui la scansione dalla directory corrente
scan_project_structure('.')