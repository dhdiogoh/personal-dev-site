import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // Vendors em chunks próprios (cacheáveis e abaixo do limite de 500 kB por chunk).
        codeSplitting: {
          groups: [
            { name: 'supabase', test: /node_modules[\/]@supabase[\/]/ },
            { name: 'motion', test: /node_modules[\/](gsap|@gsap|lenis)[\/]/ },
            { name: 'react', test: /node_modules[\/](react|react-dom|scheduler)[\/]/ },
          ],
        },
      },
    },
  },
})
