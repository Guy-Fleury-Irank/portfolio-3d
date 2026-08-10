/**
 * La structure triangulaire centrale (vraie construction — Milestone 3).
 * - 3 spheres Dyson (piliers) aux sommets.
 * - Champ fractal Sierpinski + aretes cabitees via InstancedMesh (drei <Instances>)
 *   avec ShaderMaterial GLSL (pulsation par instance, degrade des 3 couleurs,
 *   atténuation distance). -> "10 000 triangles au cout d'une seule".
 * - Rotation automatique pilotée par le store Zustand (isRotating).
 * - Milestone 9 : en exploration (scroll sur un pilier), rotation lente
 *   "as above so below" pendant que le triangle recule en arriere-plan.
 */
"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Instances, Instance, Line } from "@react-three/drei";
import { PILLARS } from "@/lib/data";
import { useStore } from "@/store/useStore";
import { buildFractalInstances } from "@/lib/fractal";
import SpherePillar from "./SpherePillar";
import { fractalVertexShader, fractalFragmentShader } from "./fractalShaders";

/** Inclinaison douce de la structure en vue HOME (elle "flotte" en biais). */
const FRACTAL_TILT = -0.35;

export default function FractalTriangle() {
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const isRotating = useStore((s) => s.isRotating);
  const view = useStore((s) => s.view);
  // Milestone 9 — progression du scroll (déclenche la rotation lente en exploration).
  const scroll = useStore((s) => s.pillarScrollProgress);

  const instances = useMemo(() => buildFractalInstances(), []);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const count = instances.length;

  // Inclinaison initiale (x) posée une seule fois au montage pour ne pas
  // écraser la rotation.y incrémentée dans useFrame (R3F n’a pas de prop rotation).
  useEffect(() => {
    if (group.current) group.current.rotation.set(FRACTAL_TILT, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
    if (group.current) {
      if (isRotating) {
        // Vue accueil : rotation lente continue.
        group.current.rotation.y += delta * 0.15;
      } else if (view.startsWith("pillar:") && scroll > 0.001) {
        // Milestone 9 — en scrollant sur un sommet, le triangle effectue une
        // rotation lente "as above so below" pendant qu’il se recule en arrière-plan.
        group.current.rotation.y += delta * 0.04;
      }
    }
  });

  const edgePoints = [
    ...PILLARS.map((p) => new THREE.Vector3(...p.position)),
    new THREE.Vector3(...PILLARS[0].position),
  ];

  return (
    <group ref={group}>
      {PILLARS.map((p) => (
        <SpherePillar key={p.id} pillarId={p.id} />
      ))}

      {/* Champ fractal — InstancedMesh + shader GLSL */}
      <Instances limit={count} frustumCulled={false}>
        <tetrahedronGeometry args={[1, 0]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={fractalVertexShader}
          fragmentShader={fractalFragmentShader}
          uniforms={uniforms}
        />
        {instances.map((it, i) => (
          <Instance
            key={i}
            position={it.position.toArray()}
            quaternion={it.quaternion.toArray()}
            scale={it.scale.toArray()}
            color={it.color}
          />
        ))}
      </Instances>

      {/* Léger contour du triangle pour la lisibilité */}
      <Line
        points={edgePoints}
        color="#8a94ff"
        lineWidth={1}
        transparent
        opacity={0.22}
      />
    </group>
  );
}
