# 🔧 COMANDOS PARA SOLUCIONAR EL ERROR EN TU VPS

## 🎯 **PROBLEMA IDENTIFICADO**
El error ocurre porque la página `/bots-disponibles` intenta hacer peticiones GraphQL durante el build estático, pero el backend no está disponible en tiempo de build.

## ✅ **SOLUCIÓN: Hacer la página dinámica**

### **1. Crear archivo de configuración para rutas dinámicas**

```bash
# En tu VPS, en el directorio /srv/landings/skinslabs/
nano src/app/bots-disponibles/page.tsx
```

### **2. Agregar la configuración dynamic**

Agrega esta línea al inicio del archivo `src/app/bots-disponibles/page.tsx`:

```typescript
// Forzar renderizado dinámico para evitar errores en build time
export const dynamic = 'force-dynamic';
```

### **3. También para la página mis-bots**

```bash
nano src/app/mis-bots/page.tsx
```

Agregar la misma línea:

```typescript
// Forzar renderizado dinámico
export const dynamic = 'force-dynamic';
```

### **4. Alternativa rápida: Usar variables de entorno**

O puedes crear un archivo de configuración:

```bash
nano next.config.js
```

Y modificarlo para incluir:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Forzar SSR para páginas que requieren datos externos
  experimental: {
    forceSwcTransforms: true,
  },
  // Configurar generación estática
  generateStaticParams: false,
}

module.exports = nextConfig
```

## 🚀 **COMANDOS COMPLETOS PARA EJECUTAR**

### **Opción A: Editar archivos directamente (RÁPIDO)**

```bash
# 1. Editar página bots-disponibles
sed -i '1i export const dynamic = '\''force-dynamic'\'';' src/app/bots-disponibles/page.tsx

# 2. Editar página mis-bots  
sed -i '1i export const dynamic = '\''force-dynamic'\'';' src/app/mis-bots/page.tsx

# 3. Verificar los cambios
head -5 src/app/bots-disponibles/page.tsx
head -5 src/app/mis-bots/page.tsx

# 4. Intentar el build nuevamente
./deploy.sh deploy
```

### **Opción B: Build manual con variables (RECOMENDADO)**

```bash
# 1. Crear archivo .env.production con variables correctas
cat > .env.production << 'EOF'
# Backend URLs
NEXT_PUBLIC_GRAPHQL_URL=http://69.62.89.201:8181/graphql
NEXT_PUBLIC_REST_API_URL=http://69.62.89.201:8181/api
NEXT_PUBLIC_CATALOGO_URL=http://69.62.89.201:8181/catalogo

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bG92ZWQtc2F0eXItNjMuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_jmtSAQ1VGFXpM7hJRFHHC3USCbbwJQcyj6EyUt6RT4

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=56912345678
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs

# Company info
NEXT_PUBLIC_COMPANY_NAME=SkinsLabs
NEXT_PUBLIC_COMPANY_DESCRIPTION=Asistentes Virtuales con IA para automatizar tu atención al cliente
NEXT_PUBLIC_APP_URL=https://skinslabs.com
NEXT_PUBLIC_APP_NAME=SkinsLabs - Asistentes Virtuales IA

# Environment
NODE_ENV=production
EOF

# 2. Build manual con Docker
docker build \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_bG92ZWQtc2F0eXItNjMuY2xlcmsuYWNjb3VudHMuZGV2JA" \
  --build-arg CLERK_SECRET_KEY="sk_test_jmtSAQ1VGFXpM7hJRFHHC3USCbbwJQcyj6EyUt6RT4" \
  --build-arg NODE_ENV=production \
  -t skinslabs-app .

# 3. Si el build es exitoso, ejecutar el contenedor
docker run -d \
  --name skinslabs-prod \
  --env-file .env.production \
  -p 80:3000 \
  --restart unless-stopped \
  skinslabs-app
```

### **Opción C: Build sin páginas problemáticas (TEMPORAL)**

```bash
# 1. Temporarily disable problematic pages during build
mkdir -p temp_backup
mv src/app/bots-disponibles temp_backup/
mv src/app/mis-bots temp_backup/

# 2. Build the app
docker build \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_bG92ZWQtc2F0eXItNjMuY2xlcmsuYWNjb3VudHMuZGV2JA" \
  --build-arg CLERK_SECRET_KEY="sk_test_jmtSAQ1VGFXpM7hJRFHHC3USCbbwJQcyj6EyUt6RT4" \
  -t skinslabs-app .

# 3. Restore the pages after successful build
mv temp_backup/* src/app/
rmdir temp_backup

# 4. Run the container
docker run -d \
  --name skinslabs-prod \
  --env-file .env \
  -p 80:3000 \
  --restart unless-stopped \
  skinslabs-app
```

## 🔧 **COMANDOS DE VERIFICACIÓN**

```bash
# Verificar que el contenedor está corriendo
docker ps

# Ver logs del contenedor
docker logs skinslabs-prod

# Probar la aplicación
curl http://localhost/api/health

# Verificar desde fuera
curl http://69.62.89.201/api/health
```

## 🎯 **RECOMENDACIÓN**

Te recomiendo usar la **Opción A** primero (es la más rápida), y si no funciona, usar la **Opción B**.

¿Quieres que empecemos con la Opción A? Solo ejecuta estos comandos:

```bash
sed -i '1i export const dynamic = '\''force-dynamic'\'';' src/app/bots-disponibles/page.tsx
sed -i '1i export const dynamic = '\''force-dynamic'\'';' src/app/mis-bots/page.tsx
./deploy.sh deploy
```
