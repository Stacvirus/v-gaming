'use client'

import { useEffect, useRef, useState } from 'react'

const WA_NUMBER = '237698453633'

interface FormState {
  name: string
  phone: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  message?: string
}

const CONTACT_INFO = [
  {
    icon: 'phone',
    label: 'Téléphone',
    value: '+237 698 453 633',
    href: 'tel:+237698453633',
    color: '#7C3AED',
  },
  {
    icon: 'email',
    label: 'Email',
    value: 'vgamingyde237@gmail.com',
    href: 'mailto:vgamingyde237@gmail.com',
    color: '#06B6D4',
  },
  {
    icon: 'location',
    label: 'Adresse',
    value: 'Bastos, en face de l\'ANOR, Yaoundé, Cameroun',
    href: 'https://maps.google.com/?q=Bastos+ANOR+Yaoundé',
    color: '#F43F5E',
  },
  {
    icon: 'hours',
    label: 'Horaires',
    value: 'Lun–Dim : 09h00 – 23h00',
    href: null,
    color: '#F59E0B',
  },
]

function ContactIcon({ type, className, style }: { type: string; className?: string; style?: React.CSSProperties }) {
  const icons: Record<string, React.ReactNode> = {
    phone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    email: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    location: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    hours: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }
  return <span style={style} className="contents">{icons[type]}</span>
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Mark as client-mounted so the form is never SSR'd.
    // This prevents browser extensions (password managers) from injecting
    // DOM nodes that cause React hydration mismatches.
    setMounted(true)

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
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = 'Votre nom est requis (min. 2 caractères).'
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Adresse email invalide.'
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'Message trop court (min. 10 caractères).'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    // Future: POST to /api/contact or integrate with EmailJS / backend
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)

    // Redirect to WhatsApp with pre-filled message after form success
    const waText = encodeURIComponent(
      `Nom: ${form.name}\nTél: ${form.phone}\nEmail: ${form.email}\nSujet: ${form.subject}\nMessage: ${form.message}`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${waText}`, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 bg-gaming-surface overflow-hidden">
      <div className="absolute inset-0 bg-hero-orbs opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 inset-x-0 h-px bg-neon-gradient opacity-20" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-4">Prenez Contact</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p className="max-w-xl mx-auto text-text-muted text-lg font-body leading-relaxed">
            Une question ? Une réservation ? Contactez-nous par WhatsApp, téléphone ou via
            le formulaire ci-dessous.
          </p>
          <div className="neon-divider max-w-xs mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Info cards + map */}
          <div className="reveal-left space-y-5">
            {/* Contact info cards */}
            {CONTACT_INFO.map((info) => (
              <div key={info.label} className="glass-card rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 card-glow-purple">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${info.color}18`, border: `1px solid ${info.color}35` }}
                >
                  <ContactIcon type={info.icon} className="w-5 h-5" style={{ color: info.color } as React.CSSProperties} />
                </div>
                <div className="min-w-0">
                  <p className="text-text-dim text-xs font-body uppercase tracking-widest mb-1">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="font-body text-white hover:text-neon-lavender transition-colors duration-200 cursor-pointer text-sm leading-snug break-all"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-body text-white text-sm">{info.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Bonjour V-GAMING !')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl btn-whatsapp text-white font-body font-semibold text-base cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Discuter sur WhatsApp
            </a>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-neon-purple/20 aspect-video relative">
              {/* Dark tint filter so the map matches the site's dark theme */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.595585068785!2d11.504804575916506!3d3.8964995960773052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf125e0dae55%3A0xcd742f1e707b3d69!2sVGaming!5e0!3m2!1sfr!2scm!4v1779884814937!5m2!1sfr!2scm" 
                title="V-GAMING location — Bastos, en face de l'ANOR, Yaoundé"
                className="absolute inset-0 w-full h-full"
                style={{ filter: 'invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* "Open in Maps" pill anchored to bottom-right */}
              <a
                href="https://maps.app.goo.gl/bcy7ZXaT77wE6k1i8"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 z-10 px-3 py-1.5 rounded-full text-xs font-body font-medium bg-gaming-dark/90 border border-neon-purple/40 text-neon-lavender hover:border-neon-purple hover:text-white transition-colors duration-200 cursor-pointer backdrop-blur-sm"
              >
                Ouvrir dans Maps ↗
              </a>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="reveal-right">
            <div className="glass-card rounded-2xl p-7">
              <h3 className="font-heading text-xl text-white mb-1">Envoyer un message</h3>
              <p className="text-text-dim text-xs font-body mb-6">
                Nous répondons dans les 24h · Réponse rapide via WhatsApp
              </p>

              {/* Form is client-only to prevent hydration mismatches from browser extensions */}
              {!mounted ? (
                <div className="space-y-4" aria-hidden="true">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-12 rounded-xl shimmer-bg" />
                    <div className="h-12 rounded-xl shimmer-bg" />
                  </div>
                  <div className="h-12 rounded-xl shimmer-bg" />
                  <div className="h-12 rounded-xl shimmer-bg" />
                  <div className="h-28 rounded-xl shimmer-bg" />
                  <div className="h-14 rounded-xl shimmer-bg" />
                </div>
              ) : submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center mx-auto neon-glow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" className="w-8 h-8" aria-label="Success checkmark">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-heading text-xl text-white">Message envoyé !</p>
                  <p className="text-text-muted font-body text-sm">
                    Merci ! Nous vous avons redirigé vers WhatsApp pour une réponse rapide.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', subject: '', message: '' }) }}
                    className="mt-4 px-6 py-2.5 rounded-full btn-outline-neon text-sm font-body cursor-pointer"
                  >
                    Nouveau message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-body text-text-dim mb-1.5 tracking-wide">
                        Nom complet <span className="text-neon-rose">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={!!errors.name}
                        suppressHydrationWarning
                        className={`w-full px-4 py-3 rounded-xl bg-gaming-dark border font-body text-sm text-white placeholder:text-text-dim focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.name
                            ? 'border-neon-rose/60 focus:ring-neon-rose/40'
                            : 'border-white/10 hover:border-neon-purple/40 focus:ring-neon-purple/40 focus:border-neon-purple/60'
                        }`}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-neon-rose font-body" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-body text-text-dim mb-1.5 tracking-wide">
                        Téléphone
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+237 6XX XXX XXX"
                        suppressHydrationWarning
                        className="w-full px-4 py-3 rounded-xl bg-gaming-dark border border-white/10 hover:border-neon-purple/40 font-body text-sm text-white placeholder:text-text-dim focus:outline-none focus:ring-2 focus:ring-neon-purple/40 focus:border-neon-purple/60 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-body text-text-dim mb-1.5 tracking-wide">
                      Email <span className="text-neon-rose">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="exemple@email.com"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      aria-invalid={!!errors.email}
                      suppressHydrationWarning
                      className={`w-full px-4 py-3 rounded-xl bg-gaming-dark border font-body text-sm text-white placeholder:text-text-dim focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.email
                          ? 'border-neon-rose/60 focus:ring-neon-rose/40'
                          : 'border-white/10 hover:border-neon-purple/40 focus:ring-neon-purple/40 focus:border-neon-purple/60'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-neon-rose font-body" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-body text-text-dim mb-1.5 tracking-wide">
                      Sujet
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-gaming-dark border border-white/10 hover:border-neon-purple/40 font-body text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-purple/40 focus:border-neon-purple/60 transition-all duration-200 cursor-pointer"
                    >
                      <option value="">Sélectionner un sujet</option>
                      <option value="reservation">Réservation d&apos;activité</option>
                      <option value="birthday">Anniversaire / Événement privé</option>
                      <option value="corporate">Événement corporate</option>
                      <option value="tournament">Tournoi gaming</option>
                      <option value="info">Informations générales</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-body text-text-dim mb-1.5 tracking-wide">
                      Message <span className="text-neon-rose">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre demande, date souhaitée, nombre de personnes..."
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={!!errors.message}
                      className={`w-full px-4 py-3 rounded-xl bg-gaming-dark border font-body text-sm text-white placeholder:text-text-dim focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                        errors.message
                          ? 'border-neon-rose/60 focus:ring-neon-rose/40'
                          : 'border-white/10 hover:border-neon-purple/40 focus:ring-neon-purple/40 focus:border-neon-purple/60'
                      }`}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-neon-rose font-body" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl btn-neon text-white font-body font-semibold text-base tracking-wide cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-lavender transition-all duration-200"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      'Envoyer le Message'
                    )}
                  </button>

                  <p className="text-center text-text-dim text-xs font-body">
                    Votre message sera partagé via WhatsApp pour une réponse rapide.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
