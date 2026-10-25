# Cuentas, propiedad y planes

Consulta de documentación oficial: 24 de octubre de 2026.

## Recomendación

No hace falta abrir un correo nuevo por cada sitio. Una misma cuenta de desarrollador puede administrar varios proyectos a los que tenga acceso. La separación importante es tener **un proyecto independiente por cliente**, con su repositorio, sus datos, usuarios, configuración y secretos.

Para una entrega profesional, conviene que el cliente sea propietario de sus servicios mediante una cuenta que controle y que te invite como colaborador. Puede utilizar su correo empresarial o una cuenta Google que ya tenga. No hace falta que te dé su contraseña. Así conserva el control y tú puedes seguir manteniendo la web con permisos propios.

No registrar todos los negocios dentro del Firebase del primer cliente. Firebase documenta que las apps del mismo proyecto comparten recursos: https://firebase.google.com/docs/projects/learn-more

## Firebase

Se puede gestionar el proyecto del restaurante y los proyectos futuros desde tu misma cuenta si tienes acceso a cada uno. Cada negocio debe usar un Firebase distinto; incluso es recomendable separar las pruebas de la producción cuando corresponda.

Spark ofrece cuotas sin costo; crear otra cuenta no sustituye la revisión de límites, necesidades y titularidad. No habilitar Blaze ni asociar facturación sin una decisión explícita del propietario.

Fuentes: https://firebase.google.com/docs/projects/billing/firebase-pricing-plans y https://firebase.google.com/support/faq

## Vercel: corrección respecto a las explicaciones anteriores

El plan Hobby limita su uso a proyectos personales no comerciales. Una web comercial para un restaurante o clientes no debe planificarse suponiendo que basta ese plan. Usar otro correo no modifica las condiciones de Hobby.

Si se elige Vercel para producción comercial, corresponde evaluar un plan comercial adecuado y quién será su titular y pagador. También se puede estudiar otro alojamiento compatible con las funciones Node.js de esta aplicación y con condiciones apropiadas para el negocio. No cambiar de alojamiento sin comprobar que Gestión, contenido e imágenes sigan funcionando: no es solo una web estática.

Fuentes oficiales: https://vercel.com/docs/limits/fair-use-guidelines y https://vercel.com/docs/plans/hobby

## Qué se hizo en esta entrega

Se preparó una demostración local aislada. No se crearon cuentas o proyectos en la nube, no se aceptaron contratos, no se contrató un plan y no se habilitó facturación. Los servicios actuales del restaurante conservan su estado.

Al concretar un nuevo cliente se elegirá el alojamiento y se crearán sus recursos propios. La demo sirve para mostrar la apariencia y las herramientas mientras se decide esa configuración.
