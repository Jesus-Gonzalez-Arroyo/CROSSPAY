# 🚀 CrossPay Backend

Contiene una API REST para registrar y consultar transacciones financieras, con autenticación básica (JWT) y documentación Swagger

---

## 📦 Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)

---

## 📁 Estructura del proyecto

```
src/
├── app.ts                # Configuración de la app Express
├── server.ts             # Punto de entrada
├── controllers/          # Lógica HTTP (handlers)
├── services/             # Lógica de negocio y BD
├── routes/               # Definición de endpoints
├── config/               # Configuración de PostgreSQL
├── middlewares/          # Middlewares como auth
├── types/                # Interfaces y tipos
```


## 🚀 Ejecución local

### 1. Clona el repositorio

```bash
git clone https://github.com/Jesus-Gonzalez-Arroyo/CROSSPAY
cd backend
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Ejecuta el proyecto en modo desarrollo

```bash
npm run dev
```

---

## 🐳 Ejecución con Docker

### 1. Construye la imagen

```bash
docker build -t crosspay-backend .
```

### 2. Ejecuta el contenedor

```bash
docker run -p 3000:3000 --env-file .env crosspay-backend
```

---

## 📘 Documentación Swagger

Una vez el servidor esté corriendo, puedes acceder a la documentación Swagger en:

📚 [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## 📮 Endpoints principales

### Auth

| Método | Endpoint         | Descripción                  |
|--------|------------------|------------------------------|
| POST   | `/auth/login`    | Iniciar sesión (JWT)         |

### Transacciones

| Método | Endpoint            | Descripción                    |
|--------|---------------------|--------------------------------|
| POST   | `/transactions`     | Crear nueva transacción        |
| GET    | `/transactions`     | Obtener todas (requiere JWT)  |

---

# 💳 CrossPay Frontend

Este proyecto es una aplicación frontend desarrollada en **Angular** que simula un sistema de pagos con formulario de transacciones y un panel administrativo. El propósito es mostrar y registrar transacciones con autenticación y conexión a una API externa.

---

## 🚀 Tecnologías utilizadas

- [Angular 17+](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [SweetAlert2](https://sweetalert2.github.io/)

---

## 📦 Estructura principal

```
src/
├── app/
│   ├── components/
│   │   ├── layouts/            # layouts de las paginas 
│   ├── core/
│   │   ├── services/           # Servicios HTTP (Auth, Transactions)
│   │   ├── models/             # Interfaces de datos
│   │   |── interceptors/       # Interceptor para agregar token
|   |   └── guards/             # Guards para proteger las rutas que necesitan autenticacion
|   |── pages/
|   |   ├── form
|   |   ├── login
|   |   └── panel-admin 
└── app.ts
```

---

## ⚙️ Requisitos previos

- Node.js `>=18`
- Angular CLI instalado globalmente:  
  ```bash
  npm install -g @angular/cli
  ```

---

## 🧪 Ejecución en desarrollo

### Clona el repositorio

```bash
git clone https://github.com/Jesus-Gonzalez-Arroyo/CROSSPAY
cd frontend
```

### Instala las dependencias

```bash
npm install
```

### Ejecuta el proyecto

```bash
ng serve
```

Abre tu navegador en `http://localhost:4200`.

---

## 📋 Características

### ✔️ Formulario de pagos

- Divisa (COP o USD)
- Monto
- Descripción
- Nombre
- Tipo y número de documento
- Número de tarjeta (con formato y validaciones)
- Fecha de vencimiento (MM/AA)
- Código de seguridad (CVV)
- Botón "Pagar" con loader

### ✔️ Panel administrativo

- Login de administrador
- Tabla con:
  - Divisa
  - Monto (formateado)
  - Descripción
  - Nombre
  - Tipo de documento
  - Fecha de transacción (con hora AM/PM)
- Loader mientras se cargan los datos

