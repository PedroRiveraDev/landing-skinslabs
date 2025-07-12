interface BotServicio {
  titulo: string;
  descripcion: string;
}


interface BotRelacion {
  descripcion?: string;
  nombre?: string;
}

interface BotServicioInput {
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  funciones?: BotRelacion[];
  integraciones?: BotRelacion[];
  casosUso?: BotRelacion[];
  tecnologias?: BotRelacion[];
  flujosAutomatizados?: BotRelacion[];
  requisitos?: BotRelacion[];
}