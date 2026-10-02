import admin from 'firebase-admin';

let isFirebaseAdminInitialized = false;

try {
  if (admin.apps.length === 0) {
    // No Cloud Run e GCP, admin.initializeApp() detecta automaticamente o ADC (Application Default Credentials)
    admin.initializeApp();
    isFirebaseAdminInitialized = true;
    console.log('[Firebase Admin] Inicializado com sucesso via ADC / credenciais locais.');
  } else {
    isFirebaseAdminInitialized = true;
  }
} catch (error) {
  console.warn('[Firebase Admin] Inicializacao em modo offline (ADC nao detectado localmente):', (error as Error).message);
}

export { admin, isFirebaseAdminInitialized };
