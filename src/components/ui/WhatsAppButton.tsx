import Link from 'next/link'
import Image from 'next/image'
import { getWhatsAppUrl } from '@/config/env'

export default function WhatsAppButton() {
    return (
        <Link
            href={getWhatsAppUrl()}
            className="fixed bottom-8 right-8 z-50 hover:scale-110 transition-transform duration-300 w-[50px] md:w-[80px] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-full"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp - Abre en nueva ventana"
        >
            <Image
                src="/images/floatwsp.png"
                alt="Botón de WhatsApp flotante"
                width={80}
                height={80}
                className="w-full h-auto"
                priority
                sizes="(max-width: 768px) 50px, 80px"
            />
        </Link>
    )
} 