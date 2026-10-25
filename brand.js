import { brandConfig as brand } from './brand-config.js';
const root=document.documentElement;
for(const [key,value]of Object.entries(brand.colors))root.style.setProperty(`--neutral-${({background:'bg',surface:'surface',ink:'ink',accent:'accent',muted:'muted'})[key]}`,value);
root.style.setProperty('--neutral-heading',brand.fonts.heading);root.style.setProperty('--neutral-body',brand.fonts.body);
document.title=document.title.replace(/tu marca/gi,brand.name);
document.querySelector('meta[name="description"]')?.setAttribute('content',brand.description);
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const text=[];while(walker.nextNode())if(!['SCRIPT','STYLE','TEXTAREA','CODE'].includes(walker.currentNode.parentElement.tagName))text.push(walker.currentNode);
for(const node of text)if(/tu marca/i.test(node.nodeValue))node.nodeValue=node.nodeValue.replace(/tu marca/gi,brand.name);
document.querySelectorAll('.hero-logo,.topbar-title img,.logo-icon img').forEach(img=>{img.src=brand.logo;img.alt=`Identidad de ${brand.name}`;});
const home=document.querySelector('#hero-header');if(home)home.querySelector('.hero-sub').textContent=brand.tagline;
const contact=document.querySelector('.contact-box');if(contact){const location=contact.querySelector('.fa-location-dot')?.closest('p');if(location)location.lastChild.textContent=' '+(brand.contact.address||'Dirección por configurar');const hours=contact.querySelector('.fa-clock')?.closest('p');if(hours)hours.lastChild.textContent=' '+(brand.contact.hours||'Horario por configurar');}
for(const link of document.querySelectorAll('a')){
 let target;
 if(link.querySelector('.fa-whatsapp')||link.parentElement.querySelector(':scope > .fa-whatsapp'))target=brand.contact.whatsapp?`https://wa.me/${brand.contact.whatsapp.replace(/\D/g,'')}`:'';
 else if(link.querySelector('.fa-instagram')||link.classList.contains('instagram-link'))target=brand.contact.instagram?`https://www.instagram.com/${brand.contact.instagram.replace(/^@/,'')}`:'';
 else if(link.textContent.includes('Teléfono por configurar'))target=brand.contact.phone?`tel:${brand.contact.phone.replace(/[^+\d]/g,'')}`:'';
 if(target!==undefined){if(target){link.href=target;if(link.closest('.contact-box p'))link.lastChild.textContent=link.href.startsWith('tel:')?brand.contact.phone:brand.contact.whatsapp;}else{link.removeAttribute('href');link.setAttribute('aria-disabled','true');link.title='Configura este contacto en brand-config.js';if(link.classList.contains('whatsapp-float'))link.hidden=true;}}
}
document.querySelectorAll('[data-privacy-map]').forEach(frame=>{frame.dataset.privacyMap=brand.contact.mapUrl;});
if(home){const menu=document.querySelector('#menu-dia');if(menu)home.after(menu);}
if(brand.demo){
 const robots=document.createElement('meta');robots.name='robots';robots.content='noindex, nofollow';document.head.append(robots);
 const bar=document.createElement('aside');bar.className='neutral-demo-bar';bar.setAttribute('aria-label','Modo demostración');const label=document.createElement('span');label.textContent='PLANTILLA DE MUESTRA · Datos ficticios guardados solo en este navegador';const admin=document.createElement('a');admin.href='admin.html';admin.textContent='Explorar administración →';bar.append(label,admin);document.body.prepend(bar);
 const nav=document.querySelector('.hero-nav');if(nav){const a=document.createElement('a');a.href='admin.html';a.className='demo-admin-link';a.textContent='Ver panel';nav.append(a);}
 const login=document.querySelector('#login-form');if(login){login.hidden=true;document.querySelector('#forgot-password')?.setAttribute('hidden','');const box=document.createElement('section');box.className='demo-login';box.innerHTML='<p>Explora la administración con contenido ficticio. Los cambios quedan en este navegador. No introduzcas contraseñas ni correos reales.</p><button type="button" data-demo-role="completo">Entrar a la demostración completa</button><button type="button" data-demo-role="contenido">Probar como editor de contenido</button>';login.before(box);box.querySelectorAll('button').forEach(button=>button.onclick=async()=>{button.disabled=true;try{const {enterDemo}=await import('./demo-store.js');await enterDemo(button.dataset.demoRole);}catch(error){document.querySelector('#login-error').textContent=error.message;}finally{button.disabled=false;}});document.querySelector('#invite-email').placeholder='persona@example.test';document.querySelector('#invite-form button[type="submit"]').textContent='Crear cuenta de muestra';}
}
