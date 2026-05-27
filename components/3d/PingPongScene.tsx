'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const PINK = '#EC4899'
const PINK2 = '#F472B6'

function Paddle({ reduced }: { reduced: boolean }) {
  const paddleRef = useRef<THREE.Group>(null)
  const ballRef   = useRef<THREE.Mesh>(null)
  const t = useRef(0)

  useFrame((_, dt) => {
    t.current += dt
    // Subtle paddle sway
    if (paddleRef.current && !reduced) {
      paddleRef.current.rotation.z = Math.sin(t.current * 1.2) * 0.18
      paddleRef.current.rotation.y = Math.sin(t.current * 0.7) * 0.22
    }
    // Ball bounce along Y
    if (ballRef.current && !reduced) {
      const bounce = Math.abs(Math.sin(t.current * 3.0))
      ballRef.current.position.y = -1.2 + bounce * 1.6
      ballRef.current.position.x = Math.sin(t.current * 1.8) * 0.4
    }
  })

  return (
    <group>
      {/* Paddle group */}
      <group ref={paddleRef} position={[0, 0.3, 0]}>
        {/* Circular head — flat cylinder rotated to face viewer */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.72, 0.72, 0.10, 40]} />
          <meshStandardMaterial
            color={PINK}
            emissive={PINK}
            emissiveIntensity={1.8}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>

        {/* Paddle rim ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.72, 0.055, 10, 48]} />
          <meshStandardMaterial
            color={PINK2}
            emissive={PINK2}
            emissiveIntensity={3.5}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Center cross decoration */}
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[1.1, 0.07, 0.02]} />
          <meshStandardMaterial color={PINK2} emissive={PINK2} emissiveIntensity={2} transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[0.07, 1.1, 0.02]} />
          <meshStandardMaterial color={PINK2} emissive={PINK2} emissiveIntensity={2} transparent opacity={0.7} />
        </mesh>

        {/* Handle */}
        <mesh position={[0, -1.0, -0.01]}>
          <boxGeometry args={[0.24, 0.62, 0.10]} />
          <meshStandardMaterial
            color="#1a0815"
            emissive={PINK}
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Handle grip wrap lines */}
        {[-0.24, 0, 0.24].map((yOff, i) => (
          <mesh key={i} position={[0, -1.0 + yOff, 0.06]}>
            <boxGeometry args={[0.26, 0.045, 0.02]} />
            <meshStandardMaterial color={PINK} emissive={PINK} emissiveIntensity={2} transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* Bouncing ball */}
      <mesh ref={ballRef} position={[0, -0.4, 0.5]}>
        <sphereGeometry args={[0.13, 18, 18]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffccee"
          emissiveIntensity={2.5}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}

export default function PingPongScene({ className = 'w-full h-44' }: { className?: string }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className={className} aria-label="Ping-pong paddle 3D visualization">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 44 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[-2, 2, 4]} intensity={5} color={PINK} />
        <pointLight position={[2, -1, 3]} intensity={3} color="#7C3AED" />
        <pointLight position={[0, 3, 3]} intensity={2} color="#ffffff" />

        {reduced ? (
          <Paddle reduced={reduced} />
        ) : (
          <Float speed={1.4} rotationIntensity={0} floatIntensity={0.35}>
            <Paddle reduced={reduced} />
          </Float>
        )}
      </Canvas>
    </div>
  )
}
