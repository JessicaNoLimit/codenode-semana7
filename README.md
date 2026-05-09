# 🚀 Semana 9 — Next.js + Auth + Dashboard Privado

## ⚠️ Nota sobre producción (Vercel)

La aplicación está desplegada en Vercel:

👉 https://codenode-semana7.vercel.app/

Debido al uso de SQLite como base de datos local, los datos no persisten en producción, ya que Vercel utiliza un entorno serverless.

## 🌐 Descripción

En esta práctica he desarrollado una aplicación web con Next.js enfocada en autenticación, gestión de usuarios y paneles privados.

El proyecto evolucionó desde un portfolio básico hacia un pequeño dashboard privado de gestión de proyectos personales, incorporando funcionalidades reales de aplicaciones modernas como login, roles, comentarios y panel de administración.

---

## ⚙️ Funcionalidades implementadas

### 🔐 Autenticación
- Registro de usuarios
- Inicio de sesión
- Logout funcional
- Manejo de sesiones con Better Auth
- Protección de rutas privadas

### 👤 Perfil de usuario
- Página `/perfil`
- Edición del nombre de usuario
- Saludo personalizado dinámico
- Visualización del rol del usuario

### 📁 Gestión de proyectos
- CRUD completo de proyectos
- Creación, edición y eliminación
- Proyectos asociados al usuario autenticado
- Filtrado de proyectos por usuario

### 💬 Comentarios
- Sistema de comentarios en proyectos
- Comentarios almacenados en SQLite
- Asociación entre usuario, proyecto y comentario

### 👑 Panel Admin
- Ruta protegida `/admin`
- Acceso exclusivo para usuarios con rol `admin`
- Estadísticas generales:
  - número de usuarios
  - número de proyectos
  - número de comentarios

---

## 🗄️ Base de datos

Se ha utilizado SQLite junto con `better-sqlite3`.

Tablas principales:
- `user`
- `session`
- `account`
- `proyectos`
- `comentarios`

---

## 🧠 Conceptos trabajados

Durante esta práctica se trabajaron conceptos importantes de desarrollo web moderno:

- autenticación
- sesiones
- protección de rutas
- roles de usuario
- relaciones entre tablas
- renderizado dinámico
- manejo de estado autenticado
- paneles privados
- CRUDs completos
- estructura de aplicaciones reales con Next.js

---

## 🛠️ Tecnologías utilizadas

- Next.js
- TypeScript
- TailwindCSS
- Better Auth
- SQLite
- better-sqlite3
- Vercel

---

## 📦 Instalación

Clonar repositorio:
```bash
git clone https://github.com/JessicaNoLimit/codenode-semana7

Instalar dependencias:
npm install

Ejecutar servidor:

npm run dev

🔒 Variables de entorno

Crear archivo .env utilizando .env.example.


## 📚 Aprendizaje

Esta práctica permitió comprender mejor cómo estructurar aplicaciones reales con autenticación, gestión de usuarios y acceso privado, acercándose mucho más a una arquitectura utilizada en aplicaciones modernas.