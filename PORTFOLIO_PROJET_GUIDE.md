# 🧭 GUIDE MAÎTRE DU PROJET — PORTFOLIO 3D INTERACTIF

> **Document vivant de référence et de suivi incrémental.**
> Ce fichier consolide l'intégralité des cahiers des charges (`contenu_portfolio_et_fractale.md`, `optimisation_assets_portfolio.md`, `prompt_cline_portfolio_scenario.md`) et documente **tout le travail effectué**, étape par étape, jusqu'à l'atteinte de l'objectif final.
>
> **Dernière mise à jour :** 10 Août 2026 — Milestones 0 ✅ + 1 ✅ + 3 ✅ + 4 ✅ + 5 ✅ + 6 ✅ + 7 ✅ + 8 ✅ + 9 ✅ + 10 ✅ + 11 ✅ + 12 ✅ (… / Art lecteurs media + audio spatial / Argent lectures + Digital Garden + ressources)

---

## 📋 TABLE DES MATIÈRES

1. [Vue d'ensemble du projet](#1-vue-densemble-du-projet)
2. [Cahier des charges consolidé](#2-cahier-des-charges-consolidé)
3. [Architecture technique cible](#3-architecture-technique-cible)
4. [Feuille de route incrémentale (Milestones)](#4-feuille-de-route-incrémentale-milestones)
5. [Suivi de progression](#5-suivi-de-progression)
6. [Gestion des assets lourds](#6-gestion-des-assets-lourds)
7. [Contenu réel à intégrer](#7-contenu-réel-à-intégrer)

---

## 1. VUE D'ENSEMBLE DU PROJET

### 🎯 Vision
Un portfolio 3D interactif immersif (style Awwwards / 2026 "Fous Furieux") centré sur une **structure triangulaire fractale** flottant dans un espace étoilé profond (gravité zéro). Le concept directeur est **"As above, so below, as below, so above"** : qu'on zoome à l'infini dans une sphère ou qu'on dézoome à l'infini depuis l'univers, on retrouve la même structure triangulaire.

### 👤 Identité
- **Nom complet :** Guy Fleury Irankunda
- **Profil :** Développeur Junior, attrait pour les projets ancrés dans la réalité et centrés sur des besoins concrets.

### 🏛️ Les 3 Piliers (Sommets du Triangle)
Chaque sommet est une **sphère lumineuse (Sphère de Dyson)** aux arêtes reliées par des structures longitudinales complexes. Chaque pilier possède une identité chromatique et une ambiance unique.

| Pilier | Page | Thème / Ambiance | Couleur |
|--------|------|-----------------|---------|
| 🔧 **TRAVAIL** | `/travail` | Engineering & Systems — Strict, tech | Bleu / Tech |
| 🎨 **ART** | `/art` | Formes, Espace & Son — Chaud, esthétique | Ambre / Chaleur |
| 💸 **ARGENT** | `/argent` | Philosophie, Flux & Marchés — Prestige, data | Vert émeraude / Data |

### 🌌 Concept Artistique
- **Esthétique :** Frontière haute technologie / organique — "civilisation très avancée" (type II ou III sur l'échelle de Kardachev).
- **Les arêtes :** Structures longitudinales complexes (câblages lumineux, géométrie intriquée) reliant les 3 sphères.
- **Comportement lumineux :** Les sphères pulsent doucement, donnant un aspect presque vivant à la structure.
- **Effet fractal :**
  - **Zoom in ∞ :** En traversant la surface d'une sphère, on découvre exactement la même structure triangulaire spatiale.
  - **Zoom out ∞ :** L'univers entier dans lequel on se trouve est en réalité contenu dans l'une de ces sphères.

---

## 2. CAHIER DES CHARGES CONSOLIDÉ

### 2.1 Tech Stack (2026 "Fous Furieux")
| Technologie | Rôle |
|-------------|------|
| **Next.js (App Router)** + React (TypeScript) | Framework Core |
| **React Three Fiber (R3F)** + **React Three Drei** | Moteur 3D (caméra, orbite, étoiles, Html) |
| **GLSL** | Shaders pour la géométrie fractale du triangle |
| **GSAP** (Core + ScrollTrigger) | Animations & scroll — transition parfaite scroll ↔ 3D |
| **Framer Motion** | Transitions de pages |
| **Tailwind CSS** | Styling UI |
| **Zustand** | Store global (état de la caméra : Home vs Pilier) |

### 2.2 L'Élément Central (Canvas 3D Global)
- **L'objet :** Triangle 3D fractal (concept "As above so below").
- **L'environnement :** Espace sombre, gravité zéro, particules/étoiles en arrière-plan.
- **Points d'interaction :** Les 3 sommets sont cliquables via `Html` (drei) ou raycasters → navigation vers les pages piliers.
- **PERSISTANCE (CRITIQUE) :** Le Canvas 3D est à la **racine de l'app (Layout)** pour ne JAMAIS être rechargé entre les navigations. **La caméra et l'objet bougent, pas le canvas.**

### 2.3 Scénario Utilisateur & Routing

#### A. Page d'Accueil (`/`)
- **UI (avant-plan) :** Hero Header minimaliste au centre/haut : *"Mon nom c'est [Guy Fleury Irankunda]... here you can see everything to know about me."*
- **3D (arrière/milieu-plan) :**
  - Triangle fractal au centre, **rotation automatique** (orbite spatiale).
  - Étoiles gravitant autour.
- **Interaction :** Clic sur un coin → transition Framer Motion + mouvement de caméra R3F → navigation vers la page du pilier.
- **Footer :** Scroll jusqu'en bas → footer classique avec coordonnées.

#### B. Pages Piliers (`/travail`, `/art`, `/argent`)
- **État initial (haut de page) :**
  - Triangle fractal **figé** (plus d'orbite automatique).
  - Caméra R3F **fixée/zoomée** sur le coin du pilier courant.
  - **Bouton global :** "Retour / Accueil" fixe en haut à gauche.
- **Scroll horizontal / drag :** Le triangle pivote pour révéler les autres faces/coins. Clic sur un autre coin → navigation avec transition fluide de la caméra.
- **Scroll vertical (magie GSAP) :**
  - Le triangle **s'éloigne** (z-index recule), se place en background cosmique, et **recommence sa rotation automatique**.
  - Le contenu de la page (cartes UI, textes) apparaît au premier plan.
  - Les couleurs UI s'adaptent au thème du pilier.
- **Scroll up :** Le contenu UI disparaît, le triangle **revient au premier plan**, arrête sa rotation, et **se verrouille exactement sur l'angle du pilier**.
- **Footer :** Même footer de coordonnées en bas du contenu.

### 2.4 Contenu des Pages Piliers

#### 🛠️ Pilier TRAVAIL (Engineering & Systems)
| Projet | Techno | Lien |
|--------|--------|------|
| Application de gestion des déchets | JavaScript | [waste-management-app](https://github.com/Guy-Fleury-Irank/waste-management-app) |
| API de gestion de carburant | Java (Spring Boot / Hibernate) | [uni_fuel_api](https://github.com/Guy-Fleury-Irank/uni_fuel_api) |
| Système de gestion scolaire | TypeScript | [School-Management-System](https://github.com/Guy-Fleury-Irank/School-Management-System) |
| MAE | HTML + CSS | [MAE](https://github.com/Guy-Fleury-Irank/MAE) |
| Olympus Bar | HTML + CSS | [Olympus_Bar](https://github.com/Guy-Fleury-Irank/Olympus_Bar) |

**Vision future :** Science du hardware & robotique → Apprentissage ciblé de **C++** et **Rust**.

#### 🎨 Pilier ART (Formes, Espace & Son)
- **Création 3D (Blender) :** Rendu/fichier 3D d'un Mug (formation autodidacte via BlenderGuru).
- **Musique (Piano) :** Vidéo de pratique — "Jamming" des accords de *Let it Be* au clavier.
- **Écoute :** Lecteur audio/vidéo avec 2-3 œuvres de chants liturgiques russes (voix d'Oktavist) — **en audio spatial 3D**.

#### 💸 Pilier ARGENT (Philosophie, Flux & Marchés)
- **Fondations :** 1-2 vidéos/lectures de la chaîne YouTube **Predictive History** (professeur sino-canadien).
- **Réflexions personnelles :** Section "Digital Garden" (bulles de pensées, cartes, mini-articles) sur les lois invisibles, la liberté financière, la structure des marchés, l'origine de l'argent.
- **Ressources :** Liens externes d'exploration additionnelles.

---

## 3. ARCHITECTURE TECHNIQUE CIBLE

### 3.1 Structure de dossiers (Cible)
```
portfolio-3d/
├── app/
│   ├── layout.tsx              # Layout racine → Canvas 3D GLOBAL persistant
│   ├── page.tsx                # Page d'accueil (Hero + triangle en rotation)
│   ├── travail/
│   │   └── page.tsx            # Page pilier Travail
│   ├── art/
│   │   └── page.tsx            # Page pilier Art
│   ├── argent/
│   │   └── page.tsx            # Page pilier Argent
│   └── globals.css
├── components/
│   ├── three/
│   │   ├── FractalTriangle.tsx # La structure 3D centrale
│   │   ├── SpherePillar.tsx    # Sphère Dyson individuelle (avec PositionalAudio)
│   │   ├── SpaceEnvironment.tsx # Étoiles, particules, espace
│   │   ├── CameraRig.tsx       # Contrôle caméra (Zustand-driven)
│   │   └── Scene.tsx           # Assemblage de la scène 3D
│   ├── ui/
│   │   ├── Hero.tsx            # Hero header minimaliste
│   │   ├── Footer.tsx          # Footer coordonnées
│   │   ├── BackButton.tsx      # Bouton "Retour/Accueil"
│   │   ├── Loader.tsx          # Fallback Suspense (pourcentage / lignes de code)
│   │   └── PillarContent.tsx   # Conteneur de contenu par pilier
│   └── media/
│       ├── HeavyVideoPlayer.tsx # Lecteur vidéo local (lazy load)
│       └── YoutubeLightPlayer.tsx # react-player light (Predictive History)
├── store/
│   └── useStore.ts             # Zustand : caméra (view, target), rotation, pilier actif
├── hooks/
│   ├── useScrollAnimation.ts   # GSAP ScrollTrigger ↔ Caméra 3D
│   └── useAudioProximity.ts    # PositionalAudio intensité selon zoom
├── public/
│   ├── videos/                 # Vidéos locales (piano, liturgie)
│   ├── models/                 # .glb compressés Draco (Mug, etc.)
│   └── audio/                  # .mp3/.ogg liturgie russe
└── lib/
    └── data.ts                 # Données centralisées (piliers, liens, contenu)
```

### 3.2 Flux de données & État Global (Zustand)
- **`view`** : `'home'` | `'pillar:travail'` | `'pillar:art'` | `'pillar:argent'`
- **`activePillar`** : pilier actuellement ciblé
- **`isRotating`** : booléen — rotation auto active/inactive
- **`cameraTarget`** : position 3D du focus caméra
- **`pillarScrollProgress`** : progression du scroll GSAP (pour recul/ejection du triangle)

### 3.3 Consignes de Développement (issues des fichiers)
1. Set-up `Layout.tsx` avec un `<Canvas>` global R3F monté par-dessus/sous les pages → Zustand store pour la caméra.
2. Lier le scroll de la div HTML principale avec rotation/positionnement du groupe 3D via `useScroll` / `ScrollTrigger`.
3. Garder les composants HTML hyper propres avec **Tailwind**. Préparer l'intégration d'éléments de **UIverse.io** adaptés.

---

## 4. FEUILLE DE ROUTE INCRÉMENTALE (MILESTONES)

> ⚠️ **Règle d'or :** Chaque milestone doit être **stable et documenté** avant de passer au suivant. La 3D et l'UI se construisent progressivement pour ne jamais casser le projet.

| # | Milestone | Description | Dépend de |
|---|-----------|-------------|-----------|
| **0** | **Initialisation du projet** | Setup Next.js (App Router + TS + Tailwind), structure de dossiers, install des dépendances (R3F, drei, GSAP, Framer Motion, Zustand). | — |
| **1** | **Layout + Canvas global + Store** | `Layout.tsx` avec Canvas R3F persistant, Zustand store (vue, caméra, rotation), structure de base des composants 3D vides. | 0 |
| **2** | **Scène 3D : Espace & Étoiles** | `SpaceEnvironment` (étoiles/particules, fond spatial sombre), Lights de base. | 1 |
| **3** | **Scène 3D : Triangle fractal (géométrie)** | Construction du triangle avec les 3 sphères Dyson + arêtes lumineuses. Utilisation de **shaders GLSL** pour la fractale et **InstancedMesh** pour la répétition. | 2 |
| **4** | **Matériaux & Shaders (glow/Bloom)** | Matcap pour textures métal/organique, Bloom ciblé par calques (`@react-three/postprocessing`), pulsation lumineuse des sphères. | 3 |
| **5** | **Caméra R3F & Animations de base** | `CameraRig` : vue home (rotation auto), focus/zoom sur les coins, Depth of Field (focus sur sphère, reste flou). | 4 |
| **6** | **Interaction clic sur les sommets** | Raycaster / `Html` (drei) pour rendre les 3 sommets cliquables → transition caméra + navigation. | 5 |
| **7** | **Page Accueil UI** | Hero header minimaliste ("Mon nom c'est..."), footer coordonnées, mise en place du routing. | 5 |
| **8** | **Pages Piliers — Layout & Figement caméra** | Création des 3 routes (`/travail`, `/art`, `/argent`), caméra verrouillée sur chaque coin, bouton "Retour/Accueil". | 6, 7 |
| **9** | **GSAP Scroll : Le chef-d'œuvre** | ScrollTrigger : triangle recule en background + rotation auto relancée, contenu UI au premier plan, thèmes de couleur par pilier. Scroll up : retour et verrouillage. | 8 |
| **10** | **Pilier Travail — Contenu & Cartes** | Intégration des 5 projets GitHub, cartes UI (style UIverse), vision future C++/Rust. | 9 |
| **11** | **Pilier Art — Média & Audio spatial** | Vidéo piano "Let it Be" (local, `preload="none"` + poster), lecteur liturgie, **PositionalAudio** attaché à la sphère Art (le son s'intensifie en zoomant). | 9 |
| **12** | **Pilier Argent — Digital Garden & Vidéos** | Intégration des vidéos **Predictive History** via `react-player light={true}`, section "Digital Garden" (cartes/reflexions), ressources externes. | 9 |
| **13** | **Lazy Loading & Optimisation globale** | React Suspense + Loader animé, dynamic imports des composants lourds, vérification du chargement différé des assets. | 10, 11, 12 |
| **14** | **Injection du modèle 3D Mug (Blender)** | Import du `.glb` compressé Draco dans le pilier Art ou comme élément de scène. | 11 |
| **15** | **Effet Fractal avancé (zoom infini)** | Implémentation du vrai effet "As above so below" : zoom in caméra → traverse la sphère → révèle la même structure. | 13 |
| **16** | **Polish, Responsive & Performance** | 60 FPS sur mobile, ajustements responsives, transitions fluides, retouches finales esthétiques. | 14, 15 |
| **17** | **Export & Déploiement** | Build production, vérification finale, déploiement (Vercel / autre). | 16 |

---

## 5. SUIVI DE PROGRESSION

> 🟢 **Légende :** `✅ Fait` • `🔄 En cours` • `⬜ À faire`

### Milestone 0 — Initialisation du projet ✅ COMPLÈTE (10 Août 2026)
- [x] 📝 **Documentation créée** : `PORTFOLIO_PROJET_GUIDE.md` (ce fichier)
- [x] ✅ **Setup Next.js** (App Router + TypeScript + Tailwind) — dans `portfolio-3d/` (sous-dossier)
- [x] ✅ **Installation des dépendances** (R3F, drei, GSAP, Framer Motion, Zustand, + postprocessing, react-player)
- [x] ✅ **Création de la structure de dossiers cible**
- [x] ✅ **Configuration git + dépôt** (repo à la racine `portfolio/` — docs + app)

> **📌 Récapitulatif Milestone 0 :**
> - **Scaffold :** `npx --yes create-next-app@16.3.0 portfolio-3d --ts --tailwind --eslint --app --import-alias "@/*" --use-npm --yes --disable-git`
>   - ⚠️ Le `--yes` de `npx` corrige le blocage **"Ok to proceed? (y)"** qui avait interrompu la session précédente.
>   - ⚠️ Le réseau est instable (**ECONNRESET** sur le 1er `npm install`) → relancer avec `--fetch-retries=5 --fetch-retry-factor=2 --prefer-offline`.
> - **Projet :** `next@16.3.0`, `react@19.2.8`, Tailwind **v4** (défaut Next 16), bundler **Turbopack** (défaut), React Compiler non activé.
> - **Stack 3D/anim installé :**
>   - `three@0.185.1` + `@types/three@0.185.4`
>   - `@react-three/fiber@9.7.0` • `@react-three/drei@10.7.8`
>   - `@react-three/postprocessing@3.0.5` + `postprocessing@6.39.4`
>   - `gsap@3.15.0` • `framer-motion@13.0.0` • `zustand@5.0.14` • `react-player@3.4.0`
> - **Structure créée :** `app/{travail,art,argent}`, `components/{three,ui,media}`, `store/`, `hooks/`, `lib/`, `public/{videos,models,audio}` (avec `.gitkeep`).
> - **Assets :** `Donut1.glb` (768 Ko) copié → `portfolio-3d/public/models/`. Les 2 vidéos brutes (74 Mo / 10 Mo) restent hors git (conversion à la Milestone 11).
> - **Git :** un seul dépôt à la racine `portfolio/` ; `.gitignore` racine exclut `ressources_vids&audios/`.
> - **Vérification :** `npm run build` ✅ (compilation 67s, type-check OK, routes `/` + `/_not-found` statiques) • `npm run dev` ✅ (Ready, HTTP 200).

### Milestone 1 — Layout + Canvas global + Store ✅ COMPLÈTE (10 Août 2026)
- [x] ✅ **Layout racine** avec Canvas R3F persistant (`layout.tsx` → `SceneCanvas` client + `dynamic ssr:false`)
- [x] ✅ **Zustand store** (vue, caméra, rotation) — `store/useStore.ts`
- [x] ✅ **Structure des composants 3D** (squelette) — `Scene`, `SpaceEnvironment`, `FractalTriangle`, `SpherePillar`, `CameraRig`

> **📌 Récapitulatif Milestone 1 :**
> - **Persistance du Canvas :** le Canvas R3F est monté **une seule fois** dans le `layout.tsx` (fixe, `z-0`, `pointer-events-none`), derrière le contenu des pages (`z-10`, fond transparent). Il n'est **jamais rechargé** entre les navigations (`Link`).
> - **Wrapper client** : `SceneCanvas.tsx` (`'use client'` + `next/dynamic` `{ ssr:false, loading: <Loader/> }`) — nécessaire car `ssr:false` n'est pas autorisé dans un Server Component.
> - **Store Zustand** (`view`, `activePillar`, `isRotating`, `pillarScrollProgress`) + actions (`setView`, `goHome`, `goToPillar`, `setRotating`…).
> - **Composants 3D :**
>   - `Scene.tsx` : `<Canvas>` global + `<Suspense>` (règle d'or §6.2).
>   - `SpaceEnvironment.tsx` : fond sombre `#05060f`, lights, `<Stars>` drei *(couvre déjà l'essentiel de la Milestone 2)*.
>   - `FractalTriangle.tsx` : 3 sphères + arêtes `Line`, rotation auto lue depuis le store.
>   - `SpherePillar.tsx` : sphère Dyson aux couleurs/chaleur du pilier.
>   - `CameraRig.tsx` : caméra home vs focus pilier, transitions lerp fluides.
> - **UI :** `Loader.tsx` (fallback Suspense animé), `BackButton.tsx` (bouton « Accueil »).
> - **Données :** `lib/data.ts` — `PILLARS` (Travail/Art/Argent, couleurs, positions des 3 sommets), `TRIANGLE_RADIUS`, module pur (importable serveur/client).
> - **Routing :** `/` (hero) + `/travail`, `/art`, `/argent` (stubs + BackButton). Métadonnées mises à jour.
> - **Vérification :** `npm run build` ✅ (compile 12s, type-check OK, 5 routes statiques) • `npm run dev` ✅ (Ready 1,6s, HTTP 200 sur les 4 routes, aucun warning/erreur).
> - **À noter (Milestones suivantes) :** interaction clic sur les sommets (6), figement exact de la caméra par pilier (8), GSAP scroll (9), géométrie fractale GLSL + InstancedMesh (3), Matcap/Bloom/pulsation (4).

### Milestone 2 — Scène 3D : Espace & Étoiles
- [ ] ⬜ `SpaceEnvironment` (étoiles/particules)
- [ ] ⬜ Fond spatial sombre + lights de base

### Milestone 3 — Scène 3D : Triangle fractal ✅ COMPLÈTE (10 Août 2026)
- [x] ✅ **Construction du triangle** (3 sphères Dyson + arêtes "câbles" lumineuses)
- [x] ✅ **Shaders GLSL** pour la géométrie fractale (`fractalShaders.ts`)
- [x] ✅ **InstancedMesh pour la répétition** — `drei <Instances>` (990 instances / 1 draw call)

> **📌 Récapitulatif Milestone 3 :**
> - **`lib/fractal.ts`** — générateur de la structure :
>   - **Champ de Sierpinski** : remplissage de l'intérieur du triangle géant en unités triangulaires récursives (3^6 = 729, côté S/2^6), avec zone de dégagement autour des 3 sphères.
>   - **Arêtes "câbles"** : 3 hélices de fragments par arête (structures longitudinales complexes / géométrie intriquée).
>   - → **990 instances** au total (smoke test : 0 NaN, étendue Y ±0,15 en 3D).
> - **`components/three/fractalShaders.ts`** — **shaders GLSL** :
>   - Vertex : "respiration" par instance (phase dérivée de `instanceMatrix`), `vColor` depuis `instanceColor`.
>   - Fragment : pulsation douce + atténuation par distance + correction gamma.
> - **`FractalTriangle.tsx`** : `InstancedMesh` via `drei <Instances>/<Instance>` + `ShaderMaterial` ; chaque sommet garde sa `SpherePillar` ; contour `Line` discret ; inclinaison `x=-0.35` + rotation auto pilotée par le store.
> - **Couleurs** : dégradé **barycentrique** des 3 couleurs des piliers (Travail/Art/Argent) — la structure "respire" les trois thèmes.
> - **Vérification :** `npm run build` ✅ (compile 43s, type-check OK, 5 routes statiques) • `npm run dev` ✅ (Ready 2,5s, HTTP 200 sur les 4 routes, aucune erreur) • smoke test runtime du générateur ✅.
> - **Note** : Bloom/Matcap/pulsation des sphères (Milestone 4), interaction clic (6), figement caméra exact (8).

### Milestone 4 — Matériaux & Shaders ✅ COMPLÈTE (10 Août 2026)
- [x] ✅ **Matcap pour textures métal/organique** — `MeshMatcapMaterial` + textures **procédurales** (0 asset)
- [x] ✅ **Bloom ciblé par calques** — `@react-three/postprocessing` : `Selection` + `Select` + `SelectiveBloom` (layer 8)
- [x] ✅ **Pulsation lumineuse des sphères** — respiration échelle + intensité propre à chaque pilier

> **📌 Récapitulatif Milestone 4 :**
> - **`components/three/matcapFactory.ts`** — textures **Matcap procédurales** (CanvasTexture 256×256, cache global par couleur) : halo "lit", couleur de base du pilier, reflet spéculaire → rendu métal/organique ultra-léger (éclairage cuit, 0 calcul de lumière en temps réel, règle du cahier des charges).
> - **`SpherePillar.tsx`** : `MeshMatcapMaterial` + **pulsation lumineuse** (échelle `1 ± 0.06` + intensité `0.92 ↔ 1.08`, phase propre à chaque pilier) + marquage **`<Select enabled>`** (selection layer) pour le bloom.
> - **`Scene.tsx`** : `<Selection>` (contexte) + **`<EffectComposer>`** (multisampling 4) + **`<SelectiveBloom selectionLayer={8} lights={[directionalLight, pointLight]} />`** — le glow ne s'applique **qu'aux 3 sphères Dyson** (depth-mask + calques), jamais au vide spatial ni aux étoiles. Lights déplacées dans `Scene` (refs requises par SelectiveBloom).
> - **Vérification :** `npm run build` ✅ (compile 50s, type-check 9s, 5 routes statiques) • `npm run dev` ✅ (Ready 1s, HTTP 200 sur les 4 routes, aucune erreur) • *Simple incident de cache `.next` (build puis dev) résolu en purgeant `.next`.*
> - **Note** : PositionalAudio sur la sphère Art (11), interaction clic (6), DoF caméra (5).

### Milestone 5 — Caméra R3F & Animations ✅ COMPLÈTE (10 Août 2026)
- [x] ✅ **`CameraRig`** (vue home, focus/zoom coins) — lerp position + lookAt pilotés par le store
- [x] ✅ **Depth of Field** (`@react-three/postprocessing`) — focus sur sphère, reste flou, transitions animées

> **📌 Récapitulatif Milestone 5 :**
> - **`CameraRig.tsx`** — anime désormais **3 grandeurs** en lerp fluide (indépendant du FPS) :
>   1. **Position caméra** + **lookAt** (existants) ; 2. **Point focal DoF** (lerp vers le sommet du pilier actif ou le centre en vue home) ; 3. **Profondeur de champ** (`focusRange`) et **intensité bokeh** (`bokehScale`).
> - **`Scene.tsx`** — monté `<DepthOfField ref={dofRef} focusDistance={7} focusRange={9} bokehScale={3.5} resolutionScale={0.5} />` dans l'`EffectComposer` (après le `SelectiveBloom`), ref passée à `CameraRig`.
> - **Comportement (scénario du cahier des charges) :**
>   - **Vue HOME** : focus au centre → toute la structure nette, espace étoilé lointain doucement flou (bokeh doux).
>   - **Zoom pilier** : focus resserré sur la sphère (`focusRange` 9 → 1.6, `bokehScale` 3.5 → 6) → **la sphère devient nette, le reste de la structure et l'espace deviennent flous** (sensation d'échelle).
>   - **Transitions** : la cible `target` de `DepthOfFieldEffect` recalcule la distance de focus caméra→cible **à chaque frame** → focus glissant naturel pendant les navigations.
> - **API vérifiée dans les sources installées** : `target: Vector3 | null`, `bokehScale`, `cocMaterial.focusRange` (publics et typés dans `postprocessing` v6.39.4).
> - **Vérification :** `npm run build` ✅ (compile 19s, type-check 8.6s, 5 routes statiques) • `npm run dev` ✅ (HTTP 200 sur les 4 routes, aucune erreur).
> - **Note** : interaction clic sommets + transition caméra (6), GSAP scroll (9), PositionalAudio Art (11).

### Milestone 6 — Interaction clic sommets ✅ COMPLÈTE (10 Août 2026)
- [x] ✅ **Raycaster / Html (drei)** pour les 3 sommets cliquables
- [x] ✅ **Transition caméra + navigation** (store `goToPillar` + `router.push` + sync route)

> **📌 Récapitulatif Milestone 6 :**
> - **`Scene.tsx`** : `<Canvas>` munte `eventSource={document.body} eventPrefix="client"` → **la 3D est interactive (raycasting) SANS bloquer l'UI HTML** : le canvas reste en `pointer-events:none`, les liens/cartes HTML restent cliquables, et R3F raycast depuis les coordonnées client du body.
> - **`SpherePillar.tsx`** : chaque sommet possède maintenant :
>   - une **zone de clic invisible élargie** (`scale={2.8}` × rayon, `meshBasicMaterial` opacity 0 / depthWrite false) → cible de clic généreuse ;
>   - **raycaster R3F** (`onClick`/`onPointerOver`/`onPointerOut`) avec `stopPropagation` ;
>   - **curseur `pointer`** au survol + boost d'échelle/luminosité (`HOVER_BOOST`) ;
>   - **label `Html` (drei)** au-dessus de chaque sphère, discret (opacity 0.7), s'illumine et s'agrandit au survol ;
>   - **navigation** : `e.stopPropagation`; un guard (`nativeEvent.target.closest('a,button,...')`) évite toute double action quand un lien HTML au-dessus du canvas est cliqué → `useStore.goToPillar(id)` + `router.push(route)`.
> - **`components/ui/RouteViewSync.tsx`** (nouveau) : monté dans le `layout` (client) → synchronise **store ↔ route** (`usePathname`) : `goToPillar` sur `/travail|art|argent`, `goHome` ailleurs. Gère **tous les chemins** d'accès à une page (clic sphère 3D, liens du hero, BackButton, bouton retour/avance du navigateur, URL directe) ; sans doublon (store `getState()` — zéro re-render).
> - **Lien typage R3F v9** : le DOM-event se lit via `e.nativeEvent` (et non `sourceEvent`) — corrigé après erreur TS (`Property 'sourceEvent' does not exist`).
> - **Vérification :** `npm run build` ✅ (compile 15.2s, type-check 7.7s, 7 routes statiques / 4) • `npm run dev` ✅ HTTP 200 sur les 4 routes (hero + footer coordonnées présents, aucune erreur serveur).

### Milestone 7 — Page Accueil UI ✅ COMPLÈTE (10 Août 2026)
- [x] ✅ **Hero header** — extraction en `<Hero />` (server component), typo `text-4xl→6xl`, balayage couleur `cyan→fuchsia→emerald` (thème pilier), paragraphe descriptif + Sous-catégorie "Développeur Junior".
- [x] ✅ **Nav piliers** — liens `<Link>` dynamiques (map `PILLARS`), bordures colorées par thème, effet hover `scale-105` + glow `ring-cyan-300/40`, `aria-label` d'accessibilité.
- [x] ✅ **Footer coordonnées** — `<Footer />` (Bujumbura, Burundi / github `Guy-Fleury-Irank` / `mailto:`).
- [x] ✅ **Routing / home** — `page.tsx` rend `<Hero /> <Footer />` au-dessus du `<SiteCanvas />` (z-0) — prêt pour scroll-bottom (→ M9).

> **📌 Récapitulatif Milestone 7 :** le hero et le footer sont des **server components purs** (zero JS client, SEO-friendly). Couleurs issues du thème des piliers via `@/lib/data` (`PILLARS[].color`). Prochaine étape : **Milestone 8 — Pages Piliers / figement caméra** (ou M9 si priorise le GSAP scroll).

### Milestone 8 — Pages Piliers / Figement caméra ✅ COMPLÈTE (10 Août 2026)
- [x] ✅ **Routes** `/travail`, `/art`, `/argent` — chaque page reflète l'identité thématique de son sommet via `<PillarFrame />` (titre couleur pilier + tagline + description).
- [x] ✅ **Caméra verrouillée sur chaque coin** — `CameraRig` lisse la position + le foyer DoF vers le sommet (`view === "pillar:*"`); rotation gelée (`isRotating=false` dans `FractalTriangle`); synchronisation route↔store par `RouteViewSync` (clic sphere, lien hero, BackButton, back/forward, URL directe). Indicateur visuel « Caméra verrouillée sur ce sommet ».
- [x] ✅ **Bouton "Retour/Accueil"** — `<BackButton />` fixe en haut à gauche → `goHome()` (relance rotation + recentrage DoF).
- [x] ✅ **Factorisation** — `<PillarFrame />` (components/ui) partage BackButton, titre couleur pilier, tagline, bloc children placeholder (bulles projet → M10, lecteurs → M11/12).

> **📌 Récapitulatif Milestone 8 :** les 3 pages piliers rendent l'identité thématique du sommet au-dessus du Canvas 3D persistant. Verrouillage caméra + DoF + geste retour validés par `npm run build` (7 routes statiques) et `npm run dev` (HTTP 200 sur `/`, `/travail`, `/art`, `/argent`, aucune erreur serveur). Prochaine étape : **Milestone 9 — GSAP scroll magique**.

### Milestone 9 — GSAP Scroll (chef-d'œuvre) ✅ COMPLÈTE (10 Août 2026)
- [x] ✅ **ScrollTrigger (GSAP)** → `store.pillarScrollProgress` (scrub:true, bidirectionnel) via `<PillarScrollScene />`.
- [x] ✅ **Recul du triangle** (background) — `CameraRig` lifte la position + relâche la DoF (range/bokeh) du verrouillage vers la vue d’ensemble au fil du scroll (`lerpVectors lockPos→homePos` par `scroll*0.5`).
- [x] ✅ **Rotation auto** — `FractalTriangle` pivote lentement (`delta*0.04`) en exploration scroll sur un sommet (effet *as above so below*).
- [x] ✅ **Contenu UI au 1er plan** — `PillarContent` (cartes thématisées) scroll au-dessus du Canvas z-0.
- [x] ✅ **Thèmes couleur par pilier** — titres/glow/badges via `PILLARS[].color` (Bleu Trv, Ambre Art, Émeraude Arg).
- [x] ✅ **Scroll up → retour + verrouillage** — progress→0 ramène la caméra au verrouillage + arrête la rotation ; `<BackButton>` → `/`.

> **📌 Récapitulatif Milestone 9 :** le scénario devient vivant — scroller sur un pilier éloigne la caméra, révèle le triangle fractal qui tourne lentement, tandis que le contenu thématisé défile en premier plan. Validation : `npm run build` ✅ (7 routes statiques) • `npm run dev` ✅ HTTP 200 sur `/`,`/travail`,`/art`,`/argent`, `#pillar-content` + badge présents.

### Milestone 10 — Pilier Travail ✅ COMPLÈTE (10 Août 2026)
- [x] ✅ **Cartes GitHub interactives** — 5 projets (waste-management-app, uni_fuel_api, School-Management-System, MAE, Olympus_Bar) sous forme de cartes thématiques (Bleu/Tech) ouvrant les dépôts dans un nouvel onglet, avec badge de stack.
- [x] ✅ **Vision future** — section « Vers l’avenir » (C++/Rust, hardware & robotique).
- [x] ✅ Rendu générique `<PillarContent>` (texte ou cartes liens) — réutilisable par M11/M12.

> **📌 Récapitulatif Milestone 10 :** les cartes projet du pilier Travail sont thématisées (bleu) et scrollent au-dessus du triangle 3D verrouillé sur le sommet bleu. Validation : `npm run build` ✅ (7 routes statiques) • `npm run dev` ✅ HTTP 200 sur `/travail` (5 cartes + liens GitHub + badges stack présents). Prochaine étape : **Milestone 11 — Pilier Art**.

### Milestone 11 — Pilier Art ✅ COMPLÈTE (10 Août 2026)
- [x] ✅ **Vidéo piano "Let it Be" (local)** — `public/videos/art-piano-let-it-be.mp4` (11 Mo, copié depuis `ressources_vids&audios/`), rendu par lecteur léger.
- [x] ✅ **Lecteur chants liturgiques russes** — playlist : Tchaïkovski *Hymn of the Cherubim* (local, 72 Mo) + 5 vidéos YouTube Basse Profondo.
- [x] ✅ **PositionalAudio spatial sur la sphère Art** — `<PositionalAudio>` (drei) activé au premier geste utilisateur (résout l'autoplay) ; volume accru à l'approche de la caméra (coup de génie M9 — zoom). Toggle utilisateur (store `artAudioEnabled`), fichier attendu : `public/audio/art-choir-spatial.mp3` (déposable plus tard sans casser le build).
- [x] ✅ Lecteur `react-player` code‑splitté (`next/dynamic ssr:false`) → chargé uniquement sur `/art` (léger).

> **📌 Récapitulatif Milestone 11 :** `MediaBlock` (client) rend la playlist (vidéo locale + YouTube) avec un lecteur light chargé à la demande ; l'audio spatial 3D est câblé sur la sphère Art derrière un toggle — l'utilisateur peut déposer son fichier dans `public/audio/` *après coup* sans aucune modification de code. Validation : `npm run build` ✅ + `npm run dev` ✅ HTTP 200 `/art` + mp4 statiques 200. Prochaine étape : **Milestone 12 — Pilier Argent**.

### Milestone 12 — Pilier Argent ✅ COMPLÈTE (10 Août 2026)
- [x] ✅ **Vidéos Predictive History** (`react-player light`) — playlist 4 vidéos YouTube via `MediaBlock`.
- [x] ✅ **Digital Garden** (cartes, réflexions) — rendu `bullets` thématisé Émeraude (lois invisibles, liberté financière, marchés, cycles).
- [x] ✅ **Ressources externes** — cartes `links` (Investopedia, History of Money) ; pied « ouvrir → » générique.
- [x] ✅ Rendu `PillarContent` additif (media + bullets + links + texte).

> **📌 Récapitulatif Milestone 12 :** pilier Argent sur les mécanismes partagés (playlist, cartes, bulletins) avec thème Émeraude/Data. Validation : `npm run build` ✅ (7 routes) • `npm run dev` ✅ HTTP 200 `/argent` (Predictive History + Digital Garden + Investopedia présents). Prochaine étape : **Milestone 13 — Lazy Loading & Optimisation**.

### Milestone 13 — Lazy Loading & Optimisation
- [ ] ⬜ React Suspense + Loader animé
- [ ] ⬜ Dynamic imports des composants lourds
- [ ] ⬜ Vérification du chargement différé

### Milestone 14 — Modèle 3D Mug (Blender)
- [ ] ⬜ Export .glb + compression Draco
- [ ] ⬜ Intégration dans la scène / pilier Art

### Milestone 15 — Effet Fractal avancé
- [ ] ⬜ Zoom in traversant la sphère → révèle la structure
- [ ] ⬜ Zoom out infini → univers contenu dans une sphère

### Milestone 16 — Polish, Responsive & Performance
- [ ] ⬜ 60 FPS mobile
- [ ] ⬜ Ajustements responsive
- [ ] ⬜ Retouches esthétiques finales

### Milestone 17 — Export & Déploiement
- [ ] ⬜ Build production
- [ ] ⬜ Vérification finale
- [ ] ⬜ Déploiement (Vercel / autre)

---

## 6. GESTION DES ASSETS LOURDS

### 6.1 Règles Strictes (issues de `optimisation_assets_portfolio.md`)

#### Fichiers 3D (Blender → R3F)
| Règle | Détail |
|-------|--------|
| ❌ **INTERDIT** | Ne JAMAIS utiliser `.obj` ou `.fbx` |
| ✅ **OBLIGATOIRE** | Exporter en **`.glb`** (GLTF binaire) |
| ✅ **Compression** | **Draco** : réduit de 70% à 90% sans perte visuelle |
| ✅ **Commande** | `npx gltfjsx fichier.glb --transform` |
| ✅ **Instanciation** | **`InstancedMesh`** pour l'effet fractal (10 000 triangles au coût d'un seul) |

#### Vidéos
| Type | Règle |
|------|-------|
| **YouTube (Predictive History)** | Ne JAMAIS télécharger. Utiliser `react-player` avec `light={true}` (thumbnail d'abord, iframe au clic). |
| **Locales (piano "Let it Be")** | Dossier `public/videos/`, compressée en `.webm` ou `.mp4` (H.264), attributs `preload="none"` + `poster="image.jpg"`. |

#### Audio (Chants Liturgiques / Oktavist)
| Règle | Détail |
|-------|--------|
| **AUDIO SPATIAL 3D** | `PositionalAudio` (Three.js / R3F) attaché à la sphère Art. Le son s'intensifie quand l'utilisateur zoome. |
| **Format** | `.mp3` ou `.ogg` |
| **Fichiers** | Placer dans `public/audio/` |

#### L'effet "Coup de génie"
> Attacher le fichier audio directement à la sphère du pilier **Art**. Plus l'utilisateur zoome sur la sphère, plus les voix de la chorale orthodoxe résonnent fort. → Immersion organique renforcée.

### 6.2 Règle d'Or : Lazy Loading
> Le visiteur ne doit télécharger **que ce qu'il regarde**.

- **React Suspense :** Tout le Canvas 3D enveloppé dans `<Suspense fallback={<Loader />}>`. Pendant le chargement des shaders et de la fractale → belle animation (pourcentage minimaliste, lignes de code défilantes) au lieu d'un écran noir.
- **Dynamic Imports (Next.js) :**
  ```javascript
  import dynamic from 'next/dynamic'
  const HeavyVideoPlayer = dynamic(() => import('../components/HeavyVideoPlayer'), { ssr: false })
  ```

### 6.3 Instructions Spécifiques Shaders (GLSL)
- ✅ **Matcap (`MeshMatcapMaterial`)** : textures métalliques/organiques extrêmement légères (éclairage "cuit" dans la texture, pas de calcul de lumière en temps réel).
- ✅ **Bloom ("Glow")** : utiliser `@react-three/postprocessing` (effet `Bloom`) **en ciblant uniquement les sphères** via des `layers`, pour ne pas appliquer l'effet au vide spatial.

---

## 7. CONTENU RÉEL À INTÉGRER

### 7.1 Identité
> **"Mon nom c'est Guy Fleury Irankunda... here you can see everything to know about me."**

### 7.2 Liens GitHub (Pilier Travail)
- [waste-management-app](https://github.com/Guy-Fleury-Irank/waste-management-app) — JavaScript
- [uni_fuel_api](https://github.com/Guy-Fleury-Irank/uni_fuel_api) — Java (Spring Boot / Hibernate)
- [School-Management-System](https://github.com/Guy-Fleury-Irank/School-Management-System) — TypeScript
- [MAE](https://github.com/Guy-Fleury-Irank/MAE) — HTML + CSS
- [Olympus_Bar](https://github.com/Guy-Fleury-Irank/Olympus_Bar) — HTML + CSS

### 7.3 Lectures Predictive History (Pilier Argent)
- [Vidéo 1](https://youtu.be/lt8XLz78ZvY?si=Wd5-Xa25HYgpUTja)
- [Vidéo 2](https://youtu.be/K-_l9jBGo74?si=gUIlMTtwl2BvQgz6)
- [Vidéo 3](https://youtu.be/LvHsg5qtDs8?si=w7h2_C5VOCT8Dn0y)
- [Vidéo 4](https://youtu.be/TsD-8FGA84A?si=ItKqF5_qI7f54DRw)

### 7.4 Liturgie Russe / Basse Profondo (Pilier Art)
- [Vidéo 1](https://youtu.be/MtvZ3rMPwlM?si=MGvGF_96xKmTurSj)
- [Vidéo 2](https://youtu.be/IGRhuZ2EE78?si=eadIMuYBA0mvLEFY)
- [Vidéo 3](https://youtu.be/pI8qFWQa4YQ?si=vFyD6TjkTNmA6XpE)
- [Vidéo 4](https://youtu.be/n8BwsZqTyr0?si=gcj-4R-RskEnOBux)
- [Vidéo 5](https://youtu.be/wSrDbDu9HmE?si=Yd2Oge66Ipm7X3nY)

### 7.5 Assets Locaux Existants
Dans le dossier `ressources_vids&audios/` :
| Fichier | Utilisation prévue |
|---------|-------------------|
| `TCHAIKOVSKY - Hymn of the Cherubim.mp4` | Chant liturgique russe → Pilier Art (audio spatial probablement) |
| `VID-20260729-WA0017.mp4` | À identifier — potentiellement la pratique piano "Let it Be" ou autre vidéo locale |

> ⚠️ **Note :** Ces fichiers devront être déplacés/optimisés selon les règles du §6 (conversion en `.webm`/`.mp4` H.264, placement dans `public/videos/` ou `public/audio/`).

---

## 🔚 FIN DU DOCUMENT — PROCHAINE ÉTAPE

Prochaine action selon la feuille de route : **Milestone 0 — Initialisation du projet** (setup Next.js + dépendances + structure de dossiers).

> 📌 **Convention de mise à jour :** À chaque étape complétée, mettre à jour ce fichier : cocher les items du §5, enrichir le suivi incrémental si nécessaire, et noter la date versionnée dans l'en-tête.