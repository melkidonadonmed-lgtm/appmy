# AGENTS.md — 3D Medical Anatomy Atlas (`app-anatomy` / package `appmy` v2.1)

> **Global Kernel Inheritance:** Universal Golden Rules (1–8), `Managed Antigravity Agent` constraints, Technical English internals / **Portuguese (`pt-BR`)** user bridge, and the Self-Refine Closing Block inherit from `quality-efficiency-guidelines.md` (`always_on`).

## 0. Project Overview & Stack

Educational 3D human anatomy atlas: 335 disarticulated bones plus visceral and muscular `.glb` systems, GPU Exploded View, Multiplanar Tomographic Dissection (MPR), and Terminologia Anatomica (TA2 / FMA) taxonomic navigation (bilingual `pt-BR` + Latin UI).
- **Package & Scope:** npm package **`appmy`** (`melkidonadonmed-lgtm/appmy`). Strictly educational (never present as a clinical diagnostic device).
- **State Triad & Docs:** [`.context/context.md`](file:///C:/Users/melki/dev/repos/appmy/.context/context.md) | [`.context/spec.md`](file:///C:/Users/melki/dev/repos/appmy/.context/spec.md) | [`DESIGN.md`](file:///C:/Users/melki/dev/repos/appmy/DESIGN.md) | [`.context/CURRENT_STATE.md`](file:///C:/Users/melki/dev/repos/appmy/.context/CURRENT_STATE.md) | [`.context/SESSION_LOG.md`](file:///C:/Users/melki/dev/repos/appmy/.context/SESSION_LOG.md)
- **Active Stack:** React 19 + TypeScript ~5.8 + Vite 6 + Three.js r186 (`@react-three/fiber` 9, `@react-three/drei` 10, offline Draco decoding in `public/draco/`) + **Zustand 5** (`src/client/stores/useAnatomyStore.ts` as single state store) + Express 4 (`helmet`, `cors`, `firebase-admin`) + **Vitest 3** (`supertest`).

## 1. Commands (`Command-First`) & Ports

```bash
npm ci             # reproducible install from package-lock.json
npm run dev        # concurrently: API (tsx watch src/server/index.ts, :8080) + Vite client (:3000)
npm run typecheck  # tsc --noEmit + tsc -p tsconfig.server.json --noEmit
npm test           # vitest run — 32 suites in tests/ (234 tests)
npm run build      # build:client (dist/client) + build:server (dist/server)
npm start          # node dist/server/index.js (PORT || 8080)
```
- **Ports:** Vite client fixed at **`:3000`** (proxying `/api` to `http://localhost:8080`); Express API on **`:8080`** (`GET /api/health` and `/healthz`).

## 2. Code Structure & Domain Invariants

- **Modules:** `src/client/` (React UI, canvas, hooks, Zustand store), `src/core/` (`explodedEngine.ts`, `surgicalLayers.ts`, `tissueShader.ts`, `visibilityManager.ts`, `navigationGestures.ts`), `src/server/` (`app.ts`, `index.ts`, `routes/`), `src/shared/` (`zAnatomyCatalog.ts` with 1,584 items, neuroclinical catalogs), `tests/`, `scripts/`.
- **Zero-Allocation in 3D Loop (`useFrame`):** Never instantiate `new THREE.Vector3`, `Matrix4`, or `Quaternion` inside `useFrame` callbacks; reuse pre-allocated `useRef` or module-scoped instances.
- **Visual & Asset Hygiene:** Zero UI emojis (`lucide-react` `stroke-width="1.5"` only); 5 Mineral Tactile Themes in `src/client/index.css` (`phantom-obsidian`, `tactile-matte`, `quiet-luxury-titanium`, `steadfast-stainless`, `warm-editorial-paper`) with 3-layer shadows (`--shadow-key`, `--shadow-well`, `--shadow-card`) and `--specular-top` rim light (zero neon cobalt `#0066FF`/`#2563EB`/`#3B82F6`). Preserve CC BY-SA 4.0 attribution (`LICENSE`, `NOTICE`) for Z-Anatomy / BodyParts3D meshes.
- **Security & Cloud Run Deploy:** Keep `.env`, `service_account*.json`, and `*.pem` gitignored and server-only (`src/server/`); deploy to GCP `agent-md-506215` (`us-central1`, service `appmy`) via multi-stage `Dockerfile` and `scripts/deploy-cloudrun.{ps1,sh}`.
