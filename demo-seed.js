import { images } from './demo-seed-assets.js';
// Ejemplos ficticios. No procede de ningún cliente ni de una base real.
const image=n=>images[n-1];
export function seedDemo(){
 const records={
  'administradores/demo-owner':{email:'admin@example.test',rol:'completo',activo:true,invitacionEnviada:false},
  'administradores/demo-editor':{email:'editor@example.test',rol:'contenido',activo:true,invitacionEnviada:false},
  'sistema/seguridad':{requireMfa:false},
  'configuracion/portadas':{},
  'configuracion/destacados':{habilitado:true,platos:['muestra-1','muestra-2'],titulo:'Selección de la casa'},
  'configuracion/imagenesSeccion':{quienesSomosHabilitado:true,nuestraCartaHabilitado:true,quienesSomosTexto:'Cada negocio tiene una historia que contar. Este espacio está listo para presentar a tu equipo, tu forma de trabajar y lo que hace especial tu propuesta.',quienesSomosImg:image(2),nuestraCartaImg:image(1),nuestraCartaTitulo:'Una carta a tu medida'},
  'configuracion/menuDia':{incluye:'Entrada de temporada\nFondo del día\nPostre a elección',acompanamientos:'Acompañamiento de ejemplo',precioServir:'$8.000',precioLlevar:'$7.000',img1:image(1),img2:image(3)},
  'configuracion/historia':{b1:{habilitado:true,tit:'El comienzo de tu historia',txt:'Presenta aquí cómo nació el negocio, las personas que lo impulsan y la idea que los reúne.',img:image(2)},b2:{habilitado:true,tit:'Una forma de hacer las cosas',txt:'Cuenta qué cuidan en cada detalle y qué experiencia quieren ofrecer a sus visitantes.',img:image(3)},b3:{habilitado:true,tit:'Lo que viene',txt:'Comparte los próximos pasos y las razones para volver. Este contenido es únicamente de muestra.',img:image(1)}},
  'configuracion/galeriaOpciones':{habilitado:true}
 };
 const names=['Propuesta de temporada','Especialidad de la casa','Alternativa vegetal','Entrada del día','Un acompañamiento','Un final dulce'];
 const categories=['fondos','carnes','fondos','entradas','guarniciones','postres'];
 names.forEach((nombre,i)=>records[`platos/muestra-${i+1}`]={nombre,precio:`$${i<3?'8.000':'4.000'}`,descripcion:'Descripción de ejemplo: reemplaza este texto por ingredientes y detalles del próximo negocio.',categoria:categories[i],disponible:true,orden:i+1,imagenBase64:image(i%3+1),etiquetas:i===2?['Vegetariano']:[]});
 ['Bebida de la casa','Infusión de temporada','Agua'].forEach((nombre,i)=>records[`bebidas/muestra-${i+1}`]={nombre,precio:'$2.000',subcategoria:'Sin Alcohol & Cafetería',disponible:true,orden:i+1});
 for(let i=1;i<=3;i++)records[`galeria/muestra-${i}`]={url:image(i),descripcion:`Imagen ilustrativa ${i}`,orden:i,disponible:true};
 return records;
}
