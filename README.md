# 🌐 TagNLink

**TagNLink** es una aplicación web fullstack que permite a los usuarios registrados guardar enlaces de interés, personalizarlos con un título, organizarlos en categorías y filtrarlos fácilmente por título, categoría o fecha.

---

## 📁 Estructura del proyecto

```
TagNLink/
├── Backend/     # API REST - Node.js + Express + MySQL
├── TagNLink/    # Frontend - React (Vite)
└── .gitignore
```

---

## 🚀 Requisitos previos

- Node.js (v18 o superior)
- MySQL (v8 recomendado)
- Git

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tagnlink.git
cd tagnlink
```

---

### 2. Backend – Node.js + Express

```bash
cd Backend
npm install
```

#### 🔐 Configurar entorno

Crea un archivo `.env` con la configuración de la base de datos y JWT:

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=tagnlink_db
JWT_SECRET=clave_secreta
```

#### 🛠️ Ejecutar servidor

```bash
npm run dev
```

Por defecto se ejecuta en: `http://localhost:4000`

---

### 3. Frontend – React (Vite)

```bash
cd ../TagNLink
npm install
```

#### 🛠️ Ejecutar frontend

```bash
npm run dev
```

Por defecto se ejecuta en: `http://localhost:5173`

---

## 🔄 Flujo de desarrollo

1. Backend: Desarrollo de la API REST en Express.
2. Frontend: Interfaz React conectada vía fetch o librería HTTP.
3. Base de datos: MySQL con esquema relacional (usuarios, enlaces, categorías, etc.).

---

## 🧱 Tecnologías principales

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de datos:** MySQL
- **ORM recomendado:** [Sequalize](https://www.prisma.io/) (por facilidad y claridad)
- **Autenticación:** JWT
- **Control de versiones:** Git

---

## 📌 Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Guardar enlaces con título personalizado.
- Clasificar enlaces en categorías creadas por el usuario.
- Filtros por categoría, fecha y título.
- Interfaz moderna y responsive.

---

## 📄 Licencia

MIT — Libre uso con atribución.

---

## ✨ Autor

Desarrollado por [Yulian Borges Lobaina](https://github.com/SlytherinEC)
