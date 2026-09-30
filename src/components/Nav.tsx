import { useState, type MouseEvent } from 'react'
import { scrollToHash } from '../lib/scroll'
import Logo from './Logo'
import styles from './Nav.module.css'

// Intercepta âncoras internas (como o legacy fazia em todo a[href^="#"]): rola suave com offset da nav.
function onAnchorClick(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href')
  if (href && scrollToHash(href)) e.preventDefault()
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const onMenuLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false)
    onAnchorClick(e)
  }

  return (
    <>
      <header className={styles.nav}>
        <a className={styles.nav__logo} href="#topo" aria-label="Diogo Henrique, início" onClick={onAnchorClick}>
          <Logo />
        </a>
        <nav className={styles.nav__links} aria-label="Principal">
          <a href="#servicos" onClick={onAnchorClick}>Serviços</a>
          <a href="#projetos" onClick={onAnchorClick}>Projetos</a>
          <a href="#sobre" onClick={onAnchorClick}>Sobre</a>
        </nav>
        <a className={styles.nav__cta} href="#contato" onClick={onAnchorClick}>Vamos conversar</a>
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
        <a href="#servicos" onClick={onMenuLinkClick}>Serviços</a>
        <a href="#projetos" onClick={onMenuLinkClick}>Projetos</a>
        <a href="#sobre" onClick={onMenuLinkClick}>Sobre</a>
        <a href="#contato" className={styles.menu__cta} onClick={onMenuLinkClick}>Vamos conversar</a>
      </div>
    </>
  )
}
