import { env } from '@/config/env';

const REST_API_URL = env.REST_API_URL;

export async function subirImagenBot(botId: string | number, archivo: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", archivo);

    const response = await fetch(`${REST_API_URL}/bots/${botId}/imagen`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const url = await response.text();
    return url;
  } catch (error) {
    console.error("Error al subir imagen:", error);
    throw error;
  }
}

export async function eliminarImagenBot(botId: string | number): Promise<boolean> {
  try {
    const response = await fetch(`${REST_API_URL}/bots/${botId}/imagen`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    throw error;
  }
} 