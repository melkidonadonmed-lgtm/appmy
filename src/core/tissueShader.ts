import * as THREE from 'three';
import { classifyMuscularTissue, MuscularTissueType } from './surgicalLayers.ts';

const GLSL_PRIMARY_BUNDLE_FREQ = '240.0';
const GLSL_SECONDARY_BUNDLE_FREQ = '580.0';
const GLSL_SECONDARY_ALONG_FREQ = '18.0';
const GLSL_MICRO_STRIATION_FREQ = '1250.0';
const GLSL_MICRO_ALONG_FREQ = '28.0';
const GLSL_FASCIA_WEAVE_ACROSS_FREQ = '420.0';
const GLSL_FASCIA_WEAVE_ALONG_FREQ = '140.0';
const GLSL_TENDON_FIBER_FREQ = '680.0';

/**
 * Gera uma variação cromática sutil e determinística por ventre/fascículo muscular
 * para que cabeças adjacentes (ex: clavicular, acromial e espinhal do deltoide)
 * não se fundam em uma massa vermelha chapada e tenham estrias/divisões nítidas.
 */
export function getMuscleFascicleColor(meshName: string, baseHex = '#b91c1c'): string {
  let hash = 0;
  const clean = (meshName || '').toLowerCase();
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 31 + clean.charCodeAt(i)) | 0;
  }
  const base = new THREE.Color(baseHex);
  const hsl = { h: 0, s: 0, l: 0 };
  base.getHSL(hsl);
  const hueOffset = (((hash & 0xff) / 255) - 0.5) * 0.018;
  const satOffset = ((((hash >> 8) & 0xff) / 255) - 0.5) * 0.08;
  const lightOffset = ((((hash >> 16) & 0xff) / 255) - 0.5) * 0.07;
  base.setHSL(
    Math.max(0, Math.min(1, hsl.h + hueOffset)),
    Math.max(0.45, Math.min(0.88, hsl.s + satOffset)),
    Math.max(0.26, Math.min(0.46, hsl.l + lightOffset))
  );
  return `#${base.getHexString()}`;
}

/**
 * Retorna o perfil visual canônico (cor, rugosidade, fator de opacidade) para tecidos miológicos:
 * - Fáscias & Aponeuroses: Branco-perolado prateado translúcido (#e2e8f0) para ver a fáscia E os músculos abaixo
 * - Bolsas & Bainhas Sinoviais: Azul-sinovial translúcido (#7dd3fc)
 * - Tendões & Ligamentos: Marfim colágeno denso (#ede6d6)
 * - Músculos Estriados: Carmim miofibrilar com diferenciação por fascículo
 */
export function getMuscularTissueProfile(
  meshName: string,
  nomePt = '',
  defaultMuscleColor = '#b91c1c'
): {
  tissueType: MuscularTissueType;
  colorHex: string;
  opacityFactor: number;
  roughness: number;
  metalness: number;
} {
  const tissueType = classifyMuscularTissue(meshName, nomePt);
  switch (tissueType) {
    case 'fascia':
      return {
        tissueType: 'fascia',
        colorHex: '#e2e8f0',
        opacityFactor: 0.42,
        roughness: 0.28,
        metalness: 0.08,
      };
    case 'bursa':
      return {
        tissueType: 'bursa',
        colorHex: '#7dd3fc',
        opacityFactor: 0.58,
        roughness: 0.22,
        metalness: 0.05,
      };
    case 'tendon':
      return {
        tissueType: 'tendon',
        colorHex: '#ede6d6',
        opacityFactor: 0.94,
        roughness: 0.34,
        metalness: 0.04,
      };
    case 'muscle':
    default:
      return {
        tissueType: 'muscle',
        colorHex: getMuscleFascicleColor(meshName, defaultMuscleColor),
        opacityFactor: 1.0,
        roughness: 0.38,
        metalness: 0.05,
      };
  }
}

/**
 * Injeta shader procedural GPU (Zero-Allocation em VRAM) no MeshStandardMaterial
 * para renderizar estrias musculares longitudinais (miofibrilas e perimísio) nos ventres
 * musculares e trama colágena acetinada nas fáscias e aponeuroses.
 */
export function applyAnatomicalTissueShader(
  material: THREE.MeshStandardMaterial,
  tissueType: MuscularTissueType,
  fiberAxis: [number, number, number] = [0, 1, 0],
  fiberSpan: [number, number] = [-0.1, 0.1]
): void {
  const axisVec = new THREE.Vector3(fiberAxis[0], fiberAxis[1], fiberAxis[2]);
  if (axisVec.lengthSq() < 0.0001) axisVec.set(0, 1, 0);
  axisVec.normalize();

  const refUp = Math.abs(axisVec.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const crossU = new THREE.Vector3().crossVectors(axisVec, refUp);
  if (crossU.lengthSq() > 1e-12) crossU.normalize();
  const crossV = new THREE.Vector3().crossVectors(axisVec, crossU);
  if (crossV.lengthSq() > 1e-12) crossV.normalize();

  material.customProgramCacheKey = () => `anat_tissue_${tissueType}`;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uFiberAxis = { value: axisVec };
    shader.uniforms.uCrossU = { value: crossU };
    shader.uniforms.uCrossV = { value: crossV };
    shader.uniforms.uFiberSpan = { value: new THREE.Vector2(fiberSpan[0], fiberSpan[1]) };
    shader.uniforms.uTissueMode = {
      value: tissueType === 'muscle' ? 1 : tissueType === 'fascia' ? 2 : tissueType === 'tendon' ? 3 : 0,
    };

    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>
      varying vec3 vAnatLocalPos;`
    );
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      vAnatLocalPos = position;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
      varying vec3 vAnatLocalPos;
      uniform vec3 uFiberAxis;
      uniform vec3 uCrossU;
      uniform vec3 uCrossV;
      uniform vec2 uFiberSpan;
      uniform int uTissueMode;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
      if (uTissueMode == 1) {
        float along = dot(vAnatLocalPos, uFiberAxis);
        float across1 = dot(vAnatLocalPos, uCrossU);
        float across2 = dot(vAnatLocalPos, uCrossV);
        float fiberCoord = across1 * 1.15 + across2 * 0.85 + along * 0.08;

        float bundlePrimary = sin(fiberCoord * ${GLSL_PRIMARY_BUNDLE_FREQ});
        float bundleSecondary = sin(fiberCoord * ${GLSL_SECONDARY_BUNDLE_FREQ} + along * ${GLSL_SECONDARY_ALONG_FREQ});
        float microStriation = sin(fiberCoord * ${GLSL_MICRO_STRIATION_FREQ} - along * ${GLSL_MICRO_ALONG_FREQ});
        float striationWave = bundlePrimary * 0.48 + bundleSecondary * 0.34 + microStriation * 0.18;

        float grooveMask = smoothstep(-0.65, 0.65, striationWave);
        vec3 deepGroove = diffuseColor.rgb * 0.64;
        vec3 ridgeHighlight = mix(diffuseColor.rgb * 1.18, vec3(0.95, 0.42, 0.38), 0.18);
        diffuseColor.rgb = mix(deepGroove, ridgeHighlight, grooveMask);

        float spanLen = max(0.02, uFiberSpan.y - uFiberSpan.x);
        float normAlong = clamp((along - uFiberSpan.x) / spanLen, 0.0, 1.0);
        float tendonTip = smoothstep(0.86, 1.0, abs(normAlong * 2.0 - 1.0));
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.91, 0.87, 0.80), tendonTip * 0.42);
      } else if (uTissueMode == 2) {
        float along = dot(vAnatLocalPos, uFiberAxis);
        float across = dot(vAnatLocalPos, uCrossU) + dot(vAnatLocalPos, uCrossV);
        float weave1 = sin((across * ${GLSL_FASCIA_WEAVE_ACROSS_FREQ}) + (along * ${GLSL_FASCIA_WEAVE_ALONG_FREQ}));
        float weave2 = sin((across * ${GLSL_FASCIA_WEAVE_ACROSS_FREQ}) - (along * ${GLSL_FASCIA_WEAVE_ALONG_FREQ}));
        float collagen = smoothstep(-0.3, 0.8, weave1 * 0.6 + weave2 * 0.4);
        diffuseColor.rgb = mix(diffuseColor.rgb * 0.88, vec3(0.98, 0.99, 1.0), collagen * 0.35);
      } else if (uTissueMode == 3) {
        float across = dot(vAnatLocalPos, uCrossU) + dot(vAnatLocalPos, uCrossV);
        float tendonFiber = sin(across * ${GLSL_TENDON_FIBER_FREQ}) * 0.5 + 0.5;
        diffuseColor.rgb = mix(diffuseColor.rgb * 0.86, vec3(0.97, 0.95, 0.90), tendonFiber * 0.28);
      }`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <normal_fragment_maps>',
      `#include <normal_fragment_maps>
      if (uTissueMode == 1) {
        float across = dot(vAnatLocalPos, uCrossU) * 1.15 + dot(vAnatLocalPos, uCrossV) * 0.85;
        float along = dot(vAnatLocalPos, uFiberAxis);
        float ridgeDeriv = cos(across * ${GLSL_PRIMARY_BUNDLE_FREQ}) * 0.55 + cos(across * ${GLSL_SECONDARY_BUNDLE_FREQ} + along * ${GLSL_SECONDARY_ALONG_FREQ}) * 0.45;
        vec3 tangentPerturb = normalize(uCrossU + uCrossV) * (ridgeDeriv * 0.16);
        normal = normalize(normal + tangentPerturb);
      }`
    );
  };
  material.needsUpdate = true;
}
