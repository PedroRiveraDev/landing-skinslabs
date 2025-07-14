# Integración con Backend - SkinsLabs

Esta documentación explica cómo configurar y usar la integración con tu backend GraphQL y REST.

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# URL del endpoint GraphQL
NEXT_PUBLIC_GRAPHQL_URL=http://69.62.89.201:8181/graphql

# URL del endpoint REST API
NEXT_PUBLIC_REST_API_URL=http://69.62.89.201:8181/api

# URL del catálogo REST
NEXT_PUBLIC_CATALOGO_URL=http://69.62.89.201:8181/catalogo
```

**Nota:** Si tu backend está en un VPS, reemplaza `localhost` con la IP o URL de tu servidor.

### 2. Asegúrate de que el Backend esté Corriendo

Tu backend debe estar ejecutándose y accesible desde el frontend. Verifica que:

- El servidor GraphQL esté corriendo en el puerto 8181
- El servidor REST esté disponible para subir imágenes
- CORS esté configurado correctamente en tu backend

## Funcionalidades Implementadas

### 1. Operaciones CRUD Completas

La sección "Mis Bots" ahora incluye:

- **Crear Bot**: Formulario completo con subida de imágenes
- **Leer Bots**: Lista todos los bots con información detallada
- **Actualizar Bot**: Editar título, descripción e imagen
- **Eliminar Bot**: Eliminar bots con confirmación

### 2. Subida de Imágenes

- Soporte para subir imágenes desde el formulario
- Preview de imagen antes de subir
- Integración con el endpoint REST `/api/bots/{id}/imagen`

### 3. Indicador de Estado del Backend

- Muestra el estado de conexión con el backend
- Indica si el backend está online/offline
- Muestra errores de conexión específicos

## Servicios Disponibles

### GraphQL Service (`src/services/graphqlService.ts`)

```typescript
// Obtener todos los bots
const bots = await obtenerBots();

// Crear un nuevo bot
const nuevoBot = await crearBot({
  titulo: "Mi Bot",
  descripcion: "Descripción del bot",
  imagenUrl: "https://ejemplo.com/imagen.jpg"
});

// Actualizar un bot
const botActualizado = await actualizarBot(botId, {
  titulo: "Bot Actualizado",
  descripcion: "Nueva descripción"
});

// Eliminar un bot
await eliminarBot(botId);

// Obtener bot por ID
const bot = await obtenerBotPorId(botId);
```

### Image Upload Service (`src/services/imageUploadService.ts`)

```typescript
// Subir imagen para un bot
const imageUrl = await subirImagenBot(botId, archivo);

// Eliminar imagen de un bot
await eliminarImagenBot(botId);
```

## Estructura de Datos

### Bot Interface

```typescript
interface Bot {
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
  createdAt?: string;
  updatedAt?: string;
}
```

## Endpoints del Backend

### GraphQL Endpoints

- `POST /graphql` - Todas las operaciones GraphQL
- Queries disponibles:
  - `obtenerBots` - Lista todos los bots
  - `obtenerBotPorId` - Obtiene un bot específico
- Mutations disponibles:
  - `crearBot` - Crea un nuevo bot
  - `actualizarBot` - Actualiza un bot existente
  - `eliminarBot` - Elimina un bot

### REST Endpoints

- `POST /api/bots/{id}/imagen` - Subir imagen para un bot
- `DELETE /api/bots/{id}/imagen` - Eliminar imagen de un bot
- `GET /catalogo` - Obtener catálogo de bots (legacy)

## Manejo de Errores

El sistema incluye manejo robusto de errores:

- Validación de formularios
- Mensajes de error específicos
- Indicadores de carga
- Confirmaciones para operaciones destructivas
- Reintentos automáticos en caso de fallos de red

## Troubleshooting

### Problemas Comunes

1. **Backend no conectado**
   - Verifica que el backend esté corriendo
   - Revisa las URLs en las variables de entorno
   - Asegúrate de que CORS esté configurado

2. **Error al subir imágenes**
   - Verifica que el endpoint REST esté disponible
   - Revisa que el formato de imagen sea válido
   - Confirma que el tamaño del archivo sea aceptable

3. **Errores GraphQL**
   - Revisa la consola del navegador para errores específicos
   - Verifica que las queries/mutations sean correctas
   - Confirma que el schema GraphQL esté actualizado

### Logs y Debugging

- Los errores se muestran en la consola del navegador
- El componente `BackendStatus` muestra el estado de conexión
- Los errores de formulario se muestran en la interfaz

## Próximas Mejoras

- [ ] Autenticación y autorización
- [ ] Paginación para listas grandes
- [ ] Búsqueda y filtros
- [ ] Exportación de datos
- [ ] Notificaciones en tiempo real
- [ ] Cache de datos
- [ ] Modo offline 