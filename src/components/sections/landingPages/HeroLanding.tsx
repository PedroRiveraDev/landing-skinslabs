import Link from 'next/link';
import Image from 'next/image';

export default function HeroLanding() {
    return (
        <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-sky-50 to-white">
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-sky-100/50 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-sky-100/30 to-transparent rounded-tr-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl mx-auto">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1),transparent)] blur-2xl" />
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                        Landing Pages que{' '}
                        <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                            Convierten
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12">
                        Diseñamos páginas de aterrizaje enfocadas en resultados para potenciar tu negocio.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20una%20landing%20page"
                            className="bg-sky-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/20"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Solicita tu Landing Page
                        </Link>
                        <Link
                            href="#portfolio"
                            className="text-slate-600 hover:text-slate-900 px-8 py-4 rounded-xl font-semibold transition-colors flex items-center gap-2"
                        >
                            Ver Portfolio
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { number: '100+', label: 'Clientes Satisfechos' },
                        { number: '95%', label: 'Tasa de Conversión' },
                        { number: '24h', label: 'Soporte Técnico' },
                        { number: '100%', label: 'Personalización' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl font-bold text-sky-500 mb-2">{stat.number}</div>
                            <div className="text-slate-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 