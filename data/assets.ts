// Central asset registry for all 3D/animation assets
// Set NEXT_PUBLIC_SPLINE_HERO_SCENE_URL in .env.local for the Spline hero scene

export const HERO_SPLINE_URL: string =
  process.env.NEXT_PUBLIC_SPLINE_HERO_SCENE_URL ?? ''

export const MODEL_PATHS = {
  arcadeMachine: '/models/arcade-machine.glb',
  vrHeadset:     '/models/vr-headset.glb',
  billiardTable: '/models/billiard-table.glb',
} as const

export const LOTTIE_URLS = {
  gaming:    '/lottie/gaming-controller.json',
  vr:        '/lottie/vr-headset.json',
  food:      '/lottie/food.json',
  event:     '/lottie/event.json',
  contact:   '/lottie/contact.json',
  car:       '/lottie/car.json',
  pool:      '/lottie/pool.json',
  kids:      '/lottie/kids.json',
  billiards: '/lottie/billiards.json',
  simulator: '/lottie/car.json',
} as const

export type LottieKey = keyof typeof LOTTIE_URLS
