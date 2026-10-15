# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Sincronização de Sexo Biológico (Masculino vs. Feminino sem Cruzamento), Exploded View Linear e Proporcional, Gesture Intent Locking 3D, Navegação por Pastas (De Fora para Dentro: 1ª EXT → 11ª INT) e Estúdio Neuroclínico Integrado

---

## 1. Decisões Arquiteturais Consolidadas

- **Sincronização de Sexo Biológico (Masculino vs. Feminino — Zero Cruzamento)**:
  - `src/shared/constants/femaleReproductiveCatalog.ts`: Catálogo completo das **36 estruturas do Aparelho Reprodutor Feminino** (`reproductive_female.glb`: Corpo, Fundo, Istmo e Colo do Útero, Ovários Esquerdo/Direito, Tubas Uterinas [Infundíbulo, Ampola, Istmo, Fímbrias], Vagina, Fórnices e Ligamentos Pélvicos) em Português e Latim TA2, integrado a `zAnatomyCatalog.ts`.
  - `RealBodyAtlas.tsx` e `useAnatomyStore.ts`: Estado reativo `biologicalSex: 'male' | 'female'`. No modo **Masculino**, renderiza `reproductive_male.glb` (14 estruturas) e mantém `integumentary_female.glb` desativado; no modo **Feminino**, renderiza simultaneamente `integumentary_female.glb` (Glândula Mamária) e `reproductive_female.glb` (Útero, Ovários, Tubas e Vagina) alinhados na cavidade pélvica (`modelOffset={[0, 0.84, 0.03]}`).
- **Matemática Contínua e Avanço Linear na Exploded View (`src/core/explodedEngine.ts` & `RealBodyAtlas.tsx`)**:
  - Remoção da distorção por `.normalize()` em vetores sub-unitários (preservando a proporcionalidade radial entre estruturas profundas e superficiais) e substituição dos degraus descontínuos (`if/else`) por curvas suaves $C^1$-contínuas (`Math.tanh`).
  - Avanço puramente linear $P(t) = P_0 + \vec{V}_{\text{offset}} \cdot t$ (`lerpFactor = 1.0`) e trava de inatividade (`lastAppliedProgressRef`) no `useFrame` de `RealBodyAtlas.tsx`, eliminando travamentos em repouso sobre as 2.600+ malhas.
- **Gesture Intent Locking e Sincronização de `OrbitControls` (`src/core/navigationGestures.ts` & `SceneCanvas.tsx`)**:
  - Bloqueio determinístico de intenção em gestos de 2 dedos (`'unlocked' | 'pinch' | 'pan' | 'rotate'`), impedindo que pinça (zoom) dispare rotação e elevação simultaneamente.
  - Normalização de `WheelEvent.deltaMode` (`0` = pixels, `1` = linhas, `2` = páginas) e sincronização de `controlsRef.current.update()` após cada mutação de câmera.
- **Navegação por Pastas e Filtros Estritamente de Fora para Dentro (`1ª EXT → 11ª INT`)**:
  - `toggleSystemPeel` em `useAnatomyStore.ts` e modo padrão **Descascar Camada** em `AnatomyFiltersSection.tsx`: desmarcar uma camada externa oculta apenas ela e mantém todos os órgãos internos visíveis.
  - `TreeGroup.tsx` e `buildTaxonomicTree.ts`: Pastas iniciam recolhidas por padrão com ícones `Folder`/`FolderOpen`, selos estratigráficos (`1ª EXT` a `11ª INT`, e `2.1 EXT` a `2.4 INT` nas subcamadas miofasciais), ordenação de fora para dentro nas subpastas e folhas, e ocultação automática de malhas residuais não catalogadas nos `.glb`.
- **Desacoplamento Modular e Higienização de Temas (`surgicalLayers.ts`, `tissueShader.ts`, `visibilityManager.ts`, `index.css`)**:
  - Separação de `visibilityManager.ts` em 3 módulos especializados; correção da classificação de ligamentos articulares profundos para a **Camada 4 (Esquelética)** e correção do modo *Isolar* quando `hiddenIds.size > 0`.
  - Preenchimento completo de variáveis de superfície e sombra nos 5 temas táteis em `index.css` e remoção de sobrescritas destrutivas no final do arquivo.
