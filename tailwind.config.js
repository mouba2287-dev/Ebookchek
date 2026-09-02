/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bgLight: '#FAF3E7',
        bgDark: '#12122B',
        accentPrimary: '#F2A93B',
        accentAlert: '#E85C4A',
        accentSuccess: '#2F9E68',
        textPrimary: '#1B1B2F',
      },
      fontFamily: {
        title: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-public-sans)', 'sans-serif'],
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
    },
  },
  plugins: [],
}
