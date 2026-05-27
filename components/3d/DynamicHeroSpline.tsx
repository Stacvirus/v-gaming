import dynamic from 'next/dynamic'

// Loaded only on client, never during SSR
// Shows nothing while loading so it doesn't block LCP
const DynamicHeroSpline = dynamic(
  () => import('./HeroSplineScene'),
  { ssr: false, loading: () => null }
)

export default DynamicHeroSpline
