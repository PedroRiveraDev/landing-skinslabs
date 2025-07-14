# Script para construir la imagen Docker de SkinLabs
Write-Host "🔨 Construyendo imagen Docker de SkinLabs..." -ForegroundColor Cyan

# Verificar que existe el archivo .env
if (!(Test-Path ".env")) {
    Write-Host "❌ Error: Archivo .env no encontrado" -ForegroundColor Red
    exit 1
}

# Leer las variables de entorno del archivo .env
$envContent = Get-Content ".env"
$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = ""
$CLERK_SECRET_KEY = ""

foreach ($line in $envContent) {
    if ($line -match "^NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=(.*)$") {
        $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = $matches[1]
    }
    if ($line -match "^CLERK_SECRET_KEY=(.*)$") {
        $CLERK_SECRET_KEY = $matches[1]
    }
}

# Verificar que se encontraron las variables
if ([string]::IsNullOrEmpty($NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)) {
    Write-Host "❌ Error: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY no encontrada en .env" -ForegroundColor Red
    exit 1
}

if ([string]::IsNullOrEmpty($CLERK_SECRET_KEY)) {
    Write-Host "❌ Error: CLERK_SECRET_KEY no encontrada en .env" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Construyendo imagen Docker..." -ForegroundColor Yellow

# Construir la imagen
$buildArgs = @(
    "build",
    "--build-arg", "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "--build-arg", "CLERK_SECRET_KEY=$CLERK_SECRET_KEY",
    "-t", "skinslabs-app",
    "."
)

& docker @buildArgs

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Imagen Docker construida exitosamente" -ForegroundColor Green
    Write-Host "📦 Para ejecutar la aplicación:" -ForegroundColor Cyan
    Write-Host "   docker run --env-file .env -p 3000:3000 skinslabs-app" -ForegroundColor White
} else {
    Write-Host "❌ Error al construir la imagen Docker" -ForegroundColor Red
    exit 1
}
