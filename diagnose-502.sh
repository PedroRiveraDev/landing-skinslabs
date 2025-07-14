#!/bin/bash

echo "🔍 DIAGNÓSTICO ERROR 502 - SkinsLabs"
echo "======================================"
echo "Fecha: $(date)"
echo ""

echo "1. 🐳 ESTADO DOCKER"
echo "-------------------"
echo "Contenedores activos:"
docker ps
echo ""
echo "Logs del contenedor (últimas 20 líneas):"
docker logs skinslabs_web_1 --tail 20 2>/dev/null || echo "❌ Contenedor skinslabs_web_1 no encontrado"
echo ""

echo "2. 🌐 ESTADO NGINX"
echo "------------------"
echo "Estado del servicio:"
sudo systemctl status nginx --no-pager
echo ""
echo "Configuración válida:"
sudo nginx -t
echo ""

echo "3. ⚙️ CONFIGURACIÓN NGINX"
echo "-------------------------"
echo "Archivo principal de skinslabs.cl:"
if [ -f /etc/nginx/sites-available/skinslabs.cl ]; then
    cat /etc/nginx/sites-available/skinslabs.cl
else
    echo "❌ Archivo /etc/nginx/sites-available/skinslabs.cl no encontrado"
fi
echo ""
echo "Enlace simbólico:"
ls -la /etc/nginx/sites-enabled/ | grep skinslabs
echo ""

echo "4. 📋 LOGS DE NGINX"
echo "------------------"
echo "Errores recientes (últimas 10 líneas):"
sudo tail -10 /var/log/nginx/error.log 2>/dev/null || echo "Sin logs de error globales"
echo ""
echo "Errores específicos de skinslabs.cl:"
sudo tail -10 /var/log/nginx/skinslabs.cl.error.log 2>/dev/null || echo "Sin logs de error específicos"
echo ""
echo "Accesos recientes:"
sudo tail -5 /var/log/nginx/access.log 2>/dev/null || echo "Sin logs de acceso"
echo ""

echo "5. 🔌 CONECTIVIDAD LOCAL"
echo "------------------------"
echo "Test localhost:3002:"
curl -I http://localhost:3002 --max-time 5 2>/dev/null || echo "❌ No responde localhost:3002"
echo ""
echo "Test localhost:3002/api/health:"
curl -I http://localhost:3002/api/health --max-time 5 2>/dev/null || echo "❌ No responde localhost:3002/api/health"
echo ""
echo "Proceso en puerto 3002:"
netstat -tlnp | grep :3002 || echo "❌ Ningún proceso escuchando en puerto 3002"
echo ""

echo "6. 🔒 FIREWALL Y PUERTOS"
echo "-------------------------"
echo "Estado del firewall:"
sudo ufw status
echo ""
echo "Puerto 80:"
netstat -tlnp | grep :80 || echo "❌ Ningún proceso en puerto 80"
echo ""
echo "Puerto 443:"
netstat -tlnp | grep :443 || echo "❌ Ningún proceso en puerto 443"
echo ""

echo "7. 💻 RECURSOS DEL SISTEMA"
echo "--------------------------"
echo "Memoria:"
free -h
echo ""
echo "Espacio en disco:"
df -h
echo ""
echo "Procesos Nginx:"
ps aux | grep nginx | grep -v grep || echo "❌ Nginx no está corriendo"
echo ""
echo "Procesos Docker:"
ps aux | grep docker | head -3
echo ""

echo "8. 🌍 PRUEBAS DE CONECTIVIDAD"
echo "-----------------------------"
echo "Test interno con Host header:"
curl -H 'Host: skinslabs.cl' http://localhost --max-time 5 -I 2>/dev/null || echo "❌ Fallo con Host header"
echo ""
echo "Test directo al puerto 80:"
curl -I http://localhost:80 --max-time 5 2>/dev/null || echo "❌ Puerto 80 no responde"
echo ""

echo "🏁 DIAGNÓSTICO COMPLETADO"
echo "========================="
