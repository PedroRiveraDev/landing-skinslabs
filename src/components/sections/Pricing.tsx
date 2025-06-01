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
        <div className={`relative rounded-2xl ${highlighted ? 'bg-white shadow-xl border-blue-500' : 'bg-gray-50'} border-2 p-8`}>
            {highlighted && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">Más Popular</span>
                </div>
            )}
            <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                <p className="mt-2 text-gray-500">{description}</p>
                <p className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{price}</span>
                    <span className="text-gray-500 ml-2">/pago inicial</span>
                </p>
                <span className="text-gray-500 ml-2">*Mantenimiento mensual: entre 10-20% del pago inicial según el caso de cada cliente.</span>
            </div>
            <ul className="mt-8 space-y-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                            {feature.included ? (
                                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </div>
                        <p className={`ml-3 ${feature.included ? 'text-gray-700' : 'text-gray-500'}`}>
                            {feature.text}
                        </p>
                    </li>
                ))}
            </ul>
            <div className="mt-8">
                <Link
                    href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20el%20plan%20${name}"
                    className={`block w-full text-center px-6 py-3 rounded-full text-base font-medium ${
                        highlighted
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    } transition-colors`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Más Información
                </Link>
            </div>
        </div>
    )
}

export default function Pricing() {
    const plans = [
        {
            name: "Profesional",
            price: "$950.000",
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
        <section id="precios" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Planes que se Adaptan a tu Negocio
                    </h2>
                    <p className="mt-4 text-lg text-gray-700">
                        Elige el plan que mejor se ajuste a tus necesidades. Todos incluyen implementación personalizada.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <PriceCard key={plan.name} {...plan} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-700">
                        ¿Necesitas más información?{' '}
                        <Link
                            href="https://wa.me/56912345678?text=Hola,%20necesito%20más%20información%20sobre%20los%20planes"
                            className="text-blue-600 font-medium hover:text-blue-700"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contáctanos
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
} 