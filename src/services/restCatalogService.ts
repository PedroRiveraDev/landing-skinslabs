import { env } from '@/config/env';
import type { Bot } from '@/interface/Bot.interface';

const REST_CATALOGO_URL = env.CATALOGO_URL;

export async function obtenerCatalogoBots(): Promise<Bot[]> {
  try {
    const response = await fetch(REST_CATALOGO_URL);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error al obtener el catálogo de bots:", error);
    throw error;
  }
} 