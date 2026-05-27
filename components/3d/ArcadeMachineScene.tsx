'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const ROSE  = '#F43F5E'
const AMBER = '#F59E0B'

function SteeringWheel({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, dt) => { if (ref.current && !reduced) ref.current.rotation.z -= dt * 0.9 })

  return (
    <group ref={ref}>
      {/* Outer rim */}
      <mesh>
        <torusGeometry args={[1.08, 0.10, 18, 80]} />
        <meshStandardMaterial
          color={ROSE}
          emissive={ROSE}
          emissiveIntensity={2.8}
          metalness={0.9}
          roughness={0.08}
        />
      </mesh>

      {/* Inner decorative ring */}
      <mesh>
        <torusGeometry args={[0.82, 0.032, 10, 64]} />
        <meshStandardMaterial
          color={ROSE}
          emissive={ROSE}
          emissiveIntensity={1.2}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* 3 spokes at 0°, 120°, 240° */}
      {[0, 120, 240].map((deg) => (
        <mesh key={deg} rotation={[0, 0, (deg * Math.PI) / 180]}>
          <boxGeometry args={[0.072, 0.9, 0.055]} />
          <meshStandardMaterial
            color={ROSE}
            emissive={ROSE}
            emissiveIntensity={2.2}
            metalness={0.9}
            roughness={0.08}
          />
        </mesh>
      ))}

      {/* Center hub disc */}
      <mesh>
        <circleGeometry args={[0.22, 36]} />
        <meshStandardMaterial
          color="#1a0510"
          emissive={ROSE}
          emissiveIntensity={4}
          metalness={1}
          roughness={0}
        />
      </mesh>
      {/* Hub ring */}
      <mesh>
        <torusGeometry args={[0.22, 0.04, 10, 36]} />
        <meshStandardMaterial
          color={AMBER}
          emissive={AMBER}
          emissiveIntensity={3}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>
    </group>
  )
}

export default function ArcadeMachineScene({ className = 'w-full h-44' }: { className?: string }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className={className} aria-label="Car simulator steering wheel 3D visualization">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 44 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[2.5, 2, 4]} intensity={6} color={ROSE} />
        <pointLight position={[-2, -1.5, 3]} intensity={3.5} color={AMBER} />
        <pointLight position={[0, 0, 6]} intensity={1.5} color="#ffffff" />

        {reduced ? (
          <SteeringWheel reduced={reduced} />
        ) : (
          <Float speed={1.6} rotationIntensity={0} floatIntensity={0.4}>
            <SteeringWheel reduced={reduced} />
          </Float>
        )}
      </Canvas>
    </div>
  )
}
