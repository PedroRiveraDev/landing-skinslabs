const GRAPHQL_URL = "http://localhost:8080/graphql";

export async function crearBot(input) {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation($input: BotServicioInput!) {
          crearBot(input: $input) {
            id
            titulo
            descripcion
            imagenUrl
          }
        }
      `,
      variables: { input },
    }),
  });

  const result = await response.json();
  return result.data.crearBot;
}

export async function obtenerBots() {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        {
          obtenerBots {
            id
            titulo
            descripcion
            imagenUrl
          }
        }
      `,
    }),
  });

  const result = await response.json();
  return result.data.obtenerBots;
}

export async function actualizarBot(id, input) {
  const res = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation($id: ID!, $input: BotServicioInput!) {
          actualizarBot(id: $id, input: $input) {
            id
            titulo
            descripcion
            imagenUrl
          }
        }
      `,
      variables: { id, input },
    }),
  });

  const json = await res.json();
  return json.data.actualizarBot;
}

export async function eliminarBot(id) {
  const res = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation($id: ID!) {
          eliminarBot(id: $id)
        }
      `,
      variables: { id: String(id) }, // asegúrate de pasarlo como string si usas ID
    }),
  });

  const json = await res.json();
  return json.data.eliminarBot;
}


// src/services/graphqlService.ts

export async function crearBotCompleto(input) {
  const GRAPHQL_URL = "http://localhost:8080/graphql";
  const query = `
    mutation($input: BotServicioInput!) {
      crearBot(input: $input) {
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

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { input }
    }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error("Error al crear bot completo:", result.errors);
    throw new Error(result.errors[0].message);
  }

  return result.data.crearBot;
}
