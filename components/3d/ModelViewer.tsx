'use client'

import React, { Component, Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls, useGLTF } from '@react-three/drei'

interface ModelViewerProps {
  modelPath: string
  scale?: number
  cameraPosition?: [number, number, number]
  enableOrbit?: boolean
  className?: string
  label?: string
  accentColor?: string
}

function FallbackGeometry({ color = '#7C3AED' }: { color?: string }) {
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.5}>
      <mesh>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={0.4} />
      </mesh>
    </Float>
  )
}

class R3FErrorBoundary extends Component<
  { children: React.ReactNode; color?: string },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; color?: string }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(e: Error) { console.warn('[ModelViewer] GLB load failed:', e.message) }
  render() {
    return this.state.hasError
      ? <FallbackGeometry color={this.props.color} />
      : this.props.children
  }
}

class DOMErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

function ModelMesh({
  modelPath,
  scale,
  reducedMotion,
}: {
  modelPath: string
  scale: number
  reducedMotion: boolean
}) {
  const gltf = useGLTF(modelPath)
  if (reducedMotion) {
    return <primitive object={gltf.scene} scale={scale} />
  }
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.4}>
      <primitive object={gltf.scene} scale={scale} />
    </Float>
  )
}

type ModelStatus = 'pending' | 'ok' | 'missing'

export default function ModelViewer({
  modelPath,
  scale = 1,
  cameraPosition = [0, 0, 4],
  enableOrbit = false,
  className = '',
  label = '3D model',
  accentColor = '#7C3AED',
}: ModelViewerProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [modelStatus, setModelStatus] = useState<ModelStatus>('pending')

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Pre-flight HEAD check so useGLTF never fires on a 404 (which escapes error boundaries)
  useEffect(() => {
    let cancelled = false
    fetch(modelPath, { method: 'HEAD' })
      .then(r => { if (!cancelled) setModelStatus(r.ok ? 'ok' : 'missing') })
      .catch(() => { if (!cancelled) setModelStatus('missing') })
    return () => { cancelled = true }
  }, [modelPath])

  const domFallback = (
    <div
      className={`${className} flex items-center justify-center rounded-2xl`}
      style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}35` }}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" className="w-10 h-10 opacity-60" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    </div>
  )

  if (modelStatus === 'missing') return domFallback

  if (modelStatus === 'pending') {
    return (
      <div
        className={`${className} rounded-2xl animate-pulse`}
        style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}25` }}
        role="img"
        aria-label={`Loading ${label}`}
      />
    )
  }

  return (
    <DOMErrorBoundary fallback={domFallback}>
      <div className={className} role="img" aria-label={label}>
        <Canvas
          camera={{ position: cameraPosition, fov: 45 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          {/* Self-contained lighting — no remote HDR fetch */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[4, 6, 4]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[-4, 2, -4]} intensity={1.2} color={accentColor} />
          <pointLight position={[0, -3, 2]} intensity={0.8} color="#06B6D4" />
          <hemisphereLight args={['#1a1040', '#000000', 0.6]} />

          {enableOrbit && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={!reducedMotion}
              autoRotateSpeed={2}
            />
          )}
          <Suspense fallback={null}>
            <R3FErrorBoundary color={accentColor}>
              <ModelMesh modelPath={modelPath} scale={scale} reducedMotion={reducedMotion} />
            </R3FErrorBoundary>
          </Suspense>
        </Canvas>
      </div>
    </DOMErrorBoundary>
  )
}
