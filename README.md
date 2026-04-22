# Semana 7 - Next.js + WordPress REST API 🚀

## 🌐 Descripción

En esta práctica he desarrollado una aplicación web con **Next.js** conectada a la **REST API de WordPress**.

El objetivo ha sido consumir contenido dinámico desde un CMS real y mostrarlo en un frontend moderno, simulando un entorno de desarrollo profesional.

Se ha trabajado con un Custom Post Type llamado **Portfolio**, desde el cual se obtienen los proyectos y sus datos asociados.

---

## ⚙️ Funcionalidades

- Página de inicio (`/`) con presentación personal
- Página de proyectos (`/proyectos`) con listado dinámico
- Conexión con WordPress mediante REST API
- Ruta dinámica (`/proyectos/[slug]`) para cada proyecto
- Visualización de contenido real desde WordPress
- Renderizado de campos personalizados (ACF):
  - Descripción corta
  - Imagen del proyecto
  - URL del proyecto
- Navegación entre páginas

---

## 🧠 Tecnologías utilizadas

- Next.js
- React
- TypeScript
- Tailwind CSS
- WordPress (CMS)
- WordPress REST API
- ACF (Advanced Custom Fields)

---

## 📁 Estructura del proyecto

- `/` → Página de inicio
- `/proyectos` → Listado de proyectos
- `/proyectos/[slug]` → Detalle individual de cada proyecto

---

## 🔗 Consumo de la API

Los datos se obtienen desde WordPress mediante el siguiente endpoint:

```bash
http://127.0.0.1/wordpress/wp-json/wp/v2/portfolio

Cada proyecto se filtra por su slug para mostrar el contenido en su página correspondiente.

🧩 Campos personalizados (ACF)

Se han utilizado los siguientes campos en WordPress:

descripcion_corta → texto descriptivo del proyecto
url_proyecto → enlace externo al proyecto
imagen_proyecto → imagen destacada del proyecto

Estos campos se consumen desde Next.js y se muestran dinámicamente en el frontend.



✅ Resultado

El resultado es una aplicación funcional que:

Muestra proyectos desde WordPress
Permite navegar entre ellos
Renderiza contenido dinámico en tiempo real
Simula un flujo real de desarrollo web profesional

👩‍💻 Autor

Jesica Serrano