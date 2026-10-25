import { mkdir,readdir,copyFile,readFile,writeFile,cp } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'esbuild';
import sharp from 'sharp';
await mkdir('dist',{recursive:true});
await cp('assets','dist/assets',{recursive:true});
const images=[];for(let i=1;i<=3;i++){const jpeg=await sharp(await readFile(`assets/muestra-${i}.svg`)).resize(960,720,{fit:'cover'}).jpeg({quality:80}).toBuffer();images.push(`data:image/jpeg;base64,${jpeg.toString('base64')}`);}
await writeFile('dist/demo-seed-assets.js',`export const images=${JSON.stringify(images)};`);
const files=(await readdir('.')).filter(name=>/\.(html|css|js)$/.test(name));
for(const name of files)await copyFile(name,`dist/${name}`);
await build({entryPoints:['scripts/qr-entry.mjs'],outfile:'dist/qr-code.js',bundle:true,format:'esm',platform:'browser',minify:true});
await build({entryPoints:['scripts/demo-entry.mjs'],outfile:'dist/demo-handlers.js',bundle:true,format:'esm',platform:'browser',alias:{'node:crypto':resolve('scripts/browser-crypto.mjs')},inject:[resolve('scripts/browser-runtime.mjs')],minify:true});
console.log(`Plantilla compilada: ${files.length} archivos públicos, gráficos propios y demostración local. No se copian secretos ni datos de clientes.`);
