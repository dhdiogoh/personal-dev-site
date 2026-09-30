import { useRef } from 'react'
import { profile } from '../data/site'
import { floatCloud, gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import Cloud from './Cloud'
import LeadForm from './LeadForm'
import styles from './Contact.module.css'

// Port de renderContactLinks (legacy/app.js). target/rel só nos links http.
const contactLinks: [string, string, string][] = [
  ['WhatsApp', profile.whatsappLabel, `https://wa.me/${profile.whatsapp}`],
  ['E-mail', profile.email, `mailto:${profile.email}`],
  ['LinkedIn', 'diogohenriquebx', profile.linkedin],
  ['GitHub', 'dhdiogoh', profile.github],
]

// Índice das nuvens do contato entre todas as `.cloud` da página (as 3 do hero vêm antes).
const CLOUD_OFFSET = 3

export default function Contact() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<SVGSVGElement>('.cloud').forEach((c, i) => floatCloud(c, CLOUD_OFFSET + i))
      gsap.from(`.${styles.contact__title}`, { yPercent: 30, opacity: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: root.current, start: 'top 75%' } })
    },
    { scope: root },
  )

  return (
    <section ref={root} className={styles.contact} id="contato">
      <div className={styles.sky} aria-hidden="true">
        <Cloud className={styles['cloud--d']} />
        <Cloud className={styles['cloud--e']} />
      </div>
      <div className={`wrap ${styles.contact__grid}`}>
        <div className={styles.contact__intro}>
          <h2 className={styles.contact__title}>
            bora
            <br />
            fazer?
          </h2>
          <p className={styles.contact__text}>
            Responde umas perguntas rápidas sobre o seu projeto. Eu leio tudo e volto com uma proposta pensada pro seu caso,
            geralmente em até 2 dias úteis.
          </p>
        </div>

        <LeadForm />

        <ul className={styles.contact__links}>
          {contactLinks.map(([k, v, href]) => (
            <li key={k}>
              <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
                <b>{k}</b>
                <span>{v}</span>
              </a>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
