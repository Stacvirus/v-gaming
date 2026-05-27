'use client'

import { useEffect, useState } from 'react'
import LottieIcon from './LottieIcon'
import { LOTTIE_URLS, type LottieKey } from '@/data/assets'

interface AnimatedActivityIconProps {
  iconKey?: LottieKey
  fallback?: React.ReactNode
  className?: string
  ariaLabel?: string
}

export default function AnimatedActivityIcon({
  iconKey,
  fallback,
  className = 'w-full h-full',
  ariaLabel,
}: AnimatedActivityIconProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    if (!iconKey) return
    const url = LOTTIE_URLS[iconKey]
    if (!url) return

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data: object) => setAnimationData(data))
      .catch(() => {
        // Silently fall back to SVG fallback icon
      })
  }, [iconKey])

  return (
    <LottieIcon
      animationData={animationData}
      className={className}
      ariaLabel={ariaLabel}
      fallback={fallback}
      loop
      autoplay
    />
  )
}
