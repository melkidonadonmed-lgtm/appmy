import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { Z_ANATOMY_CATALOG } from '../src/shared/constants/zAnatomyCatalog.ts';
import { buildTaxonomicTree } from '../src/shared/utils/buildTaxonomicTree.ts';
import { filterTaxonomicTree } from '../src/shared/utils/filterTaxonomicTree.ts';

describe('Outliner A11y & CSS Design System Compliance Suite', () => {
  const cssPath = path.resolve(__dirname, '../src/client/index.css');
  const cssContent = fs.readFileSync(cssPath, 'utf-8');

  it('deve conter todas as classes CSS determinísticas do painel Outliner sem dependência do Tailwind', () => {
    const requiredClasses = [
      '.outliner-panel',
      '.outliner-collapsed-btn',
      '.outliner-header',
      '.outliner-title',
      '.outliner-subtitle',
      '.outliner-icon-btn',
      '.outliner-modules-card',
      '.outliner-modules-toggle',
      '.outliner-modules-body',
      '.outliner-module-row',
      '.outliner-module-badge-btn',
      '.outliner-slider-container',
      '.outliner-range-input',
      '.outliner-density-btn-group',
      '.outliner-density-btn',
      '.outliner-search-box',
      '.outliner-search-input',
      '.outliner-search-clear-btn',
      '.outliner-tree-viewport',
      '.outliner-empty-state',
      '.outliner-group',
      '.outliner-group-row',
      '.outliner-chevron-btn',
      '.outliner-checkbox-btn',
      '.outliner-group-title',
      '.outliner-count-badge',
      '.outliner-isolate-btn',
      '.outliner-group-children',
      '.outliner-item-row',
      '.outliner-item-eye-btn',
      '.outliner-item-labels',
      '.outliner-item-name-pt',
      '.outliner-item-name-ta2',
      '.outliner-footer',
    ];

    for (const className of requiredClasses) {
      expect(
        cssContent.includes(className),
        `Classe obrigatória ${className} ausente em index.css`
      ).toBe(true);
    }
  });

  it('deve possuir regras de foco acessível (focus-visible) para controles interativos', () => {
    expect(cssContent.includes(':focus-visible')).toBe(true);
    expect(cssContent.includes('outline: 2px solid var(--accent)')).toBe(true);
  });

  it('deve assegurar largura fixa e backdrop-filter no container do Outliner para isolamento do 3D', () => {
    expect(cssContent.includes('width: 320px;')).toBe(true);
    expect(cssContent.includes('backdrop-filter: blur(16px);')).toBe(true);
    expect(cssContent.includes('border-right: 1px solid var(--border);')).toBe(true);
  });

  it('deve filtrar a árvore com acentuação e case-insensitivity sem mutações colaterais', () => {
    const tree = buildTaxonomicTree(Z_ANATOMY_CATALOG);

    // Teste com busca em minúsculas
    const resLower = filterTaxonomicTree(tree, 'crânio');
    expect(resLower.length).toBeGreaterThan(0);

    // Teste com busca sem acento
    const resUnaccented = filterTaxonomicTree(tree, 'cranio');
    expect(resUnaccented.length).toBeGreaterThan(0);

    // Caso de borda: busca inexistente deve retornar array vazio
    const resEmpty = filterTaxonomicTree(tree, 'xyzNonExistentStructure999');
    expect(resEmpty).toEqual([]);
  });

  it('deve garantir que todos os nós da árvore taxonômica possuem linhagem e IDs únicos', () => {
    const tree = buildTaxonomicTree(Z_ANATOMY_CATALOG);
    const seenIds = new Set<string>();

    function inspect(nodes: typeof tree) {
      for (const n of nodes) {
        expect(seenIds.has(n.id), `ID duplicado detectado: ${n.id}`).toBe(false);
        seenIds.add(n.id);

        expect(n.depth).toBeGreaterThanOrEqual(1);
        expect(n.namePt.length).toBeGreaterThan(0);
        expect(n.descendantIds.length).toBeGreaterThan(0);

        if (n.children && n.children.length > 0) {
          inspect(n.children);
        }
      }
    }

    inspect(tree);
    expect(seenIds.size).toBeGreaterThan(100);
  });
});
