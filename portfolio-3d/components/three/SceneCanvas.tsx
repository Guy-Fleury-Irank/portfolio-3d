/**
 * Wrapper CLIENT du Canvas 3D global.
 * - `'use client'` obligatoire : `next/dynamic` avec `ssr:false` n'est pas
 *   autorisé directement dans un Server Component (ici le `layout.tsx`).
 * - Charge la scène R3F UNIQUEMENT côté navigateur (WebGL absent côté serveur).
 *   → le Canvas persiste entre les navigations (chargé une seule fois à la racine).
 */
"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/ui/Loader";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function SceneCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* le canvas est derrière le contenu (z-0) ; les pages passent par-dessus (z-10) */}
      <Scene />
    </div>
  );
}
