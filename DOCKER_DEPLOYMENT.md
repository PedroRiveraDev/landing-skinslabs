# 🐳 Instrucciones de Deployment en VPS

## Error solucionado: "Couldn't find env file: .env.docker"

El error se produce porque falta el archivo `.env.docker` en el servidor VPS. Aquí están las instrucciones para solucionarlo:

### ✅ Solución Rápida

En el servidor VPS, ejecuta estos comandos:

```bash
# 1. Navegar al directorio del proyecto
cd /srv/landings/skinslabs/

# 2. Hacer pull de los últimos cambios
git pull origin main

# 3. Configurar el archivo .env.docker automáticamente
chmod +x setup-env.sh
./setup-env.sh

# 4. Ejecutar el deployment
./deploy.sh deploy
```

### 📋 Verificación Manual

Si prefieres verificar o crear el archivo manualmente:

```bash
# Verificar si existe el template
ls -la .env.docker.template

# Si existe, copiar a .env.docker
cp .env.docker.template .env.docker

# Si no existe, crear manualmente
cat > .env.docker << 'EOF'
# Configuración del Backend para Docker
GRAPHQL_URL=http://69.62.89.201:8181/graphql
REST_API_URL=http://69.62.89.201:8181/api
CATALOGO_URL=http://69.62.89.201:8181/catalogo

# URLs públicas para el cliente (navegador)
NEXT_PUBLIC_GRAPHQL_URL=http://69.62.89.201:8181/graphql
NEXT_PUBLIC_REST_API_URL=http://69.62.89.201:8181/api
NEXT_PUBLIC_CATALOGO_URL=http://69.62.89.201:8181/catalogo

# Clerk - Autenticación
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bG92ZWQtc2F0eXItNjMuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_jmtSAQ1VGFXpM7hJRFHHC3USCbbwJQcyj6EyUt6RT4

# Configuración de WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=56912345678
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs

# Configuración de la empresa
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
```

### 🎯 URLs de Acceso

Una vez desplegado exitosamente:

- **Frontend**: http://69.62.89.201:3002
- **Health Check**: http://69.62.89.201:3002/api/health
- **GraphQL Proxy**: http://69.62.89.201:3002/api/graphql

### 🔧 Comandos Útiles

```bash
# Ver logs del contenedor
./deploy.sh logs

# Ver estado de contenedores
./deploy.sh status

# Reiniciar aplicación
./deploy.sh restart

# Detener aplicación
./deploy.sh stop

# Limpiar y rebuild completo
./deploy.sh clean
```

### 🐛 Troubleshooting

#### Si el deployment falla:

1. **Verificar Docker:**
   ```bash
   docker --version
   docker-compose --version
   ```

2. **Verificar archivo .env.docker:**
   ```bash
   cat .env.docker
   ```

3. **Ver logs detallados:**
   ```bash
   docker-compose logs web
   ```

#### Si la aplicación no responde:

1. **Verificar puerto 3002:**
   ```bash
   netstat -tlnp | grep 3002
   ```

2. **Verificar contenedor:**
   ```bash
   docker ps
   docker logs landing-skinslabs-web-1
   ```

3. **Verificar conectividad backend:**
   ```bash
   curl http://69.62.89.201:8181/graphql
   ```

### 📝 Notas Importantes

- El archivo `.env.docker` contiene las configuraciones específicas para el entorno Docker
- Las URLs están configuradas para usar la IP del VPS (69.62.89.201)
- El puerto de la aplicación es 3002 para evitar conflictos
- Todos los proxies están configurados para resolver problemas de CORS
