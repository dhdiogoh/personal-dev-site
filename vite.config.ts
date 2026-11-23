import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Connect, type Plugin } from 'vite'

// Em dev/preview o fallback de SPA mandaria /portfolio (sem barra) para a home.
// Reescreve para portfolio/index.html, igual ao rewrite do vercel.json em produção.
const portfolioRoute: Connect.NextHandleFunction = (req, _res, next) => {
  if (req.url === '/portfolio' || req.url?.startsWith('/portfolio?')) req.url = req.url.replace('/portfolio', '/portfolio/')
  next()
}
const portfolioRewrite: Plugin = {
  name: 'portfolio-rewrite',
  configureServer: (server) => void server.middlewares.use(portfolioRoute),
  configurePreviewServer: (server) => void server.middlewares.use(portfolioRoute),
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), portfolioRewrite],
  build: {
    rolldownOptions: {
      // Duas páginas: a home (serviços) e /portfolio, cada uma com o próprio <head> (SEO e Open Graph).
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        portfolio: fileURLToPath(new URL('./portfolio/index.html', import.meta.url)),
      },
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
