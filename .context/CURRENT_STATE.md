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
- **Base Parametrizada Neuroanatômica, Aba Dedicada Neuro 3D, Bisturi 3D (Click-to-Peel) e Gerenciador Offline de Partes `.GLB`**:
  - `src/shared/utils/neuroTargetMapper.ts` e `src/client/components/ui/tree/NeuroAnatomyPanelSection.tsx`: Aba dedicada **Neuro** na sidebar (grid de 4 colunas `.outliner-tabs-nav`) e mapeamento bidirecional entre os IDs clínicos/didáticos (`fma:*` / `cn_*`) e as malhas reais do Z-Anatomy (`za:*` em `nervous_male.glb` e `skeletal_male.glb`), com translucidez automática do crânio (`0.28`) ao focar estruturas intracranianas e sincronização completa com `NeurologyScene.tsx` (`hiddenNodeIds`, `peelOnClickMode` e `<AnatomicalCallout3D>`).
  - `useAnatomyStore.ts`, `RealBodyAtlas.tsx`, `NeurologyScene.tsx` e `AnatomyFiltersSection.tsx`: Modo **Bisturi 3D (Click-to-Peel)** (`peelOnClickMode` ou `Alt + Clique`), histórico de peças retiradas (`peeledHistory`, `undoLastPeel`, `clearPeeledHistory`), reordenação personalizada de camadas (`layerOrder`, `moveLayerOrder`, `peelNextLayerInOrder`, `restorePreviousLayerInOrder`), filtragem por sexo biológico (`getSystemCheckIdsForSex`) e resumo fisiológico/clínico por camada.
  - `src/client/lib/modelCacheManager.ts` e `src/client/components/ui/tree/OfflinePartsManagerSection.tsx`: Download e cache offline (`CacheStorage`) dos 11 pacotes `.GLB` e dos decodificadores Draco (`/draco/*` e `/draco/gltf/*`), além de **Modo Alta Performance (Partes na GPU)** (`selectivePartLoading` e `loadedParts` persistidos em `localStorage`).
- **Sanitização Numérica/3D (`code-quality-audit-3d-physics`), Topologia 3+1 de UI/UX e Higienização Estrutural (`auditoria-projetos-sistema`)**:
  - **AST & Física 3D (`0` issues nos arquivos `.ts`/`.tsx` de `src/` e $S_{\text{norm}} = 100.0/100$ em `build_z_anatomy_catalog.py`)**: Zero alocações em loop (`ALLOC_IN_LOOP = 0`), normalização protegida (`UNCHECKED_NORMALIZE = 0`), comparações de ponto flutuante com $\epsilon = 10^{-4}$ (`STRICT_FLOAT_COMPARE = 0`), zero `any` em `src/` e `tests/`.
- **Reestruturação da Árvore Taxonômica (Zero Nós Órfãos em `systemic`), Reatividade O(1) e Cache de Malhas/Shaders 3D (2026-10-23)**:
  - `src/shared/utils/buildTaxonomicTree.ts` e `src/shared/utils/filterTaxonomicTree.ts`: Reclassificação integral dos **2.562 itens** do catálogo em suas regiões anatômicas exatas (`0` itens no fallback genérico `systemic`), separação estrita de falanges do pé (`lower_limb`) vs. mão (`upper_limb`), correção de cabeças musculares/costais (`head of gastrocnemius`, `head of biceps femoris`, `head of rib`), tradução das subpastas do inglês para PT-BR (`resolveSubregionLabelPt`), achatamento de subgrupos redundantes, higienização de rótulos corrompidos (`????????`, `?x.l`) e busca multi-token não contígua.
  - `src/client/components/ui/tree/TreeItem.tsx`, `TreeGroup.tsx`, `AnatomyTreePanel.tsx`, `AnatomyFiltersSection.tsx` e `src/client/index.css`: `React.memo` com seletores granulares do Zustand, remoção do auto-scroll no hover e da troca forçada para a aba `Ficha` a cada clique, preservação de montagem da aba `Árvore` (`display: flex/none`), barra rápida `.outliner-quick-selected-bar`, integração dos módulos órfãos (`ModuleLayersSection`, `OfflinePartsManagerSection`, `moveLayerOrder`) na aba `Filtros` e `content-visibility: auto; contain-intrinsic-size: auto 30px;` nas folhas da árvore.
  - `src/client/components/canvas/RealBodyAtlas.tsx`, `SceneCanvas.tsx`, `src/core/visibilityManager.ts` e `src/core/explodedEngine.ts`: Cache em nível de módulo (`PREPARED_SYSTEM_CACHE`) de cenas clonadas e shaders PBR/miofasciais para ativação instantânea de sistemas, desacoplamento do destaque de hover para O(1), proteção contra hover/click acidental durante arraste orbital da câmera (`e.nativeEvent.buttons > 0` e `e.delta > 5`), roda vertical do mouse configurada para zoom direto (`twoFingerMode: 'zoom'`), pré-alocação de `THREE.Color` em `visibilityManager.ts` e cache de centro geométrico local (`__cachedLocalCenter`) em `explodedEngine.ts`. Removido arquivo órfão `src/client/lib/firebase.ts`.
