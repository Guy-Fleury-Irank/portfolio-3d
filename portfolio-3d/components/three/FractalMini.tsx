"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Instances, Instance, Line } from "@react-three/drei";
import { PILLARS } from "@/lib/data";
import { buildFractalInstances } from "@/lib/fractal";
import { fractalVertexShader, fractalFragmentShader } from "./fractalShaders";

/** Mini-univers fractal logé à l'intérieur d'une sphère (Milestone 15).
    « As above so below » : en traversant la sphère, on retrouve la même
    structure triangulaire — ici à une échelle intérieure. Reproduit le champ
    Sierpinski + les arêtes + une lueur centrale ; tourne lentement. */
export default function FractalMini() {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const instances = useMemo(() => buildFractalInstances(), []);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const count = instances.length;

  // Inclinaison fixe (les spheres sont posées en biais) pour un rendu flottant.
  useEffect(() => {
    if (groupRef.current) groupRef.current.rotation.set(-0.4, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3;
  });

  const edgePoints = [
    ...PILLARS.map((p) => new THREE.Vector3(...p.position)),
    new THREE.Vector3(...PILLARS[0].position),
  ];

  return (
    <group ref={groupRef} scale={0.15}>
      {/* Champ fractal du mini-univers — InstancedMesh + shader GLSL. */}
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

      {/* Contour triangulaire vibratoire. */}
      <Line
        points={edgePoints}
        color="#8a94ff"
        lineWidth={1}
        transparent
        opacity={0.5}
      />

      {/* Lueur centrale — la sphère paraît vivante depuis l'extérieur. */}
      <pointLight position={[0, 0, 0]} intensity={0.7} color="#a5b4fc" />
    </group>
  );
}
