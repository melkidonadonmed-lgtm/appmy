# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Refinamento da Exploded View Estratificada, Ancoragem Exata `(0,0)` e Deslocamento Bilateral do Callout 3D, Filtragem de Decalques `.ol/.el` e Seleção com Preservação de Cor + Translucidez Contextual

---

## 1. Decisões Arquiteturais Consolidadas

- **Callout 3D Compacto com Ancoragem Exata `(0,0)` e Deslocamento Bilateral (`AnatomicalCallout3D.tsx`, `RealBodyAtlas.tsx`, `index.css`)**:
  - Remoção de `center` e `distanceFactor` no `<Html>` de `AnatomicalCallout3D.tsx`, eliminando o deslocamento de `-50%` (`-141px`) que colocava o card sobre o modelo e empurrava o ponto azul para o vazio à esquerda.
  - Ponto luminoso (`.callout-anchor-dot`, `10px x 10px`) posicionado em `left: -5px; top: -5px;` sobre a origem `(0,0)` exata da projeção 3D (ou no ponto exato do clique `e.point` na superfície da malha, acompanhando a Exploded View).
  - Detecção dinâmica do lado da tela (`side-left` vs `side-right`) em relação à linha média corporal em NDC, deslocando o card `132px` para fora da silhueta do modelo em qualquer ângulo de câmera.
  - Formatação limpa (`formatAnatomicalMeshName`) para malhas com nomes sanitizados pelo Three.js `GLTFLoader` (ex.: `Deltoid_fascial` -> `Deltoid Fáscia (Esquerdo)`, `Temporoparietalis_musclel` -> `Temporoparietalis Músculo (Esquerdo)`, `VH_F_fat_L` -> `Tecido Adiposo Mamário (Esquerdo)`).
- **Seleção sem Estouramento Branco e com Translucidez Contextual (`visibilityManager.ts`, `RealBodyAtlas.tsx`, `SceneCanvas.tsx`)**:
  - Substituição do brilho estourado (`emissiveIntensity: 0.85` / hover `#bae6fd` com `0.55`) pela preservação da cor anatômica natural da peça selecionada mesclada em `24%` com `#38bdf8` (`emissiveIntensity: 0.16`, `roughness: 0.34`), mantendo sulcos, fibras e relevo 3D visíveis.
  - Aplicação automática de leve translucidez/fosqueamento (`opacity: 0.72`, `roughness: 0.68`, suavização cromática de `18%` em `#64748b`) nas estruturas vizinhas não selecionadas quando há seleção ativa.
  - Equilíbrio da iluminação de estúdio (`ambientLight: 0.48`, `directionalLight: 0.88`, `environmentIntensity: 0.35`) e marfim ósseo (`#e8dfd1`) para evitar saturação branca na tíbia e ossos faciais.
- **Exploded View Estratificada e Sem Fragmentos (`explodedEngine.ts`, `RealBodyAtlas.tsx`)**:
  - Filtragem automática dos 705 decalques ósseos de pintura de origem/inserção muscular (`.ol`, `.or`, `.el`, `.er`, `.o1l`, `.e1l`...) em `muscular_male.glb` via `isDuplicateCrossSystemMesh`, eliminando estilhaços vermelhos flutuantes e reduzindo draw calls pela metade.
  - Exclusão de tratos fasciais, músculos, vasos e nervos (`NON_AXIAL_STRUCTURE_REGEX`, ex.: `Iliotibial tract`, `Iliocostalis`, `Ilio-inguinal nerve`, `Vertebral artery`) de `isAxialAnchor`, mantendo apenas a coluna vertebral e a cintura pélvica óssea como âncora axial estática.
  - Eliminação dos degraus abruptos em `Y = 0.45` (que separavam a panturrilha da coxa na altura do joelho) e em `Z = ±0.01` (que dividiam músculos anteriores e posteriores em colunas distintas), adotando gradiente contínuo e magnitudes calibradas por camada cirúrgica (`0.22m` a `0.42m`).
- **Navegabilidade, Sincronização de Estado, Limpeza da Raiz e CI/CD (`useAnatomyStore.ts`, `deploy.yml`)**:
  - Sincronização bidirecional entre `solidOpacity` e `systemOpacities.skeletal`, `xRayMode`/`mprEnabled` e `dissection.visualMode`, e aliases na árvore TA2 (`335/335` no esqueleto, `1584` no total).
  - Deploy contínuo via Workload Identity Federation OIDC no GitHub Actions para o Google Cloud Run (`agent-md-506215`, `us-central1`, serviço `appmy`).
- **Quality Gates Convalidados**:
  - 210 testes unitários aprovados em 30 suítes Vitest (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`).
  - `npm run build` aprovado gerando bundles de produção do Vite e Express (`ExitCode 0`).

---

## 2. Servidores Configurados

- **Produção (Google Cloud Run)**: `https://appmy-1044179901556.us-central1.run.app/` (`https://appmy-syqnqsm4iq-uc.a.run.app/`)
- **Frontend Local (Vite)**: `http://localhost:3000/`
- **Backend Local (Express)**: `http://localhost:8080/`
