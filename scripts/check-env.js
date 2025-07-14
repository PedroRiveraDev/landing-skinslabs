#!/usr/bin/env node

const requiredEnvVars = [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'NEXT_PUBLIC_GRAPHQL_URL',
    'NEXT_PUBLIC_REST_API_URL',
    'NEXT_PUBLIC_CATALOGO_URL'
];

console.log('🔍 Verificando variables de entorno...\n');

let hasErrors = false;

requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    
    if (!value) {
        console.error(`❌ ${varName} no está definida`);
        hasErrors = true;
    } else if (value.includes('xxxxxxxx') || value.includes('test_')) {
        console.warn(`⚠️  ${varName} parece ser una clave de ejemplo: ${value.substring(0, 20)}...`);
    } else {
        console.log(`✅ ${varName} está definida`);
    }
});

console.log('\n📋 Variables opcionales:');
const optionalVars = [
    'NEXT_PUBLIC_WHATSAPP_NUMBER',
    'NEXT_PUBLIC_COMPANY_NAME',
    'NEXT_PUBLIC_APP_URL'
];

optionalVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        console.log(`✅ ${varName}: ${value}`);
    } else {
        console.log(`⏭️  ${varName}: no definida (usando valor por defecto)`);
    }
});

if (hasErrors) {
    console.error('\n❌ Faltan variables de entorno requeridas. Revisa tu archivo .env');
    process.exit(1);
} else {
    console.log('\n✅ Todas las variables requeridas están configuradas');
} 