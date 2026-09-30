import type { Service } from '../types/site'
import { useLeadIntent } from '../context/LeadIntent'
import styles from './Services.module.css'

interface ServiceCardProps {
  service: Service
  index: number
  total: number
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function ServiceCard({ service, index, total }: ServiceCardProps) {
  const { pickService } = useLeadIntent()
  const { id, title, pitch, useCases, stack, flow } = service

  return (
    <article className={styles.svc} id={`svc-${id}`}>
      <div className={`${styles.svc__top} cond`}>
        <span className={styles.svc__idx}>{`${pad(index + 1)}/${pad(total)}`}</span>
      </div>
      <div className={styles.svc__body}>
        <h3 className={styles.svc__title}>{title}</h3>
        <p className={styles.svc__pitch}>{pitch}</p>
        <ul className={styles.svc__uses} aria-label="Casos de uso">
          {useCases.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </div>
      <div className={styles.svc__stack}>
        {stack.map((t) => (
          <span key={t} className="tag cond">
            {t}
          </span>
        ))}
      </div>
      <div className={styles.svc__foot}>
        <span className={`${styles.svc__flow} cond`}>
          {flow[0]}{' '}
          <svg viewBox="0 0 28 10" aria-hidden="true">
            <path d="M0 5h25M21 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>{' '}
          {flow[1]}
        </span>
        <button className={`${styles.svc__cta} cond`} type="button" onClick={() => pickService(id)}>
          Quero esse <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  )
}
