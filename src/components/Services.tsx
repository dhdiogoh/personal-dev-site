import { useRef } from 'react'
import { services } from '../data/site'
import { gsap, prefersReducedMotion, revealSectionHead, useGSAP } from '../lib/gsap'
import ServiceCard from './ServiceCard'
import styles from './Services.module.css'

export default function Services() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('.section__head').forEach(revealSectionHead)
      // legacy: gsap.from('.svc', { y: 60, opacity: 0, ... }). Aqui é fromTo com o destino explícito: o .svc tem
      // `transition: transform`, e quando o ScrollTrigger.refresh() reverte o tween no meio dessa transição o from
      // relia y≈60 como estado final (o legado deixa os cards presos 60px abaixo). clearProps no fim devolve o
      // transform ao CSS, pro :hover (translate -4px) voltar a funcionar.
      gsap.fromTo(
        `.${styles.svc}`,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out', clearProps: 'transform', scrollTrigger: { trigger: `.${styles.services}`, start: 'top 80%' } },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} className="section section--cream" id="servicos">
      <div className="wrap">
        <header className="section__head">
          <p className="label">Serviços</p>
          <h2 className="h2">O que eu faço</h2>
          <p className="section__lead">
            Seis formas de colocar tecnologia pra trabalhar no seu negócio. Escolha uma e eu te faço as perguntas certas.
          </p>
        </header>
        <div className={styles.services}>
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} total={services.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
