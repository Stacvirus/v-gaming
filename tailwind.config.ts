import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gaming-dark': '#0F0F23',
        'gaming-card': '#141428',
        'gaming-card-hover': '#1A1A3E',
        'gaming-surface': '#0C0C1E',
        'neon-purple': '#7C3AED',
        'neon-lavender': '#A78BFA',
        'neon-blue': '#3B82F6',
        'neon-cyan': '#06B6D4',
        'neon-pink': '#EC4899',
        'neon-rose': '#F43F5E',
        'neon-amber': '#F59E0B',
        'text-primary': '#E2E8F0',
        'text-muted': '#94A3B8',
        'text-dim': '#64748B',
      },
      fontFamily: {
        heading: ['var(--font-russo)', 'sans-serif'],
        body: ['var(--font-chakra)', 'sans-serif'],
        mono: ['var(--font-chakra)', 'monospace'],
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
        'hero-orbs':
          'radial-gradient(ellipse at 15% 40%, rgba(124,58,237,0.25) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(6,182,212,0.18) 0%, transparent 55%), radial-gradient(ellipse at 60% 85%, rgba(236,72,153,0.15) 0%, transparent 45%)',
        'section-gradient':
          'linear-gradient(180deg, #0F0F23 0%, #0C0C1E 50%, #0F0F23 100%)',
        'card-gradient': 'linear-gradient(145deg, #141428 0%, #1A1A3E 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 50%, #F59E0B 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(124,58,237,0.8), 0 0 80px rgba(124,58,237,0.4)' },
        },
        'glow-cyan': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6,182,212,0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(6,182,212,0.9)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'border-flow': {
          '0%, 100%': { borderColor: 'rgba(124,58,237,0.6)' },
          '50%': { borderColor: 'rgba(6,182,212,0.8)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        // 3D gyroscope rings — each axis independent
        'spin-x': {
          '0%':   { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(360deg)' },
        },
        'spin-y': {
          '0%':   { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'spin-z': {
          '0%':   { transform: 'rotateZ(0deg)' },
          '100%': { transform: 'rotateZ(360deg)' },
        },
        // Soft 3D bob — for hero content block
        'bob-3d': {
          '0%, 100%': { transform: 'perspective(1400px) rotateX(0deg) rotateY(0deg)' },
          '25%':       { transform: 'perspective(1400px) rotateX(1.5deg) rotateY(-1.5deg)' },
          '75%':       { transform: 'perspective(1400px) rotateX(-1.5deg) rotateY(1.5deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float-slow 8s ease-in-out 1s infinite',
        glow: 'glow 3s ease-in-out infinite',
        'glow-cyan': 'glow-cyan 3s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.7s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        'rotate-slow': 'rotate-slow 25s linear infinite',
        'border-flow': 'border-flow 2.5s ease-in-out infinite',
        'spin-x': 'spin-x 9s linear infinite',
        'spin-y': 'spin-y 12s linear infinite',
        'spin-z': 'spin-z 16s linear infinite reverse',
        'bob-3d': 'bob-3d 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
