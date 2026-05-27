export type EventType = 'tournament' | 'birthday' | 'family' | 'group' | 'corporate'

export interface GameEvent {
  id: string
  title: string
  titleFr?: string
  type: EventType
  description: string
  icon: string
  accentColor: string
  glowClass: string
  capacity?: string
  badge?: string
  highlight?: string
  cta?: string
}

// Future: pull real events from backend/booking system
export const events: GameEvent[] = [
  {
    id: 'tournament',
    title: 'Gaming Tournaments',
    titleFr: 'Tournois Gaming',
    type: 'tournament',
    description:
      'Participez à nos tournois hebdomadaires VR, simulateur et jeux rétro. Gagnez des prix et la gloire !',
    icon: 'Trophy',
    accentColor: '#F59E0B',
    glowClass: 'card-glow-amber',
    capacity: 'Jusqu\'à 32 joueurs',
    badge: 'Weekly',
    highlight: 'Prix & couronnes pour les champions',
    cta: 'Rejoindre un tournoi',
  },
  {
    id: 'birthday',
    title: 'Birthday Parties',
    titleFr: 'Fêtes d\'Anniversaire',
    type: 'birthday',
    description:
      'Offrez une fête inoubliable avec espace privatisé, animations, buffet personnalisé et déco.',
    icon: 'PartyPopper',
    accentColor: '#EC4899',
    glowClass: 'card-glow-pink',
    capacity: '10 à 80 personnes',
    badge: 'Popular',
    highlight: 'Gâteau + animateur inclus',
    cta: 'Réserver une fête',
  },
  {
    id: 'family',
    title: 'Family Day',
    titleFr: 'Journée Famille',
    type: 'family',
    description:
      'Une journée complète pour petits et grands : piscine, jeux, repas, activités et détente pour toute la famille.',
    icon: 'Heart',
    accentColor: '#06B6D4',
    glowClass: 'card-glow-cyan',
    capacity: '4 à 50 personnes',
    badge: 'All Ages',
    highlight: 'Forfait famille tout compris',
    cta: 'Planifier ma Family Day',
  },
  {
    id: 'group',
    title: 'Group Bookings',
    titleFr: 'Réservations de Groupe',
    type: 'group',
    description:
      'Venez entre amis ou en association : tarifs préférentiels, espace réservé, menu groupe sur mesure.',
    icon: 'Users',
    accentColor: '#3B82F6',
    glowClass: 'card-glow-blue',
    capacity: '10 à 100 personnes',
    badge: 'Best Value',
    highlight: 'Tarifs dégressifs pour les groupes',
    cta: 'Obtenir un devis groupe',
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    titleFr: 'Événements Corporate',
    type: 'corporate',
    description:
      'Team building, séminaires et afterworks mémorables dans un cadre exclusif. Offrez à votre équipe une pause de qualité.',
    icon: 'Briefcase',
    accentColor: '#7C3AED',
    glowClass: 'card-glow-purple',
    capacity: '10 à 120 personnes',
    badge: 'Enterprise',
    highlight: 'Devis personnalisé sous 24h',
    cta: 'Demander un devis corporate',
  },
]
