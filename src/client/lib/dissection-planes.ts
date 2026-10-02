import * as THREE from 'three';
import { MprPlaneType, AnatomicalLandmark, PlaneVectorDef } from '../../shared/types/dissection.ts';

/**
 * Catálogo canônico de Marcos Anatômicos de corte tomográfico (Terminologia Anatomica).
 */
export const SAGITTAL_LANDMARKS: AnatomicalLandmark[] = [
  {
    offsetMin: -0.25,
    offsetMax: 0.25,
    namePtBr: 'Plano Sagital Mediano (Linha Média)',
    nameLatin: 'Planum medianum',
    clinicalSignificance: 'Septo nasal, foice do cérebro, corpo caloso, fossa hipofisária, traqueia e linha alba.',
  },
  {
    offsetMin: 0.25,
    offsetMax: 0.9,
    namePtBr: 'Plano Paramediano Direito',
    nameLatin: 'Planum paramedianum dextrum',
    clinicalSignificance: 'Lobo hepático direito, hilo pulmonar D, rim direito e veia cava inferior.',
  },
  {
    offsetMin: 0.9,
    offsetMax: 3.0,
    namePtBr: 'Plano Sagital Lateral Direito',
    nameLatin: 'Planum sagittale laterale dextrum',
    clinicalSignificance: 'Arco costal lateral direito, lobo temporal e parietal direito.',
  },
  {
    offsetMin: -0.9,
    offsetMax: -0.25,
    namePtBr: 'Plano Paramediano Esquerdo',
    nameLatin: 'Planum paramedianum sinistrum',
    clinicalSignificance: 'Ápice e ventrículo esquerdo do coração, estômago, rim esquerdo e brônquio esquerdo.',
  },
  {
    offsetMin: -3.0,
    offsetMax: -0.9,
    namePtBr: 'Plano Sagital Lateral Esquerdo',
    nameLatin: 'Planum sagittale laterale sinistrum',
    clinicalSignificance: 'Borda esplênica, cúpula diafragmática esquerda e gradil costal lateral.',
  },
];

export const CORONAL_LANDMARKS: AnatomicalLandmark[] = [
  {
    offsetMin: 0.55,
    offsetMax: 3.0,
    namePtBr: 'Plano Coronal Anterior (Facial / Ventral)',
    nameLatin: 'Planum coronale anterius',
    clinicalSignificance: 'Ossos nasais, maxila, mandíbula, esterno e parede toracoabdominal anterior.',
  },
  {
    offsetMin: 0.15,
    offsetMax: 0.55,
    namePtBr: 'Plano Coronal Torácico Anterior',
    nameLatin: 'Planum coronale thoracicum anterius',
    clinicalSignificance: 'Coração anterior (ventrículo direito), lobos pulmonares anteriores e lobo hepático anterior.',
  },
  {
    offsetMin: -0.3,
    offsetMax: 0.15,
    namePtBr: 'Plano Coronal Médio (Biauricular / Mediastinal)',
    nameLatin: 'Planum coronale medium',
    clinicalSignificance: 'Bifurcação traqueal (carina T4-T5), hilos pulmonares, fossa hipofisária e ducto torácico.',
  },
  {
    offsetMin: -0.75,
    offsetMax: -0.3,
    namePtBr: 'Plano Coronal Retroperitoneal',
    nameLatin: 'Planum coronale retroperitoneale',
    clinicalSignificance: 'Rins bilaterais, glândulas adrenais, aorta abdominal descendente e esôfago posterior.',
  },
  {
    offsetMin: -3.0,
    offsetMax: -0.75,
    namePtBr: 'Plano Coronal Posterior (Dorsal)',
    nameLatin: 'Planum coronale posterius',
    clinicalSignificance: 'Coluna vertebral, canal vertebral, medula espinhal e escápulas.',
  },
];

export const AXIAL_LANDMARKS: AnatomicalLandmark[] = [
  {
    offsetMin: 1.15,
    offsetMax: 3.0,
    namePtBr: 'Plano Axial Craniano Superior (Cortical)',
    nameLatin: 'Planum axiale craniale superius',
    clinicalSignificance: 'Calvária craniana, foice do cérebro e sulcos corticais frontoparietais.',
  },
  {
    offsetMin: 0.55,
    offsetMax: 1.15,
    namePtBr: 'Plano Axial Ventricular / Fossa Média',
    nameLatin: 'Planum axiale ventriculare',
    clinicalSignificance: 'Ventrículos laterais, plexo coroide, núcleos da base, terceiro ventrículo e tálamo.',
  },
  {
    offsetMin: 0.1,
    offsetMax: 0.55,
    namePtBr: 'Plano Axial Cérvico-Laríngeo',
    nameLatin: 'Planum axiale cervicolaryngeum',
    clinicalSignificance: 'Laringe, cartilagem tireóidea, glândula tireoide, feixe vasculonervoso do pescoço e C4-C6.',
  },
  {
    offsetMin: -0.35,
    offsetMax: 0.1,
    namePtBr: 'Plano Axial Torácico Médio (Plano de Ludwig)',
    nameLatin: 'Planum transthoracicum de Ludwig',
    clinicalSignificance: 'Ângulo esternal (T4-T5), arco aórtico, bifurcação da traqueia e átrios cardíacos.',
  },
  {
    offsetMin: -0.85,
    offsetMax: -0.35,
    namePtBr: 'Plano Transpilórico de Addison (L1)',
    nameLatin: 'Planum transpyloricum',
    clinicalSignificance: 'Nível vertebral L1, piloro gástrico, colo do pâncreas, hilos renais e artéria mesentérica superior.',
  },
  {
    offsetMin: -3.0,
    offsetMax: -0.85,
    namePtBr: 'Plano Axial Pélvico Inferior',
    nameLatin: 'Planum axiale pelvicum inferius',
    clinicalSignificance: 'Bexiga urinária, trígono de Lieutaud, próstata / útero em anteversão e reto.',
  },
];

/**
 * Retorna o marco anatômico clínico correspondente ao plano e profundidade selecionados.
 */
export function getAnatomicalLandmark(plane: MprPlaneType, offset: number): AnatomicalLandmark {
  let list: AnatomicalLandmark[];
  switch (plane) {
    case 'sagittal':
      list = SAGITTAL_LANDMARKS;
      break;
    case 'coronal':
      list = CORONAL_LANDMARKS;
      break;
    case 'axial':
      list = AXIAL_LANDMARKS;
      break;
  }

  const match = list.find((item) => offset >= item.offsetMin && offset <= item.offsetMax);
  if (match) return match;

  return (
    list[0] || {
      offsetMin: -3.0,
      offsetMax: 3.0,
      namePtBr: 'Plano Anatômico Personalizado',
      nameLatin: 'Planum anatomicum',
      clinicalSignificance: 'Secção tomográfica customizada do volume 3D.',
    }
  );
}

/**
 * Calcula a definição vetorial pura (normal e constante) para o plano de corte.
 * A convenção do Three.js é: pontos P onde dot(normal, P) + constant >= 0 são MANTIDOS.
 * Logo, se queremos manter os pontos com coord <= offset:
 *   normal = -1, constant = offset: (-1)*x + offset >= 0 => x <= offset.
 * Se invertido (manter coord >= offset):
 *   normal = 1, constant = -offset: 1*x - offset >= 0 => x >= offset.
 */
export function getPlaneVectorDef(planeType: MprPlaneType, offset: number, inverted: boolean): PlaneVectorDef {
  switch (planeType) {
    case 'sagittal': {
      // Eixo X
      const dir = inverted ? 1 : -1;
      return {
        normal: { x: dir, y: 0, z: 0 },
        constant: inverted ? -offset : offset,
      };
    }
    case 'coronal': {
      // Eixo Z
      const dir = inverted ? 1 : -1;
      return {
        normal: { x: 0, y: 0, z: dir },
        constant: inverted ? -offset : offset,
      };
    }
    case 'axial': {
      // Eixo Y
      const dir = inverted ? 1 : -1;
      return {
        normal: { x: 0, y: dir, z: 0 },
        constant: inverted ? -offset : offset,
      };
    }
  }
}

/**
 * Cria a instância Three.js de THREE.Plane pronta para aplicação no WebGLRenderer.
 */
export function computeClippingPlane(planeType: MprPlaneType, offset: number, inverted: boolean): THREE.Plane {
  const def = getPlaneVectorDef(planeType, offset, inverted);
  const normal = new THREE.Vector3(def.normal.x, def.normal.y, def.normal.z).normalize();
  return new THREE.Plane(normal, def.constant);
}

/**
 * Avalia se um ponto 3D no espaço do mundo seria descartado (clipped) pelo plano ativo.
 */
export function isPointClipped(
  planeType: MprPlaneType,
  offset: number,
  inverted: boolean,
  point: { x: number; y: number; z: number }
): boolean {
  const def = getPlaneVectorDef(planeType, offset, inverted);
  const dot = def.normal.x * point.x + def.normal.y * point.y + def.normal.z * point.z;
  const value = dot + def.constant;
  // No Three.js: se value < 0, o fragmento é descartado (clipped)
  return value < 0;
}
