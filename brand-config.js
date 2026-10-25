// Personalización del próximo cliente. Este archivo es público: nunca contiene secretos.
export const brandConfig = {
  demo: true,
  name: 'Tu marca',
  tagline: 'Una propuesta propia. Un espacio para compartir.',
  description: 'Plantilla de muestra para presentar tu negocio, su carta y sus novedades.',
  colors: { background:'#f4f5f1', surface:'#ffffff', ink:'#172d30', accent:'#246b61', muted:'#647477' },
  fonts: { heading:'Arial, Helvetica, sans-serif', body:'Arial, Helvetica, sans-serif' },
  logo:'assets/marca.svg',
  contact: { address:'', hours:'', whatsapp:'', phone:'', instagram:'', mapUrl:'' },
  // URL real HTTPS del próximo cliente antes de generar QR para imprimir.
  publicOrigin:'',
  firebase: { apiKey:'', authDomain:'', projectId:'', storageBucket:'', messagingSenderId:'', appId:'' }
};
