import { brandConfig } from './brand-config.js';
let auth,db;
if(brandConfig.demo){const demo=await import('./demo-store.js');auth=demo.demoAuth;db={demo:true};}
else {
 const cfg=brandConfig.firebase;
 if(!cfg.apiKey||!cfg.projectId||!cfg.authDomain)throw Error('Configura el proyecto propio del próximo cliente en brand-config.js.');
 if(cfg.projectId==='latetera'||cfg.authDomain==='latetera.firebaseapp.com')throw Error('La plantilla no puede utilizar el proyecto del cliente original.');
 const {initializeApp}=await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
 const {getAuth}=await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js');
 const {getFirestore}=await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');
 const app=initializeApp(cfg);auth=getAuth(app);db=getFirestore(app);
}
export {auth,db};
