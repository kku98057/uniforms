import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import * as THREE from "three";
import { state } from "../store";

export default function Shirt() {
  const snap = useSnapshot(state);

  const { nodes, materials } = useGLTF("/customizer/shirt_baked.glb");
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString} scale={0.8}>
      <mesh
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <meshStandardMaterial
            side={THREE.DoubleSide}
            map={fullTexture}
            transparent={false} // 투명도를 비활성화합니다.
            depthWrite={true}
            depthTest={true}
            opacity={1} // 완전 불투명하게 설정합니다.
            blending={THREE.NormalBlending}
          />
          // <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
          // </Decal>
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
}
