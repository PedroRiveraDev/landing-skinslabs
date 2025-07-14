# Script para construir la imagen Docker de SkinLabs con las variables de entorno necesarias

Write-Host "🔨 Construyendo imagen Docker de SkinLabs..." -ForegroundColor Cyan

# Verificar que existe el archivo .env
if (!(Test-Path ".env")) {
    Write-Host "❌ Error: Archivo .env no encontrado" -ForegroundColor Red
    exit 1
}

# Leer las variables de entorno del archivo .env
$envVars = @{}
Get-Content ".env" | ForEach-Object {
    if ($_ -match "^([^#]+)=(.*)$") {
        $envVars[$matches[1]] = $matches[2]
    }
}

# Extraer las variables necesarias
$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = $envVars["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"]
$CLERK_SECRET_KEY = $envVars["CLERK_SECRET_KEY"]

# Construir la imagen con las variables necesarias
Write-Host "📦 Construyendo imagen Docker..." -ForegroundColor Yellow

$buildCommand = "docker build --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=`"$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`" --build-arg CLERK_SECRET_KEY=`"$CLERK_SECRET_KEY`" -t skinslabs-app ."

Invoke-Expression $buildCommand

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Imagen Docker construida exitosamente" -ForegroundColor Green
    Write-Host "📦 Para ejecutar la aplicación:" -ForegroundColor Cyan
    Write-Host "   docker run --env-file .env -p 3000:3000 skinslabs-app" -ForegroundColor White
} else {
    Write-Host "❌ Error al construir la imagen Docker" -ForegroundColor Red
    exit 1
}
