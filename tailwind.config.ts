import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    backgroundImage: {
      'car_logo': "url('../img/logo.png')",
      'car_home': "url('../img/home.png')",
    },
    extend: {
      colors: {
      'primary-red': '#F3133C',
      'primary-gray': '#2D2D37',
      },
    },
  },
  plugins: [],
}
export default config
