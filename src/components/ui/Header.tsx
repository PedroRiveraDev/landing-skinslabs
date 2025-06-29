"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { env, getWhatsAppUrl } from "@/config/env";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

interface HeaderProps {
  variant?: "default" | "landing";
}

export default function Header({ variant = "default" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLanding = variant === "landing";
  const bgColor = isLanding ? "bg-white/80" : "bg-slate-950/80";
  const textColor = isLanding ? "text-slate-900" : "text-white";
  const borderColor = isLanding ? "border-slate-200" : "border-slate-800";
  const linkHoverColor = isLanding
    ? "hover:text-sky-600"
    : "hover:text-sky-400";
  const mobileMenuBg = isLanding ? "bg-white/95" : "bg-slate-950/95";
  const navTextColor = isLanding ? "text-slate-600" : "text-slate-300";

  // Función para cerrar el menú móvil
  const closeMobileMenu = () => setIsMenuOpen(false);

  // Función para manejar navegación por teclado
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  };

  return (
    <header
      className={`fixed top-0 w-full ${bgColor} backdrop-blur-sm z-50 border-b ${borderColor}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link
              href="/"
              className={`text-2xl font-bold ${textColor} ${linkHoverColor} transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent rounded`}
              aria-label={`Ir a la página principal de ${env.COMPANY_NAME}`}
            >
              {env.COMPANY_NAME}
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav
            className="hidden md:flex items-center gap-8"
            role="navigation"
            aria-label="Navegación principal"
          >
            <Link
              href="/"
              className={`${navTextColor} hover:${textColor} transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1`}
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Agentes IA
            </Link>
            <Link
              href="/landing-pages"
              className={`${navTextColor} hover:${textColor} transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1`}
              aria-current={pathname === "/landing-pages" ? "page" : undefined}
            >
              Landing Pages
            </Link>
            <Link
              href="/test-page"
              className={`${navTextColor} hover:${textColor} transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1`}
              aria-current={pathname === "/test-page" ? "page" : undefined}
            >
              Página de Prueba
            </Link>
            <Link
              href="/services"
              className={`${navTextColor} hover:${textColor} transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1`}
              aria-current={pathname === "/services" ? "page" : undefined}
            >
              Servicios
            </Link>
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className={`${
                    isLanding
                      ? "bg-sky-500 hover:bg-sky-600 text-white"
                      : "bg-sky-400 hover:bg-sky-300 text-slate-900"
                  } px-6 py-2 rounded-lg font-medium transition-all duration-200`}
                >
                  Iniciar Sesión
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Botón Menú Móvil */}
          <button
            className={`md:hidden p-2 rounded-lg ${
              isLanding ? "hover:bg-slate-100" : "hover:bg-slate-800"
            } ${textColor} focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onKeyDown={handleKeyDown}
            aria-label={
              isMenuOpen
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="true"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Menú Móvil */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className={`md:hidden py-4 border-t ${borderColor} ${mobileMenuBg} backdrop-blur-sm`}
            role="navigation"
            aria-label="Menú de navegación móvil"
          >
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className={`${navTextColor} hover:${textColor} px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent rounded`}
                onClick={closeMobileMenu}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Agentes IA
              </Link>
              <Link
                href="/landing-pages"
                className={`${navTextColor} hover:${textColor} px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent rounded`}
                onClick={closeMobileMenu}
                aria-current={
                  pathname === "/landing-pages" ? "page" : undefined
                }
              >
                Landing Pages
              </Link>
              <Link
                href="/services"
                className={`${navTextColor} hover:${textColor} transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1`}
                aria-current={pathname === "/services" ? "page" : undefined}
              >
                Servicios
              </Link>
              <Link
                href="/test-page"
                className={`${navTextColor} hover:${textColor} px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent rounded`}
                onClick={closeMobileMenu}
                aria-current={pathname === "/test-page" ? "page" : undefined}
              >
                Página de Prueba
              </Link>
              <div className="px-2 py-1">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      className={`${
                        isLanding
                          ? "bg-sky-500 hover:bg-sky-600 text-white"
                          : "bg-sky-400 hover:bg-sky-300 text-slate-900"
                      } w-full px-6 py-2 rounded-lg font-medium transition-all duration-200 text-center`}
                    >
                      Iniciar Sesión
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
