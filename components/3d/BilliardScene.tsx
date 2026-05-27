'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const CYAN   = '#06B6D4'
const PURPLE = '#7C3AED'
const AMBER  = '#F59E0B'

function BilliardSetup({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((_, dt) => {
    if (ref.current && !reduced) ref.current.rotation.y += dt * 0.45
  })

  return (
    <group ref={ref} rotation={[0.22, 0.15, 0]}>

      {/* ── 8-ball (main, center) ─────────────────────────── */}
      <group position={[0.08, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.46, 30, 30]} />
          <meshStandardMaterial
            color="#080810"
            emissive={CYAN}
            emissiveIntensity={0.22}
            metalness={0.85}
            roughness={0.12}
          />
        </mesh>
        {/* White circle on front face */}
        <mesh position={[0, 0, 0.44]}>
          <circleGeometry args={[0.21, 28]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* ── Cue ball (white, left-front) ──────────────────── */}
      <mesh position={[-0.88, -0.18, 0.52]}>
        <sphereGeometry args={[0.34, 26, 26]} />
        <meshStandardMaterial
          color="#f4f4ff"
          emissive="#aaccff"
          emissiveIntensity={0.6}
          metalness={0.65}
          roughness={0.18}
        />
      </mesh>

      {/* ── Cyan solid ball (right) ───────────────────────── */}
      <group position={[0.88, 0.14, -0.08]}>
        <mesh>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={2.2}
            metalness={0.7}
            roughness={0.15}
          />
        </mesh>
        {/* White stripe band */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.09, 8, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} transparent opacity={0.55} />
        </mesh>
      </group>

      {/* ── Purple solid ball (back) ──────────────────────── */}
      <mesh position={[-0.28, 0.58, -0.38]}>
        <sphereGeometry args={[0.27, 22, 22]} />
        <meshStandardMaterial
          color={PURPLE}
          emissive={PURPLE}
          emissiveIntensity={2.5}
          metalness={0.7}
          roughness={0.15}
        />
      </mesh>

      {/* ── Cue stick ────────────────────────────────────── */}
      <mesh position={[-1.55, 0.28, 0.62]} rotation={[0.14, -0.28, 0.52]}>
        {/* Tip (narrow) to butt (wider) — taper via cone-like cylinder */}
        <cylinderGeometry args={[0.018, 0.042, 3.0, 8]} />
        <meshStandardMaterial
          color="#b8860b"
          emissive={AMBER}
          emissiveIntensity={0.7}
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>
      {/* Cue tip (bright white/blue) */}
      <mesh position={[-0.42, 0.08, 1.05]} rotation={[0.14, -0.28, 0.52]}>
        <cylinderGeometry args={[0.022, 0.022, 0.08, 8]} />
        <meshStandardMaterial color="#aaddff" emissive="#06B6D4" emissiveIntensity={3} />
      </mesh>

    </group>
  )
}

export default function BilliardScene({ className = 'w-full h-44' }: { className?: string }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className={className} aria-label="Billiards 3D visualization">
      <Canvas
        camera={{ position: [0, 0.4, 4.0], fov: 44 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[-2, 2, 4]} intensity={5} color={CYAN} />
        <pointLight position={[2, -1, 3]} intensity={3.5} color={PURPLE} />
        <pointLight position={[0, 3, 2]} intensity={2} color="#ffffff" />

        {reduced ? (
          <BilliardSetup reduced={reduced} />
        ) : (
          <Float speed={1.6} rotationIntensity={0} floatIntensity={0.4}>
            <BilliardSetup reduced={reduced} />
          </Float>
        )}
      </Canvas>
    </div>
  )
}
