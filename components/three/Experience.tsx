"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, Sparkles } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ShortsMesh } from "./ShortsMesh";
import { HotspotMarker } from "./HotspotMarker";
import { HOTSPOTS } from "@/lib/products";
import { ColorId, Hotspot } from "@/lib/types";

interface ExperienceProps {
  colorHex: string;
  pocketOpen: boolean;
  autoRotate: boolean;
  activeHotspot: Hotspot["id"] | null;
  onHotspotSelect: (id: Hotspot["id"]) => void;
}

export function Experience({
  colorHex,
  pocketOpen,
  autoRotate,
  activeHotspot,
  onHotspotSelect,
}: ExperienceProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.15, 4.4], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#b08d57" />
      <spotLight position={[0, 3, 3]} intensity={0.4} angle={0.5} penumbra={1} />

      <Suspense fallback={null}>
        <group position={[0, -0.3, 0]}>
          <ShortsMesh colorHex={colorHex} pocketOpen={pocketOpen} />
          {HOTSPOTS.map((hotspot) => (
            <HotspotMarker
              key={hotspot.id}
              hotspot={hotspot}
              active={activeHotspot === hotspot.id}
              onSelect={onHotspotSelect}
            />
          ))}
        </group>
        <ContactShadows
          position={[0, -1.3, 0]}
          opacity={0.55}
          blur={2.6}
          scale={7}
          far={2}
        />
        <Sparkles count={30} scale={4} size={2} speed={0.3} opacity={0.25} color="#b08d57" />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        makeDefault
        target={[0, -0.15, 0]}
        autoRotate={autoRotate}
        autoRotateSpeed={1.4}
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={2.6}
        maxDistance={6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}
