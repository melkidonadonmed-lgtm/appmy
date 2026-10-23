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

## Diretrizes Globais de Qualidade, Eficiência, UI e Memória (Padrão 2026)
Este repositório segue as diretrizes globais do workspace:
- **Regras do Workspace (`dev`)**: [AGENTS.md](file:///C:/Users/melki/dev/AGENTS.md), [GEMINI.md](file:///C:/Users/melki/dev/GEMINI.md) e Hub [`tools\agent-hub.ps1`](file:///C:/Users/melki/dev/tools/agent-hub.ps1)
- **Preferências Canônicas**: [Preferências de Trabalho com Agentes.md](file:///C:/Users/melki/dev/notes/Mem%C3%B3ria/Prefer%C3%AAncias%20de%20Trabalho%20com%20Agentes.md)
- **Regra Global (`always_on`)**: [diretrizes-qualidade-eficiencia.md](file:///C:/Users/melki/.gemini/config/rules/diretrizes-qualidade-eficiencia.md) (1. Fidelidade à referência, anti-travamento `<= 300` linhas/chamada e proporcionalidade; 2. Zero emojis em UI/código, Squint Test em 3 níveis, `tabular-nums`, temas *Ad Lucem*, *Cinza Monolítico `#57545d` + `#8e8999`* e *Terminal IBM `#070709`*; 3. Código limpo `pwsh` nativo; 4. Memória Obsidian + MemPalace).
