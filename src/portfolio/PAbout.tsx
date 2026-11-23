import { about } from '../data/portfolio'
import { useReveal } from './useReveal'
import s from './Portfolio.module.css'

export default function PAbout() {
  const root = useReveal()

  return (
    <section ref={root} className="section section--cream" id="sobre">
      <div className="wrap">
        <header className={`section__head ${s.flush}`}>
          <p className="label">Sobre</p>
          <h2 className="h2">Da conversa com o negócio ao deploy.</h2>
          <p className={`section__lead ${s.lead}`}>{about}</p>
        </header>
      </div>
    </section>
  )
}
