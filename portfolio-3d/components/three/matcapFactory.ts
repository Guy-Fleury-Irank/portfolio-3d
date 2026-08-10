/**
 * Fabrique de textures MATCAP procédurales (Milestone 4).
 *
 * Matcap = éclairage "cuit" dans une simple texture (extrêmement léger,
 * zéro calcul de lumière en temps réel — règle d'or `optimisation_assets`).
 * Une seule CanvasTexture 256×256 par couleur de pilier, générée au vol
 * (0 asset à télécharger) et mise en cache.
 */
import * as THREE from "three";

const MAP_SIZE = 256;
const cache = new Map<string, THREE.CanvasTexture>();

/**
 * Génère (ou renvoie depuis le cache) une matcap sphérique à la couleur
 * du pilier : reflet vif en haut → couleur de base → bord sombre.
 */
export function getPillarMatcap(color: string): THREE.CanvasTexture {
  const cached = cache.get(color);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = MAP_SIZE;
  canvas.height = MAP_SIZE;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const base = new THREE.Color(color);
    const highlight = new THREE.Color(base).lerp(
      new THREE.Color("#ffffff"),
      0.82
    );
    const bright = new THREE.Color(base).lerp(
      new THREE.Color("#ffffff"),
      0.25
    );
    const dark = new THREE.Color(base).multiplyScalar(0.08);

    // Halo principal "lit à la verticale" (haut de la sphère brillant).
    const radial = ctx.createRadialGradient(
      MAP_SIZE * 0.5,
      MAP_SIZE * 0.4,
      MAP_SIZE * 0.06,
      MAP_SIZE * 0.5,
      MAP_SIZE * 0.55,
      MAP_SIZE * 0.72
    );
    radial.addColorStop(0, highlight.getStyle());
    radial.addColorStop(0.35, bright.getStyle());
    radial.addColorStop(0.72, base.getStyle());
    radial.addColorStop(1, dark.getStyle());
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, MAP_SIZE, MAP_SIZE);

    // Petit reflet spéculaire décalé → aspect "métal organique".
    const spec = ctx.createRadialGradient(
      MAP_SIZE * 0.36,
      MAP_SIZE * 0.3,
      0,
      MAP_SIZE * 0.36,
      MAP_SIZE * 0.3,
      MAP_SIZE * 0.16
    );
    spec.addColorStop(0, "rgba(255,255,255,0.95)");
    spec.addColorStop(0.4, "rgba(255,255,255,0.25)");
    spec.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = spec;
    ctx.fillRect(0, 0, MAP_SIZE, MAP_SIZE);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;

  cache.set(color, texture);
  return texture;
}