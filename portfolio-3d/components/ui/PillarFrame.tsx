import type { ReactNode } from "react";
import BackButton from "@/components/ui/BackButton";
import { PILLARS, type PillarId } from "@/lib/data";

type PillarFrameProps = {
  id: PillarId;
  /** Texte descriptif du pilier (guide §1). */
  description: string;
  /** Contenu détaillé (cartes projets, lecteurs, digital garden...). */
  children?: ReactNode;
};

/**
 * Layout partagé des pages piliers (Milestone 8).
 * Affiche l'identite theme du sommet + indicateur "camera verrouillee".
 *
 * Le Canvas 3D (monte une fois dans le layout) reste persistent : des que la
 * route est atteinte, RouteViewSync appelle goToPillar(id) -> le store gele la
 * rotation (isRotating=false) et CameraRig guide la camera vers le sommet du
 * pilier (verrouillage + DoF cible sur la sphere).
 */
export default function PillarFrame({
  id,
  description,
  children,
}: PillarFrameProps) {
  const pillar = PILLARS.find((p) => p.id === id);
  if (!pillar) {
    throw new Error(`Pillar inconnu dans PillarFrame : ${id}`);
  }

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-24 px-6 py-24 text-center">
      <BackButton />

      <div className="max-w-2xl space-y-8">
        {/* Identite theme du sommet */}
        <div>
          <h1
            className="text-5xl font-extrabold uppercase tracking-widest"
            style={{ color: pillar.color }}
          >
            {pillar.label}
          </h1>
          <p
            className="mt-3 text-sm font-medium uppercase tracking-widest opacity-85"
            style={{ color: pillar.color }}
          >
            {pillar.tagline}
          </p>
        </div>

        {/* Indicateur "camera verrouillee" sur ce sommet (M8) */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: pillar.color,
              boxShadow: `0 0 8px 2px ${pillar.color}`,
            }}
          />
          Caméra verrouillée sur ce sommet
        </div>

        <p className="text-zinc-400">{description}</p>

        {children && (
          <div className="flex flex-col items-center gap-4">{children}</div>
        )}
      </div>
    </section>
  );
}
