import { useRef } from 'react'
import { person, cvUrl } from '../data/portfolio'
import { profile } from '../data/site'
import { floatCloud, gsap, isMobile, prefersReducedMotion, useGSAP } from '../lib/gsap'
import Cloud from '../components/Cloud'
import h from '../components/Hero.module.css'
import s from './Portfolio.module.css'

const HELLO = 'opa!'
const FETCH_HIGH = { fetchpriority: 'high' }
const EXT = { target: '_blank', rel: 'noopener' }

// Mesmo visual do Hero da home (reaproveita Hero.module.css); sem pré-loader, a entrada toca na hora.
export default function PHero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const q = (cls: string) => `.${h[cls]}`
      const img = root.current!.querySelector(`${q('hero__portrait')} img`)!

      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from(img, { yPercent: 18, opacity: 0, duration: 1.2 })
        .from(q('hero__card'), { y: 40, opacity: 0, duration: 0.9 }, 0.15)
        .from('[data-ch]', { yPercent: 110, rotate: (i: number) => (i % 2 ? 12 : -12), duration: 0.9, stagger: 0.07, ease: 'back.out(2)' }, 0.35)
        .from(`${q('hero__intro')}, ${q('hero__actions')}`, { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.7)
        .from(q('hero__status'), { yPercent: 100, duration: 0.6 }, 0.9)

      const clouds = gsap.utils.toArray<SVGSVGElement>('.cloud')
      clouds.forEach((c, i) => floatCloud(c, i))

      if (isMobile()) return
      const hero = root.current!
      const xTo = gsap.quickTo(img, 'x', { duration: 0.9, ease: 'power3' })
      const rTo = gsap.quickTo(img, 'rotation', { duration: 0.9, ease: 'power3' })
      const onMove = (e: MouseEvent) => {
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
    <section ref={root} className={h.hero} id="topo">
      <div className={h.sky} aria-hidden="true">
        <Cloud className={h['cloud--a']} />
        <Cloud className={h['cloud--b']} />
        <Cloud className={h['cloud--c']} />
        <div className={`${h.sky__band} ${h['sky__band--1']}`}></div>
        <div className={`${h.sky__band} ${h['sky__band--2']}`}></div>
      </div>

      <figure className={`${h.hero__portrait} ${s.portrait}`}>
        <img src="/assets/retrato.webp" width={892} height={1119} alt="Ilustração de Diogo Henrique Silva sorrindo, de moletom preto" {...FETCH_HIGH} />
      </figure>

      <div className={h.hero__card}>
        <p className={h.hero__hello} aria-hidden="true">
          {[...HELLO].map((c, i) => (
            <span key={i} data-ch="" style={{ display: 'inline-block' }}>{c}</span>
          ))}
        </p>
        <hr className="dash" />
        <div className={h.hero__intro}>
          <h1 className={s.name}>{person.name}</h1>
          <p className={s.role}>{person.role}</p>
          <p className={s.pitch}>{person.pitch}</p>
        </div>
        <div className={h.hero__actions}>
          <a className={`btn btn--sun ${s.full}`} href={cvUrl} {...EXT}>
            Baixar currículo <span aria-hidden="true">↓</span>
          </a>
          <a className={`btn btn--ghost ${s.half}`} href={profile.linkedin} {...EXT}>LinkedIn</a>
          <a className={`btn btn--ghost ${s.half}`} href={profile.github} {...EXT}>GitHub</a>
        </div>
      </div>

      <p className={h.hero__status}>{person.location}</p>
    </section>
  )
}
