/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#FFFFFF',  // White color
        'gradient-mid1': '#F6EAE3',
        'gradient-mid2': '#FFEFE0',
        'gradient-end': '#FFEFE0',
      },
    },
  },
  plugins: [],
};
