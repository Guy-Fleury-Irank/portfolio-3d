/**
 * Synchronisation route ↔ store (Milestone 6).
 *
 * Écoute le pathname et pilote l'état global :
 * - sur une page pilier  → `goToPillar(id)` (fige la rotation, cible caméra/DoF) ;
 * - ailleurs (accueil)   → `goHome()` (rotation relancée, retour au centre).
 *
 * Ce petit composant client rend la navigation robuste quel que soit le moyen
 * d'arriver sur une page : clic sur une sphère 3D, lien du hero, BackButton,
 * bouton précédent/suivant du navigateur, ou saisie directe de l'URL.
 */
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";
import type { PillarId } from "@/lib/data";

const ROUTE_TO_PILLAR: Record<string, PillarId> = {
  "/travail": "travail",
  "/art": "art",
  "/argent": "argent",
};

export default function RouteViewSync() {
  const pathname = usePathname();

  useEffect(() => {
    const id = ROUTE_TO_PILLAR[pathname];
    if (id) {
      useStore.getState().goToPillar(id);
    } else {
      useStore.getState().goHome();
    }
  }, [pathname]);

  return null;
}