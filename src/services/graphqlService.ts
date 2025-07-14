import { env } from '@/config/env';
import type { Bot, BotServicioInput } from '@/interface/Bot.interface';

// Función para obtener la URL correcta del GraphQL
function getGraphQLUrl() {
  // En el contexto del servidor (SSR), usar la URL directa del backend
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://69.62.89.201:8181/graphql';
  }
  // En el cliente (browser), usar el proxy para evitar CORS
  return '/api/graphql';
}

// Función helper para hacer peticiones GraphQL
async function graphqlRequest(query: string, variables?: any, retries: number = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const graphqlUrl = getGraphQLUrl();
      console.log(`🔄 Intento ${attempt}/${retries} - Conectando a: ${graphqlUrl}`);
      
      const response = await fetch(graphqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
        // Agregar timeout y manejo de errores mejorado
        signal: AbortSignal.timeout(15000), // 15 segundos timeout
      });

      console.log(`📡 Respuesta HTTP: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Error HTTP ${response.status}:`, errorText);
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}. Detalle: ${errorText}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        console.error("❌ Errores GraphQL:", result.errors);
        throw new Error(result.errors[0].message);
      }

      console.log("✅ Consulta GraphQL exitosa");
      return result.data;
      
    } catch (error) {
      lastError = error;
      console.error(`❌ Error en intento ${attempt}/${retries}:`, error);
      
      if (attempt < retries) {
        const delay = Math.min(1000 * attempt, 5000); // Backoff exponencial hasta 5s
        console.log(`⏱️ Esperando ${delay}ms antes del siguiente intento...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.error("❌ Todos los intentos fallaron:", lastError);
  throw lastError;
}

export async function crearBot(input: BotServicioInput): Promise<Bot> {
  const query = `
    mutation($input: BotServicioInput!) {
      crearBot(input: $input) {
        id
        titulo
        descripcion
        imagenUrl
      }
    }
  `;

  const data = await graphqlRequest(query, { input });
  return data.crearBot;
}

export async function obtenerBots(): Promise<Bot[]> {
  const query = `
    query {
      obtenerBots {
        id
        titulo
        descripcion
        imagenUrl
        funciones { id descripcion }
        integraciones { id nombre }
        casosUso { id descripcion }
        tecnologias { id nombre }
        flujosAutomatizados { id descripcion }
        requisitos { id descripcion }
      }
    }
  `;

  const data = await graphqlRequest(query);
  return data.obtenerBots;
}

export async function actualizarBot(id: string | number, input: BotServicioInput): Promise<Bot> {
  const query = `
    mutation($id: ID!, $input: BotServicioInput!) {
      actualizarBot(id: $id, input: $input) {
        id
        titulo
        descripcion
        imagenUrl
        funciones { id descripcion }
        integraciones { id nombre }
        casosUso { id descripcion }
        tecnologias { id nombre }
        flujosAutomatizados { id descripcion }
        requisitos { id descripcion }
      }
    }
  `;

  const data = await graphqlRequest(query, { id: String(id), input });
  return data.actualizarBot;
}

export async function eliminarBot(id: string | number): Promise<boolean> {
  const query = `
    mutation($id: ID!) {
      eliminarBot(id: $id)
    }
  `;

  const data = await graphqlRequest(query, { id: String(id) });
  return data.eliminarBot;
}

export async function obtenerBotPorId(id: string | number): Promise<Bot> {
  const query = `
    query($id: ID!) {
      obtenerBotPorId(id: $id) {
        id
        titulo
        descripcion
        imagenUrl
        funciones { id descripcion }
        integraciones { id nombre }
        casosUso { id descripcion }
        tecnologias { id nombre }
        flujosAutomatizados { id descripcion }
        requisitos { id descripcion }
      }
    }
  `;

  const data = await graphqlRequest(query, { id: String(id) });
  return data.obtenerBotPorId;
}
