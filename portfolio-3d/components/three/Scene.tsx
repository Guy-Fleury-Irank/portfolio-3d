/**
 * Scène R3F — montage du Canvas 3D global.
 * Le Canvas reste monté en permanence (à la racine, via SceneCanvas dans le layout).
 * « La caméra et l'objet bougent, pas le canvas. » (cahier des charges §2.2)
 *
 * Milestone 4 : **Bloom ciblé par calques** (`Selection`/`Select`/`SelectiveBloom`).
 * Milestone 5 : **Depth of Field** (`DepthOfField`) — focus piloté par `CameraRig`
 * (netteté sur la sphère active, profondeur de champ animée).
 */
"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { DepthOfField, EffectComposer, SelectiveBloom, Selection } from "@react-three/postprocessing";
import * as THREE from "three";
import type { DepthOfFieldEffect } from "postprocessing";
import SpaceEnvironment from "./SpaceEnvironment";
import FractalTriangle from "./FractalTriangle";
import CameraRig from "./CameraRig";

export default function Scene() {
  const dirLight = useRef<THREE.DirectionalLight>(null);
  const pointLight = useRef<THREE.PointLight>(null);
  const dofRef = useRef<DepthOfFieldEffect | null>(null);

  // Références stables (résolues par SelectiveBloom au montage).
  const bloomLights = useMemo(() => [dirLight, pointLight], []);

  return (
    <Canvas
      camera={{ position: [0, 2.2, 7], fov: 50, near: 0.1, far: 500 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!pointer-events-none"
    >
      <Selection>
        {/* Règle d'or : tout le contenu 3D lourd enveloppé dans <Suspense>. */}
        <Suspense fallback={null}>
          <SpaceEnvironment />

          {/* Lights (refs requises par SelectiveBloom pour le rendu masqué). */}
          <ambientLight intensity={0.35} />
          <directionalLight ref={dirLight} position={[6, 10, 6]} intensity={1.2} />
          <pointLight ref={pointLight} position={[0, 3, 0]} intensity={0.4} color="#7aa2ff" />

          <FractalTriangle />
          {/* CameraRig anime aussi le foyer DoF (focus point + bokeh + range). */}
          <CameraRig dofRef={dofRef} />

          <EffectComposer multisampling={4}>
            <SelectiveBloom
              lights={bloomLights}
              selectionLayer={8}
              intensity={1.35}
              radius={0.85}
              mipmapBlur
              luminanceThreshold={0.12}
              luminanceSmoothing={0.25}
            />
            <DepthOfField
              ref={dofRef}
              focusDistance={7}
              focusRange={9}
              bokehScale={3.5}
              resolutionScale={0.5}
            />
          </EffectComposer>
        </Suspense>
      </Selection>
    </Canvas>
  );
}
