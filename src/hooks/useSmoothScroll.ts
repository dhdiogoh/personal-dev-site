import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, isMobile, prefersReducedMotion } from '../lib/gsap'
import { setLenis } from '../lib/scroll'

/**
 * Port do bloco Lenis de animate() (legacy/app.js) + refresh dos ScrollTriggers depois de fontes e imagens.
 * Usar uma única vez, no App.
 */
export function useSmoothScroll() {
  // Fontes e imagens mudam a altura das seções: recalcula as posições dos triggers quando carregarem.
  useEffect(() => {
    let alive = true
    const refresh = () => {
      if (alive) ScrollTrigger.refresh()
    }
    document.fonts?.ready.then(refresh)
    if (document.readyState !== 'complete') window.addEventListener('load', refresh, { once: true })
    return () => {
      alive = false
      window.removeEventListener('load', refresh)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion() || isMobile()) return

    let lenis: Lenis
    try {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    } catch {
      return
    }
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    setLenis(lenis)

    return () => {
      setLenis(null)
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33) // padrão do gsap
      lenis.destroy()
    }
  }, [])
}