- **Base Parametrizada Neuroanatômica e Estúdio Neuroclínico (`src/shared/constants/*`, `src/client/components/ui/clinical/*.tsx`)**:
  - 14 Forames da Base do Crânio, Áreas de Brodmann, 12 Pares de Nervos Cranianos (`NC I–XII`), Calculadora Interativa ASPECTS (10 pontos) e Simulador de Casos Clínicos Topográficos integrados ao viewport 3D.
- **Sanitização Numérica/3D (`code-quality-audit-3d-physics`), Topologia 3+1 de UI/UX e Higienização Estrutural (`auditoria-projetos-sistema`)**:
  - **AST & Física 3D (`0` issues nos 79 arquivos `.ts`/`.tsx` de `src/` e $S_{\text{norm}} = 100.0/100$ em `build_z_anatomy_catalog.py`)**: Zero alocações em loop (`ALLOC_IN_LOOP = 0`), normalização protegida (`UNCHECKED_NORMALIZE = 0`), comparações de ponto flutuante com $\epsilon = 10^{-4}$ (`STRICT_FLOAT_COMPARE = 0`), zero `any` em `src/` e `tests/` e extração de todas as constantes físicas/geométricas (`HEARTBEAT_RAD_PER_SEC`, `SENTINEL_PULSE_FREQ`, `GIZMO_CAMERA_DIST`, `CRANIUM_FOCUS_OFFSET_Y`, `MIN_CLIP_OFFSET`, `MAX_CLIP_OFFSET`, `RADIAL_TANH_GAIN`, `ANTEROPOSTERIOR_TANH_GAIN`, `GLSL_PRIMARY_BUNDLE_FREQ`, `GLSL_SECONDARY_BUNDLE_FREQ`, `GLSL_SECONDARY_ALONG_FREQ`, `GLSL_MICRO_STRIATION_FREQ`, `GLSL_MICRO_ALONG_FREQ`, `GLB_HEADER_BYTES`, `EXPLOSION_VECTOR_PROFILES`).
  - **Refatoração Tátil (`Topologia 3+1` sob `FrontCraftMaster`)**: Conformidade HTML5 (`index.html` sem `/>` em elementos void e com `Plus Jakarta Sans` + `Space Grotesk`), `--font-display`, classes `.btn-tactile` e `.card-tactile`, física `:active`, `touch-action: manipulation`, `@media (prefers-reduced-motion: reduce)`, substituição de 133 hexadecimais Slate estáticos por tokens dinâmicos dos 5 temas (`phantom-obsidian`, `tactile-matte`, `quiet-luxury-titanium`, `steadfast-stainless`, `warm-editorial-paper`), eliminação de `transition: all` e `rotate(0deg)`, `.neuro-equation-chip` / `@keyframes bookmark-fade-in` em kebab-case e `role="status"` + `aria-live="polite"` + `aria-busy={loadingHealth}` no card de sonda Cloud Run.
  - **Higienização da Raiz, Chunking e Remoção de Código/CSS Morto**: Removidos `designer.md` duplicado, `dataconnect/`, `docs/` obsoleto, `scripts/__pycache__/`, ~330 linhas de CSS órfão em `src/client/index.css` e 7 exports não utilizados; scripts de deploy movidos para `scripts/deploy-cloudrun.ps1` e `scripts/deploy-cloudrun.sh`; code-splitting determinístico via `manualChunks(id)` em `vite.config.ts` eliminando o chunk vazio `react-vendor` e isolando `anatomy-catalog`.
- **Quality Gates Convalidados**:
  - **234 testes unitários aprovados em 32 suítes Vitest** (`ExitCode 0`, `100.0/100` Nível 4 no `test-quality-auditor`).
  - `npm run typecheck` com zero erros (`ExitCode 0`, incluindo `src/core` no `tsconfig.json`).
  - `npm run build` aprovado gerando bundles de produção do Vite e Express sem chunks vazios (`ExitCode 0`).

---

## 2. Servidores Configurados

- **Produção (Google Cloud Run)**: `https://appmy-1044179901556.us-central1.run.app/` (`https://appmy-syqnqsm4iq-uc.a.run.app/`)
- **Frontend Local (Vite)**: `http://localhost:3000/`
- **Backend Local (Express)**: `http://localhost:8080/`
