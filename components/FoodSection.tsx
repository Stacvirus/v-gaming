'use client'

import { useEffect, useRef, useState } from 'react'
import { foodCategories } from '@/data/food'

const ICONS: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  UtensilsCrossed: ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} style={style} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 9.75a3 3 0 11-6 0 3 3 0 016 0zm4.5 4.5v5.25A2.25 2.25 0 0117.25 21H6.75A2.25 2.25 0 014.5 18.75v-5.25" />
    </svg>
  ),
  Cookie: ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} style={style} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25c-1.38 0-2.7-.35-3.83-.97M21 11.25a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm-3 4.5c0 .414-.168.75-.375.75S11.25 14.664 11.25 14.25s.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008v-.015z" />
    </svg>
  ),
  IceCream: ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} style={style} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15m-14.8-.5L12 21l6.8-6.5" />
    </svg>
  ),
  GlassWater: ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} style={style} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15m-14.8-.5V20.5a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V14m-14.8-.5H19.8M7 9h10" />
    </svg>
  ),
  Droplets: ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} style={style} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
    </svg>
  ),
  Beer: ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} style={style} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5V21h14v-6.5l-4.091-4.091A2.25 2.25 0 0114.25 8.818V3.104M9.75 3.104A24.1 24.1 0 0112 3c.75 0 1.5.035 2.25.104M9.75 3.104C9.501 3.127 9.251 3.154 9 3.186" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9h2a1 1 0 011 1v4a1 1 0 01-1 1h-2" />
    </svg>
  ),
  Wine: ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} style={style} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5V18h14v-3.5l-4.091-4.091A2.25 2.25 0 0114.25 8.818V3.104M9.75 3.104a24.1 24.1 0 012.25-.104c.75 0 1.5.035 2.25.104M9.75 3.104C9.5 3.128 9.25 3.155 9 3.186M12 18v3M9 21h6" />
    </svg>
  ),
}

export default function FoodSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<string | null>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.food-card')
    if (!cards) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="food" ref={sectionRef} className="relative py-24 md:py-32 bg-gaming-dark">
      {/* Ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-neon-gradient opacity-30" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A18] to-transparent opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-4">Restaurant &amp; Bar</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Food &amp; <span className="gradient-text">Drinks</span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-muted text-lg font-body leading-relaxed">
            Un restaurant, un bar lounge, et une boulangerie — pour satisfaire toutes vos envies
            avant, pendant et après le jeu.
          </p>
          <div className="neon-divider max-w-xs mx-auto mt-8" />
        </div>

        {/* Food category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {foodCategories.map((cat, index) => {
            const IconComp = ICONS[cat.icon] || ICONS['GlassWater']
            const isActive = activeTab === cat.id

            return (
              <article
                key={cat.id}
                className={`food-card reveal glass-card rounded-2xl p-5 cursor-pointer transition-all duration-300 ${cat.glowClass} group`}
                style={{ transitionDelay: `${index * 0.07}s` }}
                onClick={() => setActiveTab(isActive ? null : cat.id)}
                aria-expanded={isActive}
                aria-label={`${cat.name} — ${cat.description}`}
              >
                {/* Tag */}
                {cat.tag && (
                  <div className="flex justify-end mb-2">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-body font-semibold tracking-wide"
                      style={{
                        background: `${cat.accentColor}20`,
                        color: cat.accentColor,
                        border: `1px solid ${cat.accentColor}40`,
                      }}
                    >
                      {cat.tag}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200"
                  style={{
                    background: `${cat.accentColor}18`,
                    border: `1px solid ${cat.accentColor}35`,
                  }}
                >
                  <IconComp
                    className="w-6 h-6"
                    style={{ color: cat.accentColor }}
                  />
                </div>

                {/* Title */}
                <h3 className="font-heading text-base text-white mb-1 group-hover:text-neon-lavender transition-colors duration-200">
                  {cat.name}
                </h3>
                {cat.nameFr && (
                  <p className="text-xs text-text-dim font-body mb-2">{cat.nameFr}</p>
                )}
                <p className="text-text-muted text-sm font-body leading-relaxed mb-4">
                  {cat.description}
                </p>

                {/* Sample items — expands on click */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isActive ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-1 pt-2 border-t border-white/10">
                    {cat.sampleItems.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-text-muted font-body">
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: cat.accentColor }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* See more toggle */}
                <div className="mt-3 flex items-center gap-1 text-xs font-body" style={{ color: cat.accentColor }}>
                  <span>{isActive ? 'Réduire' : 'Voir le menu'}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14 reveal">
          <p className="text-text-muted font-body mb-5 text-sm">
            Menu complet disponible sur place · Livraison et réservation via WhatsApp
          </p>
          <a
            href={`https://wa.me/237698453633?text=${encodeURIComponent('Bonjour ! Je voudrais voir le menu complet de V-GAMING.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full btn-neon text-white font-body font-semibold text-sm cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Voir le Menu Complet
          </a>
        </div>
      </div>
    </section>
  )
}
