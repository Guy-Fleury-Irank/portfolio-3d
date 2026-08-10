/**
 * Données centralisées du portfolio 3D.
 * Source : `contenu_portfolio_et_fractale.md` + `PORTFOLIO_PROJET_GUIDE.md`
 *
 * Ce module est volontairement **pur** (aucune dépendance three/R3F)
 * pour pouvoir être importé aussi bien côté serveur (pages SSR) que client.
 */

export type PillarId = "travail" | "art" | "argent";

/** Rayon du triangle équilatéral (distance centre → sommet), en unités 3D. */
export const TRIANGLE_RADIUS = 2.6;

export interface Pillar {
  id: PillarId;
  label: string;
  route: string;
  tagline: string;
  /** Couleur / thème du pilier (guide §1). */
  color: string;
  /** Position 3D du sommet (sphère Dyson) du triangle. */
  position: [number, number, number];
}

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Place un sommet sur le plan horizontal (XZ) du triangle équilatéral. */
const vertexAt = (angleDeg: number): [number, number, number] => {
  const a = rad(angleDeg);
  return [TRIANGLE_RADIUS * Math.cos(a), 0, TRIANGLE_RADIUS * Math.sin(a)];
};

export const PILLARS: Pillar[] = [
  {
    id: "travail",
    label: "Travail",
    route: "/travail",
    tagline: "Engineering & Systems — strict, tech",
    color: "#3b82f6", // Bleu / Tech
    position: vertexAt(90),
  },
  {
    id: "art",
    label: "Art",
    route: "/art",
    tagline: "Formes, Espace & Son — chaud, esthétique",
    color: "#f59e0b", // Ambre / Chaleur
    position: vertexAt(210),
  },
  {
    id: "argent",
    label: "Argent",
    route: "/argent",
    tagline: "Philosophie, Flux & Marchés — prestige, data",
    color: "#10b981", // Vert émeraude / Data
    position: vertexAt(330),
  },
] ;

export const pillarById = (id: PillarId): Pillar =>
  PILLARS.find((p) => p.id === id) as Pillar;
