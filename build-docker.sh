#!/bin/bash

# Script para construir la imagen Docker de SkinLabs con las variables de entorno necesarias

echo "🔨 Construyendo imagen Docker de SkinLabs..."

# Verificar que existe el archivo .env
if [ ! -f ".env" ]; then
    echo "❌ Error: Archivo .env no encontrado"
    exit 1
fi

# Extraer las variables de entorno del archivo .env
source .env

# Construir la imagen con las variables necesarias
docker build \
    --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" \
    --build-arg CLERK_SECRET_KEY="$CLERK_SECRET_KEY" \
    -t skinslabs-app \
    .

if [ $? -eq 0 ]; then
    echo "✅ Imagen Docker construida exitosamente"
    echo "📦 Para ejecutar la aplicación:"
    echo "   docker run --env-file .env -p 3000:3000 skinslabs-app"
else
    echo "❌ Error al construir la imagen Docker"
    exit 1
fi
