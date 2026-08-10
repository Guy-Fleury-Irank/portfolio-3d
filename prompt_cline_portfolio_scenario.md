# CAHIER DES CHARGES / PROMPT SYSTEME POUR CLINE
**Contexte pour l'Agent (Cline) :**
Tu agis en tant que Lead Creative Developer spécialisé dans les expériences web immersives (Awwwards style). Ton objectif est de construire un portfolio 3D interactif avec des animations complexes et fluides, en respectant scrupuleusement le scénario ci-dessous.

## 1. TECH STACK (Le choix pour des animations 2026 "Fous Furieux")
- **Framework Core :** Next.js (App Router) + React (TypeScript).
- **Moteur 3D :** React Three Fiber (R3F) + React Three Drei (pour la gestion de caméra, orbite, étoiles, etc.).
- **Shaders / Math :** GLSL (pour générer la géométrie fractale du triangle et optimiser les performances).
- **Animations & Scroll :** GSAP (Core + ScrollTrigger) : Indispensable pour la transition parfaite entre le scroll et la 3D.
- **Transitions de pages :** Framer Motion.
- **Styling UI :** Tailwind CSS.

## 2. L'ÉLÉMENT CENTRAL (Le Canvas 3D Global)
- **L'Objet :** Un Triangle 3D de type fractale (concept "As above so below"). Qu'on zoome ou dézoome, on retrouve la même structure complexe. 
- **L'Environnement :** Un espace sombre, gravité zéro, avec des astres/particules (étoiles) en arrière-plan.
- **Points d'interaction :** Les 3 sommets du triangle représentent les 3 piliers (Travail, Art, Argent). Ils doivent être cliquables via des `Html` (drei) ou des raycasters.
- **Persistance :** Le Canvas 3D doit idéalement être à la racine de l'app (Layout) pour ne pas être rechargé entre les navigations de page. La caméra et l'objet bougent, pas le canvas.

## 3. SCÉNARIO UTILISATEUR & COMPORTEMENT ROUTING

### A. La Page d'Accueil (`/`)
- **UI (Avant-plan) :** 
  - Un Hero Header minimaliste au centre/haut : "Mon nom c'est [Nom]... here you can see everything to know about me."
- **3D (Arrière/Milieu-plan) :** 
  - Le triangle fractal est au centre, en rotation automatique (orbite spatiale).
  - Les étoiles gravitent autour.
- **Interaction :**
  - Au clic sur l'un des 3 coins du triangle, une transition (Framer Motion + mouvement de caméra R3F) se déclenche et redirige vers la page du pilier.
- **Scroll :** En scrollant tout en bas, on trouve un footer classique avec les coordonnées.

### B. Les Pages Piliers (`/travail`, `/art`, `/argent`)
- **État Initial (Haut de page) :**
  - Le triangle fractal est présent mais **figé** (plus d'orbite automatique).
  - La caméra de R3F est fixée/zoomée sur le coin correspondant au pilier de la page actuelle.
  - **Bouton Global :** Un bouton "Retour / Accueil" fixe en haut à gauche de l'écran.
- **Interaction de Scroll Horizontal :** 
  - Si l'utilisateur fait un scroll latéral (ou un drag), le triangle pivote sur lui-même pour laisser voir les autres faces/coins.
  - Au clic sur un autre coin, navigation vers la page correspondante (transition fluide de la caméra).
- **Interaction de Scroll Vertical (La magie GSAP) :**
  - En scrollant vers le bas pour lire le contenu, GSAP ScrollTrigger prend le relais.
  - **Action 3D :** Le triangle s'éloigne (z-index recule), se place en background cosmique, et **recommence sa rotation automatique**.
  - **Action UI :** Le contenu de la page (les cartes UI, les textes) apparaît au premier plan. Les couleurs de l'UI s'adaptent au thème du pilier (ex: thème strict/tech pour Travail, chaud/esthétique pour Art, prestige/data pour Argent).
- **Scroll Up (Remonter) :**
  - En remontant tout en haut de la page, le contenu UI disparaît, le triangle revient au premier plan, arrête sa rotation, et se verrouille exactement sur l'angle du pilier en cours.
- **Footer :** Tout en bas du contenu spécifique, le même footer de coordonnées apparaît.

## 4. CONSIGNES DE DÉVELOPPEMENT POUR CLINE
1. **Initialisation :** Commence par set-up le `Layout.tsx` avec un `<Canvas>` global R3F qui reste monté par-dessus (ou sous) les pages, utilisant un `Zustand` store pour gérer l'état de la caméra (Home vs Pilier).
2. **Animation GSAP :** Lie le scroll de la div HTML principale avec la rotation et le positionnement du groupe 3D dans le canvas via `useScroll` ou `ScrollTrigger`.
3. **Composants UI :** Garde les composants HTML hyper propres avec Tailwind. Prépare-toi à intégrer des éléments de UIverse.io en les adaptant.
