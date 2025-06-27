import Link from 'next/link'
import Image from 'next/image'
import { getWhatsAppUrl } from '@/config/env'

export default function Hero() {
    return (
        <>
            <section
                className="relative min-h-[90vh] overflow-hidden"
                aria-labelledby="hero-heading"
            >
                {/* Contenido principal */}
                <br />
                <br />
                <div className="relative z-10 flex flex-col items-center justify-center w-[90%] lg:w-full px-6 lg:px-12 pt-28 pb-20 text-center mx-auto max-w-7xl gap-y-6">
                    {/* Subtítulo */}
                    <p
                        data-aos="fade-up"
                        data-aos-offset="0"
                        className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium text-slate-200 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-700 shadow-md hover:shadow-lg transition duration-200 inline-block"
                        role="doc-subtitle"
                    >
                        🤖 Asistentes Virtuales para Negocios
                    </p>

                    {/* Título */}
                    <h1
                        id="hero-heading"
                        data-aos="fade-up"
                        data-aos-offset="50"
                        className="font-bold leading-tight drop-shadow text-white text-balance text-[clamp(2.5rem,4vw+1rem,3.5rem)] max-w-6xl mx-auto"
                    >
                        Creamos tu Asistente Virtual con IA <span className="text-sky-400">para automatizar tu atención.</span>
                    </h1>

                    {/* Descripción */}
                    <p
                        data-aos="fade-up"
                        data-aos-offset="100"
                        className="text-lg sm:text-xl lg:text-xl text-slate-300 max-w-3xl mx-auto"
                    >
                        Atiende automáticamente a tus clientes, responde consultas al instante y mejora tu servicio 24/7. Sin complicaciones, sin código; implementación personalizada para tu negocio.
                    </p>

                    {/* Botones CTA */}
                    <div
                        data-aos="fade-up"
                        data-aos-offset="150"
                        className="flex flex-wrap justify-center gap-4 mt-6"
                        role="group"
                        aria-label="Acciones principales"
                    >
                        <Link
                            href={getWhatsAppUrl()}
                            className="group rounded-lg px-6 py-3 font-medium bg-sky-400 text-slate-900 hover:bg-sky-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Contactar por WhatsApp para discutir tu proyecto"
                        >
                            Hablemos de tu proyecto
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline-block w-5 h-5 ml-2 -mr-1 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="#caracteristicas"
                            className="rounded-lg border px-6 py-3 font-medium border-slate-700 bg-slate-800 text-white hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent"
                            aria-label="Ver características del servicio"
                        >
                            ¿Cómo funciona?
                        </Link>
                    </div>

                    {/* Dashboard Preview */}
                    <div
                        data-aos="fade-up"
                        data-aos-offset="200"
                        className="mt-16 relative w-full max-w-6xl mx-auto"
                        role="img"
                        aria-label="Vista previa del dashboard de SkinsLabs mostrando la interfaz del asistente virtual"
                    >
                        <div className="relative bg-white/5 backdrop-blur-sm p-4 sm:p-8 rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl">
                            <div className="aspect-[16/10] rounded-lg overflow-hidden">
                                <Image
                                    src="/images/dashboard-dark.webp"
                                    alt="Vista previa del dashboard de SkinsLabs - Interfaz moderna y profesional del asistente virtual con IA"
                                    width={1920}
                                    height={1080}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                    quality={85}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
