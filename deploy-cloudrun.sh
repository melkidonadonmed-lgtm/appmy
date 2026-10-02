#!/usr/bin/env bash
# ==============================================================================
# SCRIPT DE DEPLOY NO GOOGLE CLOUD RUN (Bash / Linux / macOS)
# ==============================================================================
set -euo pipefail

PROJECT_ID="${1:-agent-md-506215}"
SERVICE_NAME="${2:-appmy}"
REGION="${3:-us-central1}"

echo "=========================================================="
echo "🚀 INICIANDO DEPLOY NO GOOGLE CLOUD RUN"
echo "Projeto : ${PROJECT_ID}"
echo "Serviço : ${SERVICE_NAME}"
echo "Região  : ${REGION}"
echo "=========================================================="

echo "[1/4] Configurando projeto no gcloud..."
gcloud config set project "${PROJECT_ID}" --quiet

echo "[2/4] Executando testes..."
npm test

echo "[3/4] Testando compilação..."
npm run build

echo "[4/4] Submetendo deploy no Cloud Run..."
gcloud run deploy "${SERVICE_NAME}" \
    --source . \
    --region "${REGION}" \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --set-env-vars NODE_ENV=production,GCP_PROJECT_ID="${PROJECT_ID}"

echo "✅ Deploy finalizado com sucesso!"
SERVICE_URL=$(gcloud run services describe "${SERVICE_NAME}" --region "${REGION}" --format 'value(status.url)')
echo "URL ativa: ${SERVICE_URL}"
