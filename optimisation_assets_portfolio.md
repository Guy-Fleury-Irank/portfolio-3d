# GUIDE D'OPTIMISATION ET GESTION DES ASSETS LOURDS
**Projet : Portfolio 3D Interactif**

Pour maintenir des animations 3D "fous furieux" à 60 FPS tout en chargeant des vidéos et des fichiers 3D, la gestion des assets est cruciale. Si tout charge en même temps, le navigateur va figer. Voici les règles strictes d'optimisation à transmettre à Cline (et à appliquer lors de tes exports).

---

## 1. OPTIMISATION DES FICHIERS 3D (Blender ➡️ R3F)

Le rendu du **Mug (Blender)** et les futures géométries complexes de la fractale nécessitent un traitement spécial.

*   **Format d'export :** N'utilise JAMAIS de `.obj` ou `.fbx`. Exporte tes modèles Blender en **`.glb` (GLTF binaire)**.
*   **Compression Draco :** Demande à Cline d'utiliser la compression Draco. Cela réduit la taille des fichiers 3D de 70% à 90% sans perte visuelle notable.
    *   *Commande pour Cline :* `npx gltfjsx ton_fichier.glb --transform` (cela va compresser le fichier et générer automatiquement le composant React correspondant).
*   **Instanciation (InstancedMesh) :** Pour l'effet fractal (où la même structure triangulaire se répète potentiellement à l'infini), Cline DOIT utiliser `InstancedMesh`. Cela permet d'afficher 10 000 triangles pour le coût de performance d'un seul.

## 2. GESTION DES VIDÉOS ET DE L'AUDIO

Les vidéos de ta pratique de piano ("Let it Be") et les conférences de *Predictive History* peuvent détruire les performances si elles sont mal chargées.

*   **Vidéos Youtube (Predictive History) :**
    *   Ne télécharge pas les vidéos. Utilise la librairie `react-player` avec l'option `light={true}`. Cela affichera d'abord une simple image (thumbnail), et l'iframe YouTube ne se chargera que lorsque l'utilisateur cliquera dessus.
*   **Vidéos Locales (Piano "Let it Be") :**
    *   Place le fichier dans le dossier `public/videos/`.
    *   Compresse-la en `.webm` ou `.mp4` (H.264) optimisé pour le web (tu peux utiliser Handbrake pour ça).
    *   Utilise la balise HTML5 standard avec les attributs : `preload="none"` (pour éviter le téléchargement au chargement de la page) et `poster="chemin_vers_une_image.jpg"` (pour afficher une belle miniature en attendant).
*   **Audio (Chants Liturgiques Russes & Oktavist) :**
    *   *L'idée de génie pour la 3D :* Au lieu d'un lecteur classique, demande à Cline d'utiliser **l'Audio Spatial 3D** de Three.js (`PositionalAudio` dans R3F). 
    *   Tu peux attacher le fichier `.mp3` ou `.ogg` directement à la sphère du pilier "Art". Plus l'utilisateur zoome sur cette sphère, plus les voix de la chorale orthodoxe résonnent fort. Cela renforcera l'immersion organique du projet.

## 3. LA RÈGLE D'OR : LE "LAZY LOADING" (Chargement Paresseux)

Le visiteur ne doit télécharger que ce qu'il regarde.

*   **React Suspense :** Tout le Canvas 3D doit être enveloppé dans un composant `<Suspense fallback={<Loader />}>`. Pendant que les shaders et la fractale chargent, l'utilisateur verra une belle animation (par exemple un pourcentage minimaliste, ou des lignes de code qui défilent) au lieu d'un écran noir.
*   **Dynamic Imports (Next.js) :** Les composants lourds des pages (comme le lecteur vidéo ou les galeries de la partie Travail) doivent être importés dynamiquement :
    ```javascript
    import dynamic from 'next/dynamic'
    const HeavyVideoPlayer = dynamic(() => import('../components/HeavyVideoPlayer'), { ssr: false })
    ```

## 4. INSTRUCTIONS SPÉCIFIQUES POUR LES SHADERS (GLSL)

Pour que la structure spatiale brille comme une Sphère de Dyson sans faire fondre les GPU des téléphones :
*   Privilégier le **Matcap (MeshMatcapMaterial)** pour les textures métalliques/organiques : c'est extrêmement léger car l'éclairage est "cuit" dans une simple texture, évitant de calculer la lumière en temps réel.
*   Pour la lueur (Glow/Bloom) des sphères, utiliser `@react-three/postprocessing` (l'effet `Bloom`), mais en ciblant uniquement les sphères via des calques (`layers`) pour ne pas appliquer l'effet au vide spatial.
