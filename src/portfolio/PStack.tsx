import { stackGroups } from '../data/portfolio'
import { useReveal } from './useReveal'
import s from './Portfolio.module.css'

export default function PStack() {
  const root = useReveal(`.${s.group}`)

  return (
    <section ref={root} className="section section--cream" id="stack">
      <div className="wrap">
        <header className="section__head">
          <p className="label">Stack</p>
          <h2 className="h2">Com o que eu trabalho</h2>
        </header>
        <div className={s.stack}>
          {stackGroups.map((g) => (
            <div key={g.title} className={s.group}>
              <h3 className={`${s.group__title} cond`}>{g.title}</h3>
              <ul className="chips">
                {g.items.map((t) => <li key={t} className="tag cond">{t}</li>)}
              </ul>
              {g.aside && (
                <div className={s.aside}>
                  <p className={`${s.aside__note} cond`}>{g.aside.note}</p>
                  <ul className="chips">
                    {g.aside.items.map((t) => <li key={t} className={`tag cond ${s.tag__dashed}`}>{t}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
