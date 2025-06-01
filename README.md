# SkinLabs 🌟

## Descripción
SkinLabs es una aplicación web moderna desarrollada con Next.js, TypeScript y Tailwind CSS. Este proyecto está diseñado para ofrecer una experiencia de usuario excepcional con las últimas tecnologías web.

## Tecnologías Principales 🚀
- [Next.js](https://nextjs.org/) (v15.3.3) - Framework de React para producción
- [React](https://reactjs.org/) (v19.0.0) - Biblioteca para interfaces de usuario
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS utilitario
- [Docker](https://www.docker.com/) - Containerización

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

# Iniciar servidor de desarrollo
npm run dev
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
├── pages/          # Páginas de Next.js
├── public/         # Archivos estáticos
├── src/           # Código fuente
├── .next/         # Archivos generados por Next.js
├── Dockerfile     # Configuración de Docker
└── docker-compose.yml
```

## Configuración de Desarrollo 🔧
El proyecto incluye:
- ESLint para linting
- TypeScript para tipado estático
- Tailwind CSS para estilos
- Configuración de Docker para desarrollo y producción

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


---

