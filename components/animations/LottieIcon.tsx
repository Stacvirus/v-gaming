'use client'

import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

interface LottieIconProps {
  animationData?: object | null
  className?: string
  loop?: boolean
  autoplay?: boolean
  ariaLabel?: string
  fallback?: React.ReactNode
}

export default function LottieIcon({
  animationData,
  className = '',
  loop = true,
  autoplay = true,
  ariaLabel,
  fallback,
}: LottieIconProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Only render if animation has actual layer content
  const hasContent =
    animationData != null &&
    typeof animationData === 'object' &&
    'layers' in animationData &&
    Array.isArray((animationData as Record<string, unknown>).layers) &&
    ((animationData as Record<string, unknown[]>).layers).length > 0

  if (!hasContent) {
    return fallback ? <>{fallback}</> : null
  }

  return (
    <div className={className} role="img" aria-label={ariaLabel}>
      <Lottie
        animationData={animationData!}
        loop={loop && !reducedMotion}
        autoplay={autoplay && !reducedMotion}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
