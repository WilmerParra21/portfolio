<div align="center">

# 🚀 Wilmer Parra Gómez — Portafolio

**Desarrollador de Software Full Stack · DevsParra**

Portafolio profesional construido con Vue 3, TypeScript y Tailwind CSS.
Diseño limpio, multilingüe (español / inglés) y optimizado para rendimiento y SEO.

[![Vue](https://img.shields.io/badge/Vue-3.2-42b883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.31-3ecf8e?logo=supabase&logoColor=white)](https://supabase.com/)

🌐 **[DevsParra.com](https://DevsParra.com/)**

</div>

---

## ✨ Características

- 🎨 **Diseño moderno y responsivo** — interfaz cuidada con modo oscuro, adaptada a móvil, tablet y escritorio.
- 🌍 **Multilingüe** — soporte para español e inglés con `vue-i18n`.
- ⚡ **Rendimiento** — construido con Vite para arranques y compilaciones rápidas.
- 🔍 **SEO listo** — metadatos Open Graph, Twitter Cards, `sitemap.xml`, `robots.txt` y datos estructurados.
- 🧩 **Arquitectura modular** — componentes organizados por capas (layout / features) y tipado estricto con TypeScript.
- 🗄️ **Datos flexibles** — integración opcional con Supabase, con datos de ejemplo incluidos para funcionar sin backend.

---

## 🛠️ Tecnologías

| Área | Herramientas |
|------|--------------|
| **Frontend** | Vue 3, TypeScript, Tailwind CSS |
| **Build** | Vite, PostCSS, Autoprefixer |
| **i18n** | vue-i18n |
| **Backend (opcional)** | Supabase |
| **Testing** | Playwright |

---

## 📂 Estructura del proyecto

```
portfolio/
├── public/                 # Recursos estáticos (imágenes, íconos, sitemap, robots)
│   └── images/
├── src/
│   ├── components/
│   │   ├── layout/         # Encabezado y pie de página
│   │   └── features/       # Secciones: Hero, About, Proyectos, Tecnologías, Contacto...
│   ├── composables/        # Lógica reutilizable (useSupabase)
│   ├── i18n/               # Configuración de idiomas
│   ├── types/              # Definiciones de TypeScript
│   ├── App.vue             # Componente raíz
│   └── main.ts             # Punto de entrada
├── index.html
├── vite.config.ts
└── tailwind.config.ts
```

---

## 🚀 Puesta en marcha

### Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/portfolio.git
cd portfolio

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en **http://localhost:5173**

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto. La integración con Supabase es **opcional**: si no la habilitas, el portafolio funciona con datos de ejemplo.

```env
VITE_SUPABASE_URL=tu-url-de-supabase
VITE_SUPABASE_ANON_KEY=tu-clave-anonima
VITE_ENABLE_SUPABASE=false
```

---

## 📜 Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con recarga en caliente. |
| `npm run build` | Verifica los tipos y genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la versión de producción para revisarla. |

---

## 📬 Contacto

<div align="center">

**Wilmer Parra Gómez**
Desarrollador de Software Full Stack · Venezuela · Remoto global

[![Sitio web](https://img.shields.io/badge/Web-DevsParra.com-050505?logo=googlechrome&logoColor=white)](https://DevsParra.com/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0a66c2?logo=linkedin&logoColor=white)](https://linkedin.com/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/)

</div>

---

<div align="center">

Hecho con ❤️ y Vue.

</div>
