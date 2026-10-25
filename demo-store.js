import { seedDemo } from './demo-seed.js';
// Base exclusivamente local. No sustituye Authentication ni las reglas de producción.
export const demoDrafts=new Map();
let state=new Map(),opened,serial=Promise.resolve();
async function database(){if(!opened)opened=new Promise((resolve,reject)=>{const req=indexedDB.open('pagina-neutra-demo-v1',1);req.onupgradeneeded=()=>req.result.createObjectStore('state');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(new Error('No se pudo abrir la demostración local. Habilita almacenamiento en este navegador.'));});return opened;}
async function readState(){const db=await database();return new Promise((resolve,reject)=>{const tx=db.transaction('state','readonly'),req=tx.objectStore('state').get('documents');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
async function persist(value){const db=await database();await new Promise((resolve,reject)=>{const tx=db.transaction('state','readwrite');tx.objectStore('state').put([...value],'documents');tx.oncomplete=resolve;tx.onerror=()=>reject(new Error('No se guardaron los cambios: el navegador no tiene espacio suficiente. Descarga un respaldo o reduce las imágenes.'));});}
export const ready=(async()=>{const saved=await readState();state=new Map(saved||Object.entries(seedDemo()));if(!saved)await persist(state);})();
export async function refreshDemo(){await ready;const saved=await readState();if(saved)state=new Map(saved);}
export async function lockedDemo(fn){const run=async()=>{await refreshDemo();return fn();};if(navigator.locks)return navigator.locks.request('pagina-neutra-demo',run);const result=serial.then(run);serial=result.catch(()=>{});return result;}
function snapshot(path){const value=state.get(path);return {id:path.split('/').at(-1),ref:demoDb.doc(path),exists:value!==undefined,data:()=>value===undefined?undefined:structuredClone(value)};}
function collection(path){let filters=[],sort,maximum=Infinity,after;
 const query={path,where(key,op,value){if(op!=='==')throw Error('Consulta no soportada en demo');filters.push([key,value]);return query;},orderBy(key,dir='asc'){sort=[key,dir];return query;},select(){return query;},limit(n){maximum=n;return query;},startAfter(id){after=id;return query;},doc(id=crypto.randomUUID()){return demoDb.doc(`${path}/${id}`);},async get(){let docs=[...state.keys()].filter(p=>p.startsWith(path+'/')&&p.split('/').length===path.split('/').length+1).map(snapshot).filter(d=>filters.every(([k,v])=>d.data()[k]===v));if(sort)docs.sort((a,b)=>{const av=sort[0]==='__name__'?a.id:a.data()[sort[0]],bv=sort[0]==='__name__'?b.id:b.data()[sort[0]];return (av===bv?0:av>bv?1:-1)*(sort[1]==='desc'?-1:1);});if(after)docs=docs.filter(d=>d.id>after);docs=docs.slice(0,maximum);return{docs,size:docs.length,empty:!docs.length,forEach:fn=>docs.forEach(fn)};}};return query;
}
async function commit(writes){const next=new Map(state);for(const [action,path,value]of writes){if(action==='delete')next.delete(path);else next.set(path,structuredClone(action==='update'?{...next.get(path),...value}:value));}await persist(next);state=next;window.dispatchEvent(new Event('demo-changed'));}
export const demoDb={
 doc(path){return{path,id:path.split('/').at(-1),get:async()=>snapshot(path),collection:name=>collection(`${path}/${name}`),set:value=>commit([['set',path,value]]),update:value=>commit([['update',path,value]]),delete:()=>commit([['delete',path]])};},collection,
 getAll:async(...refs)=>Promise.all(refs.map(ref=>ref.get())),
 async runTransaction(fn){const writes=[];let wrote=false;const tx={get(ref){if(wrote)throw Error('Lectura después de escritura');return ref.get();},set(ref,value){wrote=true;writes.push(['set',ref.path,value]);},update(ref,value){wrote=true;writes.push(['update',ref.path,value]);},delete(ref){wrote=true;writes.push(['delete',ref.path]);}};const result=await fn(tx);await commit(writes);return result;}
};
function published(value){if(typeof value==='string'&&value.startsWith('/api/imagen?id=')){const id=value.split('=').at(-1),asset=state.get(`imagenesPublicas/${id}`),work=state.get(`imagenesTrabajo/${id}`);if(asset){if(work)demoDrafts.set(asset.data,{published:asset.data,source:work.source,settings:work.settings});return asset.data;}}if(Array.isArray(value))return value.map(published);if(value&&typeof value==='object'){const next=Object.fromEntries(Object.entries(value).map(([k,v])=>[k,published(v)]));if(next._demoImage){if('imagenURL'in next)next.imagenURL=next._demoImage;if('url'in next)next.url=next._demoImage;}return next;}return value;}
export function frontSnapshot(snap){return {...snap,exists:()=>snap.exists,data:()=>published(snap.data())};}
export async function demoDoc(ref){await refreshDemo();return frontSnapshot(await demoDb.doc(ref.path).get());}
export async function demoDocs(ref){await refreshDemo();let q=collection(ref.path);for(const constraint of ref.constraints||[])q=q[constraint.method](...constraint.args);const result=await q.get(),docs=result.docs.map(frontSnapshot);return {...result,docs,forEach:fn=>docs.forEach(fn)};}
const authObservers=new Set();
function user(uid){const profile=state.get(`administradores/${uid}`);if(!profile||!profile.activo)return null;return{uid,email:profile.email,emailVerified:true,getIdToken:async()=>uid,getIdTokenResult:async()=>({claims:{}})};}
export const demoAuth={currentUser:null,languageCode:'es'};
await ready;demoAuth.currentUser=user(sessionStorage.getItem('pagina-neutra-user'));
export function observeAuth(auth,fn){authObservers.add(fn);queueMicrotask(()=>fn(auth.currentUser));return()=>authObservers.delete(fn);}
export async function enterDemo(role='completo'){await refreshDemo();const uid=role==='contenido'?'demo-editor':'demo-owner';demoAuth.currentUser=user(uid);sessionStorage.setItem('pagina-neutra-user',uid);for(const fn of authObservers)fn(demoAuth.currentUser);return{user:demoAuth.currentUser};}
export async function leaveDemo(){demoAuth.currentUser=null;sessionStorage.removeItem('pagina-neutra-user');for(const fn of authObservers)fn(null);}
export const demoAdminAuth={
 async verifyIdToken(uid){const profile=state.get(`administradores/${uid}`);if(!profile?.activo)throw Error('Sesión demo inválida');return{uid,email:profile.email,auth_time:Math.floor(Date.now()/1000)};},
 async createUser({email}){if(!email.endsWith('@example.test'))throw Object.assign(Error('Usa un correo @example.test en la demo.'),{status:400});if([...state.values()].some(v=>v.email===email))throw Object.assign(Error(),{code:'auth/email-already-exists'});return{uid:crypto.randomUUID(),email};},
 async updateUser(uid){return{uid};},async deleteUser(){},async revokeRefreshTokens(){}
};
