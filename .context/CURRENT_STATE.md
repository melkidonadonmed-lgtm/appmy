# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Concluído: Integração da Casca Tegumentar Real (.GLB), Saneamento de Órfãos, Acessibilidade ARIA e Refatoração de Domínio no Data Connect

---

## 1. Decisões Arquiteturais Consolidadas

- **Integração da Casca Tegumentar Real (`integumentary_female.glb`) em `RealBodyAtlas.tsx`**:
  - Modelo 3D da primeira camada externa do corpo humano integrado à estratigrafia canônica (Camada 1).
  - Controle de visibilidade inteligente integrado ao `layerPeelingLevel` (peeling >= 3 quando em modo "Todos") ou ativado diretamente pelo seletor de sistema `integumentary`.
  - Pré-carregamento instantâneo via `useGLTF.preload`.
- **Saneamento e Eliminação Definitiva de Arquivos Órfãos**:
  - Removidos: `useAnatomicalModel.ts`, `AnatomicalSidebar.tsx` e `RealCraniumModel.tsx`.
  - Suítes de teste de emojis e layout atualizadas para apontar exclusivamente para componentes ativos (`AnatomyFiltersSection.tsx`, `RealBodyAtlas.tsx`).
- **Acessibilidade A11y nos Nós Interativos**:
  - `OrientationGizmo.tsx`: cabeçalho de orientação atualizado com `role="button"`, `tabIndex={0}`, `aria-expanded` e navegação via teclado (`Enter`/`Space`).
  - `TreeGroup.tsx`: linha de expansão enriquecida com `role="button"` e `aria-expanded`.
- **Refatoração do Schema de Domínio no Firebase Data Connect (`schema.gql`)**:
  - Substituição das entidades genéricas de template por entidades médicas legítimas: `User`, `ClinicalBookmark` e `ClinicalAnnotation`.
- **Quality Gates Convalidados**:
  - 179 testes unitários aprovados em 28 suítes Vitest (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`).
  - `npm run build` aprovado gerando bundles minificados do Vite e Express (`ExitCode 0`).
  - `workspace_index.json` atualizado com 156 arquivos mapeados.

---

## 2. Servidores em Execução Ativa

- **Produção (Google Cloud Run)**: `https://appmy-1044179901556.us-central1.run.app/` (Ativo e validado, status 200, revisão `appmy-00006-plv`)
- **Healthcheck Produção**: `https://appmy-1044179901556.us-central1.run.app/api/health` (Status 200 OK, `firebaseAdminReady: true`)
- **Frontend Local (Vite)**: `http://localhost:3000/`
- **Backend Local (Express)**: `http://localhost:8080/`

---

## 3. Próximo Ponto de Entrada

- **Persistência Cloud de Bookmarks Clínicos (Fase 6)**:
  - Implementar endpoints REST `/api/bookmarks` ou operações GraphQL no Data Connect para sincronizar marcadores salvos entre instâncias do usuário autenticado no Firebase Auth.
