import Link from 'next/link'

export default function WhatsAppButton() {
    return (
        <Link
            href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20SkinsLabs"
            className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
            target="_blank"
            rel="noopener noreferrer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
            >
                <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.91 5.83L2 22l4.17-1.09C7.83 21.91 9.85 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-2.14 0-4.21-.55-6.05-1.58L3.5 19.5l1.08-2.45C3.55 15.79 3 13.72 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9zm-4.5-9c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm6 0c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"
                    clipRule="evenodd"
                />
            </svg>
        </Link>
    )
} 