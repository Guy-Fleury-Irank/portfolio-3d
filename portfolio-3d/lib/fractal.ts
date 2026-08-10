/**
 * Générateur de la structure fractale (Milestone 3).
 *
 * - **Champ de Sierpinski** : remplissage de l'intérieur du triangle géant
 *   par des unités triangulaires récursives (3^DEPTH unités, ~1 draw call).
 * - **Arêtes "câblées"** : hélices de fragments le long des 3 arêtes
 *   (structures longitudinales complexes / géométrie intriquée).
 *
 * Le tout est rendu en `InstancedMesh` (répétition d'une géométrie unitaire
 * pour le coût d'une seule — règle d'or du cahier des charges).
 */
import * as THREE from "three";
import { PILLARS } from "./data";

export interface FractalInstance {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  scale: THREE.Vector3;
  color: THREE.Color;
}

type V3 = THREE.Vector3;
type Tri = [V3, V3, V3];

const mid = (a: V3, b: V3) =>
  new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);

/**
 * Triangle de Sierpinski : subdivise récursivement en 3 triangles de coin
 * (taille moitié), en laissant le triangle central vide.
 * Résultat : 3^depth triangles-unités de côté S / 2^depth.
 */
function sierpinski(a: V3, b: V3, c: V3, depth: number, out: Tri[]) {
  if (depth === 0) {
    out.push([a, b, c]);
    return;
  }
  const ab = mid(a, b);
  const bc = mid(b, c);
  const ca = mid(c, a);
  sierpinski(a, ab, ca, depth - 1, out);
  sierpinski(b, bc, ab, depth - 1, out);
  sierpinski(c, ca, bc, depth - 1, out);
}

/** Coordonnées barycentriques du point p dans le triangle (a,b,c). */
function barycentric(
  p: V3,
  a: V3,
  b: V3,
  c: V3
): [number, number, number] {
  const v0 = new THREE.Vector3().subVectors(b, a);
  const v1 = new THREE.Vector3().subVectors(c, a);
  const v2 = new THREE.Vector3().subVectors(p, a);
  const d00 = v0.dot(v0);
  const d01 = v0.dot(v1);
  const d11 = v1.dot(v1);
  const d20 = v2.dot(v0);
  const d21 = v2.dot(v1);
  const denom = d00 * d11 - d01 * d01;
  const v = (d11 * d20 - d01 * d21) / denom;
  const w = (d00 * d21 - d01 * d20) / denom;
  const u = 1 - v - w;
  return [u, v, w];
}

/** Base orthonormée dont l'axe local Y == `axis` (robuste pour ±Y). */
function basisFromAxis(axis: V3, matrix: THREE.Matrix4) {
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  if (Math.abs(axis.y) < 0.98) {
    a.crossVectors(axis, new THREE.Vector3(0, 1, 0)).normalize();
  } else {
    a.crossVectors(axis, new THREE.Vector3(1, 0, 0)).normalize();
  }
  b.crossVectors(axis, a).normalize();
  matrix.makeBasis(a, axis, b);
}

const FRACTAL_DEPTH = 6; // 3^6 = 729 unités
const SPHERE_CLEARANCE = 0.28; // rayon² autour de chaque pilier (place pour les sphères)
const CABLE_STRANDS = 3;
const CABLE_PER_STRAND = 40;

export function buildFractalInstances(): FractalInstance[] {
  const V = PILLARS.map((p) => new THREE.Vector3(...p.position));
  const baseColors = PILLARS.map((p) =>
    new THREE.Color(p.color).convertSRGBToLinear()
  );
  const instances: FractalInstance[] = [];

  /* ---------- 1. Champ fractal (intérieur du triangle) ---------- */
  const units: Tri[] = [];
  sierpinski(V[0], V[1], V[2], FRACTAL_DEPTH, units);

  for (const t of units) {
    const center = new THREE.Vector3()
      .addVectors(t[0], t[1])
      .add(t[2])
      .multiplyScalar(1 / 3);

    // On laisse la place aux 3 sphères piliers (coins du triangle).
    if (V.some((p) => center.distanceToSquared(p) < SPHERE_CLEARANCE)) {
      continue;
    }

    // Orientation : plan du triangle + roulis aléatoire → gâvement organique.
    const u = new THREE.Vector3().subVectors(t[1], t[0]).normalize();
    const n = new THREE.Vector3()
      .subVectors(t[1], t[0])
      .cross(new THREE.Vector3().subVectors(t[2], t[0]))
      .normalize();
    const v = new THREE.Vector3().crossVectors(n, u).normalize();
    const m = new THREE.Matrix4().makeBasis(u, v, n);
    const q = new THREE.Quaternion().setFromRotationMatrix(m);
    q.multiply(new THREE.Quaternion().setFromAxisAngle(n, Math.random() * Math.PI * 2));

    // Échelle proportionnelle à la taille de l'unité (+ jitter).
    const side = t[0].distanceTo(t[1]);
    const s = side * 0.6 * (0.6 + Math.random() * 0.8);

    // Couleur : dégradé barycentrique entre les 3 couleurs des piliers.
    const [b0, b1, b2] = barycentric(center, V[0], V[1], V[2]);
    const color = new THREE.Color(
      baseColors[0].r * b0 + baseColors[1].r * b1 + baseColors[2].r * b2,
      baseColors[0].g * b0 + baseColors[1].g * b1 + baseColors[2].g * b2,
      baseColors[0].b * b0 + baseColors[1].b * b1 + baseColors[2].b * b2
    ).multiplyScalar(0.5 + Math.random());

    instances.push({
      position: new THREE.Vector3(center.x, (Math.random() - 0.5) * 0.06, center.z),
      quaternion: q,
      scale: new THREE.Vector3(s, s * 0.32, s),
      color,
    });
  }

  /* ---------- 2. Arêtes "câbles lumineux" (hélices) ---------- */
  const EDGE_PAIRS: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 0],
  ];
  const up = new THREE.Vector3(0, 1, 0);
  const matrix = new THREE.Matrix4();

  for (const [ia, ib] of EDGE_PAIRS) {
    const A = V[ia];
    const B = V[ib];
    const dir = new THREE.Vector3().subVectors(B, A);
    const len = dir.length();
    dir.normalize();

    // Deux vecteurs perpendiculaires à l'arête (base de l'hélice).
    const uVec = new THREE.Vector3().crossVectors(dir, up).normalize();
    const vVec = new THREE.Vector3().crossVectors(dir, uVec).normalize();

    for (let strand = 0; strand < CABLE_STRANDS; strand++) {
      const phase = (strand / CABLE_STRANDS) * Math.PI * 2;
      for (let i = 1; i < CABLE_PER_STRAND - 1; i++) {
        const t = i / CABLE_PER_STRAND;
        const base = new THREE.Vector3().copy(A).lerp(B, t);
        const theta = phase + t * len * 3.4;
        const R = 0.05 + 0.1 * Math.sin(Math.PI * t);

        const pos = new THREE.Vector3().copy(base);
        pos.addScaledVector(uVec, Math.cos(theta) * R);
        pos.addScaledVector(vVec, Math.sin(theta) * R);

        // Le fragment pointe radialement (axe local Y) → rendu "câble".
        const radial = new THREE.Vector3().copy(pos).sub(base).normalize();
        basisFromAxis(radial, matrix);
        const q = new THREE.Quaternion().setFromRotationMatrix(matrix);
        q.multiply(new THREE.Quaternion().setFromAxisAngle(radial, Math.random() * Math.PI * 2));

        // Couleur : dégradé entre les 2 piliers de l'arête.
        const col = new THREE.Color()
          .copy(baseColors[ia])
          .lerp(baseColors[ib], t)
          .multiplyScalar(0.7 + Math.random() * 0.6);

        instances.push({
          position: pos,
          quaternion: q,
          scale: new THREE.Vector3(0.045, 0.13, 0.045),
          color: col,
        });
      }
    }
  }

  return instances;
}

export const FRACTAL_COUNT_ESTIMATE = Math.pow(3, FRACTAL_DEPTH);

