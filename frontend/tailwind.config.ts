import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'main-color': '#F16F50',
        'sec-color': '#FDC8B4',
        'bg-color': '#ffefe7',
        'selected-btn': '#F8AD96',
        'tasks-color': '#fbdad0'
      },
      width: {
        'max-width': '1024px',
        'w-box': '800px',
        'box-upd': '1000px',
      },
    },
  },
  plugins: [],
}
export default config
