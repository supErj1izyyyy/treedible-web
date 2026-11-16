import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Memastikan path asset relatif agar kompatibel dengan GitHub Pages
  plugins: [
    react(),
    tailwindcss(),
  ],
})
