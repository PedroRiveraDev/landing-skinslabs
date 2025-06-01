import Link from 'next/link'
import Image from 'next/image'

export default function WhatsAppButton() {
    return (
        <Link
            href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs"
            className="fixed bottom-8 right-8 z-50 hover:scale-110 transition-transform duration-300 w-[50px] md:w-[80px]"
            target="_blank"
            rel="noopener noreferrer"
        >
            <Image 
                src="/images/floatwsp.png"
                alt="WhatsApp"
                width={80}
                height={80}
                className="w-full h-auto"
            />
        </Link>
    )
} 