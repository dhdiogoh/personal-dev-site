import { useRef } from 'react'
import { cvUrl } from '../data/portfolio'
import { profile } from '../data/site'
import { floatCloud, gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import Cloud from '../components/Cloud'
import c from '../components/Contact.module.css'
import s from './Portfolio.module.css'

const links: [string, string, string][] = [
  ['E-mail', profile.email, `mailto:${profile.email}`],
  ['WhatsApp', profile.whatsappLabel, `https://wa.me/${profile.whatsapp}`],
  ['LinkedIn', 'diogohenriquebx', profile.linkedin],
  ['GitHub', 'dhdiogoh', profile.github],
]

// Índice das nuvens do contato entre todas as `.cloud` da página (as 3 do hero vêm antes).
const CLOUD_OFFSET = 3

export default function PContact() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<SVGSVGElement>('.cloud').forEach((el, i) => floatCloud(el, CLOUD_OFFSET + i))
      gsap.from(`.${c.contact__title}`, { yPercent: 30, opacity: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: root.current, start: 'top 75%' } })
    },
    { scope: root },
  )

  return (
    <section ref={root} className={c.contact} id="contato">
      <div className={c.sky} aria-hidden="true">
        <Cloud className={c['cloud--d']} />
        <Cloud className={c['cloud--e']} />
      </div>
      <div className={`wrap ${s.contact}`}>
        <div className={c.contact__intro}>
          <h2 className={c.contact__title}>
            bora
            <br />
            falar?
          </h2>
          <p className={c.contact__text}>
            Estou aberto a oportunidades como Engenheiro de IA e Desenvolvedor Full Stack. Se o seu time precisa de alguém
            para construir agentes de IA e produtos full stack em produção, me chama.
          </p>
          <a className={`btn btn--ink ${s.contact__cv}`} href={cvUrl} target="_blank" rel="noopener">
            Baixar currículo <span aria-hidden="true">↓</span>
          </a>
        </div>

        <ul className={`${c.contact__links} ${s.contact__links}`}>
          {links.map(([k, v, href]) => (
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
