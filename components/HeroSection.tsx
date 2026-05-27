'use client'

import { useEffect, useRef } from 'react'
import DynamicHeroSpline from '@/components/3d/DynamicHeroSpline'
import { HERO_SPLINE_URL } from '@/data/assets'

const WA_NUMBER = '237698453633'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Bonjour V-GAMING ! Je souhaite réserver une expérience.')}`

const FLOATING_BADGES = [
  { label: 'Virtual Reality', color: 'bg-neon-purple/20 border-neon-purple/40 text-neon-lavender', top: '20%', left: '5%', delay: '0s', icon: '🥽' },
  { label: 'Car Simulator', color: 'bg-neon-rose/20 border-neon-rose/40 text-red-300', top: '65%', left: '3%', delay: '1.5s', icon: '🏎️' },
  { label: 'Swimming Pool', color: 'bg-neon-cyan/20 border-neon-cyan/40 text-cyan-300', top: '25%', right: '4%', delay: '0.8s', icon: '🌊' },
  { label: 'Restaurant & Bar', color: 'bg-neon-amber/20 border-neon-amber/40 text-amber-300', top: '70%', right: '3%', delay: '2s', icon: '🍽️' },
]

export default function HeroSection() {
  const heroRef    = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero    = heroRef.current
    const content = contentRef.current
    if (!hero) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Existing orb parallax
      const xPct = (clientX / innerWidth - 0.5) * 20
      const yPct = (clientY / innerHeight - 0.5) * 10
      hero.style.setProperty('--mx', `${xPct}px`)
      hero.style.setProperty('--my', `${yPct}px`)

      // 3D perspective tilt on the content block
      if (content && !reduced) {
        const rotX = ((clientY / innerHeight) - 0.5) * -7   // top edge tilts toward viewer
        const rotY = ((clientX / innerWidth)  - 0.5) *  7
        content.style.transform = `perspective(1400px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
      }
    }

    const onMouseLeave = () => {
      if (content) content.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)'
    }

    window.addEventListener('mousemove',  onMouseMove,  { passive: true })
    hero.addEventListener('mouseleave', onMouseLeave)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  const scrollToActivities = () => {
    document.querySelector('#activities')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid scanlines"
      style={{ '--mx': '0px', '--my': '0px' } as React.CSSProperties}
    >
      {/* Spline 3D hero background — only renders when NEXT_PUBLIC_SPLINE_HERO_SCENE_URL is set */}
      {HERO_SPLINE_URL && (
        <>
          <DynamicHeroSpline
            sceneUrl={HERO_SPLINE_URL}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />
          {/* Gradient overlay to preserve text contrast over Spline scene */}
          <div className="absolute inset-0 bg-gradient-to-b from-gaming-dark/60 via-gaming-dark/30 to-gaming-dark/70 pointer-events-none z-0" />
        </>
      )}

      {/* Radial orb overlays */}
      <div className="absolute inset-0 bg-hero-orbs pointer-events-none" />

      {/* Floating neon orbs (decorative) */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-neon-purple/10 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 md:w-80 md:h-80 rounded-full bg-neon-cyan/8 blur-3xl animate-float-delayed pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-neon-pink/10 blur-3xl animate-float-slow pointer-events-none" />

      {/* Floating activity badges */}
      {FLOATING_BADGES.map((badge) => (
        <div
          key={badge.label}
          className={`
            absolute hidden md:flex items-center gap-2 px-3 py-2 rounded-full
            glass border text-xs font-body font-medium
            ${badge.color}
            animate-float pointer-events-none select-none
          `}
          style={{
            top: badge.top,
            left: badge.left,
            right: badge.right,
            animationDelay: badge.delay,
          }}
          aria-hidden="true"
        >
          <span>{badge.icon}</span>
          <span>{badge.label}</span>
        </div>
      ))}

      {/* Main content — 3D tilt driven by mousemove */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 pb-12"
        style={{ transition: 'transform 0.12s ease-out', willChange: 'transform' }}
      >
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-neon-purple/30 mb-8">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-neon" />
          <span className="section-label text-[11px]">
            Bastos, Yaoundé — Espace de Divertissement, Sport &amp; Détente
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 tracking-tight">
          <span className="gradient-text">Yaoundé&apos;s</span>
          <br />
          <span className="text-white neon-text">Ultimate Gaming</span>
          <br />
          <span className="gradient-text-alt">&amp; Leisure Experience</span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-text-muted text-lg sm:text-xl font-body leading-relaxed mb-10">
          Réalité virtuelle · Simulateur auto · Billard · Baby-foot · Ping-pong ·
          Jeux de société · Piscine · Restaurant &amp; Bar — tout en un seul lieu à Bastos.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full btn-neon text-white font-body font-semibold text-base tracking-wide cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-lavender"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Réservez via WhatsApp
          </a>

          <button
            onClick={scrollToActivities}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-outline-neon font-body font-semibold text-base tracking-wide cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple"
          >
            Explorer les Activités
          </button>

          <a
            href="tel:+237698453633"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full glass border border-white/10 text-text-muted hover:text-white font-body text-base transition-all duration-200 cursor-pointer hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            +237 698 453 633
          </a>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[
            { value: '8+', label: 'Activities' },
            { value: '7/7', label: 'Open Days' },
            { value: '500+', label: 'Happy Visitors' },
            { value: '1', label: 'Epic Venue' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-heading text-2xl md:text-3xl gradient-text">{stat.value}</span>
              <span className="text-text-dim text-xs font-body tracking-widest uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-text-dim text-xs font-body tracking-widest uppercase">Scroll</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-neon-purple" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  )
}
