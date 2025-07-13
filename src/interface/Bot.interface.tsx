export interface Funcion {
  id: string;
  descripcion: string;
}
export interface Integracion {
  id: string;
  nombre: string;
}
export interface CasoUso {
  id: string;
  descripcion: string;
}
export interface Tecnologia {
  id: string;
  nombre: string;
}
export interface FlujoAutomatizado {
  id: string;
  descripcion: string;
}
export interface Requisito {
  id: string;
  descripcion: string;
}

export interface Bot {
  id: string;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  funciones?: Funcion[];
  integraciones?: Integracion[];
  casosUso?: CasoUso[];
  tecnologias?: Tecnologia[];
  flujosAutomatizados?: FlujoAutomatizado[];
  requisitos?: Requisito[];
}

export interface BotServicioInput {
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
  funciones?: { descripcion: string }[];
  integraciones?: { nombre: string }[];
  casosUso?: { descripcion: string }[];
  tecnologias?: { nombre: string }[];
  flujosAutomatizados?: { descripcion: string }[];
  requisitos?: { descripcion: string }[];
}