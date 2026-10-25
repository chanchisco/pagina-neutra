import { sha256 } from '@noble/hashes/sha2.js';
export function createHash(algorithm){if(algorithm!=='sha256')throw Error('Algoritmo no admitido');let text='';return{update(value){text+=value;return this;},digest(){return Array.from(sha256(new TextEncoder().encode(text)),b=>b.toString(16).padStart(2,'0')).join('');}};}
export const randomUUID=()=>crypto.randomUUID();
export const randomBytes=n=>({toString(){return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(n)))).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');}});
