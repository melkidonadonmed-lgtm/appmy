# Appmy — Base Fullstack Cloud Run & Firebase

Arquitetura base moderna e desacoplada pronta para produção, unificando **Frontend React 19 (Vite)** com **Backend Express (TypeScript)** em container otimizado para o **Google Cloud Run**, integrada ao ecossistema **Firebase (Hosting, Auth, Firestore)** e com pipeline de CI/CD automatizado no **GitHub Actions**.

---

## 🏗️ Arquitetura do Sistema

```text
┌────────────────────────────────────────────────────────┐
│                   GITHUB REPOSITORY                    │
│    (Branches, Pull Requests e CI/CD GitHub Actions)    │
└──────────────────────────┬─────────────────────────────┘
                           │ Push / Merge na 'main'
                           ▼
┌────────────────────────────────────────────────────────┐
│               GOOGLE CLOUD PLATFORM (GCP)              │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Google Cloud Run (Container Multi-stage)         │  │
│  │                                                  │  │
│  │  • Express API (Porta dinâmica $PORT / 8080)     │  │
│  │  • Healthcheck: /api/health e /healthz           │  │
│  │  • Firebase Admin SDK (ADC / Service Account)    │  │
│  │  • Servidor SPA para o Frontend React            │  │
│  └──────────────────────────▲───────────────────────┘  │
│                             │ Rewrites /api/**         │
│  ┌──────────────────────────┴───────────────────────┐  │
│  │ Firebase Suite                                   │  │
│  │                                                  │  │
│  │  • Firebase Hosting (CDN Global de borda)        │  │
│  │  • Firebase Authentication (Tokens JWT)          │  │
│  │  • Cloud Firestore (firestore.rules)             │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 📁 Estrutura de Diretórios

```text
appmy/
├── .context/                       # Governança e persistência de contexto da máquina
│   ├── CURRENT_STATE.md            # Estado da arquitetura e decisões técnicas
│   └── SESSION_LOG.md              # Checkpoint e ações atômicas recentes
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Validação estrita de tipos e testes unitários
│       └── deploy.yml              # Build e Deploy automático no Google Cloud Run
├── src/
│   ├── client/                     # Frontend SPA (React 19 + TypeScript + Vite)
│   │   ├── lib/
│   │   │   └── firebase.ts         # Inicialização do Firebase Client SDK
│   │   ├── App.tsx                 # Dashboard e telemetria em tempo real
│   │   ├── index.css               # Estilização com tema escuro e responsivo
│   │   └── main.tsx                # Entrypoint React
│   └── server/                     # Backend API (Node.js + Express + TypeScript)
│       ├── config/
│       │   └── firebase-admin.ts   # Conexão segura com Firebase Admin SDK / ADC
│       ├── middleware/
│       │   └── auth.ts             # Validação de tokens JWT do Firebase Auth
│       ├── routes/
│       │   ├── api.ts              # Endpoints de negócio (/api/info, /api/echo, etc.)
│       │   └── health.ts           # Sondas de liveness e readiness (/api/health)
│       ├── app.ts                  # Configuração de middlewares, rotas e SPA
│       └── index.ts                # Inicialização do servidor na porta $PORT
├── tests/
│   └── server.test.ts              # Testes unitários com Vitest e Supertest
├── .dockerignore                   # Exclusões para compilação do container
├── .firebaserc                     # Definição do projeto Firebase (agent-md-506215)
├── .gcloudignore                   # Exclusões para deploy e Cloud Build
├── .gitignore                      # Proteção de segredos e exclusões do Git
├── deploy-cloudrun.ps1             # Script PowerShell para deploy local com 1 comando
├── deploy-cloudrun.sh              # Script Bash para deploy em ambientes Unix
├── Dockerfile                      # Build multi-stage para Cloud Run (usuário não-root)
├── firebase.json                   # Configuração de Hosting, Firestore e Emuladores
├── firestore.indexes.json          # Definição de índices compostos
├── firestore.rules                 # Regras de segurança do Cloud Firestore
├── package.json                    # Scripts e dependências do projeto
├── tsconfig.json                   # Configuração TypeScript do Frontend
├── tsconfig.server.json            # Configuração TypeScript do Backend
└── vite.config.ts                  # Bundler Vite e proxy de desenvolvimento
```

---

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
- Node.js 20+ (recomendado Node.js 22)
- Google Cloud SDK (`gcloud`) configurado
- PowerShell 7 (`pwsh`) no Windows ou Bash

### 2. Instalação de Dependências
```powershell
npm install
```

### 3. Configurar Variáveis de Ambiente
Copie o modelo `.env.example` para `.env`:
```powershell
Copy-Item .env.example .env
```
Preencha as variáveis do Firebase Web App caso deseje conectar com o projeto online.

### 4. Modo de Desenvolvimento (Hot-Reload Fullstack)
Inicia o backend Express na porta `8080` e o frontend Vite na porta `3000` (com proxy automático de `/api`):
```powershell
npm run dev
```
Acesse no navegador:
- Frontend: `http://localhost:3000`
- API Healthcheck: `http://localhost:8080/api/health`

### 5. Execução de Testes e Checagem de Tipos
```powershell
# Checagem rigorosa de tipos TypeScript (Client + Server)
npm run typecheck

# Testes unitários automatizados com Vitest
npm test
```

### 6. Build de Produção
```powershell
npm run build
npm start
```

---

## ☁️ Deploy no Google Cloud Run

### Método 1: Via Script PowerShell (1 Clique no Windows)
O script executa testes, valida a compilação do TypeScript e envia o container diretamente para o Cloud Run:
```powershell
.\deploy-cloudrun.ps1 -ProjectId "agent-md-506215" -ServiceName "appmy" -Region "us-central1"
```

### Método 2: Via Comando Direto do gcloud CLI
```powershell
gcloud run deploy appmy `
    --source . `
    --project agent-md-506215 `
    --region us-central1 `
    --platform managed `
    --allow-unauthenticated `
    --port 8080
```

---

## 🔥 Integração com Firebase

O arquivo `firebase.json` está configurado para permitir que o **Firebase Hosting** atue como CDN global de borda e faça o proxy das rotas dinâmicas da API diretamente para o serviço do **Cloud Run**:

```json
"rewrites": [
  {
    "source": "/api/**",
    "run": {
      "serviceId": "appmy",
      "region": "us-central1"
    }
  },
  {
    "source": "**",
    "destination": "/index.html"
  }
]
```

Para fazer deploy das regras do Firestore e configurações do Firebase:
```powershell
npx firebase deploy --only firestore:rules,firestore:indexes
```

---

## 🤖 CI/CD no GitHub Actions

O repositório já possui workflows configurados em `.github/workflows/`:
1. **`ci.yml`**: Executa a cada push ou Pull Request, verificando tipos estritos, testes unitários e compilação do container.
2. **`deploy.yml`**: Executa a cada merge na branch `main`. Para habilitar o deploy automático a partir do GitHub, adicione o secret:
   - `GCP_SA_KEY`: Chave JSON de uma Conta de Serviço com permissões `Cloud Run Admin`, `Cloud Build Editor` e `Storage Admin`.