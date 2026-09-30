import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Registro único dos plugins. Importe gsap/ScrollTrigger/useGSAP sempre daqui.
gsap.registerPlugin(ScrollTrigger, useGSAP)

/** legacy: `reduceMotion` — com reduce, nenhuma animação roda (animate() retornava cedo). */
export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** legacy: `isMobile` — sem Lenis e sem o retrato seguindo o mouse. */
export const isMobile = () => window.matchMedia('(max-width: 900px)').matches || 'ontouchstart' in window

export { gsap, ScrollTrigger, useGSAP }

/**
 * legacy: nuvens flutuando. `i` é o índice da nuvem entre TODAS as `.cloud` da página, na ordem do documento
 * (hero a/b/c = 0..2, contato d/e = 3..4).
 */
export function floatCloud(cloud: Element, i: number) {
  return gsap.to(cloud, { x: i % 2 ? -40 : 50, duration: 14 + i * 3, repeat: -1, yoyo: true, ease: 'sine.inOut' })
}

/** legacy: "Reveal por seção" — filhos de cada `.section__head` sobem em sequência. */
export function revealSectionHead(head: Element) {
  return gsap.from(head.children, { y: 32, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: head, start: 'top 82%' } })
}
