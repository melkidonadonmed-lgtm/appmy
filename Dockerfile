# ==============================================================================
# ESTÁGIO 1: Builder (Node.js 22 Alpine)
# Compila o frontend React (Vite) e o backend Node.js (TypeScript)
# ==============================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Instala dependências usando package-lock.json garantindo reprodutibilidade
COPY package*.json ./
RUN npm ci

# Copia todo o código-fonte da aplicação
COPY . .

# Compila o frontend para dist/client e o backend para dist/server
RUN npm run build

# ==============================================================================
# ESTÁGIO 2: Runtime de Produção Ultraleve para Google Cloud Run
# ==============================================================================
FROM node:22-alpine AS runner

WORKDIR /app

# Variáveis de ambiente mandatórias para Cloud Run
ENV NODE_ENV=production
ENV PORT=8080

# Instala apenas dependências de produção para minimizar tamanho e vulnerabilidades
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copia os artefatos compilados do estágio de build
COPY --from=builder /app/dist ./dist

# Utiliza usuário não-root nativo do Alpine por segurança defensiva
RUN chown -R node:node /app
USER node

# O Cloud Run injeta dinamicamente a variável de ambiente $PORT
EXPOSE 8080

# Inicialização do servidor Express unificado
CMD ["node", "dist/server/index.js"]
