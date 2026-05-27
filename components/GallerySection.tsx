'use client'

import { useEffect, useRef } from 'react'

const GALLERY_ITEMS = [
  { id: 1, label: 'VR Zone', sublabel: 'Réalité Virtuelle', color: '#7C3AED', span: 'col-span-1 row-span-2' },
  { id: 2, label: 'Game Lounge', sublabel: 'Billard & Babyfoot', color: '#06B6D4', span: 'col-span-1 row-span-1' },
  { id: 3, label: 'Car Simulator', sublabel: 'Super Engine', color: '#F43F5E', span: 'col-span-1 row-span-1' },
  { id: 4, label: 'Restaurant', sublabel: 'Food & Bar', color: '#F59E0B', span: 'col-span-1 row-span-1' },
  { id: 5, label: 'Pool Area', sublabel: 'Piscine & Terrasse', color: '#06B6D4', span: 'col-span-1 row-span-2' },
  { id: 6, label: 'Kids Area', sublabel: 'Espace Enfants', color: '#EC4899', span: 'col-span-1 row-span-1' },
  { id: 7, label: 'Events Space', sublabel: 'Événements & Fêtes', color: '#7C3AED', span: 'col-span-1 row-span-1' },
  { id: 8, label: 'Ping-pong', sublabel: 'Tennis de Table', color: '#3B82F6', span: 'col-span-1 row-span-1' },
]

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.gallery-item')
    if (!items) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="gallery" ref={sectionRef} className="relative py-24 md:py-32 bg-gaming-dark">
      <div className="absolute top-0 inset-x-0 h-px bg-neon-gradient opacity-20" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-4">Découvrez l&apos;Espace</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Our <span className="gradient-text">Gallery</span>
          </h2>
          <p className="max-w-xl mx-auto text-text-muted text-lg font-body leading-relaxed">
            Un aperçu de votre prochaine destination de divertissement à Yaoundé.
          </p>
          <p className="mt-2 text-text-dim text-xs font-body italic">
            Photos réelles disponibles bientôt · Venez découvrir en personne
          </p>
          <div className="neon-divider max-w-xs mx-auto mt-8" />
        </div>

        {/* Gallery grid — CSS grid with different span sizes on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px]">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-item reveal gallery-placeholder rounded-2xl relative overflow-hidden cursor-pointer group ${
                index === 0 ? 'md:col-span-1 md:row-span-2' :
                index === 4 ? 'md:col-span-1 md:row-span-2' :
                ''
              }`}
              style={{ transitionDelay: `${index * 0.07}s` }}
              aria-label={`Gallery: ${item.label}`}
            >
              {/* Background grid texture */}
              <div
                className="absolute inset-0 hero-grid opacity-60"
                style={{ backgroundSize: '30px 30px' }}
                aria-hidden="true"
              />

              {/* Neon orb */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />

              {/* Icon placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  style={{ borderColor: `${item.color}60`, backgroundColor: `${item.color}15` }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="gallery-overlay absolute inset-0 flex flex-col items-center justify-end p-4 bg-gradient-to-t from-gaming-dark/90 via-gaming-dark/40 to-transparent">
                <div className="text-center">
                  <p
                    className="font-heading text-base text-white leading-tight"
                    style={{ textShadow: `0 0 20px ${item.color}80` }}
                  >
                    {item.label}
                  </p>
                  <p className="text-xs font-body mt-1" style={{ color: item.color }}>
                    {item.sublabel}
                  </p>
                </div>
              </div>

              {/* Always-visible label at bottom (mobile) */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-gaming-dark/80 to-transparent md:hidden">
                <p className="font-heading text-sm text-white text-center">{item.label}</p>
              </div>

              {/* Border on hover */}
              <div
                className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ borderColor: `${item.color}50` }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14 reveal">
          <p className="text-text-muted font-body text-base mb-6">
            Visitez-nous pour vivre l&apos;expérience V-GAMING en personne.
          </p>
          <a
            href="https://maps.google.com/?q=Bastos+ANOR+Yaoundé+Cameroun"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full btn-outline-neon font-body font-semibold text-sm cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Bastos, en face de l&apos;ANOR · Yaoundé
          </a>
        </div>
      </div>
    </section>
  )
}
