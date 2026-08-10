/**
 * Store global (Zustand) — état de la caméra & de la structure 3D.
 * Guide §3.2 : view, activePillar, isRotating, pillarScrollProgress.
 */
"use client";

import { create } from "zustand";
import type { PillarId } from "@/lib/data";

export type ViewState = "home" | `pillar:${PillarId}`;

interface StoreState {
  /** Vue courante : accueil, ou pilier ciblé. */
  view: ViewState;
  /** Pilier actuellement ciblé (null sur la page d'accueil). */
  activePillar: PillarId | null;
  /** Rotation automatique du triangle (active sur `/`, figée sur les piliers). */
  isRotating: boolean;
  /** Progression du scroll GSAP (recul / éjection du triangle) — Milestone 9. */
  pillarScrollProgress: number;
  /** M11 — audio spatial posé sur la sphère Art (activé par l'utilisateur). */
  artAudioEnabled: boolean;

  setView: (view: ViewState) => void;
  goHome: () => void;
  goToPillar: (p: PillarId) => void;
  setRotating: (rotating: boolean) => void;
  setPillarScrollProgress: (progress: number) => void;
  setArtAudioEnabled: (v: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  view: "home",
  activePillar: null,
  isRotating: true,
  pillarScrollProgress: 0,
  artAudioEnabled: false,

  setView: (view) =>
    set({
      view,
      activePillar: view === "home" ? null : (view.replace("pillar:", "") as PillarId),
      isRotating: view === "home",
    }),

  goHome: () => set({ view: "home", activePillar: null, isRotating: true }),

  goToPillar: (p) => set({ view: `pillar:${p}`, activePillar: p, isRotating: false }),

  setRotating: (isRotating) => set({ isRotating }),

  setPillarScrollProgress: (pillarScrollProgress) => set({ pillarScrollProgress }),

  setArtAudioEnabled: (artAudioEnabled) => set({ artAudioEnabled }),
}));
