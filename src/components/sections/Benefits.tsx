import { ReactNode } from 'react'

interface BenefitCardProps {
    icon: ReactNode
    title: string
    description: string
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
    return (
        <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-500 group-hover:text-blue-500 transition-colors duration-200 mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
        </div>
    )
}

export default function Benefits() {
    return (
        <section id="beneficios" className="relative py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.1),transparent_70%)] blur-3xl"></div>
            
            {/* Grid decorativo */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(59,130,246,0.20) 1px, transparent 1px), 
                    linear-gradient(90deg, rgba(59,130,246,0.20) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                }}
            ></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Beneficios que <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent drop-shadow-cyan-950">Transforman</span> tu Negocio
                    </h2>
                    <p className="mt-4 text-lg text-gray-700">
                        Optimiza tu atención al cliente con tecnología de punta y mantén el toque humano que tu negocio necesita.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <BenefitCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        title="Atención 24/7"
                        description="Tu negocio siempre disponible. Respuestas instantáneas en cualquier momento, sin importar la hora o el día."
                    />
                    <BenefitCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                        }
                        title="IA Avanzada"
                        description="Modelos IA de última generación que entienden el contexto y proporcionan respuestas precisas y naturales."
                    />
                    <BenefitCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        }
                        title="Implementación Rápida"
                        description="En 15 a 20 días hábiles tendrás tu agente funcionando. Sin complicaciones técnicas ni largos periodos de espera."
                    />
                    <BenefitCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                            </svg>
                        }
                        title="Flujos Personalizados"
                        description="Automatización con n8n que se adapta a tus procesos. Integración perfecta con tus sistemas existentes."
                    />
                    <BenefitCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>
                        }
                        title="Reportes Detallados"
                        description="Analiza el rendimiento con métricas claras. Toma decisiones basadas en datos reales de interacción."
                    />
                    <BenefitCard
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        }
                        title="Soporte Humano"
                        description="Equipo de expertos disponible para ayudarte. Mantén el control y la supervisión que necesitas."
                    />
                </div>
            </div>
        </section>
    )
} 