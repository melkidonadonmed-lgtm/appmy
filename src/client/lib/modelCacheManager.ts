import { ActiveAnatomicalSystem } from '../../shared/types/anatomy.ts';

export const ANATOMY_CACHE_NAME = 'appmy-anatomy-glb-cache-v1';

export interface AnatomyPartAssetInfo {
  id: ActiveAnatomicalSystem;
  labelPt: string;
  labelLatin: string;
  glbUrls: string[];
  sizeMb: number;
  meshCount: number;
  layerOrder: number;
  functionalSummaryPt: string;
  fpsImpact: 'low' | 'medium' | 'high';
}

/**
 * Manifesto canônico das partes/sistemas 3D (.GLB) com tamanho exato em disco,
 * contagem real de malhas, função fisiológica e impacto de draw-calls no FPS.
 */
export const ANATOMY_PARTS_MANIFEST: AnatomyPartAssetInfo[] = [
  {
    id: 'integumentary',
    labelPt: '1. Tegumento Comum & Mama',
    labelLatin: 'Integumentum commune & Mamma',
    glbUrls: ['/models/anatomy/integumentary_female.glb'],
    sizeMb: 0.14,
    meshCount: 11,
    layerOrder: 1,
    functionalSummaryPt:
      'Barreira epitelial protetora, termorregulação, sensibilidade exteroceptiva e parênquima mamário lactífero.',
    fpsImpact: 'low',
  },
  {
    id: 'muscular',
    labelPt: '2. Sistema Muscular & Fáscias',
    labelLatin: 'Systema musculare & Fasciae',
    glbUrls: ['/models/anatomy/muscular_male.glb'],
    sizeMb: 11.97,
    meshCount: 1388,
    layerOrder: 2,
    functionalSummaryPt:
      'Locomoção ativa, estabilidade postural dinâmica, contenção miofascial e produção de calor metabólico.',
    fpsImpact: 'high',
  },
  {
    id: 'skeletal',
    labelPt: '3. Esqueleto Axial & Apendicular',
    labelLatin: 'Systema skeletale (Ossa)',
    glbUrls: ['/models/anatomy/skeletal_male.glb'],
    sizeMb: 2.82,
    meshCount: 335,
    layerOrder: 3,
    functionalSummaryPt:
      'Sustentação biomecânica axial, proteção de órgãos vitais (caixa craniana e torácica), alavancas articulares e reserva mineral.',
    fpsImpact: 'medium',
  },
  {
    id: 'nervous',
    labelPt: '4. Sistema Nervoso Central & Periférico',
    labelLatin: 'Systema nervosum (Encephalon & Nervi)',
    glbUrls: ['/models/anatomy/nervous_male.glb'],
    sizeMb: 8.53,
    meshCount: 860,
    layerOrder: 4,
    functionalSummaryPt:
      'Processamento cognitivo, controle motor voluntário e autonômico, integração sensorial e condução pelos 12 pares cranianos e plexos.',
    fpsImpact: 'high',
  },
  {
    id: 'cardiovascular',
    labelPt: '5. Sistema Cardiovascular',
    labelLatin: 'Systema cardiovasculare (Cor & Vasa)',
    glbUrls: ['/models/anatomy/cardiovascular_male.glb'],
    sizeMb: 7.21,
    meshCount: 676,
    layerOrder: 5,
    functionalSummaryPt:
      'Propulsão hemodinâmica cardíaca, perfusão arterial de O2/nutrientes (incluindo Polígono de Willis) e retorno venoso sistêmico e pulmonar.',
    fpsImpact: 'high',
  },
  {
    id: 'lymphatic',
    labelPt: '6. Sistema Linfático & Imune',
    labelLatin: 'Systema lymphoideum',
    glbUrls: ['/models/anatomy/lymphatic_male.glb'],
    sizeMb: 2.11,
    meshCount: 353,
    layerOrder: 6,
    functionalSummaryPt:
      'Drenagem do fluido intersticial pelo ducto torácico, absorção de quilomícrons e vigilância imunológica linfonodal.',
    fpsImpact: 'medium',
  },
  {
    id: 'respiratory',
    labelPt: '7. Sistema Respiratório',
    labelLatin: 'Systema respiratorium',
    glbUrls: ['/models/anatomy/respiratory_male.glb'],
    sizeMb: 0.81,
    meshCount: 117,
    layerOrder: 7,
    functionalSummaryPt:
      'Condução aerífera laringotraqueobrônquica, hematose alvéolo-capilar (troca O2/CO2) e equilíbrio ácido-base.',
    fpsImpact: 'low',
  },
  {
    id: 'digestive',
    labelPt: '8. Sistema Digestório & Hepatobiliar',
    labelLatin: 'Systema digestorium',
    glbUrls: ['/models/anatomy/digestive_male.glb'],
    sizeMb: 1.03,
    meshCount: 159,
    layerOrder: 8,
    functionalSummaryPt:
      'Motilidade peristáltica, digestão enzimática, absorção enteral de nutrientes e metabolismo hepatopancreático.',
    fpsImpact: 'low',
  },
  {
    id: 'urinary',
    labelPt: '9. Sistema Renal & Urinário',
    labelLatin: 'Systema urinarium (Ren & Ureter)',
    glbUrls: ['/models/anatomy/renal_male.glb'],
    sizeMb: 0.31,
    meshCount: 41,
    layerOrder: 9,
    functionalSummaryPt:
      'Ultrafiltração glomerular, osmorregulação hidroeletrolítica, controle pressórico (SRAA) e excreção urinária.',
    fpsImpact: 'low',
  },
  {
    id: 'reproductive',
    labelPt: '10. Sistema Reprodutor (Masc. & Fem.)',
    labelLatin: 'Systema genitale (Masculinum & Femininum)',
    glbUrls: [
      '/models/anatomy/reproductive_male.glb',
      '/models/anatomy/reproductive_female.glb',
    ],
    sizeMb: 0.50,
    meshCount: 52,
    layerOrder: 10,
    functionalSummaryPt:
      'Gametogênese gonadal, síntese esteroide hormonal sexual e anatomia pélvica obstétrica/urológica.',
    fpsImpact: 'low',
  },
  {
    id: 'endocrine',
    labelPt: '11. Sistema Endócrino',
    labelLatin: 'Glandulae endocrinae',
    glbUrls: ['/models/anatomy/endocrine_male.glb'],
    sizeMb: 0.04,
    meshCount: 10,
    layerOrder: 11,
    functionalSummaryPt:
      'Regulação neuroendócrina hipotalâmico-hipofisária, ritmo circadiano pineal, metabolismo tireoidiano e resposta adrenal.',
    fpsImpact: 'low',
  },
];

export const DRACO_STATIC_FILES = [
  '/draco/draco_decoder.wasm',
  '/draco/draco_wasm_wrapper.js',
  '/draco/draco_decoder.js',
  '/draco/gltf/draco_decoder.wasm',
  '/draco/gltf/draco_wasm_wrapper.js',
  '/draco/gltf/draco_decoder.js',
];

let interceptorInstalled = false;

/**
 * Intercepta requisições fetch para `/models/anatomy/*.glb` e `/draco/*` no navegador,
 * servindo instantaneamente a partir do CacheStorage local quando a parte já tiver sido baixada.
 */
export function installOfflineCacheFetchInterceptor(): void {
  if (
    interceptorInstalled ||
    typeof window === 'undefined' ||
    typeof window.caches === 'undefined' ||
    typeof window.fetch !== 'function'
  ) {
    return;
  }
  interceptorInstalled = true;
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    try {
      const urlStr =
        typeof input === 'string'
          ? input
          : input instanceof URL
          ? input.href
          : input.url;

      if (urlStr.includes('/models/anatomy/') || urlStr.includes('/draco/')) {
        const cache = await window.caches.open(ANATOMY_CACHE_NAME);
        let cachedResp = await cache.match(urlStr);
        if (!cachedResp && urlStr.startsWith('http')) {
          try {
            const parsedPathname = new URL(urlStr).pathname;
            cachedResp = await cache.match(parsedPathname);
          } catch {
            // Ignora erro de parse de URL
          }
        }
        if (cachedResp) {
          return cachedResp.clone();
        }

        const networkResp = await originalFetch(input, init);
        if (networkResp.ok) {
          cache.put(urlStr, networkResp.clone()).catch(() => {});
        }
        return networkResp;
      }
    } catch {
      // Fallback transparente para rede caso CacheStorage esteja indisponível
    }
    return originalFetch(input, init);
  };
}

/**
 * Consulta quais sistemas anatômicos já estão salvos no CacheStorage do navegador.
 */
export async function getCachedPartIds(): Promise<ActiveAnatomicalSystem[]> {
  if (typeof window === 'undefined' || typeof window.caches === 'undefined') {
    return [];
  }
  try {
    const cache = await window.caches.open(ANATOMY_CACHE_NAME);
    const cachedSystems: ActiveAnatomicalSystem[] = [];
    for (const part of ANATOMY_PARTS_MANIFEST) {
      let allPresent = true;
      for (const url of part.glbUrls) {
        const match = await cache.match(url);
        if (!match) {
          allPresent = false;
          break;
        }
      }
      if (allPresent) {
        cachedSystems.push(part.id);
      }
    }
    return cachedSystems;
  } catch {
    return [];
  }
}

/**
 * Baixa e armazena uma parte/sistema anatômico (.GLB + decodificador Draco) no CacheStorage
 * para carregamento offline instantâneo sem queda de FPS por espera de rede.
 */
export async function downloadPartToOfflineCache(
  partId: ActiveAnatomicalSystem,
  onProgress?: (percent: number) => void
): Promise<boolean> {
  const part = ANATOMY_PARTS_MANIFEST.find((p) => p.id === partId);
  if (!part) return false;

  if (typeof window === 'undefined' || typeof window.caches === 'undefined') {
    onProgress?.(100);
    return false;
  }

  installOfflineCacheFetchInterceptor();

  try {
    const cache = await window.caches.open(ANATOMY_CACHE_NAME);

    // Garante que o decodificador Draco WASM também esteja em cache offline
    for (const dracoUrl of DRACO_STATIC_FILES) {
      const hasDraco = await cache.match(dracoUrl);
      if (!hasDraco) {
        const resp = await fetch(dracoUrl);
        if (resp.ok) {
          await cache.put(dracoUrl, resp.clone());
        }
      }
    }

    const totalUrls = part.glbUrls.length;
    for (let i = 0; i < totalUrls; i++) {
      const url = part.glbUrls[i];
      const response = await fetch(url);
      if (!response.ok) return false;

      const contentLength = Number(response.headers.get('content-length') || 0);
      if (response.body && contentLength > 0 && onProgress) {
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let receivedLength = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            receivedLength += value.length;
            const fileFraction = Math.min(1, receivedLength / contentLength);
            const overallPct = Math.round(((i + fileFraction) / totalUrls) * 100);
            onProgress(overallPct);
          }
        }

        const merged = new Uint8Array(receivedLength);
        let byteOffset = 0;
        for (const chunk of chunks) {
          merged.set(chunk, byteOffset);
          byteOffset += chunk.length;
        }

        const reconstructed = new Response(merged.buffer, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });
        await cache.put(url, reconstructed);
      } else {
        await cache.put(url, response.clone());
        onProgress?.(Math.round(((i + 1) / totalUrls) * 100));
      }
    }

    onProgress?.(100);
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove uma parte específica do CacheStorage offline.
 */
export async function removePartFromOfflineCache(
  partId: ActiveAnatomicalSystem
): Promise<boolean> {
  const part = ANATOMY_PARTS_MANIFEST.find((p) => p.id === partId);
  if (!part || typeof window === 'undefined' || typeof window.caches === 'undefined') {
    return false;
  }
  try {
    const cache = await window.caches.open(ANATOMY_CACHE_NAME);
    for (const url of part.glbUrls) {
      await cache.delete(url);
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Dispara o download direto do arquivo .GLB para o disco local do usuário (e garante cópia no CacheStorage).
 */
export async function exportPartGlbToDisk(
  partId: ActiveAnatomicalSystem,
  biologicalSex: 'male' | 'female' = 'male'
): Promise<boolean> {
  const part = ANATOMY_PARTS_MANIFEST.find((p) => p.id === partId);
  if (!part || typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  await downloadPartToOfflineCache(partId);

  const targetUrl =
    part.id === 'reproductive' && biologicalSex === 'female'
      ? '/models/anatomy/reproductive_female.glb'
      : part.glbUrls[0];
  const fileName = targetUrl.split('/').pop() || `${part.id}.glb`;

  const anchor = document.createElement('a');
  anchor.href = targetUrl;
  anchor.download = fileName;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  return true;
}

export function getTotalDownloadSizeMb(): number {
  return Number(
    ANATOMY_PARTS_MANIFEST.reduce((acc, part) => acc + part.sizeMb, 0).toFixed(2)
  );
}

export function getPartManifestById(
  partId: ActiveAnatomicalSystem
): (AnatomyPartAssetInfo & { url: string; physiologicalFunction: string }) | undefined {
  const found = ANATOMY_PARTS_MANIFEST.find((p) => p.id === partId);
  if (!found) return undefined;
  return {
    ...found,
    url: found.glbUrls[0],
    physiologicalFunction: found.functionalSummaryPt,
  };
}

