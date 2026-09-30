import { useRef, type MouseEvent } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { scrollToHash } from '../lib/scroll'
import Logo from './Logo'
import styles from './Footer.module.css'

function onAnchorClick(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href')
  if (href && scrollToHash(href)) e.preventDefault()
}

export default function Footer() {
  const root = useRef<HTMLElement>(null)
  const mark = useRef<HTMLDivElement>(null)

  // Logo entra ao rolar até o rodapé: primeiro o d, depois o h
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const parts = mark.current!.querySelectorAll('[data-mark]')
      gsap.from(parts, {
        y: 44,
        opacity: 0,
        duration: 0.8,
        stagger: 0.28,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 92%', once: true },
      })
    },
    { scope: root },
  )

  return (
    <footer ref={root} className={styles.footer}>
      <div ref={mark} className={styles.footer__mark} aria-hidden="true">
        <Logo />
      </div>
      <div className={`${styles.footer__row} wrap`}>
        <span>© 2026 Diogo Henrique</span>
        <span>Feito em Belém do Pará</span>
        <a href="#topo" onClick={onAnchorClick}>Voltar ao topo ↑</a>
      </div>
    </footer>
  )
}
