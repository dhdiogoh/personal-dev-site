import { LeadIntentProvider } from './context/LeadIntent'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useSmoothScroll()

  return (
    <LeadIntentProvider>
      <a className="skip" href="#main">Pular para o conteúdo</a>
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </LeadIntentProvider>
  )
}
