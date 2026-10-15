import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as THREE from 'three';
import { useAnatomyStore } from '../src/client/stores/useAnatomyStore.ts';
import { Z_ANATOMY_CATALOG, Z_ANATOMY_BY_ID } from '../src/shared/constants/zAnatomyCatalog.ts';
import { FEMALE_REPRODUCTIVE_CATALOG } from '../src/shared/constants/femaleReproductiveCatalog.ts';
import { buildTaxonomicTree } from '../src/shared/utils/buildTaxonomicTree.ts';
import {
  bindExplodedNode,
  applyExplodedStep,
} from '../src/core/explodedEngine.ts';
import {
  computeTwoFingerMetrics,
  computeTwoFingerTouchDelta,
  computeTrackpadTwoFingerDelta,
  applyNavigationDeltaToRig,
} from '../src/core/navigationGestures.ts';
import { getAnatomicalLandmark } from '../src/client/lib/dissection-planes.ts';
import {
  determineSurgicalLayer,
  isFasciaOrAponeurosis,
} from '../src/core/surgicalLayers.ts';
import { updateMeshVisibility } from '../src/core/visibilityManager.ts';

describe('Auditoria Matemática, Sincronização de Sexo Biológico e Navegação por Pastas', () => {
  beforeEach(() => {
    useAnatomyStore.getState().setAllSystems();
    useAnatomyStore.setState({
      biologicalSex: 'male',
      hiddenNodeIds: new Set<string>(),
      selectedNodeId: null,
      isolatedOnly: false,
      explosionProgress: 0,
    });
  });

  describe('1. Sincronização de Sexo Biológico (Masculino vs Feminino - Zero Cruzamento)', () => {
    it('deve indexar todas as 36 estruturas do aparelho reprodutor feminino no catálogo global', () => {
      expect(FEMALE_REPRODUCTIVE_CATALOG.length).toBe(36);
      expect(Z_ANATOMY_BY_ID['za:vh_f_uterus_body']).toBeDefined();
      expect(Z_ANATOMY_BY_ID['za:vh_f_uterus_body'].namePtBr).toContain('Útero');
      expect(Z_ANATOMY_BY_ID['za:vh_f_uterus_cervix']).toBeDefined();
    });

    it('deve alternar a pasta Sistema Reprodutor na Árvore TA2 entre Masculino (14 peças) e Feminino (36 peças)', () => {
      const maleTree = buildTaxonomicTree(Z_ANATOMY_CATALOG, 'male');
      const femaleTree = buildTaxonomicTree(Z_ANATOMY_CATALOG, 'female');

      const maleRepro = maleTree.find((n) => n.id === 'sys_reproductive')!;
      const femaleRepro = femaleTree.find((n) => n.id === 'sys_reproductive')!;

      expect(maleRepro).toBeDefined();
      expect(femaleRepro).toBeDefined();
      expect(maleRepro.namePt).toContain('Masculino');
      expect(femaleRepro.namePt).toContain('Feminino');

      const maleCanonical = maleRepro.descendantIds.filter((id) => id.startsWith('za:'));
      const femaleCanonical = femaleRepro.descendantIds.filter((id) => id.startsWith('za:'));

      expect(maleCanonical.length).toBe(14);
      expect(femaleCanonical.length).toBe(36);
      expect(femaleCanonical).toContain('za:vh_f_uterus_body');
      expect(femaleCanonical).not.toContain('za:prostate');
    });

    it('deve ativar automaticamente o sexo Feminino ao ligar a camada Tegumentar/Mamária via toggleSystemPeel', () => {
      const store = useAnatomyStore.getState();
      expect(store.biologicalSex).toBe('male');

      // Oculta primeiro e depois ativa, ou ativa diretamente
      store.toggleSystemPeel('integumentary');
      store.toggleSystemPeel('integumentary');

      expect(useAnatomyStore.getState().biologicalSex).toBe('female');
    });
  });

  describe('2. Descascar Camadas de Fora para Dentro (toggleSystemPeel sem sumir o interior)', () => {
    it('deve ocultar apenas a camada clicada mantendo todos os sistemas internos visíveis', () => {
      const store = useAnatomyStore.getState();
      expect(store.activeSystems.has('all')).toBe(true);
      const sampleMuscle = Z_ANATOMY_CATALOG.find((i) => i.system === 'muscular')!;
      const sampleBone = Z_ANATOMY_CATALOG.find((i) => i.system === 'skeletal')!;

      // Usuário clica para desmarcar/descascar a 2ª camada (Músculos)
      store.toggleSystemPeel('muscular');

      const stateAfterPeel = useAnatomyStore.getState();
      // O modo 'all' continua ativo e os órgãos internos (ossos, coração, pulmões) NÃO somem!
      expect(stateAfterPeel.activeSystems.has('all')).toBe(true);
      expect(stateAfterPeel.hiddenNodeIds.has(sampleMuscle.id)).toBe(true);
      expect(stateAfterPeel.hiddenNodeIds.has(sampleBone.id)).toBe(false);

      // Clicar novamente restaura a camada muscular
      stateAfterPeel.toggleSystemPeel('muscular');
      expect(useAnatomyStore.getState().hiddenNodeIds.has(sampleMuscle.id)).toBe(false);
    });
  });

  describe('3. Proporcionalidade e Linearidade Matemática da Exploded View', () => {
    it('deve preservar a proporcionalidade radial entre vetores sub-unitários sem distorção por normalize()', () => {
      const innerMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1));
      innerMesh.userData = {
        id: 'za:inner_test',
        sistema: 'muscular',
        eixoExplosao: [0.12, 0, 0],
        distanciaMaxima: 0.4,
      };

      const outerMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1));
      outerMesh.userData = {
        id: 'za:outer_test',
        sistema: 'muscular',
        eixoExplosao: [0.95, 0, 0],
        distanciaMaxima: 0.4,
      };

      const innerBinding = bindExplodedNode(innerMesh, 'all');
      const outerBinding = bindExplodedNode(outerMesh, 'all');

      // A peça externa deve deslocar significativamente mais que a peça interna
      expect(outerBinding.targetOffset.x).toBeGreaterThan(innerBinding.targetOffset.x * 5);
    });

    it('deve aplicar avanço 100% linear P(t) = P0 + V * t em passo único sem atraso exponencial', () => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1));
      mesh.position.set(1.0, 2.0, 3.0);
      mesh.userData = {
        id: 'za:linear_test',
        sistema: 'skeletal',
        eixoExplosao: [0.5, 0, 0],
        distanciaMaxima: 0.4,
      };

      const binding = bindExplodedNode(mesh, 'all');
      applyExplodedStep([binding], 0.5);

      // Deve atingir exatamente 50% do deslocamento na primeira chamada
      expect(mesh.position.x).toBeCloseTo(1.0 + binding.targetOffset.x * 0.5, 5);
    });
  });

  describe('4. Gesture Locking Determinístico em navigationGestures.ts', () => {
    it('deve travar o gesto em "pinch" durante pinça evitando rotação e elevação simultâneas', () => {
      const prev = computeTwoFingerMetrics(
        { x: 100, y: 200 },
        { x: 200, y: 200 },
        'unlocked'
      );
      // Dedos se afastam fortemente (pinch zoom) com leve oscilação vertical
      const curr = computeTwoFingerMetrics(
        { x: 80, y: 202 },
        { x: 225, y: 202 }
      );

      const delta = computeTwoFingerTouchDelta(prev, curr, 'pan-rotate');
      expect(delta.lockedIntent).toBe('pinch');
      expect(delta.dollyScale).not.toBe(1);
      expect(delta.verticalPanDelta).toBe(0);
      expect(delta.azimuthRotateDelta).toBe(0);
    });

    it('deve normalizar WheelEvent.deltaMode e isolar o eixo dominante no trackpad', () => {
      const lineDelta = computeTrackpadTwoFingerDelta(0, 3, false, false, 'pan-rotate', 1); // deltaMode 1 = linhas
      expect(lineDelta.verticalPanDelta).not.toBe(0);
      expect(lineDelta.azimuthRotateDelta).toBe(0);
    });
  });

  describe('5. Classificação de Ligamentos Profundos (Camada 4) e Isolamento Resiliente', () => {
    it('deve classificar ligamentos articulares profundos na Camada 4 (Esquelética) e não na Camada 2', () => {
      expect(isFasciaOrAponeurosis('Anterior cruciate ligament', 'Ligamento cruzado anterior')).toBe(false);
      expect(determineSurgicalLayer('skeletal', 'Anterior cruciate ligament', 'Ligamento cruzado anterior')).toBe(4);
      expect(determineSurgicalLayer('muscular', 'Iliofemoral ligament', 'Ligamento iliofemoral')).toBe(4);
      // Ligamento suspensor da mama permanece na Camada 1 (Tegumento)
      expect(determineSurgicalLayer('integumentary', 'VH_F_suspensory_ligaments_L', 'Ligamentos Suspensores da Mama')).toBe(1);
    });

    it('deve isolar corretamente uma peça selecionada mesmo quando já existem peças ocultadas manualmente (hiddenIds.size > 0)', () => {
      const selectedMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1));
      selectedMesh.name = 'Frontal_bone';
      selectedMesh.userData = { id: 'za:frontal_bone', camadaProfundidade: 4, __isCatalogItem: true };

      const otherCatalogMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1));
      otherCatalogMesh.name = 'Mandible';
      otherCatalogMesh.userData = { id: 'za:mandible', camadaProfundidade: 4, __isCatalogItem: true };

      const mat1 = new THREE.MeshStandardMaterial();
      const mat2 = new THREE.MeshStandardMaterial();

      // Apenas 1 peça oculta manualmente + modo Isolar ativado para 'za:frontal_bone'
      const state = {
        hiddenIds: new Set<string>(['za:clavicle_l']),
        selectedId: 'za:frontal_bone',
        activeDepth: 1,
        ghostMode: false,
        isolatedOnly: true,
      };

      updateMeshVisibility(selectedMesh, state, mat1, '#e8dfd1', 1.0);
      updateMeshVisibility(otherCatalogMesh, state, mat2, '#e8dfd1', 1.0);

      expect(selectedMesh.visible).toBe(true);
      expect(otherCatalogMesh.visible).toBe(false);
    });
  });

  describe('6. Edge Cases de Navegação 3D, Limites de Corte e Higiene Tátil / Raiz', () => {
    it('deve proteger computeTwoFingerTouchDelta contra distância zero, viewport nulo e modo "zoom"', () => {
      const zeroPrev = computeTwoFingerMetrics({ x: 50, y: 50 }, { x: 50, y: 50 }, 'unlocked');
      const zeroCurr = computeTwoFingerMetrics({ x: 50, y: 50 }, { x: 50, y: 50 }, 'unlocked');
      const zeroDelta = computeTwoFingerTouchDelta(zeroPrev, zeroCurr, 0, -100);
      expect(Number.isFinite(zeroDelta.verticalPanDelta)).toBe(true);
      expect(Number.isFinite(zeroDelta.azimuthRotateDelta)).toBe(true);
      expect(zeroDelta.dollyScale).toBe(1.0);

      const zoomPrev = computeTwoFingerMetrics({ x: 100, y: 100 }, { x: 200, y: 100 }, 'unlocked');
      const zoomCurr = computeTwoFingerMetrics({ x: 90, y: 120 }, { x: 210, y: 120 }, 'unlocked');
      const zoomDelta = computeTwoFingerTouchDelta(zoomPrev, zoomCurr, 'zoom');
      expect(zoomDelta.lockedIntent).toBe('pinch');
      expect(zoomDelta.verticalPanDelta).toBe(0);
      expect(zoomDelta.azimuthRotateDelta).toBe(0);
      expect(zoomDelta.dollyScale).toBeLessThan(1.0);
    });

    it('deve aplicar applyNavigationDeltaToRig com limites estritos e reprodutibilidade Pass@10 sem vazamento de estado', () => {
      const results: string[] = [];
      for (let i = 0; i < 10; i++) {
        const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        cam.position.set(0, 0.5, 3.0);
        const target = new THREE.Vector3(0, 0.5, 0);
        applyNavigationDeltaToRig(
          cam,
          target,
          { verticalPanDelta: 50, azimuthRotateDelta: 0.25, dollyScale: 100 },
          { minY: -1.5, maxY: 1.8, minDistance: 0.5, maxDistance: 8.0 }
        );
        expect(target.y).toBeCloseTo(1.8, 5);
        const dist = cam.position.distanceTo(target);
        expect(dist).toBeCloseTo(8.0, 4);
        results.push(`${cam.position.x.toFixed(6)},${cam.position.y.toFixed(6)},${cam.position.z.toFixed(6)}`);
      }
      expect(new Set(results).size).toBe(1);
    });

    it('deve resolver marcos anatômicos nos limites exatos [-3.0, 3.0] e retornar fallback seguro fora do intervalo', () => {
      expect(getAnatomicalLandmark('sagittal', -3.0).namePtBr).toContain('Lateral Esquerdo');
      expect(getAnatomicalLandmark('sagittal', 3.0).namePtBr).toContain('Lateral Direito');
      expect(getAnatomicalLandmark('axial', -999).namePtBr).toBeDefined();
      expect(getAnatomicalLandmark('coronal', 999).namePtBr).toBeDefined();
    });

    it('deve manter a raiz higienizada e o CSS tátil em conformidade com kebab-case e prefers-reduced-motion', () => {
      const rootDir = path.resolve(__dirname, '..');
      expect(fs.existsSync(path.join(rootDir, 'designer.md'))).toBe(false);
      expect(fs.existsSync(path.join(rootDir, 'dataconnect'))).toBe(false);
      expect(fs.existsSync(path.join(rootDir, 'DESIGN.md'))).toBe(true);
      expect(fs.existsSync(path.join(rootDir, 'scripts', 'deploy-cloudrun.ps1'))).toBe(true);

      const cssContent = fs.readFileSync(path.join(rootDir, 'src', 'client', 'index.css'), 'utf-8');
      expect(cssContent).toContain('--font-display:');
      expect(cssContent).toContain('.btn-tactile');
      expect(cssContent).toContain('.card-tactile');
      expect(cssContent).toContain('.neuro-equation-chip');
      expect(cssContent).not.toContain('.neuro-Equation-chip');
      expect(cssContent).toContain('prefers-reduced-motion: reduce');
      expect(cssContent).not.toMatch(/transition:\s*all\b/);
      expect(cssContent).not.toContain('rotate(0deg)');
      expect(cssContent).not.toContain('bookmarkFadeIn');

      const bodyCssAfterThemes = cssContent.slice(cssContent.indexOf('* {'));
      expect(bodyCssAfterThemes).not.toMatch(/#(0f172a|1e293b|334155|475569|64748b|94a3b8|cbd5e1|e2e8f0|f1f5f9|f8fafc)\b/);

      const appContent = fs.readFileSync(path.join(rootDir, 'src', 'client', 'App.tsx'), 'utf-8');
      expect(appContent).toContain('role="status"');
      expect(appContent).toContain('aria-live="polite"');
      expect(appContent).toContain('aria-busy={loadingHealth}');
    });
  });
});
