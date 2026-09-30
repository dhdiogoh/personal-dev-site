import { useRef } from 'react'
import { stack } from '../data/site'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import Logo from './Logo'
import styles from './About.module.css'

export default function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from(`.${styles.about__text} > *`, { y: 32, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: `.${styles.about}`, start: 'top 78%' } })
      gsap.from(`.${styles.spec}`, { y: 40, rotate: 2, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: `.${styles.spec}`, start: 'top 85%' } })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="section section--ink" id="sobre">
      <div className={`wrap ${styles.about}`}>
        <div className={styles.about__text}>
          <p className="label label--sun">Sobre</p>
          <h2 className="h2">Da ideia ao lançamento, sem ficar no meio do caminho.</h2>
          <p>Sou desenvolvedor full stack com foco em backend, agentes de IA e automação. Nos últimos anos construí de SaaS multi-tenant a ecossistemas de agentes rodando em produção, para clientes que vão de startups a instituições de médio porte.</p>
          <p>Gosto de entender o problema antes de escrever a primeira linha. Depois disso, desenho a arquitetura, integro APIs, banco e autenticação, e entrego funcionando, com testes e documentação.</p>
        </div>

        <aside className={styles.spec} aria-label="Ficha técnica">
          <div className={styles.spec__head}>
            <span>Ficha técnica</span>
            <Logo />
          </div>
          <dl className={styles.spec__list}>
            <div><dt>Função</dt><dd>Full Stack & Engenheiro de IA</dd></div>
            <div><dt>Base</dt><dd>Belém do Pará, BR</dd></div>
            <div><dt>Formação</dt><dd>ADS · UNAMA (dez/2026)</dd></div>
            <div><dt>Idiomas</dt><dd>Português · Inglês B1</dd></div>
          </dl>
          <ul className="chips">
            {stack.map((t) => (
              <li key={t} className="tag cond">{t}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
