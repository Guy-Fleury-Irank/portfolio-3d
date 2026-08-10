"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useStore } from "@/store/useStore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Milestone 9 — GSAP ScrollTrigger -> store.pillarScrollProgress (0..1).
 * Monte sur les pages piliers (demonte a la navigation). CameraRig &
 * FractalTriangle consomment ce progres pour le recul + rotation du triangle.
 */
export default function PillarScrollScene() {
  const setProgress = useStore((s) => s.setPillarScrollProgress);

  useEffect(() => {
    // scrub:true rend l'animation fluide ET bidirectionnelle (scroll up -> retour).
    const trigger = ScrollTrigger.create({
      trigger: "#pillar-content",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => {
      trigger.kill();
      setProgress(0);
    };
  }, [setProgress]);

  return null;
}
