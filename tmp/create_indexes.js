import fs from 'fs';
import path from 'path';

const componentsDir = 'src/components';
const folders = fs.readdirSync(componentsDir).filter(f => fs.statSync(path.join(componentsDir, f)).isDirectory());

folders.forEach(folder => {
    const name = folder;
    const indexPath = path.join(componentsDir, folder, 'index.js');
    const content = `export { default } from './${name}';\n`;
    fs.writeFileSync(indexPath, content);
});
