import { env } from '@/config/env';
import type { Bot, BotServicioInput } from '@/interface/Bot.interface';

const GRAPHQL_URL = env.GRAPHQL_URL;

// Función helper para hacer peticiones GraphQL
async function graphqlRequest(query: string, variables?: any) {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      console.error("Errores GraphQL:", result.errors);
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    console.error("Error en petición GraphQL:", error);
    throw error;
  }
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
