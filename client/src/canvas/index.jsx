import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Center, Html, OrbitControls } from "@react-three/drei";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { downloadState } from "../store";

export default function CanvasModel() {
  const downloadSnap = useSnapshot(downloadState);

  const canvasRef = useRef(null);
  const captureHandler = () => {
    if (canvasRef.current) {
      const myImg = canvasRef.current.toDataURL();
      const link = document.createElement("a");
      link.href = myImg;
      link.download = "my_image";
      link.click();
    }
    downloadState.shouldDownload = false;
  };
  const isMobile = window.innerWidth < 768; // Assuming 768px as the breakpoint

  const cameraProps = isMobile
    ? { position: [0, 0, 1], fov: 60 }
    : { position: [0, 0, 0.5], fov: 75 };
  useEffect(() => {
    if (downloadSnap.shouldDownload) {
      captureHandler();
    }
  }, [downloadSnap.shouldDownload]);

  return (
    <Canvas
      camera={cameraProps}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
      ref={canvasRef}
    >
      <ambientLight intensity={1.5} />
      <directionalLight intensity={1.5} />

      {/* <Environment preset="city" /> */}
      {/* <CameraRig> */}
      {/* <Backdrop /> */}
      <Center>
        <Shirt />
      </Center>
      {/* </CameraRig> */}

      <OrbitControls
        makeDefault
        minDistance={0.3}
        maxDistance={1.5}
        enableDamping={true}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
