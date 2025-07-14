/** @type {import('next').NextConfig} */

// Validación de variables críticas
if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    console.warn('⚠️  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY no está definida');
} else if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('xxxxxxxx')) {
    console.error('❌ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY parece ser una clave de ejemplo. Usa una clave real de Clerk.');
    process.exit(1);
}

const nextConfig = {

    // Variables de entorno disponibles en tiempo de build
    env: {
        CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
    output: 'standalone',
    // Ignorar errores de ESLint y TypeScript durante el build
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    // Habilitar optimizaciones de imágenes
    images: {
        domains: ['localhost', '127.0.0.1'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '69.62.89.201',
                port: '8181',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
    },
    // Comprimir HTML, CSS y JS
    compress: true,
    // Configuración de producción
    productionBrowserSourceMaps: false,
    // Configuración de caché
    generateEtags: true,
    // Configuración de rendimiento
    reactStrictMode: true,
    poweredByHeader: false,
    // Configuración de seguridad
    headers: async () => {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
