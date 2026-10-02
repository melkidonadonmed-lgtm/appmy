import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import healthRouter from './routes/health.js';
import apiRouter from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();

  // Middleware de segurança e parsing
  app.use(helmet({
    contentSecurityPolicy: false // Permite flexibilidade de scripts locais/Vite
  }));
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Rotas de Healthcheck (compatibilidade com Cloud Run e Kubernetes)
  app.use('/api/health', healthRouter);
  app.use('/healthz', healthRouter);

  // Rotas de API
  app.use('/api', apiRouter);

  // Servir frontend compilado (Vite SPA) em produção
  const clientDistPath = path.resolve(__dirname, '../client');
  if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));

    // Fallback para SPA (qualquer rota não-API direcionada ao index.html)
    app.get('*', (req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.join(clientDistPath, 'index.html'));
    });
  } else {
    app.get('/', (_req: Request, res: Response) => {
      res.status(200).json({
        message: 'Appmy API em execução. O frontend estático não foi localizado em dist/client (modo backend/dev).',
        healthcheck: '/api/health'
      });
    });
  }

  // Tratamento de rota não encontrada para APIs
  app.use('/api/*', (_req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not Found',
      message: 'O endpoint solicitado não existe nesta API.'
    });
  });

  // Middleware defensivo de captura de erros
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[App Error Uncaught]:', err);
    res.status(err.status || 500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'production' ? 'Erro interno no servidor' : err.message
    });
  });

  return app;
}
