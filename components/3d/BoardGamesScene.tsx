'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const AMBER = '#F59E0B'
const GOLD  = '#FCD34D'

// Dot positions for a d6 face
const FACE_DOTS: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-0.22, 0.22], [0.22, -0.22]],
  3: [[-0.22, 0.22], [0, 0], [0.22, -0.22]],
  4: [[-0.22, 0.22], [0.22, 0.22], [-0.22, -0.22], [0.22, -0.22]],
  5: [[-0.22, 0.22], [0.22, 0.22], [0, 0], [-0.22, -0.22], [0.22, -0.22]],
  6: [[-0.22, 0.22], [0.22, 0.22], [-0.22, 0], [0.22, 0], [-0.22, -0.22], [0.22, -0.22]],
}

function Dot({ x, y, z, nx, ny, nz }: { x: number; y: number; z: number; nx: number; ny: number; nz: number }) {
  return (
    <mesh position={[x + nx * 0.01, y + ny * 0.01, z + nz * 0.01]}>
      <sphereGeometry args={[0.085, 10, 10]} />
      <meshStandardMaterial color="#1a0d00" emissive="#1a0d00" emissiveIntensity={0.5} />
    </mesh>
  )
}

function Die({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((_, dt) => {
    if (ref.current && !reduced) {
      ref.current.rotation.y += dt * 0.9
      ref.current.rotation.x += dt * 0.4
    }
  })

  const S = 0.62 // half-size of cube face (cube total = 1.24)

  return (
    <group ref={ref}>
      {/* Die body */}
      <mesh>
        <boxGeometry args={[S * 2, S * 2, S * 2]} />
        <meshStandardMaterial
          color="#1a0d00"
          emissive={AMBER}
          emissiveIntensity={0.45}
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>

      {/* Neon edge wireframe — 12 edges as thin boxes */}
      {/* Front/Back horizontal edges */}
      {[-S, S].flatMap((z) => [-S, S].map((y) => (
        <mesh key={`h-${z}-${y}`} position={[0, y, z]}>
          <boxGeometry args={[S * 2, 0.04, 0.04]} />
          <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={4} />
        </mesh>
      )))}
      {/* Front/Back vertical edges */}
      {[-S, S].flatMap((z) => [-S, S].map((x) => (
        <mesh key={`v-${z}-${x}`} position={[x, 0, z]}>
          <boxGeometry args={[0.04, S * 2, 0.04]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={4} />
        </mesh>
      )))}
      {/* Depth edges */}
      {[-S, S].flatMap((x) => [-S, S].map((y) => (
        <mesh key={`d-${x}-${y}`} position={[x, y, 0]}>
          <boxGeometry args={[0.04, 0.04, S * 2]} />
          <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={4} />
        </mesh>
      )))}

      {/* Dots — front face (1) */}
      {FACE_DOTS[1].map(([x, y], i) => <Dot key={i} x={x * S} y={y * S} z={S} nx={0} ny={0} nz={1} />)}
      {/* Back face (6) */}
      {FACE_DOTS[6].map(([x, y], i) => <Dot key={i} x={x * S} y={y * S} z={-S} nx={0} ny={0} nz={-1} />)}
      {/* Top face (2) */}
      {FACE_DOTS[2].map(([x, y], i) => <Dot key={i} x={x * S} y={S} z={y * S} nx={0} ny={1} nz={0} />)}
      {/* Bottom face (5) */}
      {FACE_DOTS[5].map(([x, y], i) => <Dot key={i} x={x * S} y={-S} z={-y * S} nx={0} ny={-1} nz={0} />)}
      {/* Right face (3) */}
      {FACE_DOTS[3].map(([x, y], i) => <Dot key={i} x={S} y={y * S} z={-x * S} nx={1} ny={0} nz={0} />)}
      {/* Left face (4) */}
      {FACE_DOTS[4].map(([x, y], i) => <Dot key={i} x={-S} y={y * S} z={x * S} nx={-1} ny={0} nz={0} />)}
    </group>
  )
}

export default function BoardGamesScene({ className = 'w-full h-44' }: { className?: string }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className={className} aria-label="Board games dice 3D visualization">
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2.5, 4]} intensity={6} color={AMBER} />
        <pointLight position={[-2, -1, 3]} intensity={3} color="#F43F5E" />
        <pointLight position={[0, 3, 2]} intensity={2} color="#ffffff" />

        {reduced ? (
          <Die reduced={reduced} />
        ) : (
          <Float speed={1.6} rotationIntensity={0} floatIntensity={0.45}>
            <Die reduced={reduced} />
          </Float>
        )}
      </Canvas>
    </div>
  )
}
