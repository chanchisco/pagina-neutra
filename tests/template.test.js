import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile,readdir } from 'node:fs/promises';
import { brandConfig } from '../brand-config.js';
import { services } from '../server/firebase.js';

test('la plantilla arranca en demo y no contiene un proyecto ni contactos de cliente',()=>{
 assert.equal(brandConfig.demo,true);assert.equal(brandConfig.publicOrigin,'');
 assert.ok(Object.values(brandConfig.firebase).every(value=>value===''));
 assert.ok(Object.values(brandConfig.contact).every(value=>value===''));
});
test('el servidor no inicializa Firebase mientras la plantilla está en demo',()=>{
 assert.throws(()=>services(),error=>error.status===503&&error.message.includes('desactivadas'));
});
test('los archivos públicos no incluyen credenciales o contactos del proyecto anterior',async()=>{
 const files=(await readdir('.')).filter(name=>/\.(html|css|js)$/.test(name));
 for(const file of files){const text=await readFile(file,'utf8');assert.doesNotMatch(text,/AIzaSy[A-Za-z0-9_-]{20,}|BEGIN\s+PRIVATE\s+KEY/i,file);}
});
test('el build restringe su salida pública y conserva el empaquetado del QR y la demo',async()=>{
 const source=await readFile('scripts/build.mjs','utf8');assert.match(source,/html\|css\|js/);assert.match(source,/demo-handlers\.js/);assert.match(source,/qr-code\.js/);assert.doesNotMatch(source,/copyFile\([^\n]*\.env/);
});
