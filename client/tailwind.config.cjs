module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        quickSand: ["'Quicksand', sans-serif"]
      },
      colors: {
        main: '#ed1c24',
        text: '#252a2b',
        title: '#000000',
        hover: '#ed1c24',
        button: '#000000',
        border: '#e7e7e7',
        ftitle: '#ffffff',
        ftext: '#999999',
        fbg: '#1a1a1a',
        topBar: "#f5f5f5"
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
