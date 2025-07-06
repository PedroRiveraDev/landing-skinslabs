"use client";

import BackgroundDecorative from "@/components/ui/BackgroundDecorative";
import Header from "@/components/ui/Header";
import { ejemplosBots } from "@/data/bots";
import { crearBotCompleto } from "@/services/graphqlService";



export default function EjemplosBotsSection() {
  const handleCrearEjemplo = async (bot: any) => {
    try {
      await crearBotCompleto(bot);
      alert("Bot creado exitosamente.");
    } catch (err) {
      console.error("Error al crear bot de ejemplo:", err);
      alert("Ocurrió un error al crear el bot.");
    }
  };

  return (
    <>
      <BackgroundDecorative />
      <article className="relative z-10 min-h-screen">
        <Header />
        <section className="relative z-10 pt-32 pb-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Bots Recomendados
            </h1>
            <p className="text-slate-300 text-lg">
              Elige uno de nuestros bots preconfigurados para implementarlo al instante.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ejemplosBots.map((bot, idx) => (
              <div
                key={idx}
                className="bg-white text-black rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div>
                  <h2 className="text-xl font-bold mb-2">{bot.titulo}</h2>
                  <p className="mb-4 text-sm text-gray-700">{bot.descripcion}</p>
                  <ul className="text-sm mb-4 list-disc list-inside space-y-1">
                    {bot.funciones.slice(0, 2).map((f, i) => (
                      <li key={i}>✔️ {f.descripcion}</li>
                    ))}
                    {bot.integraciones.slice(0, 1).map((intg, i) => (
                      <li key={i}>🔌 {intg.nombre}</li>
                    ))}
                    {bot.casosUso.slice(0, 1).map((c, i) => (
                      <li key={i}>🎯 {c.descripcion}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleCrearEjemplo(bot)}
                  className="mt-6 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Crear Bot
                </button>
              </div>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
