/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "luxury-orange": "#FF6B00",        // Premium Orange
        "luxury-orange-bright": "#FF8C00", // Bright Orange
        "luxury-orange-soft": "#FFA726",   // Soft Orange
        "luxury-charcoal": "#1A1A1A",      // Dark Charcoal
        "luxury-gold": "#D4AF37",          // Elegant Gold
        "luxury-cream": "#FFF8F0",         // Soft Cream
        "luxury-gray": "#F8FAFC"           // Light Gray
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        playfair: ["Playfair Display", "serif"]
      },
      fontSize: {
        "xxs": ["0.65rem", { lineHeight: "1rem" }]
      },
      spacing: {
        "4.5": "1.125rem"
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FFA726 100%)',
        'luxury-gold-glow': 'linear-gradient(180deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 100%)'
      },
      boxShadow: {
        'luxury-shadow': '0 10px 30px -10px rgba(255, 107, 0, 0.25)',
        'luxury-gold-shadow': '0 10px 30px -10px rgba(212, 175, 55, 0.25)',
        'premium-glow': '0 0 25px 0 rgba(255, 107, 0, 0.15)'
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':       { transform: 'translateY(-20px) rotate(5deg)' }
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':       { transform: 'translateY(-10px) rotate(-5deg)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px 0 rgba(255, 107, 0, 0.2)' },
          '50%':       { boxShadow: '0 0 30px 10px rgba(255, 107, 0, 0.4)' }
        },
        'gold-shimmer': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(-15px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      animation: {
        'float-slow':     'float-slow 8s ease-in-out infinite',
        'float-fast':     'float-fast 4s ease-in-out infinite',
        'pulse-glow':     'pulse-glow 3s infinite',
        'gold-shimmer':   'gold-shimmer 4s linear infinite',
        'fade-up':        'fade-up 0.6s ease-out both',
        'slide-in-right': 'slide-in-right 0.4s ease both'
      }
    },
  },
  plugins: [],
}