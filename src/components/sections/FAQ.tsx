'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FAQItemProps {
    question: string
    answer: string
}

function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-b border-slate-800">
            <button
                className="flex justify-between items-center w-full py-4 text-left transition-colors duration-200 hover:text-sky-400"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-medium text-white">{question}</span>
                <span className="ml-6 flex-shrink-0">
                    <svg 
                        className={`h-6 w-6 text-sky-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div className={`transition-all duration-200 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="pb-4">
                    <p className="text-base text-slate-200">{answer}</p>
                </div>
            </div>
        </div>
    )
}

export default function FAQ() {
    const faqs = [
        {
            question: "¿Cuánto tiempo toma implementar el agente de IA?",
            answer: "La implementación estándar toma de 15 a 20 días hábiles. Esto incluye la configuración inicial, entrenamiento del modelo con tu información, y pruebas de calidad. Para implementaciones más complejas o personalizadas, el tiempo puede variar."
        },
        {
            question: "¿Qué tipo de integraciones soportan?",
            answer: "Gracias a n8n, podemos integrar el agente con una amplia variedad de sistemas y servicios. Esto incluye CRM (como Salesforce, HubSpot), sistemas ERP, bases de datos, herramientas de marketing, y más. También ofrecemos una API REST para integraciones personalizadas."
        },
        {
            question: "¿El agente puede transferir conversaciones a humanos?",
            answer: "Sí, el agente está diseñado para identificar situaciones que requieren intervención humana y puede transferir la conversación de manera fluida a tu equipo de soporte. Además, mantenemos un registro completo de la conversación para contexto."
        },
        {
            question: "¿Cómo entrenan al agente con información de mi empresa?",
            answer: "Utilizamos un proceso de fine-tuning especializado donde incorporamos tu documentación, políticas, productos y casos de uso específicos. El agente aprende continuamente de las interacciones para mejorar sus respuestas."
        },
        {
            question: "¿Qué medidas de seguridad implementan?",
            answer: "Implementamos múltiples capas de seguridad: encriptación de datos en tránsito y en reposo, autenticación de dos factores, auditorías regulares de seguridad, y cumplimiento con estándares de protección de datos. Toda la información se almacena en servidores seguros."
        },
        {
            question: "¿Puedo personalizar las respuestas del agente?",
            answer: "Sí, el agente puede ser personalizado en varios aspectos: tono de comunicación, respuestas específicas para diferentes situaciones, flujos de conversación, y reglas de escalamiento. También puedes definir respuestas predeterminadas para preguntas comunes."
        }
    ]

    return (
        <>
        <section id="faq" className="relative py-28 lg:py-32 overflow-hidden">
            <div className="relative w-[90%] lg:w-full max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Preguntas Frecuentes
                    </h2>
                    <p className="mt-4 text-lg text-slate-200">
                        Resolvemos tus dudas sobre nuestros servicios y cómo podemos ayudarte.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="max-w-3xl mx-auto divide-y divide-slate-800">
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} {...faq} />
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <p className="text-slate-200">
                            ¿No encuentras la respuesta que buscas?{' '}
                            <Link
                                href="https://wa.me/56912345678?text=Hola,%20tengo%20una%20consulta%20sobre%20SkinsLabs"
                                className="text-sky-400 font-medium hover:text-sky-300 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Contáctanos directamente
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
} 