import fs from 'fs';
import path from 'path';

const componentsDir = 'src/components';
const folders = fs.readdirSync(componentsDir).filter(f => fs.statSync(path.join(componentsDir, f)).isDirectory());

folders.forEach(folder => {
    const folderPath = path.join(componentsDir, folder);
    const files = fs.readdirSync(folderPath);

    files.forEach(file => {
        if (file.endsWith('.jsx')) {
            const filePath = path.join(folderPath, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // Pattern: import Name from '../Folder/Folder' -> '../Folder'
            const newContent = content.replace(/import\s+([A-Z]\w*)\s+from\s+['"]\.\.\/([A-Z]\w*)\/\2['"]/g, "import $1 from '../$2'");

            if (content !== newContent) {
                fs.writeFileSync(filePath, newContent);
                console.log(`Updated imports in ${filePath}`);
            }
        }
    });
});
