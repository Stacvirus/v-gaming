'use client'

import { useEffect, useRef } from 'react'
import { activities } from '@/data/activities'

const ICONS: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  Glasses: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm0 0H5.625m12.75 0H18.375M5.625 12a6.375 6.375 0 1112.75 0 6.375 6.375 0 01-12.75 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.625 12H2.25M18.375 12h3.375" />
    </svg>
  ),
  Car: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  Circle: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  ),
  Users: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  Zap: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  Grid: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  Star: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  Waves: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 20.25V13.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 11.625v-6.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 15.375c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
    </svg>
  ),
}

export default function ActivitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.activity-card')
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="activities" ref={sectionRef} className="relative py-24 md:py-32 bg-gaming-surface">
      {/* Background accent */}
      <div className="absolute inset-0 bg-hero-orbs opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal" style={{ transitionDelay: '0s' }}>
          <p className="section-label mb-4">What We Offer</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Our <span className="gradient-text">Activities</span>
          </h2>
          <p className="max-w-2xl mx-auto text-text-muted text-lg font-body leading-relaxed">
            De la réalité virtuelle à la piscine, chaque visite est une nouvelle aventure.
            Choisissez votre expérience.
          </p>
          <div className="neon-divider max-w-xs mx-auto mt-8" />
        </div>

        {/* Activity cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activities.map((activity, index) => {
            const IconComp = ICONS[activity.icon]
            return (
              <article
                key={activity.id}
                className={`activity-card reveal glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 ${activity.glowClass} group`}
                style={{ transitionDelay: `${index * 0.08}s` }}
                aria-label={activity.title}
              >
                {/* Badge */}
                {activity.badge && (
                  <div className="flex justify-end mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-body font-semibold tracking-wide"
                      style={{
                        background: `${activity.accentColor}22`,
                        color: activity.accentColor,
                        border: `1px solid ${activity.accentColor}44`,
                      }}
                    >
                      {activity.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200"
                  style={{
                    background: `${activity.accentColor}18`,
                    border: `1px solid ${activity.accentColor}35`,
                    boxShadow: `0 0 20px ${activity.accentColor}22`,
                  }}
                >
                  {IconComp && (
                    <IconComp
                      className="w-7 h-7"
                      style={{ color: activity.accentColor } as React.CSSProperties}
                    />
                  )}
                </div>

                {/* Content */}
                <h3 className="font-heading text-lg text-white mb-1 group-hover:text-neon-lavender transition-colors duration-200">
                  {activity.title}
                </h3>
                {activity.titleFr && (
                  <p className="text-xs font-body text-text-dim mb-3 tracking-wide">{activity.titleFr}</p>
                )}
                <p className="text-text-muted text-sm font-body leading-relaxed mb-4">
                  {activity.description}
                </p>

                {/* Price */}
                {activity.priceFrom && (
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold"
                    style={{
                      background: `${activity.accentColor}18`,
                      color: activity.accentColor,
                    }}
                  >
                    <span>À partir de</span>
                    <span className="font-heading">{activity.priceFrom}</span>
                  </div>
                )}

                {/* Details */}
                {activity.details && (
                  <ul className="mt-4 space-y-1.5">
                    {activity.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-xs text-text-dim font-body">
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: activity.accentColor }}
                          aria-hidden="true"
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Hover bottom line */}
                <div
                  className="mt-5 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${activity.accentColor}, transparent)` }}
                  aria-hidden="true"
                />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
