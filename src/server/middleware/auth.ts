import type { Request, Response, NextFunction } from 'express';
import { admin, isFirebaseAdminInitialized } from '../config/firebase-admin.js';

export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export async function verifyFirebaseToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Token de autenticação ausente ou em formato incorreto (Bearer <token>)'
    });
    return;
  }

  const token = authHeader.split('Bearer ')[1].trim();

  if (!isFirebaseAdminInitialized) {
    res.status(503).json({
      error: 'Service Unavailable',
      message: 'Firebase Admin SDK não configurado no servidor'
    });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Token Firebase inválido ou expirado',
      details: (error as Error).message
    });
  }
}
