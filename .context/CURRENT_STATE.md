# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Higienização da Raiz, Atualização do `README.md` e `designer.md`, Correção do Callout 3D 1:1, Deduplicação Cross-GLB e Estabilização da Exploded View Homolateral

---

## 1. Decisões Arquiteturais Consolidadas

- **Callout 3D Compacto em Escala 1:1 (`AnatomicalCallout3D.tsx`, `index.css`)**:
  - Remoção de `distanceFactor` nos componentes `<Html>` (`AnatomicalCallout3D.tsx`, `MuscleMeshItem.tsx`, `SensoryScene.tsx`, `IntegumentaryScene.tsx`), eliminando o agigantamento dos quadros ao dar zoom ou inspecionar regiões com escala ampliada (`3.1x`).
  - Adição das 57 classes CSS ausentes em `src/client/index.css` (`.callout-*` com `max-width: 220px`, `.outliner-tabs-nav`, `.global-search-*`, `.dissection-quick-grid`, `.range-slider` e utilitários cromáticos).
  - Ancoragem espacial precisa do Callout calculada a partir do centro geométrico real (`getMeshAnatomicalCenter` aplicando `scale`, `quaternion`, `initialPosition` e `modelOffset` + `evaluateExplodedPosition` determinístico).
- **Eliminação de Modelos Sobrepostos (`RealBodyAtlas.tsx`, `AnatomicalAtlasScene.tsx`)**:
  - Deduplicação automática via `isDuplicateCrossSystemMesh`: filtragem das 278 malhas musculares exportadas duplicadamente dentro de `nervous_male.glb` e das 31 malhas esqueléticas/esfincterianas duplicadas dentro de `digestive_male.glb` (mesmo sem item catalogado), eliminando *Z-fighting* e interceptação dupla de cliques.
  - Alinhamento topográfico de `integumentary_female.glb` com `modelOffset={[0, 0.84, 0.03]}` para posicionamento anatômico na parede torácica anterior.
  - Filtro regional `isNodeInRegion` estendido a todos os sistemas ativos combinando metadados taxonômicos, palavras-chave e coordenadas 3D da caixa delimitadora.
  - Na Vista Didática (`viewType === 'exploded'`), as cenas procedurais viscerais só são renderizadas quando seu respectivo sistema é selecionado individualmente.
- **Exploded View Homolateral e Preservação de Função (`explodedEngine.ts`, `RealBodyAtlas.tsx`, `visibilityManager.ts`)**:
  - Precedência determinística dos sufixos `.l` (`+X`) e `.r` (`-X`) sobre o centroide geométrico (impedindo inversão em nervos/vasos que cruzam o plano mediano como `Vagus nerve (X).r`) e alinhamento homolateral (`Math.sign(effectiveCenter.x) * Math.abs(rawX)`).
  - Descompactação axial vertical (eixo `Y`) das vértebras quando `activeRegion === 'spine'`, mantendo o sacro como âncora basal.
  - Preservação estrita de `mesh.userData.initialPosition` e restauração da posição original em `applyExplodedStep` mesmo para malhas temporariamente ocultas (`!mesh.visible`), além de eliminação da dupla multiplicação de `magnitude` no loop `useFrame`.
  - Correção de seleção, highlight, callout e isolamento para malhas não catalogadas (`fallbackId = za:...`), isolamento de grupos na árvore (`TreeGroup`) e blindagem de raycast para malhas com opacidade `0%` ("Oculto (0%)").
- **Navegabilidade, Sincronização de Estado, Limpeza da Raiz e Documentação (`useAnatomyStore.ts`, `AnatomyTreePanel.tsx`, `README.md`, `designer.md`)**:
  - Sincronização bidirecional entre `solidOpacity` e `systemOpacities.skeletal`, entre `xRayMode`/`mprEnabled` e `dissection.visualMode`, e entre todos os aliases do catálogo (`item.id`, `item.node`, `sanitizeNodeName(item.node)`) em `toggleVisibility` e `isolateNode`.
  - Correção dos botões `Expandir`/`Recolher` recursivos e contagens canônicas na árvore TA2 (`335/335` no esqueleto, `1584` no total).
  - Remoção de artefatos órfãos/irrelevantes na raiz (`live_screenshot*.png`, `generate_workspace_index.py`, `workspace_index.json`, `skills-lock.json` e `DESIGN.md` duplicado) e atualização integral de `README.md` e `designer.md`.
- **Quality Gates Convalidados**:
  - 197 testes unitários aprovados em 29 suítes Vitest (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`).
  - `npm run build` aprovado gerando bundles de produção do Vite e Express (`ExitCode 0`).

---

## 2. Servidores Configurados

- **Produção (Google Cloud Run)**: `https://appmy-1044179901556.us-central1.run.app/`
- **Frontend Local (Vite)**: `http://localhost:3000/`
- **Backend Local (Express)**: `http://localhost:8080/`
