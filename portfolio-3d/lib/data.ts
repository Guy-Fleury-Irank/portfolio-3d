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

export interface PillarLink {
  label: string;
  href: string;
  stack?: string;
  description?: string;
}

export interface PillarMediaItem {
  label: string;
  url: string;
}

export interface PillarMedia {
  kind: "video" | "playlist" | "model";
  title?: string;
  items: PillarMediaItem[];
  /** Asset 3D (GLB) pour `kind === "model"`. */
  src?: string;
}

export interface PillarSection {
  title: string;
  text?: string;
  links?: PillarLink[];
  media?: PillarMedia[];
  bullets?: string[];
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
      links: [
        {
          label: "waste-management-app",
          href: "https://github.com/Guy-Fleury-Irank/waste-management-app",
          stack: "JavaScript",
          description: "Gestion des déchets — logique métier & UI réactive.",
        },
        {
          label: "uni_fuel_api",
          href: "https://github.com/Guy-Fleury-Irank/uni_fuel_api",
          stack: "Java (Spring Boot / Hibernate)",
          description: "API carburant — persistance Hibernate + JWT.",
        },
        {
          label: "School-Management-System",
          href: "https://github.com/Guy-Fleury-Irank/School-Management-System",
          stack: "TypeScript",
          description: "Système scolaire — plannings, notes, utilisateurs.",
        },
        {
          label: "MAE",
          href: "https://github.com/Guy-Fleury-Irank/MAE",
          stack: "HTML + CSS",
          description: "Site d’agence — typographie vintage, layout fluide.",
        },
        {
          label: "Olympus_Bar",
          href: "https://github.com/Guy-Fleury-Irank/Olympus_Bar",
          stack: "HTML + CSS",
          description: "Site de bar — animations hover, ambiance nocturne.",
        },
      ],
    },
    {
      title: "Vers l'avenir",
      text: "Exploration hardware & robotique ; apprentissage ciblé de C++ et Rust.",
    },
  ],
  art: [
        {
      title: "Création 3D",
      text: "Modélisation Blender (formation autodidacte BlenderGuru) — objet 3D interactif ci-dessous.",
      media: [
        {
          kind: "model",
          title: "Objet 3D — Blender (BlenderGuru)",
          src: "/models/Donut1.glb",
          items: [],
        },
      ],
    },
    {
      title: "Musique & Son",
      media: [
        {
          kind: "video",
          title: "Pratique Piano — « Let it Be »",
          items: [
            {
              label: "Piano — Let it Be (pratique perso)",
              url: "/videos/art-piano-let-it-be.mp4",
            },
          ],
        },
        {
          kind: "playlist",
          title: "Chants liturgiques russes — Basse Profondo",
          items: [
            {
              label: "Tchaïkovski — Hymn of the Cherubim (local)",
              url: "/videos/art-choeur-russe-chant.mp4",
            },
            { label: "Liturgie russe 1", url: "https://youtu.be/MtvZ3rMPwlM?si=MGvGF_96xKmTurSj" },
            { label: "Liturgie russe 2", url: "https://youtu.be/IGRhuZ2EE78?si=eadIMuYBA0mvLEFY" },
            { label: "Liturgie russe 3", url: "https://youtu.be/pI8qFWQa4YQ?si=vFyD6TjkTNmA6XpE" },
            { label: "Liturgie russe 4", url: "https://youtu.be/n8BwsZqTyr0?si=gcj-4R-RskEnOBux" },
            { label: "Liturgie russe 5", url: "https://youtu.be/wSrDbDu9HmE?si=Yd2Oge66Ipm7X3nY" },
          ],
        },
      ],
    },
    {
      title: "Inspiration",
      text: "Lecteur audio/vidéo intégré — œuvres d'inspiration (chants liturgieux, jazz).",
    },
  ],
  argent: [
    {
      title: "Fondations",
      text: "Vision du monde & histoire financière — la chaîne Predictive History (Professeur sino-canadien).",
      media: [
        {
          kind: "playlist",
          title: "Lectures — Predictive History",
          items: [
            { label: "Predictive History 1", url: "https://youtu.be/lt8XLz78ZvY?si=Wd5-Xa25HYgpUTja" },
            { label: "Predictive History 2", url: "https://youtu.be/K-_l9jBGo74?si=gUIlMTtwl2BvQgz6" },
            { label: "Predictive History 3", url: "https://youtu.be/LvHsg5qtDs8?si=w7h2_C5VOCT8Dn0y" },
            { label: "Predictive History 4", url: "https://youtu.be/TsD-8FGA84A?si=ItKqF5_qI7f54DRw" },
          ],
        },
      ],
    },
    {
      title: "Digital Garden",
      bullets: [
        "Quelles lois invisibles régissent le monde et l'argent ?",
        "La liberté financière : mythe bâti ou structure accumulée ?",
        "D'où vient l'argent, qui le crée — et à qui profite le crédit ?",
        "Marchés : information, signaux et psychologie des foules.",
        "L'histoire comme prologue : prévoir en lisant les cycles.",
      ],
    },
    {
      title: "Ressources",
      links: [
        {
          label: "Investopedia",
          href: "https://www.investopedia.com",
          description: "Ressource de référence sur la finance, les marchés et les instruments.",
        },
        {
          label: "History of Money",
          href: "https://en.wikipedia.org/wiki/History_of_money",
          description: "Origine, évolution et nature de la monnaie à travers l'histoire.",
        },
      ],
    },
  ],
};
