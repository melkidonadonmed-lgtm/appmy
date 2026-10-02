/**
 * Catálogo Anatômico Canônico Z-Anatomy (CC BY-SA 4.0 / BodyParts3D)
 * Mapeia 100% dos nós 3D do corpo humano aos nomes oficiais na Terminologia Anatomica (TA2)
 * e Português do Brasil com vetores de explosão anatômicos por compartimento.
 */

import { Vector3D } from '../types/anatomy.ts';

export interface ZAnatomyItem {
  id: string;
  node: string;
  fmaId: string;
  namePtBr: string;
  nameEn: string;
  nameLatin: string;
  chapter: number;
  system: string;
  meshFile: string;
  path: string[];
  explosionVector: Vector3D;
}

export const Z_ANATOMY_CATALOG: ZAnatomyItem[] = [
  {
    "id": "za:right_inferolateral_branch_of_right_coronary_artery",
    "node": "Right inferolateral branch of right coronary artery",
    "fmaId": "TA2:right_inferolateral_branch_of_right_coronary_artery",
    "namePtBr": "Right inferolateral branch of right coronary artery",
    "nameEn": "Right inferolateral branch of right coronary artery",
    "nameLatin": "Ramus inferolateralis dexter arteriae coronariae dextrae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Cardiac vessels",
      "Arteries of heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:wing_of_central_lobule_l",
    "node": "Wing of central lobule.l",
    "fmaId": "TA2:wing_of_central_lobule_l",
    "namePtBr": "Wing of central lobule Esquerdo",
    "nameEn": "Wing of central lobule (left)",
    "nameLatin": "Ala lobuli centralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:wing_of_central_lobule_r",
    "node": "Wing of central lobule.r",
    "fmaId": "TA2:wing_of_central_lobule_r",
    "namePtBr": "Wing of central lobule Direito",
    "nameEn": "Wing of central lobule (right)",
    "nameLatin": "Ala lobuli centralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ampulla_of_lacrimal_canaliculus_l",
    "node": "Ampulla of lacrimal canaliculus.l",
    "fmaId": "TA2:ampulla_of_lacrimal_canaliculus_l",
    "namePtBr": "Ampulla of lacrimal canaliculus Esquerdo",
    "nameEn": "Ampulla of lacrimal canaliculus (left)",
    "nameLatin": "Ampulla canaliculi lacrimalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eye*",
      "Accessory visual structures",
      "Lacrimal apparatus",
      "Lacrimal canliculus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ampulla_of_lacrimal_canaliculus_r",
    "node": "Ampulla of lacrimal canaliculus.r",
    "fmaId": "TA2:ampulla_of_lacrimal_canaliculus_r",
    "namePtBr": "Ampulla of lacrimal canaliculus Direito",
    "nameEn": "Ampulla of lacrimal canaliculus (right)",
    "nameLatin": "Ampulla canaliculi lacrimalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eye*",
      "Accessory visual structures",
      "Lacrimal apparatus",
      "Lacrimal canliculus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:abdominal_aorta",
    "node": "Abdominal aorta",
    "fmaId": "TA2:abdominal_aorta",
    "namePtBr": "Abdominal aorta",
    "nameEn": "Abdominal aorta",
    "nameLatin": "Aorta abdominalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:ascending_aorta",
    "node": "Ascending aorta",
    "fmaId": "TA2:ascending_aorta",
    "namePtBr": "Ascending aorta",
    "nameEn": "Ascending aorta",
    "nameLatin": "Aorta ascendens",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:thoracic_aorta",
    "node": "Thoracic aorta",
    "fmaId": "TA2:thoracic_aorta",
    "namePtBr": "Thoracic aorta",
    "nameEn": "Thoracic aorta",
    "nameLatin": "Aorta thoracica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:vermiform_appendix",
    "node": "Vermiform appendix",
    "fmaId": "TA2:vermiform_appendix",
    "namePtBr": "Vermiform appendix",
    "nameEn": "Vermiform appendix",
    "nameLatin": "Appendix vermiformis",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive system"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:aqueduct_of_midbrain",
    "node": "Aqueduct of midbrain",
    "fmaId": "TA2:aqueduct_of_midbrain",
    "namePtBr": "Aqueduct of midbrain",
    "nameEn": "Aqueduct of midbrain",
    "nameLatin": "Aquaeductus mesencephali",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:aortic_arch",
    "node": "Aortic arch",
    "fmaId": "TA2:aortic_arch",
    "namePtBr": "Aortic arch",
    "nameEn": "Aortic arch",
    "nameLatin": "Arcus aortae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_palmar_arch_l",
    "node": "Deep palmar arch.l",
    "fmaId": "TA2:deep_palmar_arch_l",
    "namePtBr": "Deep palmar arch Esquerdo",
    "nameEn": "Deep palmar arch (left)",
    "nameLatin": "Arcus palmaris profundus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_palmar_arch_r",
    "node": "Deep palmar arch.r",
    "fmaId": "TA2:deep_palmar_arch_r",
    "namePtBr": "Deep palmar arch Direito",
    "nameEn": "Deep palmar arch (right)",
    "nameLatin": "Arcus palmaris profundus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_palmar_arch_l",
    "node": "Superficial palmar arch.l",
    "fmaId": "TA2:superficial_palmar_arch_l",
    "namePtBr": "Superficial palmar arch Esquerdo",
    "nameEn": "Superficial palmar arch (left)",
    "nameLatin": "Arcus palmaris superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_palmar_arch_r",
    "node": "Superficial palmar arch.r",
    "fmaId": "TA2:superficial_palmar_arch_r",
    "namePtBr": "Superficial palmar arch Direito",
    "nameEn": "Superficial palmar arch (right)",
    "nameLatin": "Arcus palmaris superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:plantar_arch_l",
    "node": "Plantar arch.l",
    "fmaId": "TA2:plantar_arch_l",
    "namePtBr": "Plantar arch Esquerdo",
    "nameEn": "Plantar arch (left)",
    "nameLatin": "Arcus plantaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:plantar_arch_r",
    "node": "Plantar arch.r",
    "fmaId": "TA2:plantar_arch_r",
    "namePtBr": "Plantar arch Direito",
    "nameEn": "Plantar arch (right)",
    "nameLatin": "Arcus plantaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_venous_arch_of_foot_l",
    "node": "Dorsal venous arch of foot.l",
    "fmaId": "TA2:dorsal_venous_arch_of_foot_l",
    "namePtBr": "Dorsal venous arch of foot Esquerdo",
    "nameEn": "Dorsal venous arch of foot (left)",
    "nameLatin": "Arcus venosus dorsalis pedis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_venous_arch_of_foot_r",
    "node": "Dorsal venous arch of foot.r",
    "fmaId": "TA2:dorsal_venous_arch_of_foot_r",
    "namePtBr": "Dorsal venous arch of foot Direito",
    "nameEn": "Dorsal venous arch of foot (right)",
    "nameLatin": "Arcus venosus dorsalis pedis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_venous_palmar_arch_l",
    "node": "Deep venous palmar arch.l",
    "fmaId": "TA2:deep_venous_palmar_arch_l",
    "namePtBr": "Deep venous palmar arch Esquerdo",
    "nameEn": "Deep venous palmar arch (left)",
    "nameLatin": "Arcus venosus palmaris profundus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_venous_palmar_arch_r",
    "node": "Deep venous palmar arch.r",
    "fmaId": "TA2:deep_venous_palmar_arch_r",
    "namePtBr": "Deep venous palmar arch Direito",
    "nameEn": "Deep venous palmar arch (right)",
    "nameLatin": "Arcus venosus palmaris profundus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_venous_palmar_arch_l",
    "node": "Superficial venous palmar arch.l",
    "fmaId": "TA2:superficial_venous_palmar_arch_l",
    "namePtBr": "Superficial venous palmar arch Esquerdo",
    "nameEn": "Superficial venous palmar arch (left)",
    "nameLatin": "Arcus venosus palmaris superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_venous_palmar_arch_r",
    "node": "Superficial venous palmar arch.r",
    "fmaId": "TA2:superficial_venous_palmar_arch_r",
    "namePtBr": "Superficial venous palmar arch Direito",
    "nameEn": "Superficial venous palmar arch (right)",
    "nameLatin": "Arcus venosus palmaris superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:plantar_venous_arch_l",
    "node": "Plantar venous arch.l",
    "fmaId": "TA2:plantar_venous_arch_l",
    "namePtBr": "Plantar venous arch Esquerdo",
    "nameEn": "Plantar venous arch (left)",
    "nameLatin": "Arcus venosus plantaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:plantar_venous_arch_r",
    "node": "Plantar venous arch.r",
    "fmaId": "TA2:plantar_venous_arch_r",
    "namePtBr": "Plantar venous arch Direito",
    "nameEn": "Plantar venous arch (right)",
    "nameLatin": "Arcus venosus plantaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_alveolar_artery_l",
    "node": "Inferior alveolar artery.l",
    "fmaId": "TA2:inferior_alveolar_artery_l",
    "namePtBr": "Inferior alveolar artery Esquerdo",
    "nameEn": "Inferior alveolar artery (left)",
    "nameLatin": "Arteria alveolaris inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_alveolar_artery_r",
    "node": "Inferior alveolar artery.r",
    "fmaId": "TA2:inferior_alveolar_artery_r",
    "namePtBr": "Inferior alveolar artery Direito",
    "nameEn": "Inferior alveolar artery (right)",
    "nameLatin": "Arteria alveolaris inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_superior_alveolar_artery_l",
    "node": "Posterior superior alveolar artery.l",
    "fmaId": "TA2:posterior_superior_alveolar_artery_l",
    "namePtBr": "Posterior superior alveolar artery Esquerdo",
    "nameEn": "Posterior superior alveolar artery (left)",
    "nameLatin": "Arteria alveolaris superior posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_superior_alveolar_artery_r",
    "node": "Posterior superior alveolar artery.r",
    "fmaId": "TA2:posterior_superior_alveolar_artery_r",
    "namePtBr": "Posterior superior alveolar artery Direito",
    "nameEn": "Posterior superior alveolar artery (right)",
    "nameLatin": "Arteria alveolaris superior posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:angular_artery_l",
    "node": "Angular artery.l",
    "fmaId": "TA2:angular_artery_l",
    "namePtBr": "Angular artery Esquerdo",
    "nameEn": "Angular artery (left)",
    "nameLatin": "Arteria angularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:angular_artery_r",
    "node": "Angular artery.r",
    "fmaId": "TA2:angular_artery_r",
    "namePtBr": "Angular artery Direito",
    "nameEn": "Angular artery (right)",
    "nameLatin": "Arteria angularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_anorectal_artery",
    "node": "Superior anorectal artery",
    "fmaId": "TA2:superior_anorectal_artery",
    "namePtBr": "Superior anorectal artery",
    "nameEn": "Superior anorectal artery",
    "nameLatin": "Arteria anorectalis superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:appendicular_artery",
    "node": "Appendicular artery",
    "fmaId": "TA2:appendicular_artery",
    "namePtBr": "Appendicular artery",
    "nameEn": "Appendicular artery",
    "nameLatin": "Arteria appendicularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:arcuate_artery_l",
    "node": "Arcuate artery.l",
    "fmaId": "TA2:arcuate_artery_l",
    "namePtBr": "Arcuate artery Esquerdo",
    "nameEn": "Arcuate artery (left)",
    "nameLatin": "Arteria arcuata",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:arcuate_artery_r",
    "node": "Arcuate artery.r",
    "fmaId": "TA2:arcuate_artery_r",
    "namePtBr": "Arcuate artery Direito",
    "nameEn": "Arcuate artery (right)",
    "nameLatin": "Arteria arcuata",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:axillary_artery_l",
    "node": "Axillary artery.l",
    "fmaId": "TA2:axillary_artery_l",
    "namePtBr": "Axillary artery Esquerdo",
    "nameEn": "Axillary artery (left)",
    "nameLatin": "Arteria axillaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:axillary_artery_r",
    "node": "Axillary artery.r",
    "fmaId": "TA2:axillary_artery_r",
    "namePtBr": "Axillary artery Direito",
    "nameEn": "Axillary artery (right)",
    "nameLatin": "Arteria axillaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:basilar_artery",
    "node": "Basilar artery",
    "fmaId": "TA2:basilar_artery",
    "namePtBr": "Basilar artery",
    "nameEn": "Basilar artery",
    "nameLatin": "Arteria basilaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:brachial_artery_l",
    "node": "Brachial artery.l",
    "fmaId": "TA2:brachial_artery_l",
    "namePtBr": "Brachial artery Esquerdo",
    "nameEn": "Brachial artery (left)",
    "nameLatin": "Arteria brachialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:brachial_artery_r",
    "node": "Brachial artery.r",
    "fmaId": "TA2:brachial_artery_r",
    "namePtBr": "Brachial artery Direito",
    "nameEn": "Brachial artery (right)",
    "nameLatin": "Arteria brachialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:buccal_artery_l",
    "node": "Buccal artery.l",
    "fmaId": "TA2:buccal_artery_l",
    "namePtBr": "Buccal artery Esquerdo",
    "nameEn": "Buccal artery (left)",
    "nameLatin": "Arteria buccalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:buccal_artery_r",
    "node": "Buccal artery.r",
    "fmaId": "TA2:buccal_artery_r",
    "namePtBr": "Buccal artery Direito",
    "nameEn": "Buccal artery (right)",
    "nameLatin": "Arteria buccalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:callosomarginal_artery_l",
    "node": "Callosomarginal artery.l",
    "fmaId": "TA2:callosomarginal_artery_l",
    "namePtBr": "Callosomarginal artery Esquerdo",
    "nameEn": "Callosomarginal artery (left)",
    "nameLatin": "Arteria callosomarginalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:callosomarginal_artery_r",
    "node": "Callosomarginal artery.r",
    "fmaId": "TA2:callosomarginal_artery_r",
    "namePtBr": "Callosomarginal artery Direito",
    "nameEn": "Callosomarginal artery (right)",
    "nameLatin": "Arteria callosomarginalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:artery_of_pterygoid_canal_l",
    "node": "Artery of pterygoid canal.l",
    "fmaId": "TA2:artery_of_pterygoid_canal_l",
    "namePtBr": "Artery of pterygoid canal Esquerdo",
    "nameEn": "Artery of pterygoid canal (left)",
    "nameLatin": "Arteria canalis pterygoidei",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:artery_of_pterygoid_canal_r",
    "node": "Artery of pterygoid canal.r",
    "fmaId": "TA2:artery_of_pterygoid_canal_r",
    "namePtBr": "Artery of pterygoid canal Direito",
    "nameEn": "Artery of pterygoid canal (right)",
    "nameLatin": "Arteria canalis pterygoidei",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:central_retinal_artery_l",
    "node": "Central retinal artery.l",
    "fmaId": "TA2:central_retinal_artery_l",
    "namePtBr": "Central retinal artery Esquerdo",
    "nameEn": "Central retinal artery (left)",
    "nameLatin": "Arteria centralis retinae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:central_retinal_artery_r",
    "node": "Central retinal artery.r",
    "fmaId": "TA2:central_retinal_artery_r",
    "namePtBr": "Central retinal artery Direito",
    "nameEn": "Central retinal artery (right)",
    "nameLatin": "Arteria centralis retinae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_inferior_cerebellar_artery_l",
    "node": "Anterior inferior cerebellar artery.l",
    "fmaId": "TA2:anterior_inferior_cerebellar_artery_l",
    "namePtBr": "Anterior inferior cerebellar artery Esquerdo",
    "nameEn": "Anterior inferior cerebellar artery (left)",
    "nameLatin": "Arteria cerebelli inferior anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_inferior_cerebellar_artery_r",
    "node": "Anterior inferior cerebellar artery.r",
    "fmaId": "TA2:anterior_inferior_cerebellar_artery_r",
    "namePtBr": "Anterior inferior cerebellar artery Direito",
    "nameEn": "Anterior inferior cerebellar artery (right)",
    "nameLatin": "Arteria cerebelli inferior anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_inferior_cerebellar_artery_l",
    "node": "Posterior inferior cerebellar artery.l",
    "fmaId": "TA2:posterior_inferior_cerebellar_artery_l",
    "namePtBr": "Posterior inferior cerebellar artery Esquerdo",
    "nameEn": "Posterior inferior cerebellar artery (left)",
    "nameLatin": "Arteria cerebelli inferior posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_inferior_cerebellar_artery_r",
    "node": "Posterior inferior cerebellar artery.r",
    "fmaId": "TA2:posterior_inferior_cerebellar_artery_r",
    "namePtBr": "Posterior inferior cerebellar artery Direito",
    "nameEn": "Posterior inferior cerebellar artery (right)",
    "nameLatin": "Arteria cerebelli inferior posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_cerebellar_artery_l",
    "node": "Superior cerebellar artery.l",
    "fmaId": "TA2:superior_cerebellar_artery_l",
    "namePtBr": "Superior cerebellar artery Esquerdo",
    "nameEn": "Superior cerebellar artery (left)",
    "nameLatin": "Arteria cerebelli superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_cerebellar_artery_r",
    "node": "Superior cerebellar artery.r",
    "fmaId": "TA2:superior_cerebellar_artery_r",
    "namePtBr": "Superior cerebellar artery Direito",
    "nameEn": "Superior cerebellar artery (right)",
    "nameLatin": "Arteria cerebelli superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_cerebral_artery_l",
    "node": "Anterior cerebral artery.l",
    "fmaId": "TA2:anterior_cerebral_artery_l",
    "namePtBr": "Anterior cerebral artery Esquerdo",
    "nameEn": "Anterior cerebral artery (left)",
    "nameLatin": "Arteria cerebri anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_cerebral_artery_r",
    "node": "Anterior cerebral artery.r",
    "fmaId": "TA2:anterior_cerebral_artery_r",
    "namePtBr": "Anterior cerebral artery Direito",
    "nameEn": "Anterior cerebral artery (right)",
    "nameLatin": "Arteria cerebri anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:middle_cerebral_artery_m1_segment_l",
    "node": "Middle cerebral artery (M1-segment).l",
    "fmaId": "TA2:middle_cerebral_artery_m1_segment_l",
    "namePtBr": "Middle cerebral artery (M1-segment) Esquerdo",
    "nameEn": "Middle cerebral artery (M1-segment) (left)",
    "nameLatin": "Arteria cerebri media (Pars M1",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:middle_cerebral_artery_m1_segment_r",
    "node": "Middle cerebral artery (M1-segment).r",
    "fmaId": "TA2:middle_cerebral_artery_m1_segment_r",
    "namePtBr": "Middle cerebral artery (M1-segment) Direito",
    "nameEn": "Middle cerebral artery (M1-segment) (right)",
    "nameLatin": "Arteria cerebri media (Pars M1",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:middle_cerebral_artery_m3_segment_r",
    "node": "Middle cerebral artery (M3-segment).r",
    "fmaId": "TA2:middle_cerebral_artery_m3_segment_r",
    "namePtBr": "Middle cerebral artery (M3-segment) Direito",
    "nameEn": "Middle cerebral artery (M3-segment) (right)",
    "nameLatin": "Arteria cerebri media (Pars M3",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_cerebral_artery_l",
    "node": "Posterior cerebral artery.l",
    "fmaId": "TA2:posterior_cerebral_artery_l",
    "namePtBr": "Posterior cerebral artery Esquerdo",
    "nameEn": "Posterior cerebral artery (left)",
    "nameLatin": "Arteria cerebri posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_cerebral_artery_r",
    "node": "Posterior cerebral artery.r",
    "fmaId": "TA2:posterior_cerebral_artery_r",
    "namePtBr": "Posterior cerebral artery Direito",
    "nameEn": "Posterior cerebral artery (right)",
    "nameLatin": "Arteria cerebri posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_cervical_artery_l",
    "node": "Deep cervical artery.l",
    "fmaId": "TA2:deep_cervical_artery_l",
    "namePtBr": "Deep cervical artery Esquerdo",
    "nameEn": "Deep cervical artery (left)",
    "nameLatin": "Arteria cervicalis profunda",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.6,
      "z": -0.2
    }
  },
  {
    "id": "za:deep_cervical_artery_r",
    "node": "Deep cervical artery.r",
    "fmaId": "TA2:deep_cervical_artery_r",
    "namePtBr": "Deep cervical artery Direito",
    "nameEn": "Deep cervical artery (right)",
    "nameLatin": "Arteria cervicalis profunda",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.6,
      "z": -0.2
    }
  },
  {
    "id": "za:anterior_circumflex_humeral_artery_l",
    "node": "Anterior circumflex humeral artery.l",
    "fmaId": "TA2:anterior_circumflex_humeral_artery_l",
    "namePtBr": "Anterior circumflex humeral artery Esquerdo",
    "nameEn": "Anterior circumflex humeral artery (left)",
    "nameLatin": "Arteria circumflexa anterior humeri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_circumflex_humeral_artery_r",
    "node": "Anterior circumflex humeral artery.r",
    "fmaId": "TA2:anterior_circumflex_humeral_artery_r",
    "namePtBr": "Anterior circumflex humeral artery Direito",
    "nameEn": "Anterior circumflex humeral artery (right)",
    "nameLatin": "Arteria circumflexa anterior humeri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:circumflex_artery_of_heart",
    "node": "Circumflex artery of heart",
    "fmaId": "TA2:circumflex_artery_of_heart",
    "namePtBr": "Circumflex artery of heart",
    "nameEn": "Circumflex artery of heart",
    "nameLatin": "Arteria circumflexa cordis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Cardiac vessels",
      "Arteries of heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_circumflex_femoral_artery_l",
    "node": "Lateral circumflex femoral artery.l",
    "fmaId": "TA2:lateral_circumflex_femoral_artery_l",
    "namePtBr": "Lateral circumflex femoral artery Esquerdo",
    "nameEn": "Lateral circumflex femoral artery (left)",
    "nameLatin": "Arteria circumflexa lateralis femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_circumflex_femoral_artery_r",
    "node": "Lateral circumflex femoral artery.r",
    "fmaId": "TA2:lateral_circumflex_femoral_artery_r",
    "namePtBr": "Lateral circumflex femoral artery Direito",
    "nameEn": "Lateral circumflex femoral artery (right)",
    "nameLatin": "Arteria circumflexa lateralis femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_circumflex_femoral_artery_l",
    "node": "Medial circumflex femoral artery.l",
    "fmaId": "TA2:medial_circumflex_femoral_artery_l",
    "namePtBr": "Medial circumflex femoral artery Esquerdo",
    "nameEn": "Medial circumflex femoral artery (left)",
    "nameLatin": "Arteria circumflexa medialis femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_circumflex_femoral_artery_r",
    "node": "Medial circumflex femoral artery.r",
    "fmaId": "TA2:medial_circumflex_femoral_artery_r",
    "namePtBr": "Medial circumflex femoral artery Direito",
    "nameEn": "Medial circumflex femoral artery (right)",
    "nameLatin": "Arteria circumflexa medialis femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_circumflex_humeral_artery_l",
    "node": "Posterior circumflex humeral artery.l",
    "fmaId": "TA2:posterior_circumflex_humeral_artery_l",
    "namePtBr": "Posterior circumflex humeral artery Esquerdo",
    "nameEn": "Posterior circumflex humeral artery (left)",
    "nameLatin": "Arteria circumflexa posterior humeri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_circumflex_humeral_artery_r",
    "node": "Posterior circumflex humeral artery.r",
    "fmaId": "TA2:posterior_circumflex_humeral_artery_r",
    "namePtBr": "Posterior circumflex humeral artery Direito",
    "nameEn": "Posterior circumflex humeral artery (right)",
    "nameLatin": "Arteria circumflexa posterior humeri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:circumflex_scapular_artery_l",
    "node": "Circumflex scapular artery.l",
    "fmaId": "TA2:circumflex_scapular_artery_l",
    "namePtBr": "Circumflex scapular artery Esquerdo",
    "nameEn": "Circumflex scapular artery (left)",
    "nameLatin": "Arteria circumflexa scapulae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:circumflex_scapular_artery_r",
    "node": "Circumflex scapular artery.r",
    "fmaId": "TA2:circumflex_scapular_artery_r",
    "namePtBr": "Circumflex scapular artery Direito",
    "nameEn": "Circumflex scapular artery (right)",
    "nameLatin": "Arteria circumflexa scapulae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:right_colic_artery",
    "node": "Right colic artery",
    "fmaId": "TA2:right_colic_artery",
    "namePtBr": "Right colic artery",
    "nameEn": "Right colic artery",
    "nameLatin": "Arteria colica dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:middle_colic_artery",
    "node": "Middle colic artery",
    "fmaId": "TA2:middle_colic_artery",
    "namePtBr": "Middle colic artery",
    "nameEn": "Middle colic artery",
    "nameLatin": "Arteria colica media",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_colic_artery",
    "node": "Left colic artery",
    "fmaId": "TA2:left_colic_artery",
    "namePtBr": "Left colic artery",
    "nameEn": "Left colic artery",
    "nameLatin": "Arteria colica sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:middle_collateral_artery_l",
    "node": "Middle collateral artery.l",
    "fmaId": "TA2:middle_collateral_artery_l",
    "namePtBr": "Middle collateral artery Esquerdo",
    "nameEn": "Middle collateral artery (left)",
    "nameLatin": "Arteria collateralis media",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:middle_collateral_artery_r",
    "node": "Middle collateral artery.r",
    "fmaId": "TA2:middle_collateral_artery_r",
    "namePtBr": "Middle collateral artery Direito",
    "nameEn": "Middle collateral artery (right)",
    "nameLatin": "Arteria collateralis media",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:radial_collateral_artery_l",
    "node": "Radial collateral artery.l",
    "fmaId": "TA2:radial_collateral_artery_l",
    "namePtBr": "Radial collateral artery Esquerdo",
    "nameEn": "Radial collateral artery (left)",
    "nameLatin": "Arteria collateralis radialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:radial_collateral_artery_r",
    "node": "Radial collateral artery.r",
    "fmaId": "TA2:radial_collateral_artery_r",
    "namePtBr": "Radial collateral artery Direito",
    "nameEn": "Radial collateral artery (right)",
    "nameLatin": "Arteria collateralis radialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_ulnar_collateral_artery_l",
    "node": "Inferior ulnar collateral artery.l",
    "fmaId": "TA2:inferior_ulnar_collateral_artery_l",
    "namePtBr": "Inferior ulnar collateral artery Esquerdo",
    "nameEn": "Inferior ulnar collateral artery (left)",
    "nameLatin": "Arteria collateralis ulnaris inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:inferior_ulnar_collateral_artery_r",
    "node": "Inferior ulnar collateral artery.r",
    "fmaId": "TA2:inferior_ulnar_collateral_artery_r",
    "namePtBr": "Inferior ulnar collateral artery Direito",
    "nameEn": "Inferior ulnar collateral artery (right)",
    "nameLatin": "Arteria collateralis ulnaris inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:superior_ulnar_collateral_artery_l",
    "node": "Superior ulnar collateral artery.l",
    "fmaId": "TA2:superior_ulnar_collateral_artery_l",
    "namePtBr": "Superior ulnar collateral artery Esquerdo",
    "nameEn": "Superior ulnar collateral artery (left)",
    "nameLatin": "Arteria collateralis ulnaris superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:superior_ulnar_collateral_artery_r",
    "node": "Superior ulnar collateral artery.r",
    "fmaId": "TA2:superior_ulnar_collateral_artery_r",
    "namePtBr": "Superior ulnar collateral artery Direito",
    "nameEn": "Superior ulnar collateral artery (right)",
    "nameLatin": "Arteria collateralis ulnaris superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:anterior_communicating_artery",
    "node": "Anterior communicating artery",
    "fmaId": "TA2:anterior_communicating_artery",
    "namePtBr": "Anterior communicating artery",
    "nameEn": "Anterior communicating artery",
    "nameLatin": "Arteria communicans anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_communicating_artery_l",
    "node": "Posterior communicating artery.l",
    "fmaId": "TA2:posterior_communicating_artery_l",
    "namePtBr": "Posterior communicating artery Esquerdo",
    "nameEn": "Posterior communicating artery (left)",
    "nameLatin": "Arteria communicans posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_communicating_artery_r",
    "node": "Posterior communicating artery.r",
    "fmaId": "TA2:posterior_communicating_artery_r",
    "namePtBr": "Posterior communicating artery Direito",
    "nameEn": "Posterior communicating artery (right)",
    "nameLatin": "Arteria communicans posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_coronary_artery",
    "node": "Right coronary artery",
    "fmaId": "TA2:right_coronary_artery",
    "namePtBr": "Right coronary artery",
    "nameEn": "Right coronary artery",
    "nameLatin": "Arteria coronaria dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Cardiac vessels",
      "Arteries of heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_coronary_artery",
    "node": "Left coronary artery",
    "fmaId": "TA2:left_coronary_artery",
    "namePtBr": "Left coronary artery",
    "nameEn": "Left coronary artery",
    "nameLatin": "Arteria coronaria sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Cardiac vessels",
      "Arteries of heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsalis_pedis_artery_l",
    "node": "Dorsalis pedis artery.l",
    "fmaId": "TA2:dorsalis_pedis_artery_l",
    "namePtBr": "Dorsalis pedis artery Esquerdo",
    "nameEn": "Dorsalis pedis artery (left)",
    "nameLatin": "Arteria dorsalis pedis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsalis_pedis_artery_r",
    "node": "Dorsalis pedis artery.r",
    "fmaId": "TA2:dorsalis_pedis_artery_r",
    "namePtBr": "Dorsalis pedis artery Direito",
    "nameEn": "Dorsalis pedis artery (right)",
    "nameLatin": "Arteria dorsalis pedis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_artery_of_penis_l",
    "node": "Dorsal artery of penis.l",
    "fmaId": "TA2:dorsal_artery_of_penis_l",
    "namePtBr": "Dorsal artery of penis Esquerdo",
    "nameEn": "Dorsal artery of penis (left)",
    "nameLatin": "Arteria dorsalis penis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_artery_of_penis_r",
    "node": "Dorsal artery of penis.r",
    "fmaId": "TA2:dorsal_artery_of_penis_r",
    "namePtBr": "Dorsal artery of penis Direito",
    "nameEn": "Dorsal artery of penis (right)",
    "nameLatin": "Arteria dorsalis penis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_epigastric_artery_l",
    "node": "Inferior epigastric artery.l",
    "fmaId": "TA2:inferior_epigastric_artery_l",
    "namePtBr": "Inferior epigastric artery Esquerdo",
    "nameEn": "Inferior epigastric artery (left)",
    "nameLatin": "Arteria epigastrica inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_epigastric_artery_r",
    "node": "Inferior epigastric artery.r",
    "fmaId": "TA2:inferior_epigastric_artery_r",
    "namePtBr": "Inferior epigastric artery Direito",
    "nameEn": "Inferior epigastric artery (right)",
    "nameLatin": "Arteria epigastrica inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_epigastric_artery_l",
    "node": "Superficial epigastric artery.l",
    "fmaId": "TA2:superficial_epigastric_artery_l",
    "namePtBr": "Superficial epigastric artery Esquerdo",
    "nameEn": "Superficial epigastric artery (left)",
    "nameLatin": "Arteria epigastrica superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_epigastric_artery_r",
    "node": "Superficial epigastric artery.r",
    "fmaId": "TA2:superficial_epigastric_artery_r",
    "namePtBr": "Superficial epigastric artery Direito",
    "nameEn": "Superficial epigastric artery (right)",
    "nameLatin": "Arteria epigastrica superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_epigastric_artery_l",
    "node": "Superior epigastric artery.l",
    "fmaId": "TA2:superior_epigastric_artery_l",
    "namePtBr": "Superior epigastric artery Esquerdo",
    "nameEn": "Superior epigastric artery (left)",
    "nameLatin": "Arteria epigastrica superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_epigastric_artery_r",
    "node": "Superior epigastric artery.r",
    "fmaId": "TA2:superior_epigastric_artery_r",
    "namePtBr": "Superior epigastric artery Direito",
    "nameEn": "Superior epigastric artery (right)",
    "nameLatin": "Arteria epigastrica superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_ethmoidal_artery_l",
    "node": "Anterior ethmoidal artery.l",
    "fmaId": "TA2:anterior_ethmoidal_artery_l",
    "namePtBr": "Anterior ethmoidal artery Esquerdo",
    "nameEn": "Anterior ethmoidal artery (left)",
    "nameLatin": "Arteria ethmoidea anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_ethmoidal_artery_r",
    "node": "Anterior ethmoidal artery.r",
    "fmaId": "TA2:anterior_ethmoidal_artery_r",
    "namePtBr": "Anterior ethmoidal artery Direito",
    "nameEn": "Anterior ethmoidal artery (right)",
    "nameLatin": "Arteria ethmoidea anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_ethmoidal_artery_l",
    "node": "Posterior ethmoidal artery.l",
    "fmaId": "TA2:posterior_ethmoidal_artery_l",
    "namePtBr": "Posterior ethmoidal artery Esquerdo",
    "nameEn": "Posterior ethmoidal artery (left)",
    "nameLatin": "Arteria ethmoidea posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_ethmoidal_artery_r",
    "node": "Posterior ethmoidal artery.r",
    "fmaId": "TA2:posterior_ethmoidal_artery_r",
    "namePtBr": "Posterior ethmoidal artery Direito",
    "nameEn": "Posterior ethmoidal artery (right)",
    "nameLatin": "Arteria ethmoidea posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:facial_artery_l",
    "node": "Facial artery.l",
    "fmaId": "TA2:facial_artery_l",
    "namePtBr": "Facial artery Esquerdo",
    "nameEn": "Facial artery (left)",
    "nameLatin": "Arteria facialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:facial_artery_r",
    "node": "Facial artery.r",
    "fmaId": "TA2:facial_artery_r",
    "namePtBr": "Facial artery Direito",
    "nameEn": "Facial artery (right)",
    "nameLatin": "Arteria facialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:femoral_artery_l",
    "node": "Femoral artery.l",
    "fmaId": "TA2:femoral_artery_l",
    "namePtBr": "Femoral artery Esquerdo",
    "nameEn": "Femoral artery (left)",
    "nameLatin": "Arteria femoralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:femoral_artery_r",
    "node": "Femoral artery.r",
    "fmaId": "TA2:femoral_artery_r",
    "namePtBr": "Femoral artery Direito",
    "nameEn": "Femoral artery (right)",
    "nameLatin": "Arteria femoralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:fibular_artery_l",
    "node": "Fibular artery.l",
    "fmaId": "TA2:fibular_artery_l",
    "namePtBr": "Fibular artery Esquerdo",
    "nameEn": "Fibular artery (left)",
    "nameLatin": "Arteria fibularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:fibular_artery_r",
    "node": "Fibular artery.r",
    "fmaId": "TA2:fibular_artery_r",
    "namePtBr": "Fibular artery Direito",
    "nameEn": "Fibular artery (right)",
    "nameLatin": "Arteria fibularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:left_gastric_artery",
    "node": "Left gastric artery",
    "fmaId": "TA2:left_gastric_artery",
    "namePtBr": "Left gastric artery",
    "nameEn": "Left gastric artery",
    "nameLatin": "Arteria gastrica sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:gastroduodenal_artery",
    "node": "Gastroduodenal artery",
    "fmaId": "TA2:gastroduodenal_artery",
    "namePtBr": "Gastroduodenal artery",
    "nameEn": "Gastroduodenal artery",
    "nameLatin": "Arteria gastroduodenalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_gluteal_artery_l",
    "node": "Inferior gluteal artery.l",
    "fmaId": "TA2:inferior_gluteal_artery_l",
    "namePtBr": "Inferior gluteal artery Esquerdo",
    "nameEn": "Inferior gluteal artery (left)",
    "nameLatin": "Arteria glutea inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_gluteal_artery_r",
    "node": "Inferior gluteal artery.r",
    "fmaId": "TA2:inferior_gluteal_artery_r",
    "namePtBr": "Inferior gluteal artery Direito",
    "nameEn": "Inferior gluteal artery (right)",
    "nameLatin": "Arteria glutea inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_gluteal_artery_l",
    "node": "Superior gluteal artery.l",
    "fmaId": "TA2:superior_gluteal_artery_l",
    "namePtBr": "Superior gluteal artery Esquerdo",
    "nameEn": "Superior gluteal artery (left)",
    "nameLatin": "Arteria glutea superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_gluteal_artery_r",
    "node": "Superior gluteal artery.r",
    "fmaId": "TA2:superior_gluteal_artery_r",
    "namePtBr": "Superior gluteal artery Direito",
    "nameEn": "Superior gluteal artery (right)",
    "nameLatin": "Arteria glutea superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_hepatic_artery",
    "node": "Common hepatic artery",
    "fmaId": "TA2:common_hepatic_artery",
    "namePtBr": "Common hepatic artery",
    "nameEn": "Common hepatic artery",
    "nameLatin": "Arteria hepatica communis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:proper_hepatic_artery",
    "node": "Proper hepatic artery",
    "fmaId": "TA2:proper_hepatic_artery",
    "namePtBr": "Proper hepatic artery",
    "nameEn": "Proper hepatic artery",
    "nameLatin": "Arteria hepatica propria",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:ileocolic_artery",
    "node": "Ileocolic artery",
    "fmaId": "TA2:ileocolic_artery",
    "namePtBr": "Ileocolic artery",
    "nameEn": "Ileocolic artery",
    "nameLatin": "Arteria ileocolica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_iliac_artery_l",
    "node": "Common iliac artery.l",
    "fmaId": "TA2:common_iliac_artery_l",
    "namePtBr": "Common iliac artery Esquerdo",
    "nameEn": "Common iliac artery (left)",
    "nameLatin": "Arteria iliaca communis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_iliac_artery_r",
    "node": "Common iliac artery.r",
    "fmaId": "TA2:common_iliac_artery_r",
    "namePtBr": "Common iliac artery Direito",
    "nameEn": "Common iliac artery (right)",
    "nameLatin": "Arteria iliaca communis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:external_iliac_artery_l",
    "node": "External iliac artery.l",
    "fmaId": "TA2:external_iliac_artery_l",
    "namePtBr": "External iliac artery Esquerdo",
    "nameEn": "External iliac artery (left)",
    "nameLatin": "Arteria iliaca externa",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:external_iliac_artery_r",
    "node": "External iliac artery.r",
    "fmaId": "TA2:external_iliac_artery_r",
    "namePtBr": "External iliac artery Direito",
    "nameEn": "External iliac artery (right)",
    "nameLatin": "Arteria iliaca externa",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_iliac_artery_l",
    "node": "Internal iliac artery.l",
    "fmaId": "TA2:internal_iliac_artery_l",
    "namePtBr": "Internal iliac artery Esquerdo",
    "nameEn": "Internal iliac artery (left)",
    "nameLatin": "Arteria iliaca interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_iliac_artery_r",
    "node": "Internal iliac artery.r",
    "fmaId": "TA2:internal_iliac_artery_r",
    "namePtBr": "Internal iliac artery Direito",
    "nameEn": "Internal iliac artery (right)",
    "nameLatin": "Arteria iliaca interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:iliolumbar_artery_l",
    "node": "Iliolumbar artery.l",
    "fmaId": "TA2:iliolumbar_artery_l",
    "namePtBr": "Iliolumbar artery Esquerdo",
    "nameEn": "Iliolumbar artery (left)",
    "nameLatin": "Arteria iliolumbalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:iliolumbar_artery_r",
    "node": "Iliolumbar artery.r",
    "fmaId": "TA2:iliolumbar_artery_r",
    "namePtBr": "Iliolumbar artery Direito",
    "nameEn": "Iliolumbar artery (right)",
    "nameLatin": "Arteria iliolumbalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:inferior_lateral_genicular_artery_l",
    "node": "Inferior lateral genicular artery.l",
    "fmaId": "TA2:inferior_lateral_genicular_artery_l",
    "namePtBr": "Inferior lateral genicular artery Esquerdo",
    "nameEn": "Inferior lateral genicular artery (left)",
    "nameLatin": "Arteria inferior lateralis genus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_lateral_genicular_artery_r",
    "node": "Inferior lateral genicular artery.r",
    "fmaId": "TA2:inferior_lateral_genicular_artery_r",
    "namePtBr": "Inferior lateral genicular artery Direito",
    "nameEn": "Inferior lateral genicular artery (right)",
    "nameLatin": "Arteria inferior lateralis genus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_medial_genicular_artery_l",
    "node": "Inferior medial genicular artery.l",
    "fmaId": "TA2:inferior_medial_genicular_artery_l",
    "namePtBr": "Inferior medial genicular artery Esquerdo",
    "nameEn": "Inferior medial genicular artery (left)",
    "nameLatin": "Arteria inferior medialis genus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_medial_genicular_artery_r",
    "node": "Inferior medial genicular artery.r",
    "fmaId": "TA2:inferior_medial_genicular_artery_r",
    "namePtBr": "Inferior medial genicular artery Direito",
    "nameEn": "Inferior medial genicular artery (right)",
    "nameLatin": "Arteria inferior medialis genus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:infra_orbital_artery_l",
    "node": "Infra-orbital artery.l",
    "fmaId": "TA2:infra_orbital_artery_l",
    "namePtBr": "Infra-orbital artery Esquerdo",
    "nameEn": "Infra-orbital artery (left)",
    "nameLatin": "Arteria infraorbitalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:infra_orbital_artery_r",
    "node": "Infra-orbital artery.r",
    "fmaId": "TA2:infra_orbital_artery_r",
    "namePtBr": "Infra-orbital artery Direito",
    "nameEn": "Infra-orbital artery (right)",
    "nameLatin": "Arteria infraorbitalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:first_posterior_intercostal_artery_l",
    "node": "First posterior intercostal artery.l",
    "fmaId": "TA2:first_posterior_intercostal_artery_l",
    "namePtBr": "1º posterior intercostal artery Esquerdo",
    "nameEn": "First posterior intercostal artery (left)",
    "nameLatin": "Arteria intercostalis posterior prima",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:first_posterior_intercostal_artery_r",
    "node": "First posterior intercostal artery.r",
    "fmaId": "TA2:first_posterior_intercostal_artery_r",
    "namePtBr": "1º posterior intercostal artery Direito",
    "nameEn": "First posterior intercostal artery (right)",
    "nameLatin": "Arteria intercostalis posterior prima",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:second_posterior_intercostal_artery_l",
    "node": "Second posterior intercostal artery.l",
    "fmaId": "TA2:second_posterior_intercostal_artery_l",
    "namePtBr": "2º posterior intercostal artery Esquerdo",
    "nameEn": "Second posterior intercostal artery (left)",
    "nameLatin": "Arteria intercostalis posterior secunda",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:second_posterior_intercostal_artery_r",
    "node": "Second posterior intercostal artery.r",
    "fmaId": "TA2:second_posterior_intercostal_artery_r",
    "namePtBr": "2º posterior intercostal artery Direito",
    "nameEn": "Second posterior intercostal artery (right)",
    "nameLatin": "Arteria intercostalis posterior secunda",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:supreme_intercostal_artery_l",
    "node": "Supreme intercostal artery.l",
    "fmaId": "TA2:supreme_intercostal_artery_l",
    "namePtBr": "Supreme intercostal artery Esquerdo",
    "nameEn": "Supreme intercostal artery (left)",
    "nameLatin": "Arteria intercostalis suprema",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:supreme_intercostal_artery_r",
    "node": "Supreme intercostal artery.r",
    "fmaId": "TA2:supreme_intercostal_artery_r",
    "namePtBr": "Supreme intercostal artery Direito",
    "nameEn": "Supreme intercostal artery (right)",
    "nameLatin": "Arteria intercostalis suprema",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_interosseous_artery_l",
    "node": "Common interosseous artery.l",
    "fmaId": "TA2:common_interosseous_artery_l",
    "namePtBr": "Common interosseous artery Esquerdo",
    "nameEn": "Common interosseous artery (left)",
    "nameLatin": "Arteria interossea communis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_interosseous_artery_r",
    "node": "Common interosseous artery.r",
    "fmaId": "TA2:common_interosseous_artery_r",
    "namePtBr": "Common interosseous artery Direito",
    "nameEn": "Common interosseous artery (right)",
    "nameLatin": "Arteria interossea communis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_interosseous_artery_l",
    "node": "Posterior interosseous artery.l",
    "fmaId": "TA2:posterior_interosseous_artery_l",
    "namePtBr": "Posterior interosseous artery Esquerdo",
    "nameEn": "Posterior interosseous artery (left)",
    "nameLatin": "Arteria interossea posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_interosseous_artery_r",
    "node": "Posterior interosseous artery.r",
    "fmaId": "TA2:posterior_interosseous_artery_r",
    "namePtBr": "Posterior interosseous artery Direito",
    "nameEn": "Posterior interosseous artery (right)",
    "nameLatin": "Arteria interossea posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:recurrent_interosseous_artery_l",
    "node": "Recurrent interosseous artery.l",
    "fmaId": "TA2:recurrent_interosseous_artery_l",
    "namePtBr": "Recurrent interosseous artery Esquerdo",
    "nameEn": "Recurrent interosseous artery (left)",
    "nameLatin": "Arteria interossea recurrens",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:recurrent_interosseous_artery_r",
    "node": "Recurrent interosseous artery.r",
    "fmaId": "TA2:recurrent_interosseous_artery_r",
    "namePtBr": "Recurrent interosseous artery Direito",
    "nameEn": "Recurrent interosseous artery (right)",
    "nameLatin": "Arteria interossea recurrens",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_interventricular_artery",
    "node": "Anterior interventricular artery",
    "fmaId": "TA2:anterior_interventricular_artery",
    "namePtBr": "Anterior interventricular artery",
    "nameEn": "Anterior interventricular artery",
    "nameLatin": "Arteria interventricularis anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Cardiac vessels",
      "Arteries of heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_labial_artery_l",
    "node": "Inferior labial artery.l",
    "fmaId": "TA2:inferior_labial_artery_l",
    "namePtBr": "Inferior labial artery Esquerdo",
    "nameEn": "Inferior labial artery (left)",
    "nameLatin": "Arteria labialis inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_labial_artery_r",
    "node": "Inferior labial artery.r",
    "fmaId": "TA2:inferior_labial_artery_r",
    "namePtBr": "Inferior labial artery Direito",
    "nameEn": "Inferior labial artery (right)",
    "nameLatin": "Arteria labialis inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_labial_artery_l",
    "node": "Superior labial artery.l",
    "fmaId": "TA2:superior_labial_artery_l",
    "namePtBr": "Superior labial artery Esquerdo",
    "nameEn": "Superior labial artery (left)",
    "nameLatin": "Arteria labialis superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_labial_artery_r",
    "node": "Superior labial artery.r",
    "fmaId": "TA2:superior_labial_artery_r",
    "namePtBr": "Superior labial artery Direito",
    "nameEn": "Superior labial artery (right)",
    "nameLatin": "Arteria labialis superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lacrimal_artery_l",
    "node": "Lacrimal artery.l",
    "fmaId": "TA2:lacrimal_artery_l",
    "namePtBr": "Lacrimal artery Esquerdo",
    "nameEn": "Lacrimal artery (left)",
    "nameLatin": "Arteria lacrimalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lacrimal_artery_r",
    "node": "Lacrimal artery.r",
    "fmaId": "TA2:lacrimal_artery_r",
    "namePtBr": "Lacrimal artery Direito",
    "nameEn": "Lacrimal artery (right)",
    "nameLatin": "Arteria lacrimalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_lingular_artery_of_left_lung",
    "node": "Inferior lingular artery of left lung",
    "fmaId": "TA2:inferior_lingular_artery_of_left_lung",
    "namePtBr": "Inferior lingular artery of left lung",
    "nameEn": "Inferior lingular artery of left lung",
    "nameLatin": "Arteria lingularis inferior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Left pulmonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_lingular_artery_of_left_lung",
    "node": "Superior lingular artery of left lung",
    "fmaId": "TA2:superior_lingular_artery_of_left_lung",
    "namePtBr": "Superior lingular artery of left lung",
    "nameEn": "Superior lingular artery of left lung",
    "nameLatin": "Arteria lingularis superior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Left pulmonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_lobar_artery_of_right_lung",
    "node": "Inferior lobar artery of right lung",
    "fmaId": "TA2:inferior_lobar_artery_of_right_lung",
    "namePtBr": "Inferior lobar artery of right lung",
    "nameEn": "Inferior lobar artery of right lung",
    "nameLatin": "Arteria lobaris inferior pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:middle_lobar_artery_of_right_lung",
    "node": "Middle lobar artery of right lung",
    "fmaId": "TA2:middle_lobar_artery_of_right_lung",
    "namePtBr": "Middle lobar artery of right lung",
    "nameEn": "Middle lobar artery of right lung",
    "nameLatin": "Arteria lobaris media pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_lobar_artery_of_right_lung",
    "node": "Superior lobar artery of right lung",
    "fmaId": "TA2:superior_lobar_artery_of_right_lung",
    "namePtBr": "Superior lobar artery of right lung",
    "nameEn": "Superior lobar artery of right lung",
    "nameLatin": "Arteria lobaris superior pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:marginal_artery",
    "node": "Marginal artery",
    "fmaId": "TA2:marginal_artery",
    "namePtBr": "Marginal artery",
    "nameEn": "Marginal artery",
    "nameLatin": "Arteria marginalis coli",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:maxillary_artery_l",
    "node": "Maxillary artery.l",
    "fmaId": "TA2:maxillary_artery_l",
    "namePtBr": "Maxillary artery Esquerdo",
    "nameEn": "Maxillary artery (left)",
    "nameLatin": "Arteria maxillaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": -0.6,
      "y": -0.2,
      "z": 0.9
    }
  },
  {
    "id": "za:maxillary_artery_r",
    "node": "Maxillary artery.r",
    "fmaId": "TA2:maxillary_artery_r",
    "namePtBr": "Maxillary artery Direito",
    "nameEn": "Maxillary artery (right)",
    "nameLatin": "Arteria maxillaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.6,
      "y": -0.2,
      "z": 0.9
    }
  },
  {
    "id": "za:middle_meningeal_artery_l",
    "node": "Middle meningeal artery.l",
    "fmaId": "TA2:middle_meningeal_artery_l",
    "namePtBr": "Middle meningeal artery Esquerdo",
    "nameEn": "Middle meningeal artery (left)",
    "nameLatin": "Arteria meningea media",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:middle_meningeal_artery_r",
    "node": "Middle meningeal artery.r",
    "fmaId": "TA2:middle_meningeal_artery_r",
    "namePtBr": "Middle meningeal artery Direito",
    "nameEn": "Middle meningeal artery (right)",
    "nameLatin": "Arteria meningea media",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_mesenteric_artery",
    "node": "Inferior mesenteric artery",
    "fmaId": "TA2:inferior_mesenteric_artery",
    "namePtBr": "Inferior mesenteric artery",
    "nameEn": "Inferior mesenteric artery",
    "nameLatin": "Arteria mesenterica inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_mesenteric_artery",
    "node": "Superior mesenteric artery",
    "fmaId": "TA2:superior_mesenteric_artery",
    "namePtBr": "Superior mesenteric artery",
    "nameEn": "Superior mesenteric artery",
    "nameLatin": "Arteria mesenterica superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:musculophrenic_artery_l",
    "node": "Musculophrenic artery.l",
    "fmaId": "TA2:musculophrenic_artery_l",
    "namePtBr": "Musculophrenic artery Esquerdo",
    "nameEn": "Musculophrenic artery (left)",
    "nameLatin": "Arteria musculophrenica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:musculophrenic_artery_r",
    "node": "Musculophrenic artery.r",
    "fmaId": "TA2:musculophrenic_artery_r",
    "namePtBr": "Musculophrenic artery Direito",
    "nameEn": "Musculophrenic artery (right)",
    "nameLatin": "Arteria musculophrenica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:obturator_artery_l",
    "node": "Obturator artery.l",
    "fmaId": "TA2:obturator_artery_l",
    "namePtBr": "Obturator artery Esquerdo",
    "nameEn": "Obturator artery (left)",
    "nameLatin": "Arteria obturatoria",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:obturator_artery_r",
    "node": "Obturator artery.r",
    "fmaId": "TA2:obturator_artery_r",
    "namePtBr": "Obturator artery Direito",
    "nameEn": "Obturator artery (right)",
    "nameLatin": "Arteria obturatoria",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:occipital_artery_l",
    "node": "Occipital artery.l",
    "fmaId": "TA2:occipital_artery_l",
    "namePtBr": "Occipital artery Esquerdo",
    "nameEn": "Occipital artery (left)",
    "nameLatin": "Arteria occipitalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:occipital_artery_r",
    "node": "Occipital artery.r",
    "fmaId": "TA2:occipital_artery_r",
    "namePtBr": "Occipital artery Direito",
    "nameEn": "Occipital artery (right)",
    "nameLatin": "Arteria occipitalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_occipital_artery_l",
    "node": "Lateral occipital artery.l",
    "fmaId": "TA2:lateral_occipital_artery_l",
    "namePtBr": "Lateral occipital artery Esquerdo",
    "nameEn": "Lateral occipital artery (left)",
    "nameLatin": "Arteria occipitalis lateralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_occipital_artery_r",
    "node": "Lateral occipital artery.r",
    "fmaId": "TA2:lateral_occipital_artery_r",
    "namePtBr": "Lateral occipital artery Direito",
    "nameEn": "Lateral occipital artery (right)",
    "nameLatin": "Arteria occipitalis lateralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_occipital_artery_l",
    "node": "Medial occipital artery.l",
    "fmaId": "TA2:medial_occipital_artery_l",
    "namePtBr": "Medial occipital artery Esquerdo",
    "nameEn": "Medial occipital artery (left)",
    "nameLatin": "Arteria occipitalis medialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_occipital_artery_r",
    "node": "Medial occipital artery.r",
    "fmaId": "TA2:medial_occipital_artery_r",
    "namePtBr": "Medial occipital artery Direito",
    "nameEn": "Medial occipital artery (right)",
    "nameLatin": "Arteria occipitalis medialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:ophthalmic_artery_l",
    "node": "Ophthalmic artery.l",
    "fmaId": "TA2:ophthalmic_artery_l",
    "namePtBr": "Ophthalmic artery Esquerdo",
    "nameEn": "Ophthalmic artery (left)",
    "nameLatin": "Arteria ophthalmica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:ophthalmic_artery_r",
    "node": "Ophthalmic artery.r",
    "fmaId": "TA2:ophthalmic_artery_r",
    "namePtBr": "Ophthalmic artery Direito",
    "nameEn": "Ophthalmic artery (right)",
    "nameLatin": "Arteria ophthalmica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:descending_palatine_artery_l",
    "node": "Descending palatine artery.l",
    "fmaId": "TA2:descending_palatine_artery_l",
    "namePtBr": "Descending palatine artery Esquerdo",
    "nameEn": "Descending palatine artery (left)",
    "nameLatin": "Arteria palatina descendens",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:descending_palatine_artery_r",
    "node": "Descending palatine artery.r",
    "fmaId": "TA2:descending_palatine_artery_r",
    "namePtBr": "Descending palatine artery Direito",
    "nameEn": "Descending palatine artery (right)",
    "nameLatin": "Arteria palatina descendens",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:greater_palatine_artery_l",
    "node": "Greater palatine artery.l",
    "fmaId": "TA2:greater_palatine_artery_l",
    "namePtBr": "Greater palatine artery Esquerdo",
    "nameEn": "Greater palatine artery (left)",
    "nameLatin": "Arteria palatina major",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:greater_palatine_artery_r",
    "node": "Greater palatine artery.r",
    "fmaId": "TA2:greater_palatine_artery_r",
    "namePtBr": "Greater palatine artery Direito",
    "nameEn": "Greater palatine artery (right)",
    "nameLatin": "Arteria palatina major",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_pancreaticoduodenal_artery",
    "node": "Inferior pancreaticoduodenal artery",
    "fmaId": "TA2:inferior_pancreaticoduodenal_artery",
    "namePtBr": "Inferior pancreaticoduodenal artery",
    "nameEn": "Inferior pancreaticoduodenal artery",
    "nameLatin": "Arteria pancreaticoduodenalis inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_inferior_pancreaticoduodenal_artery",
    "node": "Anterior inferior pancreaticoduodenal artery",
    "fmaId": "TA2:anterior_inferior_pancreaticoduodenal_artery",
    "namePtBr": "Anterior inferior pancreaticoduodenal artery",
    "nameEn": "Anterior inferior pancreaticoduodenal artery",
    "nameLatin": "Arteria pancreaticoduodenalis inferior anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:parieto_occipital_artery_l",
    "node": "Parieto-occipital artery.l",
    "fmaId": "TA2:parieto_occipital_artery_l",
    "namePtBr": "Parieto-occipital artery Esquerdo",
    "nameEn": "Parieto-occipital artery (left)",
    "nameLatin": "Arteria parietooccipitalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:parieto_occipital_artery_r",
    "node": "Parieto-occipital artery.r",
    "fmaId": "TA2:parieto_occipital_artery_r",
    "namePtBr": "Parieto-occipital artery Direito",
    "nameEn": "Parieto-occipital artery (right)",
    "nameLatin": "Arteria parietooccipitalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:pericallosal_artery_l",
    "node": "Pericallosal artery.l",
    "fmaId": "TA2:pericallosal_artery_l",
    "namePtBr": "Pericallosal artery Esquerdo",
    "nameEn": "Pericallosal artery (left)",
    "nameLatin": "Arteria pericallosa",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:pericallosal_artery_r",
    "node": "Pericallosal artery.r",
    "fmaId": "TA2:pericallosal_artery_r",
    "namePtBr": "Pericallosal artery Direito",
    "nameEn": "Pericallosal artery (right)",
    "nameLatin": "Arteria pericallosa",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:ascending_pharyngeal_artery_l",
    "node": "Ascending pharyngeal artery.l",
    "fmaId": "TA2:ascending_pharyngeal_artery_l",
    "namePtBr": "Ascending pharyngeal artery Esquerdo",
    "nameEn": "Ascending pharyngeal artery (left)",
    "nameLatin": "Arteria pharyngea ascendens",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:ascending_pharyngeal_artery_r",
    "node": "Ascending pharyngeal artery.r",
    "fmaId": "TA2:ascending_pharyngeal_artery_r",
    "namePtBr": "Ascending pharyngeal artery Direito",
    "nameEn": "Ascending pharyngeal artery (right)",
    "nameLatin": "Arteria pharyngea ascendens",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_phrenic_artery",
    "node": "Inferior phrenic artery",
    "fmaId": "TA2:inferior_phrenic_artery",
    "namePtBr": "Inferior phrenic artery",
    "nameEn": "Inferior phrenic artery",
    "nameLatin": "Arteria phrenica inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_plantar_artery_l",
    "node": "Lateral plantar artery.l",
    "fmaId": "TA2:lateral_plantar_artery_l",
    "namePtBr": "Lateral plantar artery Esquerdo",
    "nameEn": "Lateral plantar artery (left)",
    "nameLatin": "Arteria plantaris lateralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_plantar_artery_r",
    "node": "Lateral plantar artery.r",
    "fmaId": "TA2:lateral_plantar_artery_r",
    "namePtBr": "Lateral plantar artery Direito",
    "nameEn": "Lateral plantar artery (right)",
    "nameLatin": "Arteria plantaris lateralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_plantar_artery_l",
    "node": "Medial plantar artery.l",
    "fmaId": "TA2:medial_plantar_artery_l",
    "namePtBr": "Medial plantar artery Esquerdo",
    "nameEn": "Medial plantar artery (left)",
    "nameLatin": "Arteria plantaris medialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_plantar_artery_r",
    "node": "Medial plantar artery.r",
    "fmaId": "TA2:medial_plantar_artery_r",
    "namePtBr": "Medial plantar artery Direito",
    "nameEn": "Medial plantar artery (right)",
    "nameLatin": "Arteria plantaris medialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_plantar_artery_l",
    "node": "Deep plantar artery.l",
    "fmaId": "TA2:deep_plantar_artery_l",
    "namePtBr": "Deep plantar artery Esquerdo",
    "nameEn": "Deep plantar artery (left)",
    "nameLatin": "Arteria plantaris profunda",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_plantar_artery_r",
    "node": "Deep plantar artery.r",
    "fmaId": "TA2:deep_plantar_artery_r",
    "namePtBr": "Deep plantar artery Direito",
    "nameEn": "Deep plantar artery (right)",
    "nameLatin": "Arteria plantaris profunda",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:popliteal_artery_l",
    "node": "Popliteal artery.l",
    "fmaId": "TA2:popliteal_artery_l",
    "namePtBr": "Popliteal artery Esquerdo",
    "nameEn": "Popliteal artery (left)",
    "nameLatin": "Arteria poplitea",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:popliteal_artery_r",
    "node": "Popliteal artery.r",
    "fmaId": "TA2:popliteal_artery_r",
    "namePtBr": "Popliteal artery Direito",
    "nameEn": "Popliteal artery (right)",
    "nameLatin": "Arteria poplitea",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_brachial_artery_l",
    "node": "Deep brachial artery.l",
    "fmaId": "TA2:deep_brachial_artery_l",
    "namePtBr": "Deep brachial artery Esquerdo",
    "nameEn": "Deep brachial artery (left)",
    "nameLatin": "Arteria profunda brachii",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_brachial_artery_r",
    "node": "Deep brachial artery.r",
    "fmaId": "TA2:deep_brachial_artery_r",
    "namePtBr": "Deep brachial artery Direito",
    "nameEn": "Deep brachial artery (right)",
    "nameLatin": "Arteria profunda brachii",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_femoral_artery_l",
    "node": "Deep femoral artery.l",
    "fmaId": "TA2:deep_femoral_artery_l",
    "namePtBr": "Deep femoral artery Esquerdo",
    "nameEn": "Deep femoral artery (left)",
    "nameLatin": "Arteria profunda femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_femoral_artery_r",
    "node": "Deep femoral artery.r",
    "fmaId": "TA2:deep_femoral_artery_r",
    "namePtBr": "Deep femoral artery Direito",
    "nameEn": "Deep femoral artery (right)",
    "nameLatin": "Arteria profunda femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_artery_of_penis_l",
    "node": "Deep artery of penis.l",
    "fmaId": "TA2:deep_artery_of_penis_l",
    "namePtBr": "Deep artery of penis Esquerdo",
    "nameEn": "Deep artery of penis (left)",
    "nameLatin": "Arteria profunda penis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_artery_of_penis_r",
    "node": "Deep artery of penis.r",
    "fmaId": "TA2:deep_artery_of_penis_r",
    "namePtBr": "Deep artery of penis Direito",
    "nameEn": "Deep artery of penis (right)",
    "nameLatin": "Arteria profunda penis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_external_pudendal_artery_l",
    "node": "Deep external pudendal artery.l",
    "fmaId": "TA2:deep_external_pudendal_artery_l",
    "namePtBr": "Deep external pudendal artery Esquerdo",
    "nameEn": "Deep external pudendal artery (left)",
    "nameLatin": "Arteria pudendalis externa profunda",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_external_pudendal_artery_r",
    "node": "Deep external pudendal artery.r",
    "fmaId": "TA2:deep_external_pudendal_artery_r",
    "namePtBr": "Deep external pudendal artery Direito",
    "nameEn": "Deep external pudendal artery (right)",
    "nameLatin": "Arteria pudendalis externa profunda",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_external_pudendal_artery_l",
    "node": "Superficial external pudendal artery.l",
    "fmaId": "TA2:superficial_external_pudendal_artery_l",
    "namePtBr": "Superficial external pudendal artery Esquerdo",
    "nameEn": "Superficial external pudendal artery (left)",
    "nameLatin": "Arteria pudendalis externa superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_external_pudendal_artery_r",
    "node": "Superficial external pudendal artery.r",
    "fmaId": "TA2:superficial_external_pudendal_artery_r",
    "namePtBr": "Superficial external pudendal artery Direito",
    "nameEn": "Superficial external pudendal artery (right)",
    "nameLatin": "Arteria pudendalis externa superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_pudendal_artery_l",
    "node": "Internal pudendal artery.l",
    "fmaId": "TA2:internal_pudendal_artery_l",
    "namePtBr": "Internal pudendal artery Esquerdo",
    "nameEn": "Internal pudendal artery (left)",
    "nameLatin": "Arteria pudendalis interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_pudendal_artery_r",
    "node": "Internal pudendal artery.r",
    "fmaId": "TA2:internal_pudendal_artery_r",
    "namePtBr": "Internal pudendal artery Direito",
    "nameEn": "Internal pudendal artery (right)",
    "nameLatin": "Arteria pudendalis interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_pulmonary_artery",
    "node": "Right pulmonary artery",
    "fmaId": "TA2:right_pulmonary_artery",
    "namePtBr": "Right pulmonary artery",
    "nameEn": "Right pulmonary artery",
    "nameLatin": "Arteria pulmonalis dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_pulmonary_artery",
    "node": "Left pulmonary artery",
    "fmaId": "TA2:left_pulmonary_artery",
    "namePtBr": "Left pulmonary artery",
    "nameEn": "Left pulmonary artery",
    "nameLatin": "Arteria pulmonalis sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Left pulmonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:radial_artery_l",
    "node": "Radial artery.l",
    "fmaId": "TA2:radial_artery_l",
    "namePtBr": "Radial artery Esquerdo",
    "nameEn": "Radial artery (left)",
    "nameLatin": "Arteria radialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:radial_artery_r",
    "node": "Radial artery.r",
    "fmaId": "TA2:radial_artery_r",
    "namePtBr": "Radial artery Direito",
    "nameEn": "Radial artery (right)",
    "nameLatin": "Arteria radialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_renal_artery",
    "node": "Left renal artery",
    "fmaId": "TA2:left_renal_artery",
    "namePtBr": "Left renal artery",
    "nameEn": "Left renal artery",
    "nameLatin": "Arteria renalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_renal_artery",
    "node": "Right renal artery",
    "fmaId": "TA2:right_renal_artery",
    "namePtBr": "Right renal artery",
    "nameEn": "Right renal artery",
    "nameLatin": "Arteria renalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:median_sacral_artery",
    "node": "Median sacral artery",
    "fmaId": "TA2:median_sacral_artery",
    "namePtBr": "Median sacral artery",
    "nameEn": "Median sacral artery",
    "nameLatin": "Arteria sacralis mediana",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_segmental_artery_of_right_lung",
    "node": "Anterior segmental artery of right lung",
    "fmaId": "TA2:anterior_segmental_artery_of_right_lung",
    "namePtBr": "Anterior segmental artery of right lung",
    "nameEn": "Anterior segmental artery of right lung",
    "nameLatin": "Arteria segmentalis anterior pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_segmental_artery_of_left_lung",
    "node": "Anterior segmental artery of left lung",
    "fmaId": "TA2:anterior_segmental_artery_of_left_lung",
    "namePtBr": "Anterior segmental artery of left lung",
    "nameEn": "Anterior segmental artery of left lung",
    "nameLatin": "Arteria segmentalis anterior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Left pulmonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:apical_segmental_artery_of_right_lung",
    "node": "Apical segmental artery of right lung",
    "fmaId": "TA2:apical_segmental_artery_of_right_lung",
    "namePtBr": "Apical segmental artery of right lung",
    "nameEn": "Apical segmental artery of right lung",
    "nameLatin": "Arteria segmentalis apicalis pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:apical_segmental_artery_of_left_lung",
    "node": "Apical segmental artery of left lung",
    "fmaId": "TA2:apical_segmental_artery_of_left_lung",
    "namePtBr": "Apical segmental artery of left lung",
    "nameEn": "Apical segmental artery of left lung",
    "nameLatin": "Arteria segmentalis apicalis pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Left pulmonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_basal_segmental_artery_of_right_lung",
    "node": "Anterior basal segmental artery of right lung",
    "fmaId": "TA2:anterior_basal_segmental_artery_of_right_lung",
    "namePtBr": "Anterior basal segmental artery of right lung",
    "nameEn": "Anterior basal segmental artery of right lung",
    "nameLatin": "Arteria segmentalis basalis anterior pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_basal_segmental_artery_of_left_lung",
    "node": "Anterior basal segmental artery of left lung",
    "fmaId": "TA2:anterior_basal_segmental_artery_of_left_lung",
    "namePtBr": "Anterior basal segmental artery of left lung",
    "nameEn": "Anterior basal segmental artery of left lung",
    "nameLatin": "Arteria segmentalis basalis anterior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Left pulmonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_basal_segmental_artery_of_right_lung",
    "node": "Lateral basal segmental artery of right lung",
    "fmaId": "TA2:lateral_basal_segmental_artery_of_right_lung",
    "namePtBr": "Lateral basal segmental artery of right lung",
    "nameEn": "Lateral basal segmental artery of right lung",
    "nameLatin": "Arteria segmentalis basalis lateralis pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_basal_segmental_artery_of_left_lung",
    "node": "Lateral basal segmental artery of left lung",
    "fmaId": "TA2:lateral_basal_segmental_artery_of_left_lung",
    "namePtBr": "Lateral basal segmental artery of left lung",
    "nameEn": "Lateral basal segmental artery of left lung",
    "nameLatin": "Arteria segmentalis basalis lateralis pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Left pulmonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_basal_segmental_artery_of_right_lung",
    "node": "Medial basal segmental artery of right lung",
    "fmaId": "TA2:medial_basal_segmental_artery_of_right_lung",
    "namePtBr": "Medial basal segmental artery of right lung",
    "nameEn": "Medial basal segmental artery of right lung",
    "nameLatin": "Arteria segmentalis basalis medialis pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_basal_segmental_artery_of_left_lung",
    "node": "Medial basal segmental artery of left lung",
    "fmaId": "TA2:medial_basal_segmental_artery_of_left_lung",
    "namePtBr": "Medial basal segmental artery of left lung",
    "nameEn": "Medial basal segmental artery of left lung",
    "nameLatin": "Arteria segmentalis basalis medialis pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Left pulmonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_basal_segmental_artery_of_right_lung",
    "node": "Posterior basal segmental artery of right lung",
    "fmaId": "TA2:posterior_basal_segmental_artery_of_right_lung",
    "namePtBr": "Posterior basal segmental artery of right lung",
    "nameEn": "Posterior basal segmental artery of right lung",
    "nameLatin": "Arteria segmentalis basalis posterior pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_basal_segmental_artery_of_left_lung",
    "node": "Posterior basal segmental artery of left lung",
    "fmaId": "TA2:posterior_basal_segmental_artery_of_left_lung",
    "namePtBr": "Posterior basal segmental artery of left lung",
    "nameEn": "Posterior basal segmental artery of left lung",
    "nameLatin": "Arteria segmentalis basalis posterior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Left pulmonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_segmental_artery_of_right_lung",
    "node": "Lateral segmental artery of right lung",
    "fmaId": "TA2:lateral_segmental_artery_of_right_lung",
    "namePtBr": "Lateral segmental artery of right lung",
    "nameEn": "Lateral segmental artery of right lung",
    "nameLatin": "Arteria segmentalis lateralis pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_segmental_artery_of_right_lung",
    "node": "Medial segmental artery of right lung",
    "fmaId": "TA2:medial_segmental_artery_of_right_lung",
    "namePtBr": "Medial segmental artery of right lung",
    "nameEn": "Medial segmental artery of right lung",
    "nameLatin": "Arteria segmentalis medialis pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_segmental_artery_of_right_lung",
    "node": "Posterior segmental artery of right lung",
    "fmaId": "TA2:posterior_segmental_artery_of_right_lung",
    "namePtBr": "Posterior segmental artery of right lung",
    "nameEn": "Posterior segmental artery of right lung",
    "nameLatin": "Arteria segmentalis posterior pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_segmental_artery_of_left_lung",
    "node": "Posterior segmental artery of left lung",
    "fmaId": "TA2:posterior_segmental_artery_of_left_lung",
    "namePtBr": "Posterior segmental artery of left lung",
    "nameEn": "Posterior segmental artery of left lung",
    "nameLatin": "Arteria segmentalis posterior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Left pulmonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_segmental_artery_of_right_lung",
    "node": "Superior segmental artery of right lung",
    "fmaId": "TA2:superior_segmental_artery_of_right_lung",
    "namePtBr": "Superior segmental artery of right lung",
    "nameEn": "Superior segmental artery of right lung",
    "nameLatin": "Arteria segmentalis superior pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Right pulonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_segmental_artery_of_left_lung",
    "node": "Superior segmental artery of left lung",
    "fmaId": "TA2:superior_segmental_artery_of_left_lung",
    "namePtBr": "Superior segmental artery of left lung",
    "nameEn": "Superior segmental artery of left lung",
    "nameLatin": "Arteria segmentalis superior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries",
      "Left pulmonary artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_spinal_artery_l",
    "node": "Anterior spinal artery.l",
    "fmaId": "TA2:anterior_spinal_artery_l",
    "namePtBr": "Anterior spinal artery Esquerdo",
    "nameEn": "Anterior spinal artery (left)",
    "nameLatin": "Arteria spinalis anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_spinal_artery_r",
    "node": "Anterior spinal artery.r",
    "fmaId": "TA2:anterior_spinal_artery_r",
    "namePtBr": "Anterior spinal artery Direito",
    "nameEn": "Anterior spinal artery (right)",
    "nameLatin": "Arteria spinalis anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:splenic_artery",
    "node": "Splenic artery",
    "fmaId": "TA2:splenic_artery",
    "namePtBr": "Splenic artery",
    "nameEn": "Splenic artery",
    "nameLatin": "Arteria splenica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_subclavian_artery",
    "node": "Right subclavian artery",
    "fmaId": "TA2:right_subclavian_artery",
    "namePtBr": "Right subclavian artery",
    "nameEn": "Right subclavian artery",
    "nameLatin": "Arteria subclavia dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_subclavian_artery",
    "node": "Left subclavian artery",
    "fmaId": "TA2:left_subclavian_artery",
    "namePtBr": "Left subclavian artery",
    "nameEn": "Left subclavian artery",
    "nameLatin": "Arteria subclavia sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:subcostal_artery_l",
    "node": "Subcostal artery.l",
    "fmaId": "TA2:subcostal_artery_l",
    "namePtBr": "Subcostal artery Esquerdo",
    "nameEn": "Subcostal artery (left)",
    "nameLatin": "Arteria subcostalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:subcostal_artery_r",
    "node": "Subcostal artery.r",
    "fmaId": "TA2:subcostal_artery_r",
    "namePtBr": "Subcostal artery Direito",
    "nameEn": "Subcostal artery (right)",
    "nameLatin": "Arteria subcostalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:submental_artery_l",
    "node": "Submental artery.l",
    "fmaId": "TA2:submental_artery_l",
    "namePtBr": "Submental artery Esquerdo",
    "nameEn": "Submental artery (left)",
    "nameLatin": "Arteria submentalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:submental_artery_r",
    "node": "Submental artery.r",
    "fmaId": "TA2:submental_artery_r",
    "namePtBr": "Submental artery Direito",
    "nameEn": "Submental artery (right)",
    "nameLatin": "Arteria submentalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:subscapular_artery_l",
    "node": "Subscapular artery.l",
    "fmaId": "TA2:subscapular_artery_l",
    "namePtBr": "Subscapular artery Esquerdo",
    "nameEn": "Subscapular artery (left)",
    "nameLatin": "Arteria subscapularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:subscapular_artery_r",
    "node": "Subscapular artery.r",
    "fmaId": "TA2:subscapular_artery_r",
    "namePtBr": "Subscapular artery Direito",
    "nameEn": "Subscapular artery (right)",
    "nameLatin": "Arteria subscapularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:superior_lateral_genicular_artery_l",
    "node": "Superior lateral genicular artery.l",
    "fmaId": "TA2:superior_lateral_genicular_artery_l",
    "namePtBr": "Superior lateral genicular artery Esquerdo",
    "nameEn": "Superior lateral genicular artery (left)",
    "nameLatin": "Arteria superior lateralis genus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_lateral_genicular_artery_r",
    "node": "Superior lateral genicular artery.r",
    "fmaId": "TA2:superior_lateral_genicular_artery_r",
    "namePtBr": "Superior lateral genicular artery Direito",
    "nameEn": "Superior lateral genicular artery (right)",
    "nameLatin": "Arteria superior lateralis genus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_medial_genicular_artery_l",
    "node": "Superior medial genicular artery.l",
    "fmaId": "TA2:superior_medial_genicular_artery_l",
    "namePtBr": "Superior medial genicular artery Esquerdo",
    "nameEn": "Superior medial genicular artery (left)",
    "nameLatin": "Arteria superior medialis genus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_medial_genicular_artery_r",
    "node": "Superior medial genicular artery.r",
    "fmaId": "TA2:superior_medial_genicular_artery_r",
    "namePtBr": "Superior medial genicular artery Direito",
    "nameEn": "Superior medial genicular artery (right)",
    "nameLatin": "Arteria superior medialis genus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:supra_orbital_artery_l",
    "node": "Supra-orbital artery.l",
    "fmaId": "TA2:supra_orbital_artery_l",
    "namePtBr": "Supra-orbital artery Esquerdo",
    "nameEn": "Supra-orbital artery (left)",
    "nameLatin": "Arteria supraorbitalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:supra_orbital_artery_r",
    "node": "Supra-orbital artery.r",
    "fmaId": "TA2:supra_orbital_artery_r",
    "namePtBr": "Supra-orbital artery Direito",
    "nameEn": "Supra-orbital artery (right)",
    "nameLatin": "Arteria supraorbitalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_suprarenal_artery_l",
    "node": "Inferior suprarenal artery.l",
    "fmaId": "TA2:inferior_suprarenal_artery_l",
    "namePtBr": "Inferior suprarenal artery Esquerdo",
    "nameEn": "Inferior suprarenal artery (left)",
    "nameLatin": "Arteria suprarenalis inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_suprarenal_artery_r",
    "node": "Inferior suprarenal artery.r",
    "fmaId": "TA2:inferior_suprarenal_artery_r",
    "namePtBr": "Inferior suprarenal artery Direito",
    "nameEn": "Inferior suprarenal artery (right)",
    "nameLatin": "Arteria suprarenalis inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:suprascapular_artery_l",
    "node": "Suprascapular artery.l",
    "fmaId": "TA2:suprascapular_artery_l",
    "namePtBr": "Suprascapular artery Esquerdo",
    "nameEn": "Suprascapular artery (left)",
    "nameLatin": "Arteria suprascapularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:suprascapular_artery_r",
    "node": "Suprascapular artery.r",
    "fmaId": "TA2:suprascapular_artery_r",
    "namePtBr": "Suprascapular artery Direito",
    "nameEn": "Suprascapular artery (right)",
    "nameLatin": "Arteria suprascapularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:supratrochlear_artery_l",
    "node": "Supratrochlear artery.l",
    "fmaId": "TA2:supratrochlear_artery_l",
    "namePtBr": "Supratrochlear artery Esquerdo",
    "nameEn": "Supratrochlear artery (left)",
    "nameLatin": "Arteria supratrochlearis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:supratrochlear_artery_r",
    "node": "Supratrochlear artery.r",
    "fmaId": "TA2:supratrochlear_artery_r",
    "namePtBr": "Supratrochlear artery Direito",
    "nameEn": "Supratrochlear artery (right)",
    "nameLatin": "Arteria supratrochlearis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_tarsal_artery_l",
    "node": "Lateral tarsal artery.l",
    "fmaId": "TA2:lateral_tarsal_artery_l",
    "namePtBr": "Lateral tarsal artery Esquerdo",
    "nameEn": "Lateral tarsal artery (left)",
    "nameLatin": "Arteria tarsea lateralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_tarsal_artery_r",
    "node": "Lateral tarsal artery.r",
    "fmaId": "TA2:lateral_tarsal_artery_r",
    "namePtBr": "Lateral tarsal artery Direito",
    "nameEn": "Lateral tarsal artery (right)",
    "nameLatin": "Arteria tarsea lateralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_deep_temporal_artery_l",
    "node": "Anterior deep temporal artery.l",
    "fmaId": "TA2:anterior_deep_temporal_artery_l",
    "namePtBr": "Anterior deep temporal artery Esquerdo",
    "nameEn": "Anterior deep temporal artery (left)",
    "nameLatin": "Arteria temporalis profunda anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_deep_temporal_artery_r",
    "node": "Anterior deep temporal artery.r",
    "fmaId": "TA2:anterior_deep_temporal_artery_r",
    "namePtBr": "Anterior deep temporal artery Direito",
    "nameEn": "Anterior deep temporal artery (right)",
    "nameLatin": "Arteria temporalis profunda anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_deep_temporal_artery_l",
    "node": "Posterior deep temporal artery.l",
    "fmaId": "TA2:posterior_deep_temporal_artery_l",
    "namePtBr": "Posterior deep temporal artery Esquerdo",
    "nameEn": "Posterior deep temporal artery (left)",
    "nameLatin": "Arteria temporalis profunda posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_deep_temporal_artery_r",
    "node": "Posterior deep temporal artery.r",
    "fmaId": "TA2:posterior_deep_temporal_artery_r",
    "namePtBr": "Posterior deep temporal artery Direito",
    "nameEn": "Posterior deep temporal artery (right)",
    "nameLatin": "Arteria temporalis profunda posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_temporal_artery_l",
    "node": "Superficial temporal artery.l",
    "fmaId": "TA2:superficial_temporal_artery_l",
    "namePtBr": "Superficial temporal artery Esquerdo",
    "nameEn": "Superficial temporal artery (left)",
    "nameLatin": "Arteria temporalis superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_temporal_artery_r",
    "node": "Superficial temporal artery.r",
    "fmaId": "TA2:superficial_temporal_artery_r",
    "namePtBr": "Superficial temporal artery Direito",
    "nameEn": "Superficial temporal artery (right)",
    "nameLatin": "Arteria temporalis superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_testicular_artery_r",
    "node": "Right testicular artery.r",
    "fmaId": "TA2:right_testicular_artery_r",
    "namePtBr": "Right testicular artery Direito",
    "nameEn": "Right testicular artery (right)",
    "nameLatin": "Arteria testicularis dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_testicular_artery",
    "node": "Left testicular artery",
    "fmaId": "TA2:left_testicular_artery",
    "namePtBr": "Left testicular artery",
    "nameEn": "Left testicular artery",
    "nameLatin": "Arteria testicularis sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_thoracic_artery_l",
    "node": "Internal thoracic artery.l",
    "fmaId": "TA2:internal_thoracic_artery_l",
    "namePtBr": "Internal thoracic artery Esquerdo",
    "nameEn": "Internal thoracic artery (left)",
    "nameLatin": "Arteria thoracica interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_thoracic_artery_r",
    "node": "Internal thoracic artery.r",
    "fmaId": "TA2:internal_thoracic_artery_r",
    "namePtBr": "Internal thoracic artery Direito",
    "nameEn": "Internal thoracic artery (right)",
    "nameLatin": "Arteria thoracica interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_thoracic_artery_l",
    "node": "Lateral thoracic artery.l",
    "fmaId": "TA2:lateral_thoracic_artery_l",
    "namePtBr": "Lateral thoracic artery Esquerdo",
    "nameEn": "Lateral thoracic artery (left)",
    "nameLatin": "Arteria thoracica lateralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_thoracic_artery_r",
    "node": "Lateral thoracic artery.r",
    "fmaId": "TA2:lateral_thoracic_artery_r",
    "namePtBr": "Lateral thoracic artery Direito",
    "nameEn": "Lateral thoracic artery (right)",
    "nameLatin": "Arteria thoracica lateralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:thoraco_acromial_artery_l",
    "node": "Thoraco-acromial artery.l",
    "fmaId": "TA2:thoraco_acromial_artery_l",
    "namePtBr": "Thoraco-acromial artery Esquerdo",
    "nameEn": "Thoraco-acromial artery (left)",
    "nameLatin": "Arteria thoracoacromialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:thoraco_acromial_artery_r",
    "node": "Thoraco-acromial artery.r",
    "fmaId": "TA2:thoraco_acromial_artery_r",
    "namePtBr": "Thoraco-acromial artery Direito",
    "nameEn": "Thoraco-acromial artery (right)",
    "nameLatin": "Arteria thoracoacromialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:thoracodorsal_artery_l",
    "node": "Thoracodorsal artery.l",
    "fmaId": "TA2:thoracodorsal_artery_l",
    "namePtBr": "Thoracodorsal artery Esquerdo",
    "nameEn": "Thoracodorsal artery (left)",
    "nameLatin": "Arteria thoracodorsalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:thoracodorsal_artery_r",
    "node": "Thoracodorsal artery.r",
    "fmaId": "TA2:thoracodorsal_artery_r",
    "namePtBr": "Thoracodorsal artery Direito",
    "nameEn": "Thoracodorsal artery (right)",
    "nameLatin": "Arteria thoracodorsalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_thyroid_artery_l",
    "node": "Inferior thyroid artery.l",
    "fmaId": "TA2:inferior_thyroid_artery_l",
    "namePtBr": "Inferior thyroid artery Esquerdo",
    "nameEn": "Inferior thyroid artery (left)",
    "nameLatin": "Arteria thyreoidea inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_thyroid_artery_r",
    "node": "Inferior thyroid artery.r",
    "fmaId": "TA2:inferior_thyroid_artery_r",
    "namePtBr": "Inferior thyroid artery Direito",
    "nameEn": "Inferior thyroid artery (right)",
    "nameLatin": "Arteria thyreoidea inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_tibial_artery_l",
    "node": "Anterior tibial artery.l",
    "fmaId": "TA2:anterior_tibial_artery_l",
    "namePtBr": "Anterior tibial artery Esquerdo",
    "nameEn": "Anterior tibial artery (left)",
    "nameLatin": "Arteria tibialis anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:anterior_tibial_artery_r",
    "node": "Anterior tibial artery.r",
    "fmaId": "TA2:anterior_tibial_artery_r",
    "namePtBr": "Anterior tibial artery Direito",
    "nameEn": "Anterior tibial artery (right)",
    "nameLatin": "Arteria tibialis anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:posterior_tibial_artery_l",
    "node": "Posterior tibial artery.l",
    "fmaId": "TA2:posterior_tibial_artery_l",
    "namePtBr": "Posterior tibial artery Esquerdo",
    "nameEn": "Posterior tibial artery (left)",
    "nameLatin": "Arteria tibialis posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:posterior_tibial_artery_r",
    "node": "Posterior tibial artery.r",
    "fmaId": "TA2:posterior_tibial_artery_r",
    "namePtBr": "Posterior tibial artery Direito",
    "nameEn": "Posterior tibial artery (right)",
    "nameLatin": "Arteria tibialis posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:transverse_cervical_artery_l",
    "node": "Transverse cervical artery.l",
    "fmaId": "TA2:transverse_cervical_artery_l",
    "namePtBr": "Transverse cervical artery Esquerdo",
    "nameEn": "Transverse cervical artery (left)",
    "nameLatin": "Arteria transversa colli",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.6,
      "z": -0.2
    }
  },
  {
    "id": "za:transverse_cervical_artery_r",
    "node": "Transverse cervical artery.r",
    "fmaId": "TA2:transverse_cervical_artery_r",
    "namePtBr": "Transverse cervical artery Direito",
    "nameEn": "Transverse cervical artery (right)",
    "nameLatin": "Arteria transversa colli",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.6,
      "z": -0.2
    }
  },
  {
    "id": "za:transverse_facial_artery_l",
    "node": "Transverse facial artery.l",
    "fmaId": "TA2:transverse_facial_artery_l",
    "namePtBr": "Transverse facial artery Esquerdo",
    "nameEn": "Transverse facial artery (left)",
    "nameLatin": "Arteria transversa faciei",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:transverse_facial_artery_r",
    "node": "Transverse facial artery.r",
    "fmaId": "TA2:transverse_facial_artery_r",
    "namePtBr": "Transverse facial artery Direito",
    "nameEn": "Transverse facial artery (right)",
    "nameLatin": "Arteria transversa faciei",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:ulnar_artery_l",
    "node": "Ulnar artery.l",
    "fmaId": "TA2:ulnar_artery_l",
    "namePtBr": "Ulnar artery Esquerdo",
    "nameEn": "Ulnar artery (left)",
    "nameLatin": "Arteria ulnaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:ulnar_artery_r",
    "node": "Ulnar artery.r",
    "fmaId": "TA2:ulnar_artery_r",
    "namePtBr": "Ulnar artery Direito",
    "nameEn": "Ulnar artery (right)",
    "nameLatin": "Arteria ulnaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:vertebral_artery_l",
    "node": "Vertebral artery.l",
    "fmaId": "TA2:vertebral_artery_l",
    "namePtBr": "Vertebral artery Esquerdo",
    "nameEn": "Vertebral artery (left)",
    "nameLatin": "Arteria vertebralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:vertebral_artery_r",
    "node": "Vertebral artery.r",
    "fmaId": "TA2:vertebral_artery_r",
    "namePtBr": "Vertebral artery Direito",
    "nameEn": "Vertebral artery (right)",
    "nameLatin": "Arteria vertebralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:short_posterior_ciliary_arteries_l",
    "node": "Short posterior ciliary arteries.l",
    "fmaId": "TA2:short_posterior_ciliary_arteries_l",
    "namePtBr": "Short posterior ciliary arteries Esquerdo",
    "nameEn": "Short posterior ciliary arteries (left)",
    "nameLatin": "Arteriae ciliares posteriores breves",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:short_posterior_ciliary_arteries_r",
    "node": "Short posterior ciliary arteries.r",
    "fmaId": "TA2:short_posterior_ciliary_arteries_r",
    "namePtBr": "Short posterior ciliary arteries Direito",
    "nameEn": "Short posterior ciliary arteries (right)",
    "nameLatin": "Arteriae ciliares posteriores breves",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:long_posterior_ciliary_arteries_l",
    "node": "Long posterior ciliary arteries.l",
    "fmaId": "TA2:long_posterior_ciliary_arteries_l",
    "namePtBr": "Long posterior ciliary arteries Esquerdo",
    "nameEn": "Long posterior ciliary arteries (left)",
    "nameLatin": "Arteriae ciliares posteriores longae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:long_posterior_ciliary_arteries_r",
    "node": "Long posterior ciliary arteries.r",
    "fmaId": "TA2:long_posterior_ciliary_arteries_r",
    "namePtBr": "Long posterior ciliary arteries Direito",
    "nameEn": "Long posterior ciliary arteries (right)",
    "nameLatin": "Arteriae ciliares posteriores longae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_digital_arteries_of_hand_l",
    "node": "Dorsal digital arteries of hand.l",
    "fmaId": "TA2:dorsal_digital_arteries_of_hand_l",
    "namePtBr": "Dorsal digital arteries of hand Esquerdo",
    "nameEn": "Dorsal digital arteries of hand (left)",
    "nameLatin": "Arteriae digitales dorsales manus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_digital_arteries_of_hand_r",
    "node": "Dorsal digital arteries of hand.r",
    "fmaId": "TA2:dorsal_digital_arteries_of_hand_r",
    "namePtBr": "Dorsal digital arteries of hand Direito",
    "nameEn": "Dorsal digital arteries of hand (right)",
    "nameLatin": "Arteriae digitales dorsales manus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_digital_arteries_of_foot_l",
    "node": "Dorsal digital arteries of foot.l",
    "fmaId": "TA2:dorsal_digital_arteries_of_foot_l",
    "namePtBr": "Dorsal digital arteries of foot Esquerdo",
    "nameEn": "Dorsal digital arteries of foot (left)",
    "nameLatin": "Arteriae digitales dorsales pedis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_digital_arteries_of_foot_r",
    "node": "Dorsal digital arteries of foot.r",
    "fmaId": "TA2:dorsal_digital_arteries_of_foot_r",
    "namePtBr": "Dorsal digital arteries of foot Direito",
    "nameEn": "Dorsal digital arteries of foot (right)",
    "nameLatin": "Arteriae digitales dorsales pedis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_palmar_digital_arteries_l",
    "node": "Common palmar digital arteries.l",
    "fmaId": "TA2:common_palmar_digital_arteries_l",
    "namePtBr": "Common palmar digital arteries Esquerdo",
    "nameEn": "Common palmar digital arteries (left)",
    "nameLatin": "Arteriae digitales palmares communes",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_palmar_digital_arteries_r",
    "node": "Common palmar digital arteries.r",
    "fmaId": "TA2:common_palmar_digital_arteries_r",
    "namePtBr": "Common palmar digital arteries Direito",
    "nameEn": "Common palmar digital arteries (right)",
    "nameLatin": "Arteriae digitales palmares communes",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:proper_palmar_digital_arteries_l",
    "node": "Proper palmar digital arteries.l",
    "fmaId": "TA2:proper_palmar_digital_arteries_l",
    "namePtBr": "Proper palmar digital arteries Esquerdo",
    "nameEn": "Proper palmar digital arteries (left)",
    "nameLatin": "Arteriae digitales palmares propriae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:proper_palmar_digital_arteries_r",
    "node": "Proper palmar digital arteries.r",
    "fmaId": "TA2:proper_palmar_digital_arteries_r",
    "namePtBr": "Proper palmar digital arteries Direito",
    "nameEn": "Proper palmar digital arteries (right)",
    "nameLatin": "Arteriae digitales palmares propriae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_plantar_digital_arteries_l",
    "node": "Common plantar digital arteries.l",
    "fmaId": "TA2:common_plantar_digital_arteries_l",
    "namePtBr": "Common plantar digital arteries Esquerdo",
    "nameEn": "Common plantar digital arteries (left)",
    "nameLatin": "Arteriae digitales plantares communes",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_plantar_digital_arteries_r",
    "node": "Common plantar digital arteries.r",
    "fmaId": "TA2:common_plantar_digital_arteries_r",
    "namePtBr": "Common plantar digital arteries Direito",
    "nameEn": "Common plantar digital arteries (right)",
    "nameLatin": "Arteriae digitales plantares communes",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:proper_plantar_digital_arteries_l",
    "node": "Proper plantar digital arteries.l",
    "fmaId": "TA2:proper_plantar_digital_arteries_l",
    "namePtBr": "Proper plantar digital arteries Esquerdo",
    "nameEn": "Proper plantar digital arteries (left)",
    "nameLatin": "Arteriae digitales plantares propriae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:proper_plantar_digital_arteries_r",
    "node": "Proper plantar digital arteries.r",
    "fmaId": "TA2:proper_plantar_digital_arteries_r",
    "namePtBr": "Proper plantar digital arteries Direito",
    "nameEn": "Proper plantar digital arteries (right)",
    "nameLatin": "Arteriae digitales plantares propriae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_intercostal_arteries_l",
    "node": "Posterior intercostal arteries.l",
    "fmaId": "TA2:posterior_intercostal_arteries_l",
    "namePtBr": "Posterior intercostal arteries Esquerdo",
    "nameEn": "Posterior intercostal arteries (left)",
    "nameLatin": "Arteriae intercostales posteriores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_intercostal_arteries_r",
    "node": "Posterior intercostal arteries.r",
    "fmaId": "TA2:posterior_intercostal_arteries_r",
    "namePtBr": "Posterior intercostal arteries Direito",
    "nameEn": "Posterior intercostal arteries (right)",
    "nameLatin": "Arteriae intercostales posteriores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:intrarenal_arteries_of_right_kidney",
    "node": "Intrarenal arteries of right kidney",
    "fmaId": "TA2:intrarenal_arteries_of_right_kidney",
    "namePtBr": "Intrarenal arteries of right kidney",
    "nameEn": "Intrarenal arteries of right kidney",
    "nameLatin": "Arteriae intrarenales renis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:intrarenal_arteries_of_left_kidney",
    "node": "Intrarenal arteries of left kidney",
    "fmaId": "TA2:intrarenal_arteries_of_left_kidney",
    "namePtBr": "Intrarenal arteries of left kidney",
    "nameEn": "Intrarenal arteries of left kidney",
    "nameLatin": "Arteriae intrarenales renis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lumbar_arteries_l",
    "node": "Lumbar arteries.l",
    "fmaId": "TA2:lumbar_arteries_l",
    "namePtBr": "Lumbar arteries Esquerdo",
    "nameEn": "Lumbar arteries (left)",
    "nameLatin": "Arteriae lumbales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:lumbar_arteries_r",
    "node": "Lumbar arteries.r",
    "fmaId": "TA2:lumbar_arteries_r",
    "namePtBr": "Lumbar arteries Direito",
    "nameEn": "Lumbar arteries (right)",
    "nameLatin": "Arteriae lumbales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:dorsal_metacarpal_arteries_l",
    "node": "Dorsal metacarpal arteries.l",
    "fmaId": "TA2:dorsal_metacarpal_arteries_l",
    "namePtBr": "Dorsal Metacarpal arteries Esquerdo",
    "nameEn": "Dorsal metacarpal arteries (left)",
    "nameLatin": "Arteriae metacarpeae dorsales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_metacarpal_arteries_r",
    "node": "Dorsal metacarpal arteries.r",
    "fmaId": "TA2:dorsal_metacarpal_arteries_r",
    "namePtBr": "Dorsal Metacarpal arteries Direito",
    "nameEn": "Dorsal metacarpal arteries (right)",
    "nameLatin": "Arteriae metacarpeae dorsales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:palmar_metacarpal_arteries_l",
    "node": "Palmar metacarpal arteries.l",
    "fmaId": "TA2:palmar_metacarpal_arteries_l",
    "namePtBr": "Palmar Metacarpal arteries Esquerdo",
    "nameEn": "Palmar metacarpal arteries (left)",
    "nameLatin": "Arteriae metacarpeae palmares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:palmar_metacarpal_arteries_r",
    "node": "Palmar metacarpal arteries.r",
    "fmaId": "TA2:palmar_metacarpal_arteries_r",
    "namePtBr": "Palmar Metacarpal arteries Direito",
    "nameEn": "Palmar metacarpal arteries (right)",
    "nameLatin": "Arteriae metacarpeae palmares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_metatarsal_arteries_l",
    "node": "Dorsal metatarsal arteries.l",
    "fmaId": "TA2:dorsal_metatarsal_arteries_l",
    "namePtBr": "Dorsal Metatarsal arteries Esquerdo",
    "nameEn": "Dorsal metatarsal arteries (left)",
    "nameLatin": "Arteriae metatarseae dorsales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:dorsal_metatarsal_arteries_r",
    "node": "Dorsal metatarsal arteries.r",
    "fmaId": "TA2:dorsal_metatarsal_arteries_r",
    "namePtBr": "Dorsal Metatarsal arteries Direito",
    "nameEn": "Dorsal metatarsal arteries (right)",
    "nameLatin": "Arteriae metatarseae dorsales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:plantar_metatarsal_arteries_l",
    "node": "Plantar metatarsal arteries.l",
    "fmaId": "TA2:plantar_metatarsal_arteries_l",
    "namePtBr": "Plantar Metatarsal arteries Esquerdo",
    "nameEn": "Plantar metatarsal arteries (left)",
    "nameLatin": "Arteriae metatarseae plantares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:plantar_metatarsal_arteries_r",
    "node": "Plantar metatarsal arteries.r",
    "fmaId": "TA2:plantar_metatarsal_arteries_r",
    "namePtBr": "Plantar Metatarsal arteries Direito",
    "nameEn": "Plantar metatarsal arteries (right)",
    "nameLatin": "Arteriae metatarseae plantares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:perforating_femoral_arteries_l",
    "node": "Perforating femoral arteries.l",
    "fmaId": "TA2:perforating_femoral_arteries_l",
    "namePtBr": "Perforating femoral arteries Esquerdo",
    "nameEn": "Perforating femoral arteries (left)",
    "nameLatin": "Arteriae perforantes femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:perforating_femoral_arteries_r",
    "node": "Perforating femoral arteries.r",
    "fmaId": "TA2:perforating_femoral_arteries_r",
    "namePtBr": "Perforating femoral arteries Direito",
    "nameEn": "Perforating femoral arteries (right)",
    "nameLatin": "Arteriae perforantes femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_phrenic_arteries",
    "node": "Superior phrenic arteries",
    "fmaId": "TA2:superior_phrenic_arteries",
    "namePtBr": "Superior phrenic arteries",
    "nameEn": "Superior phrenic arteries",
    "nameLatin": "Arteriae phrenicae superiores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:sigmoid_arteries",
    "node": "Sigmoid arteries",
    "fmaId": "TA2:sigmoid_arteries",
    "namePtBr": "Sigmoid arteries",
    "nameEn": "Sigmoid arteries",
    "nameLatin": "Arteriae sigmoideae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:atlas_c1",
    "node": "Atlas (C1)",
    "fmaId": "TA2:atlas_c1",
    "namePtBr": "Vértebra Atlas (C1)",
    "nameEn": "Atlas (C1)",
    "nameLatin": "Atlas (C1",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Cervical vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.6,
      "z": -0.2
    }
  },
  {
    "id": "za:right_atrium",
    "node": "Right atrium",
    "fmaId": "TA2:right_atrium",
    "namePtBr": "Right atrium",
    "nameEn": "Right atrium",
    "nameLatin": "Atrium dextrum",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_atrium",
    "node": "Left atrium",
    "fmaId": "TA2:left_atrium",
    "namePtBr": "Left atrium",
    "nameEn": "Left atrium",
    "nameLatin": "Atrium sinistrum",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:axis_c2",
    "node": "Axis (C2)",
    "fmaId": "TA2:axis_c2",
    "namePtBr": "Vértebra Áxis (C2)",
    "nameEn": "Axis (C2)",
    "nameLatin": "Axis (C2",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Cervical vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.6,
      "z": -0.2
    }
  },
  {
    "id": "za:base_of_peduncle_l",
    "node": "Base of peduncle.l",
    "fmaId": "TA2:base_of_peduncle_l",
    "namePtBr": "Base of peduncle Esquerdo",
    "nameEn": "Base of peduncle (left)",
    "nameLatin": "Basis pedunculi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:base_of_peduncle_r",
    "node": "Base of peduncle.r",
    "fmaId": "TA2:base_of_peduncle_r",
    "namePtBr": "Base of peduncle Direito",
    "nameEn": "Base of peduncle (right)",
    "nameLatin": "Basis pedunculi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:bifurcation_of_pulmonary_trunk",
    "node": "Bifurcation of pulmonary trunk",
    "fmaId": "TA2:bifurcation_of_pulmonary_trunk",
    "namePtBr": "Bifurcation of pulmonary trunk",
    "nameEn": "Bifurcation of pulmonary trunk",
    "nameLatin": "Bifurcatio trunci pulmonalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:intermediate_bronchus_r",
    "node": "Intermediate bronchus.r",
    "fmaId": "TA2:intermediate_bronchus_r",
    "namePtBr": "Intermediate bronchus Direito",
    "nameEn": "Intermediate bronchus (right)",
    "nameLatin": "Bronchus intermedius",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0.8,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:right_inferior_lobar_bronchus",
    "node": "Right inferior lobar bronchus",
    "fmaId": "TA2:right_inferior_lobar_bronchus",
    "namePtBr": "Right inferior lobar bronchus",
    "nameEn": "Right inferior lobar bronchus",
    "nameLatin": "Bronchus lobaris inferior dexter",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:left_inferior_lobar_bronchus",
    "node": "Left inferior lobar bronchus",
    "fmaId": "TA2:left_inferior_lobar_bronchus",
    "namePtBr": "Left inferior lobar bronchus",
    "nameEn": "Left inferior lobar bronchus",
    "nameLatin": "Bronchus lobaris inferior sinister",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:middle_lobar_bronchus_r",
    "node": "Middle lobar bronchus.r",
    "fmaId": "TA2:middle_lobar_bronchus_r",
    "namePtBr": "Middle lobar bronchus Direito",
    "nameEn": "Middle lobar bronchus (right)",
    "nameLatin": "Bronchus lobaris medius",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0.8,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:right_superior_lobar_bronchus",
    "node": "Right superior lobar bronchus",
    "fmaId": "TA2:right_superior_lobar_bronchus",
    "namePtBr": "Right superior lobar bronchus",
    "nameEn": "Right superior lobar bronchus",
    "nameLatin": "Bronchus lobaris superior dexter",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:left_superior_lobar_bronchus",
    "node": "Left superior lobar bronchus",
    "fmaId": "TA2:left_superior_lobar_bronchus",
    "namePtBr": "Left superior lobar bronchus",
    "nameEn": "Left superior lobar bronchus",
    "nameLatin": "Bronchus lobaris superior sinister",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:right_main_bronchus",
    "node": "Right main bronchus",
    "fmaId": "TA2:right_main_bronchus",
    "namePtBr": "Right main bronchus",
    "nameEn": "Right main bronchus",
    "nameLatin": "Bronchus principalis dexter",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:left_main_bronchus",
    "node": "Left main bronchus",
    "fmaId": "TA2:left_main_bronchus",
    "namePtBr": "Left main bronchus",
    "nameEn": "Left main bronchus",
    "nameLatin": "Bronchus principalis sinister",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:superior_lingular_segmental_bronchus_of_left_lung_biv",
    "node": "Superior lingular segmental bronchus of left lung (BIV)",
    "fmaId": "TA2:superior_lingular_segmental_bronchus_of_left_lung_biv",
    "namePtBr": "Superior lingular segmental bronchus of left lung (BIV)",
    "nameEn": "Superior lingular segmental bronchus of left lung (BIV)",
    "nameLatin": "Bronchus segm. lingularis sup. pulmonis sinistri (BIV",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:anterior_segmental_bronchus_of_right_lung_biii",
    "node": "Anterior segmental bronchus of right lung (BIII)",
    "fmaId": "TA2:anterior_segmental_bronchus_of_right_lung_biii",
    "namePtBr": "Anterior segmental bronchus of right lung (BIII)",
    "nameEn": "Anterior segmental bronchus of right lung (BIII)",
    "nameLatin": "Bronchus segmentalis anterior pulmonis dextri (BIII",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:anterior_segmental_bronchus_of_left_lung_biii",
    "node": "Anterior segmental bronchus of left lung (BIII)",
    "fmaId": "TA2:anterior_segmental_bronchus_of_left_lung_biii",
    "namePtBr": "Anterior segmental bronchus of left lung (BIII)",
    "nameEn": "Anterior segmental bronchus of left lung (BIII)",
    "nameLatin": "Bronchus segmentalis anterior pulmonis sinistri (BIII",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:apical_segmental_bronchus_of_right_lung_bi",
    "node": "Apical segmental bronchus of right lung (BI)",
    "fmaId": "TA2:apical_segmental_bronchus_of_right_lung_bi",
    "namePtBr": "Apical segmental bronchus of right lung (BI)",
    "nameEn": "Apical segmental bronchus of right lung (BI)",
    "nameLatin": "Bronchus segmentalis apicalis pulmonis dextri (BI",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:apicoposterior_segmental_bronchus_of_left_lung_bi_bii",
    "node": "Apicoposterior segmental bronchus of left lung (BI+BII)",
    "fmaId": "TA2:apicoposterior_segmental_bronchus_of_left_lung_bi_bii",
    "namePtBr": "Apicoposterior segmental bronchus of left lung (BI+BII)",
    "nameEn": "Apicoposterior segmental bronchus of left lung (BI+BII)",
    "nameLatin": "Bronchus segmentalis apicopost. pulmonis sinistri (BI+BII",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:anterior_basal_segmental_bronchus_of_right_lung_bviii",
    "node": "Anterior basal segmental bronchus of right lung (BVIII)",
    "fmaId": "TA2:anterior_basal_segmental_bronchus_of_right_lung_bviii",
    "namePtBr": "Anterior basal segmental bronchus of right lung (BVIII)",
    "nameEn": "Anterior basal segmental bronchus of right lung (BVIII)",
    "nameLatin": "Bronchus segmentalis basalis ant. pulmonis dextri (BVIII",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:anterior_basal_segmental_bronchus_of_left_lung_bviii",
    "node": "Anterior basal segmental bronchus of left lung (BVIII)",
    "fmaId": "TA2:anterior_basal_segmental_bronchus_of_left_lung_bviii",
    "namePtBr": "Anterior basal segmental bronchus of left lung (BVIII)",
    "nameEn": "Anterior basal segmental bronchus of left lung (BVIII)",
    "nameLatin": "Bronchus segmentalis basalis ant. pulmonis sinistri (BVIII",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:lateral_basal_segmental_bronchus_of_right_lung_bix",
    "node": "Lateral basal segmental bronchus of right lung (BIX)",
    "fmaId": "TA2:lateral_basal_segmental_bronchus_of_right_lung_bix",
    "namePtBr": "Lateral basal segmental bronchus of right lung (BIX)",
    "nameEn": "Lateral basal segmental bronchus of right lung (BIX)",
    "nameLatin": "Bronchus segmentalis basalis lat. pulmonis dextri (BIX",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:lateral_basal_segmental_bronchus_of_left_lung_bix",
    "node": "Lateral basal segmental bronchus of left lung (BIX)",
    "fmaId": "TA2:lateral_basal_segmental_bronchus_of_left_lung_bix",
    "namePtBr": "Lateral basal segmental bronchus of left lung (BIX)",
    "nameEn": "Lateral basal segmental bronchus of left lung (BIX)",
    "nameLatin": "Bronchus segmentalis basalis lat. pulmonis sinistri (BIX",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:medial_basal_segmental_bronchus_of_right_lung_bvii",
    "node": "Medial basal segmental bronchus of right lung (BVII)",
    "fmaId": "TA2:medial_basal_segmental_bronchus_of_right_lung_bvii",
    "namePtBr": "Medial basal segmental bronchus of right lung (BVII)",
    "nameEn": "Medial basal segmental bronchus of right lung (BVII)",
    "nameLatin": "Bronchus segmentalis basalis med. pulmonis dextri (BVII",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:medial_basal_segmental_bronchus_of_left_lung_bvii",
    "node": "Medial basal segmental bronchus of left lung (BVII)",
    "fmaId": "TA2:medial_basal_segmental_bronchus_of_left_lung_bvii",
    "namePtBr": "Medial basal segmental bronchus of left lung (BVII)",
    "nameEn": "Medial basal segmental bronchus of left lung (BVII)",
    "nameLatin": "Bronchus segmentalis basalis med. pulmonis sinistri (BVII",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:posterior_basal_segmental_bronchus_of_right_lung_bx",
    "node": "Posterior basal segmental bronchus of right lung (BX)",
    "fmaId": "TA2:posterior_basal_segmental_bronchus_of_right_lung_bx",
    "namePtBr": "Posterior basal segmental bronchus of right lung (BX)",
    "nameEn": "Posterior basal segmental bronchus of right lung (BX)",
    "nameLatin": "Bronchus segmentalis basalis posterior pulmonis dextri (BX",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:posterior_basal_segmental_bronchus_of_left_lung_bx",
    "node": "Posterior basal segmental bronchus of left lung (BX)",
    "fmaId": "TA2:posterior_basal_segmental_bronchus_of_left_lung_bx",
    "namePtBr": "Posterior basal segmental bronchus of left lung (BX)",
    "nameEn": "Posterior basal segmental bronchus of left lung (BX)",
    "nameLatin": "Bronchus segmentalis basalis posterior pulmonis sinistri (BX",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:lateral_segmental_bronchus_of_right_lung_biv",
    "node": "Lateral segmental bronchus of right lung (BIV)",
    "fmaId": "TA2:lateral_segmental_bronchus_of_right_lung_biv",
    "namePtBr": "Lateral segmental bronchus of right lung (BIV)",
    "nameEn": "Lateral segmental bronchus of right lung (BIV)",
    "nameLatin": "Bronchus segmentalis lateralis pulmonis dextri (BIV",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:inferior_lingular_segmental_bronchus_of_left_lung_bv",
    "node": "Inferior lingular segmental bronchus of left lung (BV)",
    "fmaId": "TA2:inferior_lingular_segmental_bronchus_of_left_lung_bv",
    "namePtBr": "Inferior lingular segmental bronchus of left lung (BV)",
    "nameEn": "Inferior lingular segmental bronchus of left lung (BV)",
    "nameLatin": "Bronchus segmentalis lingularis inf. pulmonis sinistri (BV",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:medial_segmental_bronchus_of_right_lung_bv",
    "node": "Medial segmental bronchus of right lung (BV)",
    "fmaId": "TA2:medial_segmental_bronchus_of_right_lung_bv",
    "namePtBr": "Medial segmental bronchus of right lung (BV)",
    "nameEn": "Medial segmental bronchus of right lung (BV)",
    "nameLatin": "Bronchus segmentalis medialis pulmonis dextri (BV",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:posterior_segmental_bronchus_of_right_lung_bii",
    "node": "Posterior segmental bronchus of right lung (BII)",
    "fmaId": "TA2:posterior_segmental_bronchus_of_right_lung_bii",
    "namePtBr": "Posterior segmental bronchus of right lung (BII)",
    "nameEn": "Posterior segmental bronchus of right lung (BII)",
    "nameLatin": "Bronchus segmentalis posterior pulmonis dextri (BII",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:superior_segmental_bronchus_of_right_lung_bvi",
    "node": "Superior segmental bronchus of right lung (BVI)",
    "fmaId": "TA2:superior_segmental_bronchus_of_right_lung_bvi",
    "namePtBr": "Superior segmental bronchus of right lung (BVI)",
    "nameEn": "Superior segmental bronchus of right lung (BVI)",
    "nameLatin": "Bronchus segmentalis superior pulmonis dextri (BVI",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:superior_segmental_bronchus_of_left_lung_bvi",
    "node": "Superior segmental bronchus of left lung (BVI)",
    "fmaId": "TA2:superior_segmental_bronchus_of_left_lung_bvi",
    "namePtBr": "Superior segmental bronchus of left lung (BVI)",
    "nameEn": "Superior segmental bronchus of left lung (BVI)",
    "nameLatin": "Bronchus segmentalis superior pulmonis sinistri(bvi",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:calcaneus_l",
    "node": "Calcaneus.l",
    "fmaId": "TA2:calcaneus_l",
    "namePtBr": "Calcâneo Esquerdo",
    "nameEn": "Calcaneus (left)",
    "nameLatin": "Calcaneus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:calcaneus_r",
    "node": "Calcaneus.r",
    "fmaId": "TA2:calcaneus_r",
    "namePtBr": "Calcâneo Direito",
    "nameEn": "Calcaneus (right)",
    "nameLatin": "Calcaneus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:anterior_chamber_of_eyeball_l",
    "node": "Anterior chamber of eyeball.l",
    "fmaId": "TA2:anterior_chamber_of_eyeball_l",
    "namePtBr": "Anterior chamber of eyeball Esquerdo",
    "nameEn": "Anterior chamber of eyeball (left)",
    "nameLatin": "Camera anterior bulbi oculi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_chamber_of_eyeball_r",
    "node": "Anterior chamber of eyeball.r",
    "fmaId": "TA2:anterior_chamber_of_eyeball_r",
    "namePtBr": "Anterior chamber of eyeball Direito",
    "nameEn": "Anterior chamber of eyeball (right)",
    "nameLatin": "Camera anterior bulbi oculi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lacrimal_canaliculus_l",
    "node": "Lacrimal canaliculus.l",
    "fmaId": "TA2:lacrimal_canaliculus_l",
    "namePtBr": "Lacrimal canaliculus Esquerdo",
    "nameEn": "Lacrimal canaliculus (left)",
    "nameLatin": "Canaliculus lacrimalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eye*",
      "Accessory visual structures",
      "Lacrimal apparatus",
      "Lacrimal canliculus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lacrimal_canaliculus_r",
    "node": "Lacrimal canaliculus.r",
    "fmaId": "TA2:lacrimal_canaliculus_r",
    "namePtBr": "Lacrimal canaliculus Direito",
    "nameEn": "Lacrimal canaliculus (right)",
    "nameLatin": "Canaliculus lacrimalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eye*",
      "Accessory visual structures",
      "Lacrimal apparatus",
      "Lacrimal canliculus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:central_canal",
    "node": "Central canal",
    "fmaId": "TA2:central_canal",
    "namePtBr": "Central canal",
    "nameEn": "Central canal",
    "nameLatin": "Canalis centralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:right_common_carotid_artery",
    "node": "Right common carotid artery",
    "fmaId": "TA2:right_common_carotid_artery",
    "namePtBr": "Right common carotid artery",
    "nameEn": "Right common carotid artery",
    "nameLatin": "Carotis communis dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_common_carotid_artery",
    "node": "Left common carotid artery",
    "fmaId": "TA2:left_common_carotid_artery",
    "namePtBr": "Left common carotid artery",
    "nameEn": "Left common carotid artery",
    "nameLatin": "Carotis communis sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:external_carotid_artery_l",
    "node": "External carotid artery.l",
    "fmaId": "TA2:external_carotid_artery_l",
    "namePtBr": "External carotid artery Esquerdo",
    "nameEn": "External carotid artery (left)",
    "nameLatin": "Carotis externa",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:external_carotid_artery_r",
    "node": "External carotid artery.r",
    "fmaId": "TA2:external_carotid_artery_r",
    "namePtBr": "External carotid artery Direito",
    "nameEn": "External carotid artery (right)",
    "nameLatin": "Carotis externa",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_carotid_artery_l",
    "node": "Internal carotid artery.l",
    "fmaId": "TA2:internal_carotid_artery_l",
    "namePtBr": "Internal carotid artery Esquerdo",
    "nameEn": "Internal carotid artery (left)",
    "nameLatin": "Carotis interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_carotid_artery_r",
    "node": "Internal carotid artery.r",
    "fmaId": "TA2:internal_carotid_artery_r",
    "namePtBr": "Internal carotid artery Direito",
    "nameEn": "Internal carotid artery (right)",
    "nameLatin": "Carotis interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:major_alar_cartilage_l",
    "node": "Major alar cartilage.l",
    "fmaId": "TA2:major_alar_cartilage_l",
    "namePtBr": "Major alar cartilage Esquerdo",
    "nameEn": "Major alar cartilage (left)",
    "nameLatin": "Cartilago alaris major",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:major_alar_cartilage_r",
    "node": "Major alar cartilage.r",
    "fmaId": "TA2:major_alar_cartilage_r",
    "namePtBr": "Major alar cartilage Direito",
    "nameEn": "Major alar cartilage (right)",
    "nameLatin": "Cartilago alaris major",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:arytenoid_cartilage_l",
    "node": "Arytenoid cartilage.l",
    "fmaId": "TA2:arytenoid_cartilage_l",
    "namePtBr": "Arytenoid cartilage Esquerdo",
    "nameEn": "Arytenoid cartilage (left)",
    "nameLatin": "Cartilago arytenoidea",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:arytenoid_cartilage_r",
    "node": "Arytenoid cartilage.r",
    "fmaId": "TA2:arytenoid_cartilage_r",
    "namePtBr": "Arytenoid cartilage Direito",
    "nameEn": "Arytenoid cartilage (right)",
    "nameLatin": "Cartilago arytenoidea",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:corniculate_cartilage_l",
    "node": "Corniculate cartilage.l",
    "fmaId": "TA2:corniculate_cartilage_l",
    "namePtBr": "Corniculate cartilage Esquerdo",
    "nameEn": "Corniculate cartilage (left)",
    "nameLatin": "Cartilago corniculata",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:corniculate_cartilage_r",
    "node": "Corniculate cartilage.r",
    "fmaId": "TA2:corniculate_cartilage_r",
    "namePtBr": "Corniculate cartilage Direito",
    "nameEn": "Corniculate cartilage (right)",
    "nameLatin": "Cartilago corniculata",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:costal_cartilage_of_tenth_rib_l",
    "node": "Costal cartilage of tenth rib.l",
    "fmaId": "TA2:costal_cartilage_of_tenth_rib_l",
    "namePtBr": "Cartilagem da Costela Esquerda",
    "nameEn": "Costal cartilage of tenth rib (left)",
    "nameLatin": "Cartilago costae decimae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_tenth_rib_r",
    "node": "Costal cartilage of tenth rib.r",
    "fmaId": "TA2:costal_cartilage_of_tenth_rib_r",
    "namePtBr": "Cartilagem da Costela Direita",
    "nameEn": "Costal cartilage of tenth rib (right)",
    "nameLatin": "Cartilago costae decimae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_eighth_rib_l",
    "node": "Costal cartilage of eighth rib.l",
    "fmaId": "TA2:costal_cartilage_of_eighth_rib_l",
    "namePtBr": "Cartilagem da Costela Esquerda",
    "nameEn": "Costal cartilage of eighth rib (left)",
    "nameLatin": "Cartilago costae octavae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_eighth_rib_r",
    "node": "Costal cartilage of eighth rib.r",
    "fmaId": "TA2:costal_cartilage_of_eighth_rib_r",
    "namePtBr": "Cartilagem da Costela Direita",
    "nameEn": "Costal cartilage of eighth rib (right)",
    "nameLatin": "Cartilago costae octavae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_first_rib_l",
    "node": "Costal cartilage of first rib.l",
    "fmaId": "TA2:costal_cartilage_of_first_rib_l",
    "namePtBr": "Cartilagem da Costela Esquerda",
    "nameEn": "Costal cartilage of first rib (left)",
    "nameLatin": "Cartilago costae primae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_first_rib_r",
    "node": "Costal cartilage of first rib.r",
    "fmaId": "TA2:costal_cartilage_of_first_rib_r",
    "namePtBr": "Cartilagem da Costela Direita",
    "nameEn": "Costal cartilage of first rib (right)",
    "nameLatin": "Cartilago costae primae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_fourth_rib_l",
    "node": "Costal cartilage of fourth rib.l",
    "fmaId": "TA2:costal_cartilage_of_fourth_rib_l",
    "namePtBr": "Cartilagem da Costela Esquerda",
    "nameEn": "Costal cartilage of fourth rib (left)",
    "nameLatin": "Cartilago costae quartae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_fourth_rib_r",
    "node": "Costal cartilage of fourth rib.r",
    "fmaId": "TA2:costal_cartilage_of_fourth_rib_r",
    "namePtBr": "Cartilagem da Costela Direita",
    "nameEn": "Costal cartilage of fourth rib (right)",
    "nameLatin": "Cartilago costae quartae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_fifth_rib_l",
    "node": "Costal cartilage of fifth rib.l",
    "fmaId": "TA2:costal_cartilage_of_fifth_rib_l",
    "namePtBr": "Cartilagem da Costela Esquerda",
    "nameEn": "Costal cartilage of fifth rib (left)",
    "nameLatin": "Cartilago costae quintae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_fifth_rib_r",
    "node": "Costal cartilage of fifth rib.r",
    "fmaId": "TA2:costal_cartilage_of_fifth_rib_r",
    "namePtBr": "Cartilagem da Costela Direita",
    "nameEn": "Costal cartilage of fifth rib (right)",
    "nameLatin": "Cartilago costae quintae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_second_rib_l",
    "node": "Costal cartilage of second rib.l",
    "fmaId": "TA2:costal_cartilage_of_second_rib_l",
    "namePtBr": "Cartilagem da Costela Esquerda",
    "nameEn": "Costal cartilage of second rib (left)",
    "nameLatin": "Cartilago costae secundae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_second_rib_r",
    "node": "Costal cartilage of second rib.r",
    "fmaId": "TA2:costal_cartilage_of_second_rib_r",
    "namePtBr": "Cartilagem da Costela Direita",
    "nameEn": "Costal cartilage of second rib (right)",
    "nameLatin": "Cartilago costae secundae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_seventh_rib_l",
    "node": "Costal cartilage of seventh rib.l",
    "fmaId": "TA2:costal_cartilage_of_seventh_rib_l",
    "namePtBr": "Cartilagem da Costela Esquerda",
    "nameEn": "Costal cartilage of seventh rib (left)",
    "nameLatin": "Cartilago costae septimae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_seventh_rib_r",
    "node": "Costal cartilage of seventh rib.r",
    "fmaId": "TA2:costal_cartilage_of_seventh_rib_r",
    "namePtBr": "Cartilagem da Costela Direita",
    "nameEn": "Costal cartilage of seventh rib (right)",
    "nameLatin": "Cartilago costae septimae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_sixth_rib_l",
    "node": "Costal cartilage of sixth rib.l",
    "fmaId": "TA2:costal_cartilage_of_sixth_rib_l",
    "namePtBr": "Cartilagem da Costela Esquerda",
    "nameEn": "Costal cartilage of sixth rib (left)",
    "nameLatin": "Cartilago costae sextae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_sixth_rib_r",
    "node": "Costal cartilage of sixth rib.r",
    "fmaId": "TA2:costal_cartilage_of_sixth_rib_r",
    "namePtBr": "Cartilagem da Costela Direita",
    "nameEn": "Costal cartilage of sixth rib (right)",
    "nameLatin": "Cartilago costae sextae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_third_rib_l",
    "node": "Costal cartilage of third rib.l",
    "fmaId": "TA2:costal_cartilage_of_third_rib_l",
    "namePtBr": "Cartilagem da Costela Esquerda",
    "nameEn": "Costal cartilage of third rib (left)",
    "nameLatin": "Cartilago costae tertiae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_third_rib_r",
    "node": "Costal cartilage of third rib.r",
    "fmaId": "TA2:costal_cartilage_of_third_rib_r",
    "namePtBr": "Cartilagem da Costela Direita",
    "nameEn": "Costal cartilage of third rib (right)",
    "nameLatin": "Cartilago costae tertiae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:cricoid_cartilage",
    "node": "Cricoid cartilage",
    "fmaId": "TA2:cricoid_cartilage",
    "namePtBr": "Cricoid cartilage",
    "nameEn": "Cricoid cartilage",
    "nameLatin": "Cartilago cricoidea",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nasal_septal_cartilage",
    "node": "Nasal septal cartilage",
    "fmaId": "TA2:nasal_septal_cartilage",
    "namePtBr": "Nasal septal cartilage",
    "nameEn": "Nasal septal cartilage",
    "nameLatin": "Cartilago septi nasi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:thyroid_cartilage",
    "node": "Thyroid cartilage",
    "fmaId": "TA2:thyroid_cartilage",
    "namePtBr": "Thyroid cartilage",
    "nameEn": "Thyroid cartilage",
    "nameLatin": "Cartilago thyreoidea",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:cauda_equina",
    "node": "Cauda equina",
    "fmaId": "TA2:cauda_equina",
    "namePtBr": "Cauda equina",
    "nameEn": "Cauda equina",
    "nameLatin": "Cauda equina",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_cells_of_ethmoid_bone_l",
    "node": "Anterior cells of ethmoid bone.l",
    "fmaId": "TA2:anterior_cells_of_ethmoid_bone_l",
    "namePtBr": "Anterior cells of ethmoid Osso Esquerdo",
    "nameEn": "Anterior cells of ethmoid bone (left)",
    "nameLatin": "Cellulae anteriores ossis ethmoidei",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Skeletal system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.5,
      "z": 0.5
    }
  },
  {
    "id": "za:anterior_cells_of_ethmoid_bone_r",
    "node": "Anterior cells of ethmoid bone.r",
    "fmaId": "TA2:anterior_cells_of_ethmoid_bone_r",
    "namePtBr": "Anterior cells of ethmoid Osso Direito",
    "nameEn": "Anterior cells of ethmoid bone (right)",
    "nameLatin": "Cellulae anteriores ossis ethmoidei",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Skeletal system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.5,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_cells_of_ethmoid_bone_l",
    "node": "Middle cells of ethmoid bone.l",
    "fmaId": "TA2:middle_cells_of_ethmoid_bone_l",
    "namePtBr": "Middle cells of ethmoid Osso Esquerdo",
    "nameEn": "Middle cells of ethmoid bone (left)",
    "nameLatin": "Cellulae mediae ossis ethmoidei",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Skeletal system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.5,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_cells_of_ethmoid_bone_r",
    "node": "Middle cells of ethmoid bone.r",
    "fmaId": "TA2:middle_cells_of_ethmoid_bone_r",
    "namePtBr": "Middle cells of ethmoid Osso Direito",
    "nameEn": "Middle cells of ethmoid bone (right)",
    "nameLatin": "Cellulae mediae ossis ethmoidei",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Skeletal system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.5,
      "z": 0.5
    }
  },
  {
    "id": "za:posterior_cells_of_ethmoid_bone_l",
    "node": "Posterior cells of ethmoid bone.l",
    "fmaId": "TA2:posterior_cells_of_ethmoid_bone_l",
    "namePtBr": "Posterior cells of ethmoid Osso Esquerdo",
    "nameEn": "Posterior cells of ethmoid bone (left)",
    "nameLatin": "Cellulae posteriores ossis ethmoidei",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Skeletal system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.5,
      "z": 0.5
    }
  },
  {
    "id": "za:posterior_cells_of_ethmoid_bone_r",
    "node": "Posterior cells of ethmoid bone.r",
    "fmaId": "TA2:posterior_cells_of_ethmoid_bone_r",
    "namePtBr": "Posterior cells of ethmoid Osso Direito",
    "nameEn": "Posterior cells of ethmoid bone (right)",
    "nameLatin": "Cellulae posteriores ossis ethmoidei",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Skeletal system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.5,
      "z": 0.5
    }
  },
  {
    "id": "za:optic_chiasm_l",
    "node": "Optic chiasm.l",
    "fmaId": "TA2:optic_chiasm_l",
    "namePtBr": "Optic chiasm Esquerdo",
    "nameEn": "Optic chiasm (left)",
    "nameLatin": "Chiasma opticum",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:optic_chiasm_r",
    "node": "Optic chiasm.r",
    "fmaId": "TA2:optic_chiasm_r",
    "namePtBr": "Optic chiasm Direito",
    "nameEn": "Optic chiasm (right)",
    "nameLatin": "Chiasma opticum",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:chorda_tympani_l",
    "node": "Chorda tympani.l",
    "fmaId": "TA2:chorda_tympani_l",
    "namePtBr": "Chorda tympani Esquerdo",
    "nameEn": "Chorda tympani (left)",
    "nameLatin": "Chorda tympani",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Facial nerve (VII)",
      "Chorda tympani"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:chorda_tympani_r",
    "node": "Chorda tympani.r",
    "fmaId": "TA2:chorda_tympani_r",
    "namePtBr": "Chorda tympani Direito",
    "nameEn": "Chorda tympani (right)",
    "nameLatin": "Chorda tympani",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Facial nerve (VII)",
      "Chorda tympani"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:clavicle_l",
    "node": "Clavicle.l",
    "fmaId": "TA2:clavicle_l",
    "namePtBr": "Clavícula Esquerda",
    "nameEn": "Clavicle (left)",
    "nameLatin": "Clavicula",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of upper limb",
      "Bones of pectoral girdle"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0.4,
      "z": 0.3
    }
  },
  {
    "id": "za:clavicle_r",
    "node": "Clavicle.r",
    "fmaId": "TA2:clavicle_r",
    "namePtBr": "Clavícula Direita",
    "nameEn": "Clavicle (right)",
    "nameLatin": "Clavicula",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of upper limb",
      "Bones of pectoral girdle"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0.4,
      "z": 0.3
    }
  },
  {
    "id": "za:cochlea_l",
    "node": "Cochlea.l",
    "fmaId": "TA2:cochlea_l",
    "namePtBr": "Cochlea Esquerdo",
    "nameEn": "Cochlea (left)",
    "nameLatin": "Cochlea",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Ear",
      "Internal ear",
      "Bony labyrinth",
      "Cochlea"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:cochlea_r",
    "node": "Cochlea.r",
    "fmaId": "TA2:cochlea_r",
    "namePtBr": "Cochlea Direito",
    "nameEn": "Cochlea (right)",
    "nameLatin": "Cochlea",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Ear",
      "Internal ear",
      "Bony labyrinth",
      "Cochlea"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_colliculus_l",
    "node": "Inferior colliculus.l",
    "fmaId": "TA2:inferior_colliculus_l",
    "namePtBr": "Inferior colliculus Esquerdo",
    "nameEn": "Inferior colliculus (left)",
    "nameLatin": "Colliculus inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_colliculus_r",
    "node": "Inferior colliculus.r",
    "fmaId": "TA2:inferior_colliculus_r",
    "namePtBr": "Inferior colliculus Direito",
    "nameEn": "Inferior colliculus (right)",
    "nameLatin": "Colliculus inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_colliculus_l",
    "node": "Superior colliculus.l",
    "fmaId": "TA2:superior_colliculus_l",
    "namePtBr": "Superior colliculus Esquerdo",
    "nameEn": "Superior colliculus (left)",
    "nameLatin": "Colliculus superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_colliculus_r",
    "node": "Superior colliculus.r",
    "fmaId": "TA2:superior_colliculus_r",
    "namePtBr": "Superior colliculus Direito",
    "nameEn": "Superior colliculus (right)",
    "nameLatin": "Colliculus superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ascending_colon",
    "node": "Ascending colon",
    "fmaId": "TA2:ascending_colon",
    "namePtBr": "Ascending colon",
    "nameEn": "Ascending colon",
    "nameLatin": "Colon ascendens",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive canal"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:descending_colon",
    "node": "Descending colon",
    "fmaId": "TA2:descending_colon",
    "namePtBr": "Descending colon",
    "nameEn": "Descending colon",
    "nameLatin": "Colon descendens",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive canal"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:sigmoid_colon",
    "node": "Sigmoid colon",
    "fmaId": "TA2:sigmoid_colon",
    "namePtBr": "Sigmoid colon",
    "nameEn": "Sigmoid colon",
    "nameLatin": "Colon sigmoideum",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive canal"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:transverse_colon",
    "node": "Transverse colon",
    "fmaId": "TA2:transverse_colon",
    "namePtBr": "Transverse colon",
    "nameEn": "Transverse colon",
    "nameLatin": "Colon transversum",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive canal"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_commissure",
    "node": "Anterior commissure",
    "fmaId": "TA2:anterior_commissure",
    "namePtBr": "Anterior commissure",
    "nameEn": "Anterior commissure",
    "nameLatin": "Commissura anterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:hippocampal_commissure",
    "node": "Hippocampal commissure",
    "fmaId": "TA2:hippocampal_commissure",
    "namePtBr": "Hippocampal commissure",
    "nameEn": "Hippocampal commissure",
    "nameLatin": "Commissura hippocampi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_commissure",
    "node": "Posterior commissure",
    "fmaId": "TA2:posterior_commissure",
    "namePtBr": "Posterior commissure",
    "nameEn": "Posterior commissure",
    "nameLatin": "Commissura posterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_nasal_concha_bone_l",
    "node": "Inferior nasal concha bone.l",
    "fmaId": "TA2:inferior_nasal_concha_bone_l",
    "namePtBr": "Concha Nasal Inferior Esquerda",
    "nameEn": "Inferior nasal concha bone (left)",
    "nameLatin": "Concha nasalis inferior",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:inferior_nasal_concha_bone_r",
    "node": "Inferior nasal concha bone.r",
    "fmaId": "TA2:inferior_nasal_concha_bone_r",
    "namePtBr": "Concha Nasal Inferior Direita",
    "nameEn": "Inferior nasal concha bone (right)",
    "nameLatin": "Concha nasalis inferior",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:cornea_l",
    "node": "Cornea.l",
    "fmaId": "TA2:cornea_l",
    "namePtBr": "Cornea Esquerdo",
    "nameEn": "Cornea (left)",
    "nameLatin": "Cornea",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:cornea_r",
    "node": "Cornea.r",
    "fmaId": "TA2:cornea_r",
    "namePtBr": "Cornea Direito",
    "nameEn": "Cornea (right)",
    "nameLatin": "Cornea",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_horn_of_spinal_cord",
    "node": "Anterior horn of spinal cord",
    "fmaId": "TA2:anterior_horn_of_spinal_cord",
    "namePtBr": "Anterior horn of spinal cord",
    "nameEn": "Anterior horn of spinal cord",
    "nameLatin": "Cornu anterius medullae spinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_horn_of_spinal_cord",
    "node": "Posterior horn of spinal cord",
    "fmaId": "TA2:posterior_horn_of_spinal_cord",
    "namePtBr": "Posterior horn of spinal cord",
    "nameEn": "Posterior horn of spinal cord",
    "nameLatin": "Cornu posterius medullae spinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:amygdaloid_body_l",
    "node": "Amygdaloid body.l",
    "fmaId": "TA2:amygdaloid_body_l",
    "namePtBr": "Amygdaloid body Esquerdo",
    "nameEn": "Amygdaloid body (left)",
    "nameLatin": "Corpus amygdaloideum",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:amygdaloid_body_r",
    "node": "Amygdaloid body.r",
    "fmaId": "TA2:amygdaloid_body_r",
    "namePtBr": "Amygdaloid body Direito",
    "nameEn": "Amygdaloid body (right)",
    "nameLatin": "Corpus amygdaloideum",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:corpus_callosum",
    "node": "Corpus callosum",
    "fmaId": "TA2:corpus_callosum",
    "namePtBr": "Corpus callosum",
    "nameEn": "Corpus callosum",
    "nameLatin": "Corpus callosum",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_geniculate_body_l",
    "node": "Lateral geniculate body.l",
    "fmaId": "TA2:lateral_geniculate_body_l",
    "namePtBr": "Lateral geniculate body Esquerdo",
    "nameEn": "Lateral geniculate body (left)",
    "nameLatin": "Corpus geniculatum laterale",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_geniculate_body_r",
    "node": "Lateral geniculate body.r",
    "fmaId": "TA2:lateral_geniculate_body_r",
    "namePtBr": "Lateral geniculate body Direito",
    "nameEn": "Lateral geniculate body (right)",
    "nameLatin": "Corpus geniculatum laterale",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_geniculate_body_l",
    "node": "Medial geniculate body.l",
    "fmaId": "TA2:medial_geniculate_body_l",
    "namePtBr": "Medial geniculate body Esquerdo",
    "nameEn": "Medial geniculate body (left)",
    "nameLatin": "Corpus geniculatum mediale",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_geniculate_body_r",
    "node": "Medial geniculate body.r",
    "fmaId": "TA2:medial_geniculate_body_r",
    "namePtBr": "Medial geniculate body Direito",
    "nameEn": "Medial geniculate body (right)",
    "nameLatin": "Corpus geniculatum mediale",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:mamillary_body_l",
    "node": "Mamillary body.l",
    "fmaId": "TA2:mamillary_body_l",
    "namePtBr": "Mamillary body Esquerdo",
    "nameEn": "Mamillary body (left)",
    "nameLatin": "Corpus mammillare",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:mamillary_body_r",
    "node": "Mamillary body.r",
    "fmaId": "TA2:mamillary_body_r",
    "namePtBr": "Mamillary body Direito",
    "nameEn": "Mamillary body (right)",
    "nameLatin": "Corpus mammillare",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:body_of_sternum",
    "node": "Body of sternum",
    "fmaId": "TA2:body_of_sternum",
    "namePtBr": "Corpo do Esterno",
    "nameEn": "Body of sternum",
    "nameLatin": "Corpus sterni",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Sternum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 1.3
    }
  },
  {
    "id": "za:vitreous_body_l",
    "node": "Vitreous body.l",
    "fmaId": "TA2:vitreous_body_l",
    "namePtBr": "Vitreous body Esquerdo",
    "nameEn": "Vitreous body (left)",
    "nameLatin": "Corpus vitreum",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:vitreous_body_r",
    "node": "Vitreous body.r",
    "fmaId": "TA2:vitreous_body_r",
    "namePtBr": "Vitreous body Direito",
    "nameEn": "Vitreous body (right)",
    "nameLatin": "Corpus vitreum",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:costal_cartilage_of_ninth_rib_l",
    "node": "Costal cartilage of ninth rib.l",
    "fmaId": "TA2:costal_cartilage_of_ninth_rib_l",
    "namePtBr": "Cartilagem da Costela Esquerda",
    "nameEn": "Costal cartilage of ninth rib (left)",
    "nameLatin": "Costa cartilago nonae costae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:costal_cartilage_of_ninth_rib_r",
    "node": "Costal cartilage of ninth rib.r",
    "fmaId": "TA2:costal_cartilage_of_ninth_rib_r",
    "namePtBr": "Cartilagem da Costela Direita",
    "nameEn": "Costal cartilage of ninth rib (right)",
    "nameLatin": "Costa cartilago nonae costae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Costal cartilages"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:first_rib_l",
    "node": "First rib.l",
    "fmaId": "TA2:first_rib_l",
    "namePtBr": "1ª Costela Esquerda",
    "nameEn": "First rib (left)",
    "nameLatin": "Costa prima",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:first_rib_r",
    "node": "First rib.r",
    "fmaId": "TA2:first_rib_r",
    "namePtBr": "1ª Costela Direita",
    "nameEn": "First rib (right)",
    "nameLatin": "Costa prima",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:second_rib_l",
    "node": "Second rib.l",
    "fmaId": "TA2:second_rib_l",
    "namePtBr": "2ª Costela Esquerda",
    "nameEn": "Second rib (left)",
    "nameLatin": "Costa secunda",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:second_rib_r",
    "node": "Second rib.r",
    "fmaId": "TA2:second_rib_r",
    "namePtBr": "2ª Costela Direita",
    "nameEn": "Second rib (right)",
    "nameLatin": "Costa secunda",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:culmen",
    "node": "Culmen",
    "fmaId": "TA2:culmen",
    "namePtBr": "Culmen",
    "nameEn": "Culmen",
    "nameLatin": "Culmen",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:cuneus_l",
    "node": "Cuneus.l",
    "fmaId": "TA2:cuneus_l",
    "namePtBr": "Cuneus Esquerdo",
    "nameEn": "Cuneus (left)",
    "nameLatin": "Cuneus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Occipital lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:cuneus_r",
    "node": "Cuneus.r",
    "fmaId": "TA2:cuneus_r",
    "namePtBr": "Cuneus Direito",
    "nameEn": "Cuneus (right)",
    "nameLatin": "Cuneus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Occipital lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_leaflet_of_right_atrioventricular_valve",
    "node": "Inferior leaflet of right atrioventricular valve",
    "fmaId": "TA2:inferior_leaflet_of_right_atrioventricular_valve",
    "namePtBr": "Inferior leaflet of right atrioventricular valve",
    "nameEn": "Inferior leaflet of right atrioventricular valve",
    "nameLatin": "Cuspis inferior valvae atrioventricularis dextrae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_leaflet_of_left_atrioventricular_valve",
    "node": "Posterior leaflet of left atrioventricular valve",
    "fmaId": "TA2:posterior_leaflet_of_left_atrioventricular_valve",
    "namePtBr": "Posterior leaflet of left atrioventricular valve",
    "nameEn": "Posterior leaflet of left atrioventricular valve",
    "nameLatin": "Cuspis posterior valvae atrioventricularis sinistrae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:septal_leaflet_of_right_atrioventricular_valve",
    "node": "Septal leaflet of right atrioventricular valve",
    "fmaId": "TA2:septal_leaflet_of_right_atrioventricular_valve",
    "namePtBr": "Septal leaflet of right atrioventricular valve",
    "nameEn": "Septal leaflet of right atrioventricular valve",
    "nameLatin": "Cuspis septalis valvae atrioventricularis dextrae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:tenth_rib_l",
    "node": "Tenth rib.l",
    "fmaId": "TA2:tenth_rib_l",
    "namePtBr": "10ª Costela Esquerda",
    "nameEn": "Tenth rib (left)",
    "nameLatin": "Decima costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs",
      "False ribs"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:tenth_rib_r",
    "node": "Tenth rib.r",
    "fmaId": "TA2:tenth_rib_r",
    "namePtBr": "10ª Costela Direita",
    "nameEn": "Tenth rib (right)",
    "nameLatin": "Decima costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs",
      "False ribs"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:declive",
    "node": "Declive",
    "fmaId": "TA2:declive",
    "namePtBr": "Declive",
    "nameEn": "Declive",
    "nameLatin": "Declive",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lower_canine_l",
    "node": "Lower canine.l",
    "fmaId": "TA2:lower_canine_l",
    "namePtBr": "Lower canine Esquerdo",
    "nameEn": "Lower canine (left)",
    "nameLatin": "Dens caninus inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_canine_r",
    "node": "Lower canine.r",
    "fmaId": "TA2:lower_canine_r",
    "namePtBr": "Lower canine Direito",
    "nameEn": "Lower canine (right)",
    "nameLatin": "Dens caninus inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_canine_l",
    "node": "Upper canine.l",
    "fmaId": "TA2:upper_canine_l",
    "namePtBr": "Upper canine Esquerdo",
    "nameEn": "Upper canine (left)",
    "nameLatin": "Dens caninus superioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_canine_r",
    "node": "Upper canine.r",
    "fmaId": "TA2:upper_canine_r",
    "namePtBr": "Upper canine Direito",
    "nameEn": "Upper canine (right)",
    "nameLatin": "Dens caninus superioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_lateral_incisor_l",
    "node": "Lower lateral incisor.l",
    "fmaId": "TA2:lower_lateral_incisor_l",
    "namePtBr": "Lower lateral incisor Esquerdo",
    "nameEn": "Lower lateral incisor (left)",
    "nameLatin": "Dens incisivus lateralis inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_lateral_incisor_r",
    "node": "Lower lateral incisor.r",
    "fmaId": "TA2:lower_lateral_incisor_r",
    "namePtBr": "Lower lateral incisor Direito",
    "nameEn": "Lower lateral incisor (right)",
    "nameLatin": "Dens incisivus lateralis inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_lateral_incisor_l",
    "node": "Upper lateral incisor.l",
    "fmaId": "TA2:upper_lateral_incisor_l",
    "namePtBr": "Upper lateral incisor Esquerdo",
    "nameEn": "Upper lateral incisor (left)",
    "nameLatin": "Dens incisivus lateralis superioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_lateral_incisor_r",
    "node": "Upper lateral incisor.r",
    "fmaId": "TA2:upper_lateral_incisor_r",
    "namePtBr": "Upper lateral incisor Direito",
    "nameEn": "Upper lateral incisor (right)",
    "nameLatin": "Dens incisivus lateralis superioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_medial_incisor_l",
    "node": "Lower medial incisor.l",
    "fmaId": "TA2:lower_medial_incisor_l",
    "namePtBr": "Lower medial incisor Esquerdo",
    "nameEn": "Lower medial incisor (left)",
    "nameLatin": "Dens incisivus medialis inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_medial_incisor_r",
    "node": "Lower medial incisor.r",
    "fmaId": "TA2:lower_medial_incisor_r",
    "namePtBr": "Lower medial incisor Direito",
    "nameEn": "Lower medial incisor (right)",
    "nameLatin": "Dens incisivus medialis inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_medial_incisor_l",
    "node": "Upper medial incisor.l",
    "fmaId": "TA2:upper_medial_incisor_l",
    "namePtBr": "Upper medial incisor Esquerdo",
    "nameEn": "Upper medial incisor (left)",
    "nameLatin": "Dens incisivus medialis superioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_medial_incisor_r",
    "node": "Upper medial incisor.r",
    "fmaId": "TA2:upper_medial_incisor_r",
    "namePtBr": "Upper medial incisor Direito",
    "nameEn": "Upper medial incisor (right)",
    "nameLatin": "Dens incisivus medialis superioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_first_molar_tooth_l",
    "node": "Lower first molar tooth.l",
    "fmaId": "TA2:lower_first_molar_tooth_l",
    "namePtBr": "Lower first molar tooth Esquerdo",
    "nameEn": "Lower first molar tooth (left)",
    "nameLatin": "Dens molaris primus inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_first_molar_tooth_r",
    "node": "Lower first molar tooth.r",
    "fmaId": "TA2:lower_first_molar_tooth_r",
    "namePtBr": "Lower first molar tooth Direito",
    "nameEn": "Lower first molar tooth (right)",
    "nameLatin": "Dens molaris primus inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_first_molar_tooth_l",
    "node": "Upper first molar tooth.l",
    "fmaId": "TA2:upper_first_molar_tooth_l",
    "namePtBr": "Upper first molar tooth Esquerdo",
    "nameEn": "Upper first molar tooth (left)",
    "nameLatin": "Dens molaris primus suprioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_first_molar_tooth_r",
    "node": "Upper first molar tooth.r",
    "fmaId": "TA2:upper_first_molar_tooth_r",
    "namePtBr": "Upper first molar tooth Direito",
    "nameEn": "Upper first molar tooth (right)",
    "nameLatin": "Dens molaris primus suprioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_second_molar_tooth_l",
    "node": "Lower second molar tooth.l",
    "fmaId": "TA2:lower_second_molar_tooth_l",
    "namePtBr": "Lower second molar tooth Esquerdo",
    "nameEn": "Lower second molar tooth (left)",
    "nameLatin": "Dens molaris secundus inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_second_molar_tooth_r",
    "node": "Lower second molar tooth.r",
    "fmaId": "TA2:lower_second_molar_tooth_r",
    "namePtBr": "Lower second molar tooth Direito",
    "nameEn": "Lower second molar tooth (right)",
    "nameLatin": "Dens molaris secundus inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_second_molar_tooth_l",
    "node": "Upper second molar tooth.l",
    "fmaId": "TA2:upper_second_molar_tooth_l",
    "namePtBr": "Upper second molar tooth Esquerdo",
    "nameEn": "Upper second molar tooth (left)",
    "nameLatin": "Dens molaris secundus superioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_second_molar_tooth_r",
    "node": "Upper second molar tooth.r",
    "fmaId": "TA2:upper_second_molar_tooth_r",
    "namePtBr": "Upper second molar tooth Direito",
    "nameEn": "Upper second molar tooth (right)",
    "nameLatin": "Dens molaris secundus superioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_first_premolar_l",
    "node": "Lower first premolar.l",
    "fmaId": "TA2:lower_first_premolar_l",
    "namePtBr": "Lower first premolar Esquerdo",
    "nameEn": "Lower first premolar (left)",
    "nameLatin": "Dens premolaris primus inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_first_premolar_r",
    "node": "Lower first premolar.r",
    "fmaId": "TA2:lower_first_premolar_r",
    "namePtBr": "Lower first premolar Direito",
    "nameEn": "Lower first premolar (right)",
    "nameLatin": "Dens premolaris primus inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_first_premolar_l",
    "node": "Upper first premolar.l",
    "fmaId": "TA2:upper_first_premolar_l",
    "namePtBr": "Upper first premolar Esquerdo",
    "nameEn": "Upper first premolar (left)",
    "nameLatin": "Dens premolaris primus superioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_first_premolar_r",
    "node": "Upper first premolar.r",
    "fmaId": "TA2:upper_first_premolar_r",
    "namePtBr": "Upper first premolar Direito",
    "nameEn": "Upper first premolar (right)",
    "nameLatin": "Dens premolaris primus superioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_second_premolar_l",
    "node": "Lower second premolar.l",
    "fmaId": "TA2:lower_second_premolar_l",
    "namePtBr": "Lower second premolar Esquerdo",
    "nameEn": "Lower second premolar (left)",
    "nameLatin": "Dens premolaris secundus inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:lower_second_premolar_r",
    "node": "Lower second premolar.r",
    "fmaId": "TA2:lower_second_premolar_r",
    "namePtBr": "Lower second premolar Direito",
    "nameEn": "Lower second premolar (right)",
    "nameLatin": "Dens premolaris secundus inferioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_second_premolar_l",
    "node": "Upper second premolar.l",
    "fmaId": "TA2:upper_second_premolar_l",
    "namePtBr": "Upper second premolar Esquerdo",
    "nameEn": "Upper second premolar (left)",
    "nameLatin": "Dens premolaris secundus superioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": -0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:upper_second_premolar_r",
    "node": "Upper second premolar.r",
    "fmaId": "TA2:upper_second_premolar_r",
    "namePtBr": "Upper second premolar Direito",
    "nameEn": "Upper second premolar (right)",
    "nameLatin": "Dens premolaris secundus superioris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": 0.3,
      "y": -0.6,
      "z": 0.7
    }
  },
  {
    "id": "za:intervertebral_disc_c2_c3",
    "node": "Intervertebral disc C2-C3",
    "fmaId": "TA2:intervertebral_disc_c2_c3",
    "namePtBr": "Intervertebral disc C2-C3",
    "nameEn": "Intervertebral disc C2-C3",
    "nameLatin": "Discus intervertebralis C2-C3",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_c3_c4",
    "node": "Intervertebral disc C3-C4",
    "fmaId": "TA2:intervertebral_disc_c3_c4",
    "namePtBr": "Intervertebral disc C3-C4",
    "nameEn": "Intervertebral disc C3-C4",
    "nameLatin": "Discus intervertebralis C3-C4",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_c4_c5",
    "node": "Intervertebral disc C4-C5",
    "fmaId": "TA2:intervertebral_disc_c4_c5",
    "namePtBr": "Intervertebral disc C4-C5",
    "nameEn": "Intervertebral disc C4-C5",
    "nameLatin": "Discus intervertebralis C4-C5",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_c5_c6",
    "node": "Intervertebral disc C5-C6",
    "fmaId": "TA2:intervertebral_disc_c5_c6",
    "namePtBr": "Intervertebral disc C5-C6",
    "nameEn": "Intervertebral disc C5-C6",
    "nameLatin": "Discus intervertebralis C5-C6",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_c6_c7",
    "node": "Intervertebral disc C6-C7",
    "fmaId": "TA2:intervertebral_disc_c6_c7",
    "namePtBr": "Intervertebral disc C6-C7",
    "nameEn": "Intervertebral disc C6-C7",
    "nameLatin": "Discus intervertebralis C6-C7",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_c7_t1",
    "node": "Intervertebral disc C7-T1",
    "fmaId": "TA2:intervertebral_disc_c7_t1",
    "namePtBr": "Intervertebral disc C7-T1",
    "nameEn": "Intervertebral disc C7-T1",
    "nameLatin": "Discus intervertebralis C7-T1",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_l1_l2",
    "node": "Intervertebral disc L1-L2",
    "fmaId": "TA2:intervertebral_disc_l1_l2",
    "namePtBr": "Intervertebral disc L1-L2",
    "nameEn": "Intervertebral disc L1-L2",
    "nameLatin": "Discus intervertebralis L1-L2",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_l2_l3",
    "node": "Intervertebral disc L2-L3",
    "fmaId": "TA2:intervertebral_disc_l2_l3",
    "namePtBr": "Intervertebral disc L2-L3",
    "nameEn": "Intervertebral disc L2-L3",
    "nameLatin": "Discus intervertebralis L2-L3",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_l3_l4",
    "node": "Intervertebral disc L3-L4",
    "fmaId": "TA2:intervertebral_disc_l3_l4",
    "namePtBr": "Intervertebral disc L3-L4",
    "nameEn": "Intervertebral disc L3-L4",
    "nameLatin": "Discus intervertebralis L3-L4",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_l4_l5",
    "node": "Intervertebral disc L4-L5",
    "fmaId": "TA2:intervertebral_disc_l4_l5",
    "namePtBr": "Intervertebral disc L4-L5",
    "nameEn": "Intervertebral disc L4-L5",
    "nameLatin": "Discus intervertebralis L4-L5",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_l5_s1",
    "node": "Intervertebral disc L5-S1",
    "fmaId": "TA2:intervertebral_disc_l5_s1",
    "namePtBr": "Intervertebral disc L5-S1",
    "nameEn": "Intervertebral disc L5-S1",
    "nameLatin": "Discus intervertebralis L5-S1",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_t1_t2",
    "node": "Intervertebral disc T1-T2",
    "fmaId": "TA2:intervertebral_disc_t1_t2",
    "namePtBr": "Intervertebral disc T1-T2",
    "nameEn": "Intervertebral disc T1-T2",
    "nameLatin": "Discus intervertebralis T1-T2",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_t10_t11",
    "node": "Intervertebral disc T10-T11",
    "fmaId": "TA2:intervertebral_disc_t10_t11",
    "namePtBr": "Intervertebral disc T10-T11",
    "nameEn": "Intervertebral disc T10-T11",
    "nameLatin": "Discus intervertebralis T10-T11",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_t11_t12",
    "node": "Intervertebral disc T11-T12",
    "fmaId": "TA2:intervertebral_disc_t11_t12",
    "namePtBr": "Intervertebral disc T11-T12",
    "nameEn": "Intervertebral disc T11-T12",
    "nameLatin": "Discus intervertebralis T11-T12",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_t12_l1",
    "node": "Intervertebral disc T12-L1",
    "fmaId": "TA2:intervertebral_disc_t12_l1",
    "namePtBr": "Intervertebral disc T12-L1",
    "nameEn": "Intervertebral disc T12-L1",
    "nameLatin": "Discus intervertebralis T12-L1",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_t2_t3",
    "node": "Intervertebral disc T2-T3",
    "fmaId": "TA2:intervertebral_disc_t2_t3",
    "namePtBr": "Intervertebral disc T2-T3",
    "nameEn": "Intervertebral disc T2-T3",
    "nameLatin": "Discus intervertebralis T2-T3",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_t3_t4",
    "node": "Intervertebral disc T3-T4",
    "fmaId": "TA2:intervertebral_disc_t3_t4",
    "namePtBr": "Intervertebral disc T3-T4",
    "nameEn": "Intervertebral disc T3-T4",
    "nameLatin": "Discus intervertebralis T3-T4",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_t4_t5",
    "node": "Intervertebral disc T4-T5",
    "fmaId": "TA2:intervertebral_disc_t4_t5",
    "namePtBr": "Intervertebral disc T4-T5",
    "nameEn": "Intervertebral disc T4-T5",
    "nameLatin": "Discus intervertebralis T4-T5",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_t5_t6",
    "node": "Intervertebral disc T5-T6",
    "fmaId": "TA2:intervertebral_disc_t5_t6",
    "namePtBr": "Intervertebral disc T5-T6",
    "nameEn": "Intervertebral disc T5-T6",
    "nameLatin": "Discus intervertebralis T5-T6",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_t6_t7",
    "node": "Intervertebral disc T6-T7",
    "fmaId": "TA2:intervertebral_disc_t6_t7",
    "namePtBr": "Intervertebral disc T6-T7",
    "nameEn": "Intervertebral disc T6-T7",
    "nameLatin": "Discus intervertebralis T6-T7",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_t7_t8",
    "node": "Intervertebral disc T7-T8",
    "fmaId": "TA2:intervertebral_disc_t7_t8",
    "namePtBr": "Intervertebral disc T7-T8",
    "nameEn": "Intervertebral disc T7-T8",
    "nameLatin": "Discus intervertebralis T7-T8",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_t8_t9",
    "node": "Intervertebral disc T8-T9",
    "fmaId": "TA2:intervertebral_disc_t8_t9",
    "namePtBr": "Intervertebral disc T8-T9",
    "nameEn": "Intervertebral disc T8-T9",
    "nameLatin": "Discus intervertebralis T8-T9",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intervertebral_disc_t9_t10",
    "node": "Intervertebral disc T9-T10",
    "fmaId": "TA2:intervertebral_disc_t9_t10",
    "namePtBr": "Intervertebral disc T9-T10",
    "nameEn": "Intervertebral disc T9-T10",
    "nameLatin": "Discus intervertebralis T9-T10",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:anterior_division_of_internal_iliac_artery_l",
    "node": "Anterior division of internal iliac artery.l",
    "fmaId": "TA2:anterior_division_of_internal_iliac_artery_l",
    "namePtBr": "Anterior division of internal iliac artery Esquerdo",
    "nameEn": "Anterior division of internal iliac artery (left)",
    "nameLatin": "Divisio anterior arteriae iliacae internae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_division_of_internal_iliac_artery_r",
    "node": "Anterior division of internal iliac artery.r",
    "fmaId": "TA2:anterior_division_of_internal_iliac_artery_r",
    "namePtBr": "Anterior division of internal iliac artery Direito",
    "nameEn": "Anterior division of internal iliac artery (right)",
    "nameLatin": "Divisio anterior arteriae iliacae internae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_division_of_mandibular_nerve_l",
    "node": "Anterior division of mandibular nerve.l",
    "fmaId": "TA2:anterior_division_of_mandibular_nerve_l",
    "namePtBr": "Anterior division of mandibular nerve Esquerdo",
    "nameEn": "Anterior division of mandibular nerve (left)",
    "nameLatin": "Divisio anterior nervi mandibularis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_division_of_mandibular_nerve_r",
    "node": "Anterior division of mandibular nerve.r",
    "fmaId": "TA2:anterior_division_of_mandibular_nerve_r",
    "namePtBr": "Anterior division of mandibular nerve Direito",
    "nameEn": "Anterior division of mandibular nerve (right)",
    "nameLatin": "Divisio anterior nervi mandibularis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_division_of_inferior_trunk_of_brachial_plexus_l",
    "node": "Anterior division of inferior trunk of brachial plexus.l",
    "fmaId": "TA2:anterior_division_of_inferior_trunk_of_brachial_plexus_l",
    "namePtBr": "Anterior division of inferior trunk of brachial plexus Esquerdo",
    "nameEn": "Anterior division of inferior trunk of brachial plexus (left)",
    "nameLatin": "Divisio anterior trunci inferioris plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Inferior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_division_of_inferior_trunk_of_brachial_plexus_r",
    "node": "Anterior division of inferior trunk of brachial plexus.r",
    "fmaId": "TA2:anterior_division_of_inferior_trunk_of_brachial_plexus_r",
    "namePtBr": "Anterior division of inferior trunk of brachial plexus Direito",
    "nameEn": "Anterior division of inferior trunk of brachial plexus (right)",
    "nameLatin": "Divisio anterior trunci inferioris plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Inferior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_division_of_middle_trunk_of_brachial_plexus_l",
    "node": "Anterior division of middle trunk of brachial plexus.l",
    "fmaId": "TA2:anterior_division_of_middle_trunk_of_brachial_plexus_l",
    "namePtBr": "Anterior division of middle trunk of brachial plexus Esquerdo",
    "nameEn": "Anterior division of middle trunk of brachial plexus (left)",
    "nameLatin": "Divisio anterior trunci medii plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Middle trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_division_of_middle_trunk_of_brachial_plexus_r",
    "node": "Anterior division of middle trunk of brachial plexus.r",
    "fmaId": "TA2:anterior_division_of_middle_trunk_of_brachial_plexus_r",
    "namePtBr": "Anterior division of middle trunk of brachial plexus Direito",
    "nameEn": "Anterior division of middle trunk of brachial plexus (right)",
    "nameLatin": "Divisio anterior trunci medii plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Middle trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_division_of_superior_trunk_of_brachial_plexus_l",
    "node": "Anterior division of superior trunk of brachial plexus.l",
    "fmaId": "TA2:anterior_division_of_superior_trunk_of_brachial_plexus_l",
    "namePtBr": "Anterior division of superior trunk of brachial plexus Esquerdo",
    "nameEn": "Anterior division of superior trunk of brachial plexus (left)",
    "nameLatin": "Divisio anterior trunci superioris plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Superior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_division_of_superior_trunk_of_brachial_plexus_r",
    "node": "Anterior division of superior trunk of brachial plexus.r",
    "fmaId": "TA2:anterior_division_of_superior_trunk_of_brachial_plexus_r",
    "namePtBr": "Anterior division of superior trunk of brachial plexus Direito",
    "nameEn": "Anterior division of superior trunk of brachial plexus (right)",
    "nameLatin": "Divisio anterior trunci superioris plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Superior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_division_of_retromandibular_vein_l",
    "node": "Anterior division of retromandibular vein.l",
    "fmaId": "TA2:anterior_division_of_retromandibular_vein_l",
    "namePtBr": "Anterior division of retromandibular vein Esquerdo",
    "nameEn": "Anterior division of retromandibular vein (left)",
    "nameLatin": "Divisio anterior venae retromandibularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_division_of_retromandibular_vein_r",
    "node": "Anterior division of retromandibular vein.r",
    "fmaId": "TA2:anterior_division_of_retromandibular_vein_r",
    "namePtBr": "Anterior division of retromandibular vein Direito",
    "nameEn": "Anterior division of retromandibular vein (right)",
    "nameLatin": "Divisio anterior venae retromandibularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_division_of_internal_iliac_artery_l",
    "node": "Posterior division of internal iliac artery.l",
    "fmaId": "TA2:posterior_division_of_internal_iliac_artery_l",
    "namePtBr": "Posterior division of internal iliac artery Esquerdo",
    "nameEn": "Posterior division of internal iliac artery (left)",
    "nameLatin": "Divisio posterior arteriae iliacae internae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_division_of_internal_iliac_artery_r",
    "node": "Posterior division of internal iliac artery.r",
    "fmaId": "TA2:posterior_division_of_internal_iliac_artery_r",
    "namePtBr": "Posterior division of internal iliac artery Direito",
    "nameEn": "Posterior division of internal iliac artery (right)",
    "nameLatin": "Divisio posterior arteriae iliacae internae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_division_of_mandibular_nerve_l",
    "node": "Posterior division of mandibular nerve.l",
    "fmaId": "TA2:posterior_division_of_mandibular_nerve_l",
    "namePtBr": "Posterior division of mandibular nerve Esquerdo",
    "nameEn": "Posterior division of mandibular nerve (left)",
    "nameLatin": "Divisio posterior nervi mandibularis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_division_of_mandibular_nerve_r",
    "node": "Posterior division of mandibular nerve.r",
    "fmaId": "TA2:posterior_division_of_mandibular_nerve_r",
    "namePtBr": "Posterior division of mandibular nerve Direito",
    "nameEn": "Posterior division of mandibular nerve (right)",
    "nameLatin": "Divisio posterior nervi mandibularis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_division_of_inferior_trunk_of_brachial_plexus_l",
    "node": "Posterior division of inferior trunk of brachial plexus.l",
    "fmaId": "TA2:posterior_division_of_inferior_trunk_of_brachial_plexus_l",
    "namePtBr": "Posterior division of inferior trunk of brachial plexus Esquerdo",
    "nameEn": "Posterior division of inferior trunk of brachial plexus (left)",
    "nameLatin": "Divisio posterior trunci inferioris plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Inferior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_division_of_inferior_trunk_of_brachial_plexus_r",
    "node": "Posterior division of inferior trunk of brachial plexus.r",
    "fmaId": "TA2:posterior_division_of_inferior_trunk_of_brachial_plexus_r",
    "namePtBr": "Posterior division of inferior trunk of brachial plexus Direito",
    "nameEn": "Posterior division of inferior trunk of brachial plexus (right)",
    "nameLatin": "Divisio posterior trunci inferioris plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Inferior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_division_of_middle_trunk_of_brachial_plexus_l",
    "node": "Posterior division of middle trunk of brachial plexus.l",
    "fmaId": "TA2:posterior_division_of_middle_trunk_of_brachial_plexus_l",
    "namePtBr": "Posterior division of middle trunk of brachial plexus Esquerdo",
    "nameEn": "Posterior division of middle trunk of brachial plexus (left)",
    "nameLatin": "Divisio posterior trunci medii plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Middle trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_division_of_middle_trunk_of_brachial_plexus_r",
    "node": "Posterior division of middle trunk of brachial plexus.r",
    "fmaId": "TA2:posterior_division_of_middle_trunk_of_brachial_plexus_r",
    "namePtBr": "Posterior division of middle trunk of brachial plexus Direito",
    "nameEn": "Posterior division of middle trunk of brachial plexus (right)",
    "nameLatin": "Divisio posterior trunci medii plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Middle trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_division_of_superior_trunk_of_brachial_plexus_l",
    "node": "Posterior division of superior trunk of brachial plexus.l",
    "fmaId": "TA2:posterior_division_of_superior_trunk_of_brachial_plexus_l",
    "namePtBr": "Posterior division of superior trunk of brachial plexus Esquerdo",
    "nameEn": "Posterior division of superior trunk of brachial plexus (left)",
    "nameLatin": "Divisio posterior trunci superioris plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Superior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_division_of_superior_trunk_of_brachial_plexus_r",
    "node": "Posterior division of superior trunk of brachial plexus.r",
    "fmaId": "TA2:posterior_division_of_superior_trunk_of_brachial_plexus_r",
    "namePtBr": "Posterior division of superior trunk of brachial plexus Direito",
    "nameEn": "Posterior division of superior trunk of brachial plexus (right)",
    "nameLatin": "Divisio posterior trunci superioris plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Superior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_division_of_retromandibular_vein_l",
    "node": "Posterior division of retromandibular vein.l",
    "fmaId": "TA2:posterior_division_of_retromandibular_vein_l",
    "namePtBr": "Posterior division of retromandibular vein Esquerdo",
    "nameEn": "Posterior division of retromandibular vein (left)",
    "nameLatin": "Divisio posterior venae retromandibularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_division_of_retromandibular_vein_r",
    "node": "Posterior division of retromandibular vein.r",
    "fmaId": "TA2:posterior_division_of_retromandibular_vein_r",
    "namePtBr": "Posterior division of retromandibular vein Direito",
    "nameEn": "Posterior division of retromandibular vein (right)",
    "nameLatin": "Divisio posterior venae retromandibularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:bile_duct",
    "node": "Bile duct",
    "fmaId": "TA2:bile_duct",
    "namePtBr": "Bile duct",
    "nameEn": "Bile duct",
    "nameLatin": "Ductus biliaris",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive system"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:nasolacrimal_duct_l",
    "node": "Nasolacrimal duct.l",
    "fmaId": "TA2:nasolacrimal_duct_l",
    "namePtBr": "Nasolacrimal duct Esquerdo",
    "nameEn": "Nasolacrimal duct (left)",
    "nameLatin": "Ductus nasolacrimalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eye*",
      "Accessory visual structures",
      "Lacrimal apparatus",
      "Nasolacrimal duct"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nasolacrimal_duct_r",
    "node": "Nasolacrimal duct.r",
    "fmaId": "TA2:nasolacrimal_duct_r",
    "namePtBr": "Nasolacrimal duct Direito",
    "nameEn": "Nasolacrimal duct (right)",
    "nameLatin": "Ductus nasolacrimalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eye*",
      "Accessory visual structures",
      "Lacrimal apparatus",
      "Nasolacrimal duct"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:pancreatic_duct",
    "node": "Pancreatic duct",
    "fmaId": "TA2:pancreatic_duct",
    "namePtBr": "Pancreatic duct",
    "nameEn": "Pancreatic duct",
    "nameLatin": "Ductus pancreaticus",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive system"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:accessory_pancreatic_duct",
    "node": "Accessory pancreatic duct",
    "fmaId": "TA2:accessory_pancreatic_duct",
    "namePtBr": "Accessory pancreatic duct",
    "nameEn": "Accessory pancreatic duct",
    "nameLatin": "Ductus pancreaticus accessorius",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive system"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:parotid_duct_l",
    "node": "Parotid duct.l",
    "fmaId": "TA2:parotid_duct_l",
    "namePtBr": "Parotid duct Esquerdo",
    "nameEn": "Parotid duct (left)",
    "nameLatin": "Ductus parotideus",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Mouth"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:parotid_duct_r",
    "node": "Parotid duct.r",
    "fmaId": "TA2:parotid_duct_r",
    "namePtBr": "Parotid duct Direito",
    "nameEn": "Parotid duct (right)",
    "nameLatin": "Ductus parotideus",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Mouth"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:submandibular_duct_l",
    "node": "Submandibular duct.l",
    "fmaId": "TA2:submandibular_duct_l",
    "namePtBr": "Submandibular duct Esquerdo",
    "nameEn": "Submandibular duct (left)",
    "nameLatin": "Ductus submandibularis",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Mouth"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:submandibular_duct_r",
    "node": "Submandibular duct.r",
    "fmaId": "TA2:submandibular_duct_r",
    "namePtBr": "Submandibular duct Direito",
    "nameEn": "Submandibular duct (right)",
    "nameLatin": "Ductus submandibularis",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Mouth"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:twelfth_rib_l",
    "node": "Twelfth rib.l",
    "fmaId": "TA2:twelfth_rib_l",
    "namePtBr": "12ª Costela Esquerda",
    "nameEn": "Twelfth rib (left)",
    "nameLatin": "Duodecima costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs",
      "False ribs",
      "Floating ribs"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:twelfth_rib_r",
    "node": "Twelfth rib.r",
    "fmaId": "TA2:twelfth_rib_r",
    "namePtBr": "12ª Costela Direita",
    "nameEn": "Twelfth rib (right)",
    "nameLatin": "Duodecima costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs",
      "False ribs",
      "Floating ribs"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:duodenum",
    "node": "Duodenum",
    "fmaId": "TA2:duodenum",
    "namePtBr": "Duodenum",
    "nameEn": "Duodenum",
    "nameLatin": "Duodenum",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive canal"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:spinal_dura",
    "node": "Spinal dura",
    "fmaId": "TA2:spinal_dura",
    "namePtBr": "Spinal dura",
    "nameEn": "Spinal dura",
    "nameLatin": "Dura spinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Meninges"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:epiglottis",
    "node": "Epiglottis",
    "fmaId": "TA2:epiglottis",
    "namePtBr": "Epiglottis",
    "nameEn": "Epiglottis",
    "nameLatin": "Epiglottis",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive system"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:falx_cerebri",
    "node": "Falx cerebri",
    "fmaId": "TA2:falx_cerebri",
    "namePtBr": "Falx cerebri",
    "nameEn": "Falx cerebri",
    "nameLatin": "Falx cerebri",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Meninges"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:cuneate_fasciculus",
    "node": "Cuneate fasciculus",
    "fmaId": "TA2:cuneate_fasciculus",
    "namePtBr": "Cuneate fasciculus",
    "nameEn": "Cuneate fasciculus",
    "nameLatin": "Fasciculus cuneatus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:gracile_fasciculus",
    "node": "Gracile fasciculus",
    "fmaId": "TA2:gracile_fasciculus",
    "namePtBr": "Gracile fasciculus",
    "nameEn": "Gracile fasciculus",
    "nameLatin": "Fasciculus gracilis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_cord_of_brachial_plexus_l",
    "node": "Posterior cord of brachial plexus.l",
    "fmaId": "TA2:posterior_cord_of_brachial_plexus_l",
    "namePtBr": "Posterior cord of brachial plexus Esquerdo",
    "nameEn": "Posterior cord of brachial plexus (left)",
    "nameLatin": "Fasciculus posterior plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Infraclavicular part of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_cord_of_brachial_plexus_r",
    "node": "Posterior cord of brachial plexus.r",
    "fmaId": "TA2:posterior_cord_of_brachial_plexus_r",
    "namePtBr": "Posterior cord of brachial plexus Direito",
    "nameEn": "Posterior cord of brachial plexus (right)",
    "nameLatin": "Fasciculus posterior plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Infraclavicular part of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterolateral_tract",
    "node": "Posterolateral tract",
    "fmaId": "TA2:posterolateral_tract",
    "namePtBr": "Posterolateral tract",
    "nameEn": "Posterolateral tract",
    "nameLatin": "Fasciculus posterolateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_fasciculus_proprius",
    "node": "Anterior fasciculus proprius",
    "fmaId": "TA2:anterior_fasciculus_proprius",
    "namePtBr": "Anterior fasciculus proprius",
    "nameEn": "Anterior fasciculus proprius",
    "nameLatin": "Fasciculus proprius anterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_fasciculus_proprius",
    "node": "Lateral fasciculus proprius",
    "fmaId": "TA2:lateral_fasciculus_proprius",
    "namePtBr": "Lateral fasciculus proprius",
    "nameEn": "Lateral fasciculus proprius",
    "nameLatin": "Fasciculus proprius lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_fasciculus_proprius",
    "node": "Posterior fasciculus proprius",
    "fmaId": "TA2:posterior_fasciculus_proprius",
    "namePtBr": "Posterior fasciculus proprius",
    "nameEn": "Posterior fasciculus proprius",
    "nameLatin": "Fasciculus proprius posterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:zonular_fibres_l",
    "node": "Zonular fibres.l",
    "fmaId": "TA2:zonular_fibres_l",
    "namePtBr": "Zonular fibres Esquerdo",
    "nameEn": "Zonular fibres (left)",
    "nameLatin": "Fibrae zonulares",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:zonular_fibres_r",
    "node": "Zonular fibres.r",
    "fmaId": "TA2:zonular_fibres_r",
    "namePtBr": "Zonular fibres Direito",
    "nameEn": "Zonular fibres (right)",
    "nameLatin": "Fibrae zonulares",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:fibula_l",
    "node": "Fibula.l",
    "fmaId": "TA2:fibula_l",
    "namePtBr": "Fíbula Esquerda",
    "nameEn": "Fibula (left)",
    "nameLatin": "Fibula",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:fibula_r",
    "node": "Fibula.r",
    "fmaId": "TA2:fibula_r",
    "namePtBr": "Fíbula Direita",
    "nameEn": "Fibula (right)",
    "nameLatin": "Fibula",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:flocculus_l",
    "node": "Flocculus.l",
    "fmaId": "TA2:flocculus_l",
    "namePtBr": "Flocculus Esquerdo",
    "nameEn": "Flocculus (left)",
    "nameLatin": "Flocculus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:flocculus_r",
    "node": "Flocculus.r",
    "fmaId": "TA2:flocculus_r",
    "namePtBr": "Flocculus Direito",
    "nameEn": "Flocculus (right)",
    "nameLatin": "Flocculus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:folium_of_vermis",
    "node": "Folium of vermis",
    "fmaId": "TA2:folium_of_vermis",
    "namePtBr": "Folium of vermis",
    "nameEn": "Folium of vermis",
    "nameLatin": "Folium vermis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:fornix_l",
    "node": "Fornix.l",
    "fmaId": "TA2:fornix_l",
    "namePtBr": "Fornix Esquerdo",
    "nameEn": "Fornix (left)",
    "nameLatin": "Fornix",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:fornix_r",
    "node": "Fornix.r",
    "fmaId": "TA2:fornix_r",
    "namePtBr": "Fornix Direito",
    "nameEn": "Fornix (right)",
    "nameLatin": "Fornix",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:interpeduncular_fossa_l",
    "node": "Interpeduncular fossa.l",
    "fmaId": "TA2:interpeduncular_fossa_l",
    "namePtBr": "Interpeduncular fossa Esquerdo",
    "nameEn": "Interpeduncular fossa (left)",
    "nameLatin": "Fossa interpeduncularis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:interpeduncular_fossa_r",
    "node": "Interpeduncular fossa.r",
    "fmaId": "TA2:interpeduncular_fossa_r",
    "namePtBr": "Interpeduncular fossa Direito",
    "nameEn": "Interpeduncular fossa (right)",
    "nameLatin": "Fossa interpeduncularis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ganglia_of_sympathetic_trunk_l",
    "node": "Ganglia of sympathetic trunk.l",
    "fmaId": "TA2:ganglia_of_sympathetic_trunk_l",
    "namePtBr": "Ganglia of sympathetic trunk Esquerdo",
    "nameEn": "Ganglia of sympathetic trunk (left)",
    "nameLatin": "Ganglia trunci sympathici",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Automatic division of peripheral nervous system",
      "Thoracolumbar part of autonomic division",
      "Sympathetic trunk"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ganglia_of_sympathetic_trunk_r",
    "node": "Ganglia of sympathetic trunk.r",
    "fmaId": "TA2:ganglia_of_sympathetic_trunk_r",
    "namePtBr": "Ganglia of sympathetic trunk Direito",
    "nameEn": "Ganglia of sympathetic trunk (right)",
    "nameLatin": "Ganglia trunci sympathici",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Automatic division of peripheral nervous system",
      "Thoracolumbar part of autonomic division",
      "Sympathetic trunk"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:spinal_ganglion_l",
    "node": "Spinal ganglion.l",
    "fmaId": "TA2:spinal_ganglion_l",
    "namePtBr": "Spinal ganglion Esquerdo",
    "nameEn": "Spinal ganglion (left)",
    "nameLatin": "Ganglion spinale",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:spinal_ganglion_r",
    "node": "Spinal ganglion.r",
    "fmaId": "TA2:spinal_ganglion_r",
    "namePtBr": "Spinal ganglion Direito",
    "nameEn": "Spinal ganglion (right)",
    "nameLatin": "Ganglion spinale",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:stomach",
    "node": "Stomach",
    "fmaId": "TA2:stomach",
    "namePtBr": "Stomach",
    "nameEn": "Stomach",
    "nameLatin": "Gaster",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive canal"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:gingiva",
    "node": "Gingiva",
    "fmaId": "TA2:gingiva",
    "namePtBr": "Gingiva",
    "nameEn": "Gingiva",
    "nameLatin": "Gingiva",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Mouth"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:lacrimal_gland_l",
    "node": "Lacrimal gland.l",
    "fmaId": "TA2:lacrimal_gland_l",
    "namePtBr": "Lacrimal gland Esquerdo",
    "nameEn": "Lacrimal gland (left)",
    "nameLatin": "Glandula lacrimalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eye*",
      "Accessory visual structures",
      "Lacrimal apparatus",
      "Lacrimal gland"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lacrimal_gland_r",
    "node": "Lacrimal gland.r",
    "fmaId": "TA2:lacrimal_gland_r",
    "namePtBr": "Lacrimal gland Direito",
    "nameEn": "Lacrimal gland (right)",
    "nameLatin": "Glandula lacrimalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eye*",
      "Accessory visual structures",
      "Lacrimal apparatus",
      "Lacrimal gland"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:parotid_gland_l",
    "node": "Parotid gland.l",
    "fmaId": "TA2:parotid_gland_l",
    "namePtBr": "Parotid gland Esquerdo",
    "nameEn": "Parotid gland (left)",
    "nameLatin": "Glandula parotidea",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Mouth"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:parotid_gland_r",
    "node": "Parotid gland.r",
    "fmaId": "TA2:parotid_gland_r",
    "namePtBr": "Parotid gland Direito",
    "nameEn": "Parotid gland (right)",
    "nameLatin": "Glandula parotidea",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Mouth"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:sublingual_gland_l",
    "node": "Sublingual gland.l",
    "fmaId": "TA2:sublingual_gland_l",
    "namePtBr": "Sublingual gland Esquerdo",
    "nameEn": "Sublingual gland (left)",
    "nameLatin": "Glandula sublingualis",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Mouth"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:sublingual_gland_r",
    "node": "Sublingual gland.r",
    "fmaId": "TA2:sublingual_gland_r",
    "namePtBr": "Sublingual gland Direito",
    "nameEn": "Sublingual gland (right)",
    "nameLatin": "Glandula sublingualis",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Mouth"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:submandibular_gland_l",
    "node": "Submandibular gland.l",
    "fmaId": "TA2:submandibular_gland_l",
    "namePtBr": "Submandibular gland Esquerdo",
    "nameEn": "Submandibular gland (left)",
    "nameLatin": "Glandula submandibularis",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Mouth"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:submandibular_gland_r",
    "node": "Submandibular gland.r",
    "fmaId": "TA2:submandibular_gland_r",
    "namePtBr": "Submandibular gland Direito",
    "nameEn": "Submandibular gland (right)",
    "nameLatin": "Glandula submandibularis",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Mouth"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:globus_pallidus_l",
    "node": "Globus pallidus.l",
    "fmaId": "TA2:globus_pallidus_l",
    "namePtBr": "Globus pallidus Esquerdo",
    "nameEn": "Globus pallidus (left)",
    "nameLatin": "Globus pallidus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:globus_pallidus_r",
    "node": "Globus pallidus.r",
    "fmaId": "TA2:globus_pallidus_r",
    "namePtBr": "Globus pallidus Direito",
    "nameEn": "Globus pallidus (right)",
    "nameLatin": "Globus pallidus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_occipital_gyri_l",
    "node": "Superior occipital gyri.l",
    "fmaId": "TA2:superior_occipital_gyri_l",
    "namePtBr": "Superior occipital gyri Esquerdo",
    "nameEn": "Superior occipital gyri (left)",
    "nameLatin": "Gyri occipitales superiores",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Occipital lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_occipital_gyri_r",
    "node": "Superior occipital gyri.r",
    "fmaId": "TA2:superior_occipital_gyri_r",
    "namePtBr": "Superior occipital gyri Direito",
    "nameEn": "Superior occipital gyri (right)",
    "nameLatin": "Gyri occipitales superiores",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Occipital lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:orbital_gyri_l",
    "node": "Orbital gyri.l",
    "fmaId": "TA2:orbital_gyri_l",
    "namePtBr": "Orbital gyri Esquerdo",
    "nameEn": "Orbital gyri (left)",
    "nameLatin": "Gyri orbitales",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:orbital_gyri_r",
    "node": "Orbital gyri.r",
    "fmaId": "TA2:orbital_gyri_r",
    "namePtBr": "Orbital gyri Direito",
    "nameEn": "Orbital gyri (right)",
    "nameLatin": "Gyri orbitales",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:transverse_temporal_gyri_l",
    "node": "Transverse temporal gyri.l",
    "fmaId": "TA2:transverse_temporal_gyri_l",
    "namePtBr": "Transverse temporal gyri Esquerdo",
    "nameEn": "Transverse temporal gyri (left)",
    "nameLatin": "Gyri temporales transversi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe",
      "Superior temporal gyrus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:transverse_temporal_gyri_r",
    "node": "Transverse temporal gyri.r",
    "fmaId": "TA2:transverse_temporal_gyri_r",
    "namePtBr": "Transverse temporal gyri Direito",
    "nameEn": "Transverse temporal gyri (right)",
    "nameLatin": "Gyri temporales transversi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe",
      "Superior temporal gyrus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:angular_gyrus_l",
    "node": "Angular gyrus.l",
    "fmaId": "TA2:angular_gyrus_l",
    "namePtBr": "Angular gyrus Esquerdo",
    "nameEn": "Angular gyrus (left)",
    "nameLatin": "Gyrus angularis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe",
      "Inferior parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:angular_gyrus_r",
    "node": "Angular gyrus.r",
    "fmaId": "TA2:angular_gyrus_r",
    "namePtBr": "Angular gyrus Direito",
    "nameEn": "Angular gyrus (right)",
    "nameLatin": "Gyrus angularis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe",
      "Inferior parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:middle_frontal_gyrus_l",
    "node": "Middle frontal gyrus.l",
    "fmaId": "TA2:middle_frontal_gyrus_l",
    "namePtBr": "Middle frontal gyrus Esquerdo",
    "nameEn": "Middle frontal gyrus (left)",
    "nameLatin": "Gyrus frontalis medius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:middle_frontal_gyrus_r",
    "node": "Middle frontal gyrus.r",
    "fmaId": "TA2:middle_frontal_gyrus_r",
    "namePtBr": "Middle frontal gyrus Direito",
    "nameEn": "Middle frontal gyrus (right)",
    "nameLatin": "Gyrus frontalis medius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_frontal_gyrus_l",
    "node": "Superior frontal gyrus.l",
    "fmaId": "TA2:superior_frontal_gyrus_l",
    "namePtBr": "Superior frontal gyrus Esquerdo",
    "nameEn": "Superior frontal gyrus (left)",
    "nameLatin": "Gyrus frontalis superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_frontal_gyrus_r",
    "node": "Superior frontal gyrus.r",
    "fmaId": "TA2:superior_frontal_gyrus_r",
    "namePtBr": "Superior frontal gyrus Direito",
    "nameEn": "Superior frontal gyrus (right)",
    "nameLatin": "Gyrus frontalis superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lingual_gyrus_l",
    "node": "Lingual gyrus.l",
    "fmaId": "TA2:lingual_gyrus_l",
    "namePtBr": "Lingual gyrus Esquerdo",
    "nameEn": "Lingual gyrus (left)",
    "nameLatin": "Gyrus lingualis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Occipital lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lingual_gyrus_r",
    "node": "Lingual gyrus.r",
    "fmaId": "TA2:lingual_gyrus_r",
    "namePtBr": "Lingual gyrus Direito",
    "nameEn": "Lingual gyrus (right)",
    "nameLatin": "Gyrus lingualis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Occipital lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_occipitotemporal_gyrus_l",
    "node": "Lateral occipitotemporal gyrus.l",
    "fmaId": "TA2:lateral_occipitotemporal_gyrus_l",
    "namePtBr": "Lateral occipitotemporal gyrus Esquerdo",
    "nameEn": "Lateral occipitotemporal gyrus (left)",
    "nameLatin": "Gyrus occipitotemporalis lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe",
      "Occipitotemporal gyri"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_occipitotemporal_gyrus_r",
    "node": "Lateral occipitotemporal gyrus.r",
    "fmaId": "TA2:lateral_occipitotemporal_gyrus_r",
    "namePtBr": "Lateral occipitotemporal gyrus Direito",
    "nameEn": "Lateral occipitotemporal gyrus (right)",
    "nameLatin": "Gyrus occipitotemporalis lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe",
      "Occipitotemporal gyri"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:postcentral_gyrus_l",
    "node": "Postcentral gyrus.l",
    "fmaId": "TA2:postcentral_gyrus_l",
    "namePtBr": "Postcentral gyrus Esquerdo",
    "nameEn": "Postcentral gyrus (left)",
    "nameLatin": "Gyrus postcentralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:postcentral_gyrus_r",
    "node": "Postcentral gyrus.r",
    "fmaId": "TA2:postcentral_gyrus_r",
    "namePtBr": "Postcentral gyrus Direito",
    "nameEn": "Postcentral gyrus (right)",
    "nameLatin": "Gyrus postcentralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:precentral_gyrus_l",
    "node": "Precentral gyrus.l",
    "fmaId": "TA2:precentral_gyrus_l",
    "namePtBr": "Precentral gyrus Esquerdo",
    "nameEn": "Precentral gyrus (left)",
    "nameLatin": "Gyrus precentralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:precentral_gyrus_r",
    "node": "Precentral gyrus.r",
    "fmaId": "TA2:precentral_gyrus_r",
    "namePtBr": "Precentral gyrus Direito",
    "nameEn": "Precentral gyrus (right)",
    "nameLatin": "Gyrus precentralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:supramarginal_gyrus_l",
    "node": "Supramarginal gyrus.l",
    "fmaId": "TA2:supramarginal_gyrus_l",
    "namePtBr": "Supramarginal gyrus Esquerdo",
    "nameEn": "Supramarginal gyrus (left)",
    "nameLatin": "Gyrus supramarginalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe",
      "Inferior parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:supramarginal_gyrus_r",
    "node": "Supramarginal gyrus.r",
    "fmaId": "TA2:supramarginal_gyrus_r",
    "namePtBr": "Supramarginal gyrus Direito",
    "nameEn": "Supramarginal gyrus (right)",
    "nameLatin": "Gyrus supramarginalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe",
      "Inferior parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_temporal_gyrus_l",
    "node": "Inferior temporal gyrus.l",
    "fmaId": "TA2:inferior_temporal_gyrus_l",
    "namePtBr": "Inferior temporal gyrus Esquerdo",
    "nameEn": "Inferior temporal gyrus (left)",
    "nameLatin": "Gyrus temporalis inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_temporal_gyrus_r",
    "node": "Inferior temporal gyrus.r",
    "fmaId": "TA2:inferior_temporal_gyrus_r",
    "namePtBr": "Inferior temporal gyrus Direito",
    "nameEn": "Inferior temporal gyrus (right)",
    "nameLatin": "Gyrus temporalis inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:middle_temporal_gyrus_l",
    "node": "Middle temporal gyrus.l",
    "fmaId": "TA2:middle_temporal_gyrus_l",
    "namePtBr": "Middle temporal gyrus Esquerdo",
    "nameEn": "Middle temporal gyrus (left)",
    "nameLatin": "Gyrus temporalis medius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:middle_temporal_gyrus_r",
    "node": "Middle temporal gyrus.r",
    "fmaId": "TA2:middle_temporal_gyrus_r",
    "namePtBr": "Middle temporal gyrus Direito",
    "nameEn": "Middle temporal gyrus (right)",
    "nameLatin": "Gyrus temporalis medius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:habenula",
    "node": "Habenula",
    "fmaId": "TA2:habenula",
    "namePtBr": "Habenula",
    "nameEn": "Habenula",
    "nameLatin": "Habenula",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:liver",
    "node": "Liver",
    "fmaId": "TA2:liver",
    "namePtBr": "Liver",
    "nameEn": "Liver",
    "nameLatin": "Hepar",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive system"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:hippocampus_l",
    "node": "Hippocampus.l",
    "fmaId": "TA2:hippocampus_l",
    "namePtBr": "Hippocampus Esquerdo",
    "nameEn": "Hippocampus (left)",
    "nameLatin": "Hippocampus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:hippocampus_r",
    "node": "Hippocampus.r",
    "fmaId": "TA2:hippocampus_r",
    "namePtBr": "Hippocampus Direito",
    "nameEn": "Hippocampus (right)",
    "nameLatin": "Hippocampus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:humerus_l",
    "node": "Humerus.l",
    "fmaId": "TA2:humerus_l",
    "namePtBr": "Úmero Esquerdo",
    "nameEn": "Humerus (left)",
    "nameLatin": "Humerus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.1,
      "z": 0
    }
  },
  {
    "id": "za:humerus_r",
    "node": "Humerus.r",
    "fmaId": "TA2:humerus_r",
    "namePtBr": "Úmero Direito",
    "nameEn": "Humerus (right)",
    "nameLatin": "Humerus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.1,
      "z": 0
    }
  },
  {
    "id": "za:hypothalamus",
    "node": "Hypothalamus",
    "fmaId": "TA2:hypothalamus",
    "namePtBr": "Hypothalamus",
    "nameEn": "Hypothalamus",
    "nameLatin": "Hypothalamus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:incus_l",
    "node": "Incus.l",
    "fmaId": "TA2:incus_l",
    "namePtBr": "Incus Esquerdo",
    "nameEn": "Incus (left)",
    "nameLatin": "Incus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:incus_r",
    "node": "Incus.r",
    "fmaId": "TA2:incus_r",
    "namePtBr": "Incus Direito",
    "nameEn": "Incus (right)",
    "nameLatin": "Incus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:iris_l",
    "node": "Iris.l",
    "fmaId": "TA2:iris_l",
    "namePtBr": "Iris Esquerdo",
    "nameEn": "Iris (left)",
    "nameLatin": "Iris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:iris_r",
    "node": "Iris.r",
    "fmaId": "TA2:iris_r",
    "namePtBr": "Iris Direito",
    "nameEn": "Iris (right)",
    "nameLatin": "Iris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:jejunum",
    "node": "Jejunum",
    "fmaId": "TA2:jejunum",
    "namePtBr": "Jejunum",
    "nameEn": "Jejunum",
    "nameLatin": "Jejunum",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive canal"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:lens_l",
    "node": "Lens.l",
    "fmaId": "TA2:lens_l",
    "namePtBr": "Lens Esquerdo",
    "nameEn": "Lens (left)",
    "nameLatin": "Lens",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lens_r",
    "node": "Lens.r",
    "fmaId": "TA2:lens_r",
    "namePtBr": "Lens Direito",
    "nameEn": "Lens (right)",
    "nameLatin": "Lens",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ligamenta_flava",
    "node": "Ligamenta flava",
    "fmaId": "TA2:ligamenta_flava",
    "namePtBr": "Ligamenta flava",
    "nameEn": "Ligamenta flava",
    "nameLatin": "Ligamenta flava",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:interspinous_ligaments",
    "node": "Interspinous ligaments",
    "fmaId": "TA2:interspinous_ligaments",
    "namePtBr": "Interspinous ligaments",
    "nameEn": "Interspinous ligaments",
    "nameLatin": "Ligamenta interspinalia",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intertransverse_ligaments_l",
    "node": "Intertransverse ligaments.l",
    "fmaId": "TA2:intertransverse_ligaments_l",
    "namePtBr": "Intertransverse ligaments Esquerdo",
    "nameEn": "Intertransverse ligaments (left)",
    "nameLatin": "Ligamenta intertransversaria",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intertransverse_ligaments_r",
    "node": "Intertransverse ligaments.r",
    "fmaId": "TA2:intertransverse_ligaments_r",
    "namePtBr": "Intertransverse ligaments Direito",
    "nameEn": "Intertransverse ligaments (right)",
    "nameLatin": "Ligamenta intertransversaria",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:intra_articular_ligament_of_head_of_rib",
    "node": "Intra-articular ligament of head of rib",
    "fmaId": "TA2:intra_articular_ligament_of_head_of_rib",
    "namePtBr": "Intra-articular ligament of head of rib",
    "nameEn": "Intra-articular ligament of head of rib",
    "nameLatin": "Ligamentum intraarticulare capitis costae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:intra_articular_ligament_of_head_of_rib_r",
    "node": "Intra-articular ligament of head of rib.r",
    "fmaId": "TA2:intra_articular_ligament_of_head_of_rib_r",
    "namePtBr": "Intra-articular ligament of head of rib Direito",
    "nameEn": "Intra-articular ligament of head of rib (right)",
    "nameLatin": "Ligamentum intraarticulare capitis costae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:anterior_longitudinal_ligament",
    "node": "Anterior longitudinal ligament",
    "fmaId": "TA2:anterior_longitudinal_ligament",
    "namePtBr": "Anterior longitudinal ligament",
    "nameEn": "Anterior longitudinal ligament",
    "nameLatin": "Ligamentum longitudinale anterius",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:posterior_longitudinal_ligament",
    "node": "Posterior longitudinal ligament",
    "fmaId": "TA2:posterior_longitudinal_ligament",
    "namePtBr": "Posterior longitudinal ligament",
    "nameEn": "Posterior longitudinal ligament",
    "nameLatin": "Ligamentum longitudinale posterius",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nuchal_ligament",
    "node": "Nuchal ligament",
    "fmaId": "TA2:nuchal_ligament",
    "namePtBr": "Nuchal ligament",
    "nameEn": "Nuchal ligament",
    "nameLatin": "Ligamentum nuchae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:radiate_ligament_of_head_of_rib_l",
    "node": "Radiate ligament of head of rib.l",
    "fmaId": "TA2:radiate_ligament_of_head_of_rib_l",
    "namePtBr": "Radiate ligament of head of rib Esquerdo",
    "nameEn": "Radiate ligament of head of rib (left)",
    "nameLatin": "Ligamentum radiatum capitis costae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:radiate_ligament_of_head_of_rib_r",
    "node": "Radiate ligament of head of rib.r",
    "fmaId": "TA2:radiate_ligament_of_head_of_rib_r",
    "namePtBr": "Radiate ligament of head of rib Direito",
    "nameEn": "Radiate ligament of head of rib (right)",
    "nameLatin": "Ligamentum radiatum capitis costae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:suspensory_ligament_of_eyeball_l",
    "node": "Suspensory ligament of eyeball.l",
    "fmaId": "TA2:suspensory_ligament_of_eyeball_l",
    "namePtBr": "Suspensory ligament of eyeball Esquerdo",
    "nameEn": "Suspensory ligament of eyeball (left)",
    "nameLatin": "Ligamentum suspensorium bulbi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eye*",
      "Accessory visual structures"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:suspensory_ligament_of_eyeball_r",
    "node": "Suspensory ligament of eyeball.r",
    "fmaId": "TA2:suspensory_ligament_of_eyeball_r",
    "namePtBr": "Suspensory ligament of eyeball Direito",
    "nameEn": "Suspensory ligament of eyeball (right)",
    "nameLatin": "Ligamentum suspensorium bulbi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eye*",
      "Accessory visual structures"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:tongue",
    "node": "Tongue",
    "fmaId": "TA2:tongue",
    "namePtBr": "Tongue",
    "nameEn": "Tongue",
    "nameLatin": "Lingua",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Mouth"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:lingula_of_cerebellum",
    "node": "Lingula of cerebellum",
    "fmaId": "TA2:lingula_of_cerebellum",
    "namePtBr": "Lingula of cerebellum",
    "nameEn": "Lingula of cerebellum",
    "nameLatin": "Lingula cerebelli",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:biventral_lobule_l",
    "node": "Biventral lobule.l",
    "fmaId": "TA2:biventral_lobule_l",
    "namePtBr": "Biventral lobule Esquerdo",
    "nameEn": "Biventral lobule (left)",
    "nameLatin": "Lobulus biventer",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:biventral_lobule_r",
    "node": "Biventral lobule.r",
    "fmaId": "TA2:biventral_lobule_r",
    "namePtBr": "Biventral lobule Direito",
    "nameEn": "Biventral lobule (right)",
    "nameLatin": "Lobulus biventer",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:central_lobule",
    "node": "Central lobule",
    "fmaId": "TA2:central_lobule",
    "namePtBr": "Central lobule",
    "nameEn": "Central lobule",
    "nameLatin": "Lobulus centralis vermis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:gracile_lobule_l",
    "node": "Gracile lobule.l",
    "fmaId": "TA2:gracile_lobule_l",
    "namePtBr": "Gracile lobule Esquerdo",
    "nameEn": "Gracile lobule (left)",
    "nameLatin": "Lobulus gracilis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:gracile_lobule_r",
    "node": "Gracile lobule.r",
    "fmaId": "TA2:gracile_lobule_r",
    "namePtBr": "Gracile lobule Direito",
    "nameEn": "Gracile lobule (right)",
    "nameLatin": "Lobulus gracilis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_parietal_lobule_l",
    "node": "Superior parietal lobule.l",
    "fmaId": "TA2:superior_parietal_lobule_l",
    "namePtBr": "Superior parietal lobule Esquerdo",
    "nameEn": "Superior parietal lobule (left)",
    "nameLatin": "Lobulus parietalis superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_parietal_lobule_r",
    "node": "Superior parietal lobule.r",
    "fmaId": "TA2:superior_parietal_lobule_r",
    "namePtBr": "Superior parietal lobule Direito",
    "nameEn": "Superior parietal lobule (right)",
    "nameLatin": "Lobulus parietalis superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_quadrangular_lobule_l",
    "node": "Anterior quadrangular lobule.l",
    "fmaId": "TA2:anterior_quadrangular_lobule_l",
    "namePtBr": "Anterior quadrangular lobule Esquerdo",
    "nameEn": "Anterior quadrangular lobule (left)",
    "nameLatin": "Lobulus quadrangularis anterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_quadrangular_lobule_r",
    "node": "Anterior quadrangular lobule.r",
    "fmaId": "TA2:anterior_quadrangular_lobule_r",
    "namePtBr": "Anterior quadrangular lobule Direito",
    "nameEn": "Anterior quadrangular lobule (right)",
    "nameLatin": "Lobulus quadrangularis anterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_quadrangular_lobule_l",
    "node": "Posterior quadrangular lobule.l",
    "fmaId": "TA2:posterior_quadrangular_lobule_l",
    "namePtBr": "Posterior quadrangular lobule Esquerdo",
    "nameEn": "Posterior quadrangular lobule (left)",
    "nameLatin": "Lobulus quadrangularis posterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_quadrangular_lobule_r",
    "node": "Posterior quadrangular lobule.r",
    "fmaId": "TA2:posterior_quadrangular_lobule_r",
    "namePtBr": "Posterior quadrangular lobule Direito",
    "nameEn": "Posterior quadrangular lobule (right)",
    "nameLatin": "Lobulus quadrangularis posterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_semilunar_lobule_l",
    "node": "Inferior semilunar lobule.l",
    "fmaId": "TA2:inferior_semilunar_lobule_l",
    "namePtBr": "Inferior semilunar lobule Esquerdo",
    "nameEn": "Inferior semilunar lobule (left)",
    "nameLatin": "Lobulus semilunaris inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_semilunar_lobule_r",
    "node": "Inferior semilunar lobule.r",
    "fmaId": "TA2:inferior_semilunar_lobule_r",
    "namePtBr": "Inferior semilunar lobule Direito",
    "nameEn": "Inferior semilunar lobule (right)",
    "nameLatin": "Lobulus semilunaris inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_semilunar_lobule_l",
    "node": "Superior semilunar lobule.l",
    "fmaId": "TA2:superior_semilunar_lobule_l",
    "namePtBr": "Superior semilunar lobule Esquerdo",
    "nameEn": "Superior semilunar lobule (left)",
    "nameLatin": "Lobulus semilunaris superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_semilunar_lobule_r",
    "node": "Superior semilunar lobule.r",
    "fmaId": "TA2:superior_semilunar_lobule_r",
    "namePtBr": "Superior semilunar lobule Direito",
    "nameEn": "Superior semilunar lobule (right)",
    "nameLatin": "Lobulus semilunaris superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_lobe_of_right_lung",
    "node": "Inferior lobe of right lung",
    "fmaId": "TA2:inferior_lobe_of_right_lung",
    "namePtBr": "Inferior lobe of right lung",
    "nameEn": "Inferior lobe of right lung",
    "nameLatin": "Lobus inferior pulmonis dextri",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Lungs"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:inferior_lobe_of_left_lung",
    "node": "Inferior lobe of left lung",
    "fmaId": "TA2:inferior_lobe_of_left_lung",
    "namePtBr": "Inferior lobe of left lung",
    "nameEn": "Inferior lobe of left lung",
    "nameLatin": "Lobus inferior pulmonis sinistri",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Lungs"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:middle_lobe_of_right_lung",
    "node": "Middle lobe of right lung",
    "fmaId": "TA2:middle_lobe_of_right_lung",
    "namePtBr": "Middle lobe of right lung",
    "nameEn": "Middle lobe of right lung",
    "nameLatin": "Lobus medius pulmonis dextri",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Lungs"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:superior_lobe_of_right_lung",
    "node": "Superior lobe of right lung",
    "fmaId": "TA2:superior_lobe_of_right_lung",
    "namePtBr": "Superior lobe of right lung",
    "nameEn": "Superior lobe of right lung",
    "nameLatin": "Lobus superior pulmonis dextri",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Lungs"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:superior_lobe_of_left_lung",
    "node": "Superior lobe of left lung",
    "fmaId": "TA2:superior_lobe_of_left_lung",
    "namePtBr": "Superior lobe of left lung",
    "nameEn": "Superior lobe of left lung",
    "nameLatin": "Lobus superior pulmonis sinistri",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Lungs"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:malleus_l",
    "node": "Malleus.l",
    "fmaId": "TA2:malleus_l",
    "namePtBr": "Malleus Esquerdo",
    "nameEn": "Malleus (left)",
    "nameLatin": "Malleus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:malleus_r",
    "node": "Malleus.r",
    "fmaId": "TA2:malleus_r",
    "namePtBr": "Malleus Direito",
    "nameEn": "Malleus (right)",
    "nameLatin": "Malleus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:mandible",
    "node": "Mandible",
    "fmaId": "TA2:mandible",
    "namePtBr": "Mandíbula",
    "nameEn": "Mandible",
    "nameLatin": "Mandibula",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Extracranial bones of head",
      "Mandible"
    ],
    "explosionVector": {
      "x": 0,
      "y": -1.2,
      "z": 0.8
    }
  },
  {
    "id": "za:manubrium_of_sternum",
    "node": "Manubrium of sternum",
    "fmaId": "TA2:manubrium_of_sternum",
    "namePtBr": "Manúbrio do Esterno",
    "nameEn": "Manubrium of sternum",
    "nameLatin": "Manubrium sterni",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Sternum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 1.3
    }
  },
  {
    "id": "za:maxilla_l",
    "node": "Maxilla.l",
    "fmaId": "TA2:maxilla_l",
    "namePtBr": "Maxila Esquerda",
    "nameEn": "Maxilla (left)",
    "nameLatin": "Maxilla",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": -0.6,
      "y": -0.2,
      "z": 0.9
    }
  },
  {
    "id": "za:maxilla_r",
    "node": "Maxilla.r",
    "fmaId": "TA2:maxilla_r",
    "namePtBr": "Maxila Direita",
    "nameEn": "Maxilla (right)",
    "nameLatin": "Maxilla",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Cranium",
      "Bones of cranium",
      "Maxilla",
      "Right maxilla"
    ],
    "explosionVector": {
      "x": 0.6,
      "y": -0.2,
      "z": 0.9
    }
  },
  {
    "id": "za:medulla_oblongata_l",
    "node": "Medulla oblongata.l",
    "fmaId": "TA2:medulla_oblongata_l",
    "namePtBr": "Medulla oblongata Esquerdo",
    "nameEn": "Medulla oblongata (left)",
    "nameLatin": "Medulla oblongata",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medulla_oblongata_r",
    "node": "Medulla oblongata.r",
    "fmaId": "TA2:medulla_oblongata_r",
    "namePtBr": "Medulla oblongata Direito",
    "nameEn": "Medulla oblongata (right)",
    "nameLatin": "Medulla oblongata",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:tympanic_membrane_l",
    "node": "Tympanic membrane.l",
    "fmaId": "TA2:tympanic_membrane_l",
    "namePtBr": "Tympanic membrane Esquerdo",
    "nameEn": "Tympanic membrane (left)",
    "nameLatin": "Membrana tympanica",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Ear",
      "External ear",
      "Tympanic membrane"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:tympanic_membrane_r",
    "node": "Tympanic membrane.r",
    "fmaId": "TA2:tympanic_membrane_r",
    "namePtBr": "Tympanic membrane Direito",
    "nameEn": "Tympanic membrane (right)",
    "nameLatin": "Membrana tympanica",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Ear",
      "External ear",
      "Tympanic membrane"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:midbrain_l",
    "node": "Midbrain.l",
    "fmaId": "TA2:midbrain_l",
    "namePtBr": "Midbrain Esquerdo",
    "nameEn": "Midbrain (left)",
    "nameLatin": "Mesencephalon",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:midbrain_r",
    "node": "Midbrain.r",
    "fmaId": "TA2:midbrain_r",
    "namePtBr": "Midbrain Direito",
    "nameEn": "Midbrain (right)",
    "nameLatin": "Mesencephalon",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_papillary_muscle_of_right_ventricle",
    "node": "Anterior papillary muscle of right ventricle",
    "fmaId": "TA2:anterior_papillary_muscle_of_right_ventricle",
    "namePtBr": "Anterior papillary muscle of right ventricle",
    "nameEn": "Anterior papillary muscle of right ventricle",
    "nameLatin": "Musculus papillaris anterior ventriculi dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_papillary_muscle_of_right_ventricle",
    "node": "Inferior papillary muscle of right ventricle",
    "fmaId": "TA2:inferior_papillary_muscle_of_right_ventricle",
    "namePtBr": "Inferior papillary muscle of right ventricle",
    "nameEn": "Inferior papillary muscle of right ventricle",
    "nameLatin": "Musculus papillaris inferior ventriculi dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_papillary_muscle_of_left_ventricle",
    "node": "Inferior papillary muscle of left ventricle",
    "fmaId": "TA2:inferior_papillary_muscle_of_left_ventricle",
    "namePtBr": "Inferior papillary muscle of left ventricle",
    "nameEn": "Inferior papillary muscle of left ventricle",
    "nameLatin": "Musculus papillaris inferior ventriculi sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:septal_papillary_muscle_of_right_ventricle",
    "node": "Septal papillary muscle of right ventricle",
    "fmaId": "TA2:septal_papillary_muscle_of_right_ventricle",
    "namePtBr": "Septal papillary muscle of right ventricle",
    "nameEn": "Septal papillary muscle of right ventricle",
    "nameLatin": "Musculus papillaris septalis ventriculi dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:intercostal_nerves_l",
    "node": "Intercostal nerves.l",
    "fmaId": "TA2:intercostal_nerves_l",
    "namePtBr": "Intercostal nerves Esquerdo",
    "nameEn": "Intercostal nerves (left)",
    "nameLatin": "Nervi intercostales",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Thoracic nerves",
      "Anterior rami of thoracic nerves",
      "Intercostal nerves"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:intercostal_nerves_r",
    "node": "Intercostal nerves.r",
    "fmaId": "TA2:intercostal_nerves_r",
    "namePtBr": "Intercostal nerves Direito",
    "nameEn": "Intercostal nerves (right)",
    "nameLatin": "Nervi intercostales",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Thoracic nerves",
      "Anterior rami of thoracic nerves",
      "Intercostal nerves"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:sympathetic_nerves_l",
    "node": "Sympathetic nerves.l",
    "fmaId": "TA2:sympathetic_nerves_l",
    "namePtBr": "Sympathetic nerves Esquerdo",
    "nameEn": "Sympathetic nerves (left)",
    "nameLatin": "Nervi sympathici",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Automatic division of peripheral nervous system",
      "Thoracolumbar part of autonomic division",
      "Sympathetic trunk"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:sympathetic_nerves_r",
    "node": "Sympathetic nerves.r",
    "fmaId": "TA2:sympathetic_nerves_r",
    "namePtBr": "Sympathetic nerves Direito",
    "nameEn": "Sympathetic nerves (right)",
    "nameLatin": "Nervi sympathici",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Automatic division of peripheral nervous system",
      "Thoracolumbar part of autonomic division",
      "Sympathetic trunk"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:abducens_nerve_vi_l",
    "node": "Abducens nerve (VI).l",
    "fmaId": "TA2:abducens_nerve_vi_l",
    "namePtBr": "Abducens nerve (VI) Esquerdo",
    "nameEn": "Abducens nerve (VI) (left)",
    "nameLatin": "Nervus abducens (VI",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Nerves"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:abducens_nerve_vi_r",
    "node": "Abducens nerve (VI).r",
    "fmaId": "TA2:abducens_nerve_vi_r",
    "namePtBr": "Abducens nerve (VI) Direito",
    "nameEn": "Abducens nerve (VI) (right)",
    "nameLatin": "Nervus abducens (VI",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Nerves"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:accessory_nerve_xi_l",
    "node": "Accessory nerve (XI).l",
    "fmaId": "TA2:accessory_nerve_xi_l",
    "namePtBr": "Accessory nerve (XI) Esquerdo",
    "nameEn": "Accessory nerve (XI) (left)",
    "nameLatin": "Nervus accessorius (XI",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Accessory nerve (XI)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:accessory_nerve_xi_r",
    "node": "Accessory nerve (XI).r",
    "fmaId": "TA2:accessory_nerve_xi_r",
    "namePtBr": "Accessory nerve (XI) Direito",
    "nameEn": "Accessory nerve (XI) (right)",
    "nameLatin": "Nervus accessorius (XI",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Accessory nerve (XI)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_alveolar_nerve_l",
    "node": "Inferior alveolar nerve.l",
    "fmaId": "TA2:inferior_alveolar_nerve_l",
    "namePtBr": "Inferior alveolar nerve Esquerdo",
    "nameEn": "Inferior alveolar nerve (left)",
    "nameLatin": "Nervus alveolaris inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_alveolar_nerve_r",
    "node": "Inferior alveolar nerve.r",
    "fmaId": "TA2:inferior_alveolar_nerve_r",
    "namePtBr": "Inferior alveolar nerve Direito",
    "nameEn": "Inferior alveolar nerve (right)",
    "nameLatin": "Nervus alveolaris inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:axillary_nerve_l",
    "node": "Axillary nerve.l",
    "fmaId": "TA2:axillary_nerve_l",
    "namePtBr": "Axillary nerve Esquerdo",
    "nameEn": "Axillary nerve (left)",
    "nameLatin": "Nervus axillaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Axillary nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:axillary_nerve_r",
    "node": "Axillary nerve.r",
    "fmaId": "TA2:axillary_nerve_r",
    "namePtBr": "Axillary nerve Direito",
    "nameEn": "Axillary nerve (right)",
    "nameLatin": "Nervus axillaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Axillary nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:buccal_nerve_l",
    "node": "Buccal nerve.l",
    "fmaId": "TA2:buccal_nerve_l",
    "namePtBr": "Buccal nerve Esquerdo",
    "nameEn": "Buccal nerve (left)",
    "nameLatin": "Nervus buccalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:buccal_nerve_r",
    "node": "Buccal nerve.r",
    "fmaId": "TA2:buccal_nerve_r",
    "namePtBr": "Buccal nerve Direito",
    "nameEn": "Buccal nerve (right)",
    "nameLatin": "Nervus buccalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:cochlear_nerve",
    "node": "Cochlear nerve",
    "fmaId": "TA2:cochlear_nerve",
    "namePtBr": "Cochlear nerve",
    "nameEn": "Cochlear nerve",
    "nameLatin": "Nervus cochlearis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Vestibulocochlear nerve (VIII)",
      "Cochlear nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:cochlear_nerve_l",
    "node": "Cochlear nerve.l",
    "fmaId": "TA2:cochlear_nerve_l",
    "namePtBr": "Cochlear nerve Esquerdo",
    "nameEn": "Cochlear nerve (left)",
    "nameLatin": "Nervus cochlearis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Vestibulocochlear nerve (VIII)",
      "Cochlear nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:intermediate_dorsal_cutaneous_nerve_of_foot_l",
    "node": "Intermediate dorsal cutaneous nerve of foot.l",
    "fmaId": "TA2:intermediate_dorsal_cutaneous_nerve_of_foot_l",
    "namePtBr": "Intermediate dorsal cutaneous nerve of foot Esquerdo",
    "nameEn": "Intermediate dorsal cutaneous nerve of foot (left)",
    "nameLatin": "Nervus cutaneus intermedius dorsalis pedis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Superficial fibular nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:intermediate_dorsal_cutaneous_nerve_of_foot_r",
    "node": "Intermediate dorsal cutaneous nerve of foot.r",
    "fmaId": "TA2:intermediate_dorsal_cutaneous_nerve_of_foot_r",
    "namePtBr": "Intermediate dorsal cutaneous nerve of foot Direito",
    "nameEn": "Intermediate dorsal cutaneous nerve of foot (right)",
    "nameLatin": "Nervus cutaneus intermedius dorsalis pedis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Superficial fibular nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_antebrachial_cutaneous_nerve_l",
    "node": "Lateral antebrachial cutaneous nerve.l",
    "fmaId": "TA2:lateral_antebrachial_cutaneous_nerve_l",
    "namePtBr": "Lateral antebrachial cutaneous nerve Esquerdo",
    "nameEn": "Lateral antebrachial cutaneous nerve (left)",
    "nameLatin": "Nervus cutaneus lateralis antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of lateral cord of brachial plexus",
      "Musculocutaneous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_antebrachial_cutaneous_nerve_r",
    "node": "Lateral antebrachial cutaneous nerve.r",
    "fmaId": "TA2:lateral_antebrachial_cutaneous_nerve_r",
    "namePtBr": "Lateral antebrachial cutaneous nerve Direito",
    "nameEn": "Lateral antebrachial cutaneous nerve (right)",
    "nameLatin": "Nervus cutaneus lateralis antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of lateral cord of brachial plexus",
      "Musculocutaneous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_femoral_cutaneous_nerve_l",
    "node": "Lateral femoral cutaneous nerve.l",
    "fmaId": "TA2:lateral_femoral_cutaneous_nerve_l",
    "namePtBr": "Lateral femoral cutaneous nerve Esquerdo",
    "nameEn": "Lateral femoral cutaneous nerve (left)",
    "nameLatin": "Nervus cutaneus lateralis femoris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_femoral_cutaneous_nerve_r",
    "node": "Lateral femoral cutaneous nerve.r",
    "fmaId": "TA2:lateral_femoral_cutaneous_nerve_r",
    "namePtBr": "Lateral femoral cutaneous nerve Direito",
    "nameEn": "Lateral femoral cutaneous nerve (right)",
    "nameLatin": "Nervus cutaneus lateralis femoris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_lateral_brachial_cutaneous_nerve_l",
    "node": "Inferior lateral brachial cutaneous nerve.l",
    "fmaId": "TA2:inferior_lateral_brachial_cutaneous_nerve_l",
    "namePtBr": "Inferior lateral brachial cutaneous nerve Esquerdo",
    "nameEn": "Inferior lateral brachial cutaneous nerve (left)",
    "nameLatin": "Nervus cutaneus lateralis inferior brachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_lateral_brachial_cutaneous_nerve_r",
    "node": "Inferior lateral brachial cutaneous nerve.r",
    "fmaId": "TA2:inferior_lateral_brachial_cutaneous_nerve_r",
    "namePtBr": "Inferior lateral brachial cutaneous nerve Direito",
    "nameEn": "Inferior lateral brachial cutaneous nerve (right)",
    "nameLatin": "Nervus cutaneus lateralis inferior brachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_lateral_brachial_cutaneous_nerve_l",
    "node": "Superior lateral brachial cutaneous nerve.l",
    "fmaId": "TA2:superior_lateral_brachial_cutaneous_nerve_l",
    "namePtBr": "Superior lateral brachial cutaneous nerve Esquerdo",
    "nameEn": "Superior lateral brachial cutaneous nerve (left)",
    "nameLatin": "Nervus cutaneus lateralis posterioris femoris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Axillary nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_lateral_brachial_cutaneous_nerve_r",
    "node": "Superior lateral brachial cutaneous nerve.r",
    "fmaId": "TA2:superior_lateral_brachial_cutaneous_nerve_r",
    "namePtBr": "Superior lateral brachial cutaneous nerve Direito",
    "nameEn": "Superior lateral brachial cutaneous nerve (right)",
    "nameLatin": "Nervus cutaneus lateralis posterioris femoris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Axillary nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_antebrachial_cutaneous_nerve_l",
    "node": "Medial antebrachial cutaneous nerve.l",
    "fmaId": "TA2:medial_antebrachial_cutaneous_nerve_l",
    "namePtBr": "Medial antebrachial cutaneous nerve Esquerdo",
    "nameEn": "Medial antebrachial cutaneous nerve (left)",
    "nameLatin": "Nervus cutaneus medialis antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Medial antebrachial cutaneous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_antebrachial_cutaneous_nerve_r",
    "node": "Medial antebrachial cutaneous nerve.r",
    "fmaId": "TA2:medial_antebrachial_cutaneous_nerve_r",
    "namePtBr": "Medial antebrachial cutaneous nerve Direito",
    "nameEn": "Medial antebrachial cutaneous nerve (right)",
    "nameLatin": "Nervus cutaneus medialis antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Medial antebrachial cutaneous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_brachial_cutaneous_nerve_l",
    "node": "Medial brachial cutaneous nerve.l",
    "fmaId": "TA2:medial_brachial_cutaneous_nerve_l",
    "namePtBr": "Medial brachial cutaneous nerve Esquerdo",
    "nameEn": "Medial brachial cutaneous nerve (left)",
    "nameLatin": "Nervus cutaneus medialis brachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_brachial_cutaneous_nerve_r",
    "node": "Medial brachial cutaneous nerve.r",
    "fmaId": "TA2:medial_brachial_cutaneous_nerve_r",
    "namePtBr": "Medial brachial cutaneous nerve Direito",
    "nameEn": "Medial brachial cutaneous nerve (right)",
    "nameLatin": "Nervus cutaneus medialis brachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_dorsal_cutaneous_nerve_of_foot_l",
    "node": "Medial dorsal cutaneous nerve of foot.l",
    "fmaId": "TA2:medial_dorsal_cutaneous_nerve_of_foot_l",
    "namePtBr": "Medial dorsal cutaneous nerve of foot Esquerdo",
    "nameEn": "Medial dorsal cutaneous nerve of foot (left)",
    "nameLatin": "Nervus cutaneus medialis dorsalis pedis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Superficial fibular nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_dorsal_cutaneous_nerve_of_foot_r",
    "node": "Medial dorsal cutaneous nerve of foot.r",
    "fmaId": "TA2:medial_dorsal_cutaneous_nerve_of_foot_r",
    "namePtBr": "Medial dorsal cutaneous nerve of foot Direito",
    "nameEn": "Medial dorsal cutaneous nerve of foot (right)",
    "nameLatin": "Nervus cutaneus medialis dorsalis pedis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Superficial fibular nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_sural_cutaneous_nerve_l",
    "node": "Medial sural cutaneous nerve.l",
    "fmaId": "TA2:medial_sural_cutaneous_nerve_l",
    "namePtBr": "Medial sural cutaneous nerve Esquerdo",
    "nameEn": "Medial sural cutaneous nerve (left)",
    "nameLatin": "Nervus cutaneus medialis surae",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve",
      "Saphenous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_sural_cutaneous_nerve_r",
    "node": "Medial sural cutaneous nerve.r",
    "fmaId": "TA2:medial_sural_cutaneous_nerve_r",
    "namePtBr": "Medial sural cutaneous nerve Direito",
    "nameEn": "Medial sural cutaneous nerve (right)",
    "nameLatin": "Nervus cutaneus medialis surae",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve",
      "Saphenous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_antebrachial_cutaneous_nerve_l",
    "node": "Posterior antebrachial cutaneous nerve.l",
    "fmaId": "TA2:posterior_antebrachial_cutaneous_nerve_l",
    "namePtBr": "Posterior antebrachial cutaneous nerve Esquerdo",
    "nameEn": "Posterior antebrachial cutaneous nerve (left)",
    "nameLatin": "Nervus cutaneus posterior antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_antebrachial_cutaneous_nerve_r",
    "node": "Posterior antebrachial cutaneous nerve.r",
    "fmaId": "TA2:posterior_antebrachial_cutaneous_nerve_r",
    "namePtBr": "Posterior antebrachial cutaneous nerve Direito",
    "nameEn": "Posterior antebrachial cutaneous nerve (right)",
    "nameLatin": "Nervus cutaneus posterior antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_femoral_cutaneous_nerve_l",
    "node": "Posterior femoral cutaneous nerve.l",
    "fmaId": "TA2:posterior_femoral_cutaneous_nerve_l",
    "namePtBr": "Posterior femoral cutaneous nerve Esquerdo",
    "nameEn": "Posterior femoral cutaneous nerve (left)",
    "nameLatin": "Nervus cutaneus posterior femoris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_femoral_cutaneous_nerve_r",
    "node": "Posterior femoral cutaneous nerve.r",
    "fmaId": "TA2:posterior_femoral_cutaneous_nerve_r",
    "namePtBr": "Posterior femoral cutaneous nerve Direito",
    "nameEn": "Posterior femoral cutaneous nerve (right)",
    "nameLatin": "Nervus cutaneus posterior femoris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:dorsal_scapular_nerve_l",
    "node": "Dorsal scapular nerve.l",
    "fmaId": "TA2:dorsal_scapular_nerve_l",
    "namePtBr": "Dorsal scapular nerve Esquerdo",
    "nameEn": "Dorsal scapular nerve (left)",
    "nameLatin": "Nervus dorsalis scapulae",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular branches of brachial plexus",
      "Dorsal scapular nerve"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:dorsal_scapular_nerve_r",
    "node": "Dorsal scapular nerve.r",
    "fmaId": "TA2:dorsal_scapular_nerve_r",
    "namePtBr": "Dorsal scapular nerve Direito",
    "nameEn": "Dorsal scapular nerve (right)",
    "nameLatin": "Nervus dorsalis scapulae",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular branches of brachial plexus",
      "Dorsal scapular nerve"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:facial_nerve_vii_l",
    "node": "Facial nerve (VII).l",
    "fmaId": "TA2:facial_nerve_vii_l",
    "namePtBr": "Facial nerve (VII) Esquerdo",
    "nameEn": "Facial nerve (VII) (left)",
    "nameLatin": "Nervus facialis (VII",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Facial nerve (VII)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:facial_nerve_vii_r",
    "node": "Facial nerve (VII).r",
    "fmaId": "TA2:facial_nerve_vii_r",
    "namePtBr": "Facial nerve (VII) Direito",
    "nameEn": "Facial nerve (VII) (right)",
    "nameLatin": "Nervus facialis (VII",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Facial nerve (VII)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:femoral_nerve_l",
    "node": "Femoral nerve.l",
    "fmaId": "TA2:femoral_nerve_l",
    "namePtBr": "Femoral nerve Esquerdo",
    "nameEn": "Femoral nerve (left)",
    "nameLatin": "Nervus femoralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:femoral_nerve_r",
    "node": "Femoral nerve.r",
    "fmaId": "TA2:femoral_nerve_r",
    "namePtBr": "Femoral nerve Direito",
    "nameEn": "Femoral nerve (right)",
    "nameLatin": "Nervus femoralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:common_fibular_nerve_l",
    "node": "Common fibular nerve.l",
    "fmaId": "TA2:common_fibular_nerve_l",
    "namePtBr": "Common fibular nerve Esquerdo",
    "nameEn": "Common fibular nerve (left)",
    "nameLatin": "Nervus fibularis communis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:common_fibular_nerve_r",
    "node": "Common fibular nerve.r",
    "fmaId": "TA2:common_fibular_nerve_r",
    "namePtBr": "Common fibular nerve Direito",
    "nameEn": "Common fibular nerve (right)",
    "nameLatin": "Nervus fibularis communis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:deep_fibular_nerve_l",
    "node": "Deep fibular nerve.l",
    "fmaId": "TA2:deep_fibular_nerve_l",
    "namePtBr": "Deep fibular nerve Esquerdo",
    "nameEn": "Deep fibular nerve (left)",
    "nameLatin": "Nervus fibularis profundus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Deep fibular nerve"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:deep_fibular_nerve_r",
    "node": "Deep fibular nerve.r",
    "fmaId": "TA2:deep_fibular_nerve_r",
    "namePtBr": "Deep fibular nerve Direito",
    "nameEn": "Deep fibular nerve (right)",
    "nameLatin": "Nervus fibularis profundus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Deep fibular nerve"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:superficial_fibular_nerve_l",
    "node": "Superficial fibular nerve.l",
    "fmaId": "TA2:superficial_fibular_nerve_l",
    "namePtBr": "Superficial fibular nerve Esquerdo",
    "nameEn": "Superficial fibular nerve (left)",
    "nameLatin": "Nervus fibularis superficialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Superficial fibular nerve"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:superficial_fibular_nerve_r",
    "node": "Superficial fibular nerve.r",
    "fmaId": "TA2:superficial_fibular_nerve_r",
    "namePtBr": "Superficial fibular nerve Direito",
    "nameEn": "Superficial fibular nerve (right)",
    "nameLatin": "Nervus fibularis superficialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Superficial fibular nerve"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:genitofemoral_nerve_l",
    "node": "Genitofemoral nerve.l",
    "fmaId": "TA2:genitofemoral_nerve_l",
    "namePtBr": "Genitofemoral nerve Esquerdo",
    "nameEn": "Genitofemoral nerve (left)",
    "nameLatin": "Nervus genitofemoralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of anterior part of lumbar plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:genitofemoral_nerve_r",
    "node": "Genitofemoral nerve.r",
    "fmaId": "TA2:genitofemoral_nerve_r",
    "namePtBr": "Genitofemoral nerve Direito",
    "nameEn": "Genitofemoral nerve (right)",
    "nameLatin": "Nervus genitofemoralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of anterior part of lumbar plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:glossopharyngeal_nerve_ix_l",
    "node": "Glossopharyngeal nerve (IX).l",
    "fmaId": "TA2:glossopharyngeal_nerve_ix_l",
    "namePtBr": "Glossopharyngeal nerve (IX) Esquerdo",
    "nameEn": "Glossopharyngeal nerve (IX) (left)",
    "nameLatin": "Nervus glossopharyngeus (IX",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Glossopharyngeal nerve (IX)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:glossopharyngeal_nerve_ix_r",
    "node": "Glossopharyngeal nerve (IX).r",
    "fmaId": "TA2:glossopharyngeal_nerve_ix_r",
    "namePtBr": "Glossopharyngeal nerve (IX) Direito",
    "nameEn": "Glossopharyngeal nerve (IX) (right)",
    "nameLatin": "Nervus glossopharyngeus (IX",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Glossopharyngeal nerve (IX)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_gluteal_nerve_l",
    "node": "Superior gluteal nerve.l",
    "fmaId": "TA2:superior_gluteal_nerve_l",
    "namePtBr": "Superior gluteal nerve Esquerdo",
    "nameEn": "Superior gluteal nerve (left)",
    "nameLatin": "Nervus gluteus superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_gluteal_nerve_r",
    "node": "Superior gluteal nerve.r",
    "fmaId": "TA2:superior_gluteal_nerve_r",
    "namePtBr": "Superior gluteal nerve Direito",
    "nameEn": "Superior gluteal nerve (right)",
    "nameLatin": "Nervus gluteus superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:hypoglossal_nerve_xii_l",
    "node": "Hypoglossal nerve (XII).l",
    "fmaId": "TA2:hypoglossal_nerve_xii_l",
    "namePtBr": "Hypoglossal nerve (XII) Esquerdo",
    "nameEn": "Hypoglossal nerve (XII) (left)",
    "nameLatin": "Nervus hypoglossus (XII",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Hypoglossal nerve (XII)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:hypoglossal_nerve_xii_r",
    "node": "Hypoglossal nerve (XII).r",
    "fmaId": "TA2:hypoglossal_nerve_xii_r",
    "namePtBr": "Hypoglossal nerve (XII) Direito",
    "nameEn": "Hypoglossal nerve (XII) (right)",
    "nameLatin": "Nervus hypoglossus (XII",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Hypoglossal nerve (XII)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:iliohypogastric_nerve_l",
    "node": "Iliohypogastric nerve.l",
    "fmaId": "TA2:iliohypogastric_nerve_l",
    "namePtBr": "Iliohypogastric nerve Esquerdo",
    "nameEn": "Iliohypogastric nerve (left)",
    "nameLatin": "Nervus iliohypogastricus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbar nerves",
      "Anterior rami of lumbar nerves",
      "Iliohypogastric nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:iliohypogastric_nerve_r",
    "node": "Iliohypogastric nerve.r",
    "fmaId": "TA2:iliohypogastric_nerve_r",
    "namePtBr": "Iliohypogastric nerve Direito",
    "nameEn": "Iliohypogastric nerve (right)",
    "nameLatin": "Nervus iliohypogastricus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbar nerves",
      "Anterior rami of lumbar nerves",
      "Iliohypogastric nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ilio_inguinal_nerve_l",
    "node": "Ilio-inguinal nerve.l",
    "fmaId": "TA2:ilio_inguinal_nerve_l",
    "namePtBr": "Ilio-inguinal nerve Esquerdo",
    "nameEn": "Ilio-inguinal nerve (left)",
    "nameLatin": "Nervus ilioinguinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbar nerves",
      "Anterior rami of lumbar nerves",
      "Ilio-inguinal nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ilio_inguinal_nerve_r",
    "node": "Ilio-inguinal nerve.r",
    "fmaId": "TA2:ilio_inguinal_nerve_r",
    "namePtBr": "Ilio-inguinal nerve Direito",
    "nameEn": "Ilio-inguinal nerve (right)",
    "nameLatin": "Nervus ilioinguinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbar nerves",
      "Anterior rami of lumbar nerves",
      "Ilio-inguinal nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_interosseous_nerve_of_forearm_l",
    "node": "Anterior interosseous nerve of forearm.l",
    "fmaId": "TA2:anterior_interosseous_nerve_of_forearm_l",
    "namePtBr": "Anterior interosseous nerve of forearm Esquerdo",
    "nameEn": "Anterior interosseous nerve of forearm (left)",
    "nameLatin": "Nervus interosseus anterior antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Median nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_interosseous_nerve_of_forearm_r",
    "node": "Anterior interosseous nerve of forearm.r",
    "fmaId": "TA2:anterior_interosseous_nerve_of_forearm_r",
    "namePtBr": "Anterior interosseous nerve of forearm Direito",
    "nameEn": "Anterior interosseous nerve of forearm (right)",
    "nameLatin": "Nervus interosseus anterior antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Median nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_interosseous_nerve_of_forearm_l",
    "node": "Posterior interosseous nerve of forearm.l",
    "fmaId": "TA2:posterior_interosseous_nerve_of_forearm_l",
    "namePtBr": "Posterior interosseous nerve of forearm Esquerdo",
    "nameEn": "Posterior interosseous nerve of forearm (left)",
    "nameLatin": "Nervus interosseus posterior antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve",
      "Deep branch of radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_interosseous_nerve_of_forearm_r",
    "node": "Posterior interosseous nerve of forearm.r",
    "fmaId": "TA2:posterior_interosseous_nerve_of_forearm_r",
    "namePtBr": "Posterior interosseous nerve of forearm Direito",
    "nameEn": "Posterior interosseous nerve of forearm (right)",
    "nameLatin": "Nervus interosseus posterior antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve",
      "Deep branch of radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:sciatic_nerve_l",
    "node": "Sciatic nerve.l",
    "fmaId": "TA2:sciatic_nerve_l",
    "namePtBr": "Sciatic nerve Esquerdo",
    "nameEn": "Sciatic nerve (left)",
    "nameLatin": "Nervus ischiadicus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:sciatic_nerve_r",
    "node": "Sciatic nerve.r",
    "fmaId": "TA2:sciatic_nerve_r",
    "namePtBr": "Sciatic nerve Direito",
    "nameEn": "Sciatic nerve (right)",
    "nameLatin": "Nervus ischiadicus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lingual_nerve_l",
    "node": "Lingual nerve.l",
    "fmaId": "TA2:lingual_nerve_l",
    "namePtBr": "Lingual nerve Esquerdo",
    "nameEn": "Lingual nerve (left)",
    "nameLatin": "Nervus lingualis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lingual_nerve_r",
    "node": "Lingual nerve.r",
    "fmaId": "TA2:lingual_nerve_r",
    "namePtBr": "Lingual nerve Direito",
    "nameEn": "Lingual nerve (right)",
    "nameLatin": "Nervus lingualis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:maxillary_nerve_l",
    "node": "Maxillary nerve.l",
    "fmaId": "TA2:maxillary_nerve_l",
    "namePtBr": "Maxillary nerve Esquerdo",
    "nameEn": "Maxillary nerve (left)",
    "nameLatin": "Nervus maxillaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": -0.6,
      "y": -0.2,
      "z": 0.9
    }
  },
  {
    "id": "za:maxillary_nerve_r",
    "node": "Maxillary nerve.r",
    "fmaId": "TA2:maxillary_nerve_r",
    "namePtBr": "Maxillary nerve Direito",
    "nameEn": "Maxillary nerve (right)",
    "nameLatin": "Nervus maxillaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0.6,
      "y": -0.2,
      "z": 0.9
    }
  },
  {
    "id": "za:median_nerve_l",
    "node": "Median nerve.l",
    "fmaId": "TA2:median_nerve_l",
    "namePtBr": "Median nerve Esquerdo",
    "nameEn": "Median nerve (left)",
    "nameLatin": "Nervus medianus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Median nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:median_nerve_r",
    "node": "Median nerve.r",
    "fmaId": "TA2:median_nerve_r",
    "namePtBr": "Median nerve Direito",
    "nameEn": "Median nerve (right)",
    "nameLatin": "Nervus medianus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Median nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:mental_nerve_l",
    "node": "Mental nerve.l",
    "fmaId": "TA2:mental_nerve_l",
    "namePtBr": "Mental nerve Esquerdo",
    "nameEn": "Mental nerve (left)",
    "nameLatin": "Nervus mentalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:mental_nerve_r",
    "node": "Mental nerve.r",
    "fmaId": "TA2:mental_nerve_r",
    "namePtBr": "Mental nerve Direito",
    "nameEn": "Mental nerve (right)",
    "nameLatin": "Nervus mentalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nerve_to_piriformis_muscle_l",
    "node": "Nerve to piriformis muscle.l",
    "fmaId": "TA2:nerve_to_piriformis_muscle_l",
    "namePtBr": "Nerve to piriformis muscle Esquerdo",
    "nameEn": "Nerve to piriformis muscle (left)",
    "nameLatin": "Nervus musculi piriformis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nerve_to_piriformis_muscle_r",
    "node": "Nerve to piriformis muscle.r",
    "fmaId": "TA2:nerve_to_piriformis_muscle_r",
    "namePtBr": "Nerve to piriformis muscle Direito",
    "nameEn": "Nerve to piriformis muscle (right)",
    "nameLatin": "Nervus musculi piriformis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nerve_to_quadratus_femoris_muscle_l",
    "node": "Nerve to quadratus femoris muscle.l",
    "fmaId": "TA2:nerve_to_quadratus_femoris_muscle_l",
    "namePtBr": "Nerve to quadratus femoris muscle Esquerdo",
    "nameEn": "Nerve to quadratus femoris muscle (left)",
    "nameLatin": "Nervus musculi quadrati femoris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Nerves"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nerve_to_quadratus_femoris_muscle_r",
    "node": "Nerve to quadratus femoris muscle.r",
    "fmaId": "TA2:nerve_to_quadratus_femoris_muscle_r",
    "namePtBr": "Nerve to quadratus femoris muscle Direito",
    "nameEn": "Nerve to quadratus femoris muscle (right)",
    "nameLatin": "Nervus musculi quadrati femoris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Nerves"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:musculocutaneous_nerve_l",
    "node": "Musculocutaneous nerve.l",
    "fmaId": "TA2:musculocutaneous_nerve_l",
    "namePtBr": "Musculocutaneous nerve Esquerdo",
    "nameEn": "Musculocutaneous nerve (left)",
    "nameLatin": "Nervus musculocutaneus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of lateral cord of brachial plexus",
      "Musculocutaneous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:musculocutaneous_nerve_r",
    "node": "Musculocutaneous nerve.r",
    "fmaId": "TA2:musculocutaneous_nerve_r",
    "namePtBr": "Musculocutaneous nerve Direito",
    "nameEn": "Musculocutaneous nerve (right)",
    "nameLatin": "Nervus musculocutaneus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of lateral cord of brachial plexus",
      "Musculocutaneous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nerve_to_mylohyoid_muscle_l",
    "node": "Nerve to mylohyoid muscle.l",
    "fmaId": "TA2:nerve_to_mylohyoid_muscle_l",
    "namePtBr": "Nerve to mylohyoid muscle Esquerdo",
    "nameEn": "Nerve to mylohyoid muscle (left)",
    "nameLatin": "Nervus mylohyoideus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nerve_to_mylohyoid_muscle_r",
    "node": "Nerve to mylohyoid muscle.r",
    "fmaId": "TA2:nerve_to_mylohyoid_muscle_r",
    "namePtBr": "Nerve to mylohyoid muscle Direito",
    "nameEn": "Nerve to mylohyoid muscle (right)",
    "nameLatin": "Nervus mylohyoideus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:obturator_nerve_l",
    "node": "Obturator nerve.l",
    "fmaId": "TA2:obturator_nerve_l",
    "namePtBr": "Obturator nerve Esquerdo",
    "nameEn": "Obturator nerve (left)",
    "nameLatin": "Nervus obturatorius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of anterior part of lumbar plexus",
      "Obturator nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:obturator_nerve_r",
    "node": "Obturator nerve.r",
    "fmaId": "TA2:obturator_nerve_r",
    "namePtBr": "Obturator nerve Direito",
    "nameEn": "Obturator nerve (right)",
    "nameLatin": "Nervus obturatorius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of anterior part of lumbar plexus",
      "Obturator nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:oculomotor_nerve_iii_l",
    "node": "Oculomotor nerve (III).l",
    "fmaId": "TA2:oculomotor_nerve_iii_l",
    "namePtBr": "Oculomotor nerve (III) Esquerdo",
    "nameEn": "Oculomotor nerve (III) (left)",
    "nameLatin": "Nervus oculomotorius (III",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Oculomotor nerve (III)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:oculomotor_nerve_iii_r",
    "node": "Oculomotor nerve (III).r",
    "fmaId": "TA2:oculomotor_nerve_iii_r",
    "namePtBr": "Oculomotor nerve (III) Direito",
    "nameEn": "Oculomotor nerve (III) (right)",
    "nameLatin": "Nervus oculomotorius (III",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Oculomotor nerve (III)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:olfactory_nerve_i_l",
    "node": "Olfactory nerve (I).l",
    "fmaId": "TA2:olfactory_nerve_i_l",
    "namePtBr": "Olfactory nerve (I) Esquerdo",
    "nameEn": "Olfactory nerve (I) (left)",
    "nameLatin": "Nervus olfactorius (I",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Olfactory nerve (I)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:olfactory_nerve_i_r",
    "node": "Olfactory nerve (I).r",
    "fmaId": "TA2:olfactory_nerve_i_r",
    "namePtBr": "Olfactory nerve (I) Direito",
    "nameEn": "Olfactory nerve (I) (right)",
    "nameLatin": "Nervus olfactorius (I",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Olfactory nerve (I)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ophthalmic_nerve_l",
    "node": "Ophthalmic nerve.l",
    "fmaId": "TA2:ophthalmic_nerve_l",
    "namePtBr": "Ophthalmic nerve Esquerdo",
    "nameEn": "Ophthalmic nerve (left)",
    "nameLatin": "Nervus ophthalmicus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ophthalmic_nerve_r",
    "node": "Ophthalmic nerve.r",
    "fmaId": "TA2:ophthalmic_nerve_r",
    "namePtBr": "Ophthalmic nerve Direito",
    "nameEn": "Ophthalmic nerve (right)",
    "nameLatin": "Nervus ophthalmicus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:optic_nerve_ii_l",
    "node": "Optic nerve (II).l",
    "fmaId": "TA2:optic_nerve_ii_l",
    "namePtBr": "Optic nerve (II) Esquerdo",
    "nameEn": "Optic nerve (II) (left)",
    "nameLatin": "Nervus opticus (II",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Optic nerve (II)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:optic_nerve_ii_r",
    "node": "Optic nerve (II).r",
    "fmaId": "TA2:optic_nerve_ii_r",
    "namePtBr": "Optic nerve (II) Direito",
    "nameEn": "Optic nerve (II) (right)",
    "nameLatin": "Nervus opticus (II",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Optic nerve (II)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_pectoral_nerve_l",
    "node": "Lateral pectoral nerve.l",
    "fmaId": "TA2:lateral_pectoral_nerve_l",
    "namePtBr": "Lateral pectoral nerve Esquerdo",
    "nameEn": "Lateral pectoral nerve (left)",
    "nameLatin": "Nervus pectoralis lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of lateral cord of brachial plexus",
      "Lateral pectoral nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_pectoral_nerve_r",
    "node": "Lateral pectoral nerve.r",
    "fmaId": "TA2:lateral_pectoral_nerve_r",
    "namePtBr": "Lateral pectoral nerve Direito",
    "nameEn": "Lateral pectoral nerve (right)",
    "nameLatin": "Nervus pectoralis lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of lateral cord of brachial plexus",
      "Lateral pectoral nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_pectoral_nerve_l",
    "node": "Medial pectoral nerve.l",
    "fmaId": "TA2:medial_pectoral_nerve_l",
    "namePtBr": "Medial pectoral nerve Esquerdo",
    "nameEn": "Medial pectoral nerve (left)",
    "nameLatin": "Nervus pectoralis medialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Inferior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_pectoral_nerve_r",
    "node": "Medial pectoral nerve.r",
    "fmaId": "TA2:medial_pectoral_nerve_r",
    "namePtBr": "Medial pectoral nerve Direito",
    "nameEn": "Medial pectoral nerve (right)",
    "nameLatin": "Nervus pectoralis medialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Inferior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_plantar_nerve_l",
    "node": "Lateral plantar nerve.l",
    "fmaId": "TA2:lateral_plantar_nerve_l",
    "namePtBr": "Lateral plantar nerve Esquerdo",
    "nameEn": "Lateral plantar nerve (left)",
    "nameLatin": "Nervus plantaris lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve",
      "Lateral plantar nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_plantar_nerve_r",
    "node": "Lateral plantar nerve.r",
    "fmaId": "TA2:lateral_plantar_nerve_r",
    "namePtBr": "Lateral plantar nerve Direito",
    "nameEn": "Lateral plantar nerve (right)",
    "nameLatin": "Nervus plantaris lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve",
      "Lateral plantar nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_plantar_nerve_l",
    "node": "Medial plantar nerve.l",
    "fmaId": "TA2:medial_plantar_nerve_l",
    "namePtBr": "Medial plantar nerve Esquerdo",
    "nameEn": "Medial plantar nerve (left)",
    "nameLatin": "Nervus plantaris medialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve",
      "Medial plantar nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_plantar_nerve_r",
    "node": "Medial plantar nerve.r",
    "fmaId": "TA2:medial_plantar_nerve_r",
    "namePtBr": "Medial plantar nerve Direito",
    "nameEn": "Medial plantar nerve (right)",
    "nameLatin": "Nervus plantaris medialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve",
      "Medial plantar nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:pudendal_nerve_l",
    "node": "Pudendal nerve.l",
    "fmaId": "TA2:pudendal_nerve_l",
    "namePtBr": "Pudendal nerve Esquerdo",
    "nameEn": "Pudendal nerve (left)",
    "nameLatin": "Nervus pudendalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Nerves"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:pudendal_nerve_r",
    "node": "Pudendal nerve.r",
    "fmaId": "TA2:pudendal_nerve_r",
    "namePtBr": "Pudendal nerve Direito",
    "nameEn": "Pudendal nerve (right)",
    "nameLatin": "Nervus pudendalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Nerves"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:radial_nerve_l",
    "node": "Radial nerve.l",
    "fmaId": "TA2:radial_nerve_l",
    "namePtBr": "Radial nerve Esquerdo",
    "nameEn": "Radial nerve (left)",
    "nameLatin": "Nervus radialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:radial_nerve_r",
    "node": "Radial nerve.r",
    "fmaId": "TA2:radial_nerve_r",
    "namePtBr": "Radial nerve Direito",
    "nameEn": "Radial nerve (right)",
    "nameLatin": "Nervus radialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:saphenous_nerve_l",
    "node": "Saphenous nerve.l",
    "fmaId": "TA2:saphenous_nerve_l",
    "namePtBr": "Saphenous nerve Esquerdo",
    "nameEn": "Saphenous nerve (left)",
    "nameLatin": "Nervus saphenus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve",
      "Saphenous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:saphenous_nerve_r",
    "node": "Saphenous nerve.r",
    "fmaId": "TA2:saphenous_nerve_r",
    "namePtBr": "Saphenous nerve Direito",
    "nameEn": "Saphenous nerve (right)",
    "nameLatin": "Nervus saphenus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve",
      "Saphenous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:subclavian_nerve_l",
    "node": "Subclavian nerve.l",
    "fmaId": "TA2:subclavian_nerve_l",
    "namePtBr": "Subclavian nerve Esquerdo",
    "nameEn": "Subclavian nerve (left)",
    "nameLatin": "Nervus subclavius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular branches of brachial plexus",
      "Subclavian nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:subclavian_nerve_r",
    "node": "Subclavian nerve.r",
    "fmaId": "TA2:subclavian_nerve_r",
    "namePtBr": "Subclavian nerve Direito",
    "nameEn": "Subclavian nerve (right)",
    "nameLatin": "Nervus subclavius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular branches of brachial plexus",
      "Subclavian nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_subscapular_nerve_l",
    "node": "Inferior subscapular nerve.l",
    "fmaId": "TA2:inferior_subscapular_nerve_l",
    "namePtBr": "Inferior subscapular nerve Esquerdo",
    "nameEn": "Inferior subscapular nerve (left)",
    "nameLatin": "Nervus subscapularis inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Infraclavicular part of brachial plexus"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:inferior_subscapular_nerve_r",
    "node": "Inferior subscapular nerve.r",
    "fmaId": "TA2:inferior_subscapular_nerve_r",
    "namePtBr": "Inferior subscapular nerve Direito",
    "nameEn": "Inferior subscapular nerve (right)",
    "nameLatin": "Nervus subscapularis inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Infraclavicular part of brachial plexus"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:superior_subscapular_nerve_l",
    "node": "Superior subscapular nerve.l",
    "fmaId": "TA2:superior_subscapular_nerve_l",
    "namePtBr": "Superior subscapular nerve Esquerdo",
    "nameEn": "Superior subscapular nerve (left)",
    "nameLatin": "Nervus subscapularis superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Infraclavicular part of brachial plexus"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:superior_subscapular_nerve_r",
    "node": "Superior subscapular nerve.r",
    "fmaId": "TA2:superior_subscapular_nerve_r",
    "namePtBr": "Superior subscapular nerve Direito",
    "nameEn": "Superior subscapular nerve (right)",
    "nameLatin": "Nervus subscapularis superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Infraclavicular part of brachial plexus"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:suprascapular_nerve_l",
    "node": "Suprascapular nerve.l",
    "fmaId": "TA2:suprascapular_nerve_l",
    "namePtBr": "Suprascapular nerve Esquerdo",
    "nameEn": "Suprascapular nerve (left)",
    "nameLatin": "Nervus suprascapularis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular branches of brachial plexus",
      "Suprascapular nerve"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:suprascapular_nerve_r",
    "node": "Suprascapular nerve.r",
    "fmaId": "TA2:suprascapular_nerve_r",
    "namePtBr": "Suprascapular nerve Direito",
    "nameEn": "Suprascapular nerve (right)",
    "nameLatin": "Nervus suprascapularis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular branches of brachial plexus",
      "Suprascapular nerve"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:sural_nerve_l",
    "node": "Sural nerve.l",
    "fmaId": "TA2:sural_nerve_l",
    "namePtBr": "Sural nerve Esquerdo",
    "nameEn": "Sural nerve (left)",
    "nameLatin": "Nervus suralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve",
      "Saphenous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:sural_nerve_r",
    "node": "Sural nerve.r",
    "fmaId": "TA2:sural_nerve_r",
    "namePtBr": "Sural nerve Direito",
    "nameEn": "Sural nerve (right)",
    "nameLatin": "Nervus suralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve",
      "Saphenous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:long_thoracic_nerve_l",
    "node": "Long thoracic nerve.l",
    "fmaId": "TA2:long_thoracic_nerve_l",
    "namePtBr": "Long thoracic nerve Esquerdo",
    "nameEn": "Long thoracic nerve (left)",
    "nameLatin": "Nervus thoracicus longus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular branches of brachial plexus",
      "Long thoracic nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:long_thoracic_nerve_r",
    "node": "Long thoracic nerve.r",
    "fmaId": "TA2:long_thoracic_nerve_r",
    "namePtBr": "Long thoracic nerve Direito",
    "nameEn": "Long thoracic nerve (right)",
    "nameLatin": "Nervus thoracicus longus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular branches of brachial plexus",
      "Long thoracic nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:thoracodorsal_nerve_l",
    "node": "Thoracodorsal nerve.l",
    "fmaId": "TA2:thoracodorsal_nerve_l",
    "namePtBr": "Thoracodorsal nerve Esquerdo",
    "nameEn": "Thoracodorsal nerve (left)",
    "nameLatin": "Nervus thoracodorsalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Infraclavicular part of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:thoracodorsal_nerve_r",
    "node": "Thoracodorsal nerve.r",
    "fmaId": "TA2:thoracodorsal_nerve_r",
    "namePtBr": "Thoracodorsal nerve Direito",
    "nameEn": "Thoracodorsal nerve (right)",
    "nameLatin": "Nervus thoracodorsalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Infraclavicular part of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:tibial_nerve_l",
    "node": "Tibial nerve.l",
    "fmaId": "TA2:tibial_nerve_l",
    "namePtBr": "Tibial nerve Esquerdo",
    "nameEn": "Tibial nerve (left)",
    "nameLatin": "Nervus tibialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:tibial_nerve_r",
    "node": "Tibial nerve.r",
    "fmaId": "TA2:tibial_nerve_r",
    "namePtBr": "Tibial nerve Direito",
    "nameEn": "Tibial nerve (right)",
    "nameLatin": "Nervus tibialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:trigeminal_nerve_v_l",
    "node": "Trigeminal nerve (V).l",
    "fmaId": "TA2:trigeminal_nerve_v_l",
    "namePtBr": "Trigeminal nerve (V) Esquerdo",
    "nameEn": "Trigeminal nerve (V) (left)",
    "nameLatin": "Nervus trigeminus (V",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:trigeminal_nerve_v_r",
    "node": "Trigeminal nerve (V).r",
    "fmaId": "TA2:trigeminal_nerve_v_r",
    "namePtBr": "Trigeminal nerve (V) Direito",
    "nameEn": "Trigeminal nerve (V) (right)",
    "nameLatin": "Nervus trigeminus (V",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:trochlear_nerve_iv_l",
    "node": "Trochlear nerve (IV).l",
    "fmaId": "TA2:trochlear_nerve_iv_l",
    "namePtBr": "Trochlear nerve (IV) Esquerdo",
    "nameEn": "Trochlear nerve (IV) (left)",
    "nameLatin": "Nervus trochlearis (IV",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Nerves"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:trochlear_nerve_iv_r",
    "node": "Trochlear nerve (IV).r",
    "fmaId": "TA2:trochlear_nerve_iv_r",
    "namePtBr": "Trochlear nerve (IV) Direito",
    "nameEn": "Trochlear nerve (IV) (right)",
    "nameLatin": "Nervus trochlearis (IV",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Nerves"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ulnar_nerve_l",
    "node": "Ulnar nerve.l",
    "fmaId": "TA2:ulnar_nerve_l",
    "namePtBr": "Ulnar nerve Esquerdo",
    "nameEn": "Ulnar nerve (left)",
    "nameLatin": "Nervus ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:ulnar_nerve_r",
    "node": "Ulnar nerve.r",
    "fmaId": "TA2:ulnar_nerve_r",
    "namePtBr": "Ulnar nerve Direito",
    "nameEn": "Ulnar nerve (right)",
    "nameLatin": "Nervus ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:vagus_nerve_x_l",
    "node": "Vagus nerve (X).l",
    "fmaId": "TA2:vagus_nerve_x_l",
    "namePtBr": "Vagus nerve (X) Esquerdo",
    "nameEn": "Vagus nerve (X) (left)",
    "nameLatin": "Nervus vagus (X",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Vagus nerve (X)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:vagus_nerve_x_r",
    "node": "Vagus nerve (X).r",
    "fmaId": "TA2:vagus_nerve_x_r",
    "namePtBr": "Vagus nerve (X) Direito",
    "nameEn": "Vagus nerve (X) (right)",
    "nameLatin": "Nervus vagus (X",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Vagus nerve (X)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:vestibular_nerve_l",
    "node": "Vestibular nerve.l",
    "fmaId": "TA2:vestibular_nerve_l",
    "namePtBr": "Vestibular nerve Esquerdo",
    "nameEn": "Vestibular nerve (left)",
    "nameLatin": "Nervus vestibularis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Vestibulocochlear nerve (VIII)",
      "Vestibular nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:vestibular_nerve_r",
    "node": "Vestibular nerve.r",
    "fmaId": "TA2:vestibular_nerve_r",
    "namePtBr": "Vestibular nerve Direito",
    "nameEn": "Vestibular nerve (right)",
    "nameLatin": "Nervus vestibularis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Vestibulocochlear nerve (VIII)",
      "Vestibular nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:vestibulocochlear_nerve_viii_l",
    "node": "Vestibulocochlear nerve (VIII).l",
    "fmaId": "TA2:vestibulocochlear_nerve_viii_l",
    "namePtBr": "Vestibulocochlear nerve (VIII) Esquerdo",
    "nameEn": "Vestibulocochlear nerve (VIII) (left)",
    "nameLatin": "Nervus vestibulocochlearis (VIII",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Vestibulocochlear nerve (VIII)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:vestibulocochlear_nerve_viii_r",
    "node": "Vestibulocochlear nerve (VIII).r",
    "fmaId": "TA2:vestibulocochlear_nerve_viii_r",
    "namePtBr": "Vestibulocochlear nerve (VIII) Direito",
    "nameEn": "Vestibulocochlear nerve (VIII) (right)",
    "nameLatin": "Nervus vestibulocochlearis (VIII",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Vestibulocochlear nerve (VIII)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nodule_of_vermis",
    "node": "Nodule of vermis",
    "fmaId": "TA2:nodule_of_vermis",
    "namePtBr": "Nodule of vermis",
    "nameEn": "Nodule of vermis",
    "nameLatin": "Nodulus vermis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ninth_rib_l",
    "node": "Ninth rib.l",
    "fmaId": "TA2:ninth_rib_l",
    "namePtBr": "9ª Costela Esquerda",
    "nameEn": "Ninth rib (left)",
    "nameLatin": "Nona costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs",
      "False ribs"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:ninth_rib_r",
    "node": "Ninth rib.r",
    "fmaId": "TA2:ninth_rib_r",
    "namePtBr": "9ª Costela Direita",
    "nameEn": "Ninth rib (right)",
    "nameLatin": "Nona costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs",
      "False ribs"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:septal_nuclei",
    "node": "Septal nuclei",
    "fmaId": "TA2:septal_nuclei",
    "namePtBr": "Septal nuclei",
    "nameEn": "Septal nuclei",
    "nameLatin": "Nuclei septales",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:vestibular_nuclei_l",
    "node": "Vestibular nuclei.l",
    "fmaId": "TA2:vestibular_nuclei_l",
    "namePtBr": "Vestibular nuclei Esquerdo",
    "nameEn": "Vestibular nuclei (left)",
    "nameLatin": "Nuclei vestibulares",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:vestibular_nuclei_r",
    "node": "Vestibular nuclei.r",
    "fmaId": "TA2:vestibular_nuclei_r",
    "namePtBr": "Vestibular nuclei Direito",
    "nameEn": "Vestibular nuclei (right)",
    "nameLatin": "Nuclei vestibulares",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:accessory_nucleus_of_oculomotor_nerve_l",
    "node": "Accessory nucleus of oculomotor nerve.l",
    "fmaId": "TA2:accessory_nucleus_of_oculomotor_nerve_l",
    "namePtBr": "Accessory nucleus of oculomotor nerve Esquerdo",
    "nameEn": "Accessory nucleus of oculomotor nerve (left)",
    "nameLatin": "Nucleus accessorius nervi oculomotorii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:accessory_nucleus_of_oculomotor_nerve_r",
    "node": "Accessory nucleus of oculomotor nerve.r",
    "fmaId": "TA2:accessory_nucleus_of_oculomotor_nerve_r",
    "namePtBr": "Accessory nucleus of oculomotor nerve Direito",
    "nameEn": "Accessory nucleus of oculomotor nerve (right)",
    "nameLatin": "Nucleus accessorius nervi oculomotorii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_ambiguus_l",
    "node": "Nucleus ambiguus.l",
    "fmaId": "TA2:nucleus_ambiguus_l",
    "namePtBr": "Nucleus ambiguus Esquerdo",
    "nameEn": "Nucleus ambiguus (left)",
    "nameLatin": "Nucleus ambiguus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_ambiguus_r",
    "node": "Nucleus ambiguus.r",
    "fmaId": "TA2:nucleus_ambiguus_r",
    "namePtBr": "Nucleus ambiguus Direito",
    "nameEn": "Nucleus ambiguus (right)",
    "nameLatin": "Nucleus ambiguus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:caudate_nucleus_l",
    "node": "Caudate nucleus.l",
    "fmaId": "TA2:caudate_nucleus_l",
    "namePtBr": "Caudate nucleus Esquerdo",
    "nameEn": "Caudate nucleus (left)",
    "nameLatin": "Nucleus caudatus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:caudate_nucleus_r",
    "node": "Caudate nucleus.r",
    "fmaId": "TA2:caudate_nucleus_r",
    "namePtBr": "Caudate nucleus Direito",
    "nameEn": "Caudate nucleus (right)",
    "nameLatin": "Nucleus caudatus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_cochlear_nucleus_l",
    "node": "Anterior cochlear nucleus.l",
    "fmaId": "TA2:anterior_cochlear_nucleus_l",
    "namePtBr": "Anterior cochlear nucleus Esquerdo",
    "nameEn": "Anterior cochlear nucleus (left)",
    "nameLatin": "Nucleus cochlearis anterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_cochlear_nucleus_r",
    "node": "Anterior cochlear nucleus.r",
    "fmaId": "TA2:anterior_cochlear_nucleus_r",
    "namePtBr": "Anterior cochlear nucleus Direito",
    "nameEn": "Anterior cochlear nucleus (right)",
    "nameLatin": "Nucleus cochlearis anterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_cochlear_nucleus_l",
    "node": "Posterior cochlear nucleus.l",
    "fmaId": "TA2:posterior_cochlear_nucleus_l",
    "namePtBr": "Posterior cochlear nucleus Esquerdo",
    "nameEn": "Posterior cochlear nucleus (left)",
    "nameLatin": "Nucleus cochlearis posterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_cochlear_nucleus_r",
    "node": "Posterior cochlear nucleus.r",
    "fmaId": "TA2:posterior_cochlear_nucleus_r",
    "namePtBr": "Posterior cochlear nucleus Direito",
    "nameEn": "Posterior cochlear nucleus (right)",
    "nameLatin": "Nucleus cochlearis posterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:intermediolateral_nucleus",
    "node": "Intermediolateral nucleus",
    "fmaId": "TA2:intermediolateral_nucleus",
    "namePtBr": "Intermediolateral nucleus",
    "nameEn": "Intermediolateral nucleus",
    "nameLatin": "Nucleus intermediolateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:intermediomedial_nucleus",
    "node": "Intermediomedial nucleus",
    "fmaId": "TA2:intermediomedial_nucleus",
    "namePtBr": "Intermediomedial nucleus",
    "nameEn": "Intermediomedial nucleus",
    "nameLatin": "Nucleus intermediomedialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lentiform_nucleus_l",
    "node": "Lentiform nucleus.l",
    "fmaId": "TA2:lentiform_nucleus_l",
    "namePtBr": "Lentiform nucleus Esquerdo",
    "nameEn": "Lentiform nucleus (left)",
    "nameLatin": "Nucleus lentiformis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lentiform_nucleus_r",
    "node": "Lentiform nucleus.r",
    "fmaId": "TA2:lentiform_nucleus_r",
    "namePtBr": "Lentiform nucleus Direito",
    "nameEn": "Lentiform nucleus (right)",
    "nameLatin": "Nucleus lentiformis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_of_abducens_nerve_l",
    "node": "Nucleus of abducens nerve.l",
    "fmaId": "TA2:nucleus_of_abducens_nerve_l",
    "namePtBr": "Nucleus of abducens nerve Esquerdo",
    "nameEn": "Nucleus of abducens nerve (left)",
    "nameLatin": "Nucleus nervi abducentis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Pons"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_of_abducens_nerve_r",
    "node": "Nucleus of abducens nerve.r",
    "fmaId": "TA2:nucleus_of_abducens_nerve_r",
    "namePtBr": "Nucleus of abducens nerve Direito",
    "nameEn": "Nucleus of abducens nerve (right)",
    "nameLatin": "Nucleus nervi abducentis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Pons"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_of_accessory_nerve_l",
    "node": "Nucleus of accessory nerve.l",
    "fmaId": "TA2:nucleus_of_accessory_nerve_l",
    "namePtBr": "Nucleus of accessory nerve Esquerdo",
    "nameEn": "Nucleus of accessory nerve (left)",
    "nameLatin": "Nucleus nervi accessorii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_of_accessory_nerve_r",
    "node": "Nucleus of accessory nerve.r",
    "fmaId": "TA2:nucleus_of_accessory_nerve_r",
    "namePtBr": "Nucleus of accessory nerve Direito",
    "nameEn": "Nucleus of accessory nerve (right)",
    "nameLatin": "Nucleus nervi accessorii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:motor_nucleus_of_facial_nerve_l",
    "node": "Motor nucleus of facial nerve.l",
    "fmaId": "TA2:motor_nucleus_of_facial_nerve_l",
    "namePtBr": "Motor nucleus of facial nerve Esquerdo",
    "nameEn": "Motor nucleus of facial nerve (left)",
    "nameLatin": "Nucleus nervi facialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Pons"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:motor_nucleus_of_facial_nerve_r",
    "node": "Motor nucleus of facial nerve.r",
    "fmaId": "TA2:motor_nucleus_of_facial_nerve_r",
    "namePtBr": "Motor nucleus of facial nerve Direito",
    "nameEn": "Motor nucleus of facial nerve (right)",
    "nameLatin": "Nucleus nervi facialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Pons"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_of_hypoglossal_nerve_l",
    "node": "Nucleus of hypoglossal nerve.l",
    "fmaId": "TA2:nucleus_of_hypoglossal_nerve_l",
    "namePtBr": "Nucleus of hypoglossal nerve Esquerdo",
    "nameEn": "Nucleus of hypoglossal nerve (left)",
    "nameLatin": "Nucleus nervi hypoglossi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_of_hypoglossal_nerve_r",
    "node": "Nucleus of hypoglossal nerve.r",
    "fmaId": "TA2:nucleus_of_hypoglossal_nerve_r",
    "namePtBr": "Nucleus of hypoglossal nerve Direito",
    "nameEn": "Nucleus of hypoglossal nerve (right)",
    "nameLatin": "Nucleus nervi hypoglossi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_of_oculomotor_nerve_l",
    "node": "Nucleus of oculomotor nerve.l",
    "fmaId": "TA2:nucleus_of_oculomotor_nerve_l",
    "namePtBr": "Nucleus of oculomotor nerve Esquerdo",
    "nameEn": "Nucleus of oculomotor nerve (left)",
    "nameLatin": "Nucleus nervi oculomotorius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_of_oculomotor_nerve_r",
    "node": "Nucleus of oculomotor nerve.r",
    "fmaId": "TA2:nucleus_of_oculomotor_nerve_r",
    "namePtBr": "Nucleus of oculomotor nerve Direito",
    "nameEn": "Nucleus of oculomotor nerve (right)",
    "nameLatin": "Nucleus nervi oculomotorius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_of_trochlear_nerve_l",
    "node": "Nucleus of trochlear nerve.l",
    "fmaId": "TA2:nucleus_of_trochlear_nerve_l",
    "namePtBr": "Nucleus of trochlear nerve Esquerdo",
    "nameEn": "Nucleus of trochlear nerve (left)",
    "nameLatin": "Nucleus nervi trochlearis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_of_trochlear_nerve_r",
    "node": "Nucleus of trochlear nerve.r",
    "fmaId": "TA2:nucleus_of_trochlear_nerve_r",
    "namePtBr": "Nucleus of trochlear nerve Direito",
    "nameEn": "Nucleus of trochlear nerve (right)",
    "nameLatin": "Nucleus nervi trochlearis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_nucleus_of_vagus_nerve_l",
    "node": "Posterior nucleus of vagus nerve.l",
    "fmaId": "TA2:posterior_nucleus_of_vagus_nerve_l",
    "namePtBr": "Posterior nucleus of vagus nerve Esquerdo",
    "nameEn": "Posterior nucleus of vagus nerve (left)",
    "nameLatin": "Nucleus posterior nervi vagi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_nucleus_of_vagus_nerve_r",
    "node": "Posterior nucleus of vagus nerve.r",
    "fmaId": "TA2:posterior_nucleus_of_vagus_nerve_r",
    "namePtBr": "Posterior nucleus of vagus nerve Direito",
    "nameEn": "Posterior nucleus of vagus nerve (right)",
    "nameLatin": "Nucleus posterior nervi vagi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_proprius",
    "node": "Nucleus proprius",
    "fmaId": "TA2:nucleus_proprius",
    "namePtBr": "Nucleus proprius",
    "nameEn": "Nucleus proprius",
    "nameLatin": "Nucleus proprius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_pulposus_c2_c3",
    "node": "Nucleus pulposus C2-C3",
    "fmaId": "TA2:nucleus_pulposus_c2_c3",
    "namePtBr": "Nucleus pulposus C2-C3",
    "nameEn": "Nucleus pulposus C2-C3",
    "nameLatin": "Nucleus pulposus C2-C3",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_c3_c4",
    "node": "Nucleus pulposus C3-C4",
    "fmaId": "TA2:nucleus_pulposus_c3_c4",
    "namePtBr": "Nucleus pulposus C3-C4",
    "nameEn": "Nucleus pulposus C3-C4",
    "nameLatin": "Nucleus pulposus C3-C4",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_c4_c5",
    "node": "Nucleus pulposus C4-C5",
    "fmaId": "TA2:nucleus_pulposus_c4_c5",
    "namePtBr": "Nucleus pulposus C4-C5",
    "nameEn": "Nucleus pulposus C4-C5",
    "nameLatin": "Nucleus pulposus C4-C5",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_c5_c6",
    "node": "Nucleus pulposus C5-C6",
    "fmaId": "TA2:nucleus_pulposus_c5_c6",
    "namePtBr": "Nucleus pulposus C5-C6",
    "nameEn": "Nucleus pulposus C5-C6",
    "nameLatin": "Nucleus pulposus C5-C6",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_c6_c7",
    "node": "Nucleus pulposus C6-C7",
    "fmaId": "TA2:nucleus_pulposus_c6_c7",
    "namePtBr": "Nucleus pulposus C6-C7",
    "nameEn": "Nucleus pulposus C6-C7",
    "nameLatin": "Nucleus pulposus C6-C7",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_c7_t1",
    "node": "Nucleus pulposus C7-T1",
    "fmaId": "TA2:nucleus_pulposus_c7_t1",
    "namePtBr": "Nucleus pulposus C7-T1",
    "nameEn": "Nucleus pulposus C7-T1",
    "nameLatin": "Nucleus pulposus C7-T1",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_l1_l2",
    "node": "Nucleus pulposus L1-L2",
    "fmaId": "TA2:nucleus_pulposus_l1_l2",
    "namePtBr": "Nucleus pulposus L1-L2",
    "nameEn": "Nucleus pulposus L1-L2",
    "nameLatin": "Nucleus pulposus L1-L2",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_l2_l3",
    "node": "Nucleus pulposus L2-L3",
    "fmaId": "TA2:nucleus_pulposus_l2_l3",
    "namePtBr": "Nucleus pulposus L2-L3",
    "nameEn": "Nucleus pulposus L2-L3",
    "nameLatin": "Nucleus pulposus L2-L3",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_l3_l4",
    "node": "Nucleus pulposus L3-L4",
    "fmaId": "TA2:nucleus_pulposus_l3_l4",
    "namePtBr": "Nucleus pulposus L3-L4",
    "nameEn": "Nucleus pulposus L3-L4",
    "nameLatin": "Nucleus pulposus L3-L4",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_l4_l5",
    "node": "Nucleus pulposus L4-L5",
    "fmaId": "TA2:nucleus_pulposus_l4_l5",
    "namePtBr": "Nucleus pulposus L4-L5",
    "nameEn": "Nucleus pulposus L4-L5",
    "nameLatin": "Nucleus pulposus L4-L5",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_l5_s1",
    "node": "Nucleus pulposus L5-S1",
    "fmaId": "TA2:nucleus_pulposus_l5_s1",
    "namePtBr": "Nucleus pulposus L5-S1",
    "nameEn": "Nucleus pulposus L5-S1",
    "nameLatin": "Nucleus pulposus L5-S1",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_t1_t2",
    "node": "Nucleus pulposus T1-T2",
    "fmaId": "TA2:nucleus_pulposus_t1_t2",
    "namePtBr": "Nucleus pulposus T1-T2",
    "nameEn": "Nucleus pulposus T1-T2",
    "nameLatin": "Nucleus pulposus T1-T2",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_t10_t11",
    "node": "Nucleus pulposus T10-T11",
    "fmaId": "TA2:nucleus_pulposus_t10_t11",
    "namePtBr": "Nucleus pulposus T10-T11",
    "nameEn": "Nucleus pulposus T10-T11",
    "nameLatin": "Nucleus pulposus T10-T11",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_t11_t12",
    "node": "Nucleus pulposus T11-T12",
    "fmaId": "TA2:nucleus_pulposus_t11_t12",
    "namePtBr": "Nucleus pulposus T11-T12",
    "nameEn": "Nucleus pulposus T11-T12",
    "nameLatin": "Nucleus pulposus T11-T12",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_t12_l1",
    "node": "Nucleus pulposus T12-L1",
    "fmaId": "TA2:nucleus_pulposus_t12_l1",
    "namePtBr": "Nucleus pulposus T12-L1",
    "nameEn": "Nucleus pulposus T12-L1",
    "nameLatin": "Nucleus pulposus T12-L1",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_t2_t3",
    "node": "Nucleus pulposus T2-T3",
    "fmaId": "TA2:nucleus_pulposus_t2_t3",
    "namePtBr": "Nucleus pulposus T2-T3",
    "nameEn": "Nucleus pulposus T2-T3",
    "nameLatin": "Nucleus pulposus T2-T3",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_t3_t4",
    "node": "Nucleus pulposus T3-T4",
    "fmaId": "TA2:nucleus_pulposus_t3_t4",
    "namePtBr": "Nucleus pulposus T3-T4",
    "nameEn": "Nucleus pulposus T3-T4",
    "nameLatin": "Nucleus pulposus T3-T4",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_t4_t5",
    "node": "Nucleus pulposus T4-T5",
    "fmaId": "TA2:nucleus_pulposus_t4_t5",
    "namePtBr": "Nucleus pulposus T4-T5",
    "nameEn": "Nucleus pulposus T4-T5",
    "nameLatin": "Nucleus pulposus T4-T5",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_t5_t6",
    "node": "Nucleus pulposus T5-T6",
    "fmaId": "TA2:nucleus_pulposus_t5_t6",
    "namePtBr": "Nucleus pulposus T5-T6",
    "nameEn": "Nucleus pulposus T5-T6",
    "nameLatin": "Nucleus pulposus T5-T6",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_t6_t7",
    "node": "Nucleus pulposus T6-T7",
    "fmaId": "TA2:nucleus_pulposus_t6_t7",
    "namePtBr": "Nucleus pulposus T6-T7",
    "nameEn": "Nucleus pulposus T6-T7",
    "nameLatin": "Nucleus pulposus T6-T7",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_t7_t8",
    "node": "Nucleus pulposus T7-T8",
    "fmaId": "TA2:nucleus_pulposus_t7_t8",
    "namePtBr": "Nucleus pulposus T7-T8",
    "nameEn": "Nucleus pulposus T7-T8",
    "nameLatin": "Nucleus pulposus T7-T8",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_t8_t9",
    "node": "Nucleus pulposus T8-T9",
    "fmaId": "TA2:nucleus_pulposus_t8_t9",
    "namePtBr": "Nucleus pulposus T8-T9",
    "nameEn": "Nucleus pulposus T8-T9",
    "nameLatin": "Nucleus pulposus T8-T9",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nucleus_pulposus_t9_t10",
    "node": "Nucleus pulposus T9-T10",
    "fmaId": "TA2:nucleus_pulposus_t9_t10",
    "namePtBr": "Nucleus pulposus T9-T10",
    "nameEn": "Nucleus pulposus T9-T10",
    "nameLatin": "Nucleus pulposus T9-T10",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:red_nucleus_l",
    "node": "Red nucleus.l",
    "fmaId": "TA2:red_nucleus_l",
    "namePtBr": "Red nucleus Esquerdo",
    "nameEn": "Red nucleus (left)",
    "nameLatin": "Nucleus ruber",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:red_nucleus_r",
    "node": "Red nucleus.r",
    "fmaId": "TA2:red_nucleus_r",
    "namePtBr": "Red nucleus Direito",
    "nameEn": "Red nucleus (right)",
    "nameLatin": "Nucleus ruber",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Mesencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_salivatory_nucleus_l",
    "node": "Inferior salivatory nucleus.l",
    "fmaId": "TA2:inferior_salivatory_nucleus_l",
    "namePtBr": "Inferior salivatory nucleus Esquerdo",
    "nameEn": "Inferior salivatory nucleus (left)",
    "nameLatin": "Nucleus salivatorius inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_salivatory_nucleus_r",
    "node": "Inferior salivatory nucleus.r",
    "fmaId": "TA2:inferior_salivatory_nucleus_r",
    "namePtBr": "Inferior salivatory nucleus Direito",
    "nameEn": "Inferior salivatory nucleus (right)",
    "nameLatin": "Nucleus salivatorius inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_salivatory_nucleus_l",
    "node": "Superior salivatory nucleus.l",
    "fmaId": "TA2:superior_salivatory_nucleus_l",
    "namePtBr": "Superior salivatory nucleus Esquerdo",
    "nameEn": "Superior salivatory nucleus (left)",
    "nameLatin": "Nucleus salivatorius superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Pons"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_salivatory_nucleus_r",
    "node": "Superior salivatory nucleus.r",
    "fmaId": "TA2:superior_salivatory_nucleus_r",
    "namePtBr": "Superior salivatory nucleus Direito",
    "nameEn": "Superior salivatory nucleus (right)",
    "nameLatin": "Nucleus salivatorius superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Pons"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_of_solitary_tract_l",
    "node": "Nucleus of solitary tract.l",
    "fmaId": "TA2:nucleus_of_solitary_tract_l",
    "namePtBr": "Nucleus of solitary tract Esquerdo",
    "nameEn": "Nucleus of solitary tract (left)",
    "nameLatin": "Nucleus tractus solitarii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:nucleus_of_solitary_tract_r",
    "node": "Nucleus of solitary tract.r",
    "fmaId": "TA2:nucleus_of_solitary_tract_r",
    "namePtBr": "Nucleus of solitary tract Direito",
    "nameEn": "Nucleus of solitary tract (right)",
    "nameLatin": "Nucleus tractus solitarii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:eighth_rib_l",
    "node": "Eighth rib.l",
    "fmaId": "TA2:eighth_rib_l",
    "namePtBr": "8ª Costela Esquerda",
    "nameEn": "Eighth rib (left)",
    "nameLatin": "Octava costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs",
      "False ribs"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:eighth_rib_r",
    "node": "Eighth rib.r",
    "fmaId": "TA2:eighth_rib_r",
    "namePtBr": "8ª Costela Direita",
    "nameEn": "Eighth rib (right)",
    "nameLatin": "Octava costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs",
      "False ribs"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:oesophagus",
    "node": "Oesophagus",
    "fmaId": "TA2:oesophagus",
    "namePtBr": "Oesophagus",
    "nameEn": "Oesophagus",
    "nameLatin": "Oesophagus",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive canal"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:olive_l",
    "node": "Olive.l",
    "fmaId": "TA2:olive_l",
    "namePtBr": "Olive Esquerdo",
    "nameEn": "Olive (left)",
    "nameLatin": "Oliva",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:olive_r",
    "node": "Olive.r",
    "fmaId": "TA2:olive_r",
    "namePtBr": "Olive Direito",
    "nameEn": "Olive (right)",
    "nameLatin": "Oliva",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:capitate_bone_l",
    "node": "Capitate bone.l",
    "fmaId": "TA2:capitate_bone_l",
    "namePtBr": "Capitate Osso Esquerdo",
    "nameEn": "Capitate bone (left)",
    "nameLatin": "Os capitatum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:capitate_bone_r",
    "node": "Capitate bone.r",
    "fmaId": "TA2:capitate_bone_r",
    "namePtBr": "Capitate Osso Direito",
    "nameEn": "Capitate bone (right)",
    "nameLatin": "Os capitatum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:coccyx",
    "node": "Coccyx",
    "fmaId": "TA2:coccyx",
    "namePtBr": "Cóccix",
    "nameEn": "Coccyx",
    "nameLatin": "Os coccygis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.6,
      "z": -0.4
    }
  },
  {
    "id": "za:hip_bone_l",
    "node": "Hip bone.l",
    "fmaId": "TA2:hip_bone_l",
    "namePtBr": "Osso do Quadril Esquerdo (Ílio/Ísquio/Púbis)",
    "nameEn": "Hip bone (left)",
    "nameLatin": "Os coxae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": -0.2,
      "z": -0.1
    }
  },
  {
    "id": "za:hip_bone_r",
    "node": "Hip bone.r",
    "fmaId": "TA2:hip_bone_r",
    "namePtBr": "Osso do Quadril Direito (Ílio/Ísquio/Púbis)",
    "nameEn": "Hip bone (right)",
    "nameLatin": "Os coxae",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": -0.2,
      "z": -0.1
    }
  },
  {
    "id": "za:cuboid_bone_l",
    "node": "Cuboid bone.l",
    "fmaId": "TA2:cuboid_bone_l",
    "namePtBr": "Cuboid Osso Esquerdo",
    "nameEn": "Cuboid bone (left)",
    "nameLatin": "Os cuboideum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:cuboid_bone_r",
    "node": "Cuboid bone.r",
    "fmaId": "TA2:cuboid_bone_r",
    "namePtBr": "Cuboid Osso Direito",
    "nameEn": "Cuboid bone (right)",
    "nameLatin": "Os cuboideum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:intermediate_cuneiform_bone_l",
    "node": "Intermediate cuneiform bone.l",
    "fmaId": "TA2:intermediate_cuneiform_bone_l",
    "namePtBr": "Intermediate cuneiform Osso Esquerdo",
    "nameEn": "Intermediate cuneiform bone (left)",
    "nameLatin": "Os cuneiforme intermedium",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:intermediate_cuneiform_bone_r",
    "node": "Intermediate cuneiform bone.r",
    "fmaId": "TA2:intermediate_cuneiform_bone_r",
    "namePtBr": "Intermediate cuneiform Osso Direito",
    "nameEn": "Intermediate cuneiform bone (right)",
    "nameLatin": "Os cuneiforme intermedium",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:lateral_cuneiform_bone_l",
    "node": "Lateral cuneiform bone.l",
    "fmaId": "TA2:lateral_cuneiform_bone_l",
    "namePtBr": "Lateral cuneiform Osso Esquerdo",
    "nameEn": "Lateral cuneiform bone (left)",
    "nameLatin": "Os cuneiforme laterale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:lateral_cuneiform_bone_r",
    "node": "Lateral cuneiform bone.r",
    "fmaId": "TA2:lateral_cuneiform_bone_r",
    "namePtBr": "Lateral cuneiform Osso Direito",
    "nameEn": "Lateral cuneiform bone (right)",
    "nameLatin": "Os cuneiforme laterale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:medial_cuneiform_bone_l",
    "node": "Medial cuneiform bone.l",
    "fmaId": "TA2:medial_cuneiform_bone_l",
    "namePtBr": "Medial cuneiform Osso Esquerdo",
    "nameEn": "Medial cuneiform bone (left)",
    "nameLatin": "Os cuneiforme mediale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:medial_cuneiform_bone_r",
    "node": "Medial cuneiform bone.r",
    "fmaId": "TA2:medial_cuneiform_bone_r",
    "namePtBr": "Medial cuneiform Osso Direito",
    "nameEn": "Medial cuneiform bone (right)",
    "nameLatin": "Os cuneiforme mediale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:ethmoid_bone",
    "node": "Ethmoid bone",
    "fmaId": "TA2:ethmoid_bone",
    "namePtBr": "Osso Etmoide",
    "nameEn": "Ethmoid bone",
    "nameLatin": "Os ethmoideum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.5,
      "z": 0.5
    }
  },
  {
    "id": "za:femur_l",
    "node": "Femur.l",
    "fmaId": "TA2:femur_l",
    "namePtBr": "Fêmur Esquerdo",
    "nameEn": "Femur (left)",
    "nameLatin": "Os femoris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": -0.4,
      "z": 0.1
    }
  },
  {
    "id": "za:femur_r",
    "node": "Femur.r",
    "fmaId": "TA2:femur_r",
    "namePtBr": "Fêmur Direito",
    "nameEn": "Femur (right)",
    "nameLatin": "Os femoris",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": -0.4,
      "z": 0.1
    }
  },
  {
    "id": "za:frontal_bone",
    "node": "Frontal bone",
    "fmaId": "TA2:frontal_bone",
    "namePtBr": "Osso Frontal",
    "nameEn": "Frontal bone",
    "nameLatin": "Os frontale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.7,
      "z": 1.2
    }
  },
  {
    "id": "za:hamate_bone_l",
    "node": "Hamate bone.l",
    "fmaId": "TA2:hamate_bone_l",
    "namePtBr": "Hamate Osso Esquerdo",
    "nameEn": "Hamate bone (left)",
    "nameLatin": "Os hamatum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:hamate_bone_r",
    "node": "Hamate bone.r",
    "fmaId": "TA2:hamate_bone_r",
    "namePtBr": "Hamate Osso Direito",
    "nameEn": "Hamate bone (right)",
    "nameLatin": "Os hamatum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:hyoid_bone",
    "node": "Hyoid bone",
    "fmaId": "TA2:hyoid_bone",
    "namePtBr": "Osso Hioide",
    "nameEn": "Hyoid bone",
    "nameLatin": "Os hyoideum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:lacrimal_bone_l",
    "node": "Lacrimal bone.l",
    "fmaId": "TA2:lacrimal_bone_l",
    "namePtBr": "Osso Lacrimal Esquerdo",
    "nameEn": "Lacrimal bone (left)",
    "nameLatin": "Os lacrimale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:lacrimal_bone_r",
    "node": "Lacrimal bone.r",
    "fmaId": "TA2:lacrimal_bone_r",
    "namePtBr": "Osso Lacrimal Direito",
    "nameEn": "Lacrimal bone (right)",
    "nameLatin": "Os lacrimale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:lunate_bone_l",
    "node": "Lunate bone.l",
    "fmaId": "TA2:lunate_bone_l",
    "namePtBr": "Lunate Osso Esquerdo",
    "nameEn": "Lunate bone (left)",
    "nameLatin": "Os lunatum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:lunate_bone_r",
    "node": "Lunate bone.r",
    "fmaId": "TA2:lunate_bone_r",
    "namePtBr": "Lunate Osso Direito",
    "nameEn": "Lunate bone (right)",
    "nameLatin": "Os lunatum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:nasal_bone_l",
    "node": "Nasal bone.l",
    "fmaId": "TA2:nasal_bone_l",
    "namePtBr": "Osso Nasal Esquerdo",
    "nameEn": "Nasal bone (left)",
    "nameLatin": "Os nasale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -0.2,
      "y": 0.3,
      "z": 1.1
    }
  },
  {
    "id": "za:nasal_bone_r",
    "node": "Nasal bone.r",
    "fmaId": "TA2:nasal_bone_r",
    "namePtBr": "Osso Nasal Direito",
    "nameEn": "Nasal bone (right)",
    "nameLatin": "Os nasale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": 0.3,
      "z": 1.1
    }
  },
  {
    "id": "za:navicular_bone_l",
    "node": "Navicular bone.l",
    "fmaId": "TA2:navicular_bone_l",
    "namePtBr": "Navicular Osso Esquerdo",
    "nameEn": "Navicular bone (left)",
    "nameLatin": "Os naviculare",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:navicular_bone_r",
    "node": "Navicular bone.r",
    "fmaId": "TA2:navicular_bone_r",
    "namePtBr": "Navicular Osso Direito",
    "nameEn": "Navicular bone (right)",
    "nameLatin": "Os naviculare",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:occipital_bone",
    "node": "Occipital bone",
    "fmaId": "TA2:occipital_bone",
    "namePtBr": "Osso Occipital",
    "nameEn": "Occipital bone",
    "nameLatin": "Os occipitale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.3,
      "z": -1.2
    }
  },
  {
    "id": "za:palatine_bone_l",
    "node": "Palatine bone.l",
    "fmaId": "TA2:palatine_bone_l",
    "namePtBr": "Osso Palatino Esquerdo",
    "nameEn": "Palatine bone (left)",
    "nameLatin": "Os palatinum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:palatine_bone_r",
    "node": "Palatine bone.r",
    "fmaId": "TA2:palatine_bone_r",
    "namePtBr": "Osso Palatino Direito",
    "nameEn": "Palatine bone (right)",
    "nameLatin": "Os palatinum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:parietal_bone_l",
    "node": "Parietal bone.l",
    "fmaId": "TA2:parietal_bone_l",
    "namePtBr": "Osso Parietal Esquerdo",
    "nameEn": "Parietal bone (left)",
    "nameLatin": "Os parietale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": 0.8,
      "z": 0.1
    }
  },
  {
    "id": "za:parietal_bone_r",
    "node": "Parietal bone.r",
    "fmaId": "TA2:parietal_bone_r",
    "namePtBr": "Osso Parietal Direito",
    "nameEn": "Parietal bone (right)",
    "nameLatin": "Os parietale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": 0.8,
      "z": 0.1
    }
  },
  {
    "id": "za:pisiform_bone_l",
    "node": "Pisiform bone.l",
    "fmaId": "TA2:pisiform_bone_l",
    "namePtBr": "Pisiform Osso Esquerdo",
    "nameEn": "Pisiform bone (left)",
    "nameLatin": "Os pisiforme",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:pisiform_bone_r",
    "node": "Pisiform bone.r",
    "fmaId": "TA2:pisiform_bone_r",
    "namePtBr": "Pisiform Osso Direito",
    "nameEn": "Pisiform bone (right)",
    "nameLatin": "Os pisiforme",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:first_metacarpal_bone_l",
    "node": "First metacarpal bone.l",
    "fmaId": "TA2:first_metacarpal_bone_l",
    "namePtBr": "1º Metacarpal Osso Esquerdo",
    "nameEn": "First metacarpal bone (left)",
    "nameLatin": "Os primum metarcapi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:first_metacarpal_bone_r",
    "node": "First metacarpal bone.r",
    "fmaId": "TA2:first_metacarpal_bone_r",
    "namePtBr": "1º Metacarpal Osso Direito",
    "nameEn": "First metacarpal bone (right)",
    "nameLatin": "Os primum metarcapi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:first_metatarsal_bone_l",
    "node": "First metatarsal bone.l",
    "fmaId": "TA2:first_metatarsal_bone_l",
    "namePtBr": "1º Metatarsal Osso Esquerdo",
    "nameEn": "First metatarsal bone (left)",
    "nameLatin": "Os primum metatarsi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:first_metatarsal_bone_r",
    "node": "First metatarsal bone.r",
    "fmaId": "TA2:first_metatarsal_bone_r",
    "namePtBr": "1º Metatarsal Osso Direito",
    "nameEn": "First metatarsal bone (right)",
    "nameLatin": "Os primum metatarsi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:fourth_metacarpal_bone_l",
    "node": "Fourth metacarpal bone.l",
    "fmaId": "TA2:fourth_metacarpal_bone_l",
    "namePtBr": "4º Metacarpal Osso Esquerdo",
    "nameEn": "Fourth metacarpal bone (left)",
    "nameLatin": "Os quartum metacarpi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:fourth_metacarpal_bone_r",
    "node": "Fourth metacarpal bone.r",
    "fmaId": "TA2:fourth_metacarpal_bone_r",
    "namePtBr": "4º Metacarpal Osso Direito",
    "nameEn": "Fourth metacarpal bone (right)",
    "nameLatin": "Os quartum metacarpi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:fourth_metatarsal_bone_l",
    "node": "Fourth metatarsal bone.l",
    "fmaId": "TA2:fourth_metatarsal_bone_l",
    "namePtBr": "4º Metatarsal Osso Esquerdo",
    "nameEn": "Fourth metatarsal bone (left)",
    "nameLatin": "Os quatum metatarsi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:fourth_metatarsal_bone_r",
    "node": "Fourth metatarsal bone.r",
    "fmaId": "TA2:fourth_metatarsal_bone_r",
    "namePtBr": "4º Metatarsal Osso Direito",
    "nameEn": "Fourth metatarsal bone (right)",
    "nameLatin": "Os quatum metatarsi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:fifth_metacarpal_bone_l",
    "node": "Fifth metacarpal bone.l",
    "fmaId": "TA2:fifth_metacarpal_bone_l",
    "namePtBr": "5º Metacarpal Osso Esquerdo",
    "nameEn": "Fifth metacarpal bone (left)",
    "nameLatin": "Os quintum metacarpi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:fifth_metacarpal_bone_r",
    "node": "Fifth metacarpal bone.r",
    "fmaId": "TA2:fifth_metacarpal_bone_r",
    "namePtBr": "5º Metacarpal Osso Direito",
    "nameEn": "Fifth metacarpal bone (right)",
    "nameLatin": "Os quintum metacarpi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:fifth_metatarsal_bone_l",
    "node": "Fifth metatarsal bone.l",
    "fmaId": "TA2:fifth_metatarsal_bone_l",
    "namePtBr": "5º Metatarsal Osso Esquerdo",
    "nameEn": "Fifth metatarsal bone (left)",
    "nameLatin": "Os quintum metatarsi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:fifth_metatarsal_bone_r",
    "node": "Fifth metatarsal bone.r",
    "fmaId": "TA2:fifth_metatarsal_bone_r",
    "namePtBr": "5º Metatarsal Osso Direito",
    "nameEn": "Fifth metatarsal bone (right)",
    "nameLatin": "Os quintum metatarsi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:sacrum",
    "node": "Sacrum",
    "fmaId": "TA2:sacrum",
    "namePtBr": "Osso Sacro",
    "nameEn": "Sacrum",
    "nameLatin": "Os sacrum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.6,
      "z": -0.4
    }
  },
  {
    "id": "za:scaphoid_bone_l",
    "node": "Scaphoid bone.l",
    "fmaId": "TA2:scaphoid_bone_l",
    "namePtBr": "Scaphoid Osso Esquerdo",
    "nameEn": "Scaphoid bone (left)",
    "nameLatin": "Os scaphoideum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:scaphoid_bone_r",
    "node": "Scaphoid bone.r",
    "fmaId": "TA2:scaphoid_bone_r",
    "namePtBr": "Scaphoid Osso Direito",
    "nameEn": "Scaphoid bone (right)",
    "nameLatin": "Os scaphoideum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:second_metacarpal_bone_l",
    "node": "Second metacarpal bone.l",
    "fmaId": "TA2:second_metacarpal_bone_l",
    "namePtBr": "2º Metacarpal Osso Esquerdo",
    "nameEn": "Second metacarpal bone (left)",
    "nameLatin": "Os secundum metacarpi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:second_metacarpal_bone_r",
    "node": "Second metacarpal bone.r",
    "fmaId": "TA2:second_metacarpal_bone_r",
    "namePtBr": "2º Metacarpal Osso Direito",
    "nameEn": "Second metacarpal bone (right)",
    "nameLatin": "Os secundum metacarpi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:second_metatarsal_bone_l",
    "node": "Second metatarsal bone.l",
    "fmaId": "TA2:second_metatarsal_bone_l",
    "namePtBr": "2º Metatarsal Osso Esquerdo",
    "nameEn": "Second metatarsal bone (left)",
    "nameLatin": "Os secundum metatarsi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:second_metatarsal_bone_r",
    "node": "Second metatarsal bone.r",
    "fmaId": "TA2:second_metatarsal_bone_r",
    "namePtBr": "2º Metatarsal Osso Direito",
    "nameEn": "Second metatarsal bone (right)",
    "nameLatin": "Os secundum metatarsi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:sphenoid_bone",
    "node": "Sphenoid bone",
    "fmaId": "TA2:sphenoid_bone",
    "namePtBr": "Osso Esfenoide",
    "nameEn": "Sphenoid bone",
    "nameLatin": "Os sphenoideum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.4,
      "z": 0.2
    }
  },
  {
    "id": "za:talus_l",
    "node": "Talus.l",
    "fmaId": "TA2:talus_l",
    "namePtBr": "Tálus Esquerdo",
    "nameEn": "Talus (left)",
    "nameLatin": "Os tali",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:talus_r",
    "node": "Talus.r",
    "fmaId": "TA2:talus_r",
    "namePtBr": "Tálus Direito",
    "nameEn": "Talus (right)",
    "nameLatin": "Os tali",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:temporal_bone_l",
    "node": "Temporal bone.l",
    "fmaId": "TA2:temporal_bone_l",
    "namePtBr": "Osso Temporal Esquerdo",
    "nameEn": "Temporal bone (left)",
    "nameLatin": "Os temporale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": 0.1,
      "z": -0.2
    }
  },
  {
    "id": "za:temporal_bone_r",
    "node": "Temporal bone.r",
    "fmaId": "TA2:temporal_bone_r",
    "namePtBr": "Osso Temporal Direito",
    "nameEn": "Temporal bone (right)",
    "nameLatin": "Os temporale",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": 0.1,
      "z": -0.2
    }
  },
  {
    "id": "za:third_metacarpal_bone_l",
    "node": "Third metacarpal bone.l",
    "fmaId": "TA2:third_metacarpal_bone_l",
    "namePtBr": "3º Metacarpal Osso Esquerdo",
    "nameEn": "Third metacarpal bone (left)",
    "nameLatin": "Os tertium metacarpi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:third_metacarpal_bone_r",
    "node": "Third metacarpal bone.r",
    "fmaId": "TA2:third_metacarpal_bone_r",
    "namePtBr": "3º Metacarpal Osso Direito",
    "nameEn": "Third metacarpal bone (right)",
    "nameLatin": "Os tertium metacarpi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:third_metatarsal_bone_l",
    "node": "Third metatarsal bone.l",
    "fmaId": "TA2:third_metatarsal_bone_l",
    "namePtBr": "3º Metatarsal Osso Esquerdo",
    "nameEn": "Third metatarsal bone (left)",
    "nameLatin": "Os tertium metatarsi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:third_metatarsal_bone_r",
    "node": "Third metatarsal bone.r",
    "fmaId": "TA2:third_metatarsal_bone_r",
    "namePtBr": "3º Metatarsal Osso Direito",
    "nameEn": "Third metatarsal bone (right)",
    "nameLatin": "Os tertium metatarsi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:trapezium_bone_l",
    "node": "Trapezium bone.l",
    "fmaId": "TA2:trapezium_bone_l",
    "namePtBr": "Trapezium Osso Esquerdo",
    "nameEn": "Trapezium bone (left)",
    "nameLatin": "Os trapezium",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:trapezium_bone_r",
    "node": "Trapezium bone.r",
    "fmaId": "TA2:trapezium_bone_r",
    "namePtBr": "Trapezium Osso Direito",
    "nameEn": "Trapezium bone (right)",
    "nameLatin": "Os trapezium",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:trapezoid_bone_l",
    "node": "Trapezoid bone.l",
    "fmaId": "TA2:trapezoid_bone_l",
    "namePtBr": "Trapezoid Osso Esquerdo",
    "nameEn": "Trapezoid bone (left)",
    "nameLatin": "Os trapezoideum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:trapezoid_bone_r",
    "node": "Trapezoid bone.r",
    "fmaId": "TA2:trapezoid_bone_r",
    "namePtBr": "Trapezoid Osso Direito",
    "nameEn": "Trapezoid bone (right)",
    "nameLatin": "Os trapezoideum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:triquetrum_bone_l",
    "node": "Triquetrum bone.l",
    "fmaId": "TA2:triquetrum_bone_l",
    "namePtBr": "Triquetrum Osso Esquerdo",
    "nameEn": "Triquetrum bone (left)",
    "nameLatin": "Os triquetrum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:triquetrum_bone_r",
    "node": "Triquetrum bone.r",
    "fmaId": "TA2:triquetrum_bone_r",
    "namePtBr": "Triquetrum Osso Direito",
    "nameEn": "Triquetrum bone (right)",
    "nameLatin": "Os triquetrum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:zygomatic_bone_l",
    "node": "Zygomatic bone.l",
    "fmaId": "TA2:zygomatic_bone_l",
    "namePtBr": "Osso Zigomático Esquerdo",
    "nameEn": "Zygomatic bone (left)",
    "nameLatin": "Os zygomaticum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0.0,
      "z": 0.7
    }
  },
  {
    "id": "za:zygomatic_bone_r",
    "node": "Zygomatic bone.r",
    "fmaId": "TA2:zygomatic_bone_r",
    "namePtBr": "Osso Zigomático Direito",
    "nameEn": "Zygomatic bone (right)",
    "nameLatin": "Os zygomaticum",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0.0,
      "z": 0.7
    }
  },
  {
    "id": "za:sesamoid_bones_of_foot_l",
    "node": "Sesamoid bones of foot.l",
    "fmaId": "TA2:sesamoid_bones_of_foot_l",
    "namePtBr": "Sesamoid Ossos of foot Esquerdo",
    "nameEn": "Sesamoid bones of foot (left)",
    "nameLatin": "Ossa sesamoidea pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:sesamoid_bones_of_foot_r",
    "node": "Sesamoid bones of foot.r",
    "fmaId": "TA2:sesamoid_bones_of_foot_r",
    "namePtBr": "Sesamoid Ossos of foot Direito",
    "nameEn": "Sesamoid bones of foot (right)",
    "nameLatin": "Ossa sesamoidea pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:pancreas",
    "node": "Pancreas",
    "fmaId": "TA2:pancreas",
    "namePtBr": "Pancreas",
    "nameEn": "Pancreas",
    "nameLatin": "Pancreas",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive system"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:opercular_part_of_inferior_frontal_gyrus_l",
    "node": "Opercular part of inferior frontal gyrus.l",
    "fmaId": "TA2:opercular_part_of_inferior_frontal_gyrus_l",
    "namePtBr": "Opercular part of inferior frontal gyrus Esquerdo",
    "nameEn": "Opercular part of inferior frontal gyrus (left)",
    "nameLatin": "Pars opercularis gyri frontalis inferioris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe",
      "Inferior frontal gyrus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:opercular_part_of_inferior_frontal_gyrus_r",
    "node": "Opercular part of inferior frontal gyrus.r",
    "fmaId": "TA2:opercular_part_of_inferior_frontal_gyrus_r",
    "namePtBr": "Opercular part of inferior frontal gyrus Direito",
    "nameEn": "Opercular part of inferior frontal gyrus (right)",
    "nameLatin": "Pars opercularis gyri frontalis inferioris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe",
      "Inferior frontal gyrus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:triangular_part_of_inferior_frontal_gyrus_l",
    "node": "Triangular part of inferior frontal gyrus.l",
    "fmaId": "TA2:triangular_part_of_inferior_frontal_gyrus_l",
    "namePtBr": "Triangular part of inferior frontal gyrus Esquerdo",
    "nameEn": "Triangular part of inferior frontal gyrus (left)",
    "nameLatin": "Pars triangularis gyri frontalis inferioris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe",
      "Inferior frontal gyrus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:triangular_part_of_inferior_frontal_gyrus_r",
    "node": "Triangular part of inferior frontal gyrus.r",
    "fmaId": "TA2:triangular_part_of_inferior_frontal_gyrus_r",
    "namePtBr": "Triangular part of inferior frontal gyrus Direito",
    "nameEn": "Triangular part of inferior frontal gyrus (right)",
    "nameLatin": "Pars triangularis gyri frontalis inferioris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe",
      "Inferior frontal gyrus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:patella_l",
    "node": "Patella.l",
    "fmaId": "TA2:patella_l",
    "namePtBr": "Patela Esquerda",
    "nameEn": "Patella (left)",
    "nameLatin": "Patella",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.7,
      "y": -0.5,
      "z": 0.7
    }
  },
  {
    "id": "za:patella_r",
    "node": "Patella.r",
    "fmaId": "TA2:patella_r",
    "namePtBr": "Patela Direita",
    "nameEn": "Patella (right)",
    "nameLatin": "Patella",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.7,
      "y": -0.5,
      "z": 0.7
    }
  },
  {
    "id": "za:superior_cerebellar_peduncle_l",
    "node": "Superior cerebellar peduncle.l",
    "fmaId": "TA2:superior_cerebellar_peduncle_l",
    "namePtBr": "Superior cerebellar peduncle Esquerdo",
    "nameEn": "Superior cerebellar peduncle (left)",
    "nameLatin": "Pedunculus cerebellaris superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_cerebellar_peduncle_r",
    "node": "Superior cerebellar peduncle.r",
    "fmaId": "TA2:superior_cerebellar_peduncle_r",
    "namePtBr": "Superior cerebellar peduncle Direito",
    "nameEn": "Superior cerebellar peduncle (right)",
    "nameLatin": "Pedunculus cerebellaris superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:peduncle_of_flocculus_l",
    "node": "Peduncle of flocculus.l",
    "fmaId": "TA2:peduncle_of_flocculus_l",
    "namePtBr": "Peduncle of flocculus Esquerdo",
    "nameEn": "Peduncle of flocculus (left)",
    "nameLatin": "Pedunculus flocculi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:peduncle_of_flocculus_r",
    "node": "Peduncle of flocculus.r",
    "fmaId": "TA2:peduncle_of_flocculus_r",
    "namePtBr": "Peduncle of flocculus Direito",
    "nameEn": "Peduncle of flocculus (right)",
    "nameLatin": "Pedunculus flocculi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:renal_pelvis_l",
    "node": "Renal pelvis.l",
    "fmaId": "TA2:renal_pelvis_l",
    "namePtBr": "Renal pelvis Esquerdo",
    "nameEn": "Renal pelvis (left)",
    "nameLatin": "Pelvis renalis",
    "chapter": 9,
    "system": "renal",
    "meshFile": "renal_male.glb",
    "path": [
      "Urinary system"
    ],
    "explosionVector": {
      "x": -0.7,
      "y": -0.2,
      "z": -0.5
    }
  },
  {
    "id": "za:renal_pelvis_r",
    "node": "Renal pelvis.r",
    "fmaId": "TA2:renal_pelvis_r",
    "namePtBr": "Renal pelvis Direito",
    "nameEn": "Renal pelvis (right)",
    "nameLatin": "Pelvis renalis",
    "chapter": 9,
    "system": "renal",
    "meshFile": "renal_male.glb",
    "path": [
      "Urinary system"
    ],
    "explosionVector": {
      "x": 0.7,
      "y": -0.2,
      "z": -0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_first_finger_of_hand_l",
    "node": "Distal phalanx of first finger of hand.l",
    "fmaId": "TA2:distal_phalanx_of_first_finger_of_hand_l",
    "namePtBr": "Distal phalanx of first finger of hand Esquerdo",
    "nameEn": "Distal phalanx of first finger of hand (left)",
    "nameLatin": "Phalanx distalis primum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_first_finger_of_hand_r",
    "node": "Distal phalanx of first finger of hand.r",
    "fmaId": "TA2:distal_phalanx_of_first_finger_of_hand_r",
    "namePtBr": "Distal phalanx of first finger of hand Direito",
    "nameEn": "Distal phalanx of first finger of hand (right)",
    "nameLatin": "Phalanx distalis primum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_first_finger_of_foot_l",
    "node": "Distal phalanx of first finger of foot.l",
    "fmaId": "TA2:distal_phalanx_of_first_finger_of_foot_l",
    "namePtBr": "Distal phalanx of first finger of foot Esquerdo",
    "nameEn": "Distal phalanx of first finger of foot (left)",
    "nameLatin": "Phalanx distalis primum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_first_finger_of_foot_r",
    "node": "Distal phalanx of first finger of foot.r",
    "fmaId": "TA2:distal_phalanx_of_first_finger_of_foot_r",
    "namePtBr": "Distal phalanx of first finger of foot Direito",
    "nameEn": "Distal phalanx of first finger of foot (right)",
    "nameLatin": "Phalanx distalis primum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_fourth_finger_of_hand_l",
    "node": "Distal phalanx of fourth finger of hand.l",
    "fmaId": "TA2:distal_phalanx_of_fourth_finger_of_hand_l",
    "namePtBr": "Distal phalanx of fourth finger of hand Esquerdo",
    "nameEn": "Distal phalanx of fourth finger of hand (left)",
    "nameLatin": "Phalanx distalis quartum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_fourth_finger_of_hand_r",
    "node": "Distal phalanx of fourth finger of hand.r",
    "fmaId": "TA2:distal_phalanx_of_fourth_finger_of_hand_r",
    "namePtBr": "Distal phalanx of fourth finger of hand Direito",
    "nameEn": "Distal phalanx of fourth finger of hand (right)",
    "nameLatin": "Phalanx distalis quartum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_fourth_finger_of_foot_l",
    "node": "Distal phalanx of fourth finger of foot.l",
    "fmaId": "TA2:distal_phalanx_of_fourth_finger_of_foot_l",
    "namePtBr": "Distal phalanx of fourth finger of foot Esquerdo",
    "nameEn": "Distal phalanx of fourth finger of foot (left)",
    "nameLatin": "Phalanx distalis quartum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_fourth_finger_of_foot_r",
    "node": "Distal phalanx of fourth finger of foot.r",
    "fmaId": "TA2:distal_phalanx_of_fourth_finger_of_foot_r",
    "namePtBr": "Distal phalanx of fourth finger of foot Direito",
    "nameEn": "Distal phalanx of fourth finger of foot (right)",
    "nameLatin": "Phalanx distalis quartum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_fifth_finger_of_hand_l",
    "node": "Distal phalanx of fifth finger of hand.l",
    "fmaId": "TA2:distal_phalanx_of_fifth_finger_of_hand_l",
    "namePtBr": "Distal phalanx of fifth finger of hand Esquerdo",
    "nameEn": "Distal phalanx of fifth finger of hand (left)",
    "nameLatin": "Phalanx distalis quintum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_fifth_finger_of_hand_r",
    "node": "Distal phalanx of fifth finger of hand.r",
    "fmaId": "TA2:distal_phalanx_of_fifth_finger_of_hand_r",
    "namePtBr": "Distal phalanx of fifth finger of hand Direito",
    "nameEn": "Distal phalanx of fifth finger of hand (right)",
    "nameLatin": "Phalanx distalis quintum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_fifth_finger_of_foot_l",
    "node": "Distal phalanx of fifth finger of foot.l",
    "fmaId": "TA2:distal_phalanx_of_fifth_finger_of_foot_l",
    "namePtBr": "Distal phalanx of fifth finger of foot Esquerdo",
    "nameEn": "Distal phalanx of fifth finger of foot (left)",
    "nameLatin": "Phalanx distalis quintum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_fifth_finger_of_foot_r",
    "node": "Distal phalanx of fifth finger of foot.r",
    "fmaId": "TA2:distal_phalanx_of_fifth_finger_of_foot_r",
    "namePtBr": "Distal phalanx of fifth finger of foot Direito",
    "nameEn": "Distal phalanx of fifth finger of foot (right)",
    "nameLatin": "Phalanx distalis quintum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_second_finger_of_hand_l",
    "node": "Distal phalanx of second finger of hand.l",
    "fmaId": "TA2:distal_phalanx_of_second_finger_of_hand_l",
    "namePtBr": "Distal phalanx of second finger of hand Esquerdo",
    "nameEn": "Distal phalanx of second finger of hand (left)",
    "nameLatin": "Phalanx distalis secundum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_second_finger_of_hand_r",
    "node": "Distal phalanx of second finger of hand.r",
    "fmaId": "TA2:distal_phalanx_of_second_finger_of_hand_r",
    "namePtBr": "Distal phalanx of second finger of hand Direito",
    "nameEn": "Distal phalanx of second finger of hand (right)",
    "nameLatin": "Phalanx distalis secundum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_second_finger_of_foot_l",
    "node": "Distal phalanx of second finger of foot.l",
    "fmaId": "TA2:distal_phalanx_of_second_finger_of_foot_l",
    "namePtBr": "Distal phalanx of second finger of foot Esquerdo",
    "nameEn": "Distal phalanx of second finger of foot (left)",
    "nameLatin": "Phalanx distalis secundum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_second_finger_of_foot_r",
    "node": "Distal phalanx of second finger of foot.r",
    "fmaId": "TA2:distal_phalanx_of_second_finger_of_foot_r",
    "namePtBr": "Distal phalanx of second finger of foot Direito",
    "nameEn": "Distal phalanx of second finger of foot (right)",
    "nameLatin": "Phalanx distalis secundum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_third_finger_of_hand_l",
    "node": "Distal phalanx of third finger of hand.l",
    "fmaId": "TA2:distal_phalanx_of_third_finger_of_hand_l",
    "namePtBr": "Distal phalanx of third finger of hand Esquerdo",
    "nameEn": "Distal phalanx of third finger of hand (left)",
    "nameLatin": "Phalanx distalis tertium digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_third_finger_of_hand_r",
    "node": "Distal phalanx of third finger of hand.r",
    "fmaId": "TA2:distal_phalanx_of_third_finger_of_hand_r",
    "namePtBr": "Distal phalanx of third finger of hand Direito",
    "nameEn": "Distal phalanx of third finger of hand (right)",
    "nameLatin": "Phalanx distalis tertium digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_third_finger_of_foot_l",
    "node": "Distal phalanx of third finger of foot.l",
    "fmaId": "TA2:distal_phalanx_of_third_finger_of_foot_l",
    "namePtBr": "Distal phalanx of third finger of foot Esquerdo",
    "nameEn": "Distal phalanx of third finger of foot (left)",
    "nameLatin": "Phalanx distalis tertium digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:distal_phalanx_of_third_finger_of_foot_r",
    "node": "Distal phalanx of third finger of foot.r",
    "fmaId": "TA2:distal_phalanx_of_third_finger_of_foot_r",
    "namePtBr": "Distal phalanx of third finger of foot Direito",
    "nameEn": "Distal phalanx of third finger of foot (right)",
    "nameLatin": "Phalanx distalis tertium digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_fourth_finger_of_hand_l",
    "node": "Middle phalanx of fourth finger of hand.l",
    "fmaId": "TA2:middle_phalanx_of_fourth_finger_of_hand_l",
    "namePtBr": "Middle phalanx of fourth finger of hand Esquerdo",
    "nameEn": "Middle phalanx of fourth finger of hand (left)",
    "nameLatin": "Phalanx media quartum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_fourth_finger_of_hand_r",
    "node": "Middle phalanx of fourth finger of hand.r",
    "fmaId": "TA2:middle_phalanx_of_fourth_finger_of_hand_r",
    "namePtBr": "Middle phalanx of fourth finger of hand Direito",
    "nameEn": "Middle phalanx of fourth finger of hand (right)",
    "nameLatin": "Phalanx media quartum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_fourth_finger_of_foot_l",
    "node": "Middle phalanx of fourth finger of foot.l",
    "fmaId": "TA2:middle_phalanx_of_fourth_finger_of_foot_l",
    "namePtBr": "Middle phalanx of fourth finger of foot Esquerdo",
    "nameEn": "Middle phalanx of fourth finger of foot (left)",
    "nameLatin": "Phalanx media quartum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_fourth_finger_of_foot_r",
    "node": "Middle phalanx of fourth finger of foot.r",
    "fmaId": "TA2:middle_phalanx_of_fourth_finger_of_foot_r",
    "namePtBr": "Middle phalanx of fourth finger of foot Direito",
    "nameEn": "Middle phalanx of fourth finger of foot (right)",
    "nameLatin": "Phalanx media quartum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_fifth_finger_of_hand_l",
    "node": "Middle phalanx of fifth finger of hand.l",
    "fmaId": "TA2:middle_phalanx_of_fifth_finger_of_hand_l",
    "namePtBr": "Middle phalanx of fifth finger of hand Esquerdo",
    "nameEn": "Middle phalanx of fifth finger of hand (left)",
    "nameLatin": "Phalanx media quintum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_fifth_finger_of_hand_r",
    "node": "Middle phalanx of fifth finger of hand.r",
    "fmaId": "TA2:middle_phalanx_of_fifth_finger_of_hand_r",
    "namePtBr": "Middle phalanx of fifth finger of hand Direito",
    "nameEn": "Middle phalanx of fifth finger of hand (right)",
    "nameLatin": "Phalanx media quintum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_fifth_finger_of_foot_l",
    "node": "Middle phalanx of fifth finger of foot.l",
    "fmaId": "TA2:middle_phalanx_of_fifth_finger_of_foot_l",
    "namePtBr": "Middle phalanx of fifth finger of foot Esquerdo",
    "nameEn": "Middle phalanx of fifth finger of foot (left)",
    "nameLatin": "Phalanx media quintum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_fifth_finger_of_foot_r",
    "node": "Middle phalanx of fifth finger of foot.r",
    "fmaId": "TA2:middle_phalanx_of_fifth_finger_of_foot_r",
    "namePtBr": "Middle phalanx of fifth finger of foot Direito",
    "nameEn": "Middle phalanx of fifth finger of foot (right)",
    "nameLatin": "Phalanx media quintum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_second_finger_of_hand_l",
    "node": "Middle phalanx of second finger of hand.l",
    "fmaId": "TA2:middle_phalanx_of_second_finger_of_hand_l",
    "namePtBr": "Middle phalanx of second finger of hand Esquerdo",
    "nameEn": "Middle phalanx of second finger of hand (left)",
    "nameLatin": "Phalanx media scundum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_second_finger_of_hand_r",
    "node": "Middle phalanx of second finger of hand.r",
    "fmaId": "TA2:middle_phalanx_of_second_finger_of_hand_r",
    "namePtBr": "Middle phalanx of second finger of hand Direito",
    "nameEn": "Middle phalanx of second finger of hand (right)",
    "nameLatin": "Phalanx media scundum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_second_finger_of_foot_l",
    "node": "Middle phalanx of second finger of foot.l",
    "fmaId": "TA2:middle_phalanx_of_second_finger_of_foot_l",
    "namePtBr": "Middle phalanx of second finger of foot Esquerdo",
    "nameEn": "Middle phalanx of second finger of foot (left)",
    "nameLatin": "Phalanx media secundum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_second_finger_of_foot_r",
    "node": "Middle phalanx of second finger of foot.r",
    "fmaId": "TA2:middle_phalanx_of_second_finger_of_foot_r",
    "namePtBr": "Middle phalanx of second finger of foot Direito",
    "nameEn": "Middle phalanx of second finger of foot (right)",
    "nameLatin": "Phalanx media secundum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_third_finger_of_hand_l",
    "node": "Middle phalanx of third finger of hand.l",
    "fmaId": "TA2:middle_phalanx_of_third_finger_of_hand_l",
    "namePtBr": "Middle phalanx of third finger of hand Esquerdo",
    "nameEn": "Middle phalanx of third finger of hand (left)",
    "nameLatin": "Phalanx media tertium digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_third_finger_of_hand_r",
    "node": "Middle phalanx of third finger of hand.r",
    "fmaId": "TA2:middle_phalanx_of_third_finger_of_hand_r",
    "namePtBr": "Middle phalanx of third finger of hand Direito",
    "nameEn": "Middle phalanx of third finger of hand (right)",
    "nameLatin": "Phalanx media tertium digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_third_finger_of_foot_l",
    "node": "Middle phalanx of third finger of foot.l",
    "fmaId": "TA2:middle_phalanx_of_third_finger_of_foot_l",
    "namePtBr": "Middle phalanx of third finger of foot Esquerdo",
    "nameEn": "Middle phalanx of third finger of foot (left)",
    "nameLatin": "Phalanx media tertium digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:middle_phalanx_of_third_finger_of_foot_r",
    "node": "Middle phalanx of third finger of foot.r",
    "fmaId": "TA2:middle_phalanx_of_third_finger_of_foot_r",
    "namePtBr": "Middle phalanx of third finger of foot Direito",
    "nameEn": "Middle phalanx of third finger of foot (right)",
    "nameLatin": "Phalanx media tertium digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_first_finger_of_hand_l",
    "node": "Proximal phalanx of first finger of hand.l",
    "fmaId": "TA2:proximal_phalanx_of_first_finger_of_hand_l",
    "namePtBr": "Proximal phalanx of first finger of hand Esquerdo",
    "nameEn": "Proximal phalanx of first finger of hand (left)",
    "nameLatin": "Phalanx proximalis primum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_first_finger_of_hand_r",
    "node": "Proximal phalanx of first finger of hand.r",
    "fmaId": "TA2:proximal_phalanx_of_first_finger_of_hand_r",
    "namePtBr": "Proximal phalanx of first finger of hand Direito",
    "nameEn": "Proximal phalanx of first finger of hand (right)",
    "nameLatin": "Phalanx proximalis primum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_first_finger_of_foot_l",
    "node": "Proximal phalanx of first finger of foot.l",
    "fmaId": "TA2:proximal_phalanx_of_first_finger_of_foot_l",
    "namePtBr": "Proximal phalanx of first finger of foot Esquerdo",
    "nameEn": "Proximal phalanx of first finger of foot (left)",
    "nameLatin": "Phalanx proximalis primum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_first_finger_of_foot_r",
    "node": "Proximal phalanx of first finger of foot.r",
    "fmaId": "TA2:proximal_phalanx_of_first_finger_of_foot_r",
    "namePtBr": "Proximal phalanx of first finger of foot Direito",
    "nameEn": "Proximal phalanx of first finger of foot (right)",
    "nameLatin": "Phalanx proximalis primum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_fourth_finger_of_hand_l",
    "node": "Proximal phalanx of fourth finger of hand.l",
    "fmaId": "TA2:proximal_phalanx_of_fourth_finger_of_hand_l",
    "namePtBr": "Proximal phalanx of fourth finger of hand Esquerdo",
    "nameEn": "Proximal phalanx of fourth finger of hand (left)",
    "nameLatin": "Phalanx proximalis quartum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_fourth_finger_of_hand_r",
    "node": "Proximal phalanx of fourth finger of hand.r",
    "fmaId": "TA2:proximal_phalanx_of_fourth_finger_of_hand_r",
    "namePtBr": "Proximal phalanx of fourth finger of hand Direito",
    "nameEn": "Proximal phalanx of fourth finger of hand (right)",
    "nameLatin": "Phalanx proximalis quartum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_fourth_finger_of_foot_l",
    "node": "Proximal phalanx of fourth finger of foot.l",
    "fmaId": "TA2:proximal_phalanx_of_fourth_finger_of_foot_l",
    "namePtBr": "Proximal phalanx of fourth finger of foot Esquerdo",
    "nameEn": "Proximal phalanx of fourth finger of foot (left)",
    "nameLatin": "Phalanx proximalis quartum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_fourth_finger_of_foot_r",
    "node": "Proximal phalanx of fourth finger of foot.r",
    "fmaId": "TA2:proximal_phalanx_of_fourth_finger_of_foot_r",
    "namePtBr": "Proximal phalanx of fourth finger of foot Direito",
    "nameEn": "Proximal phalanx of fourth finger of foot (right)",
    "nameLatin": "Phalanx proximalis quartum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_fifth_finger_of_hand_l",
    "node": "Proximal phalanx of fifth finger of hand.l",
    "fmaId": "TA2:proximal_phalanx_of_fifth_finger_of_hand_l",
    "namePtBr": "Proximal phalanx of fifth finger of hand Esquerdo",
    "nameEn": "Proximal phalanx of fifth finger of hand (left)",
    "nameLatin": "Phalanx proximalis quintum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_fifth_finger_of_hand_r",
    "node": "Proximal phalanx of fifth finger of hand.r",
    "fmaId": "TA2:proximal_phalanx_of_fifth_finger_of_hand_r",
    "namePtBr": "Proximal phalanx of fifth finger of hand Direito",
    "nameEn": "Proximal phalanx of fifth finger of hand (right)",
    "nameLatin": "Phalanx proximalis quintum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_fifth_finger_of_foot_l",
    "node": "Proximal phalanx of fifth finger of foot.l",
    "fmaId": "TA2:proximal_phalanx_of_fifth_finger_of_foot_l",
    "namePtBr": "Proximal phalanx of fifth finger of foot Esquerdo",
    "nameEn": "Proximal phalanx of fifth finger of foot (left)",
    "nameLatin": "Phalanx proximalis quintum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_fifth_finger_of_foot_r",
    "node": "Proximal phalanx of fifth finger of foot.r",
    "fmaId": "TA2:proximal_phalanx_of_fifth_finger_of_foot_r",
    "namePtBr": "Proximal phalanx of fifth finger of foot Direito",
    "nameEn": "Proximal phalanx of fifth finger of foot (right)",
    "nameLatin": "Phalanx proximalis quintum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_second_finger_of_hand_l",
    "node": "Proximal phalanx of second finger of hand.l",
    "fmaId": "TA2:proximal_phalanx_of_second_finger_of_hand_l",
    "namePtBr": "Proximal phalanx of second finger of hand Esquerdo",
    "nameEn": "Proximal phalanx of second finger of hand (left)",
    "nameLatin": "Phalanx proximalis secundum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_second_finger_of_hand_r",
    "node": "Proximal phalanx of second finger of hand.r",
    "fmaId": "TA2:proximal_phalanx_of_second_finger_of_hand_r",
    "namePtBr": "Proximal phalanx of second finger of hand Direito",
    "nameEn": "Proximal phalanx of second finger of hand (right)",
    "nameLatin": "Phalanx proximalis secundum digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_second_finger_of_foot_l",
    "node": "Proximal phalanx of second finger of foot.l",
    "fmaId": "TA2:proximal_phalanx_of_second_finger_of_foot_l",
    "namePtBr": "Proximal phalanx of second finger of foot Esquerdo",
    "nameEn": "Proximal phalanx of second finger of foot (left)",
    "nameLatin": "Phalanx proximalis secundum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_second_finger_of_foot_r",
    "node": "Proximal phalanx of second finger of foot.r",
    "fmaId": "TA2:proximal_phalanx_of_second_finger_of_foot_r",
    "namePtBr": "Proximal phalanx of second finger of foot Direito",
    "nameEn": "Proximal phalanx of second finger of foot (right)",
    "nameLatin": "Phalanx proximalis secundum digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_third_finger_of_hand_l",
    "node": "Proximal phalanx of third finger of hand.l",
    "fmaId": "TA2:proximal_phalanx_of_third_finger_of_hand_l",
    "namePtBr": "Proximal phalanx of third finger of hand Esquerdo",
    "nameEn": "Proximal phalanx of third finger of hand (left)",
    "nameLatin": "Phalanx proximalis tertium digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_third_finger_of_hand_r",
    "node": "Proximal phalanx of third finger of hand.r",
    "fmaId": "TA2:proximal_phalanx_of_third_finger_of_hand_r",
    "namePtBr": "Proximal phalanx of third finger of hand Direito",
    "nameEn": "Proximal phalanx of third finger of hand (right)",
    "nameLatin": "Phalanx proximalis tertium digitorum manus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_third_finger_of_foot_l",
    "node": "Proximal phalanx of third finger of foot.l",
    "fmaId": "TA2:proximal_phalanx_of_third_finger_of_foot_l",
    "namePtBr": "Proximal phalanx of third finger of foot Esquerdo",
    "nameEn": "Proximal phalanx of third finger of foot (left)",
    "nameLatin": "Phalanx proximalis tertium digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:proximal_phalanx_of_third_finger_of_foot_r",
    "node": "Proximal phalanx of third finger of foot.r",
    "fmaId": "TA2:proximal_phalanx_of_third_finger_of_foot_r",
    "namePtBr": "Proximal phalanx of third finger of foot Direito",
    "nameEn": "Proximal phalanx of third finger of foot (right)",
    "nameLatin": "Phalanx proximalis tertium digitorum pedis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:pharynx_j",
    "node": "Pharynx.j",
    "fmaId": "TA2:pharynx_j",
    "namePtBr": "Pharynx",
    "nameEn": "Pharynx",
    "nameLatin": "Pharynx",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive system"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:temporal_plane_l",
    "node": "Temporal plane.l",
    "fmaId": "TA2:temporal_plane_l",
    "namePtBr": "Temporal plane Esquerdo",
    "nameEn": "Temporal plane (left)",
    "nameLatin": "Planum temporale",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe",
      "Superior temporal gyrus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:temporal_plane_r",
    "node": "Temporal plane.r",
    "fmaId": "TA2:temporal_plane_r",
    "namePtBr": "Temporal plane Direito",
    "nameEn": "Temporal plane (right)",
    "nameLatin": "Planum temporale",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe",
      "Superior temporal gyrus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:pleura",
    "node": "Pleura",
    "fmaId": "TA2:pleura",
    "namePtBr": "Pleura",
    "nameEn": "Pleura",
    "nameLatin": "Pleura",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Respiratory system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:choroid_plexus_l",
    "node": "Choroid plexus.l",
    "fmaId": "TA2:choroid_plexus_l",
    "namePtBr": "Choroid plexus Esquerdo",
    "nameEn": "Choroid plexus (left)",
    "nameLatin": "Plexus chorioideus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Ventricular system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:choroid_plexus_r",
    "node": "Choroid plexus.r",
    "fmaId": "TA2:choroid_plexus_r",
    "namePtBr": "Choroid plexus Direito",
    "nameEn": "Choroid plexus (right)",
    "nameLatin": "Plexus chorioideus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Ventricular system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:basilar_venous_plexus",
    "node": "Basilar venous plexus",
    "fmaId": "TA2:basilar_venous_plexus",
    "namePtBr": "Basilar venous plexus",
    "nameEn": "Basilar venous plexus",
    "nameLatin": "Plexus venosus basilaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:occipital_pole_l",
    "node": "Occipital pole.l",
    "fmaId": "TA2:occipital_pole_l",
    "namePtBr": "Occipital pole Esquerdo",
    "nameEn": "Occipital pole (left)",
    "nameLatin": "Polus occipitalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Occipital lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:occipital_pole_r",
    "node": "Occipital pole.r",
    "fmaId": "TA2:occipital_pole_r",
    "namePtBr": "Occipital pole Direito",
    "nameEn": "Occipital pole (right)",
    "nameLatin": "Polus occipitalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Occipital lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:temporal_pole_l",
    "node": "Temporal pole.l",
    "fmaId": "TA2:temporal_pole_l",
    "namePtBr": "Temporal pole Esquerdo",
    "nameEn": "Temporal pole (left)",
    "nameLatin": "Polus temporalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:temporal_pole_r",
    "node": "Temporal pole.r",
    "fmaId": "TA2:temporal_pole_r",
    "namePtBr": "Temporal pole Direito",
    "nameEn": "Temporal pole (right)",
    "nameLatin": "Polus temporalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:pons_l",
    "node": "Pons.l",
    "fmaId": "TA2:pons_l",
    "namePtBr": "Pons Esquerdo",
    "nameEn": "Pons (left)",
    "nameLatin": "Pons",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Pons"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:pons_r",
    "node": "Pons.r",
    "fmaId": "TA2:pons_r",
    "namePtBr": "Pons Direito",
    "nameEn": "Pons (right)",
    "nameLatin": "Pons",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Pons"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:precuneus_l",
    "node": "Precuneus.l",
    "fmaId": "TA2:precuneus_l",
    "namePtBr": "Precuneus Esquerdo",
    "nameEn": "Precuneus (left)",
    "nameLatin": "Precuneus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:precuneus_r",
    "node": "Precuneus.r",
    "fmaId": "TA2:precuneus_r",
    "namePtBr": "Precuneus Direito",
    "nameEn": "Precuneus (right)",
    "nameLatin": "Precuneus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_process_of_nasal_septal_cartilage_l",
    "node": "Lateral process of nasal septal cartilage.l",
    "fmaId": "TA2:lateral_process_of_nasal_septal_cartilage_l",
    "namePtBr": "Lateral process of nasal septal cartilage Esquerdo",
    "nameEn": "Lateral process of nasal septal cartilage (left)",
    "nameLatin": "Processus lateralis cartilaginis septi nasi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:lateral_process_of_nasal_septal_cartilage_r",
    "node": "Lateral process of nasal septal cartilage.r",
    "fmaId": "TA2:lateral_process_of_nasal_septal_cartilage_r",
    "namePtBr": "Lateral process of nasal septal cartilage Direito",
    "nameEn": "Lateral process of nasal septal cartilage (right)",
    "nameLatin": "Processus lateralis cartilaginis septi nasi",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:spinal_reticular_process",
    "node": "Spinal reticular process",
    "fmaId": "TA2:spinal_reticular_process",
    "namePtBr": "Spinal reticular process",
    "nameEn": "Spinal reticular process",
    "nameLatin": "Processus reticularis spinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:xiphoid_process",
    "node": "Xiphoid process",
    "fmaId": "TA2:xiphoid_process",
    "namePtBr": "Processo Xifoide",
    "nameEn": "Xiphoid process",
    "nameLatin": "Processus xiphoideus",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Sternum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 1.3
    }
  },
  {
    "id": "za:putamen_l",
    "node": "Putamen.l",
    "fmaId": "TA2:putamen_l",
    "namePtBr": "Putamen Esquerdo",
    "nameEn": "Putamen (left)",
    "nameLatin": "Putamen",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:putamen_r",
    "node": "Putamen.r",
    "fmaId": "TA2:putamen_r",
    "namePtBr": "Putamen Direito",
    "nameEn": "Putamen (right)",
    "nameLatin": "Putamen",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:pyramid_of_medulla_oblongata_l",
    "node": "Pyramid of medulla oblongata.l",
    "fmaId": "TA2:pyramid_of_medulla_oblongata_l",
    "namePtBr": "Pyramid of medulla oblongata Esquerdo",
    "nameEn": "Pyramid of medulla oblongata (left)",
    "nameLatin": "Pyramis medullae oblongatae",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:pyramid_of_medulla_oblongata_r",
    "node": "Pyramid of medulla oblongata.r",
    "fmaId": "TA2:pyramid_of_medulla_oblongata_r",
    "namePtBr": "Pyramid of medulla oblongata Direito",
    "nameEn": "Pyramid of medulla oblongata (right)",
    "nameLatin": "Pyramis medullae oblongatae",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Brainstem",
      "Medulla oblongata"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:pyramis_of_vermis",
    "node": "Pyramis of vermis",
    "fmaId": "TA2:pyramis_of_vermis",
    "namePtBr": "Pyramis of vermis",
    "nameEn": "Pyramis of vermis",
    "nameLatin": "Pyramis vermis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:fourth_rib_l",
    "node": "Fourth rib.l",
    "fmaId": "TA2:fourth_rib_l",
    "namePtBr": "4ª Costela Esquerda",
    "nameEn": "Fourth rib (left)",
    "nameLatin": "Quarta costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:fourth_rib_r",
    "node": "Fourth rib.r",
    "fmaId": "TA2:fourth_rib_r",
    "namePtBr": "4ª Costela Direita",
    "nameEn": "Fourth rib (right)",
    "nameLatin": "Quarta costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:fifth_rib_l",
    "node": "Fifth rib.l",
    "fmaId": "TA2:fifth_rib_l",
    "namePtBr": "5ª Costela Esquerda",
    "nameEn": "Fifth rib (left)",
    "nameLatin": "Quinta costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:fifth_rib_r",
    "node": "Fifth rib.r",
    "fmaId": "TA2:fifth_rib_r",
    "namePtBr": "5ª Costela Direita",
    "nameEn": "Fifth rib (right)",
    "nameLatin": "Quinta costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:roots_of_brachial_plexus_l",
    "node": "Roots of brachial plexus.l",
    "fmaId": "TA2:roots_of_brachial_plexus_l",
    "namePtBr": "Roots of brachial plexus Esquerdo",
    "nameEn": "Roots of brachial plexus (left)",
    "nameLatin": "Radices plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:roots_of_brachial_plexus_r",
    "node": "Roots of brachial plexus.r",
    "fmaId": "TA2:roots_of_brachial_plexus_r",
    "namePtBr": "Roots of brachial plexus Direito",
    "nameEn": "Roots of brachial plexus (right)",
    "nameLatin": "Radices plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:radius_l",
    "node": "Radius.l",
    "fmaId": "TA2:radius_l",
    "namePtBr": "Rádio Esquerdo",
    "nameEn": "Radius (left)",
    "nameLatin": "Radius",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:radius_r",
    "node": "Radius.r",
    "fmaId": "TA2:radius_r",
    "namePtBr": "Rádio Direito",
    "nameEn": "Radius (right)",
    "nameLatin": "Radius",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:anterior_root_of_posterior_femoral_cutaneous_nerve_l",
    "node": "Anterior root of posterior femoral cutaneous nerve.l",
    "fmaId": "TA2:anterior_root_of_posterior_femoral_cutaneous_nerve_l",
    "namePtBr": "Anterior root of posterior femoral cutaneous nerve Esquerdo",
    "nameEn": "Anterior root of posterior femoral cutaneous nerve (left)",
    "nameLatin": "Radix anterior nervi cutanei posterioris femoris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_root_of_posterior_femoral_cutaneous_nerve_r",
    "node": "Anterior root of posterior femoral cutaneous nerve.r",
    "fmaId": "TA2:anterior_root_of_posterior_femoral_cutaneous_nerve_r",
    "namePtBr": "Anterior root of posterior femoral cutaneous nerve Direito",
    "nameEn": "Anterior root of posterior femoral cutaneous nerve (right)",
    "nameLatin": "Radix anterior nervi cutanei posterioris femoris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_root_of_spinal_nerve_l",
    "node": "Anterior root of spinal nerve.l",
    "fmaId": "TA2:anterior_root_of_spinal_nerve_l",
    "namePtBr": "Anterior root of spinal nerve Esquerdo",
    "nameEn": "Anterior root of spinal nerve (left)",
    "nameLatin": "Radix anterior nervi spinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_root_of_spinal_nerve_r",
    "node": "Anterior root of spinal nerve.r",
    "fmaId": "TA2:anterior_root_of_spinal_nerve_r",
    "namePtBr": "Anterior root of spinal nerve Direito",
    "nameEn": "Anterior root of spinal nerve (right)",
    "nameLatin": "Radix anterior nervi spinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:motor_root_of_trigeminal_nerve_l",
    "node": "Motor root of trigeminal nerve.l",
    "fmaId": "TA2:motor_root_of_trigeminal_nerve_l",
    "namePtBr": "Motor root of trigeminal nerve Esquerdo",
    "nameEn": "Motor root of trigeminal nerve (left)",
    "nameLatin": "Radix motoria nervi trigemini",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:motor_root_of_trigeminal_nerve_r",
    "node": "Motor root of trigeminal nerve.r",
    "fmaId": "TA2:motor_root_of_trigeminal_nerve_r",
    "namePtBr": "Motor root of trigeminal nerve Direito",
    "nameEn": "Motor root of trigeminal nerve (right)",
    "nameLatin": "Radix motoria nervi trigemini",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_root_of_posterior_femoral_cutaneous_nerve_l",
    "node": "Posterior root of posterior femoral cutaneous nerve.l",
    "fmaId": "TA2:posterior_root_of_posterior_femoral_cutaneous_nerve_l",
    "namePtBr": "Posterior root of posterior femoral cutaneous nerve Esquerdo",
    "nameEn": "Posterior root of posterior femoral cutaneous nerve (left)",
    "nameLatin": "Radix posterior nervi cutanei posterioris femoris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Nerves"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_root_of_posterior_femoral_cutaneous_nerve_r",
    "node": "Posterior root of posterior femoral cutaneous nerve.r",
    "fmaId": "TA2:posterior_root_of_posterior_femoral_cutaneous_nerve_r",
    "namePtBr": "Posterior root of posterior femoral cutaneous nerve Direito",
    "nameEn": "Posterior root of posterior femoral cutaneous nerve (right)",
    "nameLatin": "Radix posterior nervi cutanei posterioris femoris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Nerves"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_root_of_spinal_nerve_l",
    "node": "Posterior root of spinal nerve.l",
    "fmaId": "TA2:posterior_root_of_spinal_nerve_l",
    "namePtBr": "Posterior root of spinal nerve Esquerdo",
    "nameEn": "Posterior root of spinal nerve (left)",
    "nameLatin": "Radix posterior nervi spinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_root_of_spinal_nerve_r",
    "node": "Posterior root of spinal nerve.r",
    "fmaId": "TA2:posterior_root_of_spinal_nerve_r",
    "namePtBr": "Posterior root of spinal nerve Direito",
    "nameEn": "Posterior root of spinal nerve (right)",
    "nameLatin": "Radix posterior nervi spinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:sensory_root_of_trigeminal_nerve_l",
    "node": "Sensory root of trigeminal nerve.l",
    "fmaId": "TA2:sensory_root_of_trigeminal_nerve_l",
    "namePtBr": "Sensory root of trigeminal nerve Esquerdo",
    "nameEn": "Sensory root of trigeminal nerve (left)",
    "nameLatin": "Radix sensoria nervi trigemini",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)",
      "Sensory root of trigeminal nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:sensory_root_of_trigeminal_nerve_r",
    "node": "Sensory root of trigeminal nerve.r",
    "fmaId": "TA2:sensory_root_of_trigeminal_nerve_r",
    "namePtBr": "Sensory root of trigeminal nerve Direito",
    "nameEn": "Sensory root of trigeminal nerve (right)",
    "nameLatin": "Radix sensoria nervi trigemini",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)",
      "Sensory root of trigeminal nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:calcaneal_branches_of_fibular_artery_l",
    "node": "Calcaneal branches of fibular artery.l",
    "fmaId": "TA2:calcaneal_branches_of_fibular_artery_l",
    "namePtBr": "Calcaneal branches of fibular artery Esquerdo",
    "nameEn": "Calcaneal branches of fibular artery (left)",
    "nameLatin": "Rami calcanei arteriae fibularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:calcaneal_branches_of_fibular_artery_r",
    "node": "Calcaneal branches of fibular artery.r",
    "fmaId": "TA2:calcaneal_branches_of_fibular_artery_r",
    "namePtBr": "Calcaneal branches of fibular artery Direito",
    "nameEn": "Calcaneal branches of fibular artery (right)",
    "nameLatin": "Rami calcanei arteriae fibularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:calcaneal_branches_of_posterior_tibial_artery_l",
    "node": "Calcaneal branches of posterior tibial artery.l",
    "fmaId": "TA2:calcaneal_branches_of_posterior_tibial_artery_l",
    "namePtBr": "Calcaneal branches of posterior tibial artery Esquerdo",
    "nameEn": "Calcaneal branches of posterior tibial artery (left)",
    "nameLatin": "Rami calcanei arteriae tibialis posterioris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:calcaneal_branches_of_posterior_tibial_artery_r",
    "node": "Calcaneal branches of posterior tibial artery.r",
    "fmaId": "TA2:calcaneal_branches_of_posterior_tibial_artery_r",
    "namePtBr": "Calcaneal branches of posterior tibial artery Direito",
    "nameEn": "Calcaneal branches of posterior tibial artery (right)",
    "nameLatin": "Rami calcanei arteriae tibialis posterioris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:anterior_cutaneous_branches_of_femoral_nerve_l",
    "node": "Anterior cutaneous branches of femoral nerve.l",
    "fmaId": "TA2:anterior_cutaneous_branches_of_femoral_nerve_l",
    "namePtBr": "Anterior cutaneous branches of femoral nerve Esquerdo",
    "nameEn": "Anterior cutaneous branches of femoral nerve (left)",
    "nameLatin": "Rami cutanei anteriores nervi femoralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_cutaneous_branches_of_femoral_nerve_r",
    "node": "Anterior cutaneous branches of femoral nerve.r",
    "fmaId": "TA2:anterior_cutaneous_branches_of_femoral_nerve_r",
    "namePtBr": "Anterior cutaneous branches of femoral nerve Direito",
    "nameEn": "Anterior cutaneous branches of femoral nerve (right)",
    "nameLatin": "Rami cutanei anteriores nervi femoralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_crural_cutaneous_branches_of_saphenous_nerve_l",
    "node": "Medial crural cutaneous branches of saphenous nerve.l",
    "fmaId": "TA2:medial_crural_cutaneous_branches_of_saphenous_nerve_l",
    "namePtBr": "Medial crural cutaneous branches of saphenous nerve Esquerdo",
    "nameEn": "Medial crural cutaneous branches of saphenous nerve (left)",
    "nameLatin": "Rami cutanei mediales cruris nervi sapheni",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve",
      "Saphenous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_crural_cutaneous_branches_of_saphenous_nerve_r",
    "node": "Medial crural cutaneous branches of saphenous nerve.r",
    "fmaId": "TA2:medial_crural_cutaneous_branches_of_saphenous_nerve_r",
    "namePtBr": "Medial crural cutaneous branches of saphenous nerve Direito",
    "nameEn": "Medial crural cutaneous branches of saphenous nerve (right)",
    "nameLatin": "Rami cutanei mediales cruris nervi sapheni",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve",
      "Saphenous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:dorsal_digital_branches_of_deep_fibular_nerve_l",
    "node": "Dorsal digital branches of deep fibular nerve.l",
    "fmaId": "TA2:dorsal_digital_branches_of_deep_fibular_nerve_l",
    "namePtBr": "Dorsal digital branches of deep fibular nerve Esquerdo",
    "nameEn": "Dorsal digital branches of deep fibular nerve (left)",
    "nameLatin": "Rami digitales dorsales nervi fibularis profundi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Deep fibular nerve"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:dorsal_digital_branches_of_deep_fibular_nerve_r",
    "node": "Dorsal digital branches of deep fibular nerve.r",
    "fmaId": "TA2:dorsal_digital_branches_of_deep_fibular_nerve_r",
    "namePtBr": "Dorsal digital branches of deep fibular nerve Direito",
    "nameEn": "Dorsal digital branches of deep fibular nerve (right)",
    "nameLatin": "Rami digitales dorsales nervi fibularis profundi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Deep fibular nerve"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:dorsal_digital_branches_of_superficial_fibular_nerve_l",
    "node": "Dorsal digital branches of superficial fibular nerve.l",
    "fmaId": "TA2:dorsal_digital_branches_of_superficial_fibular_nerve_l",
    "namePtBr": "Dorsal digital branches of superficial fibular nerve Esquerdo",
    "nameEn": "Dorsal digital branches of superficial fibular nerve (left)",
    "nameLatin": "Rami digitales dorsales nervi fibularis superficialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Superficial fibular nerve"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:dorsal_digital_branches_of_superficial_fibular_nerve_r",
    "node": "Dorsal digital branches of superficial fibular nerve.r",
    "fmaId": "TA2:dorsal_digital_branches_of_superficial_fibular_nerve_r",
    "namePtBr": "Dorsal digital branches of superficial fibular nerve Direito",
    "nameEn": "Dorsal digital branches of superficial fibular nerve (right)",
    "nameLatin": "Rami digitales dorsales nervi fibularis superficialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Superficial fibular nerve"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:dorsal_digital_branches_of_radial_nerve_l",
    "node": "Dorsal digital branches of radial nerve.l",
    "fmaId": "TA2:dorsal_digital_branches_of_radial_nerve_l",
    "namePtBr": "Dorsal digital branches of radial nerve Esquerdo",
    "nameEn": "Dorsal digital branches of radial nerve (left)",
    "nameLatin": "Rami digitales dorsales nervi radialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve",
      "Superficial branch of radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:dorsal_digital_branches_of_radial_nerve_r",
    "node": "Dorsal digital branches of radial nerve.r",
    "fmaId": "TA2:dorsal_digital_branches_of_radial_nerve_r",
    "namePtBr": "Dorsal digital branches of radial nerve Direito",
    "nameEn": "Dorsal digital branches of radial nerve (right)",
    "nameLatin": "Rami digitales dorsales nervi radialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve",
      "Superficial branch of radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:dorsal_digital_branches_of_ulnar_nerve_l",
    "node": "Dorsal digital branches of ulnar nerve.l",
    "fmaId": "TA2:dorsal_digital_branches_of_ulnar_nerve_l",
    "namePtBr": "Dorsal digital branches of ulnar nerve Esquerdo",
    "nameEn": "Dorsal digital branches of ulnar nerve (left)",
    "nameLatin": "Rami digitales dorsales nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve",
      "Dorsal branch of ulnar nerve"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:dorsal_digital_branches_of_ulnar_nerve_r",
    "node": "Dorsal digital branches of ulnar nerve.r",
    "fmaId": "TA2:dorsal_digital_branches_of_ulnar_nerve_r",
    "namePtBr": "Dorsal digital branches of ulnar nerve Direito",
    "nameEn": "Dorsal digital branches of ulnar nerve (right)",
    "nameLatin": "Rami digitales dorsales nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve",
      "Dorsal branch of ulnar nerve"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:common_palmar_digital_branches_of_median_nerve_l",
    "node": "Common palmar digital branches of median nerve.l",
    "fmaId": "TA2:common_palmar_digital_branches_of_median_nerve_l",
    "namePtBr": "Common palmar digital branches of median nerve Esquerdo",
    "nameEn": "Common palmar digital branches of median nerve (left)",
    "nameLatin": "Rami digitales palmares communes nervi mediani",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Median nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:common_palmar_digital_branches_of_median_nerve_r",
    "node": "Common palmar digital branches of median nerve.r",
    "fmaId": "TA2:common_palmar_digital_branches_of_median_nerve_r",
    "namePtBr": "Common palmar digital branches of median nerve Direito",
    "nameEn": "Common palmar digital branches of median nerve (right)",
    "nameLatin": "Rami digitales palmares communes nervi mediani",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Median nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:common_palmar_digital_branches_of_ulnar_nerve_l",
    "node": "Common palmar digital branches of ulnar nerve.l",
    "fmaId": "TA2:common_palmar_digital_branches_of_ulnar_nerve_l",
    "namePtBr": "Common palmar digital branches of ulnar nerve Esquerdo",
    "nameEn": "Common palmar digital branches of ulnar nerve (left)",
    "nameLatin": "Rami digitales palmares communes nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve",
      "Superficial branch of ulnar nerve"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:common_palmar_digital_branches_of_ulnar_nerve_r",
    "node": "Common palmar digital branches of ulnar nerve.r",
    "fmaId": "TA2:common_palmar_digital_branches_of_ulnar_nerve_r",
    "namePtBr": "Common palmar digital branches of ulnar nerve Direito",
    "nameEn": "Common palmar digital branches of ulnar nerve (right)",
    "nameLatin": "Rami digitales palmares communes nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve",
      "Superficial branch of ulnar nerve"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:proper_palmar_digital_branches_of_median_nerve_l",
    "node": "Proper palmar digital branches of median nerve.l",
    "fmaId": "TA2:proper_palmar_digital_branches_of_median_nerve_l",
    "namePtBr": "Proper palmar digital branches of median nerve Esquerdo",
    "nameEn": "Proper palmar digital branches of median nerve (left)",
    "nameLatin": "Rami digitales palmares proprii nervi mediani",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Median nerve",
      "Common palmar digital branches of median nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:proper_palmar_digital_branches_of_median_nerve_r",
    "node": "Proper palmar digital branches of median nerve.r",
    "fmaId": "TA2:proper_palmar_digital_branches_of_median_nerve_r",
    "namePtBr": "Proper palmar digital branches of median nerve Direito",
    "nameEn": "Proper palmar digital branches of median nerve (right)",
    "nameLatin": "Rami digitales palmares proprii nervi mediani",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Median nerve",
      "Common palmar digital branches of median nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:proper_palmar_digital_branches_of_ulnar_nerve_l",
    "node": "Proper palmar digital branches of ulnar nerve.l",
    "fmaId": "TA2:proper_palmar_digital_branches_of_ulnar_nerve_l",
    "namePtBr": "Proper palmar digital branches of ulnar nerve Esquerdo",
    "nameEn": "Proper palmar digital branches of ulnar nerve (left)",
    "nameLatin": "Rami digitales palmares proprii nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve",
      "Superficial branch of ulnar nerve",
      "Common palmar digital branches of ulnar nerve"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:proper_palmar_digital_branches_of_ulnar_nerve_r",
    "node": "Proper palmar digital branches of ulnar nerve.r",
    "fmaId": "TA2:proper_palmar_digital_branches_of_ulnar_nerve_r",
    "namePtBr": "Proper palmar digital branches of ulnar nerve Direito",
    "nameEn": "Proper palmar digital branches of ulnar nerve (right)",
    "nameLatin": "Rami digitales palmares proprii nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve",
      "Superficial branch of ulnar nerve",
      "Common palmar digital branches of ulnar nerve"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:common_plantar_digital_branches_of_lateral_plantar_nerve_l",
    "node": "Common plantar digital branches of lateral plantar nerve.l",
    "fmaId": "TA2:common_plantar_digital_branches_of_lateral_plantar_nerve_l",
    "namePtBr": "Common plantar digital branches of lateral plantar nerve Esquerdo",
    "nameEn": "Common plantar digital branches of lateral plantar nerve (left)",
    "nameLatin": "Rami digitales plantares communes nervi plantaris lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve",
      "Lateral plantar nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:common_plantar_digital_branches_of_lateral_plantar_nerve_r",
    "node": "Common plantar digital branches of lateral plantar nerve.r",
    "fmaId": "TA2:common_plantar_digital_branches_of_lateral_plantar_nerve_r",
    "namePtBr": "Common plantar digital branches of lateral plantar nerve Direito",
    "nameEn": "Common plantar digital branches of lateral plantar nerve (right)",
    "nameLatin": "Rami digitales plantares communes nervi plantaris lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve",
      "Lateral plantar nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:common_plantar_digital_branches_of_medial_plantar_nerve",
    "node": "Common plantar digital branches of medial plantar nerve",
    "fmaId": "TA2:common_plantar_digital_branches_of_medial_plantar_nerve",
    "namePtBr": "Common plantar digital branches of medial plantar nerve",
    "nameEn": "Common plantar digital branches of medial plantar nerve",
    "nameLatin": "Rami digitales plantares communes nervi plantaris medialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve",
      "Medial plantar nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:common_plantar_digital_branches_of_medial_plantar_nerve_l",
    "node": "Common plantar digital branches of medial plantar nerve.l",
    "fmaId": "TA2:common_plantar_digital_branches_of_medial_plantar_nerve_l",
    "namePtBr": "Common plantar digital branches of medial plantar nerve Esquerdo",
    "nameEn": "Common plantar digital branches of medial plantar nerve (left)",
    "nameLatin": "Rami digitales plantares communes nervi plantaris medialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve",
      "Medial plantar nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:proper_plantar_digital_branches_of_lateral_plantar_nerve_l",
    "node": "Proper plantar digital branches of lateral plantar nerve.l",
    "fmaId": "TA2:proper_plantar_digital_branches_of_lateral_plantar_nerve_l",
    "namePtBr": "Proper plantar digital branches of lateral plantar nerve Esquerdo",
    "nameEn": "Proper plantar digital branches of lateral plantar nerve (left)",
    "nameLatin": "Rami digitales plantares proprii nervi plantaris lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve",
      "Lateral plantar nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:proper_plantar_digital_branches_of_lateral_plantar_nerve_r",
    "node": "Proper plantar digital branches of lateral plantar nerve.r",
    "fmaId": "TA2:proper_plantar_digital_branches_of_lateral_plantar_nerve_r",
    "namePtBr": "Proper plantar digital branches of lateral plantar nerve Direito",
    "nameEn": "Proper plantar digital branches of lateral plantar nerve (right)",
    "nameLatin": "Rami digitales plantares proprii nervi plantaris lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve",
      "Lateral plantar nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:proper_plantar_digital_branches_of_medial_plantar_nerve_l",
    "node": "Proper plantar digital branches of medial plantar nerve.l",
    "fmaId": "TA2:proper_plantar_digital_branches_of_medial_plantar_nerve_l",
    "namePtBr": "Proper plantar digital branches of medial plantar nerve Esquerdo",
    "nameEn": "Proper plantar digital branches of medial plantar nerve (left)",
    "nameLatin": "Rami digitales plantares proprii nervi plantaris medialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve",
      "Medial plantar nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:proper_plantar_digital_branches_of_medial_plantar_nerve_r",
    "node": "Proper plantar digital branches of medial plantar nerve.r",
    "fmaId": "TA2:proper_plantar_digital_branches_of_medial_plantar_nerve_r",
    "namePtBr": "Proper plantar digital branches of medial plantar nerve Direito",
    "nameEn": "Proper plantar digital branches of medial plantar nerve (right)",
    "nameLatin": "Rami digitales plantares proprii nervi plantaris medialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Tibial nerve",
      "Medial plantar nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:frontal_branches_of_callosomarginal_artery_l",
    "node": "Frontal branches of callosomarginal artery.l",
    "fmaId": "TA2:frontal_branches_of_callosomarginal_artery_l",
    "namePtBr": "Frontal branches of callosomarginal artery Esquerdo",
    "nameEn": "Frontal branches of callosomarginal artery (left)",
    "nameLatin": "Rami frontales arteriae callosomarginalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:frontal_branches_of_callosomarginal_artery_r",
    "node": "Frontal branches of callosomarginal artery.r",
    "fmaId": "TA2:frontal_branches_of_callosomarginal_artery_r",
    "namePtBr": "Frontal branches of callosomarginal artery Direito",
    "nameEn": "Frontal branches of callosomarginal artery (right)",
    "nameLatin": "Rami frontales arteriae callosomarginalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:insular_branches_of_middle_cerebral_artery_m2_r",
    "node": "Insular branches of middle cerebral artery (M2).r",
    "fmaId": "TA2:insular_branches_of_middle_cerebral_artery_m2_r",
    "namePtBr": "Insular branches of middle cerebral artery (M2) Direito",
    "nameEn": "Insular branches of middle cerebral artery (M2) (right)",
    "nameLatin": "Rami insulares arteriae mediae cerebri (M2",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_pontine_branches_of_basilar_artery_l",
    "node": "Lateral pontine branches of basilar artery.l",
    "fmaId": "TA2:lateral_pontine_branches_of_basilar_artery_l",
    "namePtBr": "Lateral pontine branches of basilar artery Esquerdo",
    "nameEn": "Lateral pontine branches of basilar artery (left)",
    "nameLatin": "Rami laterales pontis arteriae basilaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_pontine_branches_of_basilar_artery_r",
    "node": "Lateral pontine branches of basilar artery.r",
    "fmaId": "TA2:lateral_pontine_branches_of_basilar_artery_r",
    "namePtBr": "Lateral pontine branches of basilar artery Direito",
    "nameEn": "Lateral pontine branches of basilar artery (right)",
    "nameLatin": "Rami laterales pontis arteriae basilaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_pontine_branches_of_basilar_artery_l",
    "node": "Medial pontine branches of basilar artery.l",
    "fmaId": "TA2:medial_pontine_branches_of_basilar_artery_l",
    "namePtBr": "Medial pontine branches of basilar artery Esquerdo",
    "nameEn": "Medial pontine branches of basilar artery (left)",
    "nameLatin": "Rami mediales pontis arteriae basilaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_pontine_branches_of_basilar_artery_r",
    "node": "Medial pontine branches of basilar artery.r",
    "fmaId": "TA2:medial_pontine_branches_of_basilar_artery_r",
    "namePtBr": "Medial pontine branches of basilar artery Direito",
    "nameEn": "Medial pontine branches of basilar artery (right)",
    "nameLatin": "Rami mediales pontis arteriae basilaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Subclavian artery",
      "Vertebral artery'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:muscular_branches_of_axillary_nerve_l",
    "node": "Muscular branches of axillary nerve.l",
    "fmaId": "TA2:muscular_branches_of_axillary_nerve_l",
    "namePtBr": "Muscular branches of axillary nerve Esquerdo",
    "nameEn": "Muscular branches of axillary nerve (left)",
    "nameLatin": "Rami musculares nervi axillaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Axillary nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:muscular_branches_of_axillary_nerve_r",
    "node": "Muscular branches of axillary nerve.r",
    "fmaId": "TA2:muscular_branches_of_axillary_nerve_r",
    "namePtBr": "Muscular branches of axillary nerve Direito",
    "nameEn": "Muscular branches of axillary nerve (right)",
    "nameLatin": "Rami musculares nervi axillaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Axillary nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:muscular_branches_of_deep_fibular_nerve_l",
    "node": "Muscular branches of deep fibular nerve.l",
    "fmaId": "TA2:muscular_branches_of_deep_fibular_nerve_l",
    "namePtBr": "Muscular branches of deep fibular nerve Esquerdo",
    "nameEn": "Muscular branches of deep fibular nerve (left)",
    "nameLatin": "Rami musculares nervi fibularis profundi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Deep fibular nerve"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:muscular_branches_of_deep_fibular_nerve_r",
    "node": "Muscular branches of deep fibular nerve.r",
    "fmaId": "TA2:muscular_branches_of_deep_fibular_nerve_r",
    "namePtBr": "Muscular branches of deep fibular nerve Direito",
    "nameEn": "Muscular branches of deep fibular nerve (right)",
    "nameLatin": "Rami musculares nervi fibularis profundi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Sacral plexus",
      "Sciatic nerve",
      "Common fibular nerve",
      "Deep fibular nerve"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:muscular_branches_of_median_nerve_l",
    "node": "Muscular branches of median nerve.l",
    "fmaId": "TA2:muscular_branches_of_median_nerve_l",
    "namePtBr": "Muscular branches of median nerve Esquerdo",
    "nameEn": "Muscular branches of median nerve (left)",
    "nameLatin": "Rami musculares nervi mediani",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Median nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:muscular_branches_of_median_nerve_r",
    "node": "Muscular branches of median nerve.r",
    "fmaId": "TA2:muscular_branches_of_median_nerve_r",
    "namePtBr": "Muscular branches of median nerve Direito",
    "nameEn": "Muscular branches of median nerve (right)",
    "nameLatin": "Rami musculares nervi mediani",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Median nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:muscular_branches_of_radial_nerve_l",
    "node": "Muscular branches of radial nerve.l",
    "fmaId": "TA2:muscular_branches_of_radial_nerve_l",
    "namePtBr": "Muscular branches of radial nerve Esquerdo",
    "nameEn": "Muscular branches of radial nerve (left)",
    "nameLatin": "Rami musculares nervi radialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:muscular_branches_of_radial_nerve_r",
    "node": "Muscular branches of radial nerve.r",
    "fmaId": "TA2:muscular_branches_of_radial_nerve_r",
    "namePtBr": "Muscular branches of radial nerve Direito",
    "nameEn": "Muscular branches of radial nerve (right)",
    "nameLatin": "Rami musculares nervi radialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:muscular_branches_of_ulnar_nerve_l",
    "node": "Muscular branches of ulnar nerve.l",
    "fmaId": "TA2:muscular_branches_of_ulnar_nerve_l",
    "namePtBr": "Muscular branches of ulnar nerve Esquerdo",
    "nameEn": "Muscular branches of ulnar nerve (left)",
    "nameLatin": "Rami musculares nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:muscular_branches_of_ulnar_nerve_r",
    "node": "Muscular branches of ulnar nerve.r",
    "fmaId": "TA2:muscular_branches_of_ulnar_nerve_r",
    "namePtBr": "Muscular branches of ulnar nerve Direito",
    "nameEn": "Muscular branches of ulnar nerve (right)",
    "nameLatin": "Rami musculares nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:posterior_lateral_nasal_branches_of_sphenopalatine_artery_l",
    "node": "Posterior lateral nasal branches of sphenopalatine artery..l",
    "fmaId": "TA2:posterior_lateral_nasal_branches_of_sphenopalatine_artery_l",
    "namePtBr": "Posterior lateral nasal branches of sphenopalatine artery Esquerdo",
    "nameEn": "Posterior lateral nasal branches of sphenopalatine artery (left)",
    "nameLatin": "Rami nasales laterales posteriores arteriae sphenopalatinae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_lateral_nasal_branches_of_sphenopalatine_artery_r",
    "node": "Posterior lateral nasal branches of sphenopalatine artery..r",
    "fmaId": "TA2:posterior_lateral_nasal_branches_of_sphenopalatine_artery_r",
    "namePtBr": "Posterior lateral nasal branches of sphenopalatine artery Direito",
    "nameEn": "Posterior lateral nasal branches of sphenopalatine artery (right)",
    "nameLatin": "Rami nasales laterales posteriores arteriae sphenopalatinae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:orbitofrontal_branches_of_anterior_cerebral_artery_l",
    "node": "Orbitofrontal branches of anterior cerebral artery.l",
    "fmaId": "TA2:orbitofrontal_branches_of_anterior_cerebral_artery_l",
    "namePtBr": "Orbitofrontal branches of anterior cerebral artery Esquerdo",
    "nameEn": "Orbitofrontal branches of anterior cerebral artery (left)",
    "nameLatin": "Rami orbitofrontales arteriae cerebri anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:orbitofrontal_branches_of_anterior_cerebral_artery_r",
    "node": "Orbitofrontal branches of anterior cerebral artery.r",
    "fmaId": "TA2:orbitofrontal_branches_of_anterior_cerebral_artery_r",
    "namePtBr": "Orbitofrontal branches of anterior cerebral artery Direito",
    "nameEn": "Orbitofrontal branches of anterior cerebral artery (right)",
    "nameLatin": "Rami orbitofrontales arteriae cerebri anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:parietal_branches_of_middle_cerebral_artery_l",
    "node": "Parietal branches of middle cerebral artery.l",
    "fmaId": "TA2:parietal_branches_of_middle_cerebral_artery_l",
    "namePtBr": "Parietal branches of middle cerebral artery Esquerdo",
    "nameEn": "Parietal branches of middle cerebral artery (left)",
    "nameLatin": "Rami parietales arteriae mediae cerebri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:parietal_branches_of_middle_cerebral_artery_r",
    "node": "Parietal branches of middle cerebral artery.r",
    "fmaId": "TA2:parietal_branches_of_middle_cerebral_artery_r",
    "namePtBr": "Parietal branches of middle cerebral artery Direito",
    "nameEn": "Parietal branches of middle cerebral artery (right)",
    "nameLatin": "Rami parietales arteriae mediae cerebri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:pectoral_branches_of_thoraco_acromial_artery_l",
    "node": "Pectoral branches of thoraco-acromial artery.l",
    "fmaId": "TA2:pectoral_branches_of_thoraco_acromial_artery_l",
    "namePtBr": "Pectoral branches of thoraco-acromial artery Esquerdo",
    "nameEn": "Pectoral branches of thoraco-acromial artery (left)",
    "nameLatin": "Rami pectorales arteriae thoracoacromialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:pectoral_branches_of_thoraco_acromial_artery_r",
    "node": "Pectoral branches of thoraco-acromial artery.r",
    "fmaId": "TA2:pectoral_branches_of_thoraco_acromial_artery_r",
    "namePtBr": "Pectoral branches of thoraco-acromial artery Direito",
    "nameEn": "Pectoral branches of thoraco-acromial artery (right)",
    "nameLatin": "Rami pectorales arteriae thoracoacromialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:perforating_branches_of_plantar_metatarsal_arteries_l",
    "node": "Perforating branches of plantar metatarsal arteries.l",
    "fmaId": "TA2:perforating_branches_of_plantar_metatarsal_arteries_l",
    "namePtBr": "Perforating branches of plantar Metatarsal arteries Esquerdo",
    "nameEn": "Perforating branches of plantar metatarsal arteries (left)",
    "nameLatin": "Rami perforantes arteriarum metatarsearum plantarium",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:perforating_branches_of_plantar_metatarsal_arteries_r",
    "node": "Perforating branches of plantar metatarsal arteries.r",
    "fmaId": "TA2:perforating_branches_of_plantar_metatarsal_arteries_r",
    "namePtBr": "Perforating branches of plantar Metatarsal arteries Direito",
    "nameEn": "Perforating branches of plantar metatarsal arteries (right)",
    "nameLatin": "Rami perforantes arteriarum metatarsearum plantarium",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:anterior_septal_branches_of_anterior_ethmoidal_artery_l",
    "node": "Anterior septal branches of anterior ethmoidal artery.l",
    "fmaId": "TA2:anterior_septal_branches_of_anterior_ethmoidal_artery_l",
    "namePtBr": "Anterior septal branches of anterior ethmoidal artery Esquerdo",
    "nameEn": "Anterior septal branches of anterior ethmoidal artery (left)",
    "nameLatin": "Rami septales anteriores arteriae ethmoideae anterioris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_septal_branches_of_anterior_ethmoidal_artery_r",
    "node": "Anterior septal branches of anterior ethmoidal artery.r",
    "fmaId": "TA2:anterior_septal_branches_of_anterior_ethmoidal_artery_r",
    "namePtBr": "Anterior septal branches of anterior ethmoidal artery Direito",
    "nameEn": "Anterior septal branches of anterior ethmoidal artery (right)",
    "nameLatin": "Rami septales anteriores arteriae ethmoideae anterioris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:septal_branches_of_posterior_ethmoidal_artery_l",
    "node": "Septal branches of posterior ethmoidal artery.l",
    "fmaId": "TA2:septal_branches_of_posterior_ethmoidal_artery_l",
    "namePtBr": "Septal branches of posterior ethmoidal artery Esquerdo",
    "nameEn": "Septal branches of posterior ethmoidal artery (left)",
    "nameLatin": "Rami septales arteriae ethmoideae posterioris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:septal_branches_of_posterior_ethmoidal_artery_r",
    "node": "Septal branches of posterior ethmoidal artery.r",
    "fmaId": "TA2:septal_branches_of_posterior_ethmoidal_artery_r",
    "namePtBr": "Septal branches of posterior ethmoidal artery Direito",
    "nameEn": "Septal branches of posterior ethmoidal artery (right)",
    "nameLatin": "Rami septales arteriae ethmoideae posterioris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:septal_branches_of_anterior_interventricular_artery",
    "node": "Septal branches of anterior interventricular artery",
    "fmaId": "TA2:septal_branches_of_anterior_interventricular_artery",
    "namePtBr": "Septal branches of anterior interventricular artery",
    "nameEn": "Septal branches of anterior interventricular artery",
    "nameLatin": "Rami septales arteriae interventricularis anterioris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Cardiac vessels",
      "Arteries of heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_septal_branches_of_sphenopalatine_artery_l",
    "node": "Posterior septal branches of sphenopalatine artery.l",
    "fmaId": "TA2:posterior_septal_branches_of_sphenopalatine_artery_l",
    "namePtBr": "Posterior septal branches of sphenopalatine artery Esquerdo",
    "nameEn": "Posterior septal branches of sphenopalatine artery (left)",
    "nameLatin": "Rami septales posteriores arteriae sphenopalatinae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_septal_branches_of_sphenopalatine_artery_r",
    "node": "Posterior septal branches of sphenopalatine artery.r",
    "fmaId": "TA2:posterior_septal_branches_of_sphenopalatine_artery_r",
    "namePtBr": "Posterior septal branches of sphenopalatine artery Direito",
    "nameEn": "Posterior septal branches of sphenopalatine artery (right)",
    "nameLatin": "Rami septales posteriores arteriae sphenopalatinae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:temporal_branches_of_middle_cerebral_artery_l",
    "node": "Temporal branches of middle cerebral artery.l",
    "fmaId": "TA2:temporal_branches_of_middle_cerebral_artery_l",
    "namePtBr": "Temporal branches of middle cerebral artery Esquerdo",
    "nameEn": "Temporal branches of middle cerebral artery (left)",
    "nameLatin": "Rami temporales arteriae mediae cerebri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:temporal_branches_of_middle_cerebral_artery_r",
    "node": "Temporal branches of middle cerebral artery.r",
    "fmaId": "TA2:temporal_branches_of_middle_cerebral_artery_r",
    "namePtBr": "Temporal branches of middle cerebral artery Direito",
    "nameEn": "Temporal branches of middle cerebral artery (right)",
    "nameLatin": "Rami temporales arteriae mediae cerebri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:accessory_branch_of_middle_meningeal_artery_l",
    "node": "Accessory branch of middle meningeal artery.l",
    "fmaId": "TA2:accessory_branch_of_middle_meningeal_artery_l",
    "namePtBr": "Accessory branch of middle meningeal artery Esquerdo",
    "nameEn": "Accessory branch of middle meningeal artery (left)",
    "nameLatin": "Ramus accessorius arteriae meningeae mediae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:accessory_branch_of_middle_meningeal_artery_r",
    "node": "Accessory branch of middle meningeal artery.r",
    "fmaId": "TA2:accessory_branch_of_middle_meningeal_artery_r",
    "namePtBr": "Accessory branch of middle meningeal artery Direito",
    "nameEn": "Accessory branch of middle meningeal artery (right)",
    "nameLatin": "Ramus accessorius arteriae meningeae mediae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_branch_of_renal_artery_l",
    "node": "Anterior branch of renal artery.l",
    "fmaId": "TA2:anterior_branch_of_renal_artery_l",
    "namePtBr": "Anterior branch of renal artery Esquerdo",
    "nameEn": "Anterior branch of renal artery (left)",
    "nameLatin": "Ramus anterior arteriae renalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_branch_of_renal_artery_r",
    "node": "Anterior branch of renal artery.r",
    "fmaId": "TA2:anterior_branch_of_renal_artery_r",
    "namePtBr": "Anterior branch of renal artery Direito",
    "nameEn": "Anterior branch of renal artery (right)",
    "nameLatin": "Ramus anterior arteriae renalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_branch_of_medial_antebrachial_cutaneous_nerve_l",
    "node": "Anterior branch of medial antebrachial cutaneous nerve.l",
    "fmaId": "TA2:anterior_branch_of_medial_antebrachial_cutaneous_nerve_l",
    "namePtBr": "Anterior branch of medial antebrachial cutaneous nerve Esquerdo",
    "nameEn": "Anterior branch of medial antebrachial cutaneous nerve (left)",
    "nameLatin": "Ramus anterior nervi cutanei medialis antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Medial antebrachial cutaneous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_branch_of_medial_antebrachial_cutaneous_nerve_r",
    "node": "Anterior branch of medial antebrachial cutaneous nerve.r",
    "fmaId": "TA2:anterior_branch_of_medial_antebrachial_cutaneous_nerve_r",
    "namePtBr": "Anterior branch of medial antebrachial cutaneous nerve Direito",
    "nameEn": "Anterior branch of medial antebrachial cutaneous nerve (right)",
    "nameLatin": "Ramus anterior nervi cutanei medialis antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Medial antebrachial cutaneous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_branch_of_obturator_nerve_l",
    "node": "Anterior branch of obturator nerve.l",
    "fmaId": "TA2:anterior_branch_of_obturator_nerve_l",
    "namePtBr": "Anterior branch of obturator nerve Esquerdo",
    "nameEn": "Anterior branch of obturator nerve (left)",
    "nameLatin": "Ramus anterior nervi obturatorii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of anterior part of lumbar plexus",
      "Obturator nerve",
      "Anterior branch of obturator nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_branch_of_obturator_nerve_r",
    "node": "Anterior branch of obturator nerve.r",
    "fmaId": "TA2:anterior_branch_of_obturator_nerve_r",
    "namePtBr": "Anterior branch of obturator nerve Direito",
    "nameEn": "Anterior branch of obturator nerve (right)",
    "nameLatin": "Ramus anterior nervi obturatorii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of anterior part of lumbar plexus",
      "Obturator nerve",
      "Anterior branch of obturator nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:postcentral_arterial_branch_l",
    "node": "Postcentral arterial branch.l",
    "fmaId": "TA2:postcentral_arterial_branch_l",
    "namePtBr": "Postcentral arterial branch Esquerdo",
    "nameEn": "Postcentral arterial branch (left)",
    "nameLatin": "Ramus arteriosus postcentralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:postcentral_arterial_branch_r",
    "node": "Postcentral arterial branch.r",
    "fmaId": "TA2:postcentral_arterial_branch_r",
    "namePtBr": "Postcentral arterial branch Direito",
    "nameEn": "Postcentral arterial branch (right)",
    "nameLatin": "Ramus arteriosus postcentralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:ascending_branch_of_left_colic_artery",
    "node": "Ascending branch of left colic artery",
    "fmaId": "TA2:ascending_branch_of_left_colic_artery",
    "namePtBr": "Ascending branch of left colic artery",
    "nameEn": "Ascending branch of left colic artery",
    "nameLatin": "Ramus ascendens arteriae colicae sinistrae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_carpal_branch_of_ulnar_artery_l",
    "node": "Dorsal carpal branch of ulnar artery.l",
    "fmaId": "TA2:dorsal_carpal_branch_of_ulnar_artery_l",
    "namePtBr": "Dorsal carpal branch of ulnar artery Esquerdo",
    "nameEn": "Dorsal carpal branch of ulnar artery (left)",
    "nameLatin": "Ramus carpeus dorsalis arteriae ulnaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:dorsal_carpal_branch_of_ulnar_artery_r",
    "node": "Dorsal carpal branch of ulnar artery.r",
    "fmaId": "TA2:dorsal_carpal_branch_of_ulnar_artery_r",
    "namePtBr": "Dorsal carpal branch of ulnar artery Direito",
    "nameEn": "Dorsal carpal branch of ulnar artery (right)",
    "nameLatin": "Ramus carpeus dorsalis arteriae ulnaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:palmar_carpal_branch_of_radial_artery_l",
    "node": "Palmar carpal branch of radial artery.l",
    "fmaId": "TA2:palmar_carpal_branch_of_radial_artery_l",
    "namePtBr": "Palmar carpal branch of radial artery Esquerdo",
    "nameEn": "Palmar carpal branch of radial artery (left)",
    "nameLatin": "Ramus carpeus palmaris arteriae radialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:palmar_carpal_branch_of_radial_artery_r",
    "node": "Palmar carpal branch of radial artery.r",
    "fmaId": "TA2:palmar_carpal_branch_of_radial_artery_r",
    "namePtBr": "Palmar carpal branch of radial artery Direito",
    "nameEn": "Palmar carpal branch of radial artery (right)",
    "nameLatin": "Ramus carpeus palmaris arteriae radialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:colic_branch_of_ileocolic_artery",
    "node": "Colic branch of ileocolic artery",
    "fmaId": "TA2:colic_branch_of_ileocolic_artery",
    "namePtBr": "Colic branch of ileocolic artery",
    "nameEn": "Colic branch of ileocolic artery",
    "nameLatin": "Ramus colicus arteriae ileocolicae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:sural_communicating_branch_of_common_fibular_nerve_l",
    "node": "Sural communicating branch of common fibular nerve.l",
    "fmaId": "TA2:sural_communicating_branch_of_common_fibular_nerve_l",
    "namePtBr": "Sural communicating branch of common fibular nerve Esquerdo",
    "nameEn": "Sural communicating branch of common fibular nerve (left)",
    "nameLatin": "Ramus communicans suralis nervi fibularis communis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve",
      "Saphenous nerve"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:sural_communicating_branch_of_common_fibular_nerve_r",
    "node": "Sural communicating branch of common fibular nerve.r",
    "fmaId": "TA2:sural_communicating_branch_of_common_fibular_nerve_r",
    "namePtBr": "Sural communicating branch of common fibular nerve Direito",
    "nameEn": "Sural communicating branch of common fibular nerve (right)",
    "nameLatin": "Ramus communicans suralis nervi fibularis communis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve",
      "Saphenous nerve"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:descending_branch_of_lateral_circumflex_femoral_artery",
    "node": "Descending branch of lateral circumflex femoral artery",
    "fmaId": "TA2:descending_branch_of_lateral_circumflex_femoral_artery",
    "namePtBr": "Descending branch of lateral circumflex femoral artery",
    "nameEn": "Descending branch of lateral circumflex femoral artery",
    "nameLatin": "Ramus descendens arteriae circumflexae lateralis femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:descending_branch_of_lateral_circumflex_femoral_artery_l",
    "node": "Descending branch of lateral circumflex femoral artery.l",
    "fmaId": "TA2:descending_branch_of_lateral_circumflex_femoral_artery_l",
    "namePtBr": "Descending branch of lateral circumflex femoral artery Esquerdo",
    "nameEn": "Descending branch of lateral circumflex femoral artery (left)",
    "nameLatin": "Ramus descendens arteriae circumflexae lateralis femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:descending_branch_of_left_colic_artery",
    "node": "Descending branch of left colic artery",
    "fmaId": "TA2:descending_branch_of_left_colic_artery",
    "namePtBr": "Descending branch of left colic artery",
    "nameEn": "Descending branch of left colic artery",
    "nameLatin": "Ramus descendens arteriae colicae sinistrae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_branch_of_ulnar_nerve_l",
    "node": "Dorsal branch of ulnar nerve.l",
    "fmaId": "TA2:dorsal_branch_of_ulnar_nerve_l",
    "namePtBr": "Dorsal branch of ulnar nerve Esquerdo",
    "nameEn": "Dorsal branch of ulnar nerve (left)",
    "nameLatin": "Ramus dorsalis nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve",
      "Dorsal branch of ulnar nerve"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:dorsal_branch_of_ulnar_nerve_r",
    "node": "Dorsal branch of ulnar nerve.r",
    "fmaId": "TA2:dorsal_branch_of_ulnar_nerve_r",
    "namePtBr": "Dorsal branch of ulnar nerve Direito",
    "nameEn": "Dorsal branch of ulnar nerve (right)",
    "nameLatin": "Ramus dorsalis nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve",
      "Dorsal branch of ulnar nerve"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:femoral_branch_of_genitofemoral_nerve_l",
    "node": "Femoral branch of genitofemoral nerve.l",
    "fmaId": "TA2:femoral_branch_of_genitofemoral_nerve_l",
    "namePtBr": "Femoral branch of genitofemoral nerve Esquerdo",
    "nameEn": "Femoral branch of genitofemoral nerve (left)",
    "nameLatin": "Ramus femoralis nervi genitofemoralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of anterior part of lumbar plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:femoral_branch_of_genitofemoral_nerve_r",
    "node": "Femoral branch of genitofemoral nerve.r",
    "fmaId": "TA2:femoral_branch_of_genitofemoral_nerve_r",
    "namePtBr": "Femoral branch of genitofemoral nerve Direito",
    "nameEn": "Femoral branch of genitofemoral nerve (right)",
    "nameLatin": "Ramus femoralis nervi genitofemoralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of anterior part of lumbar plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:frontal_branch_of_superficial_temporal_artery_l",
    "node": "Frontal branch of superficial temporal artery.l",
    "fmaId": "TA2:frontal_branch_of_superficial_temporal_artery_l",
    "namePtBr": "Frontal branch of superficial temporal artery Esquerdo",
    "nameEn": "Frontal branch of superficial temporal artery (left)",
    "nameLatin": "Ramus frontalis arteriae temporalis superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:frontal_branch_of_superficial_temporal_artery_r",
    "node": "Frontal branch of superficial temporal artery.r",
    "fmaId": "TA2:frontal_branch_of_superficial_temporal_artery_r",
    "namePtBr": "Frontal branch of superficial temporal artery Direito",
    "nameEn": "Frontal branch of superficial temporal artery (right)",
    "nameLatin": "Ramus frontalis arteriae temporalis superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:genital_branch_of_genitofemoral_nerve_l",
    "node": "Genital branch of genitofemoral nerve.l",
    "fmaId": "TA2:genital_branch_of_genitofemoral_nerve_l",
    "namePtBr": "Genital branch of genitofemoral nerve Esquerdo",
    "nameEn": "Genital branch of genitofemoral nerve (left)",
    "nameLatin": "Ramus genitalis nervi genitofemoralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of anterior part of lumbar plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:genital_branch_of_genitofemoral_nerve_r",
    "node": "Genital branch of genitofemoral nerve.r",
    "fmaId": "TA2:genital_branch_of_genitofemoral_nerve_r",
    "namePtBr": "Genital branch of genitofemoral nerve Direito",
    "nameEn": "Genital branch of genitofemoral nerve (right)",
    "nameLatin": "Ramus genitalis nervi genitofemoralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of anterior part of lumbar plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:ileal_branch_of_ileocolic_artery",
    "node": "Ileal branch of ileocolic artery",
    "fmaId": "TA2:ileal_branch_of_ileocolic_artery",
    "namePtBr": "Ileal branch of ileocolic artery",
    "nameEn": "Ileal branch of ileocolic artery",
    "nameLatin": "Ramus ilealis arteriae ileocolicae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:iliacus_branch_of_iliolumbar_artery_l",
    "node": "Iliacus branch of iliolumbar artery.l",
    "fmaId": "TA2:iliacus_branch_of_iliolumbar_artery_l",
    "namePtBr": "Iliacus branch of iliolumbar artery Esquerdo",
    "nameEn": "Iliacus branch of iliolumbar artery (left)",
    "nameLatin": "Ramus iliacus arteriae iliolumbalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:iliacus_branch_of_iliolumbar_artery_r",
    "node": "Iliacus branch of iliolumbar artery.r",
    "fmaId": "TA2:iliacus_branch_of_iliolumbar_artery_r",
    "namePtBr": "Iliacus branch of iliolumbar artery Direito",
    "nameEn": "Iliacus branch of iliolumbar artery (right)",
    "nameLatin": "Ramus iliacus arteriae iliolumbalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:infrapatellar_branch_of_saphenous_nerve_l",
    "node": "Infrapatellar branch of saphenous nerve.l",
    "fmaId": "TA2:infrapatellar_branch_of_saphenous_nerve_l",
    "namePtBr": "Infrapatellar branch of saphenous nerve Esquerdo",
    "nameEn": "Infrapatellar branch of saphenous nerve (left)",
    "nameLatin": "Ramus infrapatellaris nervi sapheni",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve",
      "Saphenous nerve"
    ],
    "explosionVector": {
      "x": -0.7,
      "y": -0.5,
      "z": 0.7
    }
  },
  {
    "id": "za:infrapatellar_branch_of_saphenous_nerve_r",
    "node": "Infrapatellar branch of saphenous nerve.r",
    "fmaId": "TA2:infrapatellar_branch_of_saphenous_nerve_r",
    "namePtBr": "Infrapatellar branch of saphenous nerve Direito",
    "nameEn": "Infrapatellar branch of saphenous nerve (right)",
    "nameLatin": "Ramus infrapatellaris nervi sapheni",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of posterior part of lumbar plexus",
      "Femoral nerve",
      "Saphenous nerve"
    ],
    "explosionVector": {
      "x": 0.7,
      "y": -0.5,
      "z": 0.7
    }
  },
  {
    "id": "za:lumbar_branch_of_iliolumbar_artery_l",
    "node": "Lumbar branch of iliolumbar artery.l",
    "fmaId": "TA2:lumbar_branch_of_iliolumbar_artery_l",
    "namePtBr": "Lumbar branch of iliolumbar artery Esquerdo",
    "nameEn": "Lumbar branch of iliolumbar artery (left)",
    "nameLatin": "Ramus lumbalis arteriae iliolumbalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:lumbar_branch_of_iliolumbar_artery_r",
    "node": "Lumbar branch of iliolumbar artery.r",
    "fmaId": "TA2:lumbar_branch_of_iliolumbar_artery_r",
    "namePtBr": "Lumbar branch of iliolumbar artery Direito",
    "nameEn": "Lumbar branch of iliolumbar artery (right)",
    "nameLatin": "Ramus lumbalis arteriae iliolumbalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:meningeal_branch_of_maxillary_nerve_l",
    "node": "Meningeal branch of maxillary nerve.l",
    "fmaId": "TA2:meningeal_branch_of_maxillary_nerve_l",
    "namePtBr": "Meningeal branch of maxillary nerve Esquerdo",
    "nameEn": "Meningeal branch of maxillary nerve (left)",
    "nameLatin": "Ramus meningeus nervi maxillaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": -0.6,
      "y": -0.2,
      "z": 0.9
    }
  },
  {
    "id": "za:meningeal_branch_of_maxillary_nerve_r",
    "node": "Meningeal branch of maxillary nerve.r",
    "fmaId": "TA2:meningeal_branch_of_maxillary_nerve_r",
    "namePtBr": "Meningeal branch of maxillary nerve Direito",
    "nameEn": "Meningeal branch of maxillary nerve (right)",
    "nameLatin": "Ramus meningeus nervi maxillaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Cranial nerves",
      "Trigeminal nerve (V)"
    ],
    "explosionVector": {
      "x": 0.6,
      "y": -0.2,
      "z": 0.9
    }
  },
  {
    "id": "za:mental_branch_of_inferior_alveolar_artery_l",
    "node": "Mental branch of inferior alveolar artery.l",
    "fmaId": "TA2:mental_branch_of_inferior_alveolar_artery_l",
    "namePtBr": "Mental branch of inferior alveolar artery Esquerdo",
    "nameEn": "Mental branch of inferior alveolar artery (left)",
    "nameLatin": "Ramus mentalis arteriae alveolaris inferioris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:mental_branch_of_inferior_alveolar_artery_r",
    "node": "Mental branch of inferior alveolar artery.r",
    "fmaId": "TA2:mental_branch_of_inferior_alveolar_artery_r",
    "namePtBr": "Mental branch of inferior alveolar artery Direito",
    "nameEn": "Mental branch of inferior alveolar artery (right)",
    "nameLatin": "Ramus mentalis arteriae alveolaris inferioris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:mylohyoid_branch_of_inferior_alveolar_artery_l",
    "node": "Mylohyoid branch of inferior alveolar artery.l",
    "fmaId": "TA2:mylohyoid_branch_of_inferior_alveolar_artery_l",
    "namePtBr": "Mylohyoid branch of inferior alveolar artery Esquerdo",
    "nameEn": "Mylohyoid branch of inferior alveolar artery (left)",
    "nameLatin": "Ramus mylohyoideus arteriae alveolaris inferioris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:mylohyoid_branch_of_inferior_alveolar_artery_r",
    "node": "Mylohyoid branch of inferior alveolar artery.r",
    "fmaId": "TA2:mylohyoid_branch_of_inferior_alveolar_artery_r",
    "namePtBr": "Mylohyoid branch of inferior alveolar artery Direito",
    "nameEn": "Mylohyoid branch of inferior alveolar artery (right)",
    "nameLatin": "Ramus mylohyoideus arteriae alveolaris inferioris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:palmar_branch_of_median_nerve_l",
    "node": "Palmar branch of median nerve.l",
    "fmaId": "TA2:palmar_branch_of_median_nerve_l",
    "namePtBr": "Palmar branch of median nerve Esquerdo",
    "nameEn": "Palmar branch of median nerve (left)",
    "nameLatin": "Ramus palmaris nervi mediani",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Median nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:palmar_branch_of_median_nerve_r",
    "node": "Palmar branch of median nerve.r",
    "fmaId": "TA2:palmar_branch_of_median_nerve_r",
    "namePtBr": "Palmar branch of median nerve Direito",
    "nameEn": "Palmar branch of median nerve (right)",
    "nameLatin": "Ramus palmaris nervi mediani",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Median nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:palmar_branch_of_ulnar_nerve_l",
    "node": "Palmar branch of ulnar nerve.l",
    "fmaId": "TA2:palmar_branch_of_ulnar_nerve_l",
    "namePtBr": "Palmar branch of ulnar nerve Esquerdo",
    "nameEn": "Palmar branch of ulnar nerve (left)",
    "nameLatin": "Ramus palmaris nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:palmar_branch_of_ulnar_nerve_r",
    "node": "Palmar branch of ulnar nerve.r",
    "fmaId": "TA2:palmar_branch_of_ulnar_nerve_r",
    "namePtBr": "Palmar branch of ulnar nerve Direito",
    "nameEn": "Palmar branch of ulnar nerve (right)",
    "nameLatin": "Ramus palmaris nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:posterior_branch_of_renal_artery_l",
    "node": "Posterior branch of renal artery.l",
    "fmaId": "TA2:posterior_branch_of_renal_artery_l",
    "namePtBr": "Posterior branch of renal artery Esquerdo",
    "nameEn": "Posterior branch of renal artery (left)",
    "nameLatin": "Ramus posterior arteriae renalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_branch_of_renal_artery_r",
    "node": "Posterior branch of renal artery.r",
    "fmaId": "TA2:posterior_branch_of_renal_artery_r",
    "namePtBr": "Posterior branch of renal artery Direito",
    "nameEn": "Posterior branch of renal artery (right)",
    "nameLatin": "Ramus posterior arteriae renalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_branch_of_medial_antebrachial_cutaneous_nerve_l",
    "node": "Posterior branch of medial antebrachial cutaneous nerve.l",
    "fmaId": "TA2:posterior_branch_of_medial_antebrachial_cutaneous_nerve_l",
    "namePtBr": "Posterior branch of medial antebrachial cutaneous nerve Esquerdo",
    "nameEn": "Posterior branch of medial antebrachial cutaneous nerve (left)",
    "nameLatin": "Ramus posterior nervi cutanei medialis antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Medial antebrachial cutaneous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_branch_of_medial_antebrachial_cutaneous_nerve_r",
    "node": "Posterior branch of medial antebrachial cutaneous nerve.r",
    "fmaId": "TA2:posterior_branch_of_medial_antebrachial_cutaneous_nerve_r",
    "namePtBr": "Posterior branch of medial antebrachial cutaneous nerve Direito",
    "nameEn": "Posterior branch of medial antebrachial cutaneous nerve (right)",
    "nameLatin": "Ramus posterior nervi cutanei medialis antebrachii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Medial antebrachial cutaneous nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_branch_of_obturator_nerve_l",
    "node": "Posterior branch of obturator nerve.l",
    "fmaId": "TA2:posterior_branch_of_obturator_nerve_l",
    "namePtBr": "Posterior branch of obturator nerve Esquerdo",
    "nameEn": "Posterior branch of obturator nerve (left)",
    "nameLatin": "Ramus posterior nervi obturatorii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of anterior part of lumbar plexus",
      "Obturator nerve",
      "Posterior branch of obturator nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_branch_of_obturator_nerve_r",
    "node": "Posterior branch of obturator nerve.r",
    "fmaId": "TA2:posterior_branch_of_obturator_nerve_r",
    "namePtBr": "Posterior branch of obturator nerve Direito",
    "nameEn": "Posterior branch of obturator nerve (right)",
    "nameLatin": "Ramus posterior nervi obturatorii",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Lumbosacral plexus",
      "Lumbar plexus",
      "Branches of anterior part of lumbar plexus",
      "Obturator nerve",
      "Posterior branch of obturator nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:deep_branch_of_radial_nerve_l",
    "node": "Deep branch of radial nerve.l",
    "fmaId": "TA2:deep_branch_of_radial_nerve_l",
    "namePtBr": "Deep branch of radial nerve Esquerdo",
    "nameEn": "Deep branch of radial nerve (left)",
    "nameLatin": "Ramus profundus nervi radialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve",
      "Deep branch of radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:deep_branch_of_radial_nerve_r",
    "node": "Deep branch of radial nerve.r",
    "fmaId": "TA2:deep_branch_of_radial_nerve_r",
    "namePtBr": "Deep branch of radial nerve Direito",
    "nameEn": "Deep branch of radial nerve (right)",
    "nameLatin": "Ramus profundus nervi radialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve",
      "Deep branch of radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:deep_branch_of_ulnar_nerve_l",
    "node": "Deep branch of ulnar nerve.l",
    "fmaId": "TA2:deep_branch_of_ulnar_nerve_l",
    "namePtBr": "Deep branch of ulnar nerve Esquerdo",
    "nameEn": "Deep branch of ulnar nerve (left)",
    "nameLatin": "Ramus profundus nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:deep_branch_of_ulnar_nerve_r",
    "node": "Deep branch of ulnar nerve.r",
    "fmaId": "TA2:deep_branch_of_ulnar_nerve_r",
    "namePtBr": "Deep branch of ulnar nerve Direito",
    "nameEn": "Deep branch of ulnar nerve (right)",
    "nameLatin": "Ramus profundus nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:spinal_branch_of_iliolumbar_artery_l",
    "node": "Spinal branch of iliolumbar artery.l",
    "fmaId": "TA2:spinal_branch_of_iliolumbar_artery_l",
    "namePtBr": "Spinal branch of iliolumbar artery Esquerdo",
    "nameEn": "Spinal branch of iliolumbar artery (left)",
    "nameLatin": "Ramus spinalis arteriae iliolumbalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:spinal_branch_of_iliolumbar_artery_r",
    "node": "Spinal branch of iliolumbar artery.r",
    "fmaId": "TA2:spinal_branch_of_iliolumbar_artery_r",
    "namePtBr": "Spinal branch of iliolumbar artery Direito",
    "nameEn": "Spinal branch of iliolumbar artery (right)",
    "nameLatin": "Ramus spinalis arteriae iliolumbalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:superficial_branch_of_medial_plantar_artery_l",
    "node": "Superficial branch of medial plantar artery.l",
    "fmaId": "TA2:superficial_branch_of_medial_plantar_artery_l",
    "namePtBr": "Superficial branch of medial plantar artery Esquerdo",
    "nameEn": "Superficial branch of medial plantar artery (left)",
    "nameLatin": "Ramus superficialis arteriae plantaris medialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_branch_of_medial_plantar_artery_r",
    "node": "Superficial branch of medial plantar artery.r",
    "fmaId": "TA2:superficial_branch_of_medial_plantar_artery_r",
    "namePtBr": "Superficial branch of medial plantar artery Direito",
    "nameEn": "Superficial branch of medial plantar artery (right)",
    "nameLatin": "Ramus superficialis arteriae plantaris medialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_branch_of_radial_nerve_l",
    "node": "Superficial branch of radial nerve.l",
    "fmaId": "TA2:superficial_branch_of_radial_nerve_l",
    "namePtBr": "Superficial branch of radial nerve Esquerdo",
    "nameEn": "Superficial branch of radial nerve (left)",
    "nameLatin": "Ramus superficialis nervi radialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve",
      "Superficial branch of radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superficial_branch_of_radial_nerve_r",
    "node": "Superficial branch of radial nerve.r",
    "fmaId": "TA2:superficial_branch_of_radial_nerve_r",
    "namePtBr": "Superficial branch of radial nerve Direito",
    "nameEn": "Superficial branch of radial nerve (right)",
    "nameLatin": "Ramus superficialis nervi radialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of posterior cord of brachial plexus",
      "Radial nerve",
      "Superficial branch of radial nerve"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superficial_branch_of_ulnar_nerve_l",
    "node": "Superficial branch of ulnar nerve.l",
    "fmaId": "TA2:superficial_branch_of_ulnar_nerve_l",
    "namePtBr": "Superficial branch of ulnar nerve Esquerdo",
    "nameEn": "Superficial branch of ulnar nerve (left)",
    "nameLatin": "Ramus superficialis nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve",
      "Superficial branch of ulnar nerve"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:superficial_branch_of_ulnar_nerve_r",
    "node": "Superficial branch of ulnar nerve.r",
    "fmaId": "TA2:superficial_branch_of_ulnar_nerve_r",
    "namePtBr": "Superficial branch of ulnar nerve Direito",
    "nameEn": "Superficial branch of ulnar nerve (right)",
    "nameLatin": "Ramus superficialis nervi ulnaris",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Branches of medial cord of brachial plexus",
      "Ulnar nerve",
      "Superficial branch of ulnar nerve"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:kidney_l",
    "node": "Kidney.l",
    "fmaId": "TA2:kidney_l",
    "namePtBr": "Kidney Esquerdo",
    "nameEn": "Kidney (left)",
    "nameLatin": "Ren",
    "chapter": 9,
    "system": "renal",
    "meshFile": "renal_male.glb",
    "path": [
      "Urinary system"
    ],
    "explosionVector": {
      "x": -0.7,
      "y": -0.2,
      "z": -0.5
    }
  },
  {
    "id": "za:kidney_r",
    "node": "Kidney.r",
    "fmaId": "TA2:kidney_r",
    "namePtBr": "Kidney Direito",
    "nameEn": "Kidney (right)",
    "nameLatin": "Ren",
    "chapter": 9,
    "system": "renal",
    "meshFile": "renal_male.glb",
    "path": [
      "Urinary system"
    ],
    "explosionVector": {
      "x": 0.7,
      "y": -0.2,
      "z": -0.5
    }
  },
  {
    "id": "za:dorsal_carpal_anastomosis_l",
    "node": "Dorsal carpal anastomosis.l",
    "fmaId": "TA2:dorsal_carpal_anastomosis_l",
    "namePtBr": "Dorsal carpal anastomosis Esquerdo",
    "nameEn": "Dorsal carpal anastomosis (left)",
    "nameLatin": "Rete dorsale carpi",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_carpal_anastomosis_r",
    "node": "Dorsal carpal anastomosis.r",
    "fmaId": "TA2:dorsal_carpal_anastomosis_r",
    "namePtBr": "Dorsal carpal anastomosis Direito",
    "nameEn": "Dorsal carpal anastomosis (right)",
    "nameLatin": "Rete dorsale carpi",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:patellar_anastomosis_l",
    "node": "Patellar anastomosis.l",
    "fmaId": "TA2:patellar_anastomosis_l",
    "namePtBr": "Patellar anastomosis Esquerdo",
    "nameEn": "Patellar anastomosis (left)",
    "nameLatin": "Rete patellare",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": -0.7,
      "y": -0.5,
      "z": 0.7
    }
  },
  {
    "id": "za:patellar_anastomosis_r",
    "node": "Patellar anastomosis.r",
    "fmaId": "TA2:patellar_anastomosis_r",
    "namePtBr": "Patellar anastomosis Direito",
    "nameEn": "Patellar anastomosis (right)",
    "nameLatin": "Rete patellare",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0.7,
      "y": -0.5,
      "z": 0.7
    }
  },
  {
    "id": "za:dorsal_venous_network_of_hand_l",
    "node": "Dorsal venous network of hand.l",
    "fmaId": "TA2:dorsal_venous_network_of_hand_l",
    "namePtBr": "Dorsal venous network of hand Esquerdo",
    "nameEn": "Dorsal venous network of hand (left)",
    "nameLatin": "Rete venosum dorsale manus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_venous_network_of_hand_r",
    "node": "Dorsal venous network of hand.r",
    "fmaId": "TA2:dorsal_venous_network_of_hand_r",
    "namePtBr": "Dorsal venous network of hand Direito",
    "nameEn": "Dorsal venous network of hand (right)",
    "nameLatin": "Rete venosum dorsale manus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:retina_l",
    "node": "Retina.l",
    "fmaId": "TA2:retina_l",
    "namePtBr": "Retina Esquerdo",
    "nameEn": "Retina (left)",
    "nameLatin": "Retina",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:retina_r",
    "node": "Retina.r",
    "fmaId": "TA2:retina_r",
    "namePtBr": "Retina Direito",
    "nameEn": "Retina (right)",
    "nameLatin": "Retina",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lacrimal_sac_l",
    "node": "Lacrimal sac.l",
    "fmaId": "TA2:lacrimal_sac_l",
    "namePtBr": "Lacrimal sac Esquerdo",
    "nameEn": "Lacrimal sac (left)",
    "nameLatin": "Saccus lacrimalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eye*",
      "Accessory visual structures",
      "Lacrimal apparatus",
      "Lacrimal sac"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lacrimal_sac_r",
    "node": "Lacrimal sac.r",
    "fmaId": "TA2:lacrimal_sac_r",
    "namePtBr": "Lacrimal sac Direito",
    "nameEn": "Lacrimal sac (right)",
    "nameLatin": "Saccus lacrimalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eye*",
      "Accessory visual structures",
      "Lacrimal apparatus",
      "Lacrimal sac"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:scapula_l",
    "node": "Scapula.l",
    "fmaId": "TA2:scapula_l",
    "namePtBr": "Escápula Esquerda",
    "nameEn": "Scapula (left)",
    "nameLatin": "Scapula",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of upper limb",
      "Bones of pectoral girdle"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:scapula_r",
    "node": "Scapula.r",
    "fmaId": "TA2:scapula_r",
    "namePtBr": "Escápula Direita",
    "nameEn": "Scapula (right)",
    "nameLatin": "Scapula",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of upper limb",
      "Bones of pectoral girdle"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:sclera_l",
    "node": "Sclera.l",
    "fmaId": "TA2:sclera_l",
    "namePtBr": "Sclera Esquerdo",
    "nameEn": "Sclera (left)",
    "nameLatin": "Sclera",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:sclera_r",
    "node": "Sclera.r",
    "fmaId": "TA2:sclera_r",
    "namePtBr": "Sclera Direito",
    "nameEn": "Sclera (right)",
    "nameLatin": "Sclera",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_segment_of_eyeball_l",
    "node": "Anterior segment of eyeball.l",
    "fmaId": "TA2:anterior_segment_of_eyeball_l",
    "namePtBr": "Anterior segment of eyeball Esquerdo",
    "nameEn": "Anterior segment of eyeball (left)",
    "nameLatin": "Segmentum anterius bulbi oculi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_segment_of_eyeball_r",
    "node": "Anterior segment of eyeball.r",
    "fmaId": "TA2:anterior_segment_of_eyeball_r",
    "namePtBr": "Anterior segment of eyeball Direito",
    "nameEn": "Anterior segment of eyeball (right)",
    "nameLatin": "Segmentum anterius bulbi oculi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_lateral_segment_of_liver_vi",
    "node": "Anterior lateral segment of liver (VI)",
    "fmaId": "TA2:anterior_lateral_segment_of_liver_vi",
    "namePtBr": "Anterior lateral segment of liver (VI)",
    "nameEn": "Anterior lateral segment of liver (VI)",
    "nameLatin": "Segmentum anterius laterale dextrum hepatis (VI",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Liver"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:left_anterior_lateral_segment_of_liver_iii",
    "node": "Left anterior lateral segment of liver (III)",
    "fmaId": "TA2:left_anterior_lateral_segment_of_liver_iii",
    "namePtBr": "Left anterior lateral segment of liver (III)",
    "nameEn": "Left anterior lateral segment of liver (III)",
    "nameLatin": "Segmentum anterius laterale sinistrum hepatis (III",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Liver"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_medial_segment_of_liver_v",
    "node": "Anterior medial segment of liver (V)",
    "fmaId": "TA2:anterior_medial_segment_of_liver_v",
    "namePtBr": "Anterior medial segment of liver (V)",
    "nameEn": "Anterior medial segment of liver (V)",
    "nameLatin": "Segmentum anterius mediale dextrum hepatis (V",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Liver"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:left_medial_segment_of_liver_iv",
    "node": "Left medial segment of liver (IV)",
    "fmaId": "TA2:left_medial_segment_of_liver_iv",
    "namePtBr": "Left medial segment of liver (IV)",
    "nameEn": "Left medial segment of liver (IV)",
    "nameLatin": "Segmentum mediale sinistrum hepatis (IV",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Liver"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_segment_of_eyeball_l",
    "node": "Posterior segment of eyeball.l",
    "fmaId": "TA2:posterior_segment_of_eyeball_l",
    "namePtBr": "Posterior segment of eyeball Esquerdo",
    "nameEn": "Posterior segment of eyeball (left)",
    "nameLatin": "Segmentum posterius bulbi oculi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_segment_of_eyeball_r",
    "node": "Posterior segment of eyeball.r",
    "fmaId": "TA2:posterior_segment_of_eyeball_r",
    "namePtBr": "Posterior segment of eyeball Direito",
    "nameEn": "Posterior segment of eyeball (right)",
    "nameLatin": "Segmentum posterius bulbi oculi",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Eyeball"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_segment_of_liver_i",
    "node": "Posterior segment of liver (I)",
    "fmaId": "TA2:posterior_segment_of_liver_i",
    "namePtBr": "Posterior segment of liver (I)",
    "nameEn": "Posterior segment of liver (I)",
    "nameLatin": "Segmentum posterius hepatis (I",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Liver"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_lateral_segment_of_liver_vii",
    "node": "Posterior lateral segment of liver (VII)",
    "fmaId": "TA2:posterior_lateral_segment_of_liver_vii",
    "namePtBr": "Posterior lateral segment of liver (VII)",
    "nameEn": "Posterior lateral segment of liver (VII)",
    "nameLatin": "Segmentum posterius laterale dextrum hepatis (VII",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Liver"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:left_posterior_lateral_segment_of_liver_ii",
    "node": "Left posterior lateral segment of liver (II)",
    "fmaId": "TA2:left_posterior_lateral_segment_of_liver_ii",
    "namePtBr": "Left posterior lateral segment of liver (II)",
    "nameEn": "Left posterior lateral segment of liver (II)",
    "nameLatin": "Segmentum posterius laterale sinistrum hepatis (II",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Liver"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_medial_segment_of_liver_viii",
    "node": "Posterior medial segment of liver (VIII)",
    "fmaId": "TA2:posterior_medial_segment_of_liver_viii",
    "namePtBr": "Posterior medial segment of liver (VIII)",
    "nameEn": "Posterior medial segment of liver (VIII)",
    "nameLatin": "Segmentum posterius mediale dextrum hepatis (VIII",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Liver"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:seventh_rib_l",
    "node": "Seventh rib.l",
    "fmaId": "TA2:seventh_rib_l",
    "namePtBr": "7ª Costela Esquerda",
    "nameEn": "Seventh rib (left)",
    "nameLatin": "Septima costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:seventh_rib_r",
    "node": "Seventh rib.r",
    "fmaId": "TA2:seventh_rib_r",
    "namePtBr": "7ª Costela Direita",
    "nameEn": "Seventh rib (right)",
    "nameLatin": "Septima costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:septum_pellucidum",
    "node": "Septum pellucidum",
    "fmaId": "TA2:septum_pellucidum",
    "namePtBr": "Septum pellucidum",
    "nameEn": "Septum pellucidum",
    "nameLatin": "Septum pellucidum",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:sixth_rib_l",
    "node": "Sixth rib.l",
    "fmaId": "TA2:sixth_rib_l",
    "namePtBr": "6ª Costela Esquerda",
    "nameEn": "Sixth rib (left)",
    "nameLatin": "Sexta costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:sixth_rib_r",
    "node": "Sixth rib.r",
    "fmaId": "TA2:sixth_rib_r",
    "namePtBr": "6ª Costela Direita",
    "nameEn": "Sixth rib (right)",
    "nameLatin": "Sexta costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:cavernous_sinus_l",
    "node": "Cavernous sinus.l",
    "fmaId": "TA2:cavernous_sinus_l",
    "namePtBr": "Cavernous sinus Esquerdo",
    "nameEn": "Cavernous sinus (left)",
    "nameLatin": "Sinus cavernosus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:cavernous_sinus_r",
    "node": "Cavernous sinus.r",
    "fmaId": "TA2:cavernous_sinus_r",
    "namePtBr": "Cavernous sinus Direito",
    "nameEn": "Cavernous sinus (right)",
    "nameLatin": "Sinus cavernosus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:coronary_sinus",
    "node": "Coronary sinus",
    "fmaId": "TA2:coronary_sinus",
    "namePtBr": "Coronary sinus",
    "nameEn": "Coronary sinus",
    "nameLatin": "Sinus coronarius",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Cardiac vessels",
      "Cardiac veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_intercavernous_sinus",
    "node": "Anterior intercavernous sinus",
    "fmaId": "TA2:anterior_intercavernous_sinus",
    "namePtBr": "Anterior intercavernous sinus",
    "nameEn": "Anterior intercavernous sinus",
    "nameLatin": "Sinus intercavernosus anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_intercavernous_sinus",
    "node": "Posterior intercavernous sinus",
    "fmaId": "TA2:posterior_intercavernous_sinus",
    "namePtBr": "Posterior intercavernous sinus",
    "nameEn": "Posterior intercavernous sinus",
    "nameLatin": "Sinus intercavernosus posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:occipital_sinus",
    "node": "Occipital sinus",
    "fmaId": "TA2:occipital_sinus",
    "namePtBr": "Occipital sinus",
    "nameEn": "Occipital sinus",
    "nameLatin": "Sinus occipitalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:sinus_of_frontal_bone",
    "node": "Sinus of frontal bone",
    "fmaId": "TA2:sinus_of_frontal_bone",
    "namePtBr": "Sinus of frontal Osso",
    "nameEn": "Sinus of frontal bone",
    "nameLatin": "Sinus ossis frontalis",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.7,
      "z": 1.2
    }
  },
  {
    "id": "za:sinus_of_sphenoid_bone",
    "node": "Sinus of sphenoid bone",
    "fmaId": "TA2:sinus_of_sphenoid_bone",
    "namePtBr": "Sinus of sphenoid Osso",
    "nameEn": "Sinus of sphenoid bone",
    "nameLatin": "Sinus ossis sphenoidei",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.4,
      "z": 0.2
    }
  },
  {
    "id": "za:inferior_petrosal_sinus_l",
    "node": "Inferior petrosal sinus.l",
    "fmaId": "TA2:inferior_petrosal_sinus_l",
    "namePtBr": "Inferior petrosal sinus Esquerdo",
    "nameEn": "Inferior petrosal sinus (left)",
    "nameLatin": "Sinus petrosus inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_petrosal_sinus_r",
    "node": "Inferior petrosal sinus.r",
    "fmaId": "TA2:inferior_petrosal_sinus_r",
    "namePtBr": "Inferior petrosal sinus Direito",
    "nameEn": "Inferior petrosal sinus (right)",
    "nameLatin": "Sinus petrosus inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_petrosal_sinus_l",
    "node": "Superior petrosal sinus.l",
    "fmaId": "TA2:superior_petrosal_sinus_l",
    "namePtBr": "Superior petrosal sinus Esquerdo",
    "nameEn": "Superior petrosal sinus (left)",
    "nameLatin": "Sinus petrosus superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_petrosal_sinus_r",
    "node": "Superior petrosal sinus.r",
    "fmaId": "TA2:superior_petrosal_sinus_r",
    "namePtBr": "Superior petrosal sinus Direito",
    "nameEn": "Superior petrosal sinus (right)",
    "nameLatin": "Sinus petrosus superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:straight_sinus",
    "node": "Straight sinus",
    "fmaId": "TA2:straight_sinus",
    "namePtBr": "Straight sinus",
    "nameEn": "Straight sinus",
    "nameLatin": "Sinus rectus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_sagittal_sinus",
    "node": "Inferior sagittal sinus",
    "fmaId": "TA2:inferior_sagittal_sinus",
    "namePtBr": "Inferior sagittal sinus",
    "nameEn": "Inferior sagittal sinus",
    "nameLatin": "Sinus sagittalis inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_sagittal_sinus",
    "node": "Superior sagittal sinus",
    "fmaId": "TA2:superior_sagittal_sinus",
    "namePtBr": "Superior sagittal sinus",
    "nameEn": "Superior sagittal sinus",
    "nameLatin": "Sinus sagittalis superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:sigmoid_sinus_l",
    "node": "Sigmoid sinus.l",
    "fmaId": "TA2:sigmoid_sinus_l",
    "namePtBr": "Sigmoid sinus Esquerdo",
    "nameEn": "Sigmoid sinus (left)",
    "nameLatin": "Sinus sigmoideus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:sigmoid_sinus_r",
    "node": "Sigmoid sinus.r",
    "fmaId": "TA2:sigmoid_sinus_r",
    "namePtBr": "Sigmoid sinus Direito",
    "nameEn": "Sigmoid sinus (right)",
    "nameLatin": "Sinus sigmoideus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:transverse_sinus_l",
    "node": "Transverse sinus.l",
    "fmaId": "TA2:transverse_sinus_l",
    "namePtBr": "Transverse sinus Esquerdo",
    "nameEn": "Transverse sinus (left)",
    "nameLatin": "Sinus transversus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:transverse_sinus_r",
    "node": "Transverse sinus.r",
    "fmaId": "TA2:transverse_sinus_r",
    "namePtBr": "Transverse sinus Direito",
    "nameEn": "Transverse sinus (right)",
    "nameLatin": "Sinus transversus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:stapes_l",
    "node": "Stapes.l",
    "fmaId": "TA2:stapes_l",
    "namePtBr": "Stapes Esquerdo",
    "nameEn": "Stapes (left)",
    "nameLatin": "Stapes",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": -0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:stapes_r",
    "node": "Stapes.r",
    "fmaId": "TA2:stapes_r",
    "namePtBr": "Stapes Direito",
    "nameEn": "Stapes (right)",
    "nameLatin": "Stapes",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:stria_medullaris_thalami_l",
    "node": "Stria medullaris thalami.l",
    "fmaId": "TA2:stria_medullaris_thalami_l",
    "namePtBr": "Stria medullaris thalami Esquerdo",
    "nameEn": "Stria medullaris thalami (left)",
    "nameLatin": "Stria medullaris thalami",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:stria_medullaris_thalami_r",
    "node": "Stria medullaris thalami.r",
    "fmaId": "TA2:stria_medullaris_thalami_r",
    "namePtBr": "Stria medullaris thalami Direito",
    "nameEn": "Stria medullaris thalami (right)",
    "nameLatin": "Stria medullaris thalami",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:stria_terminalis_l",
    "node": "Stria terminalis.l",
    "fmaId": "TA2:stria_terminalis_l",
    "namePtBr": "Stria terminalis Esquerdo",
    "nameEn": "Stria terminalis (left)",
    "nameLatin": "Stria terminalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:stria_terminalis_r",
    "node": "Stria terminalis.r",
    "fmaId": "TA2:stria_terminalis_r",
    "namePtBr": "Stria terminalis Direito",
    "nameEn": "Stria terminalis (right)",
    "nameLatin": "Stria terminalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:white_matter_of_spinal_cord",
    "node": "White matter of spinal cord",
    "fmaId": "TA2:white_matter_of_spinal_cord",
    "namePtBr": "White matter of spinal cord",
    "nameEn": "White matter of spinal cord",
    "nameLatin": "Substantia alba medullae spinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:white_matter_of_telencephalon_l",
    "node": "White matter of telencephalon.l",
    "fmaId": "TA2:white_matter_of_telencephalon_l",
    "namePtBr": "White matter of telencephalon Esquerdo",
    "nameEn": "White matter of telencephalon (left)",
    "nameLatin": "Substantia alba telencephali",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "White matter of telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:white_matter_of_telencephalon_r",
    "node": "White matter of telencephalon.r",
    "fmaId": "TA2:white_matter_of_telencephalon_r",
    "namePtBr": "White matter of telencephalon Direito",
    "nameEn": "White matter of telencephalon (right)",
    "nameLatin": "Substantia alba telencephali",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "White matter of telencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_intermediate_substance",
    "node": "Lateral intermediate substance",
    "fmaId": "TA2:lateral_intermediate_substance",
    "namePtBr": "Lateral intermediate substance",
    "nameEn": "Lateral intermediate substance",
    "nameLatin": "Substantia intermedia lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:calcarine_sulcus_l",
    "node": "Calcarine sulcus.l",
    "fmaId": "TA2:calcarine_sulcus_l",
    "namePtBr": "Calcarine sulcus Esquerdo",
    "nameEn": "Calcarine sulcus (left)",
    "nameLatin": "Sulcus calcarinus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Occipital lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:calcarine_sulcus_r",
    "node": "Calcarine sulcus.r",
    "fmaId": "TA2:calcarine_sulcus_r",
    "namePtBr": "Calcarine sulcus Direito",
    "nameEn": "Calcarine sulcus (right)",
    "nameLatin": "Sulcus calcarinus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Occipital lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:central_sulcus_l",
    "node": "Central sulcus.l",
    "fmaId": "TA2:central_sulcus_l",
    "namePtBr": "Central sulcus Esquerdo",
    "nameEn": "Central sulcus (left)",
    "nameLatin": "Sulcus centralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Interlobular sulci"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:central_sulcus_r",
    "node": "Central sulcus.r",
    "fmaId": "TA2:central_sulcus_r",
    "namePtBr": "Central sulcus Direito",
    "nameEn": "Central sulcus (right)",
    "nameLatin": "Sulcus centralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Interlobular sulci"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:circular_sulcus_of_insula_l",
    "node": "Circular sulcus of insula.l",
    "fmaId": "TA2:circular_sulcus_of_insula_l",
    "namePtBr": "Circular sulcus of insula Esquerdo",
    "nameEn": "Circular sulcus of insula (left)",
    "nameLatin": "Sulcus circularis insulae",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Interlobular sulci"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:circular_sulcus_of_insula_r",
    "node": "Circular sulcus of insula.r",
    "fmaId": "TA2:circular_sulcus_of_insula_r",
    "namePtBr": "Circular sulcus of insula Direito",
    "nameEn": "Circular sulcus of insula (right)",
    "nameLatin": "Sulcus circularis insulae",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Interlobular sulci"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:collateral_sulcus_l",
    "node": "Collateral sulcus.l",
    "fmaId": "TA2:collateral_sulcus_l",
    "namePtBr": "Collateral sulcus Esquerdo",
    "nameEn": "Collateral sulcus (left)",
    "nameLatin": "Sulcus collateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Interlobular sulci"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:collateral_sulcus_r",
    "node": "Collateral sulcus.r",
    "fmaId": "TA2:collateral_sulcus_r",
    "namePtBr": "Collateral sulcus Direito",
    "nameEn": "Collateral sulcus (right)",
    "nameLatin": "Sulcus collateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Interlobular sulci"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_frontal_sulcus_l",
    "node": "Inferior frontal sulcus.l",
    "fmaId": "TA2:inferior_frontal_sulcus_l",
    "namePtBr": "Inferior frontal sulcus Esquerdo",
    "nameEn": "Inferior frontal sulcus (left)",
    "nameLatin": "Sulcus frontalis inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_frontal_sulcus_r",
    "node": "Inferior frontal sulcus.r",
    "fmaId": "TA2:inferior_frontal_sulcus_r",
    "namePtBr": "Inferior frontal sulcus Direito",
    "nameEn": "Inferior frontal sulcus (right)",
    "nameLatin": "Sulcus frontalis inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_frontal_sulcus_l",
    "node": "Superior frontal sulcus.l",
    "fmaId": "TA2:superior_frontal_sulcus_l",
    "namePtBr": "Superior frontal sulcus Esquerdo",
    "nameEn": "Superior frontal sulcus (left)",
    "nameLatin": "Sulcus frontalis superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_frontal_sulcus_r",
    "node": "Superior frontal sulcus.r",
    "fmaId": "TA2:superior_frontal_sulcus_r",
    "namePtBr": "Superior frontal sulcus Direito",
    "nameEn": "Superior frontal sulcus (right)",
    "nameLatin": "Sulcus frontalis superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:intraparietal_sulcus_l",
    "node": "Intraparietal sulcus.l",
    "fmaId": "TA2:intraparietal_sulcus_l",
    "namePtBr": "Intraparietal sulcus Esquerdo",
    "nameEn": "Intraparietal sulcus (left)",
    "nameLatin": "Sulcus intraparietalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:intraparietal_sulcus_r",
    "node": "Intraparietal sulcus.r",
    "fmaId": "TA2:intraparietal_sulcus_r",
    "namePtBr": "Intraparietal sulcus Direito",
    "nameEn": "Intraparietal sulcus (right)",
    "nameLatin": "Sulcus intraparietalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:transverse_occipital_sulcus_l",
    "node": "Transverse occipital sulcus.l",
    "fmaId": "TA2:transverse_occipital_sulcus_l",
    "namePtBr": "Transverse occipital sulcus Esquerdo",
    "nameEn": "Transverse occipital sulcus (left)",
    "nameLatin": "Sulcus occipitalis transversus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Occipital lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:transverse_occipital_sulcus_r",
    "node": "Transverse occipital sulcus.r",
    "fmaId": "TA2:transverse_occipital_sulcus_r",
    "namePtBr": "Transverse occipital sulcus Direito",
    "nameEn": "Transverse occipital sulcus (right)",
    "nameLatin": "Sulcus occipitalis transversus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Occipital lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:olfactory_sulcus_l",
    "node": "Olfactory sulcus.l",
    "fmaId": "TA2:olfactory_sulcus_l",
    "namePtBr": "Olfactory sulcus Esquerdo",
    "nameEn": "Olfactory sulcus (left)",
    "nameLatin": "Sulcus olfactorius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:olfactory_sulcus_r",
    "node": "Olfactory sulcus.r",
    "fmaId": "TA2:olfactory_sulcus_r",
    "namePtBr": "Olfactory sulcus Direito",
    "nameEn": "Olfactory sulcus (right)",
    "nameLatin": "Sulcus olfactorius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:paracentral_sulcus_l",
    "node": "Paracentral sulcus.l",
    "fmaId": "TA2:paracentral_sulcus_l",
    "namePtBr": "Paracentral sulcus Esquerdo",
    "nameEn": "Paracentral sulcus (left)",
    "nameLatin": "Sulcus paracentralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:paracentral_sulcus_r",
    "node": "Paracentral sulcus.r",
    "fmaId": "TA2:paracentral_sulcus_r",
    "namePtBr": "Paracentral sulcus Direito",
    "nameEn": "Paracentral sulcus (right)",
    "nameLatin": "Sulcus paracentralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Frontal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:parieto_occipital_sulcus_l",
    "node": "Parieto-occipital sulcus.l",
    "fmaId": "TA2:parieto_occipital_sulcus_l",
    "namePtBr": "Parieto-occipital sulcus Esquerdo",
    "nameEn": "Parieto-occipital sulcus (left)",
    "nameLatin": "Sulcus parietooccipitalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Interlobular sulci"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:parieto_occipital_sulcus_r",
    "node": "Parieto-occipital sulcus.r",
    "fmaId": "TA2:parieto_occipital_sulcus_r",
    "namePtBr": "Parieto-occipital sulcus Direito",
    "nameEn": "Parieto-occipital sulcus (right)",
    "nameLatin": "Sulcus parietooccipitalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Interlobular sulci"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:postcentral_sulcus_l",
    "node": "Postcentral sulcus.l",
    "fmaId": "TA2:postcentral_sulcus_l",
    "namePtBr": "Postcentral sulcus Esquerdo",
    "nameEn": "Postcentral sulcus (left)",
    "nameLatin": "Sulcus postcentralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:postcentral_sulcus_r",
    "node": "Postcentral sulcus.r",
    "fmaId": "TA2:postcentral_sulcus_r",
    "namePtBr": "Postcentral sulcus Direito",
    "nameEn": "Postcentral sulcus (right)",
    "nameLatin": "Sulcus postcentralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Parietal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:subparietal_sulcus_l",
    "node": "Subparietal sulcus.l",
    "fmaId": "TA2:subparietal_sulcus_l",
    "namePtBr": "Subparietal sulcus Esquerdo",
    "nameEn": "Subparietal sulcus (left)",
    "nameLatin": "Sulcus subparietalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Interlobular sulci"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:subparietal_sulcus_r",
    "node": "Subparietal sulcus.r",
    "fmaId": "TA2:subparietal_sulcus_r",
    "namePtBr": "Subparietal sulcus Direito",
    "nameEn": "Subparietal sulcus (right)",
    "nameLatin": "Sulcus subparietalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Interlobular sulci"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_temporal_sulcus_l",
    "node": "Inferior temporal sulcus.l",
    "fmaId": "TA2:inferior_temporal_sulcus_l",
    "namePtBr": "Inferior temporal sulcus Esquerdo",
    "nameEn": "Inferior temporal sulcus (left)",
    "nameLatin": "Sulcus temporalis inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_temporal_sulcus_r",
    "node": "Inferior temporal sulcus.r",
    "fmaId": "TA2:inferior_temporal_sulcus_r",
    "namePtBr": "Inferior temporal sulcus Direito",
    "nameEn": "Inferior temporal sulcus (right)",
    "nameLatin": "Sulcus temporalis inferior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_temporal_sulcus_l",
    "node": "Superior temporal sulcus.l",
    "fmaId": "TA2:superior_temporal_sulcus_l",
    "namePtBr": "Superior temporal sulcus Esquerdo",
    "nameEn": "Superior temporal sulcus (left)",
    "nameLatin": "Sulcus temporalis superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_temporal_sulcus_r",
    "node": "Superior temporal sulcus.r",
    "fmaId": "TA2:superior_temporal_sulcus_r",
    "namePtBr": "Superior temporal sulcus Direito",
    "nameEn": "Superior temporal sulcus (right)",
    "nameLatin": "Sulcus temporalis superior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebrum",
      "Telencephalon",
      "Temporal lobe"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:sacrococcygeal_symphysis",
    "node": "Sacrococcygeal symphysis",
    "fmaId": "TA2:sacrococcygeal_symphysis",
    "namePtBr": "Sacrococcygeal symphysis",
    "nameEn": "Sacrococcygeal symphysis",
    "nameLatin": "Symphysis Sacrococcygea",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:free_taenia",
    "node": "Free taenia",
    "fmaId": "TA2:free_taenia",
    "namePtBr": "Free taenia",
    "nameEn": "Free taenia",
    "nameLatin": "Taenia libera",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive canal"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:mesocolic_taenia",
    "node": "Mesocolic taenia",
    "fmaId": "TA2:mesocolic_taenia",
    "namePtBr": "Mesocolic taenia",
    "nameEn": "Mesocolic taenia",
    "nameLatin": "Taenia mesocolica",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive canal"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:omental_taenia",
    "node": "Omental taenia",
    "fmaId": "TA2:omental_taenia",
    "namePtBr": "Omental taenia",
    "nameEn": "Omental taenia",
    "nameLatin": "Taenia omentalis",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive canal"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:tentorium_cerebelli_l",
    "node": "Tentorium cerebelli.l",
    "fmaId": "TA2:tentorium_cerebelli_l",
    "namePtBr": "Tentorium cerebelli Esquerdo",
    "nameEn": "Tentorium cerebelli (left)",
    "nameLatin": "Tentorium cerebelli",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Meninges"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:tentorium_cerebelli_r",
    "node": "Tentorium cerebelli.r",
    "fmaId": "TA2:tentorium_cerebelli_r",
    "namePtBr": "Tentorium cerebelli Direito",
    "nameEn": "Tentorium cerebelli (right)",
    "nameLatin": "Tentorium cerebelli",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Meninges"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:third_rib_l",
    "node": "Third rib.l",
    "fmaId": "TA2:third_rib_l",
    "namePtBr": "3ª Costela Esquerda",
    "nameEn": "Third rib (left)",
    "nameLatin": "Tertia costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:third_rib_r",
    "node": "Third rib.r",
    "fmaId": "TA2:third_rib_r",
    "namePtBr": "3ª Costela Direita",
    "nameEn": "Third rib (right)",
    "nameLatin": "Tertia costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:thalamus_l",
    "node": "Thalamus.l",
    "fmaId": "TA2:thalamus_l",
    "namePtBr": "Thalamus Esquerdo",
    "nameEn": "Thalamus (left)",
    "nameLatin": "Thalamus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:thalamus_r",
    "node": "Thalamus.r",
    "fmaId": "TA2:thalamus_r",
    "namePtBr": "Thalamus Direito",
    "nameEn": "Thalamus (right)",
    "nameLatin": "Thalamus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:tibia_l",
    "node": "Tibia.l",
    "fmaId": "TA2:tibia_l",
    "namePtBr": "Tíbia Esquerda",
    "nameEn": "Tibia (left)",
    "nameLatin": "Tibia",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:tibia_r",
    "node": "Tibia.r",
    "fmaId": "TA2:tibia_r",
    "namePtBr": "Tíbia Direita",
    "nameEn": "Tibia (right)",
    "nameLatin": "Tibia",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Bones of lower limb",
      "Bones of free lower limb"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:tonsil_of_cerebellum_l",
    "node": "Tonsil of cerebellum.l",
    "fmaId": "TA2:tonsil_of_cerebellum_l",
    "namePtBr": "Tonsil of cerebellum Esquerdo",
    "nameEn": "Tonsil of cerebellum (left)",
    "nameLatin": "Tonsilla cerebelli",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:tonsil_of_cerebellum_r",
    "node": "Tonsil of cerebellum.r",
    "fmaId": "TA2:tonsil_of_cerebellum_r",
    "namePtBr": "Tonsil of cerebellum Direito",
    "nameEn": "Tonsil of cerebellum (right)",
    "nameLatin": "Tonsilla cerebelli",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:trachea",
    "node": "Trachea",
    "fmaId": "TA2:trachea",
    "namePtBr": "Trachea",
    "nameEn": "Trachea",
    "nameLatin": "Trachea",
    "chapter": 7,
    "system": "respiratory",
    "meshFile": "respiratory_male.glb",
    "path": [
      "Tracheobronchial tree",
      "Bronchi"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.1,
      "z": 0.4
    }
  },
  {
    "id": "za:anterior_corticospinal_tract",
    "node": "Anterior corticospinal tract",
    "fmaId": "TA2:anterior_corticospinal_tract",
    "namePtBr": "Anterior corticospinal tract",
    "nameEn": "Anterior corticospinal tract",
    "nameLatin": "Tractus corticospinalis anterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_corticospinal_tract",
    "node": "Lateral corticospinal tract",
    "fmaId": "TA2:lateral_corticospinal_tract",
    "namePtBr": "Lateral corticospinal tract",
    "nameEn": "Lateral corticospinal tract",
    "nameLatin": "Tractus corticospinalis lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:optic_tract_l",
    "node": "Optic tract.l",
    "fmaId": "TA2:optic_tract_l",
    "namePtBr": "Optic tract Esquerdo",
    "nameEn": "Optic tract (left)",
    "nameLatin": "Tractus opticus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:optic_tract_r",
    "node": "Optic tract.r",
    "fmaId": "TA2:optic_tract_r",
    "namePtBr": "Optic tract Direito",
    "nameEn": "Optic tract (right)",
    "nameLatin": "Tractus opticus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Diencephalon"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_reticulospinal_tract",
    "node": "Lateral reticulospinal tract",
    "fmaId": "TA2:lateral_reticulospinal_tract",
    "namePtBr": "Lateral reticulospinal tract",
    "nameEn": "Lateral reticulospinal tract",
    "nameLatin": "Tractus reticulospinalis lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_reticulospinal_tract",
    "node": "Medial reticulospinal tract",
    "fmaId": "TA2:medial_reticulospinal_tract",
    "namePtBr": "Medial reticulospinal tract",
    "nameEn": "Medial reticulospinal tract",
    "nameLatin": "Tractus reticulospinalis medialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:rubrospinal_tract",
    "node": "Rubrospinal tract",
    "fmaId": "TA2:rubrospinal_tract",
    "namePtBr": "Rubrospinal tract",
    "nameEn": "Rubrospinal tract",
    "nameLatin": "Tractus rubrospinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_spinocerebellar_tract",
    "node": "Anterior spinocerebellar tract",
    "fmaId": "TA2:anterior_spinocerebellar_tract",
    "namePtBr": "Anterior spinocerebellar tract",
    "nameEn": "Anterior spinocerebellar tract",
    "nameLatin": "Tractus spinocerebellaris anterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:posterior_spinocerebellar_tract",
    "node": "Posterior spinocerebellar tract",
    "fmaId": "TA2:posterior_spinocerebellar_tract",
    "namePtBr": "Posterior spinocerebellar tract",
    "nameEn": "Posterior spinocerebellar tract",
    "nameLatin": "Tractus spinocerebellaris posterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:spinotectal_tract",
    "node": "Spinotectal tract",
    "fmaId": "TA2:spinotectal_tract",
    "namePtBr": "Spinotectal tract",
    "nameEn": "Spinotectal tract",
    "nameLatin": "Tractus spinotectalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:anterior_spinothalamic_tract",
    "node": "Anterior spinothalamic tract",
    "fmaId": "TA2:anterior_spinothalamic_tract",
    "namePtBr": "Anterior spinothalamic tract",
    "nameEn": "Anterior spinothalamic tract",
    "nameLatin": "Tractus spinothalamicus anterior",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_spinothalamic_tract",
    "node": "Lateral spinothalamic tract",
    "fmaId": "TA2:lateral_spinothalamic_tract",
    "namePtBr": "Lateral spinothalamic tract",
    "nameEn": "Lateral spinothalamic tract",
    "nameLatin": "Tractus spinothalamicus lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:tectospinal_tract",
    "node": "Tectospinal tract",
    "fmaId": "TA2:tectospinal_tract",
    "namePtBr": "Tectospinal tract",
    "nameEn": "Tectospinal tract",
    "nameLatin": "Tractus tectospinalis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_vestibulospinal_tract",
    "node": "Lateral vestibulospinal tract",
    "fmaId": "TA2:lateral_vestibulospinal_tract",
    "namePtBr": "Lateral vestibulospinal tract",
    "nameEn": "Lateral vestibulospinal tract",
    "nameLatin": "Tractus vestibulospinalis lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:medial_vestibulospinal_tract",
    "node": "Medial vestibulospinal tract",
    "fmaId": "TA2:medial_vestibulospinal_tract",
    "namePtBr": "Medial vestibulospinal tract",
    "nameEn": "Medial vestibulospinal tract",
    "nameLatin": "Tractus vestibulospinalis medialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Spinal cord"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:brachiocephalic_trunk",
    "node": "Brachiocephalic trunk",
    "fmaId": "TA2:brachiocephalic_trunk",
    "namePtBr": "Brachiocephalic trunk",
    "nameEn": "Brachiocephalic trunk",
    "nameLatin": "Truncus brachiocephalicus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:coeliac_trunk",
    "node": "Coeliac trunk",
    "fmaId": "TA2:coeliac_trunk",
    "namePtBr": "Coeliac trunk",
    "nameEn": "Coeliac trunk",
    "nameLatin": "Truncus coeliacus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries",
      "Aorta"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:costocervical_trunk_l",
    "node": "Costocervical trunk.l",
    "fmaId": "TA2:costocervical_trunk_l",
    "namePtBr": "Costocervical trunk Esquerdo",
    "nameEn": "Costocervical trunk (left)",
    "nameLatin": "Truncus costocervicalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.6,
      "z": -0.2
    }
  },
  {
    "id": "za:costocervical_trunk_r",
    "node": "Costocervical trunk.r",
    "fmaId": "TA2:costocervical_trunk_r",
    "namePtBr": "Costocervical trunk Direito",
    "nameEn": "Costocervical trunk (right)",
    "nameLatin": "Truncus costocervicalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.6,
      "z": -0.2
    }
  },
  {
    "id": "za:inferior_trunk_of_brachial_plexus_l",
    "node": "Inferior trunk of brachial plexus.l",
    "fmaId": "TA2:inferior_trunk_of_brachial_plexus_l",
    "namePtBr": "Inferior trunk of brachial plexus Esquerdo",
    "nameEn": "Inferior trunk of brachial plexus (left)",
    "nameLatin": "Truncus inferior plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Inferior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:inferior_trunk_of_brachial_plexus_r",
    "node": "Inferior trunk of brachial plexus.r",
    "fmaId": "TA2:inferior_trunk_of_brachial_plexus_r",
    "namePtBr": "Inferior trunk of brachial plexus Direito",
    "nameEn": "Inferior trunk of brachial plexus (right)",
    "nameLatin": "Truncus inferior plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Inferior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:middle_trunk_of_brachial_plexus_l",
    "node": "Middle trunk of brachial plexus.l",
    "fmaId": "TA2:middle_trunk_of_brachial_plexus_l",
    "namePtBr": "Middle trunk of brachial plexus Esquerdo",
    "nameEn": "Middle trunk of brachial plexus (left)",
    "nameLatin": "Truncus medius plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Middle trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:middle_trunk_of_brachial_plexus_r",
    "node": "Middle trunk of brachial plexus.r",
    "fmaId": "TA2:middle_trunk_of_brachial_plexus_r",
    "namePtBr": "Middle trunk of brachial plexus Direito",
    "nameEn": "Middle trunk of brachial plexus (right)",
    "nameLatin": "Truncus medius plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Middle trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:pulmonary_trunk",
    "node": "Pulmonary trunk",
    "fmaId": "TA2:pulmonary_trunk",
    "namePtBr": "Pulmonary trunk",
    "nameEn": "Pulmonary trunk",
    "nameLatin": "Truncus pulmonalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary arteries"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_trunk_of_brachial_plexus_l",
    "node": "Superior trunk of brachial plexus.l",
    "fmaId": "TA2:superior_trunk_of_brachial_plexus_l",
    "namePtBr": "Superior trunk of brachial plexus Esquerdo",
    "nameEn": "Superior trunk of brachial plexus (left)",
    "nameLatin": "Truncus superior plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Superior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:superior_trunk_of_brachial_plexus_r",
    "node": "Superior trunk of brachial plexus.r",
    "fmaId": "TA2:superior_trunk_of_brachial_plexus_r",
    "namePtBr": "Superior trunk of brachial plexus Direito",
    "nameEn": "Superior trunk of brachial plexus (right)",
    "nameLatin": "Truncus superior plexus brachialis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Spinal nerves",
      "Brachial plexus",
      "Supraclavicular part of brachial plexus",
      "Superior trunk of brachial plexus"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:sympathetic_trunk_l",
    "node": "Sympathetic trunk.l",
    "fmaId": "TA2:sympathetic_trunk_l",
    "namePtBr": "Sympathetic trunk Esquerdo",
    "nameEn": "Sympathetic trunk (left)",
    "nameLatin": "Truncus sympathicus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Automatic division of peripheral nervous system",
      "Thoracolumbar part of autonomic division",
      "Sympathetic trunk"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:sympathetic_trunk_r",
    "node": "Sympathetic trunk.r",
    "fmaId": "TA2:sympathetic_trunk_r",
    "namePtBr": "Sympathetic trunk Direito",
    "nameEn": "Sympathetic trunk (right)",
    "nameLatin": "Truncus sympathicus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Peripheral nervous system",
      "Automatic division of peripheral nervous system",
      "Thoracolumbar part of autonomic division",
      "Sympathetic trunk"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:thyrocervical_trunk_l",
    "node": "Thyrocervical trunk.l",
    "fmaId": "TA2:thyrocervical_trunk_l",
    "namePtBr": "Thyrocervical trunk Esquerdo",
    "nameEn": "Thyrocervical trunk (left)",
    "nameLatin": "Truncus thyreocervicalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.6,
      "z": -0.2
    }
  },
  {
    "id": "za:thyrocervical_trunk_r",
    "node": "Thyrocervical trunk.r",
    "fmaId": "TA2:thyrocervical_trunk_r",
    "namePtBr": "Thyrocervical trunk Direito",
    "nameEn": "Thyrocervical trunk (right)",
    "nameLatin": "Truncus thyreocervicalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic arteries"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.6,
      "z": -0.2
    }
  },
  {
    "id": "za:auditory_tube_l",
    "node": "Auditory tube.l",
    "fmaId": "TA2:auditory_tube_l",
    "namePtBr": "Auditory tube Esquerdo",
    "nameEn": "Auditory tube (left)",
    "nameLatin": "Tuba auditiva",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:auditory_tube_r",
    "node": "Auditory tube.r",
    "fmaId": "TA2:auditory_tube_r",
    "namePtBr": "Auditory tube Direito",
    "nameEn": "Auditory tube (right)",
    "nameLatin": "Tuba auditiva",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:tuber_of_vermis",
    "node": "Tuber of vermis",
    "fmaId": "TA2:tuber_of_vermis",
    "namePtBr": "Tuber of vermis",
    "nameEn": "Tuber of vermis",
    "nameLatin": "Tuber vermis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:mucosa_of_stomach",
    "node": "Mucosa of stomach",
    "fmaId": "TA2:mucosa_of_stomach",
    "namePtBr": "Mucosa of stomach",
    "nameEn": "Mucosa of stomach",
    "nameLatin": "Tunica mucosa gastris",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive system"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:ulna_l",
    "node": "Ulna.l",
    "fmaId": "TA2:ulna_l",
    "namePtBr": "Ulna Esquerda",
    "nameEn": "Ulna (left)",
    "nameLatin": "Ulna",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:ulna_r",
    "node": "Ulna.r",
    "fmaId": "TA2:ulna_r",
    "namePtBr": "Ulna Direita",
    "nameEn": "Ulna (right)",
    "nameLatin": "Ulna",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Appendicular skeleton"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:eleventh_rib_l",
    "node": "Eleventh rib.l",
    "fmaId": "TA2:eleventh_rib_l",
    "namePtBr": "11ª Costela Esquerda",
    "nameEn": "Eleventh rib (left)",
    "nameLatin": "Undecima costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs",
      "False ribs",
      "Floating ribs"
    ],
    "explosionVector": {
      "x": -1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:eleventh_rib_r",
    "node": "Eleventh rib.r",
    "fmaId": "TA2:eleventh_rib_r",
    "namePtBr": "11ª Costela Direita",
    "nameEn": "Eleventh rib (right)",
    "nameLatin": "Undecima costa",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Thoracic skeleton",
      "Bones of thorax",
      "Ribs",
      "False ribs",
      "Floating ribs"
    ],
    "explosionVector": {
      "x": 1.1,
      "y": 0,
      "z": 0.6
    }
  },
  {
    "id": "za:ureter_l",
    "node": "Ureter.l",
    "fmaId": "TA2:ureter_l",
    "namePtBr": "Ureter Esquerdo",
    "nameEn": "Ureter (left)",
    "nameLatin": "Ureter",
    "chapter": 9,
    "system": "renal",
    "meshFile": "renal_male.glb",
    "path": [
      "Urinary system"
    ],
    "explosionVector": {
      "x": -0.7,
      "y": -0.2,
      "z": -0.5
    }
  },
  {
    "id": "za:ureter_r",
    "node": "Ureter.r",
    "fmaId": "TA2:ureter_r",
    "namePtBr": "Ureter Direito",
    "nameEn": "Ureter (right)",
    "nameLatin": "Ureter",
    "chapter": 9,
    "system": "renal",
    "meshFile": "renal_male.glb",
    "path": [
      "Urinary system"
    ],
    "explosionVector": {
      "x": 0.7,
      "y": -0.2,
      "z": -0.5
    }
  },
  {
    "id": "za:urethra",
    "node": "Urethra",
    "fmaId": "TA2:urethra",
    "namePtBr": "Urethra",
    "nameEn": "Urethra",
    "nameLatin": "Urethra",
    "chapter": 9,
    "system": "renal",
    "meshFile": "renal_male.glb",
    "path": [
      "Urinary system"
    ],
    "explosionVector": {
      "x": 0.7,
      "y": -0.2,
      "z": -0.5
    }
  },
  {
    "id": "za:uvula_of_palate",
    "node": "Uvula of palate",
    "fmaId": "TA2:uvula_of_palate",
    "namePtBr": "Uvula of palate",
    "nameEn": "Uvula of palate",
    "nameLatin": "Uvula palatina",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive system"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:uvula_of_vermis",
    "node": "Uvula of vermis",
    "fmaId": "TA2:uvula_of_vermis",
    "namePtBr": "Uvula of vermis",
    "nameEn": "Uvula of vermis",
    "nameLatin": "Uvula vermis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Cerebellum"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:right_coronary_leaflet",
    "node": "Right coronary leaflet",
    "fmaId": "TA2:right_coronary_leaflet",
    "namePtBr": "Right coronary leaflet",
    "nameEn": "Right coronary leaflet",
    "nameLatin": "Valvula coronaria dextra aortae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_coronary_leaflet",
    "node": "Left coronary leaflet",
    "fmaId": "TA2:left_coronary_leaflet",
    "namePtBr": "Left coronary leaflet",
    "nameEn": "Left coronary leaflet",
    "nameLatin": "Valvula coronaria sinistra aortae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:non_coronary_leaflet",
    "node": "Non-coronary leaflet",
    "fmaId": "TA2:non_coronary_leaflet",
    "namePtBr": "Non-coronary leaflet",
    "nameEn": "Non-coronary leaflet",
    "nameLatin": "Valvula noncoronaria valvae aortae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_semilunar_leaflet_of_pulmonary_valve",
    "node": "Anterior semilunar leaflet of pulmonary valve",
    "fmaId": "TA2:anterior_semilunar_leaflet_of_pulmonary_valve",
    "namePtBr": "Anterior semilunar leaflet of pulmonary valve",
    "nameEn": "Anterior semilunar leaflet of pulmonary valve",
    "nameLatin": "Valvula semilunaris anterior valvae trunci pulmonalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_semilunar_leaflet_of_pulmonary_valve",
    "node": "Right semilunar leaflet of pulmonary valve",
    "fmaId": "TA2:right_semilunar_leaflet_of_pulmonary_valve",
    "namePtBr": "Right semilunar leaflet of pulmonary valve",
    "nameEn": "Right semilunar leaflet of pulmonary valve",
    "nameLatin": "Valvula semilunaris dextra valvae trunci pulmonalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_semilunar_leaflet_of_pulmonary_valve",
    "node": "Left semilunar leaflet of pulmonary valve",
    "fmaId": "TA2:left_semilunar_leaflet_of_pulmonary_valve",
    "namePtBr": "Left semilunar leaflet of pulmonary valve",
    "nameEn": "Left semilunar leaflet of pulmonary valve",
    "nameLatin": "Valvula semilunaris sinistra valvae trunci pulmonalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:angular_vein_l",
    "node": "Angular vein.l",
    "fmaId": "TA2:angular_vein_l",
    "namePtBr": "Angular vein Esquerdo",
    "nameEn": "Angular vein (left)",
    "nameLatin": "Vena angularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:angular_vein_r",
    "node": "Angular vein.r",
    "fmaId": "TA2:angular_vein_r",
    "namePtBr": "Angular vein Direito",
    "nameEn": "Angular vein (right)",
    "nameLatin": "Vena angularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_vein_of_right_lung",
    "node": "Anterior vein of right lung",
    "fmaId": "TA2:anterior_vein_of_right_lung",
    "namePtBr": "Anterior vein of right lung",
    "nameEn": "Anterior vein of right lung",
    "nameLatin": "Vena anterior pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Right superior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_vein_of_left_lung",
    "node": "Anterior vein of left lung",
    "fmaId": "TA2:anterior_vein_of_left_lung",
    "namePtBr": "Anterior vein of left lung",
    "nameEn": "Anterior vein of left lung",
    "nameLatin": "Vena anterior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Left superior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:apical_vein_of_right_lung",
    "node": "Apical vein of right lung",
    "fmaId": "TA2:apical_vein_of_right_lung",
    "namePtBr": "Apical vein of right lung",
    "nameEn": "Apical vein of right lung",
    "nameLatin": "Vena apicalis pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Right superior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:apicoposterior_vein_of_left_lung",
    "node": "Apicoposterior vein of left lung",
    "fmaId": "TA2:apicoposterior_vein_of_left_lung",
    "namePtBr": "Apicoposterior vein of left lung",
    "nameEn": "Apicoposterior vein of left lung",
    "nameLatin": "Vena apicoposterior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Left superior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_auricular_vein_l",
    "node": "Posterior auricular vein.l",
    "fmaId": "TA2:posterior_auricular_vein_l",
    "namePtBr": "Posterior auricular vein Esquerdo",
    "nameEn": "Posterior auricular vein (left)",
    "nameLatin": "Vena auricularis posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_auricular_vein_r",
    "node": "Posterior auricular vein.r",
    "fmaId": "TA2:posterior_auricular_vein_r",
    "namePtBr": "Posterior auricular vein Direito",
    "nameEn": "Posterior auricular vein (right)",
    "nameLatin": "Vena auricularis posterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:axillary_vein_l",
    "node": "Axillary vein.l",
    "fmaId": "TA2:axillary_vein_l",
    "namePtBr": "Axillary vein Esquerdo",
    "nameEn": "Axillary vein (left)",
    "nameLatin": "Vena axillaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:axillary_vein_r",
    "node": "Axillary vein.r",
    "fmaId": "TA2:axillary_vein_r",
    "namePtBr": "Axillary vein Direito",
    "nameEn": "Axillary vein (right)",
    "nameLatin": "Vena axillaris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:azygos_vein",
    "node": "Azygos vein",
    "fmaId": "TA2:azygos_vein",
    "namePtBr": "Azygos vein",
    "nameEn": "Azygos vein",
    "nameLatin": "Vena azyga",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_basal_vein_of_right_lung",
    "node": "Inferior basal vein of right lung",
    "fmaId": "TA2:inferior_basal_vein_of_right_lung",
    "namePtBr": "Inferior basal vein of right lung",
    "nameEn": "Inferior basal vein of right lung",
    "nameLatin": "Vena basalis inferior pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Right inferior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_basal_vein_of_left_lung",
    "node": "Inferior basal vein of left lung",
    "fmaId": "TA2:inferior_basal_vein_of_left_lung",
    "namePtBr": "Inferior basal vein of left lung",
    "nameEn": "Inferior basal vein of left lung",
    "nameLatin": "Vena basalis inferior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Left inferior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_basal_vein_of_right_lung",
    "node": "Superior basal vein of right lung",
    "fmaId": "TA2:superior_basal_vein_of_right_lung",
    "namePtBr": "Superior basal vein of right lung",
    "nameEn": "Superior basal vein of right lung",
    "nameLatin": "Vena basalis superior pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Right inferior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_basal_vein_of_left_lung",
    "node": "Superior basal vein of left lung",
    "fmaId": "TA2:superior_basal_vein_of_left_lung",
    "namePtBr": "Superior basal vein of left lung",
    "nameEn": "Superior basal vein of left lung",
    "nameLatin": "Vena basalis superior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Left inferior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:basilic_vein_l",
    "node": "Basilic vein.l",
    "fmaId": "TA2:basilic_vein_l",
    "namePtBr": "Basilic vein Esquerdo",
    "nameEn": "Basilic vein (left)",
    "nameLatin": "Vena basilica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:basilic_vein_r",
    "node": "Basilic vein.r",
    "fmaId": "TA2:basilic_vein_r",
    "namePtBr": "Basilic vein Direito",
    "nameEn": "Basilic vein (right)",
    "nameLatin": "Vena basilica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_brachiocephalic_vein",
    "node": "Right brachiocephalic vein",
    "fmaId": "TA2:right_brachiocephalic_vein",
    "namePtBr": "Right brachiocephalic vein",
    "nameEn": "Right brachiocephalic vein",
    "nameLatin": "Vena brachiocephalica dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_brachiocephalic_vein",
    "node": "Left brachiocephalic vein",
    "fmaId": "TA2:left_brachiocephalic_vein",
    "namePtBr": "Left brachiocephalic vein",
    "nameEn": "Left brachiocephalic vein",
    "nameLatin": "Vena brachiocephalica sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_vena_cava_abdominal_part",
    "node": "Inferior vena cava (abdominal part)",
    "fmaId": "TA2:inferior_vena_cava_abdominal_part",
    "namePtBr": "Inferior vena cava (abdominal part)",
    "nameEn": "Inferior vena cava (abdominal part)",
    "nameLatin": "Vena cava inferior (pars abdominis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_vena_cava_thoracic_part",
    "node": "Inferior vena cava (thoracic part)",
    "fmaId": "TA2:inferior_vena_cava_thoracic_part",
    "namePtBr": "Inferior vena cava (thoracic part)",
    "nameEn": "Inferior vena cava (thoracic part)",
    "nameLatin": "Vena cava inferior (part thoracica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_vena_cava",
    "node": "Superior vena cava",
    "fmaId": "TA2:superior_vena_cava",
    "namePtBr": "Superior vena cava",
    "nameEn": "Superior vena cava",
    "nameLatin": "Vena cava superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:cephalic_vein_l",
    "node": "Cephalic vein.l",
    "fmaId": "TA2:cephalic_vein_l",
    "namePtBr": "Cephalic vein Esquerdo",
    "nameEn": "Cephalic vein (left)",
    "nameLatin": "Vena cephalica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:cephalic_vein_r",
    "node": "Cephalic vein.r",
    "fmaId": "TA2:cephalic_vein_r",
    "namePtBr": "Cephalic vein Direito",
    "nameEn": "Cephalic vein (right)",
    "nameLatin": "Vena cephalica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_circumflex_humeral_vein_l",
    "node": "Anterior circumflex humeral vein.l",
    "fmaId": "TA2:anterior_circumflex_humeral_vein_l",
    "namePtBr": "Anterior circumflex humeral vein Esquerdo",
    "nameEn": "Anterior circumflex humeral vein (left)",
    "nameLatin": "Vena circumflexa anterior humeri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_circumflex_humeral_vein_r",
    "node": "Anterior circumflex humeral vein.r",
    "fmaId": "TA2:anterior_circumflex_humeral_vein_r",
    "namePtBr": "Anterior circumflex humeral vein Direito",
    "nameEn": "Anterior circumflex humeral vein (right)",
    "nameLatin": "Vena circumflexa anterior humeri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_circumflex_humeral_vein_l",
    "node": "Posterior circumflex humeral vein.l",
    "fmaId": "TA2:posterior_circumflex_humeral_vein_l",
    "namePtBr": "Posterior circumflex humeral vein Esquerdo",
    "nameEn": "Posterior circumflex humeral vein (left)",
    "nameLatin": "Vena circumflexa posterior humeri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_circumflex_humeral_vein_r",
    "node": "Posterior circumflex humeral vein.r",
    "fmaId": "TA2:posterior_circumflex_humeral_vein_r",
    "namePtBr": "Posterior circumflex humeral vein Direito",
    "nameEn": "Posterior circumflex humeral vein (right)",
    "nameLatin": "Vena circumflexa posterior humeri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:circumflex_scapular_vein_l",
    "node": "Circumflex scapular vein.l",
    "fmaId": "TA2:circumflex_scapular_vein_l",
    "namePtBr": "Circumflex scapular vein Esquerdo",
    "nameEn": "Circumflex scapular vein (left)",
    "nameLatin": "Vena circumflexa scapulae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:circumflex_scapular_vein_r",
    "node": "Circumflex scapular vein.r",
    "fmaId": "TA2:circumflex_scapular_vein_r",
    "namePtBr": "Circumflex scapular vein Direito",
    "nameEn": "Circumflex scapular vein (right)",
    "nameLatin": "Vena circumflexa scapulae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:right_colic_vein",
    "node": "Right colic vein",
    "fmaId": "TA2:right_colic_vein",
    "namePtBr": "Right colic vein",
    "nameEn": "Right colic vein",
    "nameLatin": "Vena colica dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:middle_colic_vein",
    "node": "Middle colic vein",
    "fmaId": "TA2:middle_colic_vein",
    "namePtBr": "Middle colic vein",
    "nameEn": "Middle colic vein",
    "nameLatin": "Vena colica media",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_dorsal_vein_of_penis",
    "node": "Deep dorsal vein of penis",
    "fmaId": "TA2:deep_dorsal_vein_of_penis",
    "namePtBr": "Deep dorsal vein of penis",
    "nameEn": "Deep dorsal vein of penis",
    "nameLatin": "Vena dorsalis profunda penis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_epigastric_vein_l",
    "node": "Inferior epigastric vein.l",
    "fmaId": "TA2:inferior_epigastric_vein_l",
    "namePtBr": "Inferior epigastric vein Esquerdo",
    "nameEn": "Inferior epigastric vein (left)",
    "nameLatin": "Vena epigastrica inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_epigastric_vein_r",
    "node": "Inferior epigastric vein.r",
    "fmaId": "TA2:inferior_epigastric_vein_r",
    "namePtBr": "Inferior epigastric vein Direito",
    "nameEn": "Inferior epigastric vein (right)",
    "nameLatin": "Vena epigastrica inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_epigastric_vein_l",
    "node": "Superficial epigastric vein.l",
    "fmaId": "TA2:superficial_epigastric_vein_l",
    "namePtBr": "Superficial epigastric vein Esquerdo",
    "nameEn": "Superficial epigastric vein (left)",
    "nameLatin": "Vena epigastrica superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_epigastric_vein_r",
    "node": "Superficial epigastric vein.r",
    "fmaId": "TA2:superficial_epigastric_vein_r",
    "namePtBr": "Superficial epigastric vein Direito",
    "nameEn": "Superficial epigastric vein (right)",
    "nameLatin": "Vena epigastrica superficialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:facial_vein_l",
    "node": "Facial vein.l",
    "fmaId": "TA2:facial_vein_l",
    "namePtBr": "Facial vein Esquerdo",
    "nameEn": "Facial vein (left)",
    "nameLatin": "Vena facialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:facial_vein_r",
    "node": "Facial vein.r",
    "fmaId": "TA2:facial_vein_r",
    "namePtBr": "Facial vein Direito",
    "nameEn": "Facial vein (right)",
    "nameLatin": "Vena facialis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_facial_vein_l",
    "node": "Common facial vein.l",
    "fmaId": "TA2:common_facial_vein_l",
    "namePtBr": "Common facial vein Esquerdo",
    "nameEn": "Common facial vein (left)",
    "nameLatin": "Vena facialis communis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_facial_vein_r",
    "node": "Common facial vein.r",
    "fmaId": "TA2:common_facial_vein_r",
    "namePtBr": "Common facial vein Direito",
    "nameEn": "Common facial vein (right)",
    "nameLatin": "Vena facialis communis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:femoral_vein_l",
    "node": "Femoral vein.l",
    "fmaId": "TA2:femoral_vein_l",
    "namePtBr": "Femoral vein Esquerdo",
    "nameEn": "Femoral vein (left)",
    "nameLatin": "Vena femoralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:femoral_vein_r",
    "node": "Femoral vein.r",
    "fmaId": "TA2:femoral_vein_r",
    "namePtBr": "Femoral vein Direito",
    "nameEn": "Femoral vein (right)",
    "nameLatin": "Vena femoralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_gastro_omental_vein",
    "node": "Right gastro-omental vein",
    "fmaId": "TA2:right_gastro_omental_vein",
    "namePtBr": "Right gastro-omental vein",
    "nameEn": "Right gastro-omental vein",
    "nameLatin": "Vena gastroomentalis dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_gastro_omental_vein",
    "node": "Left gastro-omental vein",
    "fmaId": "TA2:left_gastro_omental_vein",
    "namePtBr": "Left gastro-omental vein",
    "nameEn": "Left gastro-omental vein",
    "nameLatin": "Vena gastroomentalis sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:hemi_azygos_vein",
    "node": "Hemi-azygos vein",
    "fmaId": "TA2:hemi_azygos_vein",
    "namePtBr": "Hemi-azygos vein",
    "nameEn": "Hemi-azygos vein",
    "nameLatin": "Vena hemiazyga",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:accessory_hemi_azygos_vein",
    "node": "Accessory hemi-azygos vein",
    "fmaId": "TA2:accessory_hemi_azygos_vein",
    "namePtBr": "Accessory hemi-azygos vein",
    "nameEn": "Accessory hemi-azygos vein",
    "nameLatin": "Vena hemiazyga accessoria",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_iliac_vein_l",
    "node": "Common iliac vein.l",
    "fmaId": "TA2:common_iliac_vein_l",
    "namePtBr": "Common iliac vein Esquerdo",
    "nameEn": "Common iliac vein (left)",
    "nameLatin": "Vena iliaca communis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:common_iliac_vein_r",
    "node": "Common iliac vein.r",
    "fmaId": "TA2:common_iliac_vein_r",
    "namePtBr": "Common iliac vein Direito",
    "nameEn": "Common iliac vein (right)",
    "nameLatin": "Vena iliaca communis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:external_iliac_vein_l",
    "node": "External iliac vein.l",
    "fmaId": "TA2:external_iliac_vein_l",
    "namePtBr": "External iliac vein Esquerdo",
    "nameEn": "External iliac vein (left)",
    "nameLatin": "Vena iliaca externa",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:external_iliac_vein_r",
    "node": "External iliac vein.r",
    "fmaId": "TA2:external_iliac_vein_r",
    "namePtBr": "External iliac vein Direito",
    "nameEn": "External iliac vein (right)",
    "nameLatin": "Vena iliaca externa",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_iliac_vein_l",
    "node": "Internal iliac vein.l",
    "fmaId": "TA2:internal_iliac_vein_l",
    "namePtBr": "Internal iliac vein Esquerdo",
    "nameEn": "Internal iliac vein (left)",
    "nameLatin": "Vena iliaca interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_iliac_vein_r",
    "node": "Internal iliac vein.r",
    "fmaId": "TA2:internal_iliac_vein_r",
    "namePtBr": "Internal iliac vein Direito",
    "nameEn": "Internal iliac vein (right)",
    "nameLatin": "Vena iliaca interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:iliolumbar_vein_l",
    "node": "Iliolumbar vein.l",
    "fmaId": "TA2:iliolumbar_vein_l",
    "namePtBr": "Iliolumbar vein Esquerdo",
    "nameEn": "Iliolumbar vein (left)",
    "nameLatin": "Vena iliolumbalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:iliolumbar_vein_r",
    "node": "Iliolumbar vein.r",
    "fmaId": "TA2:iliolumbar_vein_r",
    "namePtBr": "Iliolumbar vein Direito",
    "nameEn": "Iliolumbar vein (right)",
    "nameLatin": "Vena iliolumbalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:inferior_vein_of_left_ventricle",
    "node": "Inferior vein of left ventricle",
    "fmaId": "TA2:inferior_vein_of_left_ventricle",
    "namePtBr": "Inferior vein of left ventricle",
    "nameEn": "Inferior vein of left ventricle",
    "nameLatin": "Vena inferior ventriculi sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Cardiac vessels",
      "Cardiac veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_superior_intercostal_vein",
    "node": "Right superior intercostal vein",
    "fmaId": "TA2:right_superior_intercostal_vein",
    "namePtBr": "Right superior intercostal vein",
    "nameEn": "Right superior intercostal vein",
    "nameLatin": "Vena intercostalis superior dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_superior_intercostal_vein",
    "node": "Left superior intercostal vein",
    "fmaId": "TA2:left_superior_intercostal_vein",
    "namePtBr": "Left superior intercostal vein",
    "nameEn": "Left superior intercostal vein",
    "nameLatin": "Vena intercostalis superior sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_jugular_vein_l",
    "node": "Anterior jugular vein.l",
    "fmaId": "TA2:anterior_jugular_vein_l",
    "namePtBr": "Anterior jugular vein Esquerdo",
    "nameEn": "Anterior jugular vein (left)",
    "nameLatin": "Vena iugularis anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_jugular_vein_r",
    "node": "Anterior jugular vein.r",
    "fmaId": "TA2:anterior_jugular_vein_r",
    "namePtBr": "Anterior jugular vein Direito",
    "nameEn": "Anterior jugular vein (right)",
    "nameLatin": "Vena iugularis anterior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:external_jugular_vein_l",
    "node": "External jugular vein.l",
    "fmaId": "TA2:external_jugular_vein_l",
    "namePtBr": "External jugular vein Esquerdo",
    "nameEn": "External jugular vein (left)",
    "nameLatin": "Vena iugularis externa",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:external_jugular_vein_r",
    "node": "External jugular vein.r",
    "fmaId": "TA2:external_jugular_vein_r",
    "namePtBr": "External jugular vein Direito",
    "nameEn": "External jugular vein (right)",
    "nameLatin": "Vena iugularis externa",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_jugular_vein_l",
    "node": "Internal jugular vein.l",
    "fmaId": "TA2:internal_jugular_vein_l",
    "namePtBr": "Internal jugular vein Esquerdo",
    "nameEn": "Internal jugular vein (left)",
    "nameLatin": "Vena jugularis interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_jugular_vein_r",
    "node": "Internal jugular vein.r",
    "fmaId": "TA2:internal_jugular_vein_r",
    "namePtBr": "Internal jugular vein Direito",
    "nameEn": "Internal jugular vein (right)",
    "nameLatin": "Vena jugularis interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_labial_vein_l",
    "node": "Superior labial vein.l",
    "fmaId": "TA2:superior_labial_vein_l",
    "namePtBr": "Superior labial vein Esquerdo",
    "nameEn": "Superior labial vein (left)",
    "nameLatin": "Vena labialis superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_labial_vein_r",
    "node": "Superior labial vein.r",
    "fmaId": "TA2:superior_labial_vein_r",
    "namePtBr": "Superior labial vein Direito",
    "nameEn": "Superior labial vein (right)",
    "nameLatin": "Vena labialis superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_vein_of_right_lung",
    "node": "Lateral vein of right lung",
    "fmaId": "TA2:lateral_vein_of_right_lung",
    "namePtBr": "Lateral vein of right lung",
    "nameEn": "Lateral vein of right lung",
    "nameLatin": "Vena lateralis pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Right superior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lingual_vein_l",
    "node": "Lingual vein.l",
    "fmaId": "TA2:lingual_vein_l",
    "namePtBr": "Lingual vein Esquerdo",
    "nameEn": "Lingual vein (left)",
    "nameLatin": "Vena lingualis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lingual_vein_r",
    "node": "Lingual vein.r",
    "fmaId": "TA2:lingual_vein_r",
    "namePtBr": "Lingual vein Direito",
    "nameEn": "Lingual vein (right)",
    "nameLatin": "Vena lingualis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_lingular_vein_of_left_lung",
    "node": "Inferior lingular vein of left lung",
    "fmaId": "TA2:inferior_lingular_vein_of_left_lung",
    "namePtBr": "Inferior lingular vein of left lung",
    "nameEn": "Inferior lingular vein of left lung",
    "nameLatin": "Vena lingularis inferior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Left superior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lingular_vein_of_left_lung",
    "node": "Lingular vein of left lung",
    "fmaId": "TA2:lingular_vein_of_left_lung",
    "namePtBr": "Lingular vein of left lung",
    "nameEn": "Lingular vein of left lung",
    "nameLatin": "Vena lingularis pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Left superior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_lingular_vein_of_left_lung",
    "node": "Superior lingular vein of left lung",
    "fmaId": "TA2:superior_lingular_vein_of_left_lung",
    "namePtBr": "Superior lingular vein of left lung",
    "nameEn": "Superior lingular vein of left lung",
    "nameLatin": "Vena lingularis superior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Left superior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_ascending_lumbar_vein",
    "node": "Right ascending lumbar vein",
    "fmaId": "TA2:right_ascending_lumbar_vein",
    "namePtBr": "Right ascending lumbar vein",
    "nameEn": "Right ascending lumbar vein",
    "nameLatin": "Vena lumbalis ascendens dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:left_ascending_lumbar_vein",
    "node": "Left ascending lumbar vein",
    "fmaId": "TA2:left_ascending_lumbar_vein",
    "namePtBr": "Left ascending lumbar vein",
    "nameEn": "Left ascending lumbar vein",
    "nameLatin": "Vena lumbalis ascendens sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:great_cardiac_vein",
    "node": "Great cardiac vein",
    "fmaId": "TA2:great_cardiac_vein",
    "namePtBr": "Great cardiac vein",
    "nameEn": "Great cardiac vein",
    "nameLatin": "Vena magna cordis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Cardiac vessels",
      "Cardiac veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:middle_cardiac_vein",
    "node": "Middle cardiac vein",
    "fmaId": "TA2:middle_cardiac_vein",
    "namePtBr": "Middle cardiac vein",
    "nameEn": "Middle cardiac vein",
    "nameLatin": "Vena media cordis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Cardiac vessels",
      "Cardiac veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_vein_of_right_lung",
    "node": "Medial vein of right lung",
    "fmaId": "TA2:medial_vein_of_right_lung",
    "namePtBr": "Medial vein of right lung",
    "nameEn": "Medial vein of right lung",
    "nameLatin": "Vena medialis pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Right superior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:median_antebrachial_vein_l",
    "node": "Median antebrachial vein.l",
    "fmaId": "TA2:median_antebrachial_vein_l",
    "namePtBr": "Median antebrachial vein Esquerdo",
    "nameEn": "Median antebrachial vein (left)",
    "nameLatin": "Vena mediana antebrachii",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:median_antebrachial_vein_r",
    "node": "Median antebrachial vein.r",
    "fmaId": "TA2:median_antebrachial_vein_r",
    "namePtBr": "Median antebrachial vein Direito",
    "nameEn": "Median antebrachial vein (right)",
    "nameLatin": "Vena mediana antebrachii",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:median_cubital_vein_l",
    "node": "Median cubital vein.l",
    "fmaId": "TA2:median_cubital_vein_l",
    "namePtBr": "Median cubital vein Esquerdo",
    "nameEn": "Median cubital vein (left)",
    "nameLatin": "Vena mediana cubiti",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:median_cubital_vein_r",
    "node": "Median cubital vein.r",
    "fmaId": "TA2:median_cubital_vein_r",
    "namePtBr": "Median cubital vein Direito",
    "nameEn": "Median cubital vein (right)",
    "nameLatin": "Vena mediana cubiti",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_mesenteric_vein",
    "node": "Inferior mesenteric vein",
    "fmaId": "TA2:inferior_mesenteric_vein",
    "namePtBr": "Inferior mesenteric vein",
    "nameEn": "Inferior mesenteric vein",
    "nameLatin": "Vena mesenterica inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_mesenteric_vein",
    "node": "Superior mesenteric vein",
    "fmaId": "TA2:superior_mesenteric_vein",
    "namePtBr": "Superior mesenteric vein",
    "nameEn": "Superior mesenteric vein",
    "nameLatin": "Vena mesenterica superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:occipital_vein_l",
    "node": "Occipital vein.l",
    "fmaId": "TA2:occipital_vein_l",
    "namePtBr": "Occipital vein Esquerdo",
    "nameEn": "Occipital vein (left)",
    "nameLatin": "Vena occipitalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:occipital_vein_r",
    "node": "Occipital vein.r",
    "fmaId": "TA2:occipital_vein_r",
    "namePtBr": "Occipital vein Direito",
    "nameEn": "Occipital vein (right)",
    "nameLatin": "Vena occipitalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_ophthalmic_vein_l",
    "node": "Inferior ophthalmic vein.l",
    "fmaId": "TA2:inferior_ophthalmic_vein_l",
    "namePtBr": "Inferior ophthalmic vein Esquerdo",
    "nameEn": "Inferior ophthalmic vein (left)",
    "nameLatin": "Vena ophthalmica inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_ophthalmic_vein_r",
    "node": "Inferior ophthalmic vein.r",
    "fmaId": "TA2:inferior_ophthalmic_vein_r",
    "namePtBr": "Inferior ophthalmic vein Direito",
    "nameEn": "Inferior ophthalmic vein (right)",
    "nameLatin": "Vena ophthalmica inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_ophthalmic_vein_l",
    "node": "Superior ophthalmic vein.l",
    "fmaId": "TA2:superior_ophthalmic_vein_l",
    "namePtBr": "Superior ophthalmic vein Esquerdo",
    "nameEn": "Superior ophthalmic vein (left)",
    "nameLatin": "Vena ophthalmica superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_ophthalmic_vein_r",
    "node": "Superior ophthalmic vein.r",
    "fmaId": "TA2:superior_ophthalmic_vein_r",
    "namePtBr": "Superior ophthalmic vein Direito",
    "nameEn": "Superior ophthalmic vein (right)",
    "nameLatin": "Vena ophthalmica superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_superior_phrenic_vein",
    "node": "Right superior phrenic vein",
    "fmaId": "TA2:right_superior_phrenic_vein",
    "namePtBr": "Right superior phrenic vein",
    "nameEn": "Right superior phrenic vein",
    "nameLatin": "Vena phrenica superior dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:popliteal_vein_l",
    "node": "Popliteal vein.l",
    "fmaId": "TA2:popliteal_vein_l",
    "namePtBr": "Popliteal vein Esquerdo",
    "nameEn": "Popliteal vein (left)",
    "nameLatin": "Vena poplitea",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:popliteal_vein_r",
    "node": "Popliteal vein.r",
    "fmaId": "TA2:popliteal_vein_r",
    "namePtBr": "Popliteal vein Direito",
    "nameEn": "Popliteal vein (right)",
    "nameLatin": "Vena poplitea",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:hepatic_portal_vein",
    "node": "Hepatic portal vein",
    "fmaId": "TA2:hepatic_portal_vein",
    "namePtBr": "Hepatic portal vein",
    "nameEn": "Hepatic portal vein",
    "nameLatin": "Vena portae hepatis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:posterior_vein_of_right_lung",
    "node": "Posterior vein of right lung",
    "fmaId": "TA2:posterior_vein_of_right_lung",
    "namePtBr": "Posterior vein of right lung",
    "nameEn": "Posterior vein of right lung",
    "nameLatin": "Vena posterior pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Right superior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_femoral_vein_l",
    "node": "Deep femoral vein.l",
    "fmaId": "TA2:deep_femoral_vein_l",
    "namePtBr": "Deep femoral vein Esquerdo",
    "nameEn": "Deep femoral vein (left)",
    "nameLatin": "Vena profunda femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:deep_femoral_vein_r",
    "node": "Deep femoral vein.r",
    "fmaId": "TA2:deep_femoral_vein_r",
    "namePtBr": "Deep femoral vein Direito",
    "nameEn": "Deep femoral vein (right)",
    "nameLatin": "Vena profunda femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_pudendal_vein_l",
    "node": "Internal pudendal vein.l",
    "fmaId": "TA2:internal_pudendal_vein_l",
    "namePtBr": "Internal pudendal vein Esquerdo",
    "nameEn": "Internal pudendal vein (left)",
    "nameLatin": "Vena pudendalis interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_pudendal_vein_r",
    "node": "Internal pudendal vein.r",
    "fmaId": "TA2:internal_pudendal_vein_r",
    "namePtBr": "Internal pudendal vein Direito",
    "nameEn": "Internal pudendal vein (right)",
    "nameLatin": "Vena pudendalis interna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_inferior_pulmonary_vein",
    "node": "Right inferior pulmonary vein",
    "fmaId": "TA2:right_inferior_pulmonary_vein",
    "namePtBr": "Right inferior pulmonary vein",
    "nameEn": "Right inferior pulmonary vein",
    "nameLatin": "Vena pulmonalis dextra inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Right inferior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_superior_pulmonary_vein",
    "node": "Right superior pulmonary vein",
    "fmaId": "TA2:right_superior_pulmonary_vein",
    "namePtBr": "Right superior pulmonary vein",
    "nameEn": "Right superior pulmonary vein",
    "nameLatin": "Vena pulmonalis dextra superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Right superior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_inferior_pulmonary_vein",
    "node": "Left inferior pulmonary vein",
    "fmaId": "TA2:left_inferior_pulmonary_vein",
    "namePtBr": "Left inferior pulmonary vein",
    "nameEn": "Left inferior pulmonary vein",
    "nameLatin": "Vena pulmonalis sinistra inferior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Left inferior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_superior_pulmonary_vein",
    "node": "Left superior pulmonary vein",
    "fmaId": "TA2:left_superior_pulmonary_vein",
    "namePtBr": "Left superior pulmonary vein",
    "nameEn": "Left superior pulmonary vein",
    "nameLatin": "Vena pulmonalis sinistra superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Left superior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_renal_vein",
    "node": "Right renal vein",
    "fmaId": "TA2:right_renal_vein",
    "namePtBr": "Right renal vein",
    "nameEn": "Right renal vein",
    "nameLatin": "Vena renalis dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_renal_vein",
    "node": "Left renal vein",
    "fmaId": "TA2:left_renal_vein",
    "namePtBr": "Left renal vein",
    "nameEn": "Left renal vein",
    "nameLatin": "Vena renalis sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:retromandibular_vein_l",
    "node": "Retromandibular vein.l",
    "fmaId": "TA2:retromandibular_vein_l",
    "namePtBr": "Retromandibular vein Esquerdo",
    "nameEn": "Retromandibular vein (left)",
    "nameLatin": "Vena retromandibularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:retromandibular_vein_r",
    "node": "Retromandibular vein.r",
    "fmaId": "TA2:retromandibular_vein_r",
    "namePtBr": "Retromandibular vein Direito",
    "nameEn": "Retromandibular vein (right)",
    "nameLatin": "Vena retromandibularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:great_saphenous_vein_l",
    "node": "Great saphenous vein.l",
    "fmaId": "TA2:great_saphenous_vein_l",
    "namePtBr": "Great saphenous vein Esquerdo",
    "nameEn": "Great saphenous vein (left)",
    "nameLatin": "Vena saphena magna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:great_saphenous_vein_r",
    "node": "Great saphenous vein.r",
    "fmaId": "TA2:great_saphenous_vein_r",
    "namePtBr": "Great saphenous vein Direito",
    "nameEn": "Great saphenous vein (right)",
    "nameLatin": "Vena saphena magna",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:small_saphenous_vein_l",
    "node": "Small saphenous vein.l",
    "fmaId": "TA2:small_saphenous_vein_l",
    "namePtBr": "Small saphenous vein Esquerdo",
    "nameEn": "Small saphenous vein (left)",
    "nameLatin": "Vena saphena parva",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:small_saphenous_vein_r",
    "node": "Small saphenous vein.r",
    "fmaId": "TA2:small_saphenous_vein_r",
    "namePtBr": "Small saphenous vein Direito",
    "nameEn": "Small saphenous vein (right)",
    "nameLatin": "Vena saphena parva",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:splenic_vein",
    "node": "Splenic vein",
    "fmaId": "TA2:splenic_vein",
    "namePtBr": "Splenic vein",
    "nameEn": "Splenic vein",
    "nameLatin": "Vena splenica",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_subclavian_vein",
    "node": "Right subclavian vein",
    "fmaId": "TA2:right_subclavian_vein",
    "namePtBr": "Right subclavian vein",
    "nameEn": "Right subclavian vein",
    "nameLatin": "Vena subclavia dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_subclavian_vein",
    "node": "Left subclavian vein",
    "fmaId": "TA2:left_subclavian_vein",
    "namePtBr": "Left subclavian vein",
    "nameEn": "Left subclavian vein",
    "nameLatin": "Vena subclavia sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:right_subcostal_vein",
    "node": "Right subcostal vein",
    "fmaId": "TA2:right_subcostal_vein",
    "namePtBr": "Right subcostal vein",
    "nameEn": "Right subcostal vein",
    "nameLatin": "Vena subcostalis dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_subcostal_vein",
    "node": "Left subcostal vein",
    "fmaId": "TA2:left_subcostal_vein",
    "namePtBr": "Left subcostal vein",
    "nameEn": "Left subcostal vein",
    "nameLatin": "Vena subcostalis sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:submental_vein_l",
    "node": "Submental vein.l",
    "fmaId": "TA2:submental_vein_l",
    "namePtBr": "Submental vein Esquerdo",
    "nameEn": "Submental vein (left)",
    "nameLatin": "Vena submentalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:submental_vein_r",
    "node": "Submental vein.r",
    "fmaId": "TA2:submental_vein_r",
    "namePtBr": "Submental vein Direito",
    "nameEn": "Submental vein (right)",
    "nameLatin": "Vena submentalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:subscapular_vein_l",
    "node": "Subscapular vein.l",
    "fmaId": "TA2:subscapular_vein_l",
    "namePtBr": "Subscapular vein Esquerdo",
    "nameEn": "Subscapular vein (left)",
    "nameLatin": "Vena subscapularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:subscapular_vein_r",
    "node": "Subscapular vein.r",
    "fmaId": "TA2:subscapular_vein_r",
    "namePtBr": "Subscapular vein Direito",
    "nameEn": "Subscapular vein (right)",
    "nameLatin": "Vena subscapularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:superior_vein_of_right_lung",
    "node": "Superior vein of right lung",
    "fmaId": "TA2:superior_vein_of_right_lung",
    "namePtBr": "Superior vein of right lung",
    "nameEn": "Superior vein of right lung",
    "nameLatin": "Vena superior pulmonis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Right inferior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_vein_of_left_lung",
    "node": "Superior vein of left lung",
    "fmaId": "TA2:superior_vein_of_left_lung",
    "namePtBr": "Superior vein of left lung",
    "nameEn": "Superior vein of left lung",
    "nameLatin": "Vena superior pulmonis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Pulmonary vessels",
      "Pulmonary veins",
      "Left inferior pulmonary vein'"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:suprascapular_vein_l",
    "node": "Suprascapular vein.l",
    "fmaId": "TA2:suprascapular_vein_l",
    "namePtBr": "Suprascapular vein Esquerdo",
    "nameEn": "Suprascapular vein (left)",
    "nameLatin": "Vena suprascapularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": -1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:suprascapular_vein_r",
    "node": "Suprascapular vein.r",
    "fmaId": "TA2:suprascapular_vein_r",
    "namePtBr": "Suprascapular vein Direito",
    "nameEn": "Suprascapular vein (right)",
    "nameLatin": "Vena suprascapularis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 1.2,
      "y": 0.2,
      "z": -0.7
    }
  },
  {
    "id": "za:right_testicular_vein",
    "node": "Right testicular vein",
    "fmaId": "TA2:right_testicular_vein",
    "namePtBr": "Right testicular vein",
    "nameEn": "Right testicular vein",
    "nameLatin": "Vena testicularis dextra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:left_testicular_vein",
    "node": "Left testicular vein",
    "fmaId": "TA2:left_testicular_vein",
    "namePtBr": "Left testicular vein",
    "nameEn": "Left testicular vein",
    "nameLatin": "Vena testicularis sinistra",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_thoracic_vein_l",
    "node": "Lateral thoracic vein.l",
    "fmaId": "TA2:lateral_thoracic_vein_l",
    "namePtBr": "Lateral thoracic vein Esquerdo",
    "nameEn": "Lateral thoracic vein (left)",
    "nameLatin": "Vena thoracica lateralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_thoracic_vein_r",
    "node": "Lateral thoracic vein.r",
    "fmaId": "TA2:lateral_thoracic_vein_r",
    "namePtBr": "Lateral thoracic vein Direito",
    "nameEn": "Lateral thoracic vein (right)",
    "nameLatin": "Vena thoracica lateralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:thoracodorsal_vein_l",
    "node": "Thoracodorsal vein.l",
    "fmaId": "TA2:thoracodorsal_vein_l",
    "namePtBr": "Thoracodorsal vein Esquerdo",
    "nameEn": "Thoracodorsal vein (left)",
    "nameLatin": "Vena thoracodorsalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:thoracodorsal_vein_r",
    "node": "Thoracodorsal vein.r",
    "fmaId": "TA2:thoracodorsal_vein_r",
    "namePtBr": "Thoracodorsal vein Direito",
    "nameEn": "Thoracodorsal vein (right)",
    "nameLatin": "Vena thoracodorsalis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_thyroid_vein_l",
    "node": "Superior thyroid vein.l",
    "fmaId": "TA2:superior_thyroid_vein_l",
    "namePtBr": "Superior thyroid vein Esquerdo",
    "nameEn": "Superior thyroid vein (left)",
    "nameLatin": "Vena thyreoidea superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_thyroid_vein_r",
    "node": "Superior thyroid vein.r",
    "fmaId": "TA2:superior_thyroid_vein_r",
    "namePtBr": "Superior thyroid vein Direito",
    "nameEn": "Superior thyroid vein (right)",
    "nameLatin": "Vena thyreoidea superior",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:vertebral_vein_l",
    "node": "Vertebral vein.l",
    "fmaId": "TA2:vertebral_vein_l",
    "namePtBr": "Vertebral vein Esquerdo",
    "nameEn": "Vertebral vein (left)",
    "nameLatin": "Vena vertebralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:vertebral_vein_r",
    "node": "Vertebral vein.r",
    "fmaId": "TA2:vertebral_vein_r",
    "namePtBr": "Vertebral vein Direito",
    "nameEn": "Vertebral vein (right)",
    "nameLatin": "Vena vertebralis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:brachial_veins_l",
    "node": "Brachial veins.l",
    "fmaId": "TA2:brachial_veins_l",
    "namePtBr": "Brachial veins Esquerdo",
    "nameEn": "Brachial veins (left)",
    "nameLatin": "Venae brachiales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:brachial_veins_r",
    "node": "Brachial veins.r",
    "fmaId": "TA2:brachial_veins_r",
    "namePtBr": "Brachial veins Direito",
    "nameEn": "Brachial veins (right)",
    "nameLatin": "Venae brachiales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_circumflex_femoral_veins_l",
    "node": "Lateral circumflex femoral veins.l",
    "fmaId": "TA2:lateral_circumflex_femoral_veins_l",
    "namePtBr": "Lateral circumflex femoral veins Esquerdo",
    "nameEn": "Lateral circumflex femoral veins (left)",
    "nameLatin": "Venae circumflexae laterales femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_circumflex_femoral_veins_r",
    "node": "Lateral circumflex femoral veins.r",
    "fmaId": "TA2:lateral_circumflex_femoral_veins_r",
    "namePtBr": "Lateral circumflex femoral veins Direito",
    "nameEn": "Lateral circumflex femoral veins (right)",
    "nameLatin": "Venae circumflexae laterales femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_circumflex_femoral_veins_l",
    "node": "Medial circumflex femoral veins.l",
    "fmaId": "TA2:medial_circumflex_femoral_veins_l",
    "namePtBr": "Medial circumflex femoral veins Esquerdo",
    "nameEn": "Medial circumflex femoral veins (left)",
    "nameLatin": "Venae circumflexae mediales femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_circumflex_femoral_veins_r",
    "node": "Medial circumflex femoral veins.r",
    "fmaId": "TA2:medial_circumflex_femoral_veins_r",
    "namePtBr": "Medial circumflex femoral veins Direito",
    "nameEn": "Medial circumflex femoral veins (right)",
    "nameLatin": "Venae circumflexae mediales femoris",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_digital_veins_of_hand_l",
    "node": "Dorsal digital veins of hand.l",
    "fmaId": "TA2:dorsal_digital_veins_of_hand_l",
    "namePtBr": "Dorsal digital veins of hand Esquerdo",
    "nameEn": "Dorsal digital veins of hand (left)",
    "nameLatin": "Venae digitales dorsales manus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_digital_veins_of_hand_r",
    "node": "Dorsal digital veins of hand.r",
    "fmaId": "TA2:dorsal_digital_veins_of_hand_r",
    "namePtBr": "Dorsal digital veins of hand Direito",
    "nameEn": "Dorsal digital veins of hand (right)",
    "nameLatin": "Venae digitales dorsales manus",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_digital_veins_of_foot_l",
    "node": "Dorsal digital veins of foot.l",
    "fmaId": "TA2:dorsal_digital_veins_of_foot_l",
    "namePtBr": "Dorsal digital veins of foot Esquerdo",
    "nameEn": "Dorsal digital veins of foot (left)",
    "nameLatin": "Venae digitales dorsales pedis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:dorsal_digital_veins_of_foot_r",
    "node": "Dorsal digital veins of foot.r",
    "fmaId": "TA2:dorsal_digital_veins_of_foot_r",
    "namePtBr": "Dorsal digital veins of foot Direito",
    "nameEn": "Dorsal digital veins of foot (right)",
    "nameLatin": "Venae digitales dorsales pedis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:palmar_digital_veins_l",
    "node": "Palmar digital veins.l",
    "fmaId": "TA2:palmar_digital_veins_l",
    "namePtBr": "Palmar digital veins Esquerdo",
    "nameEn": "Palmar digital veins (left)",
    "nameLatin": "Venae digitales palmares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:palmar_digital_veins_r",
    "node": "Palmar digital veins.r",
    "fmaId": "TA2:palmar_digital_veins_r",
    "namePtBr": "Palmar digital veins Direito",
    "nameEn": "Palmar digital veins (right)",
    "nameLatin": "Venae digitales palmares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:plantar_digital_veins_l",
    "node": "Plantar digital veins.l",
    "fmaId": "TA2:plantar_digital_veins_l",
    "namePtBr": "Plantar digital veins Esquerdo",
    "nameEn": "Plantar digital veins (left)",
    "nameLatin": "Venae digitales plantares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:plantar_digital_veins_r",
    "node": "Plantar digital veins.r",
    "fmaId": "TA2:plantar_digital_veins_r",
    "namePtBr": "Plantar digital veins Direito",
    "nameEn": "Plantar digital veins (right)",
    "nameLatin": "Venae digitales plantares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_dorsal_veins_of_penis",
    "node": "Superficial dorsal veins of penis",
    "fmaId": "TA2:superficial_dorsal_veins_of_penis",
    "namePtBr": "Superficial dorsal veins of penis",
    "nameEn": "Superficial dorsal veins of penis",
    "nameLatin": "Venae dorsales superficiales penis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_epigastric_veins_l",
    "node": "Superior epigastric veins.l",
    "fmaId": "TA2:superior_epigastric_veins_l",
    "namePtBr": "Superior epigastric veins Esquerdo",
    "nameEn": "Superior epigastric veins (left)",
    "nameLatin": "Venae epigastricae superiores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_epigastric_veins_r",
    "node": "Superior epigastric veins.r",
    "fmaId": "TA2:superior_epigastric_veins_r",
    "namePtBr": "Superior epigastric veins Direito",
    "nameEn": "Superior epigastric veins (right)",
    "nameLatin": "Venae epigastricae superiores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:fibular_veins_l",
    "node": "Fibular veins.l",
    "fmaId": "TA2:fibular_veins_l",
    "namePtBr": "Fibular veins Esquerdo",
    "nameEn": "Fibular veins (left)",
    "nameLatin": "Venae fibulares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:fibular_veins_r",
    "node": "Fibular veins.r",
    "fmaId": "TA2:fibular_veins_r",
    "namePtBr": "Fibular veins Direito",
    "nameEn": "Fibular veins (right)",
    "nameLatin": "Venae fibulares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:genicular_veins_l",
    "node": "Genicular veins.l",
    "fmaId": "TA2:genicular_veins_l",
    "namePtBr": "Genicular veins Esquerdo",
    "nameEn": "Genicular veins (left)",
    "nameLatin": "Venae geniculares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:genicular_veins_r",
    "node": "Genicular veins.r",
    "fmaId": "TA2:genicular_veins_r",
    "namePtBr": "Genicular veins Direito",
    "nameEn": "Genicular veins (right)",
    "nameLatin": "Venae geniculares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_gluteal_veins_l",
    "node": "Inferior gluteal veins.l",
    "fmaId": "TA2:inferior_gluteal_veins_l",
    "namePtBr": "Inferior gluteal veins Esquerdo",
    "nameEn": "Inferior gluteal veins (left)",
    "nameLatin": "Venae gluteae inferiores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_gluteal_veins_r",
    "node": "Inferior gluteal veins.r",
    "fmaId": "TA2:inferior_gluteal_veins_r",
    "namePtBr": "Inferior gluteal veins Direito",
    "nameEn": "Inferior gluteal veins (right)",
    "nameLatin": "Venae gluteae inferiores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_gluteal_veins_l",
    "node": "Superior gluteal veins.l",
    "fmaId": "TA2:superior_gluteal_veins_l",
    "namePtBr": "Superior gluteal veins Esquerdo",
    "nameEn": "Superior gluteal veins (left)",
    "nameLatin": "Venae gluteae superiores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superior_gluteal_veins_r",
    "node": "Superior gluteal veins.r",
    "fmaId": "TA2:superior_gluteal_veins_r",
    "namePtBr": "Superior gluteal veins Direito",
    "nameEn": "Superior gluteal veins (right)",
    "nameLatin": "Venae gluteae superiores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:hepatic_veins",
    "node": "Hepatic veins",
    "fmaId": "TA2:hepatic_veins",
    "namePtBr": "Hepatic veins",
    "nameEn": "Hepatic veins",
    "nameLatin": "Venae hepaticae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:intercapitular_veins_of_foot_l",
    "node": "Intercapitular veins of foot.l",
    "fmaId": "TA2:intercapitular_veins_of_foot_l",
    "namePtBr": "Intercapitular veins of foot Esquerdo",
    "nameEn": "Intercapitular veins of foot (left)",
    "nameLatin": "Venae intercapitulares pedis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:intercapitular_veins_of_foot_r",
    "node": "Intercapitular veins of foot.r",
    "fmaId": "TA2:intercapitular_veins_of_foot_r",
    "namePtBr": "Intercapitular veins of foot Direito",
    "nameEn": "Intercapitular veins of foot (right)",
    "nameLatin": "Venae intercapitulares pedis",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:intrarenal_veins_of_right_kidney",
    "node": "Intrarenal veins of right kidney",
    "fmaId": "TA2:intrarenal_veins_of_right_kidney",
    "namePtBr": "Intrarenal veins of right kidney",
    "nameEn": "Intrarenal veins of right kidney",
    "nameLatin": "Venae intrarenales renis dextri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:intrarenal_veins_of_left_kidney",
    "node": "Intrarenal veins of left kidney",
    "fmaId": "TA2:intrarenal_veins_of_left_kidney",
    "namePtBr": "Intrarenal veins of left kidney",
    "nameEn": "Intrarenal veins of left kidney",
    "nameLatin": "Venae intrarenales renis sinistri",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_labial_veins_l",
    "node": "Inferior labial veins.l",
    "fmaId": "TA2:inferior_labial_veins_l",
    "namePtBr": "Inferior labial veins Esquerdo",
    "nameEn": "Inferior labial veins (left)",
    "nameLatin": "Venae labiales inferiores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:inferior_labial_veins_r",
    "node": "Inferior labial veins.r",
    "fmaId": "TA2:inferior_labial_veins_r",
    "namePtBr": "Inferior labial veins Direito",
    "nameEn": "Inferior labial veins (right)",
    "nameLatin": "Venae labiales inferiores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lumbar_veins_l",
    "node": "Lumbar veins.l",
    "fmaId": "TA2:lumbar_veins_l",
    "namePtBr": "Lumbar veins Esquerdo",
    "nameEn": "Lumbar veins (left)",
    "nameLatin": "Venae lumbales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:lumbar_veins_r",
    "node": "Lumbar veins.r",
    "fmaId": "TA2:lumbar_veins_r",
    "namePtBr": "Lumbar veins Direito",
    "nameEn": "Lumbar veins (right)",
    "nameLatin": "Venae lumbales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0,
      "y": -0.3,
      "z": -0.3
    }
  },
  {
    "id": "za:maxillary_veins_l",
    "node": "Maxillary veins.l",
    "fmaId": "TA2:maxillary_veins_l",
    "namePtBr": "Maxillary veins Esquerdo",
    "nameEn": "Maxillary veins (left)",
    "nameLatin": "Venae maxillares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": -0.6,
      "y": -0.2,
      "z": 0.9
    }
  },
  {
    "id": "za:maxillary_veins_r",
    "node": "Maxillary veins.r",
    "fmaId": "TA2:maxillary_veins_r",
    "namePtBr": "Maxillary veins Direito",
    "nameEn": "Maxillary veins (right)",
    "nameLatin": "Venae maxillares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.6,
      "y": -0.2,
      "z": 0.9
    }
  },
  {
    "id": "za:dorsal_metatarsal_veins_l",
    "node": "Dorsal metatarsal veins.l",
    "fmaId": "TA2:dorsal_metatarsal_veins_l",
    "namePtBr": "Dorsal Metatarsal veins Esquerdo",
    "nameEn": "Dorsal metatarsal veins (left)",
    "nameLatin": "Venae metatarseae dorsales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:dorsal_metatarsal_veins_r",
    "node": "Dorsal metatarsal veins.r",
    "fmaId": "TA2:dorsal_metatarsal_veins_r",
    "namePtBr": "Dorsal Metatarsal veins Direito",
    "nameEn": "Dorsal metatarsal veins (right)",
    "nameLatin": "Venae metatarseae dorsales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:plantar_metatarsal_veins_l",
    "node": "Plantar metatarsal veins.l",
    "fmaId": "TA2:plantar_metatarsal_veins_l",
    "namePtBr": "Plantar Metatarsal veins Esquerdo",
    "nameEn": "Plantar metatarsal veins (left)",
    "nameLatin": "Venae metatarseae plantares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": -1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:plantar_metatarsal_veins_r",
    "node": "Plantar metatarsal veins.r",
    "fmaId": "TA2:plantar_metatarsal_veins_r",
    "namePtBr": "Plantar Metatarsal veins Direito",
    "nameEn": "Plantar metatarsal veins (right)",
    "nameLatin": "Venae metatarseae plantares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 1.4,
      "y": -0.8,
      "z": 0.2
    }
  },
  {
    "id": "za:musculophrenic_veins_l",
    "node": "Musculophrenic veins.l",
    "fmaId": "TA2:musculophrenic_veins_l",
    "namePtBr": "Musculophrenic veins Esquerdo",
    "nameEn": "Musculophrenic veins (left)",
    "nameLatin": "Venae musculophrenicae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:musculophrenic_veins_r",
    "node": "Musculophrenic veins.r",
    "fmaId": "TA2:musculophrenic_veins_r",
    "namePtBr": "Musculophrenic veins Direito",
    "nameEn": "Musculophrenic veins (right)",
    "nameLatin": "Venae musculophrenicae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:perforating_veins_l",
    "node": "Perforating veins.l",
    "fmaId": "TA2:perforating_veins_l",
    "namePtBr": "Perforating veins Esquerdo",
    "nameEn": "Perforating veins (left)",
    "nameLatin": "Venae perforantes",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:perforating_veins_r",
    "node": "Perforating veins.r",
    "fmaId": "TA2:perforating_veins_r",
    "namePtBr": "Perforating veins Direito",
    "nameEn": "Perforating veins (right)",
    "nameLatin": "Venae perforantes",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_plantar_veins_l",
    "node": "Lateral plantar veins.l",
    "fmaId": "TA2:lateral_plantar_veins_l",
    "namePtBr": "Lateral plantar veins Esquerdo",
    "nameEn": "Lateral plantar veins (left)",
    "nameLatin": "Venae plantares laterales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_plantar_veins_r",
    "node": "Lateral plantar veins.r",
    "fmaId": "TA2:lateral_plantar_veins_r",
    "namePtBr": "Lateral plantar veins Direito",
    "nameEn": "Lateral plantar veins (right)",
    "nameLatin": "Venae plantares laterales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_plantar_veins_l",
    "node": "Medial plantar veins.l",
    "fmaId": "TA2:medial_plantar_veins_l",
    "namePtBr": "Medial plantar veins Esquerdo",
    "nameEn": "Medial plantar veins (left)",
    "nameLatin": "Venae plantares mediales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:medial_plantar_veins_r",
    "node": "Medial plantar veins.r",
    "fmaId": "TA2:medial_plantar_veins_r",
    "namePtBr": "Medial plantar veins Direito",
    "nameEn": "Medial plantar veins (right)",
    "nameLatin": "Venae plantares mediales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:external_pudendal_veins_l",
    "node": "External pudendal veins.l",
    "fmaId": "TA2:external_pudendal_veins_l",
    "namePtBr": "External pudendal veins Esquerdo",
    "nameEn": "External pudendal veins (left)",
    "nameLatin": "Venae pudendales externae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:external_pudendal_veins_r",
    "node": "External pudendal veins.r",
    "fmaId": "TA2:external_pudendal_veins_r",
    "namePtBr": "External pudendal veins Direito",
    "nameEn": "External pudendal veins (right)",
    "nameLatin": "Venae pudendales externae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:radial_veins_l",
    "node": "Radial veins.l",
    "fmaId": "TA2:radial_veins_l",
    "namePtBr": "Radial veins Esquerdo",
    "nameEn": "Radial veins (left)",
    "nameLatin": "Venae radiales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:radial_veins_r",
    "node": "Radial veins.r",
    "fmaId": "TA2:radial_veins_r",
    "namePtBr": "Radial veins Direito",
    "nameEn": "Radial veins (right)",
    "nameLatin": "Venae radiales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_sacral_veins_l",
    "node": "Lateral sacral veins.l",
    "fmaId": "TA2:lateral_sacral_veins_l",
    "namePtBr": "Lateral sacral veins Esquerdo",
    "nameEn": "Lateral sacral veins (left)",
    "nameLatin": "Venae sacrales laterales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_sacral_veins_r",
    "node": "Lateral sacral veins.r",
    "fmaId": "TA2:lateral_sacral_veins_r",
    "namePtBr": "Lateral sacral veins Direito",
    "nameEn": "Lateral sacral veins (right)",
    "nameLatin": "Venae sacrales laterales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:sigmoid_veins",
    "node": "Sigmoid veins",
    "fmaId": "TA2:sigmoid_veins",
    "namePtBr": "Sigmoid veins",
    "nameEn": "Sigmoid veins",
    "nameLatin": "Venae sigmoideae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_temporal_veins_l",
    "node": "Superficial temporal veins.l",
    "fmaId": "TA2:superficial_temporal_veins_l",
    "namePtBr": "Superficial temporal veins Esquerdo",
    "nameEn": "Superficial temporal veins (left)",
    "nameLatin": "Venae temporales superficiales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:superficial_temporal_veins_r",
    "node": "Superficial temporal veins.r",
    "fmaId": "TA2:superficial_temporal_veins_r",
    "namePtBr": "Superficial temporal veins Direito",
    "nameEn": "Superficial temporal veins (right)",
    "nameLatin": "Venae temporales superficiales",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_thoracic_veins_l",
    "node": "Internal thoracic veins.l",
    "fmaId": "TA2:internal_thoracic_veins_l",
    "namePtBr": "Internal thoracic veins Esquerdo",
    "nameEn": "Internal thoracic veins (left)",
    "nameLatin": "Venae thoracicae internae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:internal_thoracic_veins_r",
    "node": "Internal thoracic veins.r",
    "fmaId": "TA2:internal_thoracic_veins_r",
    "namePtBr": "Internal thoracic veins Direito",
    "nameEn": "Internal thoracic veins (right)",
    "nameLatin": "Venae thoracicae internae",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:anterior_tibial_veins_l",
    "node": "Anterior tibial veins.l",
    "fmaId": "TA2:anterior_tibial_veins_l",
    "namePtBr": "Anterior tibial veins Esquerdo",
    "nameEn": "Anterior tibial veins (left)",
    "nameLatin": "Venae tibiales anteriores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:anterior_tibial_veins_r",
    "node": "Anterior tibial veins.r",
    "fmaId": "TA2:anterior_tibial_veins_r",
    "namePtBr": "Anterior tibial veins Direito",
    "nameEn": "Anterior tibial veins (right)",
    "nameLatin": "Venae tibiales anteriores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:posterior_tibial_veins_l",
    "node": "Posterior tibial veins.l",
    "fmaId": "TA2:posterior_tibial_veins_l",
    "namePtBr": "Posterior tibial veins Esquerdo",
    "nameEn": "Posterior tibial veins (left)",
    "nameLatin": "Venae tibiales posteriores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": -1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:posterior_tibial_veins_r",
    "node": "Posterior tibial veins.r",
    "fmaId": "TA2:posterior_tibial_veins_r",
    "namePtBr": "Posterior tibial veins Direito",
    "nameEn": "Posterior tibial veins (right)",
    "nameLatin": "Venae tibiales posteriores",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 1.3,
      "y": -0.6,
      "z": 0.1
    }
  },
  {
    "id": "za:ulnar_veins_l",
    "node": "Ulnar veins.l",
    "fmaId": "TA2:ulnar_veins_l",
    "namePtBr": "Ulnar veins Esquerdo",
    "nameEn": "Ulnar veins (left)",
    "nameLatin": "Venae ulnares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": -1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:ulnar_veins_r",
    "node": "Ulnar veins.r",
    "fmaId": "TA2:ulnar_veins_r",
    "namePtBr": "Ulnar veins Direito",
    "nameEn": "Ulnar veins (right)",
    "nameLatin": "Venae ulnares",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Systemic veins"
    ],
    "explosionVector": {
      "x": 1.6,
      "y": -0.3,
      "z": 0.1
    }
  },
  {
    "id": "za:right_ventricle",
    "node": "Right ventricle",
    "fmaId": "TA2:right_ventricle",
    "namePtBr": "Right ventricle",
    "nameEn": "Right ventricle",
    "nameLatin": "Ventriculus dexter",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:lateral_ventricle_l",
    "node": "Lateral ventricle.l",
    "fmaId": "TA2:lateral_ventricle_l",
    "namePtBr": "Lateral ventricle Esquerdo",
    "nameEn": "Lateral ventricle (left)",
    "nameLatin": "Ventriculus lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Ventricular system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:lateral_ventricle_r",
    "node": "Lateral ventricle.r",
    "fmaId": "TA2:lateral_ventricle_r",
    "namePtBr": "Lateral ventricle Direito",
    "nameEn": "Lateral ventricle (right)",
    "nameLatin": "Ventriculus lateralis",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Ventricular system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:fourth_ventricle",
    "node": "Fourth ventricle",
    "fmaId": "TA2:fourth_ventricle",
    "namePtBr": "4º ventricle",
    "nameEn": "Fourth ventricle",
    "nameLatin": "Ventriculus quartus",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Ventricular system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:left_ventricle",
    "node": "Left ventricle",
    "fmaId": "TA2:left_ventricle",
    "namePtBr": "Left ventricle",
    "nameEn": "Left ventricle",
    "nameLatin": "Ventriculus sinister",
    "chapter": 5,
    "system": "cardiovascular",
    "meshFile": "cardiovascular_male.glb",
    "path": [
      "Heart"
    ],
    "explosionVector": {
      "x": 0.2,
      "y": -0.1,
      "z": 0.8
    }
  },
  {
    "id": "za:third_ventricle",
    "node": "Third ventricle",
    "fmaId": "TA2:third_ventricle",
    "namePtBr": "3º ventricle",
    "nameEn": "Third ventricle",
    "nameLatin": "Ventriculus tertius",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Central nervous system",
      "Brain",
      "Ventricular system"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:vertebra_c3",
    "node": "Vertebra C3",
    "fmaId": "TA2:vertebra_c3",
    "namePtBr": "Vertebra C3",
    "nameEn": "Vertebra C3",
    "nameLatin": "Vertebra cervicalis III",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Cervical vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_c4",
    "node": "Vertebra C4",
    "fmaId": "TA2:vertebra_c4",
    "namePtBr": "Vertebra C4",
    "nameEn": "Vertebra C4",
    "nameLatin": "Vertebra cervicalis IV",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Cervical vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_c5",
    "node": "Vertebra C5",
    "fmaId": "TA2:vertebra_c5",
    "namePtBr": "Vertebra C5",
    "nameEn": "Vertebra C5",
    "nameLatin": "Vertebra cervicalis V",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Cervical vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_c6",
    "node": "Vertebra C6",
    "fmaId": "TA2:vertebra_c6",
    "namePtBr": "Vertebra C6",
    "nameEn": "Vertebra C6",
    "nameLatin": "Vertebra cervicalis VI",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Cervical vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_c7",
    "node": "Vertebra C7",
    "fmaId": "TA2:vertebra_c7",
    "namePtBr": "Vertebra C7",
    "nameEn": "Vertebra C7",
    "nameLatin": "Vertebra cervicalis VII",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Cervical vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_l1",
    "node": "Vertebra L1",
    "fmaId": "TA2:vertebra_l1",
    "namePtBr": "Vertebra L1",
    "nameEn": "Vertebra L1",
    "nameLatin": "Vertebra lumborum I",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Lumbar vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_l2",
    "node": "Vertebra L2",
    "fmaId": "TA2:vertebra_l2",
    "namePtBr": "Vertebra L2",
    "nameEn": "Vertebra L2",
    "nameLatin": "Vertebra lumborum II",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Lumbar vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_l3",
    "node": "Vertebra L3",
    "fmaId": "TA2:vertebra_l3",
    "namePtBr": "Vertebra L3",
    "nameEn": "Vertebra L3",
    "nameLatin": "Vertebra lumborum III",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Lumbar vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_l4",
    "node": "Vertebra L4",
    "fmaId": "TA2:vertebra_l4",
    "namePtBr": "Vertebra L4",
    "nameEn": "Vertebra L4",
    "nameLatin": "Vertebra lumborum IV",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Lumbar vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_l5",
    "node": "Vertebra L5",
    "fmaId": "TA2:vertebra_l5",
    "namePtBr": "Vertebra L5",
    "nameEn": "Vertebra L5",
    "nameLatin": "Vertebra lumborum V",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Lumbar vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_t1",
    "node": "Vertebra T1",
    "fmaId": "TA2:vertebra_t1",
    "namePtBr": "Vertebra T1",
    "nameEn": "Vertebra T1",
    "nameLatin": "Vertebra thoracis I",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Thoracic vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_t2",
    "node": "Vertebra T2",
    "fmaId": "TA2:vertebra_t2",
    "namePtBr": "Vertebra T2",
    "nameEn": "Vertebra T2",
    "nameLatin": "Vertebra thoracis II",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Thoracic vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_t3",
    "node": "Vertebra T3",
    "fmaId": "TA2:vertebra_t3",
    "namePtBr": "Vertebra T3",
    "nameEn": "Vertebra T3",
    "nameLatin": "Vertebra thoracis III",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Thoracic vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_t4",
    "node": "Vertebra T4",
    "fmaId": "TA2:vertebra_t4",
    "namePtBr": "Vertebra T4",
    "nameEn": "Vertebra T4",
    "nameLatin": "Vertebra thoracis IV",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Thoracic vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_t9",
    "node": "Vertebra T9",
    "fmaId": "TA2:vertebra_t9",
    "namePtBr": "Vertebra T9",
    "nameEn": "Vertebra T9",
    "nameLatin": "Vertebra thoracis IX",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Thoracic vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_t5",
    "node": "Vertebra T5",
    "fmaId": "TA2:vertebra_t5",
    "namePtBr": "Vertebra T5",
    "nameEn": "Vertebra T5",
    "nameLatin": "Vertebra thoracis V",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Thoracic vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_t6",
    "node": "Vertebra T6",
    "fmaId": "TA2:vertebra_t6",
    "namePtBr": "Vertebra T6",
    "nameEn": "Vertebra T6",
    "nameLatin": "Vertebra thoracis VI",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Thoracic vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_t7",
    "node": "Vertebra T7",
    "fmaId": "TA2:vertebra_t7",
    "namePtBr": "Vertebra T7",
    "nameEn": "Vertebra T7",
    "nameLatin": "Vertebra thoracis VII",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Thoracic vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_t8",
    "node": "Vertebra T8",
    "fmaId": "TA2:vertebra_t8",
    "namePtBr": "Vertebra T8",
    "nameEn": "Vertebra T8",
    "nameLatin": "Vertebra thoracis VIII",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Thoracic vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_t10",
    "node": "Vertebra T10",
    "fmaId": "TA2:vertebra_t10",
    "namePtBr": "Vertebra T10",
    "nameEn": "Vertebra T10",
    "nameLatin": "Vertebra thoracis X",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Thoracic vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_t11",
    "node": "Vertebra T11",
    "fmaId": "TA2:vertebra_t11",
    "namePtBr": "Vertebra T11",
    "nameEn": "Vertebra T11",
    "nameLatin": "Vertebra thoracis XI",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Thoracic vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:vertebra_t12",
    "node": "Vertebra T12",
    "fmaId": "TA2:vertebra_t12",
    "namePtBr": "Vertebra T12",
    "nameEn": "Vertebra T12",
    "nameLatin": "Vertebra thoracis XII",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Vertebral column",
      "Bones of vertebral column",
      "Thoracic vertebrae"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  },
  {
    "id": "za:gallbladder",
    "node": "Gallbladder",
    "fmaId": "TA2:gallbladder",
    "namePtBr": "Gallbladder",
    "nameEn": "Gallbladder",
    "nameLatin": "Vesica biliaris",
    "chapter": 8,
    "system": "digestive",
    "meshFile": "digestive_male.glb",
    "path": [
      "Digestive system"
    ],
    "explosionVector": {
      "x": 0.5,
      "y": -0.2,
      "z": 0.8
    }
  },
  {
    "id": "za:urinary_bladder",
    "node": "Urinary bladder",
    "fmaId": "TA2:urinary_bladder",
    "namePtBr": "Urinary bladder",
    "nameEn": "Urinary bladder",
    "nameLatin": "Vesica urinaria",
    "chapter": 9,
    "system": "renal",
    "meshFile": "renal_male.glb",
    "path": [
      "Urinary system"
    ],
    "explosionVector": {
      "x": 0.7,
      "y": -0.2,
      "z": -0.5
    }
  },
  {
    "id": "za:vestibule_l",
    "node": "Vestibule.l",
    "fmaId": "TA2:vestibule_l",
    "namePtBr": "Vestibule Esquerdo",
    "nameEn": "Vestibule (left)",
    "nameLatin": "Vestibulum",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Ear",
      "Internal ear",
      "Bony labyrinth",
      "Vestibule"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:vestibule_r",
    "node": "Vestibule.r",
    "fmaId": "TA2:vestibule_r",
    "namePtBr": "Vestibule Direito",
    "nameEn": "Vestibule (right)",
    "nameLatin": "Vestibulum",
    "chapter": 4,
    "system": "nervous",
    "meshFile": "nervous_male.glb",
    "path": [
      "Sense organs",
      "Ear",
      "Internal ear",
      "Bony labyrinth",
      "Vestibule"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0.8,
      "z": 0
    }
  },
  {
    "id": "za:vomer",
    "node": "Vomer",
    "fmaId": "TA2:vomer",
    "namePtBr": "Vômer",
    "nameEn": "Vomer",
    "nameLatin": "Vomer",
    "chapter": 2,
    "system": "skeletal",
    "meshFile": "skeletal_male.glb",
    "path": [
      "Axial skeleton"
    ],
    "explosionVector": {
      "x": 0,
      "y": 0,
      "z": 0.5
    }
  }
];

// Normalização de nomes de malha idêntica à do Three.js (THREE.PropertyBinding.sanitizeNodeName)
export function sanitizeNodeName(name: string): string {
  if (!name) return '';
  return name.replace(/\s+/g, '_').replace(/[\.\:\/]/g, '');
}

// Índice de lookup O(1) por nome exato do nó GLTF e por nome sanitizado Three.js em runtime
export const Z_ANATOMY_BY_NODE: Record<string, ZAnatomyItem> = {};
for (const item of Z_ANATOMY_CATALOG) {
  Z_ANATOMY_BY_NODE[item.node] = item;
  const san = sanitizeNodeName(item.node);
  if (san) {
    Z_ANATOMY_BY_NODE[san] = item;
  }
}

// Índice de lookup O(1) por ID único
export const Z_ANATOMY_BY_ID: Record<string, ZAnatomyItem> = Object.fromEntries(
  Z_ANATOMY_CATALOG.map((item) => [item.id, item])
);

// Lista exclusiva dos 335 ossos do esqueleto humano completo
export const Z_ANATOMY_SKELETAL = Z_ANATOMY_CATALOG.filter(
  (item) => item.system === 'skeletal' || item.meshFile === 'skeletal_male.glb'
);
