/**
 * Donnees centralisees du portfolio 3D.
 * Source : contenu_portfolio_et_fractale.md + PORTFOLIO_PROJET_GUIDE.md
 *
 * Module volontairement pur (aucune dependance three/R3F) pour etre importe
 * cote serveur (pages SSR) et client.
 */

export type PillarId = "travail" | "art" | "argent";

/** Rayon du triangle equilateral (distance centre -> sommet), en unites 3D. */
export const TRIANGLE_RADIUS = 2.6;

export interface Pillar {
  id: PillarId;
  label: string;
  route: string;
  tagline: string;
  /** Couleur / theme du pilier (guide §1). */
  color: string;
  /** Position 3D du sommet (sphere Dyson) du triangle. */
  position: [number, number, number];
}

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Place un sommet sur le plan horizontal (XZ) du triangle equilateral. */
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
];

export const pillarById = (id: PillarId): Pillar =>
  PILLARS.find((p) => p.id === id) as Pillar;

export interface PillarSection {
  title: string;
  text: string;
}

/**
 * Sections descriptives des pages piliers (Milestone 8).
 * Texte de base — le media interactif (cartes M10 / lecteurs M11 / garden
 * M12) viendra le completer sans casser le layout M9.
 */
export const PILLAR_SECTIONS: Record<PillarId, PillarSection[]> = {
  travail: [
    {
      title: "Stack technique",
      text: "JavaScript, Java (Spring Boot / Hibernate), TypeScript, HTML + CSS — projets ancrés dans la réalité.",
    },
    {
      title: "Projets GitHub",
      text: "waste-management-app, uni_fuel_api, School-Management-System, MAE, Olympus_Bar.",
    },
    {
      title: "Vers l'avenir",
      text: "Exploration hardware & robotique ; apprentissage ciblé de C++ et Rust.",
    },
  ],
  art: [
    {
      title: "Création 3D",
      text: "Modélisation Blender (Mug — formation autodidacte BlenderGuru).",
    },
    {
      title: "Musique & Son",
      text: "Pratique piano (jamming accords Let it Be) ; chants liturgiques russes (voix d'Oktavist).",
    },
    {
      title: "Inspiration",
      text: "Lecteur audio/vidéo intégré — œuvres d'inspiration (chants liturgieux, jazz).",
    },
  ],
  argent: [
    {
      title: "Fondations",
      text: "Lectures Predictive History — vision du monde & histoire financière (4 vidéos).",
    },
    {
      title: "Digital Garden",
      text: "Bulles de pensée, cartes, mini-articles : lois invisibles, liberté financière, structure des marchés.",
    },
    {
      title: "Ressources",
      text: "Liens externes d'exploration complémentaire.",
    },
  ],
};
