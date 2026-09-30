import { useRef, type MouseEvent } from 'react'
import { floatCloud, gsap, isMobile, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { introDone } from '../lib/intro'
import { scrollToHash } from '../lib/scroll'
import Cloud from './Cloud'
import styles from './Hero.module.css'

function onAnchorClick(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href')
  if (href && scrollToHash(href)) e.preventDefault()
}

// "opa!" já sai separado em letras (legacy fazia o split em runtime). O h1 carrega o texto acessível.
const HELLO = 'opa!'
// React 18 não conhece a prop fetchPriority (avisa no console); o atributo minúsculo passa direto pro DOM.
const FETCH_HIGH = { fetchpriority: 'high' }

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const q = (cls: string) => `.${styles[cls]}`
      const img = root.current!.querySelector(`${q('hero__portrait')} img`)!

      // Entrada do hero: letras do "opa!" pulam uma a uma
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } })
      tl.from(img, { yPercent: 18, opacity: 0, duration: 1.2 })
        .from(q('hero__card'), { y: 40, opacity: 0, duration: 0.9 }, 0.15)
        .from('[data-ch]', { yPercent: 110, rotate: (i: number) => (i % 2 ? 12 : -12), duration: 0.9, stagger: 0.07, ease: 'back.out(2)' }, 0.35)
        .from(`${q('hero__intro')}, ${q('hero__actions')}`, { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.7)
        .from(q('hero__status'), { yPercent: 100, duration: 0.6 }, 0.9)
      // No primeiro acesso a entrada espera o pré-loader (sem pré-loader, libera na hora)
      introDone.then(() => tl.play())

      // Nuvens flutuando (índices 0..2 da página)
      const clouds = gsap.utils.toArray<SVGSVGElement>('.cloud')
      clouds.forEach((c, i) => floatCloud(c, i))

      // Retrato acompanha o mouse (desktop)
      if (isMobile()) return
      const hero = root.current!
      const xTo = gsap.quickTo(img, 'x', { duration: 0.9, ease: 'power3' })
      const rTo = gsap.quickTo(img, 'rotation', { duration: 0.9, ease: 'power3' })
      // Tweens dos listeners nascem fora do contexto do useGSAP: são mortos à mão no cleanup.
      const onMove = (e: globalThis.MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        xTo(nx * 24)
        rTo(nx * 2.2)
        clouds.forEach((c, i) => gsap.to(c, { xPercent: nx * (6 + i * 4), duration: 1.2, ease: 'power2.out', overwrite: 'auto' }))
      }
      const onLeave = () => {
        xTo(0)
        rTo(0)
      }
      hero.addEventListener('mousemove', onMove)
      hero.addEventListener('mouseleave', onLeave)
      return () => {
        hero.removeEventListener('mousemove', onMove)
        hero.removeEventListener('mouseleave', onLeave)
        gsap.killTweensOf(clouds, 'xPercent')
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} className={styles.hero} id="topo">
      <div className={styles.sky} aria-hidden="true">
        <Cloud className={styles['cloud--a']} />
        <Cloud className={styles['cloud--b']} />
        <Cloud className={styles['cloud--c']} />
        <div className={`${styles.sky__band} ${styles['sky__band--1']}`}></div>
        <div className={`${styles.sky__band} ${styles['sky__band--2']}`}></div>
      </div>

      <figure className={styles.hero__portrait}>
        <img src="/assets/retrato.webp" width={892} height={1119} alt="Ilustração de Diogo Henrique sorrindo, de moletom preto" {...FETCH_HIGH} />
      </figure>

      <div className={styles.hero__card}>
        <h1 className={styles.hero__hello} aria-label={HELLO}>
          <span aria-hidden="true">
            {[...HELLO].map((c, i) => (
              <span key={i} data-ch="" style={{ display: 'inline-block' }}>
                {c}
              </span>
            ))}
          </span>
        </h1>
        <hr className="dash" />
        <p className={styles.hero__intro}>
          Eu sou o <strong>Diogo Henrique</strong>, desenvolvedor full stack e engenheiro de IA em Belém do Pará.
          Crio plataformas, agentes de IA e automações sob medida que resolvem problema de verdade, da ideia ao lançamento.
        </p>
        <div className={styles.hero__actions}>
          <a className="btn btn--sun" href="#contato" onClick={onAnchorClick}>Contar meu projeto <span aria-hidden="true">→</span></a>
          <a className="btn btn--ghost" href="#servicos" onClick={onAnchorClick}>Ver serviços</a>
        </div>
      </div>

      <p className={styles.hero__status}><span className={styles.dot} aria-hidden="true"></span> Disponível para novos projetos</p>
    </section>
  )
}
