import type { VisualType, LottieKey } from '@/types/assets'

export interface Activity {
  id: string
  title: string
  titleFr?: string
  description: string
  icon: string
  accentColor: string
  glowClass: string
  badge?: string
  priceFrom?: string
  details?: string[]
  visualType?: VisualType
  iconKey?: LottieKey
  modelPath?: string
}

// Future: fetch from CMS/API to replace this static array
export const activities: Activity[] = [
  {
    id: 'vr',
    title: 'Virtual Reality',
    titleFr: 'Réalité Virtuelle',
    description:
      'Plongez dans des univers virtuels immersifs. Combats spatiaux, aventures fantastiques, expériences à 360°.',
    icon: 'Glasses',
    accentColor: '#7C3AED',
    glowClass: 'card-glow-purple',
    badge: 'Premium',
    details: ['Casques VR dernière génération', 'Expériences multi-joueurs', 'Contenu renouvelé'],
    visualType: 'model',
    modelPath: '/models/vr-headset.glb',
    iconKey: 'vr',
  },
  {
    id: 'simulator',
    title: 'Car Simulator',
    titleFr: 'Simulateur Auto',
    description:
      'Ressentez la vitesse au volant du Super Engine — notre simulateur de conduite ultra-réaliste.',
    icon: 'Car',
    accentColor: '#F43F5E',
    glowClass: 'card-glow-pink',
    badge: 'Featured',
    priceFrom: 'XAF 3,500',
    details: ['Siège baquet avec retour de force', 'Circuits réalistes', 'Compétition de temps'],
    visualType: 'model',
    modelPath: '/models/arcade-machine.glb',
    iconKey: 'simulator',
  },
  {
    id: 'billiards',
    title: 'Billiards',
    titleFr: 'Billard',
    description:
      'Tables de billard professionnelles pour les amateurs de précision et de stratégie.',
    icon: 'Circle',
    accentColor: '#06B6D4',
    glowClass: 'card-glow-cyan',
    details: ['Tables homologuées', 'Tournois réguliers', 'Location à l\'heure'],
    visualType: 'model',
  },
  {
    id: 'babyfoot',
    title: 'Baby-foot',
    titleFr: 'Baby-foot',
    description:
      'Défis enflammés entre amis sur nos tables de baby-foot professionnelles.',
    icon: 'Users',
    accentColor: '#3B82F6',
    glowClass: 'card-glow-blue',
    details: ['Tables anti-rebond', 'Tournois hebdomadaires', 'Parties libres'],
    visualType: 'model',
  },
  {
    id: 'pingpong',
    title: 'Ping-pong',
    titleFr: 'Tennis de Table',
    description:
      'Pratiquez le tennis de table sur nos tables de compétition dans une ambiance fun.',
    icon: 'Zap',
    accentColor: '#EC4899',
    glowClass: 'card-glow-pink',
    details: ['Tables de compétition', 'Équipement fourni', 'Coaching disponible'],
    visualType: 'model',
  },
  {
    id: 'boardgames',
    title: 'Board Games',
    titleFr: 'Jeux de Société',
    description:
      'Des centaines de jeux de société pour des soirées inoubliables : stratégie, famille, ambiance.',
    icon: 'Grid',
    accentColor: '#F59E0B',
    glowClass: 'card-glow-amber',
    details: ['Bibliothèque de 200+ jeux', 'Animateurs disponibles', 'Soirées thématiques'],
    visualType: 'model',
  },
  {
    id: 'kids',
    title: 'Kids Area',
    titleFr: 'Espace Enfants',
    description:
      'Un espace dédié aux plus petits avec jeux sécurisés, trampoline, et animations.',
    icon: 'Star',
    accentColor: '#7C3AED',
    glowClass: 'card-glow-purple',
    badge: 'Family',
    details: ['Jeux sécurisés 3–12 ans', 'Animateurs professionnels', 'Anniversaires enfants'],
    visualType: 'lottie',
    iconKey: 'kids',
  },
  {
    id: 'pool',
    title: 'Swimming Pool',
    titleFr: 'Piscine',
    description:
      'Détendez-vous dans notre piscine avec terrasse. Parfaite pour familles et groupes.',
    icon: 'Waves',
    accentColor: '#06B6D4',
    glowClass: 'card-glow-cyan',
    badge: 'Relax',
    details: ['Piscine chauffée', 'Terrasse & chaises longues', 'Service bar au bord'],
    visualType: 'lottie',
    iconKey: 'pool',
  },
]
