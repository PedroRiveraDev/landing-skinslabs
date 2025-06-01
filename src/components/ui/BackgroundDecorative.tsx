import React from 'react'

export default function BackgroundDecorative() {
    return (
        <div className="fixed inset-0 z-0 bg-slate-950">
            {/* Superposición para mejorar contraste */}
            <div className="absolute inset-0 bg-slate-950/70"></div>

            {/* Gradientes de fondo */}
            <div className="absolute inset-0">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,191,255,0.25),transparent)] rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(255,0,200,0.30),transparent)] rounded-full blur-2xl" />
                <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(0,191,255,0.15),transparent)] rounded-full blur-2xl" />
            </div>

            {/* Grid decorativo */}
            <div className="absolute inset-0 grid-pattern bg-grid-sm md:bg-grid-lg opacity-5" />
        </div>
    )
} 