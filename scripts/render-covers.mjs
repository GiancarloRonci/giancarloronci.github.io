// Genera la versione PNG di ogni copertina SVG in public/assets/images/posts/.
// Il PNG serve per l'anteprima sui social (og:image): LinkedIn, X e gli altri non leggono gli SVG.
// Si lancia con `npm run covers` dopo aver aggiunto o modificato una copertina.
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.resolve('public/assets/images/posts');
const files = (await readdir(dir)).filter((file) => file.endsWith('.svg'));

for (const file of files) {
  const output = path.join(dir, file.replace(/\.svg$/, '.png'));
  await sharp(path.join(dir, file), { density: 144 }).resize(1200, 630).png().toFile(output);
  console.log(`${file} -> ${path.basename(output)}`);
}
