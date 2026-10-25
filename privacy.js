import { brandConfig } from './brand-config.js';
import { siteConfig } from './site-config.js';
const KEY = 'marca_privacy_v1';
const MAX_AGE = 180 * 86400000;
function readChoice() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY));
    if (value?.version === siteConfig.consentVersion && typeof value.maps === 'boolean' && Number.isFinite(value.at) && Date.now() >= value.at && Date.now() - value.at < MAX_AGE) return value;
  } catch { /* Navegación privada o almacenamiento no disponible. */ }
  return null;
}
let choice = readChoice();
const foot = document.querySelector('footer');
const links = document.createElement('nav');
links.className = 'privacy-links'; links.setAttribute('aria-label', 'Privacidad e información legal');
links.innerHTML = '<a href="privacidad.html">Privacidad</a><a href="cookies.html">Cookies y almacenamiento</a><a href="aviso-legal.html">Aviso legal</a><button type="button" data-privacy-open>Preferencias de privacidad</button>';
(foot || document.body).append(links);

const banner = document.createElement('section');
banner.className = 'privacy-banner'; banner.setAttribute('aria-label', 'Preferencias de privacidad'); banner.hidden = !!choice;
banner.innerHTML = '<h2>Tu privacidad</h2><p>Usamos almacenamiento local para recordar preferencias y acelerar imágenes. El mapa de Google es opcional y solo se carga si lo autorizas. Puedes consultar la carta sin aceptarlo.</p><p><a href="cookies.html">Ver cookies y almacenamiento</a></p><div class="privacy-actions"><button class="privacy-button" data-choice="false">Rechazar opcionales</button><button class="privacy-button" data-privacy-open>Configurar</button><button class="privacy-button" data-choice="true">Aceptar opcionales</button></div><p class="privacy-save-status" role="status"></p>';
document.body.append(banner);
const dialog = document.createElement('dialog');
dialog.className = 'privacy-dialog'; dialog.setAttribute('aria-labelledby', 'privacy-title');
dialog.innerHTML = '<h2 id="privacy-title">Preferencias de privacidad</h2><p>Elige si permites contenido externo opcional. Puedes cambiar esta elección en cualquier momento.</p><label class="privacy-option"><input type="checkbox" checked disabled><span><strong>Necesario</strong><br>Recuerda esta elección. El acceso privado usa Firebase Authentication para mantener la sesión.</span></label><label class="privacy-option"><input id="privacy-maps" type="checkbox"><span><strong>Mapa de Google</strong><br>Al cargarlo, tu navegador se conecta a Google, que puede recibir datos técnicos y usar su propio almacenamiento.</span></label><p>La caché de imágenes del sitio no se usa para publicidad. <a href="cookies.html">Más información</a>.</p><div class="privacy-actions"><button class="privacy-button primary" id="privacy-save">Guardar preferencias</button><button class="privacy-button" id="privacy-close">Cerrar</button></div>';
if(brandConfig.demo)dialog.innerHTML=dialog.innerHTML.replace('El acceso privado usa Firebase Authentication para mantener la sesión.','La demostración conserva contenido ficticio en este navegador. El acceso real utilizará Firebase al configurar el proyecto propio.');
document.body.append(dialog);
let previousFocus;
function openPreferences() {
  previousFocus = document.activeElement;
  dialog.querySelector('#privacy-maps').checked = choice?.maps === true;
  if (!dialog.open) dialog.showModal();
}
dialog.addEventListener('close', () => previousFocus?.focus());
dialog.querySelector('#privacy-close').onclick = () => dialog.close();

const maps = [...document.querySelectorAll('iframe[data-privacy-map]')];
function renderMaps() {
  for (const iframe of maps) {
    if (choice?.maps && iframe.dataset.privacyMap) {
      iframe.src = iframe.dataset.privacyMap;
      iframe.hidden = false;
      iframe.previousElementSibling?.classList.contains('privacy-map-placeholder') && iframe.previousElementSibling.remove();
    } else {
      iframe.removeAttribute('src'); iframe.hidden = true;
      if (iframe.previousElementSibling?.classList.contains('privacy-map-placeholder')) continue;
      const placeholder = document.createElement('div'); placeholder.className = 'privacy-map-placeholder';
      const address=document.createElement('p');address.textContent=brandConfig.contact.address||'Ubicación por configurar';const note=document.createElement('p');note.textContent=iframe.dataset.privacyMap?'El mapa de Google está desactivado.':'La ubicación de este negocio todavía no está configurada.';placeholder.append(address,note);if(iframe.dataset.privacyMap){const button=document.createElement('button');button.type='button';button.className='privacy-button';button.dataset.privacyOpen='';button.textContent='Configurar mapa';placeholder.append(button);}if(brandConfig.contact.address){const link=document.createElement('a');link.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(brandConfig.contact.address);link.textContent='Abrir dirección en Google Maps';link.target='_blank';link.rel='noopener noreferrer';placeholder.append(link);}
      iframe.before(placeholder);
    }
  }
}
function save(mapsAllowed) {
  choice = { version: siteConfig.consentVersion, at: Date.now(), maps: mapsAllowed };
  let persisted = true;
  try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch { persisted = false; }
  banner.hidden = true; if (dialog.open) dialog.close(); renderMaps();
  // Integraciones futuras deben escuchar este evento, nunca cargar antes de la elección.
  window.dispatchEvent(new CustomEvent('marca:privacy', { detail: { ...choice } }));
  if (!persisted) {
    banner.hidden = false;
    banner.querySelector('.privacy-save-status').textContent = 'Tu elección se aplicó en esta página. El navegador no permite recordarla para la próxima visita.';
  }
}
document.addEventListener('click', e => {
  if (e.target.closest('[data-privacy-open]')) openPreferences();
  const button = e.target.closest('[data-choice]');
  if (button) save(button.dataset.choice === 'true');
});
dialog.querySelector('#privacy-save').onclick = () => save(dialog.querySelector('#privacy-maps').checked);
window.addEventListener('storage', e => {
  if (e.key === KEY || e.key === null) { choice = readChoice(); banner.hidden = !!choice; renderMaps(); }
});
renderMaps();

// Los datos reales se completan después de hablar con el cliente.
for (const el of document.querySelectorAll('[data-legal]')) el.textContent = siteConfig.legal[el.dataset.legal] || 'Pendiente de completar con el titular del negocio';
if (siteConfig.legal.published && ['responsible', 'rut', 'address', 'email', 'retention', 'providersAndTransfers'].every(key => siteConfig.legal[key])) {
  document.querySelectorAll('.legal-draft').forEach(el => el.hidden = true);
  document.querySelector('meta[name="robots"][content="noindex, nofollow"]')?.remove();
}
