import { Router } from 'express';
import { isFirebaseAdminInitialized } from '../config/firebase-admin.js';

const router = Router();
const startTime = Date.now();

router.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'appmy',
    version: '1.0.0',
    uptime: (Date.now() - startTime) / 1000,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cloudRun: {
      port: process.env.PORT || '8080',
      region: process.env.K_SERVICE ? (process.env.CLOUD_RUN_REGION || 'gcp-active') : 'local'
    },
    firebaseAdminReady: isFirebaseAdminInitialized
  });
});

export default router;
