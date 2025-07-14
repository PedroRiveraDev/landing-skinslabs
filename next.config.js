/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
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