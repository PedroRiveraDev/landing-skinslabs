"use client";
import BackgroundDecorative from "@/components/ui/BackgroundDecorative";
import Header from "@/components/ui/Header";
import React, { useEffect, useState } from "react";

export default function CatalogoBots() {
  const [bots, setBots] = useState<BotServicio[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/catalogo")
      .then((res) => res.json())
      .then((data) => setBots(data))
      .catch((err) => console.error("Error al cargar los bots:", err));
  }, []);
   const gradientColors = [
    "from-[rgba(0,191,255,0.25)]",
    "from-[rgba(255,0,200,0.30)]",
  ];

  return (
    <>
      <BackgroundDecorative />
      <article className="relative z-10">
        <Header />
        <section className="relative z-10 flex flex-col items-center justify-center w-[90%] lg:w-full px-6 lg:px-12 pt-28 pb-20 text-center mx-auto max-w-7xl gap-y-12">
          <h1 className="text-3xl font-bold mb-12">Nuestros Servicios</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {bots.map((bot, index) => (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br ${
                  gradientColors[index % gradientColors.length]
                } to-transparent`}
              >
                <h2 className="text-2xl font-extrabold mb-4 text-slate-100">
                  {bot.titulo}
                </h2>
                <p className="text-slate-300">{bot.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
