# Página neutra — base independiente

Creada el 24 de octubre de 2026. Está en una carpeta hermana a la web original. El código original y los servicios del cliente no se modificaron.

## Qué contiene

Inicio, Nosotros, Carta, búsqueda y filtros, destacados, menú del día, galería de hasta 15 fotos, contactos y documentos legales en borrador. Panel con edición de platos y bebidas, portadas, Extras, editor de imágenes, brillo y encuadre, descargas, historial, papelera de 5 días, QR y gestión de administradores. Recomendados permanece dentro de Extras.

El aspecto es distinto: paleta gris/verde petróleo, tipografía sans serif, portada asimétrica, menú del día antes de la presentación del negocio, botones rectangulares y navegación horizontal en el panel.

## Abrir y mostrar la plantilla

La demostración está lista en este equipo en `http://127.0.0.1:4180/` mientras el servidor local siga abierto. El panel está en `http://127.0.0.1:4180/admin.html`.

Para abrirla otro día:

1. Abrir esta carpeta y hacer doble clic en **ABRIR_DEMO.cmd**.
2. Esperar a que aparezca «Página neutra: http://127.0.0.1:4180».
3. Abrir esa dirección en el navegador. Mantener abierta la ventana del servidor mientras se use la demo.
4. Entrar a **Ver panel** y elegir **Entrar a la demostración completa**. También se puede probar el permiso de editor de contenido.

Se necesita Node.js instalado. El lanzador instala dependencias si faltan y compila la plantilla. No abrir `index.html` con doble clic: los módulos necesitan un servidor local.

## Cómo funciona la demostración

Los datos ficticios se guardan en IndexedDB, dentro de ese navegador y origen. Si se cambia de navegador, de dirección o de puerto, los datos pueden ser otros. No es una base compartida entre dispositivos, no es un respaldo remoto y no es autenticación real. No introducir información privada.

Las validaciones del contenido, los conflictos de revisiones, el límite de galería, el historial y la recuperación reutilizan los handlers de la aplicación. Firebase no se inicializa en modo demo. Las invitaciones, la recuperación por correo y 2FA no envían mensajes ni modifican servicios reales. Gestión permite ensayar perfiles con direcciones de muestra terminadas en `@example.test`.

El QR de demo apunta al servidor local; no imprimirlo para un negocio. Debe configurarse primero el dominio real.

Se conservaron bibliotecas de interfaz servidas por CDN (iconos, ordenación y animaciones); no se promete funcionamiento totalmente sin Internet. Ninguna configuración del Firebase original fue copiada. Los únicos nombres de proyecto anterior que quedan en el código son una lista de bloqueo que impide reutilizarlo por error.

## Personalizar para el próximo cliente

1. Duplicar esta plantilla en otra carpeta con el nombre del cliente; conservar esta base maestra.
2. Editar **brand-config.js**: nombre, descripción, frase principal, colores, fuentes, logo, contactos y dominio público. Nunca añadir una clave privada en ese archivo.
3. Poner los nuevos recursos dentro de **assets/**. Los gráficos incluidos son ilustraciones propias de muestra, no fotografías del restaurante original.
4. Ajustar **neutral.css** para cambios de disposición, radios, espaciados o tipografía más específicos.
5. Reemplazar desde el panel los textos, platos, precios, fotos e historia. Los testimonios son espacios de muestra sin valoraciones reales; completar únicamente con testimonios autorizados del cliente.
6. Revisar los textos estáticos de las páginas y las categorías para adaptar el rubro. Esta base conserva las funciones de una web gastronómica: otro tipo de negocio puede requerir adaptar sus formularios y estructura.
7. Completar **site-config.js**, privacidad y aviso legal con los datos del responsable. Los textos siguen marcados como borrador.

Cambiar datos en la demo no los importa automáticamente al Firebase futuro. Se puede descargar un respaldo de contenido desde el panel; una importación real se realiza de forma supervisada y con permisos, sin copiar perfiles demo ni contraseñas.

## Pasar a un proyecto real

Leer primero **CUENTAS_Y_PROYECTOS.md**. Crear un repositorio, un proyecto Firebase y un proyecto de alojamiento independientes del cliente anterior.

Configurar la app web del Firebase nuevo en `brand-config.js`. Elegir la edición de Firestore y revisar la compatibilidad del modelo antes de desplegar reglas; esta aplicación conserva el modelo y las reglas de Standard Edition. Habilitar correo/contraseña y autorizar el dominio propio. Crear las cuentas reales y preparar sus perfiles mediante el procedimiento de inventario/importación de `scripts/migrate-admins.mjs`, revisado para ese cliente. Mantener al menos un administrador completo.

Configurar los cinco valores del servidor siguiendo `.env.example`, exclusivamente en el entorno del nuevo alojamiento. La cuenta de servicio debe pertenecer al mismo proyecto nuevo del cliente. Completar el dominio público HTTPS y los textos legales; después cambiar `demo` a `false`, compilar y comprobar ingreso, permisos, guardado, imágenes y correos reales en el entorno nuevo.

No reutilizar los secretos, el dominio, la base de datos o las cuentas del cliente anterior. No copiar `.vercel`, `.firebase-private`, archivos `.env` reales, claves JSON, respaldos, `node_modules` o `evidence` a GitHub.

La configuración real requiere esos pasos: no se presenta la demo como una web de producción ya conectada.

## Carpeta limpia para el flujo manual de GitHub

`PARA_SUBIR_GITHUB` contiene el código completo sin dependencias instaladas, capturas, build, credenciales o manifiesto de comprobación del original. Para un repositorio **nuevo**, subir su contenido a la raíz; no subir la carpeta exterior ni reemplazar el repositorio del restaurante. Está en modo demo. No publicarla como sistema real ni dar por resuelta la elección del plan comercial.

Si se edita la plantilla, esa carpeta no se actualiza sola: regenerarla con `node scripts/prepare-github.mjs PARA_SUBIR_GITHUB_nueva`, usando un nombre nuevo para conservar la entrega anterior.
