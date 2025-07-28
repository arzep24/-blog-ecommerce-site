# Documentación del Proyecto: Planificación y Requisitos
Este documento contiene la planificación detallada y los requisitos para la v1.0 de la plataforma Blog y Ecommerce.

1. Visión y Alcance del MVP (v1.0)
Visión: Unificar la gestión de contenido y ventas en un solo lugar para creadores y pequeños comerciantes.

Alcance del MVP: La v1.0 se centrará en las funcionalidades esenciales de gestión y visualización de contenidos/productos, junto con un sistema de autenticación y roles. Funcionalidades como el carrito de compras o los pagos quedan para futuras versiones.

2. Requisitos Funcionales (Historias de Usuario)
Módulo General y Autenticación
Como visitante, quiero poder registrarme en la plataforma.

Como usuario registrado, quiero poder iniciar sesión y cerrar sesión.

Módulo de Blog
Como visitante, quiero ver la lista de artículos y leer un artículo completo.

Como administrador, quiero poder crear, editar y eliminar artículos del blog.

Módulo de E-commerce
Como visitante, quiero ver la galería de productos y sus detalles.

Como administrador, quiero poder añadir, modificar y eliminar productos de la tienda.

3. Requisitos No Funcionales
Rendimiento: Carga inicial de páginas principales < 3 segundos.

Seguridad: Contraseñas hasheadas, protección de rutas de administrador.

Usabilidad: Diseño responsivo para móvil y escritorio.

4. Hitos del Proyecto
Hito 1: Backend - Núcleo y Autenticación

- [ ] Configuración del proyecto y conexión a la BD.

- [ ] Implementación de los modelos/tablas de la BD.

- [ ] Endpoints para registro, login y gestión de roles.

Hito 2: Backend - Lógica de Negocio

- [ ] Endpoints CRUD para el Blog.

- [ ] Endpoints CRUD para el E-commerce.

Hito 3: Frontend - Estructura y Vistas

- [ ] Configuración del proyecto React.

- [ ] Creación de componentes de UI reutilizables.

- [ ] Implementación de las vistas públicas (blog, tienda).

Hito 4: Frontend - Integración y Paneles de Admin

- [ ] Conexión de las vistas con la API.

- [ ] Creación de los formularios y paneles para la gestión de contenido.

[ ] Pruebas y despliegue.