import { TaxonomicTreeNode } from '../types/taxonomicTree.ts';

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Filtra a árvore taxonômica por região corporal topográfica (ex.: 'cranium', 'spine', 'thorax', 'upper_limb', 'pelvis', 'lower_limb').
 * Mantém a hierarquia de sistemas e subcamadas, recalculando descendantIds e itemCount para a região ativa.
 */
export function filterTreeByRegion(
  nodes: TaxonomicTreeNode[],
  region: string
): TaxonomicTreeNode[] {
  if (!region || region === 'all') return nodes;
  const targetReg = region === 'spine' ? 'vertebral_column' : region;

  return nodes
    .map((node) => {
      if (node.type === 'leaf') {
        return node.regionId === targetReg || node.regionId === 'systemic' ? node : null;
      }

      if (node.type === 'region' && node.regionId) {
        return node.regionId === targetReg || node.regionId === 'systemic' ? node : null;
      }

      if (node.children && node.children.length > 0) {
        const filteredChildren = filterTreeByRegion(node.children, region);
        if (filteredChildren.length > 0) {
          const allDescendants = new Set<string>();
          let totalLeaves = 0;
          for (const child of filteredChildren) {
            totalLeaves += child.itemCount;
            for (const id of child.descendantIds) {
              allDescendants.add(id);
            }
          }
          return {
            ...node,
            children: filteredChildren,
            itemCount: totalLeaves,
            descendantIds: Array.from(allDescendants),
          };
        }
      }

      return null;
    })
    .filter((node): node is TaxonomicTreeNode => node !== null);
}

/**
 * Filtra a árvore taxonômica por busca textual em tempo real (suportando múltiplos termos não contíguos),
 * preservando a integridade da hierarquia de pais caso algum filho corresponda.
 * Suporta normalização de acentos (ex: "cranio" acha "Crânio") e case-insensitivity.
 */
export function filterTaxonomicTree(
  nodes: TaxonomicTreeNode[],
  query: string,
  ancestorContext = ''
): TaxonomicTreeNode[] {
  const rawQ = query.trim();
  if (!rawQ) return nodes;

  const q = normalizeText(rawQ);
  const tokens = q.split(/\s+/).filter(Boolean);

  return nodes
    .map((node) => {
      const normPt = normalizeText(node.namePt);
      const normTA2 = node.nameTA2 ? normalizeText(node.nameTA2) : '';
      const normMesh = node.meshName ? normalizeText(node.meshName) : '';
      const normId = normalizeText(node.id);
      const combinedLeafText = `${ancestorContext} ${normPt} ${normTA2} ${normMesh} ${normId}`;

      // Se for folha, verifica se todos os tokens buscados estão presentes nos campos da estrutura + pastas ancestrais
      if (node.type === 'leaf') {
        const matchesAllTokens = tokens.every((token) => combinedLeafText.includes(token));
        return matchesAllTokens ? node : null;
      }

      // Se for ramo (sistema, região, sub-região), verifica se o próprio ramo combina com o nome
      const nextAncestorContext = `${ancestorContext} ${normPt} ${normTA2}`.trim();
      const groupMatch = tokens.every((token) => nextAncestorContext.includes(token));

      if (groupMatch) {
        // Se o próprio grupo corresponde, mantém todos os seus filhos intactos
        return node;
      }

      // Caso contrário, filtra recursivamente os filhos propagando o contexto ancestral
      if (node.children && node.children.length > 0) {
        const filteredChildren = filterTaxonomicTree(node.children, rawQ, nextAncestorContext);
        if (filteredChildren.length > 0) {
          const allDescendants = new Set<string>();
          let totalLeaves = 0;
          for (const child of filteredChildren) {
            totalLeaves += child.itemCount;
            for (const id of child.descendantIds) {
              allDescendants.add(id);
            }
          }
          return {
            ...node,
            children: filteredChildren,
            itemCount: totalLeaves,
            descendantIds: Array.from(allDescendants),
          };
        }
      }

      return null;
    })
    .filter((node): node is TaxonomicTreeNode => node !== null);
}
