# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Validação Pré-Entrega Concluída: Exploded View 100% Funcional (Dispersão Radial Inteligente), Isolamento Total das Sidebars (Layout Flex 3 Colunas Sem Sobreposição) e Interatividade Pura

---

## 1. Decisões Arquiteturais Consolidadas

- **Estação Cirúrgica em 3 Colunas Desacopladas (Sem Sobreposição)**:
  - `AnatomyTreePanel.tsx` (Esquerda - 300px): Navegador taxonômico TA2 com busca, expansão e checkboxes de visibilidade.
  - `SceneCanvas.tsx` / `RealBodyAtlas.tsx` (Centro - flex: 1): Viewport Three.js perfeitamente centralizado, com `OrientationGizmo` (ViewCube) desobstruído no canto superior direito e `QuickPresetsBar` no rodapé.
  - `AnatomicalSidebar.tsx` (Direita - 340px): Dossiê Clínico priorizado no topo quando há peça selecionada, ou Ferramentas de Dissecção Global (Sistemas, Regiões, Layer Peeling, Exploded View 0-100%) quando nenhum nó está selecionado. Colapsável independentemente via `sidebarCollapsed`.
- **Exploded View em 100% de Amplitude Real ("O 100")**:
  - Implementado vetor de dispersão radial inteligente para 100% das malhas do corpo humano, garantindo que mesmo malhas viscerais ou musculares sem anotação explícita explodam suavemente de forma centrífuga.
  - Magnitude de explosão elevada de 0.35 para 0.95 (e 1.4 no crânio), proporcionando separação anatômica cristalina ao atingir 100%.
- **Priorização do Esqueleto e Controle de Camadas Miológicas**:
  - `activeSystem: 'skeletal'` e `layerPeelingLevel: 0` definidos como estado padrão, garantindo que o usuário visualize os 335 ossos brancos/marfim sem massas musculares opacas cobrindo o modelo.
  - `layerPeelingLevel` conectado no `RealBodyAtlas.tsx`: Nível 0 (músculos ocultos), Nível 1 (músculos translúcidos 35%), Nível 2 (músculos 75%), Nível 3 (músculos 100% sólidos).
- **Quality Gate Validado**:
  - 113 testes unitários aprovados em 20 suítes Vitest (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`).
  - `npm run build` compilado com sucesso em 10.00s (`ExitCode 0`).
  - `workspace_index.json` reindexado com 129 arquivos mapeados.

---

## 2. Servidores em Execução Ativa

- **Frontend (Vite)**: `http://localhost:3000/` (Porta 3000 ativa e operando, status 200)
- **Backend (Express)**: `http://localhost:8080/` (Healthcheck `/api/health`, status 200)

---

## 3. Próximo Ponto de Entrada

- **Persistência de Bookmarks Customizados**:
  - Salvar no LocalStorage estados de dissecção personalizados definidos pelo usuário para retorno imediato.
