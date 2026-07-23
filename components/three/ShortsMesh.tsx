"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { createCorduroyBumpMap, createCorduroyTexture } from "./corduroyTexture";

interface ShortsMeshProps {
  colorHex: string;
  pocketOpen: boolean;
}

const EASE = (t: number) => 1 - Math.pow(1 - t, 3);

/** Sequenced items that "slide" into the hidden pocket cavity to demonstrate capacity. */
const ITEMS: {
  key: string;
  size: [number, number, number];
  color: string;
  delay: number;
  restOffset: [number, number, number];
}[] = [
  { key: "phone", size: [0.32, 0.62, 0.04], color: "#111318", delay: 0, restOffset: [0, 0, 0.05] },
  { key: "wallet", size: [0.34, 0.24, 0.04], color: "#5c3a21", delay: 0.5, restOffset: [0.02, -0.2, 0.08] },
  { key: "passport", size: [0.28, 0.38, 0.03], color: "#7a1f2b", delay: 1.0, restOffset: [-0.05, 0.18, 0.1] },
  { key: "keys", size: [0.05, 0.22, 0.05], color: "#c9c9c9", delay: 1.5, restOffset: [0.12, 0.1, 0.12] },
  { key: "earbuds", size: [0.12, 0.08, 0.06], color: "#f2f2f2", delay: 2.0, restOffset: [-0.12, -0.05, 0.14] },
];

export function ShortsMesh({ colorHex, pocketOpen }: ShortsMeshProps) {
  const flapPivot = useRef<THREE.Group>(null);
  const itemRefs = useRef<(THREE.Mesh | null)[]>([]);
  const stateStartTime = useRef(0);
  const prevOpen = useRef(pocketOpen);
  const elapsed = useRef(0);

  const map = useMemo(() => createCorduroyTexture(colorHex), [colorHex]);
  const bumpMap = useMemo(() => createCorduroyBumpMap(), []);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (prevOpen.current !== pocketOpen) {
      stateStartTime.current = elapsed.current;
      prevOpen.current = pocketOpen;
    }
    const t = elapsed.current - stateStartTime.current;

    if (flapPivot.current) {
      const targetAngle = pocketOpen ? -1.15 : 0;
      const progress = EASE(Math.min(1, t / 0.6));
      const from = pocketOpen ? 0 : -1.15;
      flapPivot.current.rotation.x = from + (targetAngle - from) * progress;
    }

    ITEMS.forEach((item, i) => {
      const mesh = itemRefs.current[i];
      if (!mesh) return;
      const itemT = pocketOpen
        ? Math.max(0, Math.min(1, (t - item.delay) / 0.5))
        : Math.max(0, Math.min(1, 1 - t / 0.4));
      const eased = EASE(itemT);
      const hiddenPos: [number, number, number] = [
        item.restOffset[0] + 0.9,
        item.restOffset[1] - 0.2,
        item.restOffset[2] - 0.5,
      ];
      mesh.position.set(
        hiddenPos[0] + (item.restOffset[0] - hiddenPos[0]) * eased,
        hiddenPos[1] + (item.restOffset[1] - hiddenPos[1]) * eased,
        hiddenPos[2] + (item.restOffset[2] - hiddenPos[2]) * eased
      );
      mesh.visible = eased > 0.01;
      mesh.scale.setScalar(0.6 + 0.4 * eased);
    });
  });

  return (
    <group>
      {/* Waistband */}
      <RoundedBox args={[2.4, 0.55, 1.35]} radius={0.2} smoothness={4} position={[0, 1.05, 0]} castShadow receiveShadow>
        <meshStandardMaterial map={map} bumpMap={bumpMap} bumpScale={0.015} roughness={0.92} metalness={0.02} />
      </RoundedBox>

      {/* Seat / hip connector */}
      <RoundedBox args={[2.3, 0.9, 1.3]} radius={0.25} smoothness={4} position={[0, 0.55, 0]} castShadow receiveShadow>
        <meshStandardMaterial map={map} bumpMap={bumpMap} bumpScale={0.015} roughness={0.92} metalness={0.02} />
      </RoundedBox>

      {/* Legs */}
      <mesh position={[-0.62, -0.25, 0]} rotation={[0, 0, 0.04]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.5, 1.1, 24]} />
        <meshStandardMaterial map={map} bumpMap={bumpMap} bumpScale={0.015} roughness={0.92} metalness={0.02} />
      </mesh>
      <mesh position={[0.62, -0.25, 0]} rotation={[0, 0, -0.04]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.5, 1.1, 24]} />
        <meshStandardMaterial map={map} bumpMap={bumpMap} bumpScale={0.015} roughness={0.92} metalness={0.02} />
      </mesh>

      {/* Drawstrings */}
      {[-0.12, 0.12].map((x, i) => (
        <mesh key={i} position={[x, 0.68, 0.66]} rotation={[0.3, 0, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.42, 8]} />
          <meshStandardMaterial color="#efe6d8" roughness={0.6} />
        </mesh>
      ))}

      {/* Front fly seam accent */}
      <mesh position={[0, 0.55, 0.66]}>
        <boxGeometry args={[0.02, 0.85, 0.01]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.35} roughness={1} />
      </mesh>

      {/* Hidden pocket cavity (dark interior) */}
      <group position={[0.55, 1.0, 0.55]}>
        <mesh position={[0, 0, -0.08]}>
          <boxGeometry args={[0.65, 0.5, 0.25]} />
          <meshStandardMaterial color="#0a0a0c" roughness={0.95} />
        </mesh>

        {/* Items that slide into the pocket */}
        {ITEMS.map((item, i) => (
          <mesh
            key={item.key}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            visible={false}
          >
            <boxGeometry args={item.size} />
            <meshStandardMaterial color={item.color} roughness={0.4} metalness={0.15} />
          </mesh>
        ))}

        {/* Flap that hinges open at the top edge */}
        <group ref={flapPivot} position={[0, 0.25, 0]}>
          <RoundedBox args={[0.68, 0.5, 0.05]} radius={0.06} smoothness={3} position={[0, -0.25, 0.1]} castShadow>
            <meshStandardMaterial map={map} bumpMap={bumpMap} bumpScale={0.015} roughness={0.92} metalness={0.02} />
          </RoundedBox>
          {/* Zipper */}
          <mesh position={[0, -0.02, 0.13]}>
            <boxGeometry args={[0.55, 0.02, 0.01]} />
            <meshStandardMaterial color="#c9a24b" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
