# 🚀 Guía de Despliegue - SkinsLabs Landing

## 📋 Prerrequisitos

- Docker instalado
- Docker Compose instalado
- Acceso al VPS donde se desplegará

## 🔧 Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env` basado en `env.example`:

```bash
cp env.example .env
```

**IMPORTANTE**: Configura las siguientes variables obligatorias en el archivo `.env`:

```env
# Clerk - Autenticación (OBLIGATORIO)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Backend URLs (ya configuradas para tu VPS)
NEXT_PUBLIC_GRAPHQL_URL=http://69.62.89.201:8181/graphql
NEXT_PUBLIC_REST_API_URL=http://69.62.89.201:8181/api
NEXT_PUBLIC_CATALOGO_URL=http://69.62.89.201:8181/catalogo
```

### 2. Configuración de Clerk

1. Ve a [Clerk Dashboard](https://dashboard.clerk.com/)
2. Crea una nueva aplicación o usa una existente
3. Copia las claves de API (Publishable Key y Secret Key)
4. Configura las URLs permitidas en Clerk:
   - `http://localhost:3000` (desarrollo)
   - `http://tu-dominio.com` (producción)

## 🐳 Despliegue con Docker

### Opción 1: Despliegue Automático (Linux/Mac)

```bash
# Hacer ejecutable el script
chmod +x deploy.sh

# Desplegar
./deploy.sh

# Ver logs
./deploy.sh logs

# Detener
./deploy.sh stop
```

### Opción 2: Comandos Manuales

```bash
# Construir y levantar
docker-compose up --build -d

# Ver logs
docker-compose logs -f web

# Detener
docker-compose down

# Reiniciar
docker-compose restart
```

### Opción 3: Windows PowerShell

```powershell
# Construir y levantar
docker-compose up --build -d

# Ver logs
docker-compose logs -f web

# Detener
docker-compose down
```

## 🔍 Verificación del Despliegue

### Health Check
```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "version": "1.0.0"
}
```

### Verificar Funcionalidad
1. Abre `http://localhost:3000` en tu navegador
2. Verifica que la página carga correctamente
3. Prueba la funcionalidad de autenticación
4. Verifica que los bots se cargan desde el backend

## 🌐 Configuración de Dominio

### 1. Configurar Nginx (Recomendado)

Crea un archivo de configuración de Nginx:

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Configurar SSL con Let's Encrypt

```bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx

# Obtener certificado SSL
sudo certbot --nginx -d tu-dominio.com
```

## 🔧 Comandos Útiles

### Gestión de Contenedores
```bash
# Ver estado
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f web

# Reiniciar servicio
docker-compose restart web

# Reconstruir sin caché
docker-compose build --no-cache
```

### Limpieza
```bash
# Detener y eliminar contenedores
docker-compose down

# Limpiar imágenes no utilizadas
docker system prune -f

# Limpieza completa
docker-compose down --volumes --remove-orphans
docker system prune -af
```

## 🚨 Solución de Problemas

### La aplicación no inicia
1. Verifica que el archivo `.env` existe y está configurado
2. Revisa los logs: `docker-compose logs web`
3. Verifica que las claves de Clerk están configuradas

### Error de conexión al backend
1. Verifica que el backend esté funcionando en `69.62.89.201:8181`
2. Verifica la conectividad de red
3. Revisa las URLs en el archivo `.env`

### Problemas de autenticación
1. Verifica que las claves de Clerk estén correctas
2. Verifica que las URLs permitidas estén configuradas en Clerk
3. Revisa los logs de la aplicación

### Problemas de rendimiento
1. Verifica los recursos del VPS
2. Revisa los logs de Nginx
3. Considera optimizar las imágenes

## 📊 Monitoreo

### Health Check Automático
El contenedor incluye un health check que verifica:
- Que la aplicación responda en el puerto 3000
- Que el endpoint `/api/health` funcione correctamente

### Logs
```bash
# Ver logs en tiempo real
docker-compose logs -f web

# Ver logs de los últimos 100 líneas
docker-compose logs --tail=100 web
```

## 🔄 Actualizaciones

Para actualizar la aplicación:

```bash
# Detener contenedores
docker-compose down

# Obtener cambios del repositorio
git pull origin main

# Reconstruir y desplegar
docker-compose up --build -d
```

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs de la aplicación
2. Verifica la configuración de variables de entorno
3. Asegúrate de que el backend esté funcionando
4. Verifica la conectividad de red

---

**Nota**: Este proyecto está configurado para funcionar con el backend en `69.62.89.201:8181`. Asegúrate de que el backend esté funcionando antes de desplegar el frontend. 