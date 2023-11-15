import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        primary:"#ef5327",
        secondary:'#818589'
      },
       fontFamily:{
        roboto:['var(--font-roboto)']
       }
    },
  },
  plugins: [],
}
export default config
