import type Lenis from 'lenis'

// Rolagem até âncoras, respeitando o offset da nav. A fase de animação registra o Lenis aqui.
let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

export function scrollToEl(el: HTMLElement) {
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0
  const offset = el.id === 'topo' ? 0 : -navH
  if (lenis) {
    lenis.scrollTo(el, { offset })
    return
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduce ? 'auto' : 'smooth' })
}

/** Handler para <a href="#id">: rola suave em vez do salto padrão. */
export function scrollToHash(hash: string) {
  const el = document.getElementById(hash.replace(/^#/, ''))
  if (el) scrollToEl(el)
  return Boolean(el)
}
