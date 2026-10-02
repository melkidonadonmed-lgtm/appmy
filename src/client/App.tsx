import { useEffect, useState } from 'react';
import { Server, Cloud, ShieldCheck, Flame, GitBranch, Terminal, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { isFirebaseConfigured } from './lib/firebase.ts';

interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  service: string;
  version: string;
}

export default function App() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/health');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setHealth(data);
    } catch (err: any) {
      setError(err.message || 'Falha ao conectar com a API Backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <Cloud className="text-sky-400" size={32} color="#38bdf8" />
          <div>
            <h1>Appmy</h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Base Fullstack Cloud Run + Firebase
            </p>
          </div>
        </div>

        <div className="status-badge">
          <span className="status-dot"></span>
          <span>Pronto para Deploy</span>
        </div>
      </header>

      <div className="grid">
        {/* Backend & Cloud Run Status Card */}
        <div className="card">
          <div className="card-title">
            <Server size={20} color="#38bdf8" />
            <span>Backend API (Cloud Run)</span>
          </div>
          <p className="card-description">
            Serviço Express em Node.js com endpoints REST, healthcheck e suporte a variáveis de ambiente gerenciadas.
          </p>

          <div className="code-box">
            {loading ? (
              <span>Carregando status do backend...</span>
            ) : error ? (
              <span style={{ color: 'var(--danger)' }}>Erro: {error}</span>
            ) : health ? (
              <div>
                <div><strong>Status:</strong> {health.status.toUpperCase()}</div>
                <div><strong>Ambiente:</strong> {health.environment}</div>
                <div><strong>Serviço:</strong> {health.service} (v{health.version})</div>
                <div><strong>Uptime:</strong> {Math.round(health.uptime)}s</div>
              </div>
            ) : (
              <span>Nenhum dado retornado</span>
            )}
          </div>

          <button className="btn btn-secondary" onClick={fetchHealth} disabled={loading}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Atualizar Healthcheck</span>
          </button>
        </div>

        {/* Firebase SDK Card */}
        <div className="card">
          <div className="card-title">
            <Flame size={20} color="#f59e0b" />
            <span>Firebase Suite</span>
          </div>
          <p className="card-description">
            Integração configurada para Firebase Hosting, Authentication e Firestore Rules com suporte a emuladores locais.
          </p>

          <div className="code-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              {isFirebaseConfigured ? (
                <>
                  <CheckCircle2 size={16} color="var(--success)" />
                  <span style={{ color: 'var(--success)' }}>Credenciais Ativas (.env)</span>
                </>
              ) : (
                <>
                  <AlertCircle size={16} color="var(--warning)" />
                  <span style={{ color: 'var(--warning)' }}>Modo Offline / Emulador Local</span>
                </>
              )}
            </div>
            <div><strong>Hosting:</strong> Configurado via <code>firebase.json</code></div>
            <div><strong>Firestore:</strong> Regras em <code>firestore.rules</code></div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Configure as chaves no arquivo <code>.env</code> para habilitar os serviços em nuvem.
            </span>
          </div>
        </div>

        {/* CI/CD & GitHub Actions Card */}
        <div className="card">
          <div className="card-title">
            <GitBranch size={20} color="#818cf8" />
            <span>GitHub CI/CD & Deploy</span>
          </div>
          <p className="card-description">
            Pipeline automatizado via GitHub Actions para build do container e deploy com zero-downtime no Google Cloud Run.
          </p>

          <div className="code-box">
            <div><strong>Workflow:</strong> <code>.github/workflows/deploy.yml</code></div>
            <div><strong>Porta Cloud Run:</strong> <code>$PORT</code> (Padrão 8080)</div>
            <div><strong>Container:</strong> Docker multi-stage ultraleve</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={16} color="var(--success)" />
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Workload Identity / Secrets prontos
            </span>
          </div>
        </div>
      </div>

      {/* Quick Start Commands */}
      <div className="card">
        <div className="card-title">
          <Terminal size={20} color="#38bdf8" />
          <span>Comandos Rápidos de Operação</span>
        </div>
        <p className="card-description">
          Comandos prontos para desenvolvimento local e deploy no Google Cloud:
        </p>

        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', margin: 0 }}>
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.375rem' }}>
              Iniciar ambiente local (Fullstack com Hot-Reload):
            </div>
            <pre className="code-box">npm run dev</pre>
          </div>

          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.375rem' }}>
              Deploy direto no Cloud Run via PowerShell:
            </div>
            <pre className="code-box">.\deploy-cloudrun.ps1</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
