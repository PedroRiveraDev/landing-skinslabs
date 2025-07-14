#!/bin/bash

# Script para configurar SSL con Let's Encrypt para skinslabs.cl
# Ejecutar después de configurar Nginx y DNS

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

echo "🔒 Configurando SSL para skinslabs.cl"
echo "===================================="

# Verificar si estamos corriendo como root
if [ "$EUID" -ne 0 ]; then
    print_error "Este script debe ejecutarse como root"
    print_status "Ejecuta: sudo $0"
    exit 1
fi

# 1. Verificar que Nginx esté configurado
print_status "1. Verificando configuración de Nginx..."
if [ ! -f /etc/nginx/sites-enabled/skinslabs.cl ]; then
    print_error "Configuración de Nginx no encontrada"
    print_warning "Ejecuta primero: ./setup-nginx.sh"
    exit 1
fi

# 2. Verificar DNS
print_status "2. Verificando DNS..."
if nslookup skinslabs.cl | grep -q "$(curl -s ifconfig.me)"; then
    print_status "✅ DNS configurado correctamente"
else
    print_warning "⚠️  DNS podría no estar configurado aún"
    print_warning "Asegúrate de que skinslabs.cl apunte a tu IP pública"
    read -p "¿Continuar de todas formas? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 3. Instalar Certbot
print_status "3. Instalando Certbot..."
apt update
apt install -y certbot python3-certbot-nginx

# 4. Configurar SSL
print_status "4. Configurando certificado SSL..."
certbot --nginx -d skinslabs.cl -d www.skinslabs.cl --non-interactive --agree-tos --email admin@skinslabs.cl

# 5. Configurar renovación automática
print_status "5. Configurando renovación automática..."
systemctl enable certbot.timer
systemctl start certbot.timer

# 6. Verificar configuración
print_status "6. Verificando configuración SSL..."
if nginx -t; then
    systemctl reload nginx
    print_status "✅ SSL configurado exitosamente!"
else
    print_error "❌ Error en la configuración"
    exit 1
fi

print_status "✅ Configuración SSL completada!"
echo ""
echo "🌐 Sitio disponible en:"
echo "   - https://skinslabs.cl"
echo "   - https://www.skinslabs.cl"
echo ""
echo "🔍 Verificar SSL:"
echo "curl -I https://skinslabs.cl"
