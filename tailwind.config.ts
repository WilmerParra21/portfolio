import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nueva paleta según INITIAL-WEB.md
        obsidian: '#050505',
        carbon: '#121214',
        offWhite: '#F5F5F7',
        volt: '#CCFF00',
        muted: 'rgba(255, 255, 255, 0.5)',
        // Colores existentes para compatibilidad
        frost: '#F8FAFC',
        midnight: '#050505',
        slate: '#1E293B',
        ice: '#E2E8F0',
        space: '#121214',
        cyan: '#CCFF00',
        neon: '#CCFF00',
        glacier: '#88AAEE',
        steel: '#455A64',
        ink: '#050505',
        ocean: '#88AAEE',
        mist: '#455A64',
        signal: '#CCFF00',
        sun: '#88AAEE',
        coral: '#FF6B6B',
      },
      fontFamily: {
        display: ['Inter Tight', 'Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 36px rgba(204, 255, 0, 0.34)',
        voltGlow: '0 0 22px rgba(204, 255, 0, 0.5)',
        nebula: '0 22px 80px rgba(204, 255, 0, 0.16)',
        card: '0 18px 60px rgba(0, 0, 0, 0.36)',
      },
      borderColor: {
        ice: '#E2E8F0',
        steel: '#455A64',
        cyan: '#CCFF00',
      },
      textColor: {
        midnight: '#050505',
        offWhite: '#F5F5F7',
        volt: '#CCFF00',
      },
      backgroundColor: {
        space: '#121214',
        obsidian: '#050505',
      },
      animation: {
        bounce: 'bounce 1s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
