export default function Features() {
    return (
        <section id="caracteristicas" className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Características que Hacen la Diferencia
                    </h2>
                    <p className="mt-4 text-lg text-gray-700">
                        Tecnología de punta combinada con facilidad de uso para transformar la atención al cliente de tu negocio.
                    </p>
                </div>

                <div className="space-y-16 sm:space-y-24">
                    {/* Característica 1: IA Conversacional */}
                    <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
                        <div className="relative order-2 lg:order-1">
                            <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center p-4 sm:p-8">
                                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-sm">
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-800">¡Hola! ¿En qué puedo ayudarte hoy?</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-1 text-right">
                                                <p className="text-sm text-gray-800">Necesito información sobre sus planes</p>
                                            </div>
                                            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 lg:mt-0 order-1 lg:order-2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                IA Conversacional Avanzada
                            </h3>
                            <p className="text-lg text-gray-700 mb-6">
                                Nuestros agentes utilizan modelos GPT de última generación para mantener conversaciones naturales y contextuales con tus clientes.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-gray-700">
                                        Comprensión contextual y memoria de conversación
                                    </p>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-gray-700">
                                        Respuestas personalizadas según el perfil del cliente
                                    </p>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-gray-700">
                                        Manejo inteligente de consultas complejas
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Característica 2: Automatización con n8n */}
                    <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
                        <div className="mt-10 lg:mt-0">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Automatización Inteligente con n8n
                            </h3>
                            <p className="text-lg text-gray-700 mb-6">
                                Integra y automatiza tus procesos de negocio con flujos de trabajo personalizados que se adaptan a tus necesidades.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-gray-700">
                                        Integración con CRM, ERP y otras herramientas
                                    </p>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-gray-700">
                                        Flujos de trabajo personalizados y escalables
                                    </p>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-gray-700">
                                        Automatización de tareas repetitivas
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="relative mt-10 lg:mt-0">
                            <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center p-4 sm:p-8">
                                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-sm">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                <span className="text-sm font-medium text-gray-700">Flujo Activo</span>
                                            </div>
                                            <span className="text-xs text-gray-500">Última ejecución: 2min</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 bg-gray-200 rounded-full">
                                                <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500">
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
    )
} 