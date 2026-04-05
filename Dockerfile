FROM oven/bun:1.3.10-alpine AS bun

FROM node:18-alpine AS base
RUN apk add --no-cache curl
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
RUN ln -s /usr/local/bin/bun /usr/local/bin/bunx

# --- Build shared (production deps only) ---
FROM base AS shared
WORKDIR /app/shared
COPY shared/package.json ./
RUN bun install --production
COPY shared/ ./

# --- Build frontend ---
FROM base AS frontend
WORKDIR /app/shared
COPY --from=shared /app/shared ./
WORKDIR /app/frontend
COPY frontend/package.json ./
RUN bun install
COPY frontend/ ./
RUN NODE_OPTIONS=--openssl-legacy-provider bun run build

# --- Build backend (production deps only) ---
FROM base AS backend
WORKDIR /app/shared
COPY --from=shared /app/shared ./
WORKDIR /app/backend
COPY backend/package.json ./
RUN npm install --legacy-peer-deps --omit=dev
# Fix: extract-files@9 uses deprecated trailing-slash exports pattern that Node 18 rejects.
# Remove the exports field so Node falls back to traditional file resolution.
RUN node -e "const f='node_modules/extract-files/package.json';const p=JSON.parse(require('fs').readFileSync(f));delete p.exports;require('fs').writeFileSync(f,JSON.stringify(p,null,2))"
COPY backend/ ./

# --- Production image (no Bun needed at runtime) ---
FROM node:18-alpine AS production
RUN apk add --no-cache curl
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
