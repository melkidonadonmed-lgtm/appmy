# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Concluída Unificação na Sidebar Esquerda: Remoção da Sidebar Direita, Expansão Máxima do Campo de Visão 3D (+360px), Integração de Filtros Selecionáveis de Sistemas/Regiões e Ficha Clínica Compacta

---

## 1. Decisões Arquiteturais Consolidadas

- **Unificação de Controles na Sidebar Esquerda (`AnatomyTreePanel.tsx`)**:
  - Consolidados os filtros rápidos selecionáveis de Sistemas Anatômicos (11 sistemas médicos) e Regiões do Esqueleto (7 regiões) diretamente no painel esquerdo (`AnatomyFiltersSection.tsx`).
  - Preservadas e aprimoradas as caixas de seleção tri-state (`TreeGroup.tsx`) para controle granular de visibilidade em massa ou individual.
  - Sincronização reativa da árvore taxonômica com o sistema ativo selecionado.
- **Expansão de Viewport 3D (Campo de Visão Total)**:
  - Desacoplada a renderização da `AnatomicalSidebar` em `App.tsx`, eliminando a disputa de espaço entre duas barras simultâneas.
  - A área central `.viewport-center-area` agora ocupa 100% da largura restante da tela, liberando mais de 360px horizontais para visualização imersiva do modelo anatômico.
  - O Modo Foco Cirúrgico (`Zen Mode` / tecla `Z`) continua operacional, colapsando a barra esquerda para entregar 100% de tela cheia.
- **Dossiê Clínico Compacto Integrado (`AnatomyClinicalCard.tsx`)**:
  - Exibido no topo da barra esquerda quando uma peça é selecionada no 3D ou na árvore.
  - Inclui identificação bilingue (PT-BR e Latim TA2), código FMA, atalhos de Foco (`F`), Isolar (`I`), Ocultar (`H`) e Fechar (`X` / `Esc`), além de correlações médicas e funcionais.
- **Quality Gate Validado**:
  - 135 testes unitários aprovados em 23 suítes Vitest (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`).
  - `npm run build` compilado com sucesso em 5.27s (`ExitCode 0`).
  - `workspace_index.json` reindexado com 151 arquivos mapeados.

---

## 2. Servidores em Execução Ativa

- **Produção (Google Cloud Run)**: `https://appmy-1044179901556.us-central1.run.app/` (Ativo e validado, status 200, revisão `appmy-00002-jmf`)
- **Healthcheck Produção**: `https://appmy-1044179901556.us-central1.run.app/api/health` (Status 200 OK, `firebaseAdminReady: True`)
- **Frontend Local (Vite)**: `http://localhost:3000/` (Porta 3000 ativa e operando, status 200)
- **Backend Local (Express)**: `http://localhost:8080/` (Healthcheck `/api/health`, status 200)

---

## 3. Próximo Ponto de Entrada

- **Persistência de Filtros Ativos no LocalStorage**:
  - Salvar o sistema/região ativo nas preferências locais para manter a mesma perspectiva entre recarregamentos.
