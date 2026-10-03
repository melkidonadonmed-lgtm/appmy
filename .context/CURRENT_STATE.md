# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Blindagem de Posição Anatômica Imutável (Fim da Flutuação/Drift), Sincronização Árvore <-> Three.js, Multi-Seleção Concorrente de Sistemas e Ordem Estratigráfica de Fora para Dentro

---

## 1. Decisões Arquiteturais Consolidadas

- **Blindagem Imutável da Posição Anatômica (`explodedEngine.ts` e `RealBodyAtlas.tsx`)**:
  - `initialPosition` gravado como referência imutável no momento da clonagem do GLTF.
  - Eliminação definitiva da corrupção cumulativa de posições em re-renderizações (`useMemo`).
  - Restauração atômica e exata para a posição anatômica original quando `progress === 0.0`.
- **Sincronização Bidirecional Árvore <-> Three.js (`TreeGroup.tsx`, `AnatomyTreePanel.tsx`)**:
  - Checkboxes de nível de sistema na árvore taxonômica agora disparam `addSystem` / `removeSystem` sincronizados com `activeSystems`.
  - O filtro da árvore (`visibleTree`) agora suporta múltiplos sistemas selecionados simultaneamente em vez de monosseleção restritiva.
- **Multi-Seleção Concorrente nos Filtros Rápidos (`AnatomyFiltersSection.tsx`)**:
  - Botões de sistemas agora operam como seletores aditivos/subtrativos (`toggleSystem`), permitindo combinar esqueleto + vascular + linfático à vontade.
  - Seletor "Todos" restaurado via `setAllSystems`.
  - Seção de regiões corporais universalizada para orientar a câmera independentemente do sistema ativo.
- **Ordem Estratigráfica Canônica: De Fora para Dentro**:
  - `taxonomicMetadata.ts` reordenado: 1. Tegumento (Pele) -> 2. Músculos -> 3. Articulações -> 4. Esqueleto -> 5. Cardio -> 6. Linfático -> 7. Nervoso -> 8. Respiratório -> 9. Digestório -> 10. Urinário -> 11. Endócrino -> 12. Reprodutor.
  - `AnatomyFiltersSection.tsx` reflete rigorosamente a progressão da periferia para o centro anatômico.
- **Quality Gates Convalidados**:
  - 174 testes unitários aprovados em 27 suítes Vitest (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`).
  - `npm run build` aprovado (`ExitCode 0`).
  - `workspace_index.json` atualizado com 158 arquivos mapeados.

---

## 2. Servidores em Execução Ativa

- **Produção (Google Cloud Run)**: `https://appmy-1044179901556.us-central1.run.app/`
- **Healthcheck Produção**: `https://appmy-1044179901556.us-central1.run.app/api/health`
- **Frontend Local (Vite)**: `http://localhost:3000/`
- **Backend Local (Express)**: `http://localhost:8080/`

---

## 3. Próximo Ponto de Entrada

- **Commit e Push para o GitHub e Deploy no Cloud Run**:
  - Subir a versão com a blindagem das coordenadas dos ossos e a nova estratigrafia canônica de fora para dentro.
