/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily: {
        mulish: [ 'Mulish', "sans-serif"],
        serif: ['Merriweather', 'serif'],
      },  blur: {
        xs: '2px',
        lg: '4px'
      },backgroundColor: { 
        blur : "rgba(255 , 255 , 255 , 0.15)"
      },
    },
  },
  plugins: [],
}

