import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'orange': '#fca311',
      'black': '#000000',
      'gray-dark': '#14213d',
      'gray-light': '#e5e5e5',
      'white': '#ffffff',
    },
    fontFamily: {
      sans: ['Helvetica', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      boxShadow: {
        inner: 'inset 0 0 10px 0 rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
export default config;
