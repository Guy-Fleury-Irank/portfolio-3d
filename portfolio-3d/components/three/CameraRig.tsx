/**
 * Contrôle de la caméra R3F, piloté par le store Zustand.
 * - Vue `home`        : caméra légèrement en hauteur, face au centre.
 * - Vue `pillar:*`    : la caméra se rapproche et cible le sommet du pilier.
 * Transitions fluides par interpolation (lerp) de la position → lookAt.
 * → DoF / focus purent, scroll GSAP : Milestones 5 et 9.
 */
"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PILLARS } from "@/lib/data";
import { useStore } from "@/store/useStore";

export default function CameraRig() {
  const { camera } = useThree();
  const view = useStore((s) => s.view);

  const target = useRef(new THREE.Vector3(0, 2.2, 7));
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));
  const tmp = useRef(new THREE.Vector3());
  const tmpLook = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const pillar = view.startsWith("pillar:")
      ? PILLARS.find((p) => `pillar:${p.id}` === view)
      : undefined;

    if (pillar) {
      const v = tmp.current.set(...pillar.position);
      target.current.set(v.x * 1.65, v.y + 0.9, v.z * 1.65);
      lookAt.current.set(v.x, v.y, v.z);
    } else {
      target.current.set(0, 2.2, 7);
      lookAt.current.set(0, 0, 0);
    }

    // Facteur d'interpolation dépendant du delta → fluide quel que soit le FPS.
    const k = 1 - Math.pow(0.0001, delta);
    camera.position.lerp(target.current, k);
    camera.lookAt(tmpLook.current.copy(lookAt.current));
  });

  return null;
}
