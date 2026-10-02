import { ZAnatomyItem } from '../constants/zAnatomyCatalog.ts';

export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';

export type TaxonomicNodeType = 'system' | 'region' | 'subregion' | 'leaf';

export interface TaxonomicTreeNode {
  id: string;
  namePt: string;
  nameTA2?: string;
  type: TaxonomicNodeType;
  depth: number;
  itemCount: number;
  descendantIds: string[];
  children?: TaxonomicTreeNode[];
  data?: ZAnatomyItem;
  systemId?: string;
  regionId?: string;
  meshName?: string;
}
