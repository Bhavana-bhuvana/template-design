/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        'primary':["Poppins","sans-serif"],
        'secondary':["Syne","sans-serif"]
      },
      colors:{
        'heroBG':"#2b2b2b",
        'para':"rgb(0 0 0 / 80%)",
        'primary':"#06a055",
        'secondary':"#f9e1b9",
        'coffee-brown':"#4B3621"
      }
    },
  },
  plugins: [],
}

