'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Goggles() {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.55 })

  return (
    <group ref={ref}>
      {/* Main headset body */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[2.4, 0.8, 0.22]} />
        <meshStandardMaterial
          color="#07071a"
          metalness={0.95}
          roughness={0.05}
          emissive="#7C3AED"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Left lens — purple torus ring */}
      <mesh position={[-0.65, 0, 0.05]}>
        <torusGeometry args={[0.36, 0.072, 18, 56]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={4}
          metalness={0.7}
          roughness={0.1}
        />
      </mesh>
      {/* Left lens face glow */}
      <mesh position={[-0.65, 0, 0.14]}>
        <circleGeometry args={[0.295, 40]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={1.4}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Right lens — cyan torus ring */}
      <mesh position={[0.65, 0, 0.05]}>
        <torusGeometry args={[0.36, 0.072, 18, 56]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={4}
          metalness={0.7}
          roughness={0.1}
        />
      </mesh>
      {/* Right lens face glow */}
      <mesh position={[0.65, 0, 0.14]}>
        <circleGeometry args={[0.295, 40]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={1.4}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Nose bridge */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.26, 0.14, 0.1]} />
        <meshStandardMaterial
          color="#07071a"
          metalness={0.95}
          roughness={0.05}
          emissive="#7C3AED"
          emissiveIntensity={0.7}
        />
      </mesh>

      {/* Left ear bracket */}
      <mesh position={[-1.22, 0, -0.08]}>
        <boxGeometry args={[0.14, 0.58, 0.2]} />
        <meshStandardMaterial
          color="#07071a"
          metalness={0.9}
          roughness={0.1}
          emissive="#7C3AED"
          emissiveIntensity={0.35}
        />
      </mesh>
      {/* Right ear bracket */}
      <mesh position={[1.22, 0, -0.08]}>
        <boxGeometry args={[0.14, 0.58, 0.2]} />
        <meshStandardMaterial
          color="#07071a"
          metalness={0.9}
          roughness={0.1}
          emissive="#06B6D4"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Top trim edge light */}
      <mesh position={[0, 0.41, -0.05]}>
        <boxGeometry args={[2.1, 0.04, 0.06]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={3}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Bottom trim edge light */}
      <mesh position={[0, -0.41, -0.05]}>
        <boxGeometry args={[2.1, 0.04, 0.06]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

export default function VRHeadsetScene({ className = 'w-full h-44' }: { className?: string }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className={className} aria-label="VR headset 3D visualization">
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[-2.5, 1.5, 3]} intensity={5} color="#7C3AED" />
        <pointLight position={[2.5, 1.5, 3]} intensity={5} color="#06B6D4" />
        <pointLight position={[0, -2, 2]} intensity={2} color="#EC4899" />

        {reduced ? (
          <Goggles />
        ) : (
          <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
            <Goggles />
          </Float>
        )}
      </Canvas>
    </div>
  )
}
