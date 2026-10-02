import { useState, useEffect } from 'react';
import {
  Layers,
  Server,
  Flame,
  GitBranch,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { SceneCanvas } from './components/canvas/SceneCanvas.tsx';
import { AnatomicalSidebar } from './components/ui/AnatomicalSidebar.tsx';
import { DissectionToolbar } from './components/ui/DissectionToolbar.tsx';
import { TelemetryOverlay } from './components/telemetry/TelemetryOverlay.tsx';
import { SkullDivision } from '../shared/constants/cranium.ts';
import { ActiveAnatomicalSystem, AnyAnatomicalNode, AnatomicalRegion } from './components/canvas/AnatomicalAtlasScene.tsx';
import { DissectionState } from '../shared/types/dissection.ts';
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
  const [activeMode, setActiveMode] = useState<'3d-atlas' | 'infra-dashboard'>('3d-atlas');

  // Estado do Motor 3D (Z-Anatomy: Esqueleto de 335 Ossos + Órgãos Reais)
  const [viewType, setViewType] = useState<'exploded' | 'realistic'>('realistic');
  const [realSkullOpacity, setRealSkullOpacity] = useState<number>(1.0);
  const [activeDivision, setActiveDivision] = useState<SkullDivision | 'all'>('all');
  const [activeSystem, setActiveSystem] = useState<ActiveAnatomicalSystem>('all');
  const [activeRegion, setActiveRegion] = useState<AnatomicalRegion>('all');
  const [layerPeelingLevel, setLayerPeelingLevel] = useState<number>(2);
  const [explosionProgress, setExplosionProgress] = useState<number>(0.0);
  const [selectedNode, setSelectedNode] = useState<AnyAnatomicalNode | null>(null);
  const [ghostMode, setGhostMode] = useState<boolean>(false);
  const [isolatedOnly, setIsolatedOnly] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState({ fps: 60, triangles: 0, drawCalls: 0 });

  // Estado da Ferramenta de Dissecção Tomográfica Multiplanar (MPR)
  const [dissection, setDissection] = useState<DissectionState>({
    visualMode: 'solid',
    activePlane: 'sagittal',
    offset: 0.0,
    inverted: false,
    showHelper: true,
  });

  // Estado da Infraestrutura (Cloud Run / Firebase)
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [healthError, setHealthError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoadingHealth(true);
    setHealthError(null);
    try {
      const res = await fetch('/api/health');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setHealth(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha ao conectar com a API Backend';
      setHealthError(message);
    } finally {
      setLoadingHealth(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="app-shell">
      {/* Barra de Navegação Superior */}
      <header className="top-nav">
        <div className="brand-wrapper">
          <Layers size={22} color="#38bdf8" />
          <h1>Atlas 3D de Anatomia</h1>
          <span className="status-badge" style={{ padding: '0.15rem 0.5rem', fontSize: '0.6875rem' }}>
            <span className="status-dot"></span>
            <span>Z-Anatomy: Esqueleto Completo (335 Ossos) & Órgãos Reais</span>
          </span>
        </div>

        <div className="nav-actions">
          {activeMode === '3d-atlas' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '0.5rem' }}>
              <div className="mode-toggle-group">
                <button
                  className={`mode-btn ${viewType === 'realistic' ? 'active' : ''}`}
                  onClick={() => setViewType('realistic')}
                  title="Corpo Humano Completo Z-Anatomy (335 Ossos + Vísceras com Exploded View Real)"
                >
                  Corpo Real (.GLB)
                </button>
                <button
                  className={`mode-btn ${viewType === 'exploded' ? 'active' : ''}`}
                  onClick={() => setViewType('exploded')}
                  title="Vista Didática por Peças Anatômicas Segmentadas"
                >
                  Vista Didática (Crânio)
                </button>
              </div>

              {viewType === 'realistic' && (
                <div className="mode-toggle-group" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '0.5rem' }}>
                  <button
                    className={`mode-btn ${realSkullOpacity === 1.0 ? 'active' : ''}`}
                    onClick={() => setRealSkullOpacity(1.0)}
                    title="Densidade 100% - Totalmente Sólido e Vívido"
                  >
                    🦴 Sólido (100%)
                  </button>
                  <button
                    className={`mode-btn ${realSkullOpacity === 0.35 ? 'active' : ''}`}
                    onClick={() => setRealSkullOpacity(0.35)}
                    title="Densidade 35% - Translúcido (Permite visualizar estruturas internas)"
                  >
                    ✨ Translúcido
                  </button>
                  <button
                    className={`mode-btn ${realSkullOpacity === 0.0 ? 'active' : ''}`}
                    onClick={() => setRealSkullOpacity(0.0)}
                    title="Ocultar Esqueleto para foco nas estruturas internas"
                  >
                    👁️ Oculto
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mode-toggle-group">
            <button
              className={`mode-btn ${activeMode === '3d-atlas' ? 'active' : ''}`}
              onClick={() => setActiveMode('3d-atlas')}
            >
              <Layers size={14} /> Atlas 3D
            </button>
            <button
              className={`mode-btn ${activeMode === 'infra-dashboard' ? 'active' : ''}`}
              onClick={() => setActiveMode('infra-dashboard')}
            >
              <Server size={14} /> Cloud & Telemetria
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-viewport">
        {activeMode === '3d-atlas' ? (
          <>
            {/* Medidor flutuante de Telemetria (FPS / VRAM) */}
            <TelemetryOverlay
              fps={telemetry.fps}
              triangles={telemetry.triangles}
              drawCalls={telemetry.drawCalls}
            />

            {/* Barra Clínica Flutuante de Dissecção Tomográfica Multiplanar (MPR) */}
            <DissectionToolbar
              dissection={dissection}
              onChange={setDissection}
            />

            {/* Canvas 3D WebGL */}
            <SceneCanvas
              viewType={viewType}
              realSkullOpacity={realSkullOpacity}
              explosionProgress={explosionProgress}
              selectedNode={selectedNode}
              onSelectNode={setSelectedNode}
              ghostMode={ghostMode}
              isolatedOnly={isolatedOnly}
              activeDivision={activeDivision}
              activeSystem={activeSystem}
              activeRegion={activeRegion}
              layerPeelingLevel={layerPeelingLevel}
              dissection={dissection}
              onTelemetryUpdate={setTelemetry}
            />

            {/* Painel Lateral / Bottom Sheet Adaptativo */}
            <AnatomicalSidebar
              explosionProgress={explosionProgress}
              onExplosionChange={setExplosionProgress}
              selectedNode={selectedNode}
              onSelectNode={setSelectedNode}
              ghostMode={ghostMode}
              onToggleGhost={() => setGhostMode(!ghostMode)}
              isolatedOnly={isolatedOnly}
              onToggleIsolated={() => setIsolatedOnly(!isolatedOnly)}
              activeDivision={activeDivision}
              onDivisionChange={setActiveDivision}
              activeSystem={activeSystem}
              onSystemChange={setActiveSystem}
              activeRegion={activeRegion}
              onRegionChange={setActiveRegion}
              layerPeelingLevel={layerPeelingLevel}
              onLayerPeelingChange={setLayerPeelingLevel}
            />
          </>
        ) : (
          /* Dashboard de Infraestrutura e Prontidão de Nuvem */
          <div className="dashboard-view">
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Prontidão de Nuvem & Microserviços</h2>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    Conexão entre o Google Cloud Run (Southamerica-East1 / US-Central1) e Firebase Hosting
                  </p>
                </div>
                <button className="btn btn-secondary" onClick={fetchHealth} disabled={loadingHealth}>
                  <RefreshCw size={14} className={loadingHealth ? 'animate-spin' : ''} />
                  <span>Atualizar Sondas</span>
                </button>
              </div>

              <div className="grid">
                {/* Card Cloud Run */}
                <div className="card">
                  <div className="card-title">
                    <Server size={18} color="#38bdf8" />
                    <span>Backend API (Cloud Run)</span>
                  </div>
                  <p className="card-description">
                    Serviço Express em Node.js com contratos de saúde e rewrites via Firebase Hosting.
                  </p>
                  <div className="code-box">
                    {loadingHealth ? (
                      <span>Carregando status...</span>
                    ) : healthError ? (
                      <span style={{ color: 'var(--danger)' }}>Erro: {healthError}</span>
                    ) : health ? (
                      <div>
                        <div><strong>Status:</strong> {health.status.toUpperCase()}</div>
                        <div><strong>Ambiente:</strong> {health.environment}</div>
                        <div><strong>Serviço:</strong> {health.service} (v{health.version})</div>
                        <div><strong>Uptime:</strong> {Math.round(health.uptime)}s</div>
                      </div>
                    ) : (
                      <span>Sem resposta</span>
                    )}
                  </div>
                </div>

                {/* Card Firebase */}
                <div className="card">
                  <div className="card-title">
                    <Flame size={18} color="#f59e0b" />
                    <span>Firebase Suite & Storage</span>
                  </div>
                  <p className="card-description">
                    Hosting CDN e regras de segurança para malhas .glb e banco Cloud Firestore.
                  </p>
                  <div className="code-box">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      {isFirebaseConfigured ? (
                        <>
                          <CheckCircle2 size={14} color="var(--success)" />
                          <span style={{ color: 'var(--success)' }}>Credenciais Ativas (.env)</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={14} color="var(--warning)" />
                          <span style={{ color: 'var(--warning)' }}>Modo Offline / Emulador Local</span>
                        </>
                      )}
                    </div>
                    <div><strong>Hosting:</strong> Configurado em <code>firebase.json</code></div>
                    <div><strong>Rewrites:</strong> <code>/api/**</code> direcionado sem CORS</div>
                  </div>
                </div>

                {/* Card CI/CD */}
                <div className="card">
                  <div className="card-title">
                    <GitBranch size={18} color="#818cf8" />
                    <span>GitHub Actions CI/CD</span>
                  </div>
                  <p className="card-description">
                    Esteira automatizada para validação de tipos, Vitest e deploy no Cloud Run.
                  </p>
                  <div className="code-box">
                    <div><strong>Workflow:</strong> <code>.github/workflows/deploy.yml</code></div>
                    <div><strong>Container:</strong> Docker multi-stage Alpine</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <ShieldCheck size={14} color="var(--success)" />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Contrato de porta dinâmica <code>$PORT</code> ativo
                    </span>
                  </div>
                </div>
              </div>

              {/* Botão de retorno rápido ao 3D */}
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <button className="btn" onClick={() => setActiveMode('3d-atlas')}>
                  <RotateCcw size={14} />
                  <span>Voltar para o Visualizador 3D</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
