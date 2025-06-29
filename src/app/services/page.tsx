import BackgroundDecorative from "@/components/ui/BackgroundDecorative";
import Header from "@/components/ui/Header";
import React from "react";

export default function ServicePage() {
  return (
    <>
      <BackgroundDecorative />
      <article className="relative z-10">
        <Header />
        <section className="relative z-10 flex flex-col items-center justify-center w-[90%] lg:w-full px-6 lg:px-12 pt-28 pb-20 text-center mx-auto max-w-7xl gap-y-12">
          <h1 className="text-3xl font-bold mb-12">Nuestros Servicios</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {/* Tarjeta 1 */}
            <div className="group relative p-6 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br from-[rgba(0,191,255,0.25)] to-transparent">
              <h2 className="text-2xl font-extrabold mb-4 text-slate-100">
                Envío automatizado de reportes
              </h2>
              <p>
                <ul>
                  <li>
                    Generar reportes semanales/mensuales de uso del sistema.
                  </li>
                  <li>
                    Informes con métricas clave: cantidad de chats, temas
                    tratados, nivel de satisfacción, etc. Enviarlos por correo
                    automáticamente a los responsables (usando nodos de Gmail o
                    SendGrid).
                  </li>
                </ul>
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="group relative p-6 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br from-[rgba(255,0,200,0.30)] to-transparent">
              <h2 className="text-2xl font-extrabold mb-4 text-slate-100">
                Resúmenes automáticos de conversaciones largas
              </h2>
              <p>
                Enviar al administrador un resumen de las conversaciones largas
                o complejas (usando GPT para sintetizar), ideal para auditoría o
                mejora continua.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="group relative p-6 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br from-[rgba(0,191,255,0.25)] to-transparent">
              <h2 className="text-2xl font-extrabold mb-4 text-slate-100">
                Integración con CRM o plataformas externas
              </h2>
              <p>
                Conectar n8n con servicios como HubSpot, Notion, Google Sheets,
                Trello, etc. Registrar leads automáticamente si el cliente se
                identifica como interesado.
              </p>
            </div>

            {/* Tarjeta 4 */}
            <div className="group relative p-6 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br from-[rgba(255,0,200,0.30)] to-transparent">
              <h2 className="text-2xl font-extrabold mb-4 text-slate-100">
                Atención al cliente automatizada 24/7
              </h2>
              <p>
                Integrar un chatbot que responde preguntas frecuentes usando
                GPT-4. Derivar solicitudes a correos internos o formularios
                cuando exceden las capacidades del bot. Responder
                automáticamente correos o mensajes entrantes (Gmail, WhatsApp
                API, etc.).
              </p>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
