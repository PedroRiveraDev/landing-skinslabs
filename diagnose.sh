#!/bin/bash

# Script de diagnóstico para verificar el estado del deployment
# Ejecutar en el VPS para diagnosticar problemas

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_debug() {
    echo -e "${BLUE}[DEBUG]${NC} $1"
}

echo "🔍 Diagnóstico del Deployment SkinsLabs"
echo "========================================"

# 1. Verificar contenedores
print_status "1. Verificando contenedores Docker..."
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# 2. Verificar puertos
print_status "2. Verificando puertos abiertos..."
netstat -tlnp | grep -E "(3000|3002)" || echo "No se encontraron puertos 3000/3002 abiertos"

# 3. Verificar conectividad local
print_status "3. Verificando conectividad local..."

# Verificar puerto interno (3000)
print_debug "Verificando puerto interno 3000..."
curl -s -o /dev/null -w "Puerto 3000: %{http_code}\n" http://localhost:3000/ || echo "Puerto 3000: No responde"

# Verificar puerto externo (3002)
print_debug "Verificando puerto externo 3002..."
curl -s -o /dev/null -w "Puerto 3002: %{http_code}\n" http://localhost:3002/ || echo "Puerto 3002: No responde"

# 4. Verificar health check específicamente
print_status "4. Verificando endpoints de health..."

print_debug "Health check puerto 3000..."
curl -s http://localhost:3000/api/health 2>/dev/null | jq . 2>/dev/null || curl -s http://localhost:3000/api/health 2>/dev/null || echo "Health check puerto 3000: No responde"

print_debug "Health check puerto 3002..."
curl -s http://localhost:3002/api/health 2>/dev/null | jq . 2>/dev/null || curl -s http://localhost:3002/api/health 2>/dev/null || echo "Health check puerto 3002: No responde"

# 5. Verificar logs recientes
print_status "5. Logs recientes del contenedor..."
docker logs --tail 10 skinslabs_web_1 2>/dev/null || docker logs --tail 10 $(docker ps -q) 2>/dev/null || echo "No se pudieron obtener logs"

# 6. Verificar variables de entorno
print_status "6. Verificando configuración..."
if [ -f .env.docker ]; then
    echo "✅ Archivo .env.docker existe"
    echo "Variables principales:"
    grep -E "^(NEXT_PUBLIC_|NODE_ENV)" .env.docker | head -5
else
    echo "❌ Archivo .env.docker no encontrado"
fi

# 7. Verificar conectividad al backend
print_status "7. Verificando conectividad al backend..."
curl -s -o /dev/null -w "Backend GraphQL: %{http_code}\n" http://69.62.89.201:8181/graphql || echo "Backend GraphQL: No responde"

# 8. Verificar desde el exterior (IP pública)
print_status "8. Verificando acceso desde IP pública..."
curl -s -o /dev/null -w "IP Pública puerto 3002: %{http_code}\n" http://69.62.89.201:3002/ || echo "IP Pública puerto 3002: No responde"

print_status "9. Verificando health check desde IP pública..."
curl -s http://69.62.89.201:3002/api/health 2>/dev/null | jq . 2>/dev/null || curl -s http://69.62.89.201:3002/api/health 2>/dev/null || echo "Health check IP pública: No responde"

echo ""
echo "🏁 Diagnóstico completado"
echo "========================="
