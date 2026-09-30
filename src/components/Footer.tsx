import { useId, useRef, type MouseEvent } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { scrollToHash } from '../lib/scroll'
import styles from './Footer.module.css'

function onAnchorClick(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href')
  if (href && scrollToHash(href)) e.preventDefault()
}

export default function Footer() {
  const root = useRef<HTMLElement>(null)
  const mark = useRef<HTMLDivElement>(null)
  const clipId = useId()

  // Wordmark do rodapé desliza com o scroll
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(mark.current, { xPercent: 6 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: 1 } })
    },
    { scope: root },
  )

  return (
    <footer ref={root} className={styles.footer}>
      <div ref={mark} className={styles.footer__mark} aria-hidden="true">
        {/* Mesmo desenho do Logo: traço da cor do fundo por cima de um traço maior da cor de destaque = contorno */}
        <svg viewBox="0 0 198 140">
          <clipPath id={clipId}><rect x="-10" y="-10" width="220" height="150" /></clipPath>
          <g clipPath={`url(#${clipId})`} fill="none" strokeLinecap="round">
            {[
              { stroke: 'var(--accent)', width: 31 },
              { stroke: 'var(--ink)', width: 26 },
            ].map(({ stroke, width }) => (
              <g key={width} stroke={stroke} strokeWidth={width}>
                <circle cx="45" cy="97" r="30" />
                <line x1="75" y1="13" x2="75" y2="160" />
                <line x1="118" y1="13" x2="118" y2="160" />
                <path d="M118 160V100a32 32 0 0 1 64 0v60" />
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div className={`${styles.footer__row} wrap`}>
        <span>© 2026 Diogo Henrique</span>
        <span>Feito em Belém do Pará</span>
        <a href="#topo" onClick={onAnchorClick}>Voltar ao topo ↑</a>
      </div>
    </footer>
  )
}
