# Zero Trust Frontend

Frontend desarrollado con React y Vite para la aplicación web segura bajo un enfoque Zero Trust.

El sistema proporciona una interfaz de autenticación y un Dashboard protegido. La identidad del usuario es validada por el Backend mediante JSON Web Tokens (JWT) antes de permitir el acceso a los recursos protegidos.

## Tecnologías utilizadas

- React
- Vite
- React Router DOM
- JavaScript
- CSS
- Fetch API
- JWT para autenticación
- ESLint

## Arquitectura

El Frontend utiliza una estructura modular que separa las responsabilidades de la aplicación.

```text
src/
├── components/
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthProvider.jsx
│   ├── authContext.js
│   └── useAuth.js
├── pages/
│   ├── DashboardPage.jsx
│   └── LoginPage.jsx
├── services/
│   └── authService.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

### Responsabilidades

**components/**  
Contiene componentes reutilizables. `ProtectedRoute` controla el acceso a las rutas que requieren autenticación.

**context/**  
Gestiona el estado de autenticación de la aplicación mediante React Context.

**pages/**  
Contiene las vistas principales del sistema: Login y Dashboard.

**services/**  
Centraliza la comunicación HTTP con el Backend.

## Autenticación

El flujo de autenticación funciona de la siguiente manera:

1. El usuario introduce su nombre de usuario y contraseña.
2. El Frontend envía las credenciales a:

```text
POST /api/auth/login
```

3. El Backend valida las credenciales.
4. Si son correctas, el Backend genera un JWT.
5. El Frontend recibe el token.
6. Antes de establecer la sesión, consulta:

```text
GET /api/auth/me
```

7. El Backend valida nuevamente el JWT y comprueba que el usuario continúe activo.
8. Si la validación es correcta, se permite el acceso al Dashboard.
9. Las solicitudes a recursos protegidos incluyen:

```text
Authorization: Bearer <JWT>
```

## Protección del Dashboard

La ruta:

```text
/dashboard
```

se encuentra protegida mediante `ProtectedRoute`.

Si no existe una sesión autenticada, el usuario es redirigido automáticamente a:

```text
/login
```

La protección del Frontend funciona como control de navegación y experiencia de usuario. La autorización real de los recursos protegidos se realiza en el Backend mediante la validación del JWT y del estado actual del usuario.

## Enfoque Zero Trust

El Frontend aplica principios relacionados con Zero Trust:

- No considera autenticado al usuario únicamente por acceder a una ruta.
- El JWT debe ser validado por el Backend.
- Después del Login se realiza una validación adicional mediante `/api/auth/me`.
- El Dashboard consume un recurso protegido del Backend.
- La información de autenticación se mantiene en memoria durante la sesión de la aplicación.
- No se almacena el JWT en `localStorage` ni `sessionStorage`.
- Al cerrar sesión se elimina el token y la información del usuario del estado de React.
- El Backend vuelve a consultar el estado del usuario antes de autorizar recursos protegidos.

## Comunicación con el Backend

Durante el desarrollo local, Vite utiliza un proxy:

```text
Frontend
http://localhost:5173
        |
        | /api
        v
Backend
http://localhost:3000
```

La configuración se encuentra en:

```text
vite.config.js
```

Esto permite que el Frontend realice solicitudes utilizando rutas relativas como:

```text
/api/auth/login
/api/auth/me
/api/dashboard
```

## Instalación

Instalar las dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

## Validación del código

Ejecutar ESLint:

```bash
npm run lint
```

## Compilación para producción

Generar la versión optimizada:

```bash
npm run build
```

Vite genera los archivos de producción dentro de:

```text
dist/
```

## Despliegue previsto en AWS

La arquitectura de producción utilizará dos VPC independientes:

```text
Internet
   |
 HTTPS
   |
Frontend VPC
   |
EC2 Frontend
React + Nginx
   |
   | /api
   |
VPC Peering
   |
Backend VPC
   |
EC2 Backend
Node.js + Express
   |
 MySQL
```

Nginx servirá los archivos compilados del Frontend y funcionará como reverse proxy para las solicitudes `/api`.

La comunicación entre Frontend y Backend se realizará mediante direccionamiento privado a través de VPC Peering.

El Backend no deberá exponerse públicamente cuando la comunicación privada entre las VPC sea suficiente.

## Seguridad prevista en producción

La infraestructura incorporará:

- HTTPS.
- Certificado digital.
- Nginx.
- Security Groups con principio de mínimo privilegio.
- Segmentación mediante VPC independientes.
- VPC Peering.
- Backend restringido a comunicación privada.
- Autenticación JWT.
- Validación continua del usuario.
- Rate limiting.
- Fail2Ban para intentos repetidos de autenticación.
- Security Headers.
- Análisis mediante SecurityHeaders.com.

## Endpoints utilizados

| Método | Endpoint | Protección |
|---|---|---|
| POST | `/api/auth/login` | Público |
| GET | `/api/auth/me` | JWT |
| GET | `/api/dashboard` | JWT |

## Estado actual

Actualmente se ha comprobado correctamente:

- Interfaz de Login.
- Manejo de credenciales inválidas.
- Autenticación mediante JWT.
- Validación de sesión mediante `/api/auth/me`.
- Acceso al Dashboard protegido.
- Redirección al Login sin autenticación.
- Cierre de sesión.
- Comunicación Frontend-Backend mediante proxy de Vite.
- ESLint sin errores.
- Compilación de producción mediante Vite.

## Autor

Diego Mérida