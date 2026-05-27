'use client'

import React, { Component, useState } from 'react'
import Spline from '@splinetool/react-spline'

interface HeroSplineSceneProps {
  sceneUrl: string
  className?: string
}

class SplineErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(e: Error) { console.warn('[HeroSpline] Scene failed:', e.message) }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

export default function HeroSplineScene({ sceneUrl, className = '' }: HeroSplineSceneProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (!sceneUrl || error) return null

  return (
    <div className={`${className} relative`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gaming-dark/80 animate-pulse" aria-hidden="true" />
      )}
      <SplineErrorBoundary fallback={null}>
        <Spline
          scene={sceneUrl}
          onLoad={() => setLoaded(true)}
          className="w-full h-full"
          style={{ background: 'transparent' }}
        />
      </SplineErrorBoundary>
    </div>
  )
}
