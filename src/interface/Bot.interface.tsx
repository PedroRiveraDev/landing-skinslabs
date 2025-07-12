export interface Bot {
  id: string;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  funciones?: string[];
  integraciones?: string[];
  casosUso?: string[];
  tecnologias?: string[];
  flujosAutomatizados?: string[];
  requisitos?: string[];
}

export interface BotServicioInput {
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
  funciones?: string[];
  integraciones?: string[];
  casosUso?: string[];
  tecnologias?: string[];
  flujosAutomatizados?: string[];
  requisitos?: string[];
}