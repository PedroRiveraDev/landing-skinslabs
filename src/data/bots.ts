export const ejemplosBots = [
  {
    titulo: "Bot de Atención al Cliente 24/7",
    descripcion:
      "Responde automáticamente consultas frecuentes, redirige solicitudes complejas y opera 24/7.",
    imagenUrl: "/uploads/bot-atencion.jpg",
    funciones: [
      { descripcion: "Responder preguntas frecuentes usando GPT-4" },
      { descripcion: "Derivar solicitudes complejas a correo o formulario" },
      { descripcion: "Responder automáticamente por WhatsApp o Gmail" },
    ],
    integraciones: [
      { nombre: "WhatsApp Business API" },
      { nombre: "Gmail" },
      { nombre: "Google Forms" },
    ],
    casosUso: [
      { descripcion: "Clínicas estéticas con alto volumen de preguntas" },
      { descripcion: "Ecommerce con consultas constantes" },
    ],
    tecnologias: [
      { nombre: "GPT-4" },
      { nombre: "n8n" },
      { nombre: "OpenAI API" },
    ],
    flujosAutomatizados: [
      {
        descripcion: "Filtrar intención del usuario (FAQ vs. solicitud compleja)",
      },
      { descripcion: "Responder automáticamente si es FAQ" },
      {
        descripcion:
          "Enviar correo o registrar formulario si excede capacidades del bot",
      },
    ],
    requisitos: [
      { descripcion: "Cuenta activa de WhatsApp Business API" },
      { descripcion: "Cuenta Gmail para alertas" },
    ],
  },
  {
    titulo: "Bot de Recordatorios Medicos",
    descripcion:
      "Automatiza el envio de recordatorios y confirmaciones de citas para centros de salud.",
    imagenUrl: "/uploads/bot-medico.jpg",
    funciones: [
      { descripcion: "Enviar recordatorios automaticos via WhatsApp" },
      { descripcion: "Confirmar o reagendar citas desde el mismo chat" },
    ],
    integraciones: [
      { nombre: "Google Calendar" },
      { nombre: "Twilio WhatsApp" },
    ],
    casosUso: [
      { descripcion: "Centros medicos" },
      { descripcion: "Clinicas dentales" },
    ],
    tecnologias: [
      { nombre: "n8n" },
      { nombre: "Calendly API" },
      { nombre: "GPT-4" },
    ],
    flujosAutomatizados: [
      { descripcion: "Consulta diaria de citas agendadas" },
      { descripcion: "Envia recordatorio con boton para confirmar" },
      { descripcion: "Notifica si el usuario responde que no asistira" },
    ],
    requisitos: [
      { descripcion: "Acceso al calendario de reservas" },
      { descripcion: "Numero habilitado en WhatsApp" },
    ],
  },
  {
    titulo: "Bot de Reportes Automatizados",
    descripcion:
      "Genera y envia informes en PDF a partir de datos procesados periodicamente.",
    imagenUrl: "/uploads/bot-reportes.jpg",
    funciones: [
      { descripcion: "Recolecta metricas clave desde planillas o API" },
      { descripcion: "Genera PDF con branding del cliente" },
      { descripcion: "Envia informes automaticos por email" },
    ],
    integraciones: [
      { nombre: "Google Sheets" },
      { nombre: "SendGrid" },
      { nombre: "DataStudio" },
    ],
    casosUso: [
      { descripcion: "Consultoras de marketing" },
      { descripcion: "Contadores externos" },
      { descripcion: "Agencias digitales" },
    ],
    tecnologias: [
      { nombre: "n8n" },
      { nombre: "Puppeteer" },
      { nombre: "NodePDF" },
      { nombre: "GPT-4" },
    ],
    flujosAutomatizados: [
      { descripcion: "Extraer datos de fuente" },
      { descripcion: "Generar PDF con formato definido" },
      { descripcion: "Enviar email semanal con resumen" },
    ],
    requisitos: [
      { descripcion: "Acceso a fuentes de datos (ej: Google Sheets)" },
      { descripcion: "Cuenta para envio SMTP o SendGrid" },
    ],
  },
];
