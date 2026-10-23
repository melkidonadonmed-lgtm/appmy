import { describe, it, expect, beforeEach } from 'vitest';
import { Z_ANATOMY_CATALOG } from '../src/shared/constants/zAnatomyCatalog.ts';
import { buildTaxonomicTree, detectRegion } from '../src/shared/utils/buildTaxonomicTree.ts';
import { filterTaxonomicTree } from '../src/shared/utils/filterTaxonomicTree.ts';
import { useAnatomyStore, registerMeshWorldCenter } from '../src/client/stores/useAnatomyStore.ts';
import { isNodeInRegion } from '../src/client/components/canvas/RealBodyAtlas.tsx';

describe('Taxonomic Tree & State Management Suite', () => {
  const tree = buildTaxonomicTree(Z_ANATOMY_CATALOG);

  it('deve gerar a árvore taxonômica com todos os 11 sistemas ordenados estratigraficamente (de fora para dentro)', () => {
    expect(tree.length).toBe(11);

    // Ordem estratigráfica de dissecação (de fora para dentro):
    // 1. Tegumento -> 2. Muscular (Fáscia + Estriados) -> 3. Esquelético -> 4. Cardiovascular -> 5. Linfático -> 6. Nervoso -> Vísceras
    expect(tree[0].id).toBe('sys_integumentary');
    expect(tree[1].id).toBe('sys_muscular');
    expect(tree[2].id).toBe('sys_skeletal');
    expect(tree[0].type).toBe('system');
    expect(tree[0].children).toBeDefined();
    expect(tree[0].children!.length).toBeGreaterThan(0);

    // O Sistema Muscular deve expor as 4 subcamadas funcionais miofasciais
    const muscSubIds = tree[1].children!.map((c) => c.id);
    expect(muscSubIds).toEqual([
      'sub_muscular_fascia',
      'sub_muscular_superficial',
      'sub_muscular_deep',
      'sub_muscular_bursae',
    ]);
  });

  it('deve contabilizar e agregar os descendantIds em cada nível da hierarquia', () => {
    const skeletalSystem = tree.find((n) => n.id === 'sys_skeletal')!;
    expect(skeletalSystem).toBeDefined();
    expect(skeletalSystem.descendantIds.length).toBeGreaterThan(0);

    // O total de descendentes deve ser igual à soma dos descendentes das regiões filhas
    const sumChildren = skeletalSystem.children!.reduce(
      (acc, c) => acc + c.descendantIds.length,
      0
    );
    expect(skeletalSystem.descendantIds.length).toBe(sumChildren);
  });

  it('deve conter as folhas anatômicas legítimas correspondentes ao catálogo Z-Anatomy', () => {
    const craniumRegion = tree
      .find((n) => n.id === 'sys_skeletal')!
      .children!.find((r) => r.id === 'reg_skeletal_cranium')!;

    expect(craniumRegion).toBeDefined();
    expect(craniumRegion.descendantIds.length).toBeGreaterThan(0);

    // Encontra uma folha (ex: Osso Frontal ou Vômer)
    const allCraniumLeaves: string[] = [];
    function collectLeaves(node: typeof tree[0]) {
      if (node.type === 'leaf') {
        allCraniumLeaves.push(node.id);
      } else if (node.children) {
        node.children.forEach(collectLeaves);
      }
    }
    collectLeaves(craniumRegion);

    expect(allCraniumLeaves.length).toBeGreaterThan(0);
    expect(allCraniumLeaves.some((id) => id.includes('frontal') || id.includes('vomer'))).toBe(true);
  });

  it('deve filtrar estruturas por busca textual preservando a linhagem pai-filho', () => {
    const filtered = filterTaxonomicTree(tree, 'Frontal');
    expect(filtered.length).toBeGreaterThan(0);

    // Deve conter o sistema esquelético como ancestral
    const sys = filtered.find((n) => n.id === 'sys_skeletal');
    expect(sys).toBeDefined();

    // Deve conter a região do crânio
    const cranium = sys!.children!.find((r) => r.id === 'reg_skeletal_cranium');
    expect(cranium).toBeDefined();

    // Toda folha retornada deve combinar com "frontal" (case-insensitive)
    let foundFrontalLeaf = false;
    function checkLeaves(node: typeof tree[0]) {
      if (node.type === 'leaf') {
        if (
          node.namePt.toLowerCase().includes('frontal') ||
          (node.nameTA2 && node.nameTA2.toLowerCase().includes('frontal'))
        ) {
          foundFrontalLeaf = true;
        }
      } else if (node.children) {
        node.children.forEach(checkLeaves);
      }
    }
    checkLeaves(cranium!);
    expect(foundFrontalLeaf).toBe(true);
  });

  describe('Zustand useAnatomyStore Tri-State & Visibility', () => {
    beforeEach(() => {
      useAnatomyStore.getState().showAll();
    });

    it('deve calcular corretamente o estado do checkbox Tri-State', () => {
      const store = useAnatomyStore.getState();
      const testIds = ['mesh_a', 'mesh_b', 'mesh_c'];

      // Inicialmente todos visíveis -> 'checked'
      expect(store.getGroupCheckboxState(testIds)).toBe('checked');

      // Oculta um elemento -> 'indeterminate'
      store.toggleVisibility('mesh_a');
      expect(useAnatomyStore.getState().getGroupCheckboxState(testIds)).toBe('indeterminate');

      // Oculta todos -> 'unchecked'
      store.toggleVisibility('mesh_b');
      store.toggleVisibility('mesh_c');
      expect(useAnatomyStore.getState().getGroupCheckboxState(testIds)).toBe('unchecked');

      // Alterna o grupo inteiro de volta para visível
      useAnatomyStore.getState().toggleGroupVisibility(testIds);
      expect(useAnatomyStore.getState().getGroupCheckboxState(testIds)).toBe('checked');
    });

    it('deve isolar uma estrutura ocultando todas as outras', () => {
      const allIds = ['mesh_1', 'mesh_2', 'mesh_3', 'mesh_4'];
      const store = useAnatomyStore.getState();

      store.isolateNode('mesh_2', allIds);

      const state = useAnatomyStore.getState();
      expect(state.hiddenNodeIds.has('mesh_1')).toBe(true);
      expect(state.hiddenNodeIds.has('mesh_2')).toBe(false); // Mantido visível
      expect(state.hiddenNodeIds.has('mesh_3')).toBe(true);
      expect(state.hiddenNodeIds.has('mesh_4')).toBe(true);
    });

    it('deve restaurar a visibilidade de todas as estruturas com showAll', () => {
      const store = useAnatomyStore.getState();
      store.toggleVisibility('mesh_1');
      store.toggleVisibility('mesh_2');

      expect(useAnatomyStore.getState().hiddenNodeIds.size).toBe(2);

      useAnatomyStore.getState().showAll();
      expect(useAnatomyStore.getState().hiddenNodeIds.size).toBe(0);
    });

    it('deve ocultar 100% das estruturas (incluindo musculatura, fáscia e pele) ao desmarcar todos os grupos da árvore', () => {
      const store = useAnatomyStore.getState();
      // Desmarca cada sistema na árvore
      for (const sysNode of tree) {
        store.toggleGroupVisibility(sysNode.descendantIds);
      }

      const hiddenSet = useAnatomyStore.getState().hiddenNodeIds;
      const muscularItems = Z_ANATOMY_CATALOG.filter((i) => i.system === 'muscular');
      const integumentaryItems = Z_ANATOMY_CATALOG.filter((i) => i.system === 'integumentary');

      expect(muscularItems.length).toBeGreaterThan(600);
      expect(integumentaryItems.length).toBeGreaterThan(10);

      // Nenhuma malha muscular ou tegumentar pode permanecer visível
      for (const item of muscularItems) {
        expect(hiddenSet.has(item.id)).toBe(true);
        expect(hiddenSet.has(item.node)).toBe(true);
      }
      for (const item of integumentaryItems) {
        expect(hiddenSet.has(item.id)).toBe(true);
      }
    });

    it('deve permitir ocultar apenas a subcamada de Fáscias mantendo os Músculos Estriados visíveis', () => {
      const store = useAnatomyStore.getState();
      const muscNode = tree.find((n) => n.id === 'sys_muscular')!;
      const fasciaGroup = muscNode.children!.find((c) => c.id === 'sub_muscular_fascia')!;
      const supMuscleGroup = muscNode.children!.find((c) => c.id === 'sub_muscular_superficial')!;

      expect(fasciaGroup.descendantIds.length).toBeGreaterThan(80);
      expect(supMuscleGroup.descendantIds.length).toBeGreaterThan(100);

      // Desmarca apenas Fáscias
      store.toggleGroupVisibility(fasciaGroup.descendantIds);

      const state = useAnatomyStore.getState();
      expect(state.getGroupCheckboxState(fasciaGroup.descendantIds)).toBe('unchecked');
      expect(state.getGroupCheckboxState(supMuscleGroup.descendantIds)).toBe('checked');
      // O sistema muscular raiz fica 'indeterminate' (parcialmente visível) e continua ativo
      expect(state.getGroupCheckboxState(muscNode.descendantIds)).toBe('indeterminate');
      expect(state.isSystemActive('muscular')).toBe(true);
    });

    it('deve classificar 100% dos 2.562 nós anatômicos em regiões específicas (zero nós em systemic) e separar falanges do pé vs mão', () => {
      const systemicItems = Z_ANATOMY_CATALOG.filter((item) => detectRegion(item) === 'systemic');
      expect(systemicItems.length).toBe(0);

      const footPhalanx = Z_ANATOMY_CATALOG.find((i) =>
        i.nameEn.toLowerCase().includes('phalanx') && i.nameEn.toLowerCase().includes('foot')
      )!;
      expect(footPhalanx).toBeDefined();
      expect(detectRegion(footPhalanx)).toBe('lower_limb');
      expect(isNodeInRegion(footPhalanx, footPhalanx.node, 'lower_limb')).toBe(true);
      expect(isNodeInRegion(footPhalanx, footPhalanx.node, 'upper_limb')).toBe(false);

      const gastrocnemiusHead = Z_ANATOMY_CATALOG.find((i) =>
        i.nameEn.toLowerCase().includes('gastrocnemius')
      )!;
      expect(gastrocnemiusHead).toBeDefined();
      expect(detectRegion(gastrocnemiusHead)).toBe('lower_limb');
      expect(isNodeInRegion(gastrocnemiusHead, gastrocnemiusHead.node, 'cranium')).toBe(false);
    });

    it('deve higienizar nomes corrompidos (?x.l / ????????) e suportar busca multi-token não contígua', () => {
      let hasCorruptedLabel = false;
      function scanTree(nodes: typeof tree) {
        for (const n of nodes) {
          if (n.namePt.includes('???') || /^\?x/i.test(n.namePt)) {
            hasCorruptedLabel = true;
          }
          if (n.children) scanTree(n.children);
        }
      }
      scanTree(tree);
      expect(hasCorruptedLabel).toBe(false);

      const multiTokenResults = filterTaxonomicTree(tree, 'falange pe direito');
      expect(multiTokenResults.length).toBeGreaterThan(0);
    });

    it('deve reexibir, ativar sistema e focar câmera via selectAndFocusNode', () => {
      const sampleItem = Z_ANATOMY_CATALOG.find((i) => i.system === 'skeletal')!;
      registerMeshWorldCenter(sampleItem.id, [0.12, 1.42, 0.05]);

      const store = useAnatomyStore.getState();
      store.toggleVisibility(sampleItem.id);
      expect(useAnatomyStore.getState().hiddenNodeIds.has(sampleItem.id)).toBe(true);

      store.selectAndFocusNode(sampleItem.id);
      const nextState = useAnatomyStore.getState();
      expect(nextState.selectedNodeId).toBe(sampleItem.id);
      expect(nextState.hiddenNodeIds.has(sampleItem.id)).toBe(false);
      expect(nextState.cameraFocusTarget).toEqual([0.12, 1.42, 0.05]);
    });
  });
});

