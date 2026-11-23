import { caseStudies } from '../data/portfolio'
import { useReveal } from './useReveal'
import s from './Portfolio.module.css'

export default function PProjects() {
  const root = useReveal(`.${s.card}`)
  const total = caseStudies.length

  return (
    <section ref={root} className="section section--ink" id="projetos">
      <div className="wrap">
        <header className="section__head">
          <p className="label">Projetos</p>
          <h2 className="h2">O que eu construí</h2>
        </header>
        <ol className={s.cards}>
          {caseStudies.map((p, i) => (
            <li key={p.name} className={s.card}>
              <div className={`${s.card__head} cond`}>
                <span>{p.context}</span>
                <span aria-hidden="true">{`${i + 1}/${total}`}</span>
              </div>
              <div className={s.card__body}>
                <h3 className={s.card__name}>{p.name}</h3>
                <dl className={s.card__facts}>
                  <div>
                    <dt>Problema</dt>
                    <dd>{p.problem}</dd>
                  </div>
                  <div>
                    <dt>O que construí</dt>
                    <dd>{p.built}</dd>
                  </div>
                </dl>
                <div className={s.tags} aria-label="Stack">
                  {p.stack.map((t) => <span key={t} className="tag cond">{t}</span>)}
                </div>
                {p.link && (
                  <a className={`${s.card__link} cond`} href={p.link.href} target="_blank" rel="noopener">
                    {p.link.label} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
              <div className={s.card__result}>
                <p className="label">Resultado</p>
                <p className={s.card__resultText}>{p.result}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
