# Backend API - Proyecto Gatos y Blog

Este backend está construido con Node.js y Express para manejar usuarios, posts de gatos, comentarios, mensajes y posts de blog (solo admin).  

---

## 🚀 Rutas principales

### Rutas de usuario (`/api/user`)
- `POST /register` - Registro de usuario (valida datos).
- `GET /activate` - Activar cuenta vía email.
- `POST /login` - Login de usuario (valida datos).
- `POST /updatepassword` - Actualizar contraseña.
- `POST /generate` - Solicitar nuevo token para reset de password.
- `PUT /profile` - Actualizar perfil y foto (requiere token).

---

### Rutas de posts de gatos (`/api/catpost`)
- `GET /` - Obtener todos los posts de gatos.
- `GET /type/:type` - Obtener posts filtrados por tipo de publicación.
- `GET /:id` - Obtener post por ID.
- `GET /user/:userId` - Obtener posts de un usuario.
- `POST /` - Crear post (con foto, requiere token).
- `PUT /:id` - Actualizar post (con foto, requiere token).
- `PATCH /:id/status` - Actualizar estado activo/resuelto (requiere token).
- `DELETE /:id` - Eliminar post por ID (requiere token).

---

### Rutas para comentarios en posts de gatos (`/api/catpost`)
- `GET /:catPostId/comments` - Obtener comentarios de un post.
- `POST /:catPostId/comments` - Crear comentario (requiere token).
- `PUT /comments/:commentId` - Editar comentario (requiere token).
- `DELETE /comments/:commentId` - Eliminar comentario (requiere token).

---

### Rutas de mensajes (`/api/message`)
- `POST /` - Enviar mensaje (requiere token).
- `GET /send` - Obtener mensajes enviados (requiere token).
- `GET /inbox` - Obtener mensajes recibidos (requiere token).
- `PATCH /read/:idMessage` - Marcar mensaje como leído (requiere token).

---

### Rutas de blog (`/api/blog`)
*(Solo administrador)*
- `POST /` - Crear post de blog (requiere token y rol admin).
- `GET /` - Obtener todos los posts de blog.
- `GET /:blogPostId` - Obtener post de blog por ID.
- `GET /user/:userId` - Obtener posts de blog por usuario (requiere token y rol admin).
- `PUT /:blogPostId` - Actualizar post de blog (requiere token y rol admin).
- `DELETE /:blogPostId` - Eliminar post de blog (requiere token y rol admin).

---

### 🔐 Seguridad

- Autenticación mediante JWT.
- Verificación de roles para rutas administrativas.
- Validación de datos con middleware.
- Subida de imágenes usando `multer` y `Cloudinary`.

---

### ⚙ Variables de entorno (`.env`)

```env
PORT=
SECRET_KEY=
CREATION_CODE=
MONGO_URI=
MAILTRAP_USER=
MAILTRAP_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
```
---

### Tecnologías usadas

Node.js

Express

MongoDB

JWT (jsonwebtoken)

Multer

Cloudinary

Mailtrap

---

### 📋 Uso

Clona el repositorio.

Configura el archivo .env con tus credenciales.

Ejecuta npm install para instalar dependencias.

Ejecuta npm start para iniciar el servidor.

---

### 📝 Notas

La ruta /api/blog está protegida para que solo administradores puedan crear y modificar posts de blog.

La funcionalidad de reset de contraseña está integrada con generación de tokens y envío de emails usando Mailtrap para testing.

Las imágenes se almacenan en Cloudinary mediante subida con multer.

Todos los endpoints que modifican datos requieren token JWT válido.

---

### 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.