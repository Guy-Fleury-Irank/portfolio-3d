/**
 * Sphère Dyson individuelle (sommet du triangle — un pilier).
 * Milestone 4 :
 * - **Matcap** (MeshMatcapMaterial) : éclairage "cuit" dans une texture procédurale.
 * - **Pulsation lumineuse** : respiration de l'échelle + intensité, propre à chaque pilier.
 * - **Bloom ciblé par calques** : marquée via `<Select>` (selection layer),
 *   seules les 3 sphères reçoivent le glow (`SelectiveBloom` dans Scene).
 */
"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Select } from "@react-three/postprocessing";
import { PILLARS } from "@/lib/data";
import type { PillarId } from "@/lib/data";
import { getPillarMatcap } from "./matcapFactory";

const BASE_RADIUS = 0.2;
const PULSE_SPEED = 1.5;
const PULSE_AMP = 0.06;

export default function SpherePillar({ pillarId }: { pillarId: PillarId }) {
  const pillar = PILLARS.find((p) => p.id === pillarId) as (typeof PILLARS)[number];
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshMatcapMaterial>(null);

  // Matcap procédurale aux couleurs du pilier (cache global).
  const matcap = useMemo(() => getPillarMatcap(pillar.color), [pillar.color]);

  // Phase de pulsation propre à chaque pilier (répartition sur le cercle).
  const phaseOffset = useMemo(() => {
    const idx = PILLARS.findIndex((p) => p.id === pillarId);
    return (idx / PILLARS.length) * Math.PI * 2;
  }, [pillarId]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse =
      1 +
      PULSE_AMP *
        Math.sin(t * PULSE_SPEED + phaseOffset) *
        Math.sin(t * 0.6 + phaseOffset * 2);

    if (mesh.current) mesh.current.scale.setScalar(BASE_RADIUS * pulse);

    // Intensité lumineuse : clignote doucement autour de 1.0.
    if (material.current) {
      const k = 0.92 + 0.08 * Math.sin(t * 1.9 + phaseOffset);
      material.current.color.setRGB(k, k, k);
    }
  });

  return (
    <Select enabled>
      <mesh ref={mesh} position={pillar.position}>
        <sphereGeometry args={[BASE_RADIUS, 48, 48]} />
        <meshMatcapMaterial ref={material} matcap={matcap} color="#ffffff" />
      </mesh>
    </Select>
  );
}
