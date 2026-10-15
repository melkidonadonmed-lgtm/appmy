import React, { useEffect, useState, useMemo } from 'react';
import {
  HardDriveDownload,
  Download,
  CheckCircle2,
  Cpu,
  Zap,
  Trash2,
} from 'lucide-react';
import {
  ANATOMY_PARTS_MANIFEST,
  getCachedPartIds,
  downloadPartToOfflineCache,
  removePartFromOfflineCache,
  exportPartGlbToDisk,
} from '../../../lib/modelCacheManager.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { ActiveAnatomicalSystem } from '../../../../shared/types/anatomy.ts';

export const OfflinePartsManagerSection: React.FC = () => {
  const selectivePartLoading = useAnatomyStore((s) => s.selectivePartLoading);
  const setSelectivePartLoading = useAnatomyStore((s) => s.setSelectivePartLoading);
  const loadedParts = useAnatomyStore((s) => s.loadedParts);
  const toggleLoadedPart = useAnatomyStore((s) => s.toggleLoadedPart);
  const cachedParts = useAnatomyStore((s) => s.cachedParts);
  const markPartCached = useAnatomyStore((s) => s.markPartCached);
  const biologicalSex = useAnatomyStore((s) => s.biologicalSex);

  const [downloadingPart, setDownloadingPart] = useState<ActiveAnatomicalSystem | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [batchDownloading, setBatchDownloading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    getCachedPartIds().then((ids) => {
      if (!mounted) return;
      ids.forEach((id) => markPartCached(id, true));
    });
    return () => {
      mounted = false;
    };
  }, [markPartCached]);

  const gpuStats = useMemo(() => {
    let mountedMb = 0;
    let mountedMeshes = 0;
    for (const part of ANATOMY_PARTS_MANIFEST) {
      if (!selectivePartLoading || loadedParts.has(part.id)) {
        mountedMb += part.sizeMb;
        mountedMeshes += part.meshCount;
      }
    }
    return {
      mountedMb: mountedMb.toFixed(1),
      mountedMeshes,
    };
  }, [selectivePartLoading, loadedParts]);

  const handleDownloadPart = async (partId: ActiveAnatomicalSystem) => {
    if (downloadingPart) return;
    setDownloadingPart(partId);
    setDownloadProgress(0);
    const ok = await downloadPartToOfflineCache(partId, (pct) => {
      setDownloadProgress(pct);
    });
    if (ok) {
      markPartCached(partId, true);
    }
    setDownloadingPart(null);
  };

  const handleDownloadLoadedPartsBatch = async () => {
    if (batchDownloading || downloadingPart) return;
    setBatchDownloading(true);
    for (const part of ANATOMY_PARTS_MANIFEST) {
      if (loadedParts.has(part.id) && !cachedParts.has(part.id)) {
        setDownloadingPart(part.id);
        setDownloadProgress(0);
        const ok = await downloadPartToOfflineCache(part.id, (pct) => setDownloadProgress(pct));
        if (ok) {
          markPartCached(part.id, true);
        }
      }
    }
    setDownloadingPart(null);
    setBatchDownloading(false);
  };

  const handleRemoveCachedPart = async (partId: ActiveAnatomicalSystem) => {
    const ok = await removePartFromOfflineCache(partId);
    if (ok) {
      markPartCached(partId, false);
    }
  };

  return (
    <div className="filter-section-card" data-testid="offline-parts-manager">
      <div className="filter-section-header">
        <div className="filter-section-title">
          <HardDriveDownload size={14} strokeWidth={1.5} className="filter-icon-accent" />
          <span>Download de Partes (.GLB) & Otimizador de FPS</span>
        </div>
        <span className="filter-badge-value">
          {gpuStats.mountedMeshes} malhas ({gpuStats.mountedMb} MB)
        </span>
      </div>

      <p className="filter-helper-text">
        Baixe os sistemas em cache offline para não recarregar toda vez e escolha quais partes montar na GPU para manter 60 FPS estáveis.
      </p>

      {/* Alternador de Modo Alta Performance (Carregamento Seletivo na GPU) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.45rem',
          padding: '0.45rem 0.55rem',
          borderRadius: '0.45rem',
          background: 'rgba(15, 23, 42, 0.45)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '0.45rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Zap size={12} strokeWidth={1.5} />
            <span>Modo Alta Performance (Sob Demanda)</span>
          </span>
          <span style={{ fontSize: '0.67rem', color: 'var(--text-muted)' }}>
            {selectivePartLoading
              ? `Ativo: monta apenas ${loadedParts.size} partes selecionadas na GPU`
              : 'Desativado: todos os 11 sistemas (35.5 MB) montados na GPU'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSelectivePartLoading(!selectivePartLoading)}
          className={`layer-opacity-pill ${selectivePartLoading ? 'active' : ''}`}
          aria-pressed={selectivePartLoading}
        >
          {selectivePartLoading ? 'Alto FPS Ativo' : 'Ativar Alto FPS'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.5rem' }}>
        <button
          type="button"
          onClick={handleDownloadLoadedPartsBatch}
          disabled={batchDownloading || Boolean(downloadingPart)}
          className="filter-action-btn"
          style={{ flex: 1, justifyContent: 'center' }}
          title="Salvar todas as partes ativas no CacheStorage do navegador para uso instantâneo sem internet"
        >
          <HardDriveDownload size={13} strokeWidth={1.5} />
          <span>
            {batchDownloading
              ? 'Salvando Pacote Offline...'
              : `Salvar Ativos Offline (${cachedParts.size}/${ANATOMY_PARTS_MANIFEST.length})`}
          </span>
        </button>
      </div>

      {/* Lista de Partes .GLB Individuais */}
      <div className="layer-Peel-list">
        {ANATOMY_PARTS_MANIFEST.map((part) => {
          const isMountedInGpu = !selectivePartLoading || loadedParts.has(part.id);
          const isCached = cachedParts.has(part.id);
          const isDownloadingThis = downloadingPart === part.id;

          return (
            <div
              key={part.id}
              className={`layer-peel-item ${isMountedInGpu ? 'active-layer' : ''}`}
              style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.35rem', padding: '0.5rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.35rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.77rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {part.labelPt}
                  </span>
                  <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                    {part.sizeMb.toFixed(2)} MB • {part.meshCount} malhas 3D • Impacto FPS:{' '}
                    {part.fpsImpact === 'high' ? 'Alto' : part.fpsImpact === 'medium' ? 'Médio' : 'Baixo'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => toggleLoadedPart(part.id)}
                    className={`layer-opacity-pill ${isMountedInGpu ? 'active' : ''}`}
                    title={
                      isMountedInGpu
                        ? 'Parte montada na GPU (clique para descarregar da VRAM e ganhar FPS)'
                        : 'Parte descarregada da GPU (clique para montar no 3D)'
                    }
                  >
                    <Cpu size={11} strokeWidth={1.5} />
                    <span style={{ marginLeft: '0.2rem' }}>{isMountedInGpu ? 'Na GPU' : 'Off'}</span>
                  </button>

                  {isCached ? (
                    <button
                      type="button"
                      onClick={() => handleRemoveCachedPart(part.id)}
                      className="layer-opacity-pill active"
                      title="Salvo em Cache Offline no navegador (clique para limpar cache desta parte)"
                    >
                      <CheckCircle2 size={11} strokeWidth={1.5} />
                      <span style={{ marginLeft: '0.2rem' }}>Offline</span>
                      <Trash2 size={10} strokeWidth={1.5} style={{ marginLeft: '0.2rem', opacity: 0.7 }} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDownloadPart(part.id)}
                      disabled={Boolean(downloadingPart)}
                      className="layer-opacity-pill"
                      title={`Baixar ${part.labelPt} (${part.sizeMb} MB) para Cache Offline instantâneo`}
                    >
                      <HardDriveDownload size={11} strokeWidth={1.5} />
                      <span style={{ marginLeft: '0.2rem' }}>
                        {isDownloadingThis ? `${downloadProgress}%` : 'Cache'}
                      </span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => exportPartGlbToDisk(part.id, biologicalSex)}
                    className="layer-opacity-pill"
                    title={`Baixar arquivo .GLB (${part.sizeMb} MB) diretamente para o seu computador`}
                  >
                    <Download size={11} strokeWidth={1.5} />
                    <span style={{ marginLeft: '0.15rem' }}>.GLB</span>
                  </button>
                </div>
              </div>

              <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.3 }}>
                {part.functionalSummaryPt}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
