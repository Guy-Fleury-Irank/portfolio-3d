"use client";

import { useRef } from "react";
import { useStore } from "@/store/useStore";
import gsap from "gsap";

/** M15 — bascule « Traverser la sphère » : fondu GSAP + caméra à l'intérieur
    (révèle le mini-univers fractal — as above so below). */
export default function TraverseSphereButton() {
  const beyond = useStore((s) => s.beyondSphere);
  const setBeyond = useStore((s) => s.setBeyondSphere);
  const overlayRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const overlay = overlayRef.current;
    if (!overlay) {
      setBeyond(!beyond);
      return;
    }
    gsap.fromTo(
      overlay,
      { opacity: 0 },
      {
        opacity: 0.96,
        duration: 0.6,
        onComplete: () => {
          setBeyond(!beyond);
          gsap.to(overlay, { opacity: 0, duration: 0.7, delay: 0.15 });
        },
      },
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-zinc-200 transition hover:scale-105 hover:border-cyan-300/70 hover:text-cyan-200"
      >
        {beyond
          ? "↩ Revenir à la vue extérieure"
          : "🌀 Traverser la sphère — as above, so below"}
      </button>
      <div
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 bg-[#05060f] opacity-0"
      />
    </>
  );
}
