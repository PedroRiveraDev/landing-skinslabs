#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración para despliegue...\n');

// Verificar archivo .env
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
    console.error('❌ Archivo .env no encontrado');
    console.log('📝 Creando archivo .env desde env.example...');
    
    const envExamplePath = path.join(process.cwd(), 'env.example');
    if (fs.existsSync(envExamplePath)) {
        const envExample = fs.readFileSync(envExamplePath, 'utf8');
        fs.writeFileSync(envPath, envExample);
        console.log('✅ Archivo .env creado desde env.example');
        console.log('⚠️  IMPORTANTE: Configura las claves reales de Clerk en el archivo .env');
        process.exit(1);
    } else {
        console.error('❌ No se encontró env.example');
        process.exit(1);
    }
}

// Cargar variables de entorno
require('dotenv').config({ path: envPath });

const requiredEnvVars = [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY'
];

console.log('📋 Verificando variables críticas:');

let hasErrors = false;

requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    
    if (!value) {
        console.error(`❌ ${varName} no está definida`);
        hasErrors = true;
    } else if (value.includes('xxxxxxxx') || value.includes('test_')) {
        console.warn(`⚠️  ${varName} parece ser una clave de ejemplo`);
        console.warn(`   Valor actual: ${value.substring(0, 30)}...`);
        console.warn(`   Obtén tu clave real en: https://dashboard.clerk.com/last-active?path=api-keys`);
    } else {
        console.log(`✅ ${varName} está configurada`);
    }
});

console.log('\n📋 Verificando configuración del backend:');
const backendVars = [
    'NEXT_PUBLIC_GRAPHQL_URL',
    'NEXT_PUBLIC_REST_API_URL',
    'NEXT_PUBLIC_CATALOGO_URL'
];

backendVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        console.log(`✅ ${varName}: ${value}`);
    } else {
        console.warn(`⚠️  ${varName}: no definida`);
    }
});

if (hasErrors) {
    console.error('\n❌ Faltan variables críticas. Configura tu archivo .env antes de desplegar.');
    process.exit(1);
} else {
    console.log('\n✅ Configuración verificada. Listo para desplegar.');
} 