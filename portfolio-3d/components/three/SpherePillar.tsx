/**
 * Sphère Dyson individuelle (sommet du triangle — un pilier).
 * Squelette Milestone 1 : simple sphère lumineuse aux couleurs du pilier.
 * → Pulsation, Matcap, Bloom ciblé, PositionalAudio : Milestones 4 et 11.
 */
"use client";

import { PILLARS } from "@/lib/data";
import type { PillarId } from "@/lib/data";

export default function SpherePillar({ pillarId }: { pillarId: PillarId }) {
  const pillar = PILLARS.find((p) => p.id === pillarId) as (typeof PILLARS)[number];
  return (
    <mesh position={pillar.position}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial
        color={pillar.color}
        emissive={pillar.color}
        emissiveIntensity={0.7}
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  );
}
