import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import { useSnapshot } from "valtio";
import { state } from "../store";

export default function Backdrop() {
  const shadows = useRef();
  const snap = useSnapshot(state);
  return (
    <AccumulativeShadows
      position={[0, 0, -0.14]}
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.2}
      rotation={[Math.PI / 2, 0, 0]}
      color={snap.color}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}
