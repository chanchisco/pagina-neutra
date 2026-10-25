import { brandConfig } from '../brand-config.js';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
export function services() {
  if(brandConfig.demo)throw Object.assign(new Error('Demostración local: las APIs reales están desactivadas.'),{status:503});
  const { FIREBASE_PROJECT_ID: projectId, FIREBASE_CLIENT_EMAIL: clientEmail, FIREBASE_PRIVATE_KEY: key } = process.env;
  if (!projectId || !clientEmail || !key) throw Object.assign(new Error('Falta configurar la API de administración en Vercel.'), { status: 503 });
  if(projectId==='latetera'||projectId!==brandConfig.firebase.projectId||!clientEmail.endsWith('@'+projectId+'.iam.gserviceaccount.com'))throw Object.assign(new Error('El servidor debe usar el proyecto independiente configurado para este cliente.'),{status:503});
  const app = getApps()[0] || initializeApp({ credential: cert({ projectId, clientEmail, privateKey: key.replace(/\\n/g, '\n') }) });
  return { auth: getAuth(app), db: getFirestore(app) };
}
