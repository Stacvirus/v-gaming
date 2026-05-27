'use client'

import { useEffect, useRef } from 'react'
import { events } from '@/data/events'

const WA_NUMBER = '237698453633'

const ICONS: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  Trophy: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
    </svg>
  ),
  PartyPopper: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  Heart: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  Users: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  Briefcase: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  ),
}

const TYPE_COLORS: Record<string, string> = {
  tournament: '#F59E0B',
  birthday: '#EC4899',
  family: '#06B6D4',
  group: '#3B82F6',
  corporate: '#7C3AED',
}

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.event-card')
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
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="events" ref={sectionRef} className="relative py-24 md:py-32 bg-gaming-dark">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-neon-gradient opacity-20" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-4">Private & Group</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Events &amp; <span className="gradient-text">Celebrations</span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-muted text-lg font-body leading-relaxed">
            Organisez vos tournois, anniversaires, journées famille ou événements corporate
            dans notre espace unique. Chaque événement est une expérience sur mesure.
          </p>
          <p className="mt-3 text-text-dim text-xs font-body italic">
            * Exemples d&apos;événements — contactez-nous pour créer le vôtre
          </p>
          <div className="neon-divider max-w-xs mx-auto mt-8" />
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => {
            const IconComp = ICONS[event.icon] || ICONS['Trophy']
            const color = TYPE_COLORS[event.type] || '#7C3AED'
            const waMsg = encodeURIComponent(`Bonjour V-GAMING ! Je souhaite organiser : ${event.title}. Pouvez-vous me donner les détails et disponibilités ?`)

            return (
              <article
                key={event.id}
                className={`event-card reveal glass-card rounded-2xl p-6 transition-all duration-300 ${event.glowClass} group`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                    style={{ background: `${color}18`, border: `1px solid ${color}35` }}
                  >
                    <IconComp className="w-6 h-6" style={{ color } as React.CSSProperties} />
                  </div>
                  {event.badge && (
                    <span
                      className="px-3 py-1 rounded-full text-xs font-body font-semibold tracking-wide"
                      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
                    >
                      {event.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl text-white mb-1 group-hover:text-neon-lavender transition-colors duration-200">
                  {event.title}
                </h3>
                {event.titleFr && (
                  <p className="text-xs text-text-dim font-body mb-3">{event.titleFr}</p>
                )}
                <p className="text-text-muted text-sm font-body leading-relaxed mb-5">
                  {event.description}
                </p>

                {/* Meta info */}
                <div className="space-y-2 mb-6">
                  {event.capacity && (
                    <div className="flex items-center gap-2 text-xs text-text-dim font-body">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                      <span>{event.capacity}</span>
                    </div>
                  )}
                  {event.highlight && (
                    <div className="flex items-center gap-2 text-xs font-body" style={{ color }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.highlight}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-body font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2"
                  style={{
                    background: `${color}18`,
                    color,
                    border: `1px solid ${color}35`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${color}30`
                    e.currentTarget.style.boxShadow = `0 0 20px ${color}30`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${color}18`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {event.cta || 'Nous contacter'}
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
