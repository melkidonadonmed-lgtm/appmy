# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git` (Commit: `192f035`)  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Concluído e em Produção: Blindagem Bilateral da Exploded View das Costelas e Pin 3D Elevado Desobstruindo a Peça Selecionada

---

## 1. Decisões Arquiteturais e Diagnósticos Consolidados

- **Causa Raiz & Blindagem Bilateral da Exploded View (`explodedEngine.ts`)**:
  - *Diagnóstico*: No modelo GLTF Z-Anatomy (`skeletal_male.glb`), os ossos esquerdos (`.l`) possuem coordenadas $X > 0$ e os direitos (`.r`) $X < 0$. O script gerador do catálogo havia adotado convenção 2D invertida ($X = -1.1$ para esquerdo e $X = +1.1$ para direito), fazendo com que costelas e cartilagens costais cruzassem o plano sagital mediano durante a dispersão.
  - *Correção Definitiva*: Implementada a regra de blindagem de paridade bilateral em `bindExplodedNode`. Se $|originalPosition.x| > 0.01$ e $\text{sgn}(x) \neq \text{sgn}(posX)$, o motor inverte o sinal do vetor ($x = \text{sgn}(posX) \cdot |x|$). Qualquer estrutura par agora expande lateralmente para longe da linha média, blindando 100% dos 335 ossos contra cruzamentos espúrios.
- **Desobstrução Visual do Pin 3D (`RealBodyAtlas.tsx`)**:
  - *Diagnóstico*: O componente Drei `<Html>` estava posicionado em `position.y + 0.06` com a flag `center`, o que renderizava o card escuro exatamente sobre o centro geométrico do osso, atuando como máscara visual sobre a peça sob exame.
  - *Correção Definitiva*: O Pin agora é elevado para $Y = \text{box.max.y} + \max(0.12, \text{size.y} \times 0.45)$, ancorado pela base (`transform: translate3d(-50%, -100%, 0)`), com uma haste indicadora vertical translúcida de 16px e um ponto de toque ciano emissivo (5px) no topo da malha. A visão da peça selecionada fica 100% desobstruída na viewport central.
- **Quality Gates Convalidados**:
  - 180 testes unitários aprovados em 28 suítes Vitest (`ExitCode 0`).
  - `npm run typecheck` com zero erros (`ExitCode 0`).
  - `npm run build` aprovado (Vite client + Express server com `ExitCode 0`).
  - `workspace_index.json` atualizado com 156 arquivos mapeados.

---

## 2. Servidores em Execução Ativa

- **Produção (Google Cloud Run)**: `https://appmy-1044179901556.us-central1.run.app/` (Ativo e validado, status 200, revisão `appmy-00007-vxn`)
- **Healthcheck Produção**: `https://appmy-1044179901556.us-central1.run.app/api/health` (Status 200 OK, `firebaseAdminReady: true`)
- **Frontend Local (Vite)**: `http://localhost:3000/`
- **Backend Local (Express)**: `http://localhost:8080/`

---

## 3. Próximo Ponto de Entrada

- Monitoramento contínuo de usabilidade e novas demandas clínicas de inspeção.
