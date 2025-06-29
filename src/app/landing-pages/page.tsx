import Header from '@/components/ui/Header';
import HeroLanding from '@/components/sections/landingPages/HeroLanding';
import FeaturesLanding from '@/components/sections/landingPages/FeaturesLanding';
import ProcessLanding from '@/components/sections/landingPages/ProcessLanding';
import PortfolioLanding from '@/components/sections/landingPages/PortfolioLanding';
import TestimonialsLanding from '@/components/sections/landingPages/TestimonialsLanding';
import { getWhatsAppUrl, env } from '@/config/env';


export const metadata = {
    title: 'Landing Pages que Convierten | SkinsLabs',
    description: 'Diseñamos páginas de aterrizaje enfocadas en resultados para potenciar tu negocio. Landing pages profesionales y optimizadas para conversión.',
    keywords: 'landing pages, diseño web, conversión, páginas de aterrizaje, marketing digital',
};

export default function LandingPagesPage() {
    return (
        <>
            <Header variant="landing" />
            <main className="min-h-screen bg-white">
                <HeroLanding />
                <FeaturesLanding />
                <ProcessLanding />
                <PortfolioLanding />
                <TestimonialsLanding />                

                {/* CTA Final */}
                <section
                    className="py-24 bg-gradient-to-b from-white to-sky-50"
                    aria-labelledby="cta-heading"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2
                            id="cta-heading"
                            className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"
                        >
                            ¿Listo para Potenciar tu Negocio?
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
                            Comienza hoy mismo a convertir más visitantes en clientes con una landing page profesional.
                        </p>
                        <a
                            href={getWhatsAppUrl('Hola,%20me%20interesa%20una%20landing%20page')}
                            className="inline-flex items-center gap-2 bg-sky-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/20 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Solicitar landing page por WhatsApp"
                        >
                            Solicita tu Landing Page
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </section>
            </main>
        </>
    );
} 