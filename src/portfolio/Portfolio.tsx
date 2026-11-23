import { useSmoothScroll } from '../hooks/useSmoothScroll'
import Footer from '../components/Footer'
import PNav from './PNav'
import PHero from './PHero'
import PAbout from './PAbout'
import PExperience from './PExperience'
import PProjects from './PProjects'
import PStack from './PStack'
import PEducation from './PEducation'
import PContact from './PContact'

// Página /portfolio: voltada a recrutadores e líderes técnicos. Sem serviços, formulário nem pré-loader.
export default function Portfolio() {
  useSmoothScroll()

  return (
    <>
      <a className="skip" href="#main">Pular para o conteúdo</a>
      <PNav />
      <main id="main">
        <PHero />
        <PAbout />
        <PExperience />
        <PProjects />
        <PStack />
        <PEducation />
        <PContact />
      </main>
      <Footer />
    </>
  )
}
