

export default function Features() {
    return (
        <>
        <section id="caracteristicas" className="relative py-28 lg:py-32 overflow-hidden">
            <div className="relative w-[90%] lg:w-full max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Características que Hacen la Diferencia
                    </h2>
                    <p className="mt-4 text-lg text-slate-200">
                        Tecnología de punta combinada con facilidad de uso para transformar la atención al cliente de tu negocio.
                    </p>
                </div>

                <div className="space-y-16 sm:space-y-24">
                    {/* Característica 1: IA Conversacional */}
                    <div className="md:grid md:grid-cols-2 md:items-center gap-16">
                        <div className="relative order-2 md:order-1" data-aos="fade-right">
                            <div className="aspect-[4/3] bg-white rounded-2xl flex items-center justify-center p-4 sm:p-8 border border-slate-200 hover:border-sky-300 hover:shadow-2xl transition-all duration-200">
                                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-sm border border-slate-200">
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 bg-sky-100 rounded-full p-2">
                                                <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-700">¡Hola! ¿En qué puedo ayudarte hoy?</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-1 text-right">
                                                <p className="text-sm text-slate-700">Necesito información sobre sus planes</p>
                                            </div>
                                            <div className="flex-shrink-0 bg-sky-100 rounded-full p-2">
                                                <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 md:mt-0 order-1 md:order-2" data-aos="fade-left">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                IA Conversacional Avanzada
                            </h3>
                            <p className="text-lg text-slate-200 mb-6">
                                Nuestros agentes utilizan modelos GPT de última generación para mantener conversaciones naturales y contextuales con tus clientes.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-slate-200">
                                        Comprensión contextual y memoria de conversación
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Característica 2: Automatización */}
                    <div className="md:grid md:grid-cols-2 md:items-center gap-16">
                        <div className="mt-10 md:mt-0" data-aos="fade-right">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Automatización Inteligente con n8n
                            </h3>
                            <p className="text-lg text-slate-200 mb-6">
                                Integra y automatiza tus procesos de negocio con flujos de trabajo personalizados que se adaptan a tus necesidades.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-slate-200">
                                        Integración con CRM, ERP y otras herramientas
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="relative mt-10 md:mt-0" data-aos="fade-left">
                            <div className="aspect-[4/3] bg-white rounded-2xl flex items-center justify-center p-4 sm:p-8 border border-slate-200 hover:border-sky-300 hover:shadow-2xl transition-all duration-200">
                                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-sm border border-slate-200">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-sky-600 rounded-full"></div>
                                                <span className="text-sm font-medium text-slate-900">Flujo Activo</span>
                                            </div>
                                            <span className="text-xs text-slate-700">Última ejecución: 2min</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 bg-slate-100 rounded-full">
                                                <div className="h-2 bg-sky-600 rounded-full w-3/4"></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-slate-700">
                                                <span>Procesado: 75%</span>
                                                <span>234/312</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
} 