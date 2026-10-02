# ==============================================================================
# SCRIPT DE DEPLOY NO GOOGLE CLOUD RUN (PowerShell / Windows 11)
# Projeto: appmy | Região: us-central1
# ==============================================================================

[CmdletBinding()]
param (
    [string]$ProjectId = "agent-md-506215",
    [string]$ServiceName = "appmy",
    [string]$Region = "us-central1"
)

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "🚀 INICIANDO DEPLOY AUTOMATIZADO NO GOOGLE CLOUD RUN" -ForegroundColor Cyan
Write-Host "Projeto : $ProjectId" -ForegroundColor Gray
Write-Host "Serviço : $ServiceName" -ForegroundColor Gray
Write-Host "Região  : $Region" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Validação do gcloud CLI
if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
    Write-Error "O comando 'gcloud' não foi encontrado. Instale o Google Cloud SDK."
}

# 2. Configurar Projeto Ativo
Write-Host "`n[1/4] Configurando projeto ativo no gcloud..." -ForegroundColor Yellow
gcloud config set project $ProjectId --quiet

# 3. Execução de testes de sanidade locais
Write-Host "`n[2/4] Executando testes automatizados locais..." -ForegroundColor Yellow
npm test
if ($LASTEXITCODE -ne 0) {
    Write-Error "Deploy abortado: os testes de sanidade falharam."
}

# 4. Compilação de pré-validação
Write-Host "`n[3/4] Validando build TypeScript (Client + Server)..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Deploy abortado: falha na compilação do TypeScript."
}

# 5. Deploy no Cloud Run via Cloud Build nativo
Write-Host "`n[4/4] Submetendo imagem e aplicando deploy no Cloud Run..." -ForegroundColor Yellow
gcloud run deploy $ServiceName `
    --source . `
    --region $Region `
    --platform managed `
    --allow-unauthenticated `
    --port 8080 `
    --set-env-vars NODE_ENV=production,GCP_PROJECT_ID=$ProjectId

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ DEPLOY CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
    $ServiceUrl = gcloud run services describe $ServiceName --region $Region --format 'value(status.url)'
    Write-Host "URL do Serviço: $ServiceUrl" -ForegroundColor Cyan
    Write-Host "Healthcheck   : $ServiceUrl/api/health" -ForegroundColor Cyan
} else {
    Write-Error "Falha ao realizar o deploy no Cloud Run."
}
