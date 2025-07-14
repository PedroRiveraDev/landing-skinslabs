# 1. Etapa de dependencias
FROM node:18-alpine AS deps
WORKDIR /app

# Instalar dependencias basadas en el package-lock.json
COPY package.json package-lock.json ./
RUN npm ci

# 2. Etapa de build
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar dependencias de la etapa anterior
COPY --from=deps /app/node_modules ./node_modules
# Copiar archivos del proyecto
COPY . .

# Variables de entorno para build time (públicas, no secretas)
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY es una clave pública por diseño
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}

# Construir la aplicación
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 3. Etapa de producción
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Instalar curl para healthcheck
RUN apk add --no-cache curl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar los archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app/public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]