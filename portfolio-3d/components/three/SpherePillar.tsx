/**
 * Sphère Dyson individuelle (sommet du triangle — un pilier).
 *
 * Milestone 4 : Matcap procédurale + pulsation lumineuse + `<Select>` (Bloom ciblé).
 * Milestone 6 : **sommet cliquable**.
 * - Zone de clic invisible élargie (raycaster R3F) sur chaque sphère.
 * - Curseur "pointer" au survol, léger boost d'échelle/luminosité.
 * - Clic → transition caméra (store `goToPillar`) + navigation vers la page du pilier.
 * - Label discret via `Html` (drei) qui s'illumine au survol.
 */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { Select } from "@react-three/postprocessing";
import { Html, PositionalAudio } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { PILLARS } from "@/lib/data";
import type { PillarId } from "@/lib/data";
import { useStore } from "@/store/useStore";
import { getPillarMatcap } from "./matcapFactory";

/** M11 — audio spatial attaché à la sphère Art (fichier déposé par l'utilisateur). */
const ART_SPATIAL_AUDIO = "/audio/art-choir-spatial.mp3";
const BASE_RADIUS = 0.2;
/** Zone de clic généreuse autour de la sphère visuelle. */
const HIT_SCALE = 2.8;
const PULSE_SPEED = 1.5;
const PULSE_AMP = 0.06;
const HOVER_BOOST = 1.12;

export default function SpherePillar({ pillarId }: { pillarId: PillarId }) {
  const pillar = PILLARS.find((p) => p.id === pillarId) as (typeof PILLARS)[number];
  const router = useRouter();
  const goToPillar = useStore((s) => s.goToPillar);
  const artAudioEnabled = useStore((s) => s.artAudioEnabled);

  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshMatcapMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  const artAudio = useRef<THREE.PositionalAudio>(null);

  // Matcap procédurale aux couleurs du pilier (cache global).
  const matcap = useMemo(() => getPillarMatcap(pillar.color), [pillar.color]);

  // Phase de pulsation propre à chaque pilier (répartition sur le cercle).
  const phaseOffset = useMemo(() => {
    const idx = PILLARS.findIndex((p) => p.id === pillarId);
    return (idx / PILLARS.length) * Math.PI * 2;
  }, [pillarId]);

  // Curseur global "pointer" quand la souris survole un sommet.
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  // M11 — audio spatial sur la sphère Art : démarre au premier geste utilisateur
  // (résout la politique d'autoplay) ; le volume augmente avec la proximité caméra.
  useEffect(() => {
    if (!artAudioEnabled) return;
    const start = () => {
      const a = artAudio.current;
      if (!a) return;
      try {
        const ctx = a.context as AudioContext | undefined;
        if (ctx && typeof ctx.resume === "function") void ctx.resume();
        a.setRefDistance(0.6);
        a.setMaxDistance(9);
        a.setRolloffFactor(1.3);
        void a.play();
      } catch {
        // Autoplay bloqué ou fichier encore absent — on réessaie au prochain geste.
      }
    };
    window.addEventListener("pointerdown", start);
    return () => window.removeEventListener("pointerdown", start);
  }, [artAudioEnabled]);

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    // Si le clic DOM visait un élément interactif HTML (lien/bouton au-dessus
    // du canvas), on ne déclenche PAS la navigation 3D (évite les doubles actions).
    const src = (e.nativeEvent?.target ?? null) as HTMLElement | null;
    if (src && typeof src.closest === "function" && src.closest("a,button,[role='button']")) {
      return;
    }
    goToPillar(pillar.id); // figuré rotation + cible caméra/DoF via le store
    router.push(pillar.route);
  };

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hoveredRef.current = true;
    setHovered(true);
  };

  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hoveredRef.current = false;
    setHovered(false);
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse =
      1 +
      PULSE_AMP *
        Math.sin(t * PULSE_SPEED + phaseOffset) *
        Math.sin(t * 0.6 + phaseOffset * 2);
    const boost = hoveredRef.current ? HOVER_BOOST : 1;

    if (mesh.current) mesh.current.scale.setScalar(BASE_RADIUS * pulse * boost);

    // Intensité lumineuse : respiration + éclat au survol.
    if (material.current) {
      const k = 0.92 + 0.08 * Math.sin(t * 1.9 + phaseOffset);
      const glow = hoveredRef.current ? 1.06 : 1;
      material.current.color.setRGB(k * glow, k * glow, k * glow);
    }
  });

  return (
    <group position={pillar.position}>
      {/* M11 — audio spatial attaché à la sphère Art (coup de génie : + zoom = + fort). */}
      {pillarId === "art" && artAudioEnabled && (
        <PositionalAudio ref={artAudio} url={ART_SPATIAL_AUDIO} distance={1} loop />
      )}
      {/* Sphère visuelle (sélectionnée pour le Bloom ciblé). */}
      <Select enabled>
        <mesh ref={mesh}>
          <sphereGeometry args={[BASE_RADIUS, 48, 48]} />
          <meshMatcapMaterial ref={material} matcap={matcap} color="#ffffff" />
        </mesh>
      </Select>

      {/* Zone de clic invisible — rayon élargi (raycasting R3F). */}
      <mesh
        scale={HIT_SCALE}
        onClick={handleClick}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
      >
        <sphereGeometry args={[BASE_RADIUS, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Label pilier (drei Html) — discret, s'illumine au survol. */}
      <Html center position={[0, 0.62, 0]} style={{ pointerEvents: "none" }} zIndexRange={[30, 0]}>
        <div
          className="flex flex-col items-center gap-1 whitespace-nowrap transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0.7 }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: pillar.color,
              color: pillar.color,
              boxShadow: `0 0 12px 3px ${pillar.color}`,
            }}
          />
          <span
            className="text-[10px] font-medium uppercase tracking-[0.25em] transition-colors duration-300"
            style={{ color: hovered ? pillar.color : "#d4d4d8" }}
          >
            {pillar.label}
          </span>
        </div>
      </Html>
    </group>
  );
}
