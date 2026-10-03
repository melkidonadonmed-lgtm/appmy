# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git` (Commit: `72563cc`)  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Concluído e em Produção: Multi-Seleção de Sistemas Anatômicos Sobrepostos, Sliders de Opacidade Individual, Presets Cirúrgicos de Transparência e Sincronização de Bookmarks

---

## 1. Decisões Arquiteturais Consolidadas

- **Multi-Seleção Concorrente de Sistemas (`useAnatomyStore.ts`)**:
  - `activeSystems`: Conjunto reativo `Set<ActiveAnatomicalSystem>` permitindo visualização simultânea de múltiplos sistemas (ex: esqueleto + vascular + linfático).
  - Ações atômicas: `toggleSystem`, `setAllSystems` e retrocompatibilidade com `setActiveSystem`.
- **Controle Granular de Transparência e Opacidade Individual (`visibilityManager.ts` e `useAnatomyStore.ts`)**:
  - `systemOpacities`: Mapeamento `Record<string, number>` de $0.0$ a $1.0$ por camada anatômica.
  - `updateMeshVisibility` enriquecido com suporte a `baseOpacity` com transição automática de `baseMaterial.transparent = baseOpacity < 0.99`.
  - Injeção em tempo de execução no `RealBodyAtlas.tsx` nos 10 sistemas anatômicos do Z-Anatomy.
- **Card Clínico com Ações Rápidas de Camada e Presets Cirúrgicos (`AnatomyClinicalCard.tsx`)**:
  - Compacto por padrão (`detailsExpanded: false`) com seta de 16px para expansão da literatura médica.
  - Botões de ativação rápida em 1 clique para vasos, nervos, músculos, linfáticos, fáscia e esqueleto.
  - Sliders individuais de opacidade com display numérico percentual e indicador colorido por sistema.
  - Presets rápidos de transparência cirúrgica/radiológica: `Angio Focus`, `Neuro Focus`, `Músculo 40%` e `Reset 100%`.
- **Persistência em Bookmarks Clínicos (`bookmarks-storage.ts`)**:
  - `activeSystems` e `systemOpacities` integrados e restaurados fielmente via `applyBookmarkToStore`.
- **Quality Gates Convalidados**:
  - 166 testes unitários aprovados em 26 suítes Vitest (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`).
  - `npm run build` aprovado gerando bundles minificados do Vite e Express (`ExitCode 0`).
  - `workspace_index.json` atualizado com 157 arquivos.

---

## 2. Servidores em Execução Ativa

- **Produção (Google Cloud Run)**: `https://appmy-1044179901556.us-central1.run.app/` (Ativo e validado, status 200, revisão `appmy-00005-4g5`)
- **Healthcheck Produção**: `https://appmy-1044179901556.us-central1.run.app/api/health` (Status 200 OK, `firebaseAdminReady: true`)
- **Frontend Local (Vite)**: `http://localhost:3000/`
- **Backend Local (Express)**: `http://localhost:8080/`

---

## 3. Próximo Ponto de Entrada

- **Modo Corte Seccional / Planos Tomográficos (Axial, Sagital, Coronal)**:
  - Adicionar clipping planes para inspeção tomográfica em conjunto com a transparência de sistemas.
