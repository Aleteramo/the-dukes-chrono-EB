const fs = require('fs-extra');
const path = require('path');

async function migrateNextJsApp() {
    const rootDir = process.cwd();
    const srcAppDir = path.join(rootDir, 'src', 'app');
    const newAppDir = path.join(rootDir, 'app');
    
    try {
        // Verifica che la cartella src/app esista
        if (!fs.existsSync(srcAppDir)) {
            throw new Error('La cartella src/app non esiste!');
        }

        // Verifica che la cartella app non esista già
        if (fs.existsSync(newAppDir)) {
            throw new Error('La cartella app esiste già nella root!');
        }

        // Copia tutto il contenuto da src/app a app
        await fs.copy(srcAppDir, newAppDir);
        console.log('✅ File copiati con successo da src/app a app');

        // Aggiorna i percorsi nei file
        const updateImportPaths = async (dir) => {
            const files = await fs.readdir(dir);
            
            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = await fs.stat(filePath);
                
                if (stat.isDirectory()) {
                    await updateImportPaths(filePath);
                } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
                    let content = await fs.readFile(filePath, 'utf8');
                    
                    // Aggiorna i percorsi che iniziano con @/
                    content = content.replace(
                        /from ['"]@\//g,
                        'from \'/'
                    );
                    
                    await fs.writeFile(filePath, content);
                }
            }
        };

        await updateImportPaths(newAppDir);
        console.log('✅ Percorsi di importazione aggiornati');

        // Backup della cartella src/app
        const backupDir = path.join(rootDir, 'src', 'app.backup');
        await fs.move(srcAppDir, backupDir);
        console.log('✅ Backup della vecchia cartella src/app creato in src/app.backup');

        console.log('\n🎉 Migrazione completata con successo!');
        console.log('\nPassaggi successivi consigliati:');
        console.log('1. Verifica che l\'applicazione funzioni correttamente');
        console.log('2. Aggiorna i percorsi nel file next.config.js se necessario');
        console.log('3. Elimina la cartella src/app.backup se tutto funziona');
        
    } catch (error) {
        console.error('❌ Errore durante la migrazione:', error.message);
        // Rollback in caso di errore
        if (fs.existsSync(newAppDir)) {
            await fs.remove(newAppDir);
        }
    }
}

migrateNextJsApp();