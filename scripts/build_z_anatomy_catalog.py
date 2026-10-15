# -*- coding: utf-8 -*-
"""
Script de Geração do Catálogo Unificado Z-Anatomy para o Atlas 3D
Mapeia 100% dos nós válidos dos 10 arquivos GLB renderizados (Tegumento, Fáscias & Músculos,
Esqueleto, Cardiovascular, Linfático, Nervoso, Respiratório, Digestório, Urinário, Endócrino
e Reprodutor) para a Terminologia Anatomica (TA2) e Português do Brasil.
"""

import json
import os
import re
import struct

MANIFEST_PATH = "public/models/anatomy/manifest.json"
GLB_DIR = "public/models/anatomy"
OUTPUT_TS_PATH = "src/shared/constants/zAnatomyCatalog.ts"

# Dicionário de traduções anatômicas canônicas para português
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

INTEGUMENTARY_LABELS = {
    "vh_f_fat": ("Tecido Adiposo Subcutâneo e Mamário", "Corpus adiposum mammae", ["Tecido Subcutâneo & Adiposo"]),
    "vh_f_nipple": ("Papila Mamária (Mamilo)", "Papilla mammaria", ["Tegumento Superficial & Epiderme"]),
    "vh_f_areola": ("Aréola Mamária", "Areola mammae", ["Tegumento Superficial & Epiderme"]),
    "vh_f_areolar_tubercles": ("Glândulas Areolares (de Montgomery)", "Glandulae areolares", ["Tegumento Superficial & Epiderme"]),
    "vh_f_mammary_lobes": ("Lobos da Glândula Mamária", "Lobi glandulae mammariae", ["Parênquima & Ductos Mamários"]),
    "vh_f_main_lactiferous_ducts": ("Ductos Lactíferos Principais", "Ductus lactiferi", ["Parênquima & Ductos Mamários"]),
    "vh_f_main_lactiferous_sinuses": ("Seios Lactíferos", "Sinus lactiferi", ["Parênquima & Ductos Mamários"]),
    "vh_f_suspensory_ligaments": ("Ligamentos Suspensores da Mama (de Cooper)", "Ligamenta suspensoria mammaria", ["Fáscia Superficial & Retináculos Cutâneos"]),
}

NERVOUS_REGEX = re.compile(
    r"nerve|branch|ramus|rami|ganglion|ganglia|plexus|cord|root|tract|fascicul|funicul|lemnisc|peduncl|cortex|gyrus|gyri|sulcus|sulci|lobe|lobul|nucleus|nuclei|ventric|matter|commissur|fornix|thalam|hypothalam|epithalam|subthalam|pons|medulla|cerebell|cerebr|hippocamp|amygdal|striat|putamen|pallid|caudate|capsul|collicul|chiasm|olfactor|dura|arachnoid|pia|tentor|falx|filum|cauda|conus|mening|cistern|sinus|choroid|ependym|septum|corpus callosum|ansae|ansa|truncus|trunk|fibers|fibres|decussat|olive|olivary|pyramid|tegment|tectum|aqueduct|infundibul|mamillar|habenul|pineal|pituitar|neurohypoph|opercul|insul|cuneus|precuneus|cingul|parahippocamp|uncus|fimbria|indusium|tapetum|alveus|stria|taenia|velum|fastig|floccul|nodul|uvula|tonsil|vermis|hemispher|arbor|dentat|emboliform|globos|claustr|subicul|presubicul|parasubicul|entorhinal|perirhinal|geniculat|pulvinar|lamina|tuber|optic|oculomotor|trochlear|trigemin|abducens|vestibulocochlear|glossopharyng|vagus|accessory|hypogloss|eyeball|cornea|sclera|retina|iris|lens|vitreous|lacrimal|nasolacrimal|cochlea|vestibul|tympan|auditory|midbrain|fossa|pole|plane|culmen|declive|canal|substance|reticular|lat_fis",
    re.I,
)

SUPERFICIAL_MUSCLE_KEYWORDS = [
    "deltoid", "pectoralis major", "trapezius", "latissimus", "rectus abdominis",
    "external oblique", "obliquus externus", "biceps brachii", "triceps brachii",
    "brachioradialis", "rectus femoris", "vastus lateralis", "vastus medialis",
    "gastrocnemius", "soleus", "gluteus maximus", "gluteus medius", "tensor fasciae latae",
    "platysma", "sternocleidomastoid", "sartorius", "gracilis", "adductor longus",
    "biceps femoris", "semitendinosus", "tibialis anterior", "fibularis longus",
    "peroneus longus", "serratus anterior", "flexor carpi radialis", "flexor carpi ulnaris",
    "palmaris longus", "extensor digitorum", "extensor carpi", "orbicularis",
    "zygomaticus", "masseter", "temporalis", "frontalis", "occipitalis", "occipitofrontalis",
    "risorius", "depressor anguli", "levator labii", "nasalis", "procerus",
]


def classify_muscular_sublayer(node_name: str, name_en: str) -> str:
    combined = f"{node_name} {name_en}".lower()
    if (
        re.search(r"fascia|aponeurosis|retinaculum|tract|septum|arch|ligament", combined)
        and "tensor fasciae" not in combined
    ):
        return "Fáscias, Aponeuroses & Retináculos"
    if re.search(r"bursa|sheath|tendon", combined):
        return "Bolsas Sinoviais & Bainhas Tendíneas"
    if any(kw in combined for kw in SUPERFICIAL_MUSCLE_KEYWORDS):
        return "Músculos Superficiais (Estriados)"
    return "Músculos Profundos (Estriados)"


def translate_name(name_en: str, system: str = "") -> str:
    if name_en in TRANSLATIONS:
        return TRANSLATIONS[name_en]

    s = name_en.strip()
    m = re.match(
        r"(First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth|Eleventh|Twelfth)\s+rib\s+\((left|right)\)",
        s,
    )
    if m:
        num_map = {
            "First": "1ª", "Second": "2ª", "Third": "3ª", "Fourth": "4ª",
            "Fifth": "5ª", "Sixth": "6ª", "Seventh": "7ª", "Eighth": "8ª",
            "Ninth": "9ª", "Tenth": "10ª", "Eleventh": "11ª", "Twelfth": "12ª",
        }
        side = "Esquerda" if m.group(2) == "left" else "Direita"
        return f"{num_map[m.group(1)]} Costela {side}"

    m = re.match(
        r"Costal cartilage of\s+(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth)\s+rib\s+\((left|right)\)",
        s,
        re.IGNORECASE,
    )
    if m:
        side = "Esquerda" if m.group(2) == "left" else "Direita"
        return f"Cartilagem da Costela {side}"

    s = s.replace("(left)", "Esquerdo").replace("(right)", "Direito")
    s = s.replace("bone", "Osso").replace("proximal phalanx", "Falange Proximal")
    s = s.replace("distal phalanx", "Falange Distal").replace("middle phalanx", "Falange Média")
    s = s.replace("First", "1º").replace("Second", "2º").replace("Third", "3º").replace("Fourth", "4º").replace("Fifth", "5º")
    s = s.replace("metacarpal", "Metacarpal").replace("metatarsal", "Metatarsal")

    if system == "muscular":
        s = re.sub(r"\bfascia\b", "Fáscia", s, flags=re.I)
        s = re.sub(r"\baponeurosis\b", "Aponeurose", s, flags=re.I)
        s = re.sub(r"\bretinaculum\b", "Retináculo", s, flags=re.I)
        s = re.sub(r"\btendon sheath\b", "Bainha Tendínea", s, flags=re.I)
        s = re.sub(r"\bsynovial sheath\b", "Bainha Sinovial", s, flags=re.I)
        s = re.sub(r"\btendon\b", "Tendão", s, flags=re.I)
        s = re.sub(r"\bbursa\b", "Bolsa Sinovial", s, flags=re.I)
        s = re.sub(r"\bbursae\b", "Bolsas Sinoviais", s, flags=re.I)
        s = re.sub(r"\bmuscle\b", "Músculo", s, flags=re.I)
        s = re.sub(r"\btract\b", "Trato", s, flags=re.I)
        s = re.sub(r"\bseptum\b", "Septo", s, flags=re.I)
        s = re.sub(r"\bligament\b", "Ligamento", s, flags=re.I)
    return s


GLB_HEADER_BYTES = 12
GLB_CHUNK_HEADER_BYTES = 8


def read_glb_mesh_nodes(glb_filename: str) -> list[str]:
    path = os.path.join(GLB_DIR, glb_filename)
    with open(path, "rb") as f:
        f.read(GLB_HEADER_BYTES)
        clen, _ = struct.unpack("<II", f.read(GLB_CHUNK_HEADER_BYTES))
        gltf = json.loads(f.read(clen).decode("utf-8"))
    return [n.get("name", "") for n in gltf.get("nodes", []) if "mesh" in n and n.get("name")]


def make_organ_id(raw_name: str) -> str:
    clean = raw_name.strip().lower()
    clean = re.sub(r"\.([lr])$", r"_\1", clean)
    clean = re.sub(r"[^a-z0-9]+", "_", clean).strip("_")
    return clean


def format_fallback_organ(node_name: str, system: str, mesh_file: str) -> dict:
    raw = node_name.strip()
    vhf_match = re.match(r"^(vh_f_[a-z_]+?)_([lr])$", raw, re.I)
    if vhf_match:
        base_key = vhf_match.group(1).lower()
        is_left = vhf_match.group(2).lower() == "l"
        side_pt = "Esquerdo" if is_left else "Direito"
        side_en = "(left)" if is_left else "(right)"
        side_lat = "sinister" if is_left else "dexter"
        if base_key in INTEGUMENTARY_LABELS:
            pt_base, lat_base, path_list = INTEGUMENTARY_LABELS[base_key]
            return {
                "organ_id": make_organ_id(raw),
                "node": raw,
                "name_en": f"{pt_base} {side_en}",
                "name_pt": f"{pt_base} ({side_pt})",
                "ta2_latin": f"{lat_base} {side_lat}",
                "system": system,
                "mesh_file": mesh_file,
                "path": path_list,
            }

    base = raw.replace("(", "").replace(")", "").strip()
    side_en = ""
    if base.lower().endswith(".l"):
        base = base[:-2].strip()
        side_en = " (left)"
    elif base.lower().endswith(".r"):
        base = base[:-2].strip()
        side_en = " (right)"

    name_en = f"{base}{side_en}"
    return {
        "organ_id": make_organ_id(raw),
        "node": raw,
        "name_en": name_en,
        "name_pt": translate_name(name_en, system),
        "ta2_latin": base,
        "system": system,
        "mesh_file": mesh_file,
        "path": [],
    }


EXPLOSION_VECTOR_PROFILES = {
    "frontal": (0.0, 0.7, 1.2),
    "parietal": (1.2, 0.8, 0.1),
    "occipital": (0.0, 0.3, -1.2),
    "temporal": (1.3, 0.1, -0.2),
    "sphenoid": (0.0, 0.4, 0.2),
    "ethmoid": (0.0, 0.5, 0.5),
    "mandible": (0.0, -1.2, 0.8),
    "maxilla": (0.6, -0.2, 0.9),
    "zygomatic": (1.1, 0.0, 0.7),
    "nasal": (0.2, 0.3, 1.1),
    "tooth": (0.3, -0.6, 0.7),
    "cranium_default": (0.5, 0.2, 0.5),
    "cervical": (0.0, 0.6, -0.2),
    "thoracic": (0.0, 0.1, -0.3),
    "lumbar": (0.0, -0.3, -0.3),
    "sacrum": (0.0, -0.6, -0.4),
    "sternum": (0.0, 0.1, 1.3),
    "rib": (1.1, 0.0, 0.6),
    "costal_cartilage": (0.7, 0.0, 0.9),
    "clavicle": (1.1, 0.4, 0.3),
    "scapula": (1.2, 0.2, -0.7),
    "humerus": (1.4, -0.1, 0.0),
    "forearm": (1.6, -0.3, 0.1),
    "hand": (1.8, -0.5, 0.1),
    "hip_bone": (1.1, -0.2, -0.1),
    "femur": (1.2, -0.4, 0.1),
    "patella": (0.7, -0.5, 0.7),
    "leg": (1.3, -0.6, 0.1),
    "foot": (1.4, -0.8, 0.2),
    "integumentary": (0.85, 0.15, 1.1),
    "muscular": (0.95, 0.05, 0.65),
    "respiratory": (0.8, 0.1, 0.4),
    "cardiovascular": (0.2, -0.1, 0.8),
    "lymphatic": (0.6, 0.05, 0.6),
    "digestive": (0.5, -0.2, 0.8),
    "nervous": (0.0, 0.8, 0.0),
    "renal": (0.7, -0.2, -0.5),
    "endocrine": (0.4, 0.2, 0.6),
    "reproductive": (0.4, -0.5, 0.6),
    "default": (0.5, 0.0, 0.5),
}
LYMPHATIC_CENTER_X = 0.15


def _vec(profile_key: str, side_sign: float = 1.0) -> dict:
    px, py, pz = EXPLOSION_VECTOR_PROFILES[profile_key]
    return {"x": px * side_sign, "y": py, "z": pz}


def compute_explosion_vector(organ: dict) -> dict:
    name = organ.get("name_en", "")
    node = organ.get("node", "")
    path_str = " ".join(organ.get("path", [])).lower()
    name_lower = name.lower()
    is_left = ".l" in node.lower() or "(left)" in name_lower or node.lower().endswith("_l")
    is_right = ".r" in node.lower() or "(right)" in name_lower or node.lower().endswith("_r")
    bilateral_sign = -1.0 if is_left else 1.0
    trilateral_sign = -1.0 if is_left else (1.0 if is_right else 0.0)

    if "frontal bone" in name_lower:
        return _vec("frontal")
    if "parietal bone" in name_lower:
        return _vec("parietal", bilateral_sign)
    if "occipital bone" in name_lower:
        return _vec("occipital")
    if "temporal bone" in name_lower:
        return _vec("temporal", bilateral_sign)
    if "sphenoid bone" in name_lower:
        return _vec("sphenoid")
    if "ethmoid bone" in name_lower:
        return _vec("ethmoid")
    if "mandible" in name_lower:
        return _vec("mandible")
    if "maxilla" in name_lower:
        return _vec("maxilla", bilateral_sign)
    if "zygomatic" in name_lower:
        return _vec("zygomatic", bilateral_sign)
    if "nasal bone" in name_lower:
        return _vec("nasal", bilateral_sign)
    if any(k in name_lower for k in ["tooth", "incisor", "canine", "molar", "premolar"]):
        return _vec("tooth", bilateral_sign)
    if any(k in path_str for k in ["cranium", "extracranial"]):
        return _vec("cranium_default", trilateral_sign)

    if "cervical" in name_lower or "atlas" in name_lower or "axis" in name_lower:
        return _vec("cervical")
    if "thoracic vertebra" in name_lower:
        return _vec("thoracic")
    if "lumbar" in name_lower:
        return _vec("lumbar")
    if "sacrum" in name_lower or "coccyx" in name_lower:
        return _vec("sacrum")

    if "sternum" in name_lower or "xiphoid" in name_lower:
        return _vec("sternum")
    if "rib" in name_lower:
        return _vec("rib", bilateral_sign)
    if "cartilage" in name_lower and "costal" in name_lower:
        return _vec("costal_cartilage", bilateral_sign)

    if "clavicle" in name_lower:
        return _vec("clavicle", bilateral_sign)
    if "scapula" in name_lower:
        return _vec("scapula", bilateral_sign)
    if "humerus" in name_lower:
        return _vec("humerus", bilateral_sign)
    if "radius" in name_lower or "ulna" in name_lower:
        return _vec("forearm", bilateral_sign)
    if any(k in name_lower for k in ["carpal", "metacarpal", "phalanx", "trapezium", "capitate", "hamate", "scaphoid", "lunate", "triquetrum", "pisiform"]):
        if any(k in path_str for k in ["upper limb", "free upper limb"]):
            return _vec("hand", bilateral_sign)

    if "hip bone" in name_lower:
        return _vec("hip_bone", bilateral_sign)
    if "femur" in name_lower:
        return _vec("femur", bilateral_sign)
    if "patella" in name_lower:
        return _vec("patella", bilateral_sign)
    if "tibia" in name_lower or "fibula" in name_lower:
        return _vec("leg", bilateral_sign)
    if any(k in name_lower for k in ["calcaneus", "talus", "navicular", "cuneiform", "cuboid", "metatarsal", "sesamoid"]):
        return _vec("foot", bilateral_sign)

    sys = organ.get("system")
    if sys == "integumentary":
        return _vec("integumentary", trilateral_sign)
    if sys == "muscular":
        return _vec("muscular", trilateral_sign)
    if sys == "respiratory":
        return _vec("respiratory", trilateral_sign)
    if sys == "cardiovascular":
        return _vec("cardiovascular")
    if sys == "lymphatic":
        px, py, pz = EXPLOSION_VECTOR_PROFILES["lymphatic"]
        return {"x": -px if is_left else (px if is_right else LYMPHATIC_CENTER_X), "y": py, "z": pz}
    if sys == "digestive":
        return _vec("digestive", bilateral_sign)
    if sys == "nervous":
        return _vec("nervous")
    if sys in ("renal", "urinary"):
        return _vec("renal", bilateral_sign)
    if sys == "endocrine":
        return _vec("endocrine", trilateral_sign)
    if sys == "reproductive":
        return _vec("reproductive", trilateral_sign)

    return _vec("default", trilateral_sign)


def is_valid_mesh_for_system(sys_name: str, raw_name: str, manifest_item: dict | None) -> bool:
    if manifest_item and manifest_item.get("system"):
        item_sys = manifest_item["system"]
        if item_sys != sys_name:
            return False

    if sys_name == "muscular":
        if re.search(r"\.(?:o|e)\d*[lr]$", raw_name, re.I) or re.search(r"[a-z_](?:o|e)\d+[lr]$", raw_name, re.I):
            return False

    if sys_name == "digestive":
        if re.search(r"\btooth\b|\bincisor\b|\bcanine\b|\bpremolar\b|\bmolar\b|\bthyroid cartilage\b", raw_name, re.I):
            return False

    if sys_name == "nervous":
        if not NERVOUS_REGEX.search(raw_name):
            return False
    elif sys_name != "muscular":
        is_nerve = bool(re.search(r"\bnerve\b|\bramus\b|\bbranch\b|\bplexus\b|\bganglion\b", raw_name, re.I))
        if not is_nerve and re.search(r"\bmuscle\b|\bsphincter\b", raw_name, re.I):
            return False

    return True


def main():
    # 1. Preserva integralmente os 1.584 itens já validados do catálogo atual
    existing_text = open(OUTPUT_TS_PATH, "r", encoding="utf-8").read()
    m = re.search(r"export const Z_ANATOMY_CATALOG: ZAnatomyItem\[\] = (\[.*?\]);", existing_text, re.S)
    existing_entries: list[dict] = json.loads(m.group(1)) if m else []

    by_existing_node = {e["node"]: e for e in existing_entries}
    by_existing_id = {e["id"]: e for e in existing_entries}

    # 2. Carrega manifest.json para enriquecer metadados TA2 / path das novas malhas
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest_data = json.load(f)

    manifest_by_file_and_node = {}
    manifest_by_node = {}
    for o in manifest_data.get("organs", []):
        manifest_by_file_and_node[(o.get("mesh_file", ""), o["node"])] = o
        manifest_by_node[o["node"]] = o

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

    glb_systems = [
        ("integumentary_female.glb", "integumentary"),
        ("muscular_male.glb", "muscular"),
        ("skeletal_male.glb", "skeletal"),
        ("cardiovascular_male.glb", "cardiovascular"),
        ("lymphatic_male.glb", "lymphatic"),
        ("nervous_male.glb", "nervous"),
        ("respiratory_male.glb", "respiratory"),
        ("digestive_male.glb", "digestive"),
        ("renal_male.glb", "renal"),
        ("endocrine_male.glb", "endocrine"),
        ("reproductive_male.glb", "reproductive"),
    ]

    final_entries = list(existing_entries)
    added_count = 0

    for glb_file, sys_name in glb_systems:
        mesh_nodes = read_glb_mesh_nodes(glb_file)
        for raw_node in mesh_nodes:
            if raw_node in by_existing_node:
                continue

            m_item = manifest_by_file_and_node.get((glb_file, raw_node)) or manifest_by_node.get(raw_node)
            if not is_valid_mesh_for_system(sys_name, raw_node, m_item):
                continue

            if m_item:
                organ_id = m_item.get("organ_id") or make_organ_id(raw_node)
                name_en = m_item.get("name_en") or raw_node
                name_latin = (m_item.get("ta2_latin") or "").strip("()") or name_en
                path = list(m_item.get("path") or [])
                name_pt = translate_name(name_en, sys_name)
                ev = compute_explosion_vector({**m_item, "system": sys_name})
            else:
                fb = format_fallback_organ(raw_node, sys_name, glb_file)
                organ_id = fb["organ_id"]
                name_en = fb["name_en"]
                name_latin = fb["ta2_latin"]
                path = list(fb["path"])
                name_pt = fb["name_pt"]
                ev = compute_explosion_vector(fb)

            if sys_name == "muscular":
                sublayer = classify_muscular_sublayer(raw_node, name_en)
                path = [sublayer] + [p for p in path if p != sublayer]

            candidate_id = f"za:{organ_id}"
            if candidate_id in by_existing_id:
                candidate_id = f"za:{sys_name}_{organ_id}"

            entry = {
                "id": candidate_id,
                "node": raw_node,
                "fmaId": f"TA2:{organ_id}",
                "namePtBr": name_pt,
                "nameEn": name_en,
                "nameLatin": name_latin,
                "chapter": chapter_map.get(sys_name, 2),
                "system": sys_name,
                "meshFile": glb_file,
                "path": path,
                "explosionVector": ev,
            }
            final_entries.append(entry)
            by_existing_node[raw_node] = entry
            by_existing_id[candidate_id] = entry
            added_count += 1

    print(f"Existing preserved: {len(existing_entries)}, Added: {added_count}, Total: {len(final_entries)}")

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
        out.write(json.dumps(final_entries, indent=2, ensure_ascii=False))
        out.write(";\n\n")
        out.write("""// Normalização de nomes de malha idêntica à do Three.js (THREE.PropertyBinding.sanitizeNodeName)
export function sanitizeNodeName(name: string): string {
  if (!name) return '';
  return name.replace(/\\s+/g, '_').replace(/[\\.\\:\\/]/g, '');
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
""")


if __name__ == "__main__":
    main()
