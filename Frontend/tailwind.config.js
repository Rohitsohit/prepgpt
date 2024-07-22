/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        typewriter: 'typewriter 2s steps(11) forwards',
        'puff-out-center': 'puff-out-center .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) both',
        caret: 'typewriter 2s steps(11) forwards, blink 1s steps(11) infinite 2s',
      },
      keyframes: {

        'puff-out-center': {
          '0%': {
            transform: 'scale(1)',
            filter: 'blur(0px)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(9)',
            filter: 'blur(1px)',
            opacity: '0',
          },
        },

        typewriter: {
          to: {
            left: '100%',
          },
        },
        blink: {
          '0%': {
            opacity: '0',
          },
          '0.1%': {
            opacity: '1',
          },
          '50%': {
            opacity: '1',
          },
          '50.1%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}

