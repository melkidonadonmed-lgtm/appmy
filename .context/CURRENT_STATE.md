# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Concluída Auditoria e Reestruturação Técnica: Modo Foco Cirúrgico (Zen Mode 100% Viewport), Persistência de Bookmarks Clínicos no LocalStorage, Otimização de VRAM e Ciclo de Renderização

---

## 1. Decisões Arquiteturais Consolidadas

- **Modo Foco Cirúrgico (Zen Mode 100% Viewport)**:
  - Acionamento unificado via botão superior na `top-nav` ou tecla de atalho clínico `Z`.
  - Colapsa simultaneamente o outliner taxonômico (esquerda) e a sidebar clínica (direita), liberando 100% da viewport para a cena 3D.
  - Preserva de forma idempotente e determinística o estado prévio de cada painel ao sair do modo Zen.
  - Indicador flutuante elegante (`.zen-mode-badge`) no topo do canvas permitindo restaurar a interface com um clique ou via teclado.
- **Persistência de Bookmarks Clínicos (`bookmarks-storage.ts`)**:
  - Módulo resiliente com suporte dual (Browser e Node/SSR) para salvar perspectivas, planos de corte MPR, densidades ósseas, visibilidade de malhas e alvos de câmera no LocalStorage.
  - Interface integrada na `QuickPresetsBar` com lista de marcadores, data de criação, restauração atômica no `useAnatomyStore` e exclusão limpa.
- **Otimização de VRAM e Ciclo de Renderização Three.js / R3F**:
  - `SmoothCameraController` otimizado: limpa alvos de foco ao convergir (distância < 0.0001), eliminando queima desnecessária de ciclos de CPU por frame.
  - Tratamento resiliente de perda e restauração de contexto WebGL (`webglcontextlost` / `webglcontextrestored`) prevenindo crashes de VRAM.
  - `RealCraniumModel` equipado com descarte determinístico de geometrias, materiais e texturas (`disposeHierarchy` em `webgl-gc.ts`) no ciclo de unmount.
- **Quality Gate Validado**:
  - 120 testes unitários aprovados em 21 suítes Vitest (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`).
  - `npm run build` compilado com sucesso em 9.69s (`ExitCode 0`).
  - `workspace_index.json` reindexado com 131 arquivos mapeados.

---

## 2. Servidores em Execução Ativa

- **Produção (Google Cloud Run)**: `https://appmy-1044179901556.us-central1.run.app/` (Ativo e validado, status 200, revisão `appmy-00001-ddw`)
- **Healthcheck Produção**: `https://appmy-1044179901556.us-central1.run.app/api/health` (Status 200 OK, `firebaseAdminReady: True`)
- **Frontend Local (Vite)**: `http://localhost:3000/` (Porta 3000 ativa e operando, status 200)
- **Backend Local (Express)**: `http://localhost:8080/` (Healthcheck `/api/health`, status 200)

---

## 3. Próximo Ponto de Entrada

- **Exportação e Compartilhamento de Bookmarks**:
  - Permitir exportar snapshots de dissecção em arquivo JSON ou URL parametrizada para compartilhamento entre cirurgiões e residentes.
