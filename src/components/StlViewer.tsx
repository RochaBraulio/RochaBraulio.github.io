
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

interface StlViewerProps {
  url?: string;
  shape?: 'cube';
  width?: number;
  height?: number;
}

export const StlViewer = ({ url, shape, width = 800, height = 500 }: StlViewerProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    let mesh: THREE.Mesh | null = null;

    // Handle STL model
    if (url) {
      const loader = new STLLoader();
      loader.load(url.trim(), (geometry) => {
        const material = new THREE.MeshStandardMaterial({ color: 'steelblue' });
        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -0.5 * Math.PI;
        scene.add(mesh);

        // Center the model
        const box = new THREE.Box3().setFromObject(mesh);
        const center = box.getCenter(new THREE.Vector3());
        mesh.position.sub(center);
      });
    }

    // Handle cube
    if (shape === 'cube') {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ color: 0x44ff44 });
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (mesh) {
        mesh.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [url, shape, width, height]);

  return (
    <div 
      ref={mountRef} 
      className="w-full overflow-x-auto bg-card rounded-lg p-4 my-8" 
      style={{ height }}
    />
  );
};

