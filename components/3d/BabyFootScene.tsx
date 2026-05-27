'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const BLUE  = '#3B82F6'
const BLUE2 = '#60A5FA'

// A single foosball rod (horizontal cylinder) with player figures that spin around it
function Rod({
  rodRef,
  y,
  xPositions,
  color,
  speed,
}: {
  rodRef: React.RefObject<THREE.Group | null>
  y: number
  xPositions: number[]
  color: string
  speed: number
}) {
  useFrame((_, dt) => {
    if (rodRef.current) rodRef.current.rotation.x += dt * speed
  })

  return (
    <group ref={rodRef} position={[0, y, 0]}>
      {/* Horizontal shaft — cylinder rotated 90° on Z to lie along X axis */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 3.0, 10]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Player figures hanging below the rod */}
      {xPositions.map((x, i) => (
        <group key={i} position={[x, -0.28, 0]}>
          {/* Body */}
          <mesh>
            <boxGeometry args={[0.16, 0.34, 0.10]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={2.2}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
          {/* Head */}
          <mesh position={[0, 0.24, 0]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={3}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function FoosTable({ reduced }: { reduced: boolean }) {
  const rod1 = useRef<THREE.Group>(null)
  const rod2 = useRef<THREE.Group>(null)

  return (
    <group rotation={[0.25, 0.3, 0]}>
      <Rod rodRef={rod1} y={0.62} xPositions={[-0.72, 0, 0.72]} color={BLUE} speed={reduced ? 0 : 2.0} />
      <Rod rodRef={rod2} y={-0.38} xPositions={[-0.5, 0.5]} color={BLUE2} speed={reduced ? 0 : -1.5} />

      {/* Ball */}
      <mesh position={[0.15, -0.05, 0.2]}>
        <sphereGeometry args={[0.1, 14, 14]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#aaccff"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  )
}

export default function BabyFootScene({ className = 'w-full h-44' }: { className?: string }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className={className} aria-label="Foosball 3D visualization">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 44 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[-2, 2, 4]} intensity={5} color={BLUE} />
        <pointLight position={[2, -1, 3]} intensity={3} color="#06B6D4" />
        <pointLight position={[0, 0, 6]} intensity={1.5} color="#ffffff" />

        {reduced ? (
          <FoosTable reduced={reduced} />
        ) : (
          <Float speed={1.8} rotationIntensity={0} floatIntensity={0.4}>
            <FoosTable reduced={reduced} />
          </Float>
        )}
      </Canvas>
    </div>
  )
}
