/**
 * Environnement spatial : fond sombre, lights de base et étoiles.
 * (Milestone 2 — espace & étoiles. Squelette posé dès la Milestone 1.)
 */
"use client";

import { Stars } from "@react-three/drei";

export default function SpaceEnvironment() {
  return (
    <>
      <color attach="background" args={["#05060f"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 10, 6]} intensity={1.2} />
      <pointLight position={[0, 3, 0]} intensity={0.4} color="#7aa2ff" />
      <Stars
        radius={120}
        depth={60}
        count={4500}
        factor={4}
        saturation={0}
        fade
        speed={0.6}
      />
    </>
  );
}
