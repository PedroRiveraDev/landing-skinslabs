import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://skinslabs.com'),
  title: "SkinsLabs | Agentes con IA",
  description: "Automatiza tu atención al cliente 24/7 con agentes conversacionales de IA en WhatsApp. Implementación en 7 días.",
  openGraph: {
    title: "SkinsLabs | Agentes de WhatsApp con IA",
    description: "Automatiza tu atención al cliente 24/7 con agentes conversacionales de IA en WhatsApp. Implementación en 7 días.",
    url: "https://skinslabs.com",
    siteName: "SkinsLabs",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SkinsLabs - Agentes de WhatsApp con IA"
      }
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkinsLabs | Agentes de WhatsApp con IA",
    description: "Automatiza tu atención al cliente 24/7 con agentes conversacionales de IA en WhatsApp.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}; 