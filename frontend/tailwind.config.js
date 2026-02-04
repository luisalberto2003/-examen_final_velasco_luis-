/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto incluye todos tus archivos en src
  ],
  theme: {
    extend: {
      // Aquí podrías agregar colores personalizados si quisieras
    },
  },
  plugins: [],
}