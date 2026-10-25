import { createContentHandler } from './demo-handlers.js';
import { createManagementHandler } from './demo-handlers.js';
import { demoDb,demoAuth,demoAdminAuth,lockedDemo } from './demo-store.js';
const options={getServices:()=>({db:demoDb,auth:demoAdminAuth}),origin:'https://demo.invalid'};
const content=createContentHandler(options),management=createManagementHandler({...options,sendRecovery:async()=>{throw Object.assign(new Error('En la demo no se envían correos.'),{status:400});}});
export async function demoRequest(body,query='',kind='content'){
 return lockedDemo(async()=>{const res={setHeader(){},status(code){this.code=code;return this;},json(value){this.body=value;return this;}};await(kind==='content'?content:management)({method:body?'POST':'GET',url:'/api/'+(kind==='content'?'contenido':'gestion')+query,body,headers:{origin:options.origin,authorization:demoAuth.currentUser?`Bearer ${demoAuth.currentUser.uid}`:'','content-type':'application/json'}},res);if(res.code>=400)throw Error(res.body.message);if(kind==='management'&&body?.action==='crear')res.body.message='Cuenta de muestra creada en este navegador. No se envió ningún correo.';return res.body;});
}
