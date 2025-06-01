import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gray-50">

            {/* Fondo principal intenso con azul radial + gradiente de fondo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-400 via-white to-blue-200"></div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] blur-3xl opacity-80"></div>

            {/* Grid decorativo más visible en azul */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(59,130,246,0.20) 1px, transparent 1px), 
                    linear-gradient(90deg, rgba(59,130,246,0.20) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                }}
            ></div>

            {/* Contenido principal */}
            <div className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 lg:pt-40 lg:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Subtítulo superior */}
                        <div className="inline-block animate-fade-in">
                            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium text-gray-700 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-100 shadow-md hover:shadow-lg transition-all duration-200">
                                🤖 Asistentes Virtuales para Negocios
                            </p>
                        </div>

                        {/* Título principal */}
                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl drop-shadow animate-fade-in-up">
                            <span className="block mb-2">Creamos tu Asistente Virtual con IA</span>
                            <span className="block bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent drop-shadow">
                                para automatizar tu atención.
                            </span>
                        </h1>

                        {/* Descripción */}
                        <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-base text-gray-800 drop-shadow-sm backdrop-blur-sm">
                            Atiende automáticamente a tus clientes, responde consultas al instante y mejora tu servicio 24/7. Sin complicaciones, sin código, Implementación personalizada para tu negocio.
                        </p>

                        {/* Botones CTA */}
                        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                            <Link
                                href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-sm sm:text-base font-medium rounded-full shadow-lg hover:shadow-xl text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all duration-200"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Hablemos de tu proyecto
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </Link>
                            <Link
                                href="#caracteristicas"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-gray-200 text-sm sm:text-base font-medium rounded-full text-white bg-blue-500 hover:bg-blue-600 hover:border-gray-300 transition-all duration-200 backdrop-blur-sm shadow-md hover:shadow-lg"
                            >
                                ¿Cómo funciona?
                            </Link>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="mt-16 relative">
                        <div className="absolute -inset-x-2 -top-2 -bottom-2 bg-gradient-to-r from-blue-100/50 via-blue-50/50 to-white/50 opacity-50 blur-2xl"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm p-4 sm:p-8 rounded-xl shadow-2xl border border-gray-100/50 hover:shadow-3xl transition-shadow duration-300">
                            <div className="aspect-[16/9] rounded-lg overflow-hidden">
                                <Image
                                    src="/images/dashboard-dark.webp"
                                    alt="Vista previa del dashboard de SkinsLabs"
                                    width={1920}
                                    height={1080}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
} 