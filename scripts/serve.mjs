import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve,extname,sep } from 'node:path';
const root=resolve('dist'),port=Number(process.env.PORT)||4180;
createServer(async(req,res)=>{let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 if(name==='/__preview'){const url=new URL(req.url,'http://localhost'),width=url.searchParams.get('width')==='390'?390:1440,page=['index.html','carta.html','nosotros.html','admin.html'].includes(url.searchParams.get('page'))?url.searchParams.get('page'):'index.html';res.setHeader('Content-Type','text/html; charset=utf-8');res.end(`<!doctype html><html><body style="margin:0;background:#e7ece9"><p>Vista local · ${width}px</p><iframe title="Vista ${width}px" width="${width}" height="${width===390?844:900}" style="border:0;transform:scale(${width===390?.8:.72});transform-origin:top left" src="/${page}"></iframe></body></html>`);return;}
 const file=resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root+sep)){res.writeHead(403).end();return;}
 try{const data=await readFile(file);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'})[extname(file)]||'application/octet-stream');res.end(data);}catch{res.writeHead(404).end('Archivo no encontrado. La API real requiere configuración del cliente.');}
}).listen(port,'127.0.0.1',()=>console.log(`Página neutra: http://127.0.0.1:${port}`));
