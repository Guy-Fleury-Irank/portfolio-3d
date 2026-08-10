/**
 * Scène R3F — montage du Canvas 3D global.
 * Le Canvas reste monté en permanence (à la racine, via SceneCanvas dans le layout).
 * « La caméra et l'objet bougent, pas le canvas. » (cahier des charges §2.2)
 */
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SpaceEnvironment from "./SpaceEnvironment";
import FractalTriangle from "./FractalTriangle";
import CameraRig from "./CameraRig";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 7], fov: 50, near: 0.1, far: 500 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!pointer-events-none"
    >
      {/* Règle d'or : tout le contenu 3D lourd enveloppé dans <Suspense>. */}
      <Suspense fallback={null}>
        <SpaceEnvironment />
        <FractalTriangle />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
