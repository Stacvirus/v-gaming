'use client'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Activities', href: '#activities' },
  { label: 'Food & Drinks', href: '#food' },
  { label: 'Events', href: '#events' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const ACTIVITIES = [
  'Virtual Reality',
  'Car Simulator',
  'Billiards',
  'Baby-foot',
  'Ping-pong',
  'Board Games',
  'Kids Area',
  'Swimming Pool',
]

const HOURS = [
  { day: 'Lundi – Vendredi', time: '09:00 – 23:00' },
  { day: 'Samedi', time: '09:00 – 00:00' },
  { day: 'Dimanche', time: '10:00 – 22:00' },
]

// Future: link real social profiles
const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-label="Facebook">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-label="Instagram">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-label="TikTok">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.27 8.27 0 004.84 1.54V7.07a4.85 4.85 0 01-1.08-.38z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gaming-dark border-t border-neon-purple/15" role="contentinfo">
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-neon-gradient opacity-40" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-neon-gradient neon-glow">
                <span className="font-heading text-white text-base font-bold">V</span>
              </div>
              <span className="font-heading text-2xl tracking-widest gradient-text">V-GAMING</span>
            </div>
            <p className="text-text-muted font-body text-sm leading-relaxed mb-6">
              Votre espace de divertissement, sport et détente au cœur de Bastos, Yaoundé.
              Gaming · Loisirs · Restaurant · Piscine.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl glass border border-white/10 text-text-dim hover:text-white hover:border-neon-purple/50 hover:bg-neon-purple/10 transition-all duration-200 cursor-pointer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="font-heading text-sm text-white uppercase tracking-widest mb-5">
              Navigation
            </h3>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-text-muted hover:text-white text-sm font-body transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Activities */}
          <div>
            <h3 className="font-heading text-sm text-white uppercase tracking-widest mb-5">
              Activités
            </h3>
            <ul className="space-y-3" role="list">
              {ACTIVITIES.map((act) => (
                <li key={act}>
                  <span className="text-text-muted text-sm font-body">{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Contact */}
          <div>
            <h3 className="font-heading text-sm text-white uppercase tracking-widest mb-5">
              Heures d&apos;ouverture
            </h3>
            <ul className="space-y-3 mb-6" role="list">
              {HOURS.map((h) => (
                <li key={h.day} className="flex flex-col gap-0.5">
                  <span className="text-text-dim text-xs font-body tracking-wide">{h.day}</span>
                  <span className="text-white text-sm font-body font-medium">{h.time}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-heading text-sm text-white uppercase tracking-widest mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm" role="list">
              <li>
                <a href="tel:+237698453633" className="text-text-muted hover:text-white font-body transition-colors duration-200 cursor-pointer">
                  +237 698 453 633
                </a>
              </li>
              <li>
                <a href="mailto:vgamingyde237@gmail.com" className="text-text-muted hover:text-white font-body transition-colors duration-200 cursor-pointer break-all">
                  vgamingyde237@gmail.com
                </a>
              </li>
              <li>
                <span className="text-text-muted font-body text-xs leading-relaxed">
                  Bastos, en face de l&apos;ANOR,<br />Yaoundé, Cameroun
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="neon-divider mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-text-dim">
          <p>
            © {currentYear} V-GAMING. Tous droits réservés. Bastos, Yaoundé, Cameroun.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://v-gaming.buyam.cm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Disponible sur Buyam
            </a>
            <span className="w-px h-3 bg-white/20" aria-hidden="true" />
            <span>Yaoundé, Cameroun</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
