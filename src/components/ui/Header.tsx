'use client'

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-sm z-50 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-white hover:text-sky-400 transition-colors">
                            SkinsLabs
                        </Link>
                    </div>

                    {/* Navegación Desktop */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="#beneficios"
                            className="text-slate-300 hover:text-white transition-colors"
                        >
                            Beneficios
                        </Link>
                        <Link
                            href="#caracteristicas"
                            className="text-slate-300 hover:text-white transition-colors"
                        >
                            Características
                        </Link>
                        <Link 
                            href="#precios" 
                            className="text-slate-300 hover:text-white transition-colors"
                        >
                            Precios
                        </Link>
                        <Link 
                            href="#faq" 
                            className="text-slate-300 hover:text-white transition-colors"
                        >
                            FAQ
                        </Link>
                    </nav>

                    {/* CTA Desktop */}
                    <div className="hidden md:block">
                        <Link
                            href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs"
                            className="bg-sky-400 text-slate-900 px-6 py-2 rounded-lg font-medium hover:bg-sky-300 transition-all duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contáctanos
                        </Link>
                    </div>

                    {/* Botón Menú Móvil */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Menú Móvil */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-800 bg-slate-950/95 backdrop-blur-sm">
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="#beneficios"
                                className="text-slate-300 hover:text-white px-2 py-1 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Beneficios
                            </Link>
                            <Link
                                href="#caracteristicas"
                                className="text-slate-300 hover:text-white px-2 py-1 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Características
                            </Link>
                            <Link 
                                href="#precios" 
                                className="text-slate-300 hover:text-white px-2 py-1 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Precios
                            </Link>
                            <Link 
                                href="#faq" 
                                className="text-slate-300 hover:text-white px-2 py-1 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                FAQ
                            </Link>
                            <Link
                                href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs"
                                className="bg-sky-400 text-slate-900 px-6 py-2 rounded-lg font-medium hover:bg-sky-300 transition-all duration-200 text-center mx-2"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contáctanos
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
