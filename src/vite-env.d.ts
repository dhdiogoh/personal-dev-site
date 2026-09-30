/// <reference types="vite/client" />
// Tipos de ambiente — Vite client cobre *.module.css, assets etc.

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
