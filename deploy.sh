#!/bin/bash

# Script de despliegue para SkinsLabs Landing
# Uso: ./deploy.sh [ambiente]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

# Verificar archivo .env
if [ ! -f .env ]; then
    print_warning "Archivo .env no encontrado. Creando desde env.example..."
    if [ -f env.example ]; then
        cp env.example .env
        print_status "Archivo .env creado. Por favor configura las variables de entorno antes de continuar."
        print_warning "IMPORTANTE: Configura las claves de Clerk en el archivo .env antes de desplegar."
        exit 1
    else
        print_error "No se encontró env.example. Por favor crea un archivo .env con las variables necesarias."
        exit 1
    fi
fi

# Función para construir y desplegar
deploy() {
    print_status "Iniciando despliegue..."
    
    # Detener contenedores existentes
    print_status "Deteniendo contenedores existentes..."
    docker-compose down --remove-orphans
    
    # Limpiar imágenes antiguas
    print_status "Limpiando imágenes antiguas..."
    docker system prune -f
    
    # Construir y levantar contenedores
    print_status "Construyendo y levantando contenedores..."
    docker-compose up --build -d
    
    # Esperar a que el contenedor esté listo
    print_status "Esperando a que la aplicación esté lista..."
    sleep 30
    
    # Verificar health check
    print_status "Verificando health check..."
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        print_status "✅ Aplicación desplegada exitosamente!"
        print_status "🌐 La aplicación está disponible en: http://localhost:3000"
        print_status "📊 Health check: http://localhost:3000/api/health"
    else
        print_error "❌ La aplicación no responde al health check"
        print_status "Revisando logs..."
        docker-compose logs web
        exit 1
    fi
}

# Función para mostrar logs
logs() {
    docker-compose logs -f web
}

# Función para detener
stop() {
    print_status "Deteniendo aplicación..."
    docker-compose down
    print_status "✅ Aplicación detenida"
}

# Función para reiniciar
restart() {
    print_status "Reiniciando aplicación..."
    docker-compose restart
    print_status "✅ Aplicación reiniciada"
}

# Función para mostrar estado
status() {
    print_status "Estado de los contenedores:"
    docker-compose ps
}

# Función para limpiar
clean() {
    print_status "Limpiando todo..."
    docker-compose down --volumes --remove-orphans
    docker system prune -af
    print_status "✅ Limpieza completada"
}

# Menú principal
case "${1:-deploy}" in
    "deploy")
        deploy
        ;;
    "logs")
        logs
        ;;
    "stop")
        stop
        ;;
    "restart")
        restart
        ;;
    "status")
        status
        ;;
    "clean")
        clean
        ;;
    "help"|"-h"|"--help")
        echo "Uso: $0 [comando]"
        echo ""
        echo "Comandos disponibles:"
        echo "  deploy   - Construir y desplegar la aplicación (por defecto)"
        echo "  logs     - Mostrar logs de la aplicación"
        echo "  stop     - Detener la aplicación"
        echo "  restart  - Reiniciar la aplicación"
        echo "  status   - Mostrar estado de los contenedores"
        echo "  clean    - Limpiar contenedores e imágenes"
        echo "  help     - Mostrar esta ayuda"
        ;;
    *)
        print_error "Comando desconocido: $1"
        echo "Usa '$0 help' para ver los comandos disponibles"
        exit 1
        ;;
esac 