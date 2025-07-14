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
import type { Bot, BotServicioInput, Funcion, Integracion, CasoUso, Tecnologia, FlujoAutomatizado, Requisito } from "@/interface/Bot.interface";
import { 
  Edit3, 
  Trash2, 
  Settings, 
  Zap, 
  Link, 
  Target, 
  Code, 
  Workflow, 
  FileText,
  Plus,
  Bot as BotIcon,
  X
} from "lucide-react";

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

// Componente para la tarjeta de bot individual
const BotCard = ({ 
  bot, 
  onEdit, 
  onDelete, 
  loading 
}: { 
  bot: Bot; 
  onEdit: (bot: Bot) => void; 
  onDelete: (bot: Bot) => void; 
  loading: boolean;
}) => {
  const getStats = () => {
    const stats = [
      { icon: Settings, label: "Funciones", count: bot.funciones?.length || 0, color: "text-blue-600" },
      { icon: Link, label: "Integraciones", count: bot.integraciones?.length || 0, color: "text-green-600" },
      { icon: Target, label: "Casos de uso", count: bot.casosUso?.length || 0, color: "text-purple-600" },
      { icon: Code, label: "Tecnologías", count: bot.tecnologias?.length || 0, color: "text-orange-600" },
      { icon: Workflow, label: "Flujos", count: bot.flujosAutomatizados?.length || 0, color: "text-indigo-600" },
      { icon: FileText, label: "Requisitos", count: bot.requisitos?.length || 0, color: "text-gray-600" },
    ];
    return stats.filter(stat => stat.count > 0);
  };

  const stats = getStats();

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Layout horizontal en desktop, vertical en mobile */}
      <div className="flex flex-col lg:flex-row">
        {/* Imagen */}
        <div className="lg:w-48 w-full h-48 lg:h-48 relative overflow-hidden">
          <img
            src={getBotImageUrl(bot.imagenUrl)}
            alt={bot.titulo}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              console.error('Error cargando imagen del bot:', bot.titulo, e);
              e.currentTarget.src = '/placeholder.svg';
            }}
            onLoad={() => {
              console.log('Imagen cargada exitosamente:', bot.titulo);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Contenido */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            {/* Header con título y descripción */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                    <BotIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {bot.titulo}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed line-clamp-2">
                {bot.descripcion}
              </p>
            </div>

            {/* Estadísticas */}
            {stats.length > 0 && (
              <div className="mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                        <span className="text-sm font-semibold text-gray-900">{stat.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Acciones */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Activo</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(bot)}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 disabled:bg-gray-100 text-amber-700 hover:text-amber-800 disabled:text-gray-400 rounded-lg font-medium transition-all duration-200 group/btn"
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Editar</span>
              </button>
              
              <button
                onClick={() => onDelete(bot)}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 disabled:bg-gray-100 text-red-700 hover:text-red-800 disabled:text-gray-400 rounded-lg font-medium transition-all duration-200 group/btn"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para subir y previsualizar imagen
interface ImageUploaderProps {
  imagePreview: string | null;
  imagenUrl: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}
function ImageUploader({ imagePreview, imagenUrl, onImageChange, fileInputRef }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setError(`Tipo de archivo no permitido. Tipos permitidos: ${allowedTypes.join(', ')}`);
      return;
    }

    if (file.size > maxSize) {
      setError(`El archivo es demasiado grande. Tamaño máximo: ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    setError(null);
    // Crear un evento sintético para mantener la compatibilidad
    const syntheticEvent = {
      target: { files: [file] }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onImageChange(syntheticEvent);
  };

  return (
    <section className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
        <BotIcon className="w-5 h-5 text-blue-500" /> Imagen
      </h3>
      
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div 
        className={`w-full aspect-video bg-gray-100 border-2 border-dashed rounded-2xl flex items-center justify-center relative overflow-hidden mb-3 transition-all duration-200 ${
          dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {(imagePreview || imagenUrl) ? (
          <img
            src={imagePreview ? imagePreview : getBotImageUrl(imagenUrl || "")}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Error cargando imagen:', e);
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        ) : (
          <div className="text-center">
            <BotIcon className="w-16 h-16 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Arrastra una imagen aquí o haz clic para seleccionar</p>
            <p className="text-gray-400 text-xs mt-1">JPG, PNG, WebP, GIF hasta 5MB</p>
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setError(null);
            onImageChange(e);
          }}
          ref={fileInputRef}
          className="absolute inset-0 opacity-0 cursor-pointer"
          aria-label="Seleccionar imagen"
        />
        
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-1 rounded-full text-xs font-medium text-blue-700 shadow border border-blue-100 pointer-events-none select-none">
          Cambiar imagen
        </div>
      </div>
    </section>
  );
}

// Componente auxiliar para listas de strings tipo chips
interface StringListInputProps {
  label: string;
  value: string[];
  onChange: (arr: string[]) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}
function StringListInput({ label, value, onChange, placeholder = "", icon }: StringListInputProps) {
  const [input, setInput] = useState<string>("");
  return (
    <section className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">{icon}{label}</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((item: string, i: number) => (
          <span key={i} className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm font-medium shadow-sm">
            {item}
            <button type="button" className="ml-2 text-blue-400 hover:text-red-500" onClick={() => onChange(value.filter((_, idx) => idx !== i))}><X className="w-4 h-4" /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && input.trim()) {
              onChange([...value, input.trim()]);
              setInput("");
              e.preventDefault();
            }
          }}
          placeholder={placeholder}
          className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none text-sm"
        />
        <button type="button" onClick={() => { if (input.trim()) { onChange([...value, input.trim()]); setInput(""); } }} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 py-2 flex items-center justify-center"><Plus className="w-4 h-4" /></button>
      </div>
    </section>
  );
}

export default function ClientMisBots() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    titulo: string;
    descripcion: string;
    imagenUrl: string;
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

  const objetoArrayToStringArray = (arr: any[], key: string) => Array.isArray(arr) ? arr.map(obj => obj?.[key] || "") : [];
  const stringArrayToObjetoArray = (arr: string[], key: string) => Array.isArray(arr) ? arr.filter(Boolean).map(str => ({ [key]: str })) : [];

  // Utilidad para mapear los arrays dinámicos manteniendo el id si existe
  function mapStringListToObjectArray(list: string[], originalList: any[], key: 'descripcion' | 'nombre') {
    return list.map((str) => {
      const found = originalList?.find((obj: any) => obj?.[key] === str);
      if (found && found.id) {
        if (key === 'descripcion') {
          return { id: found.id, descripcion: str };
        } else {
          return { id: found.id, nombre: str };
        }
      }
      if (key === 'descripcion') {
        return { descripcion: str };
      } else {
        return { nombre: str };
      }
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      let imagenUrl = formData.imagenUrl;
      
      // Si estamos editando, usamos los arrays originales del bot para mantener los ids
      const original = editingBot as Bot | undefined;
      const payload: BotServicioInput = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        imagenUrl: formData.imagenUrl,
        funciones: formData.funciones.map(descripcion => ({ descripcion })),
        integraciones: formData.integraciones.map(nombre => ({ nombre })),
        casosUso: formData.casosUso.map(descripcion => ({ descripcion })),
        tecnologias: formData.tecnologias.map(nombre => ({ nombre })),
        flujosAutomatizados: formData.flujosAutomatizados.map(descripcion => ({ descripcion })),
        requisitos: formData.requisitos.map(descripcion => ({ descripcion })),
      };
      
      if (selectedImage) {
        try {
          const botId = editingBot ? editingBot.id : undefined;
          if (botId) {
            console.log(`Subiendo imagen para bot existente: ${botId}`);
            imagenUrl = await subirImagenBot(botId, selectedImage);
            await actualizarBot(botId, { ...payload, imagenUrl });
          } else {
            console.log('Creando nuevo bot con imagen');
            const nuevoBot = await crearBot({ ...payload, imagenUrl: "" });
            await subirImagenBot(nuevoBot.id, selectedImage);
            await new Promise((res) => setTimeout(res, 400));
            await fetchBots();
            limpiarFormulario();
            setShowModal(false);
            setSuccess("Bot guardado correctamente.");
            return;
          }
        } catch (imageError) {
          console.error('Error al subir imagen:', imageError);
          setError(`Error al subir la imagen: ${imageError instanceof Error ? imageError.message : 'Error desconocido'}`);
          return;
        }
      } else {
        if (editingBot) {
          await actualizarBot(editingBot.id, { ...payload, imagenUrl });
        } else {
          await crearBot({ ...payload, imagenUrl });
        }
      }
      
      await new Promise((res) => setTimeout(res, 400));
      await fetchBots();
      limpiarFormulario();
      setShowModal(false);
      setSuccess("Bot guardado correctamente.");
    } catch (error) {
      console.error('Error al guardar bot:', error);
      setError(`Error al guardar el bot: ${error instanceof Error ? error.message : 'Error desconocido'}`);
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
      funciones: objetoArrayToStringArray(bot.funciones ?? [], "descripcion"),
      integraciones: objetoArrayToStringArray(bot.integraciones ?? [], "nombre"),
      casosUso: objetoArrayToStringArray(bot.casosUso ?? [], "descripcion"),
      tecnologias: objetoArrayToStringArray(bot.tecnologias ?? [], "nombre"),
      flujosAutomatizados: objetoArrayToStringArray(bot.flujosAutomatizados ?? [], "descripcion"),
      requisitos: objetoArrayToStringArray(bot.requisitos ?? [], "descripcion"),
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
          {/* Header con título y botón de crear */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                <BotIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Mis Bots</h1>
                <p className="text-gray-300 text-sm">Gestiona y configura tus bots personalizados</p>
                <BackendStatus className="mt-2" />
              </div>
            </div>
            
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Crear Nuevo Bot</span>
            </button>
          </div>

          {/* Mensajes de estado */}
          {success && (
            <div className="w-full bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {success}
              </div>
            </div>
          )}

          {error && (
            <div className="w-full bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                {error}
              </div>
            </div>
          )}

          {/* Estado de carga */}
          {loading && !bots.length && (
            <div className="w-full flex flex-col items-center justify-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
              <p className="text-white text-lg">Cargando tus bots...</p>
            </div>
          )}

          {/* Estado vacío */}
          {!loading && bots.length === 0 && !error && (
            <div className="w-full flex flex-col items-center justify-center py-16 text-center">
              <div className="p-6 bg-white/10 rounded-3xl mb-6">
                <BotIcon className="w-16 h-16 text-white/60" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No tienes bots aún</h3>
              <p className="text-gray-300 text-lg mb-8 max-w-md">
                Crea tu primer bot personalizado para comenzar a automatizar tus tareas
              </p>
              <button
                onClick={handleCreateNew}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span>Crear mi primer bot</span>
              </button>
            </div>
          )}

          {/* Lista de bots */}
          {!loading && bots.length > 0 && (
            <div className="w-full space-y-6">
              {bots.map((bot) => (
                <BotCard
                  key={bot.id}
                  bot={bot}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  loading={loading}
                />
              ))}
            </div>
          )}
        </section>
      </article>

      {/* Modal de formulario - rediseñado */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
          <div className="relative w-full max-w-4xl mx-auto bg-white/95 border border-white/30 shadow-2xl rounded-3xl overflow-y-auto max-h-[90vh] animate-fadeInUp">
            {/* Header sticky */}
            <div className="sticky top-0 z-10 bg-white/95 flex items-center justify-between px-8 pt-8 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3"><BotIcon className="w-6 h-6 text-blue-600" /> {editingBot ? "Actualizar Bot" : "Crear Bot"}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Cerrar"
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-8">
              {/* Columna izquierda: Imagen */}
              <div>
                <ImageUploader
                  imagePreview={imagePreview}
                  imagenUrl={formData.imagenUrl}
                  onImageChange={handleImageChange}
                  fileInputRef={fileInputRef}
                />
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Datos básicos</h3>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Título *</label>
                  <input
                    type="text"
                    placeholder="Título del bot"
                    value={formData.titulo}
                    onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-base mb-4"
                    required
                  />
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Descripción *</label>
                  <textarea
                    placeholder="Descripción del bot"
                    value={formData.descripcion}
                    onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-base h-24 resize-none"
                    required
                  />
                </section>
              </div>
              {/* Columna derecha: Inputs dinámicos en secciones */}
              <div className="flex flex-col gap-0">
                <StringListInput
                  label="Funciones"
                  value={formData.funciones}
                  onChange={arr => setFormData(fd => ({ ...fd, funciones: arr }))}
                  placeholder="Agregar función"
                  icon={<Edit3 className="w-5 h-5 text-blue-400" />}
                />
                <StringListInput
                  label="Integraciones"
                  value={formData.integraciones}
                  onChange={arr => setFormData(fd => ({ ...fd, integraciones: arr }))}
                  placeholder="Agregar integración"
                  icon={<Plus className="w-5 h-5 text-green-400" />}
                />
                <StringListInput
                  label="Casos de Uso"
                  value={formData.casosUso}
                  onChange={arr => setFormData(fd => ({ ...fd, casosUso: arr }))}
                  placeholder="Agregar caso de uso"
                  icon={<Plus className="w-5 h-5 text-purple-400" />}
                />
                <StringListInput
                  label="Tecnologías"
                  value={formData.tecnologias}
                  onChange={arr => setFormData(fd => ({ ...fd, tecnologias: arr }))}
                  placeholder="Agregar tecnología"
                  icon={<Plus className="w-5 h-5 text-orange-400" />}
                />
                <StringListInput
                  label="Flujos Automatizados"
                  value={formData.flujosAutomatizados}
                  onChange={arr => setFormData(fd => ({ ...fd, flujosAutomatizados: arr }))}
                  placeholder="Agregar flujo"
                  icon={<Plus className="w-5 h-5 text-indigo-400" />}
                />
                <StringListInput
                  label="Requisitos"
                  value={formData.requisitos}
                  onChange={arr => setFormData(fd => ({ ...fd, requisitos: arr }))}
                  placeholder="Agregar requisito"
                  icon={<Plus className="w-5 h-5 text-gray-400" />}
                />
                {/* Acciones */}
                <div className="flex justify-end gap-3 pt-8 mt-auto border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-7 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-md transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading && <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>}
                    {loading ? "Guardando..." : editingBot ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 