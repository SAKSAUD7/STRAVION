import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../data/projects'
import '../styles/projects.css'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = ['All', 'Residential', 'Commercial', 'Structural']

export default function Projects() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState('All')

  const visible = active === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === active)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header — quick fade+up */
      gsap.from('.projects-header > *', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-header', start: 'top 82%', once: true },
      })
      /* Filter buttons */
      gsap.from('.project-filters .filter-btn', {
        y: 20, opacity: 0, stagger: 0.07, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: '.project-filters', start: 'top 88%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* Cards — re-animate on filter change (bottom-to-up) */
  useEffect(() => {
    gsap.killTweensOf('.proj-card')
    gsap.fromTo(
      '.proj-card',
      { y: 55, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity' }
    )
  }, [active])

  return (
    <section id="projects" ref={sectionRef} className="projects section-pad">
      <div className="container">
        <div className="projects-header">
          <p className="section-label">Our Work</p>
          <h2 className="section-title">
            Featured <em>Projects</em>
          </h2>
          <p className="projects-sub">
            Every project reflects our commitment to craftsmanship, detail, and excellence.
          </p>
        </div>

        <div className="project-filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn${active === f ? ' active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visible.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="proj-card">
              <div className="proj-img-wrap">
                <img
                  src={p.cover} alt={p.title} loading="lazy"
                  onError={e => { e.target.style.display = 'none'; e.target.parentNode.style.background = 'var(--charcoal)' }}
                />
                <div className="proj-overlay">
                  <span className="proj-tag">{p.category}</span>
                  <h3 className="proj-title">{p.title}</h3>
                  <span className="proj-view">View Project →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/projects" className="btn-gold">
            <span>View All Projects</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
