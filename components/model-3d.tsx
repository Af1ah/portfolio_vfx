"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { AdaptiveDpr, BakeShadows } from "@react-three/drei"

export default function Model3D() {
  const groupRef = useRef<THREE.Group>(null)

  // Animate the model
  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
  })

  return (
    <group ref={groupRef}>
      {/* Camera model */}
      <group position={[0, 0, 0]} scale={0.5}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1, 0.8, 2]} />
          <meshStandardMaterial color="#222" roughness={0.5} metalness={0.8} />
        </mesh>

        {/* Camera lens */}
        <mesh position={[0, 0, 1.2]} castShadow>
          <cylinderGeometry args={[0.4, 0.5, 0.8, 32]} />
          <meshStandardMaterial color="#111" roughness={0.3} metalness={0.9} />
        </mesh>

        {/* Camera viewfinder */}
        <mesh position={[0, 0.6, -0.5]} castShadow>
          <boxGeometry args={[0.6, 0.4, 0.6]} />
          <meshStandardMaterial color="#333" roughness={0.5} metalness={0.7} />
        </mesh>

        {/* Camera grip */}
        <mesh position={[0.6, -0.3, 0]} castShadow>
          <boxGeometry args={[0.3, 0.6, 1]} />
          <meshStandardMaterial color="#222" roughness={0.5} metalness={0.8} />
        </mesh>
      </group>

      {/* Film reel */}
      <group position={[-2, 0, -1]} rotation={[0, Math.PI / 4, 0]} scale={0.4}>
        <mesh castShadow>
          <torusGeometry args={[1, 0.2, 16, 100]} />
          <meshStandardMaterial color="#444" roughness={0.5} metalness={0.7} />
        </mesh>
        <mesh castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="#222" roughness={0.5} metalness={0.8} />
        </mesh>
      </group>

      {/* Clapperboard */}
      <group position={[2, -0.5, -1]} rotation={[0.2, -Math.PI / 6, 0]} scale={0.4}>
        <mesh castShadow>
          <boxGeometry args={[3, 0.2, 2.5]} />
          <meshStandardMaterial color="#111" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 1.05]} castShadow>
          <boxGeometry args={[3, 0.2, 0.4]} />
          <meshStandardMaterial color="#e91e63" roughness={0.5} metalness={0.3} />
        </mesh>
      </group>

      {/* Abstract geometric elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh
          key={i}
          position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          scale={Math.random() * 0.3 + 0.1}
        >
          {i % 3 === 0 ? (
            <sphereGeometry args={[1, 16, 16]} />
          ) : i % 3 === 1 ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : (
            <tetrahedronGeometry args={[1]} />
          )}
          <meshStandardMaterial
            color={new THREE.Color().setHSL(Math.random(), 0.8, 0.5)}
            roughness={0.5}
            metalness={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Directional lights */}
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ff3e00" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#0070f3" />
      <spotLight position={[0, 5, 0]} intensity={0.8} color="#ffffff" />

      <AdaptiveDpr pixelated />
      <BakeShadows />
    </group>
  )
}

