/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        // Paleta exacta del Taller 3
        navy: {
          DEFAULT: '#1a1a2e',
          dark:    '#0f172a',
          mid:     '#16213e',
          light:   '#0f335f',
          soft:    '#1e2a4a',
        },
        accent: {
          DEFAULT: '#e94560',   // rojo-rosa del Taller 3
          hover:   '#d63050',
          light:   'rgba(233,69,96,0.15)',
        },
        cyan: {
          DEFAULT: 'aqua',      // hover cyan del Taller 3
          soft:    'rgba(0,255,255,0.1)',
        },
        muted: '#777777',
        soft:  '#aaaaaa',
        steel: '#b3bfd6',
      },
      boxShadow: {
        card:   '0 4px 15px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 30px rgba(233,69,96,0.25)',
        accent: '0 0 20px rgba(233,69,96,0.4)',
      },
      backgroundImage: {
        'hero-gradient':   'linear-gradient(130deg, #1a1a2e, #0f335f)',
        'dark-gradient':   'linear-gradient(135deg, #0f172a 0%, #0f2444 50%, #0a3060 100%)',
        'card-gradient':   'linear-gradient(to top, #1a1a2e 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
}
