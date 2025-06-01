'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PriceFeature {
    text: string
    included: boolean
}

interface PriceProps {
    name: string
    price: string
    description: string
    features: PriceFeature[]
    highlighted?: boolean
}

function PriceCard({ name, price, description, features, highlighted = false }: PriceProps) {
    return (
        <div className={`relative rounded-2xl ${
            highlighted 
            ? 'bg-white border-sky-300 shadow-xl shadow-sky-100/50' 
            : 'bg-white border-slate-200'
        } p-8 hover:border-sky-300 transition-all duration-200 border-2 hover:shadow-2xl`}>
            {highlighted && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <span className="bg-sky-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">Más Popular</span>
                </div>
            )}
            <div className="text-center">
                <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
                <p className="mt-2 text-slate-700">{description}</p>
                <p className="mt-4">
                    <span className="text-4xl font-bold text-slate-900">{price}</span>
                    <span className="text-slate-700 ml-2">/pago inicial</span>
                </p>
                <span className="text-slate-600 ml-2">*Mantenimiento mensual: entre 10-20% del pago inicial según el caso de cada cliente.</span>
            </div>

            <ul className="mt-8 space-y-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="ml-3 text-slate-700">{feature.text}</p>
                    </li>
                ))}
            </ul>

            <div className="mt-8">
                <Link
                    href={`https://wa.me/56912345678?text=Hola,%20me%20interesa%20el%20plan%20${name}`}
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        highlighted
                        ? 'bg-sky-600 text-white hover:bg-sky-500'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200'
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Consultar Plan
                </Link>
            </div>
        </div>
    )
}

export default function Pricing() {
    const [currency, setCurrency] = useState<'CLP' | 'USD'>('CLP')
    const plans = [
        {
            name: "Profesional",
            price: currency === 'CLP' ? "$950.000" : "$1,100",
            description: "Ideal para pequeños/medianos negocios, desde:",
            features: [
                { text: "Hasta 1,000 conversaciones/mes", included: true },
                { text: "1 Agente de IA", included: true },
                { text: "Flujos con n8n", included: true },
                { text: "Integración a distintos canales", included: true },
                { text: "Reportes básicos", included: true },
                { text: "Soporte", included: true },
                { text: "Personalización avanzada", included: false },
            ],
            highlighted: true
        },
        {
            name: "Empresarial",
            price: "Consultar",
            description: "Soluciones a medida",
            features: [
                { text: "Conversaciones ilimitadas", included: true },
                { text: "Agentes ilimitados", included: true },
                { text: "Flujos personalizados", included: true },
                { text: "Integraciones a medida", included: true },
                { text: "Reportes personalizados", included: true },
                { text: "Soporte dedicado 24/7", included: true },
                { text: "Personalización total", included: true },
            ],
        },
    ]

    return (
        <>
        <section id="precios" className="relative py-28 lg:py-32 overflow-hidden">
            <div className="relative w-[90%] lg:w-full max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Planes que se Adaptan a tu Negocio
                    </h2>
                    <p className="mt-4 text-lg text-slate-200">
                        Elige el plan que mejor se ajuste a tus necesidades. Todos incluyen implementación personalizada.
                    </p>

                    {/* Currency Toggle */}
                    <div className="mt-8 inline-flex items-center bg-slate-900/50 backdrop-blur-sm rounded-lg p-1 border border-slate-800">
                        <button
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                                currency === 'CLP'
                                ? 'bg-sky-400 text-slate-900'
                                : 'text-slate-200 hover:text-white'
                            }`}
                            onClick={() => setCurrency('CLP')}
                        >
                            CLP
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                                currency === 'USD'
                                ? 'bg-sky-400 text-slate-900'
                                : 'text-slate-200 hover:text-white'
                            }`}
                            onClick={() => setCurrency('USD')}
                        >
                            USD
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <PriceCard key={plan.name} {...plan} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-200">
                        ¿Necesitas más información?{' '}
                        <Link
                            href="https://wa.me/56912345678?text=Hola,%20necesito%20más%20información%20sobre%20los%20planes"
                            className="text-sky-400 font-medium hover:text-sky-300 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contáctanos
                        </Link>
                    </p>
                </div>
            </div>
        </section>
        </>
    )
} 