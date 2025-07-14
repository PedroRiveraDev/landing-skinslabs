#!/bin/bash

# Script para configurar Nginx como proxy reverso para skinslabs.cl
# Ejecutar en el VPS como root

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

echo "🌐 Configurando Nginx para skinslabs.cl"
echo "======================================="

# Verificar si estamos corriendo como root
if [ "$EUID" -ne 0 ]; then
    print_error "Este script debe ejecutarse como root"
    print_status "Ejecuta: sudo $0"
    exit 1
fi

# 1. Instalar Nginx si no está instalado
print_status "1. Verificando instalación de Nginx..."
if ! command -v nginx &> /dev/null; then
    print_status "Instalando Nginx..."
    apt update
    apt install -y nginx
    systemctl enable nginx
else
    print_status "✅ Nginx ya está instalado"
fi

# 2. Verificar que la aplicación esté corriendo
print_status "2. Verificando que la aplicación esté corriendo..."
if curl -s -f http://localhost:3002/api/health > /dev/null; then
    print_status "✅ Aplicación corriendo en puerto 3002"
else
    print_error "❌ La aplicación no está corriendo en puerto 3002"
    print_warning "Ejecuta primero: ./deploy.sh deploy"
    exit 1
fi

# 3. Crear configuración de Nginx
print_status "3. Configurando Nginx..."
cat > /etc/nginx/sites-available/skinslabs.cl << 'EOF'
server {
    listen 80;
    server_name skinslabs.cl www.skinslabs.cl;
    
    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout       60s;
        proxy_send_timeout          60s;
        proxy_read_timeout          60s;
    }
    
    # Configuración para archivos estáticos de Next.js
    location /_next/static/ {
        proxy_pass http://localhost:3002;
        proxy_set_header Host $host;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API routes
    location /api/ {
        proxy_pass http://localhost:3002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Health check
    location /api/health {
        proxy_pass http://localhost:3002;
        proxy_set_header Host $host;
        access_log off;
    }
    
    # Logs
    access_log /var/log/nginx/skinslabs.cl.access.log;
    error_log /var/log/nginx/skinslabs.cl.error.log;
}
EOF

# 4. Habilitar el sitio
print_status "4. Habilitando sitio..."
ln -sf /etc/nginx/sites-available/skinslabs.cl /etc/nginx/sites-enabled/

# 5. Remover configuración por defecto si existe
if [ -f /etc/nginx/sites-enabled/default ]; then
    print_status "Removiendo configuración por defecto..."
    rm -f /etc/nginx/sites-enabled/default
fi

# 6. Verificar configuración de Nginx
print_status "5. Verificando configuración de Nginx..."
if nginx -t; then
    print_status "✅ Configuración de Nginx válida"
else
    print_error "❌ Error en la configuración de Nginx"
    exit 1
fi

# 7. Reiniciar Nginx
print_status "6. Reiniciando Nginx..."
systemctl restart nginx
systemctl enable nginx

# 8. Verificar estado
print_status "7. Verificando estado de Nginx..."
if systemctl is-active --quiet nginx; then
    print_status "✅ Nginx está corriendo"
else
    print_error "❌ Error: Nginx no está corriendo"
    systemctl status nginx
    exit 1
fi

# 9. Configurar firewall
print_status "8. Configurando firewall..."
ufw allow 'Nginx Full'
ufw allow 'Nginx HTTP'
ufw allow 'Nginx HTTPS'

print_status "✅ Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configurar DNS de skinslabs.cl para apuntar a $PUBLIC_IP"
echo "2. Verificar acceso: curl -H 'Host: skinslabs.cl' http://$PUBLIC_IP"
echo "3. Configurar SSL con: sudo certbot --nginx -d skinslabs.cl -d www.skinslabs.cl"
echo ""
echo "🌐 URLs de acceso:"
echo "   - http://skinslabs.cl (cuando DNS esté configurado)"
echo "   - http://$PUBLIC_IP (acceso directo por IP)"
echo "   - http://localhost:3002 (acceso local)"

# Obtener IP pública
PUBLIC_IP=$(curl -s ifconfig.me 2>/dev/null || echo "69.62.89.201")
echo ""
echo "🔍 Verificación rápida:"
echo "curl -H 'Host: skinslabs.cl' http://$PUBLIC_IP"
