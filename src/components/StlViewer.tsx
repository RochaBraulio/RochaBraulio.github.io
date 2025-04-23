
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface StlViewerProps {
  url?: string;
  shape?: 'cube';
  width?: number;
  height?: number;
}

function Model({ url }: { url: string }) {
  // Remove any leading/trailing whitespace that might come from markdown code blocks
  const cleanUrl = url.trim();
  
  const { scene } = useGLTF(cleanUrl);
  
  // Center the model
  const [centerOffset] = useState(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    return center.multiplyScalar(-1);
  });

  // Clone the scene to avoid reference issues
  const modelScene = scene.clone();
  modelScene.position.add(centerOffset);
  
  return <primitive object={modelScene} />;
}

function Cube() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={0x44ff44} />
    </mesh>
  );
}

export const StlViewer = ({ url, shape, width = 800, height = 500 }: StlViewerProps) => {
  return (
    <div className="w-full overflow-x-auto bg-card rounded-lg p-4 my-8" style={{ height }}>
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        {url ? <Model url={url} /> : null}
        {shape === 'cube' ? <Cube /> : null}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};
