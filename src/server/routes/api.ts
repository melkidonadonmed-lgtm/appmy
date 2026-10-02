import { Router, type Request, type Response } from 'express';
import { verifyFirebaseToken, type AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// Endpoint público com dados do sistema
router.get('/info', (_req: Request, res: Response) => {
  res.status(200).json({
    name: 'Appmy API',
    description: 'API base para Cloud Run e Firebase',
    features: ['express', 'typescript', 'firebase-admin', 'cloud-run-ready'],
    timestamp: new Date().toISOString()
  });
});

// Endpoint protegido exigindo Firebase Auth
router.get('/protected', verifyFirebaseToken, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({
    message: 'Acesso autenticado com sucesso',
    user: {
      uid: req.user?.uid,
      email: req.user?.email,
      name: req.user?.name
    }
  });
});

// Endpoint exemplo de dados com validação defensiva de borda
router.post('/echo', (req: Request, res: Response) => {
  const { title, payload } = req.body || {};

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'O campo "title" é obrigatório e deve ser uma string não vazia.'
    });
    return;
  }

  res.status(201).json({
    received: {
      title: title.trim(),
      payload: payload ?? null
    },
    processedAt: new Date().toISOString()
  });
});

export default router;
