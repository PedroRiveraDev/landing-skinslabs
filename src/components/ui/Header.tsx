'use client'

import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
    variant?: 'default' | 'landing';
}

export default function Header({ variant = 'default' }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isLanding = variant === 'landing';
    const bgColor = isLanding ? 'bg-white/80' : 'bg-slate-950/80';
    const textColor = isLanding ? 'text-slate-900' : 'text-white';
    const borderColor = isLanding ? 'border-slate-200' : 'border-slate-800';
    const linkHoverColor = isLanding ? 'hover:text-sky-600' : 'hover:text-sky-400';
    const mobileMenuBg = isLanding ? 'bg-white/95' : 'bg-slate-950/95';
    const navTextColor = isLanding ? 'text-slate-600' : 'text-slate-300';

    return (
        <header className={`fixed top-0 w-full ${bgColor} backdrop-blur-sm z-50 border-b ${borderColor}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link href="/" className={`text-2xl font-bold ${textColor} ${linkHoverColor} transition-colors`}>
                            SkinsLabs
                        </Link>
                    </div>

                    {/* Navegación Desktop */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className={`${navTextColor} hover:${textColor} transition-colors`}
                        >
                            Agentes IA
                        </Link>
                        <Link
                            href="/landing-pages"
                            className={`${navTextColor} hover:${textColor} transition-colors`}
                        >
                            Landing Pages
                        </Link>
                    </nav>

                    {/* CTA Desktop */}
                    <div className="hidden md:block">
                        <Link
                            href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs"
                            className={`${isLanding ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-sky-400 hover:bg-sky-300 text-slate-900'} px-6 py-2 rounded-lg font-medium transition-all duration-200`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contáctanos
                        </Link>
                        <Link
                            href="./inicio-sesion"
                            className={`${isLanding ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-sky-400 hover:bg-sky-300 text-slate-900'} px-6 py-2 ms-4 rounded-lg font-medium transition-all duration-200`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Inicio Sesion
                        </Link>
                    </div>

                    {/* Botón Menú Móvil */}
                    <button
                        className={`md:hidden p-2 rounded-lg ${isLanding ? 'hover:bg-slate-100' : 'hover:bg-slate-800'} ${textColor}`}
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
                    <div className={`md:hidden py-4 border-t ${borderColor} ${mobileMenuBg} backdrop-blur-sm`}>
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="/"
                                className={`${navTextColor} hover:${textColor} px-2 py-1 transition-colors`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Agentes IA
                            </Link>
                            <Link
                                href="/landing-pages"
                                className={`${navTextColor} hover:${textColor} px-2 py-1 transition-colors`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Landing Pages
                            </Link>
                            <Link
                                href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs"
                                className={`${isLanding ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-sky-400 hover:bg-sky-300 text-slate-900'} px-6 py-2 rounded-lg font-medium transition-all duration-200 text-center mx-2`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contáctanos
                            </Link>
                            <Link
                                href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs"
                                className={`${isLanding ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-sky-400 hover:bg-sky-300 text-slate-900'} px-6 py-2 rounded-lg font-medium transition-all duration-200 text-center mx-2`}
                                target="_blank"
                                rel="noopener noreferrer"
                                
                            >
                                Inicio Sesion
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
