"use client";

import React, { useEffect, useRef, useState } from "react";
import BackgroundDecorative from "@/components/ui/BackgroundDecorative";
import Header from "@/components/ui/Header";
import BackendStatus from "@/components/ui/BackendStatus";
import {
  obtenerBots,
  crearBot,
  actualizarBot,
  eliminarBot,
} from "@/services/graphqlService";
import { subirImagenBot } from "@/services/imageUploadService";
import type { Bot, BotServicioInput } from "@/interface/Bot.interface";
import { env } from "@/config/env";

function getBotImageUrl(imagenUrl: string) {
  if (!imagenUrl) return "/placeholder.png"; // Cambia por tu placeholder real si tienes uno
  if (imagenUrl.startsWith("http")) return imagenUrl;
  return `http://localhost:8080${imagenUrl}`;
}

export default function ClientMisBots() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<BotServicioInput & {
    funciones: string[];
    integraciones: string[];
    casosUso: string[];
    tecnologias: string[];
    flujosAutomatizados: string[];
    requisitos: string[];
  }>({
    titulo: "",
    descripcion: "",
    imagenUrl: "",
    funciones: [],
    integraciones: [],
    casosUso: [],
    tecnologias: [],
    flujosAutomatizados: [],
    requisitos: [],
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingBot, setEditingBot] = useState<Bot | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerBots();
      setBots(data);
    } catch (error) {
      setError("Error al cargar los bots. Verifica que el backend esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const relacionesVacias = {
        funciones: [],
        integraciones: [],
        casosUso: [],
        tecnologias: [],
        flujosAutomatizados: [],
        requisitos: [],
      };
      let imagenUrl = formData.imagenUrl;
      if (selectedImage) {
        const botId = editingBot ? editingBot.id : undefined;
        if (botId) {
          imagenUrl = await subirImagenBot(botId, selectedImage);
          await actualizarBot(botId, { ...formData, imagenUrl, ...relacionesVacias });
        } else {
          // Crear bot sin imagen
          const nuevoBot = await crearBot({ ...formData, imagenUrl: "", ...relacionesVacias });
          // Subir imagen y dejar que el backend actualice el campo
          await subirImagenBot(nuevoBot.id, selectedImage);
          // Espera breve para asegurar que el backend procese la imagen
          await new Promise((res) => setTimeout(res, 400));
          await fetchBots();
          limpiarFormulario();
          setShowModal(false);
          setSuccess("Bot guardado correctamente.");
          return;
        }
      } else {
        if (editingBot) {
          await actualizarBot(editingBot.id, { ...formData, imagenUrl, ...relacionesVacias });
        } else {
          await crearBot({ ...formData, imagenUrl, ...relacionesVacias });
        }
      }
      await new Promise((res) => setTimeout(res, 400));
      await fetchBots();
      limpiarFormulario();
      setShowModal(false);
      setSuccess("Bot guardado correctamente.");
    } catch (error) {
      setError("Error al guardar el bot. Verifica los datos e intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setFormData({
      titulo: "",
      descripcion: "",
      imagenUrl: "",
      funciones: [],
      integraciones: [],
      casosUso: [],
      tecnologias: [],
      flujosAutomatizados: [],
      requisitos: [],
    });
    setSelectedImage(null);
    setImagePreview(null);
    setEditingBot(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (bot: Bot) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este bot?")) return;
    try {
      setLoading(true);
      setError(null);
      await eliminarBot(bot.id);
      await fetchBots();
    } catch (error) {
      setError("Error al eliminar el bot. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bot: Bot) => {
    setFormData({
      titulo: bot.titulo,
      descripcion: bot.descripcion,
      imagenUrl: bot.imagenUrl || "",
      funciones: bot.funciones || [],
      integraciones: bot.integraciones || [],
      casosUso: bot.casosUso || [],
      tecnologias: bot.tecnologias || [],
      flujosAutomatizados: bot.flujosAutomatizados || [],
      requisitos: bot.requisitos || [],
    });
    setImagePreview(bot.imagenUrl ? getBotImageUrl(bot.imagenUrl) : null);
    setSelectedImage(null);
    setEditingBot(bot);
    setShowModal(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCreateNew = () => {
    limpiarFormulario();
    setShowModal(true);
  };

  return (
    <>
      <BackgroundDecorative />
      <article className="relative z-10">
        <Header />
        <section className="relative z-10 flex flex-col items-center justify-center w-[90%] lg:w-full px-6 lg:px-12 pt-28 pb-20 mx-auto max-w-7xl gap-y-12">
          <div className="flex justify-between items-center w-full">
            <div>
              <h1 className="text-3xl font-bold text-white">Mis Bots</h1>
              <BackendStatus className="mt-2" />
            </div>
            <button
              onClick={handleCreateNew}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Crear Nuevo Bot
            </button>
          </div>

          {success && (
            <div className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          {error && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {loading && !bots.length && (
            <div className="w-full text-center text-white">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="mt-2">Cargando bots...</p>
            </div>
          )}

          {!loading && bots.length === 0 && !error && (
            <div className="w-full text-center text-white">
              <p className="text-xl">No tienes bots creados aún.</p>
              <p className="text-gray-300 mt-2">Crea tu primer bot haciendo clic en "Crear Nuevo Bot"</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {bots.map((bot) => (
              <div
                key={bot.id}
                className="bg-white text-black rounded-xl shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-[1.02]"
              >
                <div>
                  <div className="mb-4">
                    <img
                      src={getBotImageUrl(bot.imagenUrl)}
                      alt={bot.titulo}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <h2 className="text-xl font-bold mb-2">{bot.titulo}</h2>
                  <p className="mb-4 text-sm text-gray-700">
                    {bot.descripcion}
                  </p>
                </div>

                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(bot)}
                    disabled={loading}
                    className="bg-amber-400 hover:bg-amber-500 disabled:bg-gray-400 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(bot)}
                    disabled={loading}
                    className="bg-rose-500 hover:bg-rose-600 disabled:bg-gray-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-stone-50 rounded-xl shadow-lg p-6 w-full max-w-md relative text-black max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editingBot ? "Actualizar Bot" : "Crear Bot"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  placeholder="Título del bot"
                  value={formData.titulo}
                  onChange={(e) =>
                    setFormData({ ...formData, titulo: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción *
                </label>
                <textarea
                  placeholder="Descripción del bot"
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-black h-24 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                  ref={fileInputRef}
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                {!imagePreview && formData.imagenUrl && (
                  <div className="mt-2">
                    <img
                      src={getBotImageUrl(formData.imagenUrl)}
                      alt="Imagen actual"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funciones
                </label>
                {formData.funciones.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-1">
                    <input
                      type="text"
                      value={f}
                      onChange={e => {
                        const arr = [...formData.funciones];
                        arr[i] = e.target.value;
                        setFormData(fd => ({ ...fd, funciones: arr }));
                      }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-black"
                    />
                    <button type="button" onClick={() => {
                      setFormData(fd => ({ ...fd, funciones: fd.funciones.filter((_, idx) => idx !== i) }));
                    }} className="text-red-500">✕</button>
                  </div>
                ))}
                <button type="button" onClick={() => setFormData(fd => ({ ...fd, funciones: [...fd.funciones, ""] }))} className="text-xs text-blue-600 mt-1">+ Agregar función</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Integraciones
                </label>
                {formData.integraciones.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-1">
                    <input
                      type="text"
                      value={f}
                      onChange={e => {
                        const arr = [...formData.integraciones];
                        arr[i] = e.target.value;
                        setFormData(fd => ({ ...fd, integraciones: arr }));
                      }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-black"
                    />
                    <button type="button" onClick={() => {
                      setFormData(fd => ({ ...fd, integraciones: fd.integraciones.filter((_, idx) => idx !== i) }));
                    }} className="text-red-500">✕</button>
                  </div>
                ))}
                <button type="button" onClick={() => setFormData(fd => ({ ...fd, integraciones: [...fd.integraciones, ""] }))} className="text-xs text-blue-600 mt-1">+ Agregar integración</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Casos de Uso
                </label>
                {formData.casosUso.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-1">
                    <input
                      type="text"
                      value={f}
                      onChange={e => {
                        const arr = [...formData.casosUso];
                        arr[i] = e.target.value;
                        setFormData(fd => ({ ...fd, casosUso: arr }));
                      }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-black"
                    />
                    <button type="button" onClick={() => {
                      setFormData(fd => ({ ...fd, casosUso: fd.casosUso.filter((_, idx) => idx !== i) }));
                    }} className="text-red-500">✕</button>
                  </div>
                ))}
                <button type="button" onClick={() => setFormData(fd => ({ ...fd, casosUso: [...fd.casosUso, ""] }))} className="text-xs text-blue-600 mt-1">+ Agregar caso de uso</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tecnologías
                </label>
                {formData.tecnologias.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-1">
                    <input
                      type="text"
                      value={f}
                      onChange={e => {
                        const arr = [...formData.tecnologias];
                        arr[i] = e.target.value;
                        setFormData(fd => ({ ...fd, tecnologias: arr }));
                      }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-black"
                    />
                    <button type="button" onClick={() => {
                      setFormData(fd => ({ ...fd, tecnologias: fd.tecnologias.filter((_, idx) => idx !== i) }));
                    }} className="text-red-500">✕</button>
                  </div>
                ))}
                <button type="button" onClick={() => setFormData(fd => ({ ...fd, tecnologias: [...fd.tecnologias, ""] }))} className="text-xs text-blue-600 mt-1">+ Agregar tecnología</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Flujos Automatizados
                </label>
                {formData.flujosAutomatizados.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-1">
                    <input
                      type="text"
                      value={f}
                      onChange={e => {
                        const arr = [...formData.flujosAutomatizados];
                        arr[i] = e.target.value;
                        setFormData(fd => ({ ...fd, flujosAutomatizados: arr }));
                      }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-black"
                    />
                    <button type="button" onClick={() => {
                      setFormData(fd => ({ ...fd, flujosAutomatizados: fd.flujosAutomatizados.filter((_, idx) => idx !== i) }));
                    }} className="text-red-500">✕</button>
                  </div>
                ))}
                <button type="button" onClick={() => setFormData(fd => ({ ...fd, flujosAutomatizados: [...fd.flujosAutomatizados, ""] }))} className="text-xs text-blue-600 mt-1">+ Agregar flujo</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requisitos
                </label>
                {formData.requisitos.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-1">
                    <input
                      type="text"
                      value={f}
                      onChange={e => {
                        const arr = [...formData.requisitos];
                        arr[i] = e.target.value;
                        setFormData(fd => ({ ...fd, requisitos: arr }));
                      }}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-black"
                    />
                    <button type="button" onClick={() => {
                      setFormData(fd => ({ ...fd, requisitos: fd.requisitos.filter((_, idx) => idx !== i) }));
                    }} className="text-red-500">✕</button>
                  </div>
                ))}
                <button type="button" onClick={() => setFormData(fd => ({ ...fd, requisitos: [...fd.requisitos, ""] }))} className="text-xs text-blue-600 mt-1">+ Agregar requisito</button>
              </div>
  
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-sky-500 hover:bg-sky-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-md cursor-pointer"
                >
                  {loading ? "Guardando..." : editingBot ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 