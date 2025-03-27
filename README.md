# -TallerManager_Frontend
TallerManager es una aplicación desarrollada en React.js para la gestión de talleres mecánicos. Permite administrar clientes, vehículos, órdenes de trabajo y usuarios de manera eficiente.

# - Características

  1. Gestión de usuarios: Creación y administración de usuarios del sistema.
    
  2. Gestión de clientes: Permite agregar, editar y listar clientes. Cada cliente puede tener uno o más vehículos asociados.
    
  3. Órdenes de trabajo:  Se pueden registrar órdenes de trabajo con la siguiente información:
  * Cliente y vehículo asociado.
  * Kilometraje.
  * Repuestos necesarios (cantidad y precio).
  * Servicios necesarios (precio).
  * Observaciones.
  * Estado de la orden (pendiente, entregado, en proceso, etc.).
  * Prioridad de la orden (baja, normal, alta).
  * Fotografías del vehículo.
  
  4. Dashboard: 
  Resumen general de las órdenes de trabajo y clientes registrados.

# - Listados: 
  Visualización de usuarios, ordenes y clientes registrados en el sistema.

# - Tecnologías Utilizadas
  React.js, Tailwind CSS, React Router, GSAP, Toastify.


# - Instalación y Ejecución
### Clona este repositorio:
    git clone https://github.com/EduardoMaulenEscarate/-TallerManager_Frontend.git

### Accede al directorio del proyecto:
    cd frontend

### Instala las dependencias:
    npm install
### Inicia el servidor de desarrollo:
    npm run dev
  
# - Conexión con la API

> [!WARNING]
> Este frontend se conecta a una API para la gestión de datos. Más detalles sobre la configuración de la API se documentarán más adelante.

# - Estructura del Proyecto
    frontend/
    │-- public/
    │-- src/
    │   │-- api/
    │   │-- assets/
    │   │-- components/
    │   │   │-- form/
    │   │   │-- navbar/
    │   │-- contexts/
    │   │-- hooks/
    │   │-- pages/
    │   │-- validations/
    │   │-- App.js
    │   │-- main.js
    │-- .gitignore
    │-- Dockerfile
    │-- package.json
    │-- README.md
    │-- tailwind.config.js

# - Licencia

Este proyecto es privado y no está disponible para contribuciones externas.
