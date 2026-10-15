# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Exploded View Estritamente Linear (0%–100%), Navegação 3D de 2 Dedos (Subir/Descer & Girar) e Menus Táteis (Física de Luz Zenital & 5 Temas em `localStorage`)

---

## 1. Decisões Arquiteturais Consolidadas

- **Exploded View Estritamente Linear e Proporcional (`explodedEngine.ts`, `RealBodyAtlas.tsx`, `SceneCanvas.tsx`, `useAnatomyStore.ts`)**:
  - Correção em `bindExplodedNode` para malhas reais do catálogo (`__isCatalogItem: true`): em vez de normalizar `eixoExplosao` para comprimento unitário (o que achatava a distância radial e a profundidade cirúrgica das 2.562 peças), agora combina o vetor de catálogo com o vetor radial anatômico ponderado por `layerFactor` (Camada 1 `1.32` até Camada 6 `0.78`).
  - `applyExplodedStep` interpola de forma uniforme em todo o intervalo `[0, 1]` sem salto abrupto ao retornar a `0%`, lendo `explosionProgress` em tempo real no loop `useFrame` (`lerpFactor = 0.32`) e fixando `<Center cacheKey={viewType}>` para evitar recentralização da bounding box durante a explosão.
  - Adicionados controles lineares `stepExplosionProgressLinear` (`-10%`, `+10%`, `0%`, `25%`, `50%`, `75%`, `100%`) e preenchimento visual `--slider-pct` em `DissectionToolbar.tsx` e `ModuleLayersSection.tsx`.
- **Navegação 3D com 2 Dedos (`navigationGestures.ts`, `SceneCanvas.tsx`, `OrientationGizmo.tsx`)**:
  - Suporte nativo em Touchscreen e Trackpad/Touchpad para segurar/deslizar com 2 dedos para cima e para baixo (elevação vertical craniocaudal no eixo Y), deslizar na horizontal ou girar os 2 dedos (rotação orbital azimutal 360°) e pinça para zoom (`dollyScale`), além de botões táteis de elevação/rotação e seletor de modo (`2 Dedos: Subir & Girar` vs `2 Dedos: Zoom`) no HUD.
- **Alinhamento Tátil de Menus com a Memória (`App.tsx`, `AnatomyTreePanel.tsx`, `index.css`)**:
  - Aplicação de física de luz zenital (`--surface-active`, chanfro superior `inset 0 1px 0`), poços rebaixados (`--shadow-well`), remoção de gradiente arco-íris e cores neon, revelação progressiva na barra estratigráfica (`MoreHorizontal`) e 5 Temas Táteis persistidos em `localStorage` (`phantom-obsidian`, `tactile-matte`, `quiet-luxury-titanium`, `steadfast-stainless`, `warm-editorial-paper`).
- **Quality Gates Convalidados**:
  - 215 testes unitários aprovados em 30 suítes Vitest (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`).
  - `npm run build` aprovado gerando bundles de produção do Vite e Express (`ExitCode 0`).

---

## 2. Servidores Configurados

- **Produção (Google Cloud Run)**: `https://appmy-1044179901556.us-central1.run.app/` (`https://appmy-syqnqsm4iq-uc.a.run.app/`)
- **Frontend Local (Vite)**: `http://localhost:3000/`
- **Backend Local (Express)**: `http://localhost:8080/`

