import { useState, type MouseEvent } from 'react'
import { scrollToHash } from '../lib/scroll'
import Logo from '../components/Logo'
import styles from '../components/Nav.module.css'

const links: [string, string][] = [
  ['#experiencia', 'Experiência'],
  ['#projetos', 'Projetos'],
  ['#stack', 'Stack'],
  ['#contato', 'Contato'],
]

function onAnchorClick(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href')
  if (href && scrollToHash(href)) e.preventDefault()
}

// Nav da home sem o CTA de venda. O logo é o único caminho (discreto) de volta para o site principal.
export default function PNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const onMenuLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false)
    onAnchorClick(e)
  }

  return (
    <>
      <header className={styles.nav}>
        <a className={styles.nav__logo} href="/" aria-label="Diogo Henrique, site principal">
          <Logo />
        </a>
        <nav className={styles.nav__links} aria-label="Seções do portfólio">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={onAnchorClick}>{label}</a>
          ))}
        </nav>
        <button
          className={styles.nav__burger}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span><span></span>
        </button>
      </header>

      <div className={styles.menu} id="menu" hidden={!menuOpen}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={onMenuLinkClick}>{label}</a>
        ))}
      </div>
    </>
  )
}
