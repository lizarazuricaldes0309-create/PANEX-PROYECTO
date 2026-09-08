/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        masa: '#FBF3E4',      // crema de masa - fondo principal
        crema: '#FFFDF8',     // blanco cálido - tarjetas
        horno: '#3B2A21',     // café horno - texto y footer
        horno2: '#5C4433',    // café más claro para texto secundario
        amaranto: '#A32638',  // rojo amaranto - acento principal
        amaranto2: '#7E1C2B', // rojo amaranto oscuro (hover)
        trigo: '#D9A441',     // dorado trigo - acento secundario
        andino: '#4E6B4F',    // verde andino - etiquetas / éxito
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 12px 30px -12px rgba(59, 42, 33, 0.35)',
      },
      backgroundImage: {
        masa: "radial-gradient(circle at 15% 20%, #FFF7E8 0%, #FBF3E4 45%, #F3E4C9 100%)",
      },
    },
  },
  plugins: [],
}
