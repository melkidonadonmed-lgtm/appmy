# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Unificação Árvore TA2 + Filtros Estratigráficos (11 Sistemas / 2.562 Peças), Subcamadas Miofasciais Independentes, Fáscia Translúcida Perolada e Estrias Musculares Procedurais em GPU

---

## 1. Decisões Arquiteturais Consolidadas

- **Unificação Total entre Árvore TA2 e Filtros de Camadas (`useAnatomyStore.ts`, `buildTaxonomicTree.ts`, `AnatomyTreePanel.tsx`, `TreeGroup.tsx`, `zAnatomyCatalog.ts`)**:
  - Expansão do `Z_ANATOMY_CATALOG` de `1.584` (6 sistemas) para **`2.562` estruturas cobrindo 100% dos 11 sistemas anatômicos** (`integumentary`: 16, `muscular`: 683, `skeletal`: 335, `cardiovascular`: 676, `nervous`: 582, `lymphatic`: 163, `digestive`: 44, `respiratory`: 35, `reproductive`: 14, `renal`: 8, `endocrine`: 6).
  - Eliminação da dessincronia onde desmarcar todos os nós da árvore deixava a musculatura (`muscular_male.glb`), a pele (`integumentary_female.glb`) e o sistema linfático presos na cena 3D.
  - Os grupos da Árvore TA2 **são** o próprio filtro de camadas/sistemas ordenados de fora para dentro (`1. Tegumento Comum` → `2. Sistema Muscular` → `3. Sistema Esquelético` → `4. Cardiovascular` → `5. Linfático` → `6. Nervoso` → `7–11. Vísceras`). Desmarcar um grupo na árvore não o remove da lista: atualiza `hiddenNodeIds` e sincroniza `activeSystems` e `activeDepth` automaticamente.
  - Barra Estratigráfica integrada no topo da aba `Árvore TA2` com peeling cirúrgico de 1 clique (`1. Pele` a `6. Vísceras`), atalhos miofasciais (`Fáscias`, `Estriado Sup.`, `Estriado Prof.`, `Bolsas/Bainhas`) e filtro topográfico por região (`filterTreeByRegion`).
- **Fáscia Translúcida Perolada & Estrias Musculares em GPU (`visibilityManager.ts`, `RealBodyAtlas.tsx`, `buildTaxonomicTree.ts`)**:
  - Subdivisão do `Sistema Muscular (Miologia)` na árvore em 4 subcamadas funcionais independentes: `Fáscias, Aponeuroses & Retináculos` (88), `Músculos Superficiais (Estriados)` (152), `Músculos Profundos (Estriados)` (319) e `Bolsas Sinoviais & Bainhas Tendíneas` (124).
  - Fáscias e aponeuroses (`Fascia lata`, `Deltoid fascia`, `Brachial fascia`, `Crural fascia`, `Pectoral fascia`, `Investing abdominal fascia`, etc.) agora renderizam como membranas colágenas branco-peroladas translúcidas (`#e2e8f0`, `opacityFactor: 0.42`, `depthWrite: false`), permitindo enxergar a fáscia e os ventres musculares subjacentes simultaneamente.
  - Shader procedural `onBeforeCompile` em GPU (`applyAnatomicalTissueShader`, zero alocação de textura em VRAM) que calcula o eixo principal da bounding box de cada músculo e renderiza estrias miofibrilares longitudinais (`estrias musculares`), septos de perimísio, brilho anisotrópico de tendão (`#ede6d6`) e variação cromática por fascículo (`getMuscleFascicleColor`).
- **Callout 3D Compacto com Ancoragem Exata `(0,0)` e Exploded View Estratificada (`AnatomicalCallout3D.tsx`, `explodedEngine.ts`)**:
  - Ponto luminoso cravado em `(0,0)` da projeção 3D e card deslocado `132px` para fora da silhueta corporal (`.side-left`/`.side-right`).
  - Filtragem dos 705 decalques ósseos `.ol/.or/.el/.er` em `muscular_male.glb` via `isDuplicateCrossSystemMesh`.
- **Quality Gates Convalidados**:
  - 213 testes unitários aprovados em 30 suítes Vitest (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`).
  - `npm run build` aprovado gerando bundles de produção do Vite e Express (`ExitCode 0`).

---

## 2. Servidores Configurados

- **Produção (Google Cloud Run)**: `https://appmy-1044179901556.us-central1.run.app/` (`https://appmy-syqnqsm4iq-uc.a.run.app/`)
- **Frontend Local (Vite)**: `http://localhost:3000/`
- **Backend Local (Express)**: `http://localhost:8080/`

