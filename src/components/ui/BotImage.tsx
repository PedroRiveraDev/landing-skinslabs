"use client";

import { useState } from 'react';

interface BotImageProps {
    imagenUrl: string;
    titulo: string;
}

function getBotImageUrl(imagenUrl: string) {
    if (!imagenUrl) return "/placeholder.svg";
    
    // Si ya es una URL completa, devolverla tal como está
    if (imagenUrl.startsWith("http://") || imagenUrl.startsWith("https://")) {
        return imagenUrl;
    }
    
    // Si es una ruta que comienza con /uploads/, usar nuestro proxy interno
    if (imagenUrl.startsWith("/uploads/")) {
        // Usar directamente nuestro proxy API manteniendo la estructura
        return `/api${imagenUrl}`;
    }
    
    // Si es una ruta relativa que comienza con /, construir usando el proxy
    if (imagenUrl.startsWith("/")) {
        return `/api${imagenUrl}`;
    }
    
    // Si es solo un nombre de archivo, asumir que va en uploads
    return `/api/uploads/${imagenUrl}`;
}

export default function BotImage({ imagenUrl, titulo }: BotImageProps) {
    const [hasError, setHasError] = useState(false);

    return (
        <img
            src={hasError ? '/placeholder.svg' : getBotImageUrl(imagenUrl)}
            alt={titulo}
            className="object-cover object-center w-full h-full rounded-t-3xl border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
            style={{ boxShadow: '0 6px 32px 0 rgba(31, 38, 135, 0.10)' }}
            onError={() => {
                console.warn(`Imagen no encontrada para ${titulo}, usando placeholder`);
                setHasError(true);
            }}
        />
    );
}
