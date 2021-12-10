module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,scss}'
  ],
  whitelist: ['bg-white', 'bg-transparent', 'opacity-0', 'opacity-100', 'transition-all'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ["group-hover"]
    },
  },
  plugins: [],
}
