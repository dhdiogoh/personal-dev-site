import { useRef } from 'react'
import { gsap, prefersReducedMotion, revealSectionHead, useGSAP } from '../lib/gsap'

/**
 * Mesmo padrão de reveal da home: o `.section__head` sobe em sequência e cada item
 * de `itemSelector` entra ao chegar na tela. Devolve o ref da <section>.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(itemSelector?: string) {
  const root = useRef<T>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('.section__head').forEach(revealSectionHead)
      if (!itemSelector) return
      gsap.utils.toArray<HTMLElement>(itemSelector).forEach((el) => {
        gsap.from(el, { y: 28, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
      })
    },
    { scope: root },
  )

  return root
}
