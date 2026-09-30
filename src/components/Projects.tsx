import { useRef } from 'react'
import { projects } from '../data/site'
import { gsap, prefersReducedMotion, revealSectionHead, useGSAP } from '../lib/gsap'
import ProjectRow from './ProjectRow'
import styles from './Projects.module.css'

export default function Projects() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('.section__head').forEach(revealSectionHead)
      gsap.utils.toArray<HTMLElement>(`.${styles.proj}`).forEach((row) => {
        gsap.from(row, { y: 28, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 88%' } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="section section--cream section--tight" id="projetos">
      <div className="wrap">
        <header className="section__head">
          <p className="label">Projetos</p>
          <h2 className="h2">Coisas que já estão rodando</h2>
        </header>
        <ol className={styles.projects}>
          {projects.map((p, i) => (
            <ProjectRow key={p.name} project={p} index={i} total={projects.length} />
          ))}
        </ol>
      </div>
    </section>
  )
}
