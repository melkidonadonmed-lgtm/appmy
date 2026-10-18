# GEMINI.md — appmy (Atlas 3D de Anatomia Médica)

Diretrizes e contexto operacional para o **Google Antigravity (AGY)** e **Gemini CLI** atuando no repositório `appmy`.

> **Fonte Primária**: Consulte o [`AGENTS.md`](./AGENTS.md) e [`DESIGN.md`](./DESIGN.md) para especificações completas de anatomia, shaders, estados do Zustand e design tokens. Em caso de divergência, prevalece o `AGENTS.md`.

---

## 1. Identificação e Natureza
- **Projeto / Pacote**: `appmy` (repositório `melkidonadonmed-lgtm/appmy`).
- **Domínio**: Atlas 3D educacional do corpo humano (335 ossos reais desarticulados, sistemas viscerais e musculares em `.glb`, Exploded View em GPU, Dissecção MPR e códigos FMA / TA2).
- **Aviso Obrigatório**: O software tem finalidade **estritamente educacional**. Nunca apresentar como ferramenta diagnóstica ou terapêutica.
- **Stack**: React 19 + TypeScript, Vite 6, Three.js (Fiber 9 / Drei 10), Zustand 5 (`src/client/stores/useAnatomyStore.ts`), Express 4, Vitest 3.

---

## 2. Comandos Operacionais

```powershell
npm ci             # Instalação reproduzível de dependências
npm run dev        # API Express em :8080 + Vite em :3000 (com proxy /api)
npm run typecheck  # Validação estrita de tipos (cliente + servidor)
npm test           # Execução dos 234 testes no Vitest
npm run build      # Build otimizado de produção (dist/client e dist/server)
npm start          # Inicia servidor Express de produção (:8080)
```

---

## 3. Portas e Deploy Cloud Run
- **Cliente Vite Local**: Porta `:3000` (`vite.config.ts`), host `0.0.0.0`.
- **API Express Local**: Porta `:8080` (`PORT || 8080`).
- **Deploy Automático**: Cloud Run `appmy` (`us-central1`), revisão ativa `appmy-00016-g74`.
  - URL Canônica: `https://appmy-syqnqsm4iq-uc.a.run.app`.
  - **Atenção**: Push no branch `main` dispara o deploy contínuo via GitHub Actions (`deploy.yml`). Commits exclusivamente de documentação devem incluir `[skip ci]` na mensagem.

---

## 4. Invariantes de Desenvolvimento
1. **Estado Centralizado**: O Zustand (`useAnatomyStore.ts`) é a fonte única da verdade; não introduza Contexts ou stores paralelas.
2. **Assets 3D Offline**: Os arquivos Draco (`public/draco/`) e malhas 3D operam com cache offline (`CacheStorage`). Não migre arquivos `.glb` sem alinhamento prévio.
3. **Privacidade e Ética Médica**: Zero armazenamento ou tráfego de dados de pacientes.

---

## Diretrizes Globais de Qualidade, Eficiência, Orquestração de Agentes e Execução Adaptativa
Este repositório segue as diretrizes globais do workspace:
- **Regras do Workspace (`dev`)**: [AGENTS.md](file:///C:/Users/melki/dev/AGENTS.md), [GEMINI.md](file:///C:/Users/melki/dev/GEMINI.md) e Hub Interativo [`tools\agent-hub.ps1`](file:///C:/Users/melki/dev/tools/agent-hub.ps1)
- **Preferências e Memória Canônica**: [Preferências de Trabalho com Agentes.md](file:///C:/Users/melki/dev/notes/Mem%C3%B3ria/Prefer%C3%AAncias%20de%20Trabalho%20com%20Agentes.md)
- **Regra Global (`always_on`)**: [diretrizes-qualidade-eficiencia.md](file:///C:/Users/melki/.gemini/config/rules/diretrizes-qualidade-eficiencia.md) (1. Qualidade e Tipagem Estrita <= 300 linhas; 2. Eficiência, Zero Preâmbulo e Portões HITL; 3. Flexibilidade Anti-Engessamento; 4. Self-Refine Silencioso; 5. Proatividade com 1 Próximo Passo Concreto; 6. Minimalist Impact `DESIGN.md v4.5-soft` — Luz 135°, `Cerulean Sapphire #0284C7`, Zero Cobalto/Glassmorphism).
- **Orquestração Interativa de Agentes (5 Camadas)**:
  1. **Bússola & Heartbeat (`0 tokens`)**: `franklin_smart_compass(intent_or_path)` | `pwsh C:\Users\melki\dev\tools\agent-hub.ps1` | `POST /rpc` (`mesh/heartbeat`).
  2. **Execução Direta vs. Loop Fechado**: Precedência `<user_rules>` **>** `franklin-skills` **>** `superpowers` (entrega direta sem entrevista em baixo risco; `LoopPlanner` Fase 0 + `gap-analyzer-auditor` em missões críticas).
  3. **Esquadrão Frontend (`FrontCraftMaster` + Topologia `3+1`)**: `invoke_subagent` (`ui-shell-navigator` -> `ui-controls-data` + `ui-motion-interaction` -> `ui-deterministic-observer`) ou `franklin_execute_dag("ui")`.
  4. **Gatekeepers Determinísticos**: `code-acceptability-auditor` (AST Python >= 75), `test-quality-auditor`, `franklin_execute_dag("physics")` (`Snorm >= 80`) e `dispatch_skill_deterministic_tests` (Go Pass@k).
  5. **Malha Multiagente Cloud/Web & Clínica**: `adk-tests` (Watchdog SRE + A2A `:8080`), `epic-volta` (DAG Kahn + `MCPBridgeAgent`), `mcp-web-agents` (Gateway 4+1) e `PCM`/`scoreboard` (`prescmed-clinical-reviewer`).
