import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { finishIntro, markIntroSeen, showPreloader } from '../lib/intro'
import Logo from './Logo'
import styles from './Preloader.module.css'

// --accent, --green e --ink de tokens.css (o GSAP não anima var()).
const COLORS = ['#ff8a3d', '#12875a', '#0b0b0f']
const MIN_MS = 1400
const MAX_MS = 7000

const pageLoaded = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', () => resolve(), { once: true })
  })

const imagesReady = () => Promise.all(Array.from(document.images).map((img) => img.decode().catch(() => undefined)))

export default function Preloader() {
  const [gone, setGone] = useState(!showPreloader)
  const root = useRef<HTMLDivElement>(null)
  const mark = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showPreloader) return
    let alive = true
    let out: gsap.core.Timeline | null = null
    const timers: number[] = []
    const wait = (ms: number) => new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, ms)))

    const el = mark.current!
    const parts = [el.querySelector('[data-mark="d"]'), el.querySelector('[data-mark="h"]')]

    // Espera: troca de cor + d e h "respirando" em sequência
    gsap.set(el, { color: COLORS[0] })
    const colors = gsap.timeline({ repeat: -1 })
    colors.to(el, { color: COLORS[1], duration: 0.8, ease: 'power1.inOut' })
    colors.to(el, { color: COLORS[2], duration: 0.8, ease: 'power1.inOut' })
    colors.to(el, { color: COLORS[0], duration: 0.8, ease: 'power1.inOut' })
    const bounce = gsap.to(parts, { y: -7, duration: 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.18 })

    const assets = Promise.all([document.fonts?.ready, pageLoaded(), imagesReady()])
    Promise.race([Promise.all([wait(MIN_MS), assets]), wait(MAX_MS)]).then(() => {
      if (!alive) return
      colors.kill()
      bounce.kill()
      // Saída: d e h sobem em sequência, a cortina sobe e o hero entra por baixo dela
      out = gsap.timeline({
        onComplete: () => {
          markIntroSeen()
          setGone(true)
        },
      })
      out
        .to(parts, { y: -36, opacity: 0, duration: 0.45, ease: 'power3.in', stagger: 0.12 })
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '>-0.05')
        .add(finishIntro, '<0.35')
    })

    return () => {
      alive = false
      timers.forEach(clearTimeout)
      colors.kill()
      bounce.kill()
      out?.kill()
    }
  }, [])

  if (gone) return null
  return (
    <div ref={root} className={styles.preloader} role="status" aria-label="Carregando">
      <div ref={mark} className={styles.mark}>
        <Logo />
      </div>
    </div>
  )
}
