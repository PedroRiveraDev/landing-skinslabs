'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ClerkProvider } from '@clerk/nextjs';
import { env } from '@/config/env';

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    useEffect(() => {
        // Respetar preferencias de reducción de movimiento
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        AOS.init({
            // Configuración optimizada
            duration: prefersReducedMotion ? 0 : 600, // Reducido de 800 para mejor respuesta
            once: true, // Cambiado a true para mejor rendimiento
            mirror: false, // Desactivado para reducir carga
            offset: 120, // Aumentado para mejor timing
            easing: 'ease-out-cubic', // Usando un valor válido de AOS
            delay: 0, // Sin delays por defecto
            disableMutationObserver: false, // Mejor rendimiento
            throttleDelay: 99,
            anchorPlacement: 'top-bottom',
        });

        // Manejar cambios en preferencias de movimiento
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleMotionPreference = (e: MediaQueryListEvent) => {
            if (e.matches) {
                document.documentElement.style.setProperty('--aos-duration', '0ms');
                AOS.refresh();
            } else {
                document.documentElement.style.setProperty('--aos-duration', '600ms');
                AOS.refresh();
            }
        };

        mediaQuery.addEventListener('change', handleMotionPreference);

        // Optimizar reinicios de AOS
        let resizeTimer: NodeJS.Timeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                AOS.refresh();
            }, 250);
        });

        return () => {
            mediaQuery.removeEventListener('change', handleMotionPreference);
            clearTimeout(resizeTimer);
        };
    }, []);

    return (
        <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            {children}
        </ClerkProvider>
    );
} 