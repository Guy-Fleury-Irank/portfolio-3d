/**
 * Contrôle de la caméra R3F, piloté par le store Zustand.
 * - Vue `home`     : caméra en hauteur, face au centre. Tout le triangle net
 *   (Depth of Field : focus au centre, espace étoilé lointain doucement flou).
 * - Vue `pillar:*` : la caméra se rapproche et cible le sommet du pilier. Le
 *   Depth of Field se resserre sur la sphère → le reste de la structure et
 *   l'espace deviennent flous (sensation d'échelle, scénario du cahier des charges).
 * Transitions fluides : lerp de la position, du lookAt ET du foyer DoF.
 *
 * → Milestone 5 : Depth of Field (focus + profondeur de champ pilotés).
 */
"use client";

import { useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { DepthOfFieldEffect } from "postprocessing";
import { PILLARS } from "@/lib/data";
import { useStore } from "@/store/useStore";

/** DoF vue HOME : toute la structure dans le champ de netteté, espace flou. */
const HOME_FOCUS_RANGE = 9;
const HOME_BOKEH_SCALE = 3.5;
/** DoF zoom pilier : sphère nette, structure & espace hors-champ (flous). */
const PILLAR_FOCUS_RANGE = 1.6;
const PILLAR_BOKEH_SCALE = 6;

interface CameraRigProps {
  /** Ref de l'effet DepthOfField monté dans Scene — animé par ce contrôleur. */
  dofRef?: RefObject<DepthOfFieldEffect | null>;
}

export default function CameraRig({ dofRef }: CameraRigProps) {
  const { camera } = useThree();
  const view = useStore((s) => s.view);

  const target = useRef(new THREE.Vector3(0, 2.2, 7));
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));
  const tmp = useRef(new THREE.Vector3());
  const tmpLook = useRef(new THREE.Vector3());

  // Foyer DoF animé : point focal + profondeur de champ + intensité bokeh.
  const dofFocus = useRef(new THREE.Vector3(0, 0, 0));
  const dofDesired = useRef(new THREE.Vector3(0, 0, 0));
  const dofRange = useRef(HOME_FOCUS_RANGE);
  const dofBokeh = useRef(HOME_BOKEH_SCALE);

  useFrame((_, delta) => {
    const pillar = view.startsWith("pillar:")
      ? PILLARS.find((p) => `pillar:${p.id}` === view)
      : undefined;

    let desiredRange = HOME_FOCUS_RANGE;
    let desiredBokeh = HOME_BOKEH_SCALE;

    if (pillar) {
      const v = tmp.current.set(...pillar.position);
      target.current.set(v.x * 1.65, v.y + 0.9, v.z * 1.65);
      lookAt.current.set(v.x, v.y, v.z);
      dofDesired.current.set(v.x, v.y, v.z);
      desiredRange = PILLAR_FOCUS_RANGE;
      desiredBokeh = PILLAR_BOKEH_SCALE;
    } else {
      target.current.set(0, 2.2, 7);
      lookAt.current.set(0, 0, 0);
      dofDesired.current.set(0, 0, 0);
    }

    // Caméra : interpolation fluide, indépendante du FPS.
    const k = 1 - Math.pow(0.0001, delta);
    camera.position.lerp(target.current, k);
    camera.lookAt(tmpLook.current.copy(lookAt.current));

    // DoF : transitions de focus douces (point focal, profondeur, bokeh).
    const fk = 1 - Math.exp(-3.0 * delta);
    dofFocus.current.lerp(dofDesired.current, fk);
    const dk = 1 - Math.exp(-2.0 * delta);
    dofRange.current += (desiredRange - dofRange.current) * dk;
    dofBokeh.current += (desiredBokeh - dofBokeh.current) * dk;

    const dof = dofRef?.current;
    if (dof) {
      // La cible force un recalcul de focusDistance caméra→cible à chaque frame.
      dof.target = dofFocus.current;
      dof.cocMaterial.focusRange = dofRange.current;
      dof.bokehScale = dofBokeh.current;
    }
  });

  return null;
}
