/**
 * Controle de la camera R3F, pilote par le store Zustand.
 * - Vue `home`     : camera en hauteur, face au centre. Toute la structure nette
 *   (DoF : focus au centre, espace etoilé lointain doucement flou).
 * - Vue `pillar:*` : la camera se rapproche et cible le sommet du pilier ; le
 *   DoF se resserre sur la sphere -> le reste devient flou (cahier des charges).
 *
 * Milestone 9 — progres du scroll (store.pillarScrollProgress) :
 *   - recul progressif de la camera vers la vue d'ensemble (lerp homePos),
 *   - relachement du DoF pour reveler le triangle en arriere-plan,
 *   - rotation lente du triangle (delegate a FractalTriangle).
 * Transitions fluides : lerp position + lookAt + foyer DoF.
 */
"use client";

import { useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { DepthOfFieldEffect } from "postprocessing";
import { PILLARS } from "@/lib/data";
import { useStore } from "@/store/useStore";

/** DoF vue HOME : toute la structure nette, espace flou. */
const HOME_FOCUS_RANGE = 9;
const HOME_BOKEH_SCALE = 3.5;
/** DoF zoom pilier : sphere nette, structure & espace hors-champ (flous). */
const PILLAR_FOCUS_RANGE = 1.6;
const PILLAR_BOKEH_SCALE = 6;

interface CameraRigProps {
  /** Ref de l'effet DepthOfField monte dans Scene — anime par ce controleur. */
  dofRef?: RefObject<DepthOfFieldEffect | null>;
}

export default function CameraRig({ dofRef }: CameraRigProps) {
  const { camera } = useThree();
  const view = useStore((s) => s.view);
  // Milestone 9 — progression du scroll GSAP (recul du triangle en background).
  const scroll = useStore((s) => s.pillarScrollProgress);
  // M15 — traversée : on est logé à l'intérieur de la sphère cible.
  const beyondSphere = useStore((s) => s.beyondSphere);

  const target = useRef(new THREE.Vector3(0, 2.2, 7));
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));
  const tmp = useRef(new THREE.Vector3());
  const tmpLook = useRef(new THREE.Vector3());
  const lockPos = useRef(new THREE.Vector3());
  /** Position vue d'ensemble servie de recul quand l'utilisateur scrolle (M9). */
  const homePos = useRef(new THREE.Vector3(0, 2.2, 7));

  // Foyer DoF anime : point focal + profondeur de champ + intensite bokeh.
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
      if (beyondSphere) {
        // M15 — on a traversé la sphère : caméra à l'intérieur, face au
        // mini-univers fractal central (as above so below).
        target.current.set(v.x * 0.93, v.y + 0.05, v.z * 0.93);
        lookAt.current.set(v.x, v.y, v.z);
        dofDesired.current.set(v.x, v.y, v.z);
        desiredRange = 1.1;
        desiredBokeh = 2.2;
      } else {
        // Verrouillage sur le sommet, puis recul progressif (lerp vers homePos
        // selon le scroll) — le triangle repart en arriere-plan (Milestone 9).
        const backT = scroll * 0.5;
        lockPos.current.set(v.x * 1.65, v.y + 0.9, v.z * 1.65);
        target.current.lerpVectors(lockPos.current, homePos.current, backT);
        lookAt.current.set(v.x, v.y, v.z);
        dofDesired.current.set(v.x, v.y, v.z);
        // DoF : en scrollant, on relache la profondeur de champ pour decouvrir
        // le triangle qui recule (moins de flou, plus de perspective).
        desiredRange = THREE.MathUtils.lerp(PILLAR_FOCUS_RANGE, HOME_FOCUS_RANGE, scroll);
        desiredBokeh = THREE.MathUtils.lerp(PILLAR_BOKEH_SCALE, HOME_BOKEH_SCALE, scroll);
      }
    } else {
      target.current.set(0, 2.2, 7);
      lookAt.current.set(0, 0, 0);
      dofDesired.current.set(0, 0, 0);
    }

    // Camera : interpolation fluide, independante du FPS.
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
      // La cible force un recalcul de focusDistance camera->cible a chaque frame.
      dof.target = dofFocus.current;
      dof.cocMaterial.focusRange = dofRange.current;
      dof.bokehScale = dofBokeh.current;
    }
  });

  return null;
}
