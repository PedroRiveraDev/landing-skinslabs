# SkinLabs 🌟

## Descripción

SkinLabs es una aplicación web moderna desarrollada con Next.js, TypeScript y Tailwind CSS. Este proyecto está diseñado para ofrecer una experiencia de usuario excepcional con las últimas tecnologías web, incluyendo optimizaciones de accesibilidad, performance y configuración flexible.

## Tecnologías Principales 🚀

- [Next.js](https://nextjs.org/) (v15.3.3) - Framework de React para producción
- [React](https://reactjs.org/) (v19.0.0) - Biblioteca para interfaces de usuario
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Tailwind CSS](https://tailwindcss.com/) (v4) - Framework de CSS utilitario
- [Docker](https://www.docker.com/) - Containerización
- [AOS](https://michalsnik.github.io/aos/) - Animaciones On Scroll

## Características Destacadas ✨

- **Accesibilidad (A11y)**: Navegación por teclado, atributos ARIA, y soporte para lectores de pantalla
- **Performance Optimizada**: Imágenes optimizadas con Next.js Image, lazy loading, y formatos modernos
- **Configuración Flexible**: Variables de entorno para personalización fácil
- **Responsive Design**: Diseño adaptativo para todos los dispositivos
- **SEO Optimizado**: Metadata estructurada y optimización para motores de búsqueda

## Requisitos Previos 📋

- Node.js (versión recomendada: 18.x o superior)
- npm o yarn
- Docker (opcional, para desarrollo con contenedores)

## Instalación 🛠️

### Desarrollo Local

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Configuración de contacto
NEXT_PUBLIC_WHATSAPP_NUMBER=56912345678
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs

# Configuración de la empresa
NEXT_PUBLIC_COMPANY_NAME=SkinsLabs
NEXT_PUBLIC_COMPANY_DESCRIPTION=Asistentes Virtuales con IA para automatizar tu atención al cliente

# Configuración de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SkinsLabs - Asistentes Virtuales IA

# Configuración de analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

### Usando Docker

```bash
# Construir la imagen
docker-compose build

# Iniciar los contenedores
docker-compose up
```

## Scripts Disponibles 📜

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Estructura del Proyecto 📁

```
skinslabs/
├── src/
│   ├── app/              # Páginas de Next.js App Router
│   ├── components/       # Componentes reutilizables
│   │   ├── sections/     # Secciones de la página
│   │   ├── ui/          # Componentes de UI básicos
│   │   └── landingPages/ # Componentes específicos para landing pages
│   ├── config/          # Configuración (variables de entorno, etc.)
│   └── styles/          # Estilos globales
├── public/              # Archivos estáticos
├── .next/              # Archivos generados por Next.js
├── Dockerfile          # Configuración de Docker
└── docker-compose.yml  # Configuración de Docker Compose
```

## Mejoras Implementadas 🚀

### Accesibilidad (A11y)

- ✅ Navegación por teclado completa
- ✅ Atributos ARIA apropiados
- ✅ Soporte para lectores de pantalla
- ✅ Manejo de `prefers-reduced-motion`
- ✅ Focus management mejorado

### Performance

- ✅ Optimización de imágenes con Next.js Image
- ✅ Lazy loading de componentes
- ✅ Formatos de imagen modernos (WebP)
- ✅ Placeholder blur para mejor UX
- ✅ Sizes responsive para imágenes

### Configuración

- ✅ Variables de entorno centralizadas
- ✅ Configuración TypeScript para env vars
- ✅ Helper functions para URLs dinámicas
- ✅ Valores por defecto seguros

## Configuración de Desarrollo 🔧

El proyecto incluye:

- ESLint para linting
- TypeScript para tipado estático
- Tailwind CSS v4 para estilos
- Configuración de Docker para desarrollo y producción
- Optimizaciones de accesibilidad y performance

## Despliegue 🚀

La aplicación está configurada para ser desplegada fácilmente en plataformas como Vercel o utilizando Docker en cualquier proveedor de servicios en la nube.

```bash
# Construir para producción
npm run build

# Iniciar en producción
npm run start
```

## Contribuir 🤝

1. Fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Próximas Mejoras 🎯

- [ ] Implementar PWA (Progressive Web App)
- [ ] Agregar testing con Jest y Testing Library
- [ ] Implementar analytics (Google Analytics/Plausible)
- [ ] Agregar CMS para contenido dinámico
- [ ] Implementar A/B testing
- [ ] Agregar chat en vivo integrado

---

**Nota**: Asegúrate de configurar las variables de entorno antes de ejecutar el proyecto en producción.
