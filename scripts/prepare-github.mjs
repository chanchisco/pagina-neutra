import { mkdir,readdir,copyFile,cp } from 'node:fs/promises';
import { join } from 'node:path';
const target=process.argv[2]||'PARA_SUBIR_GITHUB';
if(!/^PARA_SUBIR_GITHUB(?:_[A-Za-z0-9_-]+)?$/.test(target))throw Error('Nombre de carpeta no válido.');
await mkdir(target);
const fixed=new Set(['package.json','package-lock.json','vercel.json','firebase.json','firestore.rules','.gitignore','.env.example','LEEME_PRIMERO.md','CUENTAS_Y_PROYECTOS.md','ABRIR_DEMO.cmd']);
for(const name of await readdir('.'))if(/\.(html|css|js)$/.test(name)||fixed.has(name))await copyFile(name,join(target,name));
for(const dir of ['api','server','scripts','tests','assets'])await cp(dir,join(target,dir),{recursive:true,filter:source=>!source.includes('node_modules')});
console.log(`Carpeta limpia preparada: ${target}. Subir su contenido a un repositorio nuevo, nunca al del cliente anterior.`);
