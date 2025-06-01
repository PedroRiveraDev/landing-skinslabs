import { ReactNode } from 'react'
import '@fontsource/satisfy'

interface BenefitCardProps {
    icon: ReactNode
    title: string
    description: string
    index: number
}

function BenefitCard({ icon, title, description, index }: BenefitCardProps) {
    const animations = ['fade-up', 'fade-up', 'fade-up']
    const animation = animations[index % 3]
    
    return (
        <div 
            data-aos={animation}
            data-aos-offset={100 + (index * 50)}
            className="group relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
        >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sky-100 text-sky-600 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors duration-300">{title}</h3>
            <p className="text-slate-700">{description}</p>
        </div>
    )
}

export default function Benefits() {
    return (
        <>
        <section id="beneficios" className="relative py-28 lg:py-32 overflow-hidden">
            <div className="relative w-[90%] lg:w-full max-w-7xl mx-auto px-6 lg:px-12">
                <div 
                    data-aos="fade-up"
                    data-aos-offset="200"
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Beneficios que <span className="font-serif-display bg-gradient-to-r from-sky-400 via-blue-400 to-sky-400 bg-clip-text text-transparent inline-block transform hover:scale-105 transition-transform duration-300 text-4xl sm:text-5xl tracking-tight drop-shadow">Transforman</span> tu Negocio
                    </h2>
                    <p className="mt-4 text-lg text-slate-200">
                        Optimiza tu atención al cliente con tecnología de punta y mantén el toque humano que tu negocio necesita.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <BenefitCard
                        index={0}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        title="Atención 24/7"
                        description="Tu negocio siempre disponible. Respuestas instantáneas en cualquier momento, sin importar la hora o el día."
                    />
                    <BenefitCard
                        index={1}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                        }
                        title="IA Avanzada"
                        description="Modelos IA de última generación que entienden el contexto y proporcionan respuestas precisas y naturales."
                    />
                    <BenefitCard
                        index={2}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transform group-hover:scale-125 transition-transform duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        }
                        title="Implementación Rápida"
                        description="En 15 a 20 días hábiles tendrás tu agente funcionando. Sin complicaciones técnicas ni largos periodos de espera."
                    />
                    <BenefitCard
                        index={3}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                            </svg>
                        }
                        title="Flujos Personalizados"
                        description="Automatización con n8n que se adapta a tus procesos. Integración perfecta con tus sistemas existentes."
                    />
                    <BenefitCard
                        index={4}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>
                        }
                        title="Reportes Detallados"
                        description="Analiza el rendimiento con métricas claras. Toma decisiones basadas en datos reales de interacción."
                    />
                    <BenefitCard
                        index={5}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        }
                        title="Soporte Humano"
                        description="Equipo de expertos disponible para ayudarte. Mantén el control y la supervisión que necesitas."
                    />
                </div>
            </div>
        </section>
        </>
    )
} 