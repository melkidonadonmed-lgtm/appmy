# ESTADO ATUAL DO PROJETO (NÍVEL 2)

**Projeto**: appmy  
**Repositório GitHub**: `git@github.com:melkidonadonmed-lgtm/appmy.git`  
**GCP Project**: `agent-md-506215`  
**Região GCP**: `us-central1`  
**Fase Atual**: Base Fullstack Inicializada, Testada e Pronta para Deploy  

---

## 1. Decisões Arquiteturais Consolidadas

- **Stack Escolhida**: TypeScript Fullstack unificado:
  - Frontend: React 19 + TypeScript + Vite (`src/client`)
  - Backend: Node.js + Express + TypeScript (`src/server`)
  - Runtime: Multi-stage Dockerfile com Node.js 22 Alpine, usuário não-root `node` e contrato dinâmico `$PORT` (8080)
- **Integração Firebase**:
  - `firebase.json`: Hosting configurado com rewrites direcionando `/api/**` para o serviço Cloud Run e `**` para o frontend SPA.
  - `firestore.rules`: Regras base com isolamento de dados por usuário autenticado.
  - SDKs: `firebase` (client) e `firebase-admin` (server com suporte automático a ADC).
- **GitHub & CI/CD**:
  - `.github/workflows/ci.yml`: Validação contínua de tipos estritos, testes unitários com Vitest e build de produção.
  - `.github/workflows/deploy.yml`: Deploy contínuo no Google Cloud Run.
  - Scripts locais: `deploy-cloudrun.ps1` (PowerShell Windows) e `deploy-cloudrun.sh` (Bash).

---

## 2. Débitos Técnicos e Blockers

- `[MÉDIO]`: Configuração das chaves reais do Firebase Web no `.env` (atualmente com placeholders para modo offline/emulador).
- `[MÉDIO]`: Cadastro da Secret `GCP_SA_KEY` no GitHub Actions para deploy automatizado via branch `main`.
- `[BAIXO]`: Split de bundle de produção no Vite (caso o client cresça além de 500kB).

---

## 3. Próximo Ponto de Entrada

- Comitar arquivos da base no repositório GitHub e realizar o primeiro push para `origin/main`.
- Executar `deploy-cloudrun.ps1` quando o usuário desejar subir a primeira revisão em nuvem.
