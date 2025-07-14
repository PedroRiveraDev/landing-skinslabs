#!/bin/bash

# Script para configurar el archivo .env.docker en el VPS
# Este script debe ejecutarse en el servidor VPS

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_status "Configurando archivo .env.docker para el VPS..."

# Verificar si existe el template
if [ -f .env.docker.template ]; then
    print_status "Copiando .env.docker.template a .env.docker..."
    cp .env.docker.template .env.docker
elif [ -f env.example ]; then
    print_status "Creando .env.docker desde env.example..."
    cp env.example .env.docker
    
    # Agregar variables específicas de Docker
    echo "" >> .env.docker
    echo "# Configuración específica para Docker" >> .env.docker
    echo "NODE_ENV=production" >> .env.docker
    echo "GRAPHQL_URL=http://69.62.89.201:8181/graphql" >> .env.docker
    echo "REST_API_URL=http://69.62.89.201:8181/api" >> .env.docker
    echo "CATALOGO_URL=http://69.62.89.201:8181/catalogo" >> .env.docker
    
    # Actualizar URL de la app para producción
    sed -i 's|NEXT_PUBLIC_APP_URL=http://localhost:3000|NEXT_PUBLIC_APP_URL=http://69.62.89.201:3002|g' .env.docker
else
    print_error "No se encontró .env.docker.template ni env.example"
    print_error "Creando .env.docker con configuración básica..."
    
    cat > .env.docker << EOF
# Configuración del Backend para Docker
GRAPHQL_URL=http://69.62.89.201:8181/graphql
REST_API_URL=http://69.62.89.201:8181/api
CATALOGO_URL=http://69.62.89.201:8181/catalogo

# URLs públicas para el cliente (navegador)
NEXT_PUBLIC_GRAPHQL_URL=http://69.62.89.201:8181/graphql
NEXT_PUBLIC_REST_API_URL=http://69.62.89.201:8181/api
NEXT_PUBLIC_CATALOGO_URL=http://69.62.89.201:8181/catalogo

# Clerk - Autenticación (OBLIGATORIO)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bG92ZWQtc2F0eXItNjMuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_jmtSAQ1VGFXpM7hJRFHHC3USCbbwJQcyj6EyUt6RT4

# Configuración de WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=56912345678
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs

# Configuración de la empresa - URL de producción VPS
NEXT_PUBLIC_COMPANY_NAME=SkinsLabs
NEXT_PUBLIC_COMPANY_DESCRIPTION=Asistentes Virtuales con IA para automatizar tu atención al cliente
NEXT_PUBLIC_APP_URL=http://69.62.89.201:3002
NEXT_PUBLIC_APP_NAME=SkinsLabs - Asistentes Virtuales IA

# Analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=

# Configuración específica para Docker
NODE_ENV=production
EOF
fi

print_status "✅ Archivo .env.docker configurado exitosamente"
print_status "📋 Verificando contenido del archivo..."

if [ -f .env.docker ]; then
    echo "Archivo .env.docker creado con las siguientes variables:"
    grep -E "^[A-Z]" .env.docker | head -10
    echo "..."
    print_status "🚀 Ahora puedes ejecutar: ./deploy.sh deploy"
else
    print_error "❌ Error al crear el archivo .env.docker"
    exit 1
fi
