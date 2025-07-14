#!/bin/sh
echo "=== Verificación de conectividad del contenedor Docker ==="

echo "\n1. Verificando conectividad básica al backend..."
if curl -s --connect-timeout 5 http://69.62.89.201:8181/graphql > /dev/null 2>&1; then
    echo "✅ Conectividad básica al backend: OK"
else
    echo "❌ No se puede conectar al backend"
fi

echo "\n2. Probando consulta GraphQL..."
RESPONSE=$(curl -s -w "%{http_code}" -X POST \
    -H "Content-Type: application/json" \
    -d '{"query":"{ __schema { types { name } } }"}' \
    http://69.62.89.201:8181/graphql)

HTTP_CODE=${RESPONSE: -3}
BODY=${RESPONSE%???}

echo "Código HTTP: $HTTP_CODE"
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ GraphQL Query: OK"
    echo "Respuesta: ${BODY:0:100}..."
else
    echo "❌ GraphQL Query falló"
    echo "Respuesta: $BODY"
fi

echo "\n3. Verificando DNS..."
nslookup 69.62.89.201 || echo "❌ Error en resolución DNS"

echo "\n=== Fin de verificación ==="
