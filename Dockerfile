FROM oven/bun:1.3.10-alpine AS bun

FROM node:18-alpine AS base
RUN apk add --no-cache curl
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
RUN ln -s /usr/local/bin/bun /usr/local/bin/bunx

# --- Build shared ---
FROM base AS shared
WORKDIR /app/shared
COPY shared/package.json ./
RUN bun install
COPY shared/ ./

# --- Build frontend ---
FROM base AS frontend
WORKDIR /app/shared
COPY --from=shared /app/shared ./
WORKDIR /app/frontend
COPY frontend/package.json ./
RUN bun install
COPY frontend/ ./
RUN bun run build

# --- Build backend ---
FROM base AS backend
WORKDIR /app/shared
COPY --from=shared /app/shared ./
WORKDIR /app/backend
COPY backend/package.json ./
RUN bun install
COPY backend/ ./

# --- Production image ---
FROM base AS production
WORKDIR /app

# Copy shared
COPY --from=shared /app/shared ./shared

# Copy backend with dependencies
COPY --from=backend /app/backend ./backend

# Copy frontend build into backend/build (how the app serves static files)
COPY --from=frontend /app/frontend/build ./backend/build

# Copy root package files
COPY package.json ./

WORKDIR /app/backend

EXPOSE 2222

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:2222/api/health || exit 1

CMD ["node", "--max-old-space-size=2560", "index.js"]
