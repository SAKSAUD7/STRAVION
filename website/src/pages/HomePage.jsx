import Cursor from '../components/Cursor'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Services from '../components/Services'
import Stats from '../components/Stats'
import Projects from '../components/Projects'
import ParallaxBand from '../components/ParallaxBand'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Stats />
      <Projects />
      <ParallaxBand />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
