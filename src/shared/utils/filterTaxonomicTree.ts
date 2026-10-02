import { TaxonomicTreeNode } from '../types/taxonomicTree.ts';

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Filtra a árvore taxonômica por busca textual em tempo real,
 * preservando a integridade da hierarquia de pais caso algum filho corresponda.
 * Suporta normalização de acentos (ex: "cranio" acha "Crânio") e case-insensitivity.
 */
export function filterTaxonomicTree(
  nodes: TaxonomicTreeNode[],
  query: string
): TaxonomicTreeNode[] {
  const rawQ = query.trim();
  if (!rawQ) return nodes;

  const q = normalizeText(rawQ);

  return nodes
    .map((node) => {
      const normPt = normalizeText(node.namePt);
      const normTA2 = node.nameTA2 ? normalizeText(node.nameTA2) : '';
      const normMesh = node.meshName ? normalizeText(node.meshName) : '';
      const normId = normalizeText(node.id);

      // Se for folha, verifica correspondência no nome em português, latim ou identificador
      if (node.type === 'leaf') {
        const matchPt = normPt.includes(q);
        const matchTA2 = normTA2.includes(q);
        const matchMesh = normMesh.includes(q);
        const matchId = normId.includes(q);

        return matchPt || matchTA2 || matchMesh || matchId ? node : null;
      }

      // Se for ramo (sistema, região, sub-região), verifica se o próprio ramo combina com o nome
      const groupMatch = normPt.includes(q) || normTA2.includes(q);

      if (groupMatch) {
        // Se o próprio grupo corresponde, mantém todos os seus filhos intactos
        return node;
      }

      // Caso contrário, filtra recursivamente os filhos
      if (node.children && node.children.length > 0) {
        const filteredChildren = filterTaxonomicTree(node.children, rawQ);
        if (filteredChildren.length > 0) {
          const allDescendants = new Set<string>();
          for (const child of filteredChildren) {
            for (const id of child.descendantIds) {
              allDescendants.add(id);
            }
          }
          return {
            ...node,
            children: filteredChildren,
            itemCount: allDescendants.size,
            descendantIds: Array.from(allDescendants),
          };
        }
      }

      return null;
    })
    .filter((node): node is TaxonomicTreeNode => node !== null);
}
