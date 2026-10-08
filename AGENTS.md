# AGENTS.md — Atlas 3D de Anatomia Médica (`app-anatomy` / pacote `appmy`)

## Visão geral do projeto

Atlas 3D educacional do corpo humano: 335 ossos reais desarticulados mais sistemas viscerais e musculares em `.glb`, Exploded View em GPU, Dissecção Tomográfica Multiplanar (MPR) e navegação taxonômica pela Terminologia Anatomica (TA2) com códigos FMA. Interface bilíngue PT-BR + latim.

- Pacote npm: **`appmy`** (é o nome usado em `package.json`, no healthcheck e nos scripts de deploy). Repositório: `melkidonadonmed-lgtm/appmy`.
- Uso **educacional**: nunca apresente o atlas como ferramenta de diagnóstico clínico.
- Docs de referência: `README.md` (visão e fluxos de interação), `designer.md` (design system canônico), `.context/CURRENT_STATE.md` e `.context/SESSION_LOG.md` (estado e histórico).

## Stack tecnológica

- React 19 + TypeScript ~5.8 + Vite 6 (`@vitejs/plugin-react`).
- Three.js r186 via `@react-three/fiber` 9 e `@react-three/drei` 10, com decodificação Draco offline (`public/draco/`, malhas em `public/models/anatomy/`).
- **Zustand 5** (`src/client/stores/useAnatomyStore.ts`) como única fonte da verdade do estado — não introduza Redux nem Context paralelo.
- Backend Express 4 com `helmet` e `cors`; `firebase-admin` no servidor e `firebase` no cliente.
- Testes com **Vitest 3** (+ `supertest`). Gerenciador: npm com `package-lock.json` (instale com `npm ci`).

## Comandos

```bash
npm ci             # instalação reproduzível
npm run dev        # concurrently: API (tsx watch src/server/index.ts, :8080) + cliente Vite (:3000)
npm run build      # build:client (vite -> dist/client) + build:server (tsc -p tsconfig.server.json -> dist/server)
npm start          # node dist/server/index.js — serve dist/client na porta PORT || 8080
npm run typecheck  # tsc --noEmit + tsc -p tsconfig.server.json --noEmit
npm test           # vitest run — 29 arquivos em tests/ (anatomia, filtros, MPR, árvore, servidor)
```

Não existe script `lint` nem `design:lint` neste projeto: o type-check é `npm run typecheck`.

## Portas

- Cliente Vite: **3000** (fixada em `vite.config.ts`, `host: '0.0.0.0'`), com proxy `/api` para `http://localhost:8080`.
- API Express: **8080** (`PORT || 8080` em `src/server/index.ts`).
- Atenção: `Projetos/AGENTS.md` reserva `:3000` para o FrontCraft Studio e **não lista o app-anatomy** na tabela de portas fixas. Não altere portas sem alinhar com a governança da pasta.

## Estrutura do código

```text
src/client/     # App.tsx, components/ (canvas/, ui/tree/, telemetry/), hooks/, stores/, index.css
src/server/     # app.ts (helmet/cors/estático), index.ts (listen), routes/health.ts, routes/api.ts
src/shared/     # constants/zAnatomyCatalog.ts (1.584 itens, lookups O(1)), types/, utils/
tests/          # suítes Vitest
scripts/        # build_z_anatomy_catalog.py (gerador do catálogo tipado)
```

Healthcheck oficial: `GET /api/health` (e `/healthz`), retornando `status`, `uptime`, `environment` e `firebaseAdminReady`.

## Convenções de código

- Idioma: UI, rótulos, dados e documentação em **pt-BR**; a nomenclatura anatômica aparece junto do latim TA2/FMA.
- **Zero emojis na interface**; ícones exclusivamente `lucide-react` com `stroke-width="1.5"` (ver `designer.md`).
- Design tokens em `src/client/index.css` (`--bg-primary: #0a0f1d`, `--bg-secondary: #111827`); sem sombras difusas pesadas (`shadow-lg` e acima são proibidas).
- Consultar e atualizar `.context/CURRENT_STATE.md` e `.context/SESSION_LOG.md` em vez de reexplorar o repositório.
- **Trio de qualidade antes de commit:** `npm run typecheck`, `npm test` e `npm run build`, todos com exit code 0.
- Malhas e catálogos derivam de dados de terceiros (Z-Anatomy / BodyParts3D, CC BY-SA 4.0): preserve `LICENSE`, `NOTICE` e a atribuição nos README.

## Deploy

`Dockerfile` multi-stage mais `deploy-cloudrun.ps1` e `deploy-cloudrun.sh`. Projeto GCP `agent-md-506215`, região `us-central1`, serviço `appmy`. **Não existe `cloudbuild.yaml`** neste repositório, apesar da menção em `Projetos/AGENTS.md` §4.2 — confirme antes de assumir esse pipeline.

## Segurança e privacidade

- `.env`, `service_account*.json`, `credentials.json` e `*.pem` estão no `.gitignore` — nunca os comite.
- Credenciais do Firebase Admin vivem apenas no servidor; não as importe em `src/client/`.
- As sondas de saúde não devem passar a expor caminhos absolutos, tokens ou versões internas além do campo `firebaseAdminReady` já existente.
