import type { Project } from '../types/site'
import styles from './Projects.module.css'

interface ProjectRowProps {
  project: Project
  index: number
  total: number
}

export default function ProjectRow({ project, index, total }: ProjectRowProps) {
  const { name, client, summary, tags } = project

  return (
    <li className={styles.proj}>
      <div className={styles.proj__head}>
        <h3 className={styles.proj__name}>{name}</h3>
        <p className={styles.proj__client}>{client}</p>
      </div>
      <div className={styles['proj__summary-wrap']}>
        <p className={styles.proj__summary}>{summary}</p>
        <div className={styles.proj__tags}>
          {tags.map((t) => (
            <span key={t} className="tag cond">
              {t}
            </span>
          ))}
        </div>
      </div>
      <span className={`${styles.proj__n} cond`}>{`${index + 1}/${total}`}</span>
    </li>
  )
}
