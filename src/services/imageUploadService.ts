import { env } from '@/config/env';

// Función para obtener la URL correcta de la API REST
function getRestApiUrl() {
  // En el contexto del servidor (SSR), usar la URL directa del backend
  if (typeof window === 'undefined') {
    return env.REST_API_URL;
  }
  // En el cliente (browser), usar el proxy para evitar CORS
  return '/api';
}

// Validación de archivos de imagen
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

function validateImageFile(file: File): { isValid: boolean; error?: string } {
  if (!file) {
    return { isValid: false, error: 'No se seleccionó ningún archivo' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { 
      isValid: false, 
      error: `Tipo de archivo no permitido. Tipos permitidos: ${ALLOWED_TYPES.join(', ')}` 
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { 
      isValid: false, 
      error: `El archivo es demasiado grande. Tamaño máximo: ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
    };
  }

  return { isValid: true };
}

export async function subirImagenBot(botId: string | number, archivo: File): Promise<string> {
  try {
    // Validar el archivo antes de subir
    const validation = validateImageFile(archivo);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const formData = new FormData();
    formData.append("file", archivo);

    console.log(`Subiendo imagen para bot ${botId}...`);
    
    const restApiUrl = getRestApiUrl();
    const endpoint = `${restApiUrl}/bots/${botId}/imagen`;
    console.log(`URL del endpoint: ${endpoint}`);

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: {
        // No incluir Content-Type, dejar que el navegador lo establezca automáticamente para FormData
      },
    });

    console.log(`Respuesta del servidor: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error del servidor: ${errorText}`);
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}. ${errorText}`);
    }

    const url = await response.text();
    console.log(`Imagen subida exitosamente. URL: ${url}`);
    return url;
  } catch (error) {
    console.error("Error al subir imagen:", error);
    if (error instanceof Error) {
      throw new Error(`Error al subir imagen: ${error.message}`);
    }
    throw new Error('Error desconocido al subir imagen');
  }
}

export async function eliminarImagenBot(botId: string | number): Promise<boolean> {
  try {
    console.log(`Eliminando imagen del bot ${botId}...`);
    
    const restApiUrl = getRestApiUrl();
    const endpoint = `${restApiUrl}/bots/${botId}/imagen`;
    
    const response = await fetch(endpoint, {
      method: "DELETE",
    });

    console.log(`Respuesta del servidor: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error del servidor: ${errorText}`);
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}. ${errorText}`);
    }

    console.log(`Imagen eliminada exitosamente`);
    return true;
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    if (error instanceof Error) {
      throw new Error(`Error al eliminar imagen: ${error.message}`);
    }
    throw new Error('Error desconocido al eliminar imagen');
  }
} 