"use client";

import React, { useEffect, useState } from "react";
import BackgroundDecorative from "@/components/ui/BackgroundDecorative";
import Header from "@/components/ui/Header";
import {
  obtenerBots,
  crearBot,
  actualizarBot,
  eliminarBot,
} from "@/services/graphqlService";

export default function ClientCatalogoBots() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    imagenUrl: "",
  });

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const data = await obtenerBots();
        setBots(data);
      } catch (error) {
        console.error("Error al obtener bots:", error);
      }
    };
    fetchBots();
  }, []);

  const gradientColors = [
    "from-blue-500",
    "from-purple-500",
    "from-pink-500",
    "from-indigo-500",
    "from-emerald-500",
    "from-rose-500",
    "from-teal-500",
    "from-orange-500",
  ];

  const [editingBot, setEditingBot] = useState<Bot | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (bot: Bot) => {
    setFormData({
      titulo: bot.titulo,
      descripcion: bot.descripcion,
      imagenUrl: bot.imagenUrl || "",
    });
    setEditingBot(bot);
    setShowModal(true);
  };

  return (
    <>
      <BackgroundDecorative />
      <article className="relative z-10">
        <Header />
        <section className="relative z-10 flex flex-col items-center justify-center w-[90%] lg:w-full px-6 lg:px-12 pt-28 pb-20 mx-auto max-w-7xl gap-y-12">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-bold text-white">Bots</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {bots.map((bot) => (
              <div
                key={bot.id}
                className="bg-white text-black rounded-xl shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-[1.02]"
              >
                <div>
                  <h2 className="text-xl font-bold mb-2">{bot.titulo}</h2>
                  <p className="mb-4 text-sm text-gray-700">
                    {bot.descripcion}
                  </p>
                </div>

                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(bot)}
                    className="bg-amber-400 hover:bg-amber-500 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={async () => {
                      const confirmDelete = confirm(
                        "¿Estás seguro de que quieres eliminar este bot?"
                      );
                      if (!confirmDelete) return;
                      try {
                        setIsDeleting(true);
                        await eliminarBot(bot.id);
                        const updatedBots = await obtenerBots();
                        setBots(updatedBots);
                      } catch (err) {
                        console.error("Error al eliminar bot:", err);
                      } finally {
                        setIsDeleting(false);
                      }
                    }}
                    className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    {isDeleting ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-stone-50 rounded-xl shadow-lg p-6 w-full max-w-md relative text-black">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editingBot ? "Actualizar Bot" : "Crear Bot"}
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  if (editingBot) {
                    await actualizarBot(Number(editingBot.id), {
                      ...formData,
                      funciones: [],
                      integraciones: [],
                      casosUso: [],
                      tecnologias: [],
                      flujosAutomatizados: [],
                      requisitos: [],
                    });
                  } else {
                    await crearBot({
                      ...formData,
                      funciones: [],
                      integraciones: [],
                      casosUso: [],
                      tecnologias: [],
                      flujosAutomatizados: [],
                      requisitos: [],
                    });
                  }
                  setFormData({ titulo: "", descripcion: "", imagenUrl: "" });
                  setEditingBot(null);
                  setShowModal(false);
                  const updatedBots = await obtenerBots();
                  setBots(updatedBots);
                } catch (err) {
                  console.error("Error al guardar bot:", err);
                }
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Título"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                required
              />
              <input
                type="text"
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                required
              />
              <input
                type="text"
                placeholder="URL de la imagen"
                value={formData.imagenUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imagenUrl: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-md cursor-pointer"
                >
                  {editingBot ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
