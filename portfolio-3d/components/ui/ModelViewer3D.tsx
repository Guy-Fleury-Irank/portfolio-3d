"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";

function Donut({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  return <primitive object={scene} />;
}

/** Fallback torique (l'anneau du donut) pendant le chargement / si absent. */
function Placeholder() {
  return (
    <mesh>
      <torusGeometry args={[0.7, 0.28, 24, 48]} />
      <meshStandardMaterial color="#d97706" roughness={0.6} metalness={0.1} />
    </mesh>
  );
}

/**
 * Milestone 14 — Visionneuse 3D d'un modèle Blender (GLB).
 * Embed petit Canvas avec OrbitControls ; fallback procédural si le fichier
 * venait à manquer (pré-vol HEAD) — aucune erreur si l'asset est absent.
 */
export default function ModelViewer3D({
  src,
  accentColor,
}: {
  src: string;
  accentColor: string;
}) {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(src, { method: "HEAD" })
      .then((r) => alive && setAvailable(r.ok))
      .catch(() => alive && setAvailable(false));
    return () => {
      alive = false;
    };
  }, [src]);

  return (
    <div className="mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-white/2">
      <div className="h-[320px] w-full">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [2.4, 1.5, 2.8], fov: 40 }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[4, 6, 3]} intensity={1.7} color="#fff1df" />
          <pointLight position={[-3, 2, -2]} intensity={0.7} color={accentColor} />
          {available === false ? (
            <Placeholder />
          ) : (
            <Suspense fallback={<Placeholder />}>
              <Donut src={src} />
            </Suspense>
          )}
          <ContactShadows
            position={[0, -0.6, 0]}
            opacity={0.45}
            scale={6}
            blur={2.2}
            far={2.5}
            color="#05060f"
          />
          <OrbitControls
            enablePan={false}
            minDistance={1.2}
            maxDistance={6}
            autoRotate
            autoRotateSpeed={1.4}
          />
        </Canvas>
      </div>
      <p className="px-3 py-2 text-center text-xs text-zinc-500">
        Glisser pour tourner · molette pour zoomer — objet Blender (BlenderGuru)
      </p>
    </div>
  );
}
