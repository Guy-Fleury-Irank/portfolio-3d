# 🧭 Portfolio 3D — de Guy Fleury Irankunda

Portfolio 3D interactif basé sur une **structure triangulaire fractale** flottant dans l'espace
profond. Concept central : **« As above, so below, as below, so above »**.

## 🚀 Démarrage

```bash
cd portfolio-3d
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
```

## 🏗️ Structure

```
portfolio-3d/
├─ app/                  # Routes App Router (/, /travail, /art, /argent) + sitemap/robots
├─ components/
│  ├─ three/             # Canvas R3F persistant, fractal, caméra/DoF, sphères, mini-univers
│  └─ ui/                # Hero, Footer, PillarFrame/Content, lecteurs média, viewer 3D
├─ lib/                  # Données piliers + générateur fractal
├─ public/
│  ├─ models/            # Modèle 3D Blender (Donut1.glb)
│  ├─ videos/            # Vidéos locales (piano, chant liturgique)
│  └─ audio/             # (optionnel) audio spatial de la sphère Art
└─ store/                # État global Zustand (caméra, scroll, audio, traversal)
```

## 🧩 Fonctionnalités

- Fractale de Sierpinski + arêtes « câblées » (InstancedMesh + shaders GLSL)
- Bloom ciblé par calques + Depth of Field animé
- Sommets cliquables → pages piliers (caméra verrouillée)
- GSAP ScrollTrigger (recul du triangle + contenu en premier plan)
- Effet « traverser la sphère » (as above so below) — mini-univers fractal
- Lecteurs média légers (code-splitting) + audio spatial 3D
- SEO : sitemap, robots, métadonnées par page
- Responsive + `prefers-reduced-motion` + 60 FPS mobile

## 🛠️ Stack

Next.js 16 · React 19 · React Three Fiber + Drei · drei postprocessing · GSAP · Framer Motion · Tailwind CSS v4 · Zustand
