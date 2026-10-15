import React, { useState, useMemo } from 'react';
import {
  Brain,
  Focus,
  Layers,
  Eye,
  EyeOff,
  Activity,
  Stethoscope,
  Search,
  Scissors,
  RotateCcw,
} from 'lucide-react';
import { ALL_NEUROLOGY_NODES, NeurologyNode } from '../../../../shared/constants/neurology.ts';
import { CRANIAL_NERVES_12 } from '../../../../shared/constants/cranialNervesCatalog.ts';
import { useAnatomyStore } from '../../../stores/useAnatomyStore.ts';
import { resolveNeuroClinicalTargetToCatalogId } from '../../../../shared/utils/neuroTargetMapper.ts';

type NeuroCategoryFilter =
  | 'all'
  | 'cortex'
  | 'deep_limbic'
  | 'brainstem_cerebellum'
  | 'cranial_nerves'
  | 'vascular_csf';

const CALVARIA_BONE_IDS = [
  'za:frontal_bone',
  'za:parietal_bone_l',
  'za:parietal_bone_r',
  'Frontal bone',
  'Parietal bone.l',
  'Parietal bone.r',
  'Parietal_bonel',
  'Parietal_boner',
  'fma:os_frontale',
  'fma:os_parietale_dexter',
  'fma:os_parietale_sinister',
];

export const NeuroAnatomyPanelSection: React.FC = () => {
  const [category, setCategory] = useState<NeuroCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const viewType = useAnatomyStore((s) => s.viewType);
  const setViewType = useAnatomyStore((s) => s.setViewType);
  const selectedNodeId = useAnatomyStore((s) => s.selectedNodeId);
  const hiddenNodeIds = useAnatomyStore((s) => s.hiddenNodeIds);
  const focusClinicalTargetIds = useAnatomyStore((s) => s.focusClinicalTargetIds);
  const applyPreset = useAnatomyStore((s) => s.applyPreset);
  const setClinicalStudioOpen = useAnatomyStore((s) => s.setClinicalStudioOpen);
  const setClinicalStudioTab = useAnatomyStore((s) => s.setClinicalStudioTab);
  const peelNodeOnClick = useAnatomyStore((s) => s.peelNodeOnClick);
  const systemOpacities = useAnatomyStore((s) => s.systemOpacities);
  const setSystemOpacity = useAnatomyStore((s) => s.setSystemOpacity);

  const isCalvariaPeeled = useMemo(
    () => hiddenNodeIds.has('za:frontal_bone') && hiddenNodeIds.has('za:parietal_bone_l'),
    [hiddenNodeIds]
  );

  const handleToggleCalvariaCraniotomy = () => {
    const state = useAnatomyStore.getState();
    const nextHidden = new Set(state.hiddenNodeIds);
    if (isCalvariaPeeled) {
      for (const id of CALVARIA_BONE_IDS) {
        nextHidden.delete(id);
      }
      useAnatomyStore.setState({ hiddenNodeIds: nextHidden });
    } else {
      peelNodeOnClick(
        'za:frontal_bone',
        'Calvária Craniana (Frontal + Parietais)',
        CALVARIA_BONE_IDS
      );
    }
  };

  const normalizedSearch = searchQuery
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const categorizeNode = (node: NeurologyNode): Exclude<NeuroCategoryFilter, 'all' | 'cranial_nerves'> => {
    if (
      node.id.includes('ventricul') ||
      node.id.includes('meninges') ||
      node.id.includes('circulus') ||
      node.region === 'ventricular_system'
    ) {
      return 'vascular_csf';
    }
    if (
      node.region === 'mesencephalon' ||
      node.region === 'rhombencephalon' ||
      node.region === 'cerebellum'
    ) {
      return 'brainstem_cerebellum';
    }
    if (
      node.region === 'diencephalon' ||
      node.id.includes('nuclei') ||
      node.id.includes('hippocampus') ||
      node.id.includes('fornix')
    ) {
      return 'deep_limbic';
    }
    return 'cortex';
  };

  const filteredNeuroNodes = useMemo(() => {
    if (category === 'cranial_nerves') return [];
    return ALL_NEUROLOGY_NODES.filter((node) => {
      if (node.id === 'fma:nervi_craniales_i_xii') return false;
      const cat = categorizeNode(node);
      if (category !== 'all' && cat !== category) return false;
      if (!normalizedSearch) return true;
      const hay = `${node.namePtBr} ${node.nameLatin} ${node.corticalBrodmannArea || ''} ${
        node.clinicalData?.functionalAction || ''
      } ${node.clinicalData?.clinicalSignificance || ''}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return hay.includes(normalizedSearch);
    });
  }, [category, normalizedSearch]);

  const filteredCranialNerves = useMemo(() => {
    if (category !== 'all' && category !== 'cranial_nerves') return [];
    return CRANIAL_NERVES_12.filter((cn) => {
      if (!normalizedSearch) return true;
      const hay = `${cn.romanNumeral} ${cn.namePtBr} ${cn.nameLatin} ${cn.cranialForamenName} ${cn.anatomicalFunction} ${cn.clinicalPathology}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return hay.includes(normalizedSearch);
    });
  }, [category, normalizedSearch]);

  const skullOpacityPct = Math.round((systemOpacities.skeletal ?? 1.0) * 100);

  return (
    <div className="tree-filters-container" data-testid="neuroanatomy-frontend-panel">
      {/* 1. Controle Direto de Cena Neuroanatômica 3D */}
      <div className="filter-section-card">
        <div className="filter-section-header">
          <div className="filter-section-title">
            <Brain size={14} strokeWidth={1.5} className="filter-icon-accent" />
            <span>Neuroanatomia 3D & Craniotomia</span>
          </div>
          <span className="filter-badge-value">
            {viewType === 'realistic' ? 'Malha Real .GLB' : 'Esquema Didático'}
          </span>
        </div>

        <p className="filter-helper-text">
          Explore o encéfalo real escaneado, núcleos da base, sistema ventricular e os 12 pares cranianos com transparência craniana automática.
        </p>

        <div className="filter-presets-grid" style={{ marginTop: '0.35rem' }}>
          <button
            type="button"
            onClick={() => {
              setViewType('realistic');
              applyPreset('neuroanatomy');
            }}
            className={`filter-preset-btn ${viewType === 'realistic' ? 'active' : ''}`}
            title="Ativar Encéfalo Real (.GLB) com Crânio Translúcido"
          >
            <Brain size={13} strokeWidth={1.5} />
            <span>Encéfalo Real (.GLB)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setViewType('exploded');
              useAnatomyStore.getState().setActiveSystem('nervous');
              useAnatomyStore.getState().setExplosionProgress(0.35);
            }}
            className={`filter-preset-btn ${viewType === 'exploded' ? 'active' : ''}`}
            title="Alternar para Esquema Didático Explosivo 3D dos Lobos e Núcleos"
          >
            <Layers size={13} strokeWidth={1.5} />
            <span>Esquema Didático 3D</span>
          </button>

          <button
            type="button"
            onClick={handleToggleCalvariaCraniotomy}
            className={`filter-preset-btn ${isCalvariaPeeled ? 'active' : ''}`}
            title="Retirar/Restaurar a Calota Craniana (Frontal + Parietais) para expor o Córtex"
          >
            {isCalvariaPeeled ? (
              <RotateCcw size={13} strokeWidth={1.5} />
            ) : (
              <Scissors size={13} strokeWidth={1.5} />
            )}
            <span>{isCalvariaPeeled ? 'Restaurar Calvária' : 'Retirar Calvária'}</span>
          </button>

          <button
            type="button"
            onClick={() => setClinicalStudioOpen(true)}
            className="filter-preset-btn"
            title="Abrir Estúdio Neuroclínico Completo (14 Forames, ASPECTS e Casos Clínicos)"
          >
            <Stethoscope size={13} strokeWidth={1.5} />
            <span>Estúdio Clínico</span>
          </button>
        </div>

        {/* Controle rápido de Translucidez da Caixa Craniana */}
        <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            Opacidade do Crânio ({skullOpacityPct}%):
          </span>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[
              { label: 'Oculto 0%', val: 0.0 },
              { label: 'Cristal 28%', val: 0.28 },
              { label: 'Sólido 100%', val: 1.0 },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSystemOpacity('skeletal', opt.val)}
                className={`layer-opacity-pill ${Math.abs((systemOpacities.skeletal ?? 1) - opt.val) < 0.05 ? 'active' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Filtro por Divisão Neuroanatômica + Busca */}
      <div className="filter-section-card">
        <div className="outliner-search-box" style={{ marginBottom: '0.45rem' }}>
          <Search size={13} strokeWidth={1.5} className="outliner-search-icon" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar giro, núcleo, nervo craniano, Brodmann..."
            className="outliner-search-input"
            aria-label="Filtrar estruturas de neuroanatomia"
          />
        </div>

        <div className="filter-region-pills">
          {[
            { id: 'all', label: 'Todos (34)' },
            { id: 'cortex', label: 'Córtex & Brodmann' },
            { id: 'deep_limbic', label: 'Diencéfalo & Base' },
            { id: 'brainstem_cerebellum', label: 'Tronco & Cerebelo' },
            { id: 'cranial_nerves', label: '12 Pares (NC I–XII)' },
            { id: 'vascular_csf', label: 'Ventrículos & Willis' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategory(tab.id as NeuroCategoryFilter)}
              className={`filter-region-pill ${category === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Lista Interativa de Estruturas Encefálicas com Foco 3D e Função */}
      {filteredNeuroNodes.length > 0 && (
        <div className="filter-section-card">
          <div className="filter-section-header">
            <div className="filter-section-title">
              <Eye size={14} strokeWidth={1.5} className="filter-icon-accent" />
              <span>Estruturas Encefálicas & Funcionais</span>
            </div>
            <span className="filter-badge-value">{filteredNeuroNodes.length}</span>
          </div>

          <div className="layer-Peel-list">
            {filteredNeuroNodes.map((node) => {
              const resolvedZaId = resolveNeuroClinicalTargetToCatalogId(node.id);
              const isSelected =
                selectedNodeId === node.id || selectedNodeId === resolvedZaId;
              const isHidden =
                hiddenNodeIds.has(node.id) || hiddenNodeIds.has(resolvedZaId);

              return (
                <div
                  key={node.id}
                  className={`layer-peel-item ${isSelected ? 'active-layer' : ''}`}
                  style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.35rem', padding: '0.55rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                    <button
                      type="button"
                      onClick={() => focusClinicalTargetIds([node.id])}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        color: 'var(--text-primary)',
                        flex: 1,
                      }}
                    >
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                        {node.namePtBr}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        {node.nameLatin} {node.corticalBrodmannArea ? `• ${node.corticalBrodmannArea}` : ''}
                      </span>
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <button
                        type="button"
                        onClick={() => focusClinicalTargetIds([node.id])}
                        className="layer-opacity-pill active"
                        title={`Focar ${node.namePtBr} no Modelo 3D`}
                      >
                        <Focus size={11} strokeWidth={1.5} />
                        <span style={{ marginLeft: '0.2rem' }}>3D</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          peelNodeOnClick(resolvedZaId, node.namePtBr, [node.id, resolvedZaId])
                        }
                        className="layer-opacity-pill"
                        title={isHidden ? 'Estrutura ocultada (use Desfazer para restaurar)' : `Retirar/Ocultar ${node.namePtBr} (Camada)`}
                      >
                        {isHidden ? <EyeOff size={11} strokeWidth={1.5} /> : <Scissors size={11} strokeWidth={1.5} />}
                      </button>
                    </div>
                  </div>

                  {node.clinicalData?.functionalAction && (
                    <p style={{ fontSize: '0.71rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.35 }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Função:</strong>{' '}
                      {node.clinicalData.functionalAction}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Lista Interativa dos 12 Pares de Nervos Cranianos (NC I–XII) */}
      {filteredCranialNerves.length > 0 && (
        <div className="filter-section-card">
          <div className="filter-section-header">
            <div className="filter-section-title">
              <Activity size={14} strokeWidth={1.5} className="filter-icon-accent" />
              <span>12 Pares Cranianos (NC I–XII)</span>
            </div>
            <button
              type="button"
              onClick={() => setClinicalStudioTab('nerves')}
              className="layer-opacity-pill"
              title="Abrir Semiotécnica Completa dos 12 Pares Cranianos"
            >
              Ver Semiotécnica
            </button>
          </div>

          <div className="layer-Peel-list">
            {filteredCranialNerves.map((cn) => {
              const resolvedZaId = resolveNeuroClinicalTargetToCatalogId(
                cn.targetNodeIds[0],
                cn.id
              );
              const isSelected = selectedNodeId === resolvedZaId;

              return (
                <div
                  key={cn.id}
                  className={`layer-peel-item ${isSelected ? 'active-layer' : ''}`}
                  style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.3rem', padding: '0.5rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {cn.romanNumeral} — {cn.namePtBr}
                      </span>
                      <span style={{ fontSize: '0.67rem', color: 'var(--text-muted)' }}>
                        {cn.modality} • Forame: {cn.cranialForamenName}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        focusClinicalTargetIds(cn.targetNodeIds, { cranialNerveId: cn.id })
                      }
                      className="layer-opacity-pill active"
                      title={`Localizar ${cn.romanNumeral} (${cn.namePtBr}) no Encéfalo 3D`}
                    >
                      <Focus size={11} strokeWidth={1.5} />
                      <span style={{ marginLeft: '0.2rem' }}>3D</span>
                    </button>
                  </div>

                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.32 }}>
                    {cn.anatomicalFunction}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
