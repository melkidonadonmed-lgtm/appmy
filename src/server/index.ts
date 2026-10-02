import dotenv from 'dotenv';
import { createApp } from './app.js';

dotenv.config();

const app = createApp();
const PORT = Number(process.env.PORT) || 8080;
const HOST = '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`===============================================`);
  console.log(`🚀 Servidor Appmy rodando em http://${HOST}:${PORT}`);
  console.log(`🩺 Healthcheck: http://${HOST}:${PORT}/api/health`);
  console.log(`🌐 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`===============================================`);
});

// Tratamento gracioso de desligamento (SIGTERM no Cloud Run ao escalar para zero)
function handleShutdown(signal: string) {
  console.log(`\n[Process] Sinal ${signal} recebido. Encerrando conexoes graciosamente...`);
  server.close(() => {
    console.log('[Process] Servidor finalizado com sucesso.');
    process.exit(0);
  });

  // Forçar encerramento se travar por mais de 5s
  setTimeout(() => {
    console.error('[Process] Forcando encerramento do processo apos timeout.');
    process.exit(1);
  }, 5000);
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
