/**
 * Loader animé — fallback de Suspense pendant le chargement du Canvas 3D.
 * (Règle d'or §3 : pas d'écran noir ; pourcentage minimaliste / animation.)
 */
"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-[#05060f] text-zinc-300">
      <div className="h-1.5 w-40 overflow-hidden rounded-full bg-zinc-800">
        <div className="h-full w-1/3 rounded-full bg-cyan-400 animate-pulse" />
      </div>
      <p className="mt-5 text-[11px] uppercase tracking-[0.35em] text-zinc-500">
        Chargement de l&apos;espace…
      </p>
    </div>
  );
}
