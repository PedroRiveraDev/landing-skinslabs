# 🌐 Configuración de Dominio skinslabs.cl

## 📋 Resumen del Estado Actual

✅ **Docker funcionando** - Aplicación corriendo en `http://localhost:3002`  
❌ **Dominio sin configurar** - `skinslabs.cl` no apunta al VPS  
❌ **Nginx sin configurar** - Falta proxy reverso para el dominio  

## 🚀 Pasos para Configurar skinslabs.cl

### 1. **Configurar DNS (Proveedor de Dominio)**

En tu proveedor de dominio (donde compraste `skinslabs.cl`), configura estos registros DNS:

```
Tipo: A
Nombre: @
Valor: 69.62.89.201
TTL: 300

Tipo: A  
Nombre: www
Valor: 69.62.89.201
TTL: 300
```

### 2. **Configurar Nginx en el VPS**

```bash
# En el VPS, ejecutar:
cd /srv/landings/skinslabs/
git pull origin main

# Configurar Nginx automáticamente
chmod +x setup-nginx.sh
sudo ./setup-nginx.sh
```

### 3. **Verificar Configuración**

```bash
# Verificar que Nginx está corriendo
sudo systemctl status nginx

# Verificar proxy reverso con IP
curl -H 'Host: skinslabs.cl' http://69.62.89.201

# Verificar cuando DNS esté configurado
curl http://skinslabs.cl
```

### 4. **Configurar SSL (Opcional pero Recomendado)**

```bash
# Después de que DNS esté funcionando
sudo ./setup-ssl.sh
```

## 🔧 Scripts Incluidos

- **`setup-nginx.sh`** - Configura Nginx como proxy reverso
- **`setup-ssl.sh`** - Configura certificado SSL de Let's Encrypt
- **`diagnose.sh`** - Diagnóstica problemas de conectividad
- **`fix-deployment.sh`** - Soluciona problemas automáticamente

## 🌐 URLs Después de la Configuración

- **Producción**: https://skinslabs.cl
- **Www**: https://www.skinslabs.cl  
- **Health Check**: https://skinslabs.cl/api/health
- **Acceso directo**: http://69.62.89.201:3002

## ⚠️ Notas Importantes

1. **DNS tarda en propagarse** - Puede tomar 1-24 horas
2. **Firewall** - Los scripts configuran automáticamente UFW
3. **SSL recomendado** - Google y navegadores priorizan HTTPS
4. **Backup** - La configuración de Nginx se guarda en `/etc/nginx/sites-available/`

## 🐛 Troubleshooting

### Si `skinslabs.cl` no funciona:

```bash
# Verificar DNS
nslookup skinslabs.cl

# Verificar Nginx
sudo nginx -t
sudo systemctl status nginx

# Verificar logs
sudo tail -f /var/log/nginx/skinslabs.cl.error.log

# Verificar aplicación
curl http://localhost:3002/api/health
```

### Si hay problemas de SSL:

```bash
# Verificar certificados
sudo certbot certificates

# Renovar manualmente
sudo certbot renew --dry-run

# Ver logs de Certbot
sudo tail -f /var/log/letsencrypt/letsencrypt.log
```

## 📞 Orden de Ejecución

1. **Configurar DNS** (en proveedor de dominio)
2. **Ejecutar `setup-nginx.sh`** (en VPS)
3. **Esperar propagación DNS** (1-24 horas)
4. **Ejecutar `setup-ssl.sh`** (en VPS)
5. **Verificar funcionamiento**

```bash
# Comando completo en VPS:
cd /srv/landings/skinslabs/
git pull origin main
chmod +x *.sh
sudo ./setup-nginx.sh

# Después de configurar DNS:
sudo ./setup-ssl.sh
```
