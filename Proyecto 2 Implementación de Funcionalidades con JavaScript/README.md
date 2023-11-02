# Proyecto 2: Implementación de Funcionalidades con JavaScript
## Fundamentación Teórica
Este proyecto simula un escenario común en la vida de un desarrollador web: la necesidad de implementar funcionalidades desconocidas bajo demanda. En el mundo real, los desarrolladores a menudo enfrentan el desafío de aprender y aplicar nuevas tecnologías rápidamente para satisfacer las necesidades de sus clientes. Este proyecto pone a prueba la capacidad de los estudiantes para investigar, aprender y aplicar de forma efectiva una tecnología no familiar, en este caso, IndexedDB, un componente interesante en el desarrollo de aplicaciones web actuales.

## Objetivos del Proyecto
Implementar la validación de formularios utilizando eventos JavaScript.
Facilitar los procedimientos de validación mediante expresiones regulares.
Utilizar las capacidades de almacenamiento del navegador para guardar y recuperar información.
Probar y documentar adecuadamente el código desarrollado.
Descripción del Proyecto
La tarea asignada por tu jefe de proyecto implica implementar diversas funcionalidades en un CRM (Customer Relationship Management), donde se proporciona la estructura básica (HTML y CSS) y se necesita la implementación en JavaScript de las correspondientes funcionalidades.

## Funcionalidades a implementar

**Formulario Nuevo Cliente:** 

Implementar validaciones completas en todos sus campos, utilizando eventos 'onblur' para verificar la información en tiempo real. Además, se debe incluir una característica para resaltar visualmente el campo activo en el que el usuario se encuentra en ese momento.


**Agregar Cliente:** 

Implementar la lógica para que el botón de agregar cliente solo se active cuando todos los datos del formulario sean adecuados. Al presionar el botón, el cliente se añadirá al listado de clientes en el CRM.


**Gestión de Clientes:** 

Crear un listado dinámico que muestre todos los clientes agregados. Incluir funcionalidades para editar y eliminar clientes del listado, asegurando que los cambios persistan en el navegador gracias al uso de IndexedDB.
Persistencia de Datos: Asegurar que toda la información de clientes se mantenga disponible en el navegador, incluso después de cerrarlo, utilizando IndexedDB para almacenar y recuperar los datos de manera eficiente.
Se anima a los estudiantes a explorar e implementar funcionalidades adicionales, valorando positivamente la innovación y creatividad.
Una vez revisadas las funcionalidades, rapidamente te das cuenta que no controlas indexedDB, por lo que lo ideal sería dividir esto en dos partes:

-  Parte 1: Investigación y Aprendizaje de IndexedDB
Esta sección requiere que el alumnado investigue el uso de IndexedDB, una tecnología interesante para la gestión de datos en aplicaciones web. Deberán explorar sus capacidades, sintaxis y mejores prácticas.

Se espera que documenten su proceso de aprendizaje, creando una guía o cheatsheet que resuma los aspectos clave de IndexedDB, desde la configuración inicial hasta operaciones avanzadas como transacciones y consultas. La creación de tu propio material sirve como referencia útil para futuros proyectos.

-  Parte 2: Implementación de Funcionalidades en el CRM
Una vez investigado el funcionamiento de la base de datos indexedDB, procedemos a la implementación de las funcionalidades.

## Formato y Entrega
Plataforma de Entrega: 

Realiza la entrega de tu trabajo mediante el aula virtual de nuestro curso.
Repositorio GitHub: Sube el enlace de tu proyecto alojado en GitHub. Antes de hacerlo, verifica que tu repositorio esté configurado como público. Si prefieres mantenerlo privado, añádeme como colaborador para que pueda acceder y evaluar tu trabajo. Asegurate de que el archivo readme.md explica el contenido del repositorio, como mínimo, un enlace a:

Cheatsheet en formato markdown.

Código de la aplicación.

## Recomendaciones Adicionales:
Organiza tu código de manera lógica y limpia, facilitando su lectura y mantenimiento.

Recuerda comentar las secciones más complejas o relevantes de tu código para explicar su funcionamiento.

Asegúrate de que cumples con los criterios de calificación establecidos.