- **Ergonomia de Arraste de Sliders (Exploded View & Dissecação) e Blindagem Anti-Layout-Shift (2026-10-24)**:
  - `src/client/index.css`, `src/client/components/ui/tree/ModuleLayersSection.tsx`, `src/client/components/ui/tree/AnatomyFiltersSection.tsx`, `src/client/components/ui/DissectionToolbar.tsx`, `src/client/components/ui/tree/AnatomyTreePanel.tsx` e `src/client/App.tsx`: Área de captura vertical de `24px` nos inputs `<input type="range">` (`.range-slider`, `.outliner-range-input`) com trilha visual de `6px` em `::-webkit-slider-runnable-track` / `::-moz-range-track` e thumb de `16px`, `touch-action: none`, `user-select: none`, `-webkit-user-drag: none` e isolamento `onPointerDown`/`onMouseDown`. Posicionamento de `<ModuleLayersSection />` no topo da aba `Camadas`, larguras fixas `tabular-nums`, altura constante de `1.8rem` na descrição de plano cirúrgico e `React.memo` em `AnatomyTreePanel`/`AnatomyFiltersSection`, garantindo `0.0px` de deslocamento de layout na sidebar e na toolbar durante o arraste.
- **Auditoria Integrada de Física 3D, Agentes de Cálculo e Eficiência dos 2.562 Nós (2026-10-25)**:
  - `src/shared/utils/buildTaxonomicTree.ts`, `src/shared/constants/zAnatomyCatalog.ts`, `src/client/components/telemetry/TelemetryOverlay.tsx`, `src/client/components/canvas/CardiovascularScene.tsx`, `src/client/components/canvas/AnatomicalAtlasScene.tsx`, `src/client/components/canvas/MuscleMeshItem.tsx` e `tests/audit-fixes-and-sex-sync.test.ts`:
    - Otimização de `sortItemsOutsideToInside` com `Intl.Collator('pt-BR')` estático e `WeakMap<ZAnatomyItem, number>` para cache O(1) do score estratigráfico dos 2.562 nós.
    - Sanitização na fonte (`Z_ANATOMY_CATALOG`) dos 3 nós vasculares corrompidos (`????????` -> `za:ramus_vascularis_accessorius`, `?x.l`, `?x.r`), zerando rótulos com `?` tanto na árvore TA2 quanto no Canvas 3D.
    - Unificação do coletor de telemetria FPS/VRAM dentro do `useFrame` do `@react-three/fiber` (removido `requestAnimationFrame` duplicado) e descarte explícito `geometry.dispose()` em `VesselTube`, `BoneMeshItem` e `MuscleMeshItem`.
    - Escore Normalizado Global **$S_{\text{norm}} = 100.00 / 100$** em `src/`, `scripts/` e `tests/` (`0` alertas em `state_checker_observer.py`).
- **Arquitetura de Ativação de Nós $O(1)$, Eliminação de Latência 3D/Árvore, Modos de Visualização e Dock de Navegação do Boneco 3D (2026-10-29)**:
  - `src/client/components/canvas/RealBodyAtlas.tsx` e `src/client/components/ui/tree/TreeItem.tsx`:
    - Substituição das buscas lineares $O(N)$ (`animNodes.find(...)`) por mapa indexado $O(1)$ `animNodeByKey: Map<string, MeshAnimData>` em `PreparedSystemEntry`.
    - Pré-cálculo de `__boundingRadius` na preparação única do sistema e substituição de `new THREE.Box3().setFromObject(mesh)` (que percorria vértices na thread principal a cada clique) por `mesh.localToWorld(localCenter.clone())` em $O(1)$.
    - Filtro de `effectiveHovered` por `systemName` (`HOVERED_MESH_META_BY_KEY.get(h)?.systemName === systemName`) + remoção do estado local redundante `hoveredNode` + throttle de `16ms` no `onPointerOver` e curto-circuito `clonedScene.visible = false` para sistemas ocultos, reduzindo re-renderizações de hover de 10 sistemas para 1.
    - Seletor `isHidden` puramente $O(1)$ em `TreeItem.tsx` e `onDoubleClick` tanto nas folhas da árvore quanto nas malhas 3D para `focusCameraOnNode(id, true)` (Zoom-to-Fit proporcional ao raio da peça).
  - `src/core/navigationGestures.ts`, `src/client/stores/useAnatomyStore.ts`, `src/client/components/canvas/SceneCanvas.tsx`, `src/client/components/canvas/OrientationGizmo.tsx` e `src/client/components/ui/DissectionToolbar.tsx`:
    - Alternância explícita **`Girar` (`rotate`) vs. `Mover` (`pan`, arrastar o corpo 3D com 1 dedo ou botão esquerdo)** sincronizada com `OrbitControls`, `Shift + Scroll` para elevação craniocaudal no modo `'zoom'`, e vistas anatômicas canônicas em 1 clique (`Frente`, `Dorso`, `Dir.`, `Esq.`, `Topo`, `Enquadrar 3D`) via `computeAnatomicalCameraView`.
    - Controles diretos de visualização **`Fantasma` (`ghostMode`, tecla `G`)** e **`Isolar` / `Sair Solo` (`isolatedOnly`, tecla `I`)** na `DissectionToolbar`, com sliders de `Exploded View` e `Camadas (1–6)` disponíveis tanto no modo `Sólido` quanto no modo `Raio-X`.
- **Quality Gates Convalidados**:
  - **260 testes unitários aprovados em 33 suítes Vitest** (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`, incluindo `src/core` no `tsconfig.json`).
  - `npm run build` aprovado gerando bundles de produção do Vite e Express sem chunks vazios (`ExitCode 0`).

---

## 2. Servidores Configurados

- **Produção (Google Cloud Run)**: `https://appmy-1044179901556.us-central1.run.app/` (`https://appmy-syqnqsm4iq-uc.a.run.app/`)
- **Frontend Local (Vite)**: `http://localhost:3000/`
- **Backend Local (Express)**: `http://localhost:8080/`
