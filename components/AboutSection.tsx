'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { value: '8+', label: 'Activités', sub: 'VR, Simulateur, Billard, Pool...' },
  { value: '500+', label: 'Visiteurs', sub: 'Satisfaits chaque mois' },
  { value: '7/7', label: 'Ouvert', sub: 'Tous les jours de la semaine' },
  { value: '1', label: 'Lieu Unique', sub: 'À Bastos, Yaoundé' },
]

const VALUES = [
  {
    icon: 'star',
    title: 'Expérience Premium',
    desc: 'Des équipements de qualité professionnelle pour une expérience sans compromis.',
  },
  {
    icon: 'family',
    title: 'Pour Tous',
    desc: 'Enfants, jeunes, adultes, familles — chacun trouve sa place chez V-GAMING.',
  },
  {
    icon: 'shield',
    title: 'Sécurité & Confort',
    desc: 'Un environnement sûr, propre et accueillant où vous pouvez vous détendre.',
  },
  {
    icon: 'event',
    title: 'Sur Mesure',
    desc: 'Tournois, anniversaires, corporate — nous adaptons chaque expérience à vos besoins.',
  },
]

function ValueIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    star: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    family: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    event: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  }
  return <>{icons[type]}</>
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    if (!els) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32 bg-gaming-surface overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-neon-purple/5 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-neon-cyan/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-4">Notre Histoire</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            About <span className="gradient-text">V-GAMING</span>
          </h2>
          <div className="neon-divider max-w-xs mx-auto" />
        </div>

        {/* Main two-column block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Text */}
          <div className="reveal-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-neon-purple/30 mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse-neon" />
              <span className="text-neon-lavender text-xs font-body font-semibold tracking-widest uppercase">
                Bastos · Yaoundé · Cameroun
              </span>
            </div>

            <h3 className="font-heading text-2xl md:text-3xl text-white leading-snug">
              Espace de Divertissement,
              <br />
              <span className="gradient-text-alt">Sport &amp; Détente</span>
            </h3>

            <p className="text-text-muted font-body text-base leading-relaxed">
              V-GAMING est né d&apos;une vision simple : créer à Yaoundé un espace où chacun peut
              oublier le quotidien et vivre des expériences uniques. Situé en plein cœur de
              Bastos, en face de l&apos;ANOR, nous réunissons gaming de pointe, sports de loisirs,
              gastronomie et détente en un seul lieu.
            </p>

            <p className="text-text-muted font-body text-base leading-relaxed">
              Que vous soyez gamer passionné, famille en recherche d&apos;aventures, ou entreprise
              souhaitant organiser un team building mémorable — V-GAMING est votre destination
              de choix à Yaoundé.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="https://maps.google.com/?q=Bastos+ANOR+Yaoundé+Cameroun"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-neon-cyan text-sm font-body font-medium hover:text-white transition-colors duration-200 cursor-pointer group"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Bastos, en face de l&apos;ANOR, Yaoundé
              </a>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="reveal-right grid grid-cols-2 gap-5">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-200 card-glow-purple"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="font-heading text-3xl md:text-4xl gradient-text mb-2">{stat.value}</div>
                <div className="font-body font-semibold text-white text-sm mb-1">{stat.label}</div>
                <div className="font-body text-xs text-text-dim">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((value, i) => (
            <div
              key={value.title}
              className="reveal glass-card rounded-2xl p-5 transition-all duration-300 card-glow-cyan group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-11 h-11 rounded-xl bg-neon-cyan/15 border border-neon-cyan/30 flex items-center justify-center mb-4 text-neon-cyan group-hover:scale-110 transition-transform duration-200">
                <ValueIcon type={value.icon} />
              </div>
              <h4 className="font-heading text-base text-white mb-2 group-hover:text-neon-cyan transition-colors duration-200">
                {value.title}
              </h4>
              <p className="text-text-muted text-sm font-body leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
