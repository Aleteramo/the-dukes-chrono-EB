import os

paths_to_check = [
    'src/components/MyComponent.js',
    'public/images/logo.png',
    'next.config.js',
    '.next/server/app/(shop)/page_client-reference-manifest.js'
]

file_existence = {path: os.path.exists(path) for path in paths_to_check}

print(file_existence)