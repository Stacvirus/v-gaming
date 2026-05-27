'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Activities', href: '#activities' },
  { label: 'Food & Drinks', href: '#food' },
  { label: 'Events', href: '#events' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const WA_NUMBER = '237698453633'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Bonjour V-GAMING ! Je souhaite réserver une activité.')}`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-gaming-dark/90 backdrop-blur-xl border-b border-neon-purple/20 shadow-[0_2px_30px_rgba(124,58,237,0.15)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#hero')}
          className="flex items-center gap-2 cursor-pointer focus:outline-none group"
          aria-label="V-GAMING — retour en haut"
        >
          <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-neon-gradient neon-glow group-hover:scale-110 transition-transform duration-200">
            <span className="font-heading text-white text-sm font-bold tracking-tight">V</span>
          </div>
          <span className="font-heading text-xl tracking-widest gradient-text">
            V-GAMING
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="relative px-3 py-1.5 text-sm text-text-muted hover:text-white font-body font-medium transition-colors duration-200 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple rounded-md"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-neon-gradient group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full btn-neon text-white text-sm font-body font-semibold tracking-wide cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-lavender"
          >
            Book Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple rounded-md"
        >
          <span
            className={`block w-6 h-0.5 bg-neon-lavender transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-neon-lavender transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-neon-lavender transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-out overflow-hidden ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-gaming-dark/95 backdrop-blur-xl border-t border-neon-purple/20 px-4 py-6 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="w-full text-left px-4 py-3 rounded-lg text-text-muted hover:text-white hover:bg-neon-purple/10 font-body text-base transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 rounded-full btn-neon text-white font-body font-semibold text-base cursor-pointer"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
