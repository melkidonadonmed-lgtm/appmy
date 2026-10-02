import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/server/app.js';

describe('Appmy API Suite (Cloud Run & Firebase Base)', () => {
  const app = createApp();

  describe('Healthcheck Endpoint (/api/health)', () => {
    it('deve retornar status 200 com payload estruturado de telemetria', async () => {
      const response = await request(app).get('/api/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('service', 'appmy');
      expect(response.body).toHaveProperty('version', '1.0.0');
      expect(typeof response.body.uptime).toBe('number');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('cloudRun');
      expect(response.body.cloudRun).toHaveProperty('port');
    });

    it('deve responder positivamente ao endpoint /healthz para liveness probe', async () => {
      const response = await request(app).get('/healthz');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
    });
  });

  describe('API Routes (/api)', () => {
    it('deve retornar metadados do serviço no endpoint público /api/info', async () => {
      const response = await request(app).get('/api/info');

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Appmy API');
      expect(Array.isArray(response.body.features)).toBe(true);
      expect(response.body.features).toContain('cloud-run-ready');
    });

    it('deve rejeitar com 401 requisições não autenticadas no endpoint /api/protected', async () => {
      const response = await request(app).get('/api/protected');

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Unauthorized');
      expect(response.body.message).toContain('Token de autenticação ausente');
    });

    it('deve rejeitar com 401 requisições com formato inválido de Authorization', async () => {
      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', 'Basic 123456');

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Unauthorized');
    });

    it('deve validar entrada defensiva no endpoint POST /api/echo (rejeitar payload sem title)', async () => {
      const response = await request(app)
        .post('/api/echo')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Bad Request');
      expect(response.body.message).toContain('title');
    });

    it('deve processar corretamente payload válido no endpoint POST /api/echo', async () => {
      const response = await request(app)
        .post('/api/echo')
        .send({ title: 'Novo Recurso', payload: { foo: 'bar' } });

      expect(response.status).toBe(201);
      expect(response.body.received.title).toBe('Novo Recurso');
      expect(response.body.received.payload).toEqual({ foo: 'bar' });
      expect(response.body).toHaveProperty('processedAt');
    });

    it('deve retornar 404 estruturado para endpoint inexistente sob /api/*', async () => {
      const response = await request(app).get('/api/nao-existe');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
    });
  });
});
