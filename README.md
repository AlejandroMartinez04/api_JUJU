# API_JUJU

API de JUJU Books
Esta API proporciona funcionalidades para gestionar libros en una base de datos. Utiliza Express.js para el enrutamiento, Mongoose para interactuar con una base de datos MongoDB y JWT (JSON Web Token) para la autenticación.
Prerrequisitos:
Node.js y npm instalados
Base de datos MongoDB configurada (cluster en la nube ya desplegado)
Instalación:
Clona este repositorio:
git clone https://github.com/AlejandroMartinez04/api_JUJU.git

Navega al directorio del proyecto:
cd Api_JUJU

Instala las dependencias:
npm install nodemon jsonwebtoken mongoose express dotenv


Variables de Entorno:
Crea un archivo .env en la raíz del proyecto para almacenar información confidencial:
SECRET=your_secret_key  # Usado para la firma de JWT


Conexión a la Base de Datos:
Asegúrate de tener una base de datos MongoDB en ejecución y configura la cadena de conexión en el código de tu aplicación (típicamente en un archivo separado como database.js).
Rutas de la API:
1. Autenticación (POST api/token):
   
Esta ruta emite un token JWT después de una validación exitosa (actualmente con credenciales predefinidas en el código). En un entorno de producción, será necesario implementar un mecanismo de autenticación de usuario adecuado, como una colección de users los cuales tengan un nombre correo y contraseña, para con estos hacer el match y que el JWT nos devuelva el token 
Cuerpo de la Solicitud:
No se requiere ninguno (actualmente)

2. Obtener Todos los Libros (GET api/book):

Recupera todos los libros de la base de datos.
Requiere un token JWT válido en el encabezado de autorización (con formato Bearer <token>).

3. Crear un Libro (POST api/book):
   
Crea un nuevo libro en la base de datos.
Requiere un token JWT válido en el encabezado de autorización.
Cuerpo de la Solicitud:
Datos del libro en formato JSON (por ejemplo, título, autor, anioPublicacion, estado[“disponible”,”reservado”]).

4. Obtener un Libro por ID (GET api/book/:id):
   
Recupera un libro específico en base a su ID.
Requiere un token JWT válido en el encabezado de autorización.
Parámetro URL:
id: El identificador único del libro (debe conocer previamente el id del libro a buscar)

5. Actualizar un Libro (PATCH api/book/:id):
   
Actualiza un libro existente utilizando actualizaciones parciales.
Requiere un token JWT válido en el encabezado de autorización.
Parámetro URL:
id: El identificador único del libro
Cuerpo de la Solicitud:
Datos de actualización del libro en formato JSON (solo las propiedades que deseas cambiar)
Manejo de Errores:
Las rutas de la API manejan errores potenciales y devuelven códigos HTTP apropiados junto con mensajes informativos.

6. Obtener la documentacion de swagger(GET /api/docs):
   
Recupera un libro específico en base a su ID.
Requiere un token JWT válido en el encabezado de autorización.
Parámetro URL:
id: El identificador único del libro (debe conocer previamente el id del libro a buscar)

Ejemplo de Uso:
Inicia el servidor Node.js (asumiendo que tu archivo principal de aplicación es app.js):
npm run dev

7. Eliminar un Libro (DELETE /book/:id)
   
Permite a usuarios autorizados eliminar un libro de la base de datos por su ID.
Requiere un token JWT válido en el encabezado de autorización (con formato Bearer <token>). El token debe tener el rol admin para estar autorizado para la eliminación.
Parámetro URL:
id: El identificador único del libro

Usa una herramienta como Postman para enviar solicitudes a los puntos finales de la API. Recuerda establecer el encabezado de autorización con un token JWT válido para las rutas seguras.

Consideraciones Adicionales:
La implementación actual utiliza credenciales codificadas para la generación de tokens. En producción, necesitarás un mecanismo de autenticación adecuado (por ejemplo, inicio de sesión de usuario con nombre de usuario/contraseña o inicio de sesión social).
Implementa un manejo de errores y una validación más robustos para los cuerpos de las solicitudes y los parámetros.
Considera la limitación de velocidad para evitar el abuso.
Explora roles y permisos de usuario para un control de acceso más granular.
Este README proporciona una base sólida para comprender y usar la API. No dudes en personalizarlo y extenderlo según sea necesario para los requisitos específicos de tu proyecto.
