// Pré-loader de primeiro acesso + "portão" que segura a entrada do hero até ele terminar.
const STORAGE_KEY = 'dh:intro-seen'
const FAILSAFE_MS = 10000

function alreadySeen() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function markIntroSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* navegação privada / storage bloqueado: só perde o "já vi" */
  }
}

/** Só no primeiro acesso e nunca com prefers-reduced-motion. */
export const showPreloader = !alreadySeen() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

let release!: () => void

/** Resolve quando o conteúdo pode começar a animar (na hora, se não há pré-loader). */
export const introDone: Promise<void> = new Promise<void>((resolve) => {
  release = resolve
})

export const finishIntro = () => release()

// Se algo der errado no pré-loader, o site nunca fica preso escondido.
if (showPreloader) setTimeout(release, FAILSAFE_MS)
else release()
