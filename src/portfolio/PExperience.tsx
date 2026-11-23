import { experience } from '../data/portfolio'
import { useReveal } from './useReveal'
import s from './Portfolio.module.css'

export default function PExperience() {
  const root = useReveal(`.${s.tl}`)

  return (
    <section ref={root} className="section section--cream section--tight" id="experiencia">
      <div className="wrap">
        <header className="section__head">
          <p className="label">Experiência</p>
          <h2 className="h2">Onde eu trabalhei</h2>
        </header>
        <ol className={s.timeline}>
          {experience.map((e) => (
            <li key={e.company} className={s.tl}>
              <p className={`${s.tl__period} cond`}>{e.period}</p>
              <div className={s.tl__body}>
                <h3 className={s.tl__role}>{e.role}</h3>
                <p className={s.tl__company}>{e.company}</p>
                <ul className={s.tl__list}>
                  {e.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <div className={s.tags}>
                  {e.tags.map((t) => <span key={t} className="tag cond">{t}</span>)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
