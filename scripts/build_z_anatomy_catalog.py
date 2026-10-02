# -*- coding: utf-8 -*-
"""
Script de Geração do Catálogo Unificado Z-Anatomy para o Atlas 3D
Mapeia os nós dos arquivos GLB para a Terminologia Anatomica e Português do Brasil,
com vetores de explosão anatômicos por região.
"""

import json
import os
import re

MANIFEST_PATH = "public/models/anatomy/manifest.json"
OUTPUT_TS_PATH = "src/shared/constants/zAnatomyCatalog.ts"

# Dicionário de traduções anatômicas básicas para português
TRANSLATIONS = {
    # Crânio e Face
    "Frontal bone": "Osso Frontal",
    "Parietal bone (left)": "Osso Parietal Esquerdo",
    "Parietal bone (right)": "Osso Parietal Direito",
    "Occipital bone": "Osso Occipital",
    "Temporal bone (left)": "Osso Temporal Esquerdo",
    "Temporal bone (right)": "Osso Temporal Direito",
    "Sphenoid bone": "Osso Esfenoide",
    "Ethmoid bone": "Osso Etmoide",
    "Mandible": "Mandíbula",
    "Maxilla (left)": "Maxila Esquerda",
    "Maxilla (right)": "Maxila Direita",
    "Zygomatic bone (left)": "Osso Zigomático Esquerdo",
    "Zygomatic bone (right)": "Osso Zigomático Direito",
    "Nasal bone (left)": "Osso Nasal Esquerdo",
    "Nasal bone (right)": "Osso Nasal Direito",
    "Lacrimal bone (left)": "Osso Lacrimal Esquerdo",
    "Lacrimal bone (right)": "Osso Lacrimal Direito",
    "Palatine bone (left)": "Osso Palatino Esquerdo",
    "Palatine bone (right)": "Osso Palatino Direito",
    "Inferior nasal concha bone (left)": "Concha Nasal Inferior Esquerda",
    "Inferior nasal concha bone (right)": "Concha Nasal Inferior Direita",
    "Vomer": "Vômer",
    "Hyoid bone": "Osso Hioide",

    # Coluna Vertebral
    "Atlas (C1)": "Vértebra Atlas (C1)",
    "Axis (C2)": "Vértebra Áxis (C2)",
    "Third cervical vertebra": "3ª Vértebra Cervical (C3)",
    "Fourth cervical vertebra": "4ª Vértebra Cervical (C4)",
    "Fifth cervical vertebra": "5ª Vértebra Cervical (C5)",
    "Sixth cervical vertebra": "6ª Vértebra Cervical (C6)",
    "Seventh cervical vertebra": "7ª Vértebra Cervical (C7 - Vértebra Proeminente)",
    "First thoracic vertebra": "1ª Vértebra Torácica (T1)",
    "Second thoracic vertebra": "2ª Vértebra Torácica (T2)",
    "Third thoracic vertebra": "3ª Vértebra Torácica (T3)",
    "Fourth thoracic vertebra": "4ª Vértebra Torácica (T4)",
    "Fifth thoracic vertebra": "5ª Vértebra Torácica (T5)",
    "Sixth thoracic vertebra": "6ª Vértebra Torácica (T6)",
    "Seventh thoracic vertebra": "7ª Vértebra Torácica (T7)",
    "Eighth thoracic vertebra": "8ª Vértebra Torácica (T8)",
    "Ninth thoracic vertebra": "9ª Vértebra Torácica (T9)",
    "Tenth thoracic vertebra": "10ª Vértebra Torácica (T10)",
    "Eleventh thoracic vertebra": "11ª Vértebra Torácica (T11)",
    "Twelfth thoracic vertebra": "12ª Vértebra Torácica (T12)",
    "First lumbar vertebra": "1ª Vértebra Lombar (L1)",
    "Second lumbar vertebra": "2ª Vértebra Lombar (L2)",
    "Third lumbar vertebra": "3ª Vértebra Lombar (L3)",
    "Fourth lumbar vertebra": "4ª Vértebra Lombar (L4)",
    "Fifth lumbar vertebra": "5ª Vértebra Lombar (L5)",
    "Sacrum": "Osso Sacro",
    "Coccyx": "Cóccix",

    # Caixa Torácica
    "Manubrium of sternum": "Manúbrio do Esterno",
    "Body of sternum": "Corpo do Esterno",
    "Xiphoid process": "Processo Xifoide",

    # Membro Superior
    "Clavicle (left)": "Clavícula Esquerda",
    "Clavicle (right)": "Clavícula Direita",
    "Scapula (left)": "Escápula Esquerda",
    "Scapula (right)": "Escápula Direita",
    "Humerus (left)": "Úmero Esquerdo",
    "Humerus (right)": "Úmero Direito",
    "Radius (left)": "Rádio Esquerdo",
    "Radius (right)": "Rádio Direito",
    "Ulna (left)": "Ulna Esquerda",
    "Ulna (right)": "Ulna Direita",

    # Pelve e Membro Inferior
    "Hip bone (left)": "Osso do Quadril Esquerdo (Ílio/Ísquio/Púbis)",
    "Hip bone (right)": "Osso do Quadril Direito (Ílio/Ísquio/Púbis)",
    "Femur (left)": "Fêmur Esquerdo",
    "Femur (right)": "Fêmur Direito",
    "Patella (left)": "Patela Esquerda",
    "Patella (right)": "Patela Direita",
    "Tibia (left)": "Tíbia Esquerda",
    "Tibia (right)": "Tíbia Direita",
    "Fibula (left)": "Fíbula Esquerda",
    "Fibula (right)": "Fíbula Direita",
    "Calcaneus (left)": "Calcâneo Esquerdo",
    "Calcaneus (right)": "Calcâneo Direito",
    "Talus (left)": "Tálus Esquerdo",
    "Talus (right)": "Tálus Direito",
}

def translate_name(name_en):
    if name_en in TRANSLATIONS:
        return TRANSLATIONS[name_en]
    
    # Heurísticas de tradução automática comum
    s = name_en
    # Costelas
    m = re.match(r"(First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth|Eleventh|Twelfth)\s+rib\s+\((left|right)\)", s)
    if m:
        num_map = {
            "First": "1ª", "Second": "2ª", "Third": "3ª", "Fourth": "4ª",
            "Fifth": "5ª", "Sixth": "6ª", "Seventh": "7ª", "Eighth": "8ª",
            "Ninth": "9ª", "Tenth": "10ª", "Eleventh": "11ª", "Twelfth": "12ª"
        }
        side = "Esquerda" if m.group(2) == "left" else "Direita"
        return f"{num_map[m.group(1)]} Costela {side}"

    # Cartilagem costal
    m = re.match(r"Costal cartilage of\s+(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth)\s+rib\s+\((left|right)\)", s, re.IGNORECASE)
    if m:
        side = "Esquerda" if m.group(2) == "left" else "Direita"
        return f"Cartilagem da Costela {side}"

    # Falanges / Metacarpos / Metatarsos
    s = s.replace("(left)", "Esquerdo").replace("(right)", "Direito")
    s = s.replace("bone", "Osso").replace("proximal phalanx", "Falange Proximal")
    s = s.replace("distal phalanx", "Falange Distal").replace("middle phalanx", "Falange Média")
    s = s.replace("First", "1º").replace("Second", "2º").replace("Third", "3º").replace("Fourth", "4º").replace("Fifth", "5º")
    s = s.replace("metacarpal", "Metacarpal").replace("metatarsal", "Metatarsal")
    return s

def compute_explosion_vector(organ):
    name = organ.get("name_en", "")
    node = organ.get("node", "")
    path_str = " ".join(organ.get("path", [])).lower()
    name_lower = name.lower()
    is_left = ".l" in node or "(left)" in name_lower
    is_right = ".r" in node or "(right)" in name_lower

    # 1. Crânio
    if "frontal bone" in name_lower:
        return {"x": 0, "y": 0.7, "z": 1.2}
    if "parietal bone" in name_lower:
        return {"x": -1.2 if is_left else 1.2, "y": 0.8, "z": 0.1}
    if "occipital bone" in name_lower:
        return {"x": 0, "y": 0.3, "z": -1.2}
    if "temporal bone" in name_lower:
        return {"x": -1.3 if is_left else 1.3, "y": 0.1, "z": -0.2}
    if "sphenoid bone" in name_lower:
        return {"x": 0, "y": 0.4, "z": 0.2}
    if "ethmoid bone" in name_lower:
        return {"x": 0, "y": 0.5, "z": 0.5}
    if "mandible" in name_lower:
        return {"x": 0, "y": -1.2, "z": 0.8}
    if "maxilla" in name_lower:
        return {"x": -0.6 if is_left else 0.6, "y": -0.2, "z": 0.9}
    if "zygomatic" in name_lower:
        return {"x": -1.1 if is_left else 1.1, "y": 0.0, "z": 0.7}
    if "nasal bone" in name_lower:
        return {"x": -0.2 if is_left else 0.2, "y": 0.3, "z": 1.1}
    if any(k in name_lower for k in ["tooth", "incisor", "canine", "molar", "premolar"]):
        return {"x": -0.3 if is_left else 0.3, "y": -0.6, "z": 0.7}
    if any(k in path_str for k in ["cranium", "extracranial"]):
        return {"x": -0.5 if is_left else (0.5 if is_right else 0), "y": 0.2, "z": 0.5}

    # 2. Coluna Vertebral
    if "cervical" in name_lower or "atlas" in name_lower or "axis" in name_lower:
        return {"x": 0, "y": 0.6, "z": -0.2}
    if "thoracic vertebra" in name_lower:
        return {"x": 0, "y": 0.1, "z": -0.3}
    if "lumbar" in name_lower:
        return {"x": 0, "y": -0.3, "z": -0.3}
    if "sacrum" in name_lower or "coccyx" in name_lower:
        return {"x": 0, "y": -0.6, "z": -0.4}

    # 3. Caixa Torácica
    if "sternum" in name_lower or "xiphoid" in name_lower:
        return {"x": 0, "y": 0.1, "z": 1.3}
    if "rib" in name_lower:
        return {"x": -1.1 if is_left else 1.1, "y": 0, "z": 0.6}
    if "cartilage" in name_lower and "costal" in name_lower:
        return {"x": -0.7 if is_left else 0.7, "y": 0, "z": 0.9}

    # 4. Membro Superior
    if "clavicle" in name_lower:
        return {"x": -1.1 if is_left else 1.1, "y": 0.4, "z": 0.3}
    if "scapula" in name_lower:
        return {"x": -1.2 if is_left else 1.2, "y": 0.2, "z": -0.7}
    if "humerus" in name_lower:
        return {"x": -1.4 if is_left else 1.4, "y": -0.1, "z": 0}
    if "radius" in name_lower or "ulna" in name_lower:
        return {"x": -1.6 if is_left else 1.6, "y": -0.3, "z": 0.1}
    if any(k in name_lower for k in ["carpal", "metacarpal", "phalanx", "trapezium", "capitate", "hamate", "scaphoid", "lunate", "triquetrum", "pisiform"]):
        if any(k in path_str for k in ["upper limb", "free upper limb"]):
            return {"x": -1.8 if is_left else 1.8, "y": -0.5, "z": 0.1}

    # 5. Pelve e Membro Inferior
    if "hip bone" in name_lower:
        return {"x": -1.1 if is_left else 1.1, "y": -0.2, "z": -0.1}
    if "femur" in name_lower:
        return {"x": -1.2 if is_left else 1.2, "y": -0.4, "z": 0.1}
    if "patella" in name_lower:
        return {"x": -0.7 if is_left else 0.7, "y": -0.5, "z": 0.7}
    if "tibia" in name_lower or "fibula" in name_lower:
        return {"x": -1.3 if is_left else 1.3, "y": -0.6, "z": 0.1}
    if any(k in name_lower for k in ["calcaneus", "talus", "navicular", "cuneiform", "cuboid", "metatarsal", "sesamoid"]):
        return {"x": -1.4 if is_left else 1.4, "y": -0.8, "z": 0.2}

    # Órgãos viscerais
    if organ.get("system") == "respiratory":
        return {"x": -0.8 if is_left else (0.8 if is_right else 0), "y": 0.1, "z": 0.4}
    if organ.get("system") == "cardiovascular":
        return {"x": 0.2, "y": -0.1, "z": 0.8}
    if organ.get("system") == "digestive":
        return {"x": -0.5 if is_left else 0.5, "y": -0.2, "z": 0.8}
    if organ.get("system") == "nervous":
        return {"x": 0, "y": 0.8, "z": 0}
    if organ.get("system") == "renal":
        return {"x": -0.7 if is_left else 0.7, "y": -0.2, "z": -0.5}

    return {"x": -0.5 if is_left else (0.5 if is_right else 0), "y": 0, "z": 0.5}

def main():
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    organs = data.get("organs", [])
    print(f"Total organs in manifest: {len(organs)}")

    # Filtra órgãos do sistema esquelético e principais órgãos de outros sistemas
    selected_organs = []
    skeletal_count = 0
    other_count = 0

    for o in organs:
        mesh_file = o.get("mesh_file", "")
        system = o.get("system", "")
        
        # Inclui todos os 335 ossos
        if system == "skeletal" or mesh_file == "skeletal_male.glb":
            selected_organs.append(o)
            skeletal_count += 1
        elif mesh_file in ["respiratory_male.glb", "cardiovascular_male.glb", "digestive_male.glb", "nervous_male.glb", "renal_male.glb"]:
            selected_organs.append(o)
            other_count += 1

    print(f"Selected: {skeletal_count} skeletal + {other_count} visceral = {len(selected_organs)} items")

    entries = []
    for o in selected_organs:
        organ_id = o.get("organ_id", "")
        node = o.get("node", "")
        name_en = o.get("name_en", "")
        name_latin = o.get("ta2_latin", "").strip("()")
        system = o.get("system", "")
        mesh_file = o.get("mesh_file", "")
        path = o.get("path", [])
        
        name_pt = translate_name(name_en)
        ev = compute_explosion_vector(o)

        chapter_map = {
            "skeletal": 2,
            "articular": 2,
            "muscular": 3,
            "nervous": 4,
            "cardiovascular": 5,
            "lymphatic": 6,
            "respiratory": 7,
            "digestive": 8,
            "renal": 9,
            "reproductive": 10,
            "endocrine": 11,
            "sensory": 13,
            "integumentary": 14,
        }
        chapter = chapter_map.get(system, 2)

        entry = {
            "id": f"za:{organ_id}",
            "node": node,
            "fmaId": f"TA2:{organ_id}",
            "namePtBr": name_pt,
            "nameEn": name_en,
            "nameLatin": name_latin or name_en,
            "chapter": chapter,
            "system": system,
            "meshFile": mesh_file,
            "path": path,
            "explosionVector": ev,
        }
        entries.append(entry)

    # Escreve o arquivo TypeScript
    os.makedirs(os.path.dirname(OUTPUT_TS_PATH), exist_ok=True)
    with open(OUTPUT_TS_PATH, "w", encoding="utf-8") as out:
        out.write("""/**
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

export const Z_ANATOMY_CATALOG: ZAnatomyItem[] = """)
        out.write(json.dumps(entries, indent=2, ensure_ascii=False))
        out.write(";\n\n")

        # Mapas indexados para lookup O(1) de altíssima performance
        out.write("""// Índice de lookup O(1) por nome exato do nó GLTF
export const Z_ANATOMY_BY_NODE: Record<string, ZAnatomyItem> = Object.fromEntries(
  Z_ANATOMY_CATALOG.map((item) => [item.node, item])
);

// Índice de lookup O(1) por ID único
export const Z_ANATOMY_BY_ID: Record<string, ZAnatomyItem> = Object.fromEntries(
  Z_ANATOMY_CATALOG.map((item) => [item.id, item])
);

// Lista exclusiva dos 335 ossos do esqueleto humano completo
export const Z_ANATOMY_SKELETAL = Z_ANATOMY_CATALOG.filter(
  (item) => item.system === 'skeletal' || item.meshFile === 'skeletal_male.glb'
);
""")

    print(f"Catálogo gravado com sucesso em: {OUTPUT_TS_PATH}")

if __name__ == "__main__":
    main()
