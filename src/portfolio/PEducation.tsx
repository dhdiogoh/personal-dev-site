import { education, languages } from '../data/portfolio'
import Logo from '../components/Logo'
import { useReveal } from './useReveal'
import a from '../components/About.module.css'
import s from './Portfolio.module.css'

// Cartões no estilo da "Ficha técnica" da home (reaproveita About.module.css).
export default function PEducation() {
  const root = useReveal(`.${a.spec}`)

  return (
    <section ref={root} className="section section--ink" id="formacao">
      <div className="wrap">
        <header className="section__head">
          <p className="label">Base</p>
          <h2 className="h2">Formação e idiomas</h2>
        </header>
        <div className={s.edu}>
          <article className={a.spec}>
            <div className={a.spec__head}>
              <h3 className={s.spec__title}>Formação</h3>
              <Logo />
            </div>
            <dl className={a.spec__list}>
              <div><dt>Curso</dt><dd>{education.course}</dd></div>
              <div><dt>Onde</dt><dd>{education.school}</dd></div>
              <div><dt>Período</dt><dd>{education.period}</dd></div>
            </dl>
          </article>
          <article className={a.spec}>
            <div className={a.spec__head}>
              <h3 className={s.spec__title}>Idiomas</h3>
              <Logo />
            </div>
            <dl className={a.spec__list}>
              {languages.map(([lang, level]) => (
                <div key={lang}><dt>{lang}</dt><dd>{level}</dd></div>
              ))}
            </dl>
          </article>
        </div>
      </div>
    </section>
  )
}
