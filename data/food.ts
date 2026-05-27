export interface FoodCategory {
  id: string
  name: string
  nameFr?: string
  description: string
  icon: string
  accentColor: string
  glowClass: string
  sampleItems: string[]
  tag?: string
}

// Future: replace with API/CMS data from Buyam or internal menu system
export const foodCategories: FoodCategory[] = [
  {
    id: 'fastfood',
    name: 'Fast Food',
    nameFr: 'Restauration Rapide',
    description: 'Burgers, hot-dogs, wraps et snacks savoureux pour recharger les batteries.',
    icon: 'UtensilsCrossed',
    accentColor: '#F43F5E',
    glowClass: 'card-glow-pink',
    sampleItems: ['Burger Classic', 'Chicken Wrap', 'Hot Dog', 'Frites'],
    tag: 'Quick & Tasty',
  },
  {
    id: 'bakery',
    name: 'Bakery',
    nameFr: 'Boulangerie',
    description: 'Croissants, pains frais, viennoiseries et pâtisseries artisanales du jour.',
    icon: 'Cookie',
    accentColor: '#F59E0B',
    glowClass: 'card-glow-amber',
    sampleItems: ['Croissant beurre', 'Pain au chocolat', 'Brioche', 'Sandwich baguette'],
    tag: 'Fresh Daily',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    nameFr: 'Desserts',
    description: 'Glaces, crêpes, gâteaux et douceurs sucrées pour terminer en beauté.',
    icon: 'IceCream',
    accentColor: '#EC4899',
    glowClass: 'card-glow-pink',
    sampleItems: ['Crème glacée', 'Crêpes Nutella', 'Gâteau au chocolat', 'Tiramisu'],
    tag: 'Sweet Corner',
  },
  {
    id: 'softdrinks',
    name: 'Soft Drinks',
    nameFr: 'Boissons Gazeuses',
    description: 'Sodas, eaux minérales et boissons rafraîchissantes pour tous les goûts.',
    icon: 'GlassWater',
    accentColor: '#06B6D4',
    glowClass: 'card-glow-cyan',
    sampleItems: ['Coca-Cola', 'Fanta Orange', 'Sprite', 'Eau minérale'],
  },
  {
    id: 'juice',
    name: 'Fruit Juice',
    nameFr: 'Jus de Fruits',
    description: 'Jus naturels pressés à froid — mangue, ananas, goyave, bissap et mix tropicaux.',
    icon: 'Droplets',
    accentColor: '#7C3AED',
    glowClass: 'card-glow-purple',
    sampleItems: ['Jus de mangue', 'Ananas frais', 'Mix tropical', 'Bissap glacé'],
    tag: '100% Natural',
  },
  {
    id: 'beer',
    name: 'Beer',
    nameFr: 'Bière',
    description: 'Bières locales et importées servies bien fraîches. Castel, Heineken et plus.',
    icon: 'Beer',
    accentColor: '#F59E0B',
    glowClass: 'card-glow-amber',
    sampleItems: ['Castel', 'Heineken', '33 Export', 'Bock Cameroun'],
    tag: 'Ice Cold',
  },
  {
    id: 'wine',
    name: 'Wine',
    nameFr: 'Vin',
    description: 'Vins rouges, blancs et rosés sélectionnés pour accompagner vos moments détente.',
    icon: 'Wine',
    accentColor: '#7C3AED',
    glowClass: 'card-glow-purple',
    sampleItems: ['Bordeaux rouge', 'Chardonnay blanc', 'Rosé de Provence', 'Vin mousseux'],
    tag: 'Premium Selection',
  },
  {
    id: 'whisky',
    name: 'Whisky & Spirits',
    nameFr: 'Whisky & Spiritueux',
    description: 'Whiskies écossais, bourbons, gins et cocktails élaborés par nos bartenders.',
    icon: 'GlassWater',
    accentColor: '#F43F5E',
    glowClass: 'card-glow-pink',
    sampleItems: ['Johnnie Walker', 'Jack Daniel\'s', 'Gin Tonic maison', 'Cocktail V-Gaming'],
    tag: 'Lounge Bar',
  },
]
