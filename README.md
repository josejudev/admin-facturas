# Pasos para la instalación

### 1. Instalar GIT
### 2.- Clonar el repositorio
`git clone https://github.com/josejudev/admin-facturas.git`

### 1. Instalar Node.js en su última versión. Puedes descargarlo desde [el sitio oficial de Node.js](https://nodejs.org/).
### 2. Instalar Postman. Puedes descargarlo desde [la página de descargas de Postman](https://www.postman.com/downloads/). 
 ### 3. Instalar mariaDB y asignar el usuario "admin" y la contraseña "root".
 ### 4. Crear una base de datos llamada "admin_orders".
 ### 5. Navegar hasta la carpeta del proyecto y abrir la terminal. Luego ejecutar el siguiente comando para instalar todas las dependencias necesarias:
`npm install`
### 6. Hacer las migraciones con el siguiente comando (presionar Enter si se solicita un nombre de migración):
 `npx prisma migrate dev`
 
 ### 7. Ingresar a la terminal de MySQL o utilizar otro gestor de base de datos y ejecutar los siguientes comandos para crear los roles del sistema:
 `INSERT INTO role (name) VALUES ('admin');`
 `INSERT INTO role (name) VALUES ('user');`
 
### 8. Iniciar la aplicación en modo de desarrollo con el siguiente comando:
 `npm run dev`
 ### 9. Iniciar la aplicación en modo de produccion con el siguiente comando:
 `npm run build`
 
 ### 10. Abrir postman
 ### 11. Agregar un usuario administrador mediante Postman. Haz una solicitud POST a la siguiente URL: `http://localhost:3000/api/users`
Cuerpo de la solicitud:
`{
    "user_email":"admin2@mail.com",
    "user_name":"admin",
    "user_pass":"2398",
    "role_id":1
}`
Este es un ejemplo de cómo agregar un usuario administrador.

# Una vez hecho esto, abre el navegador y visita el siguiente enlace: [http://localhost:3000](http://localhost:3000/)