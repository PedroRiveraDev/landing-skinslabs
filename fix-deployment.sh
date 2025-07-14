#!/bin/bash

# Script de solución rápida para problemas comunes en el VPS
# Ejecutar si el deployment está teniendo problemas

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

echo "🔧 Solución Rápida - SkinsLabs Deployment"
echo "========================================="

# Función para verificar si la aplicación está funcionando
check_app() {
    if curl -s -f http://localhost:3002/api/health > /dev/null 2>&1; then
        print_status "✅ La aplicación está funcionando correctamente!"
        print_status "🌐 Disponible en: http://69.62.89.201:3002"
        return 0
    else
        return 1
    fi
}

print_status "1. Verificando estado actual..."
if check_app; then
    echo "🎉 Todo está funcionando. No se necesitan correcciones."
    exit 0
fi

print_warning "La aplicación no está respondiendo. Iniciando correcciones..."

# 2. Verificar contenedores
print_status "2. Verificando contenedores..."
docker ps --format "table {{.Names}}\t{{.Status}}"

# 3. Reiniciar si es necesario
print_status "3. Intentando reiniciar contenedores..."
docker-compose restart

print_status "4. Esperando que la aplicación se inicie..."
sleep 15

if check_app; then
    print_status "✅ Problema resuelto con reinicio!"
    exit 0
fi

# 4. Rebuild completo si el reinicio no funciona
print_warning "El reinicio no funcionó. Intentando rebuild completo..."
print_status "5. Deteniendo contenedores..."
docker-compose down

print_status "6. Iniciando rebuild..."
docker-compose up --build -d

print_status "7. Esperando que la aplicación se construya e inicie..."
sleep 30

if check_app; then
    print_status "✅ Problema resuelto con rebuild!"
    exit 0
fi

# 5. Verificar logs si aún no funciona
print_error "La aplicación sigue sin responder. Verificando logs..."
print_status "Logs del contenedor:"
docker-compose logs --tail 20 web

print_status "Estado de contenedores:"
docker ps -a

print_error "❌ No se pudo resolver automáticamente."
print_warning "Pasos manuales recomendados:"
echo "1. Verificar logs: docker-compose logs web"
echo "2. Verificar puertos: netstat -tlnp | grep 3002"
echo "3. Verificar firewall: ufw status"
echo "4. Contactar soporte si el problema persiste"
