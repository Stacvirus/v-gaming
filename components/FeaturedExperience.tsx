'use client'

import { useEffect, useRef } from 'react'

const WA_NUMBER = '237698453633'
const WA_MESSAGE = encodeURIComponent('Bonjour V-GAMING ! Je veux réserver le Super Engine (simulateur auto). Pouvez-vous me confirmer la disponibilité ?')
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

const FEATURES = [
  { label: 'Siège baquet racing', icon: 'seat' },
  { label: 'Retour de force au volant', icon: 'force' },
  { label: 'Écrans haute résolution', icon: 'screen' },
  { label: 'Audio surround immersif', icon: 'audio' },
  { label: 'Circuits mondiaux', icon: 'map' },
  { label: 'Mode compétition', icon: 'trophy' },
]

function FeatureIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    seat: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    force: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    screen: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    audio: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
    map: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    trophy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
  }
  return <>{icons[type] || icons['seat']}</>
}

export default function FeaturedExperience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    if (!els) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="featured" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-gaming-surface">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-rose/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-neon-purple/5 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-rose/5 blur-3xl animate-float" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-12 reveal">
          <p className="section-label mb-3">Featured Experience</p>
          <div className="neon-divider max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Visual */}
          <div className="reveal-left order-2 lg:order-1">
            <div className="relative">
              {/* Simulator visual card */}
              <div className="relative rounded-3xl overflow-hidden border border-neon-rose/30 neon-glow-pink"
                style={{ boxShadow: '0 0 60px rgba(244,63,94,0.2), 0 0 120px rgba(244,63,94,0.1)' }}>
                {/* Placeholder visual — replace with real image */}
                <div className="aspect-[4/3] gallery-placeholder flex flex-col items-center justify-center">
                  <div className="relative">
                    {/* Stylized car simulator icon */}
                    <div className="w-32 h-32 rounded-full border-2 border-neon-rose/60 flex items-center justify-center animate-glow-cyan"
                      style={{ boxShadow: '0 0 40px rgba(244,63,94,0.4)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="1.5" className="w-16 h-16" aria-label="Car simulator icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                    </div>
                    {/* Orbit ring */}
                    <div className="absolute -inset-6 rounded-full border border-neon-rose/20 animate-rotate-slow" aria-hidden="true" />
                    <div className="absolute -inset-12 rounded-full border border-neon-rose/10 animate-rotate-slow" style={{ animationDirection: 'reverse' }} aria-hidden="true" />
                  </div>
                  <p className="mt-8 text-text-dim text-sm font-body tracking-widest uppercase">
                    Super Engine · Racing Simulator
                  </p>
                  {/* CMS hook: replace with <Image src={product.image} ... /> */}
                </div>

                {/* Scanline overlay */}
                <div className="absolute inset-0 scanlines pointer-events-none" aria-hidden="true" />
              </div>

              {/* Price badge floating */}
              <div className="absolute -top-5 -right-5 z-10">
                <div className="relative w-28 h-28 flex flex-col items-center justify-center rounded-full"
                  style={{ background: 'linear-gradient(135deg, #F43F5E 0%, #EC4899 100%)', boxShadow: '0 0 30px rgba(244,63,94,0.5)' }}>
                  <span className="font-heading text-white text-xs tracking-widest">FROM</span>
                  <span className="font-heading text-white text-xl leading-tight">XAF</span>
                  <span className="font-heading text-white text-2xl leading-tight">3,500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="reveal-right order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.35)' }}>
              <span className="w-2 h-2 rounded-full bg-neon-rose animate-pulse-neon" />
              <span className="text-neon-rose text-xs font-body font-semibold tracking-widest uppercase">
                Expérience Phare
              </span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              SUPER{' '}
              <span
                className="gradient-text"
                style={{ background: 'linear-gradient(135deg, #F43F5E, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                ENGINE
              </span>
            </h2>

            <p className="text-text-muted text-lg font-body leading-relaxed mb-8">
              Prenez place dans notre simulateur de conduite ultra-réaliste. Ressentez chaque
              virage, chaque accélération, chaque freinage sur les plus grands circuits du monde.
              Une expérience de conduite sans équivalent à Yaoundé.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {FEATURES.map((f) => (
                <div key={f.label} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                  <span className="text-neon-rose flex-shrink-0">
                    <FeatureIcon type={f.icon} />
                  </span>
                  <span className="text-text-muted text-sm font-body">{f.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-body font-semibold text-base cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-rose transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #F43F5E 0%, #EC4899 100%)', boxShadow: '0 0 25px rgba(244,63,94,0.4)' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Réserver via WhatsApp
              </a>
              <a
                href="tel:+237698453633"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full btn-outline-neon font-body font-semibold text-base cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
