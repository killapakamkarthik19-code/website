"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function StylizedSofa({
  wireframe = false,
  color = "#D9673F",
  woodColor = "#3E2723",
}: {
  wireframe?: boolean;
  color?: string;
  woodColor?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 0.8;
      const y = (e.clientY / innerHeight - 0.5) * 0.4;
      targetRotation.current = { x: y, y: x };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Smooth lerp to mouse rotation + slow natural breathing orbit
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y + Math.sin(state.clock.elapsedTime * 0.5) * 0.1,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x * 0.5,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[1.1, 1.1, 1.1]}>
      {/* --- SEAT CUSHIONS --- */}
      {/* Left seat cushion */}
      <RoundedBox
        args={[1.3, 0.4, 1.4]}
        radius={0.12}
        smoothness={4}
        position={[-0.68, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.65}
          metalness={0.08}
          wireframe={wireframe}
        />
      </RoundedBox>

      {/* Right seat cushion */}
      <RoundedBox
        args={[1.3, 0.4, 1.4]}
        radius={0.12}
        smoothness={4}
        position={[0.68, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.65}
          metalness={0.08}
          wireframe={wireframe}
        />
      </RoundedBox>

      {/* Center bolster stitch */}
      <RoundedBox
        args={[0.06, 0.42, 1.38]}
        radius={0.02}
        position={[0, 0.02, 0]}
      >
        <meshStandardMaterial color="#A84824" roughness={0.9} />
      </RoundedBox>

      {/* --- BACKREST CUSHIONS --- */}
      {/* Left backrest */}
      <RoundedBox
        args={[1.3, 0.95, 0.38]}
        radius={0.12}
        smoothness={4}
        position={[-0.68, 0.62, -0.6]}
        rotation={[-0.08, 0, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.65}
          metalness={0.08}
          wireframe={wireframe}
        />
      </RoundedBox>

      {/* Right backrest */}
      <RoundedBox
        args={[1.3, 0.95, 0.38]}
        radius={0.12}
        smoothness={4}
        position={[0.68, 0.62, -0.6]}
        rotation={[-0.08, 0, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.65}
          metalness={0.08}
          wireframe={wireframe}
        />
      </RoundedBox>

      {/* --- ARMRESTS --- */}
      {/* Left armrest */}
      <RoundedBox
        args={[0.38, 0.72, 1.7]}
        radius={0.14}
        smoothness={4}
        position={[-1.52, 0.32, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          metalness={0.05}
          wireframe={wireframe}
        />
      </RoundedBox>

      {/* Right armrest */}
      <RoundedBox
        args={[0.38, 0.72, 1.7]}
        radius={0.14}
        smoothness={4}
        position={[1.52, 0.32, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          metalness={0.05}
          wireframe={wireframe}
        />
      </RoundedBox>

      {/* --- SOLID TEAK BASE PLATFORM --- */}
      <RoundedBox
        args={[3.2, 0.16, 1.7]}
        radius={0.04}
        position={[0, -0.28, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color={woodColor}
          roughness={0.4}
          metalness={0.1}
          wireframe={wireframe}
        />
      </RoundedBox>

      {/* --- TURNED CYLINDRICAL LEGS WITH BRASS TIPS --- */}
      {[
        [-1.4, -0.5, 0.65],
        [1.4, -0.5, 0.65],
        [-1.4, -0.5, -0.65],
        [1.4, -0.5, -0.65],
      ].map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]} rotation={[0.08 * (z > 0 ? 1 : -1), 0, 0.08 * (x > 0 ? 1 : -1)]}>
          {/* Wooden leg */}
          <cylinderGeometry args={[0.05, 0.035, 0.36, 16]} />
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.05, 0.04, 0.3, 16]} />
            <meshStandardMaterial color={woodColor} roughness={0.3} />
          </mesh>
          {/* Brass tip */}
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.038, 0.032, 0.08, 16]} />
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* Ground contact shadow mesh */}
      <mesh position={[0, -0.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.8, 2.2]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function SofaScene({
  sofaColor = "#D9673F",
}: {
  sofaColor?: string;
}) {
  const [wireframe, setWireframe] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-[var(--accent-terracotta)] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[420px] md:h-[560px] lg:h-[640px]">
      <Canvas
        camera={{ position: [0, 1.2, 4.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Soft Studio Lighting */}
        <ambientLight intensity={0.9} />
        {/* Warm key light */}
        <directionalLight
          position={[4, 5, 4]}
          intensity={1.8}
          color="#FFF5E8"
          castShadow
        />
        {/* Cool fill light */}
        <directionalLight
          position={[-4, 3, -2]}
          intensity={0.6}
          color="#E8EFFF"
        />
        {/* Terracotta rim light */}
        <pointLight
          position={[0, -1, -3]}
          intensity={1.2}
          color="#D9673F"
        />

        <Float
          speed={1.5}
          rotationIntensity={0.2}
          floatIntensity={0.3}
          floatingRange={[-0.05, 0.05]}
        >
          <StylizedSofa wireframe={wireframe} color={sofaColor} />
        </Float>
      </Canvas>

      {/* Floating 3D Interaction Badge */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-3">
        <button
          onClick={() => setWireframe(!wireframe)}
          className="px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase glass-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-terracotta)] transition-all cursor-pointer shadow-md"
        >
          {wireframe ? "Solid Mesh" : "Wireframe 3D"}
        </button>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sage)] animate-pulse" />
          Interactive 3D · Rotate with Mouse
        </div>
      </div>
    </div>
  );
}
