/**
 * La structure triangulaire centrale (squelette Milestone 1).
 * - 3 sphères (piliers) reliées par des arêtes lumineuses (Line).
 * - Rotation automatique lue depuis le store Zustand (`isRotating`).
 * → Géométrie fractale GLSL + InstancedMesh + Bloom : Milestones 3-4.
 */
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { PILLARS } from "@/lib/data";
import { useStore } from "@/store/useStore";
import SpherePillar from "./SpherePillar";

export default function FractalTriangle() {
  const group = useRef<THREE.Group>(null);
  const isRotating = useStore((s) => s.isRotating);

  useFrame((_, delta) => {
    if (group.current && isRotating) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  // Arêtes : les 3 sommets en boucle fermée (v0 → v1 → v2 → v0).
  const edgePoints = [
    ...PILLARS.map((p) => new THREE.Vector3(...p.position)),
    new THREE.Vector3(...PILLARS[0].position),
  ];

  return (
    <group ref={group}>
      {PILLARS.map((p) => (
        <SpherePillar key={p.id} pillarId={p.id} />
      ))}
      <Line
        points={edgePoints}
        color="#8a94ff"
        lineWidth={1.5}
        transparent
        opacity={0.85}
      />
    </group>
  );
}
