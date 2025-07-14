// Configuración de variables de entorno con tipos TypeScript
export const env = {
    // Configuración de contacto
    WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '56912345678',
    WHATSAPP_MESSAGE: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs',

    // Configuración de la empresa
    COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || 'SkinsLabs',
    COMPANY_DESCRIPTION: process.env.NEXT_PUBLIC_COMPANY_DESCRIPTION || 'Asistentes Virtuales con IA para automatizar tu atención al cliente',

    // Configuración de la aplicación
    APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'SkinsLabs - Asistentes Virtuales IA',

    // Configuración de analytics (opcional)
    GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '',

    // Clerk - Autenticación
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || '',

    // Configuración del Backend
    GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://69.62.89.201:8181/graphql',
    REST_API_URL: process.env.NEXT_PUBLIC_REST_API_URL || 'http://69.62.89.201:8181/api',
    CATALOGO_URL: process.env.NEXT_PUBLIC_CATALOGO_URL || 'http://69.62.89.201:8181/catalogo',
} as const;

// Función helper para construir URLs de WhatsApp
export const getWhatsAppUrl = (message?: string) => {
    const baseUrl = `https://wa.me/${env.WHATSAPP_NUMBER}`;
    const defaultMessage = message || env.WHATSAPP_MESSAGE;
    return `${baseUrl}?text=${encodeURIComponent(defaultMessage)}`;
}; 