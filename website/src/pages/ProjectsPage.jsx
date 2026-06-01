import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../data/projects'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import '../styles/projects-page.css'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = ['All', 'Residential', 'Commercial', 'Structural']

export default function ProjectsPage() {
  const [active, setActive] = useState('All')
  const pageRef = useRef(null)

  const visible = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero label + sub + stats — simple fade+up */
      gsap.from('.pp-hero-label', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', delay: 0.15 })
      gsap.from('.pp-hero-sub',   { opacity: 0, y: 20, duration: 0.65, ease: 'power3.out', delay: 0.55 })
      gsap.from('.pp-hero-stats > *', { opacity: 0, y: 18, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.7 })
      /* Video cards stagger */
      gsap.from('.pp-video-card', {
        y: 50, opacity: 0, stagger: 0.08, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-video-grid', start: 'top 84%', once: true },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  /* Cards — bottom-to-up on filter change */
  useEffect(() => {
    gsap.killTweensOf('.pp-card')
    gsap.fromTo('.pp-card',
      { y: 55, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity' }
    )
  }, [active])

  return (
    <div ref={pageRef}>

      {/* ── HERO ── */}
      <section className="pp-hero">
        <div className="pp-hero-bg">
          <img src="/assets/proj-a3.jpeg" alt="Stravion Projects" />
        </div>
        <div className="pp-hero-overlay" />
        <div className="container pp-hero-content">
          <TextReveal as="p" className="section-label pp-hero-label" delay={0.1} duration={0.65} trigger="mount">
            Our Portfolio
          </TextReveal>
          <h1 className="pp-hero-title">
            <TextReveal as="span" delay={0.3} duration={0.85} trigger="mount">
              Every Job,
            </TextReveal>
            <TextReveal as="em" className="pp-title-em" delay={0.48} duration={0.85} trigger="mount">
              A Signature Work.
            </TextReveal>
          </h1>
          <p className="pp-hero-sub">Residential, commercial, and structural excellence across London and beyond.</p>
          <div className="pp-hero-stats">
            <div className="pp-hstat"><span>500+</span><p>Projects</p></div>
            <div className="pp-hstat"><span>15+</span><p>Years</p></div>
            <div className="pp-hstat"><span>98%</span><p>Satisfaction</p></div>
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="pp-body section-pad">
        <div className="container">

          {/* Filters */}
          <div className="pp-filters">
            {FILTERS.map(f => (
              <button key={f} className={`filter-btn${active === f ? ' active' : ''}`} onClick={() => setActive(f)}>
                {f}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="pp-count">{visible.length} Project{visible.length !== 1 ? 's' : ''}</p>

          {/* Cards */}
          <div className="pp-grid">
            {visible.map((p, idx) => (
              <Link key={p.id} to={`/projects/${p.id}`} className={`pp-card${idx === 0 ? ' pp-card--featured' : ''}`}>
                {/* Cover image */}
                <div className="pp-card-img">
                  <img src={p.cover} alt={p.title} loading="lazy"
                    onError={e => { e.target.style.display='none' }}
                  />
                  {/* Video badge */}
                  {p.videos.length > 0 && (
                    <div className="pp-vid-badge">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6 3.5l7 4.5-7 4.5V3.5z"/>
                      </svg>
                      {p.videos.length} Video{p.videos.length > 1 ? 's' : ''}
                    </div>
                  )}
                  {/* Media count */}
                  <div className="pp-media-count">
                    <span>🖼 {p.images.length}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="pp-card-info">
                  <div className="pp-card-top">
                    <span className="pp-card-cat">{p.category}</span>
                    <span className="pp-card-year">{p.year}</span>
                  </div>
                  <h3 className="pp-card-title">{p.title}</h3>
                  <p className="pp-card-sub">{p.subtitle}</p>
                  <div className="pp-card-meta">
                    <span>📍 {p.location}</span>
                    <span>💰 {p.value}</span>
                    <span>⏱ {p.duration}</span>
                  </div>
                  <div className="pp-card-cta">
                    View Project
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ── VIDEO SHOWCASE ── */}
          <div className="pp-video-section">
            <p className="section-label" style={{ justifyContent: 'center' }}>Behind The Build</p>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              Project <em>Videos</em>
            </h2>
            <div className="pp-video-grid">
              {PROJECTS.flatMap(p => p.videos.map((v, vi) => ({
                src: v, title: p.title, cat: p.category, pid: p.id
              }))).map((vid, i) => (
                <Link key={i} to={`/projects/${vid.pid}`} className="pp-video-card">
                  <video src={vid.src} muted playsInline preload="metadata"
                    onMouseEnter={e => e.target.play()}
                    onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0 }}
                  />
                  <div className="pp-video-overlay">
                    <div className="pp-video-play">▶</div>
                    <div className="pp-video-meta">
                      <span className="pp-video-cat">{vid.cat}</span>
                      <p className="pp-video-title">{vid.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="pp-bottom-cta">
            <h2 className="section-title" style={{ textAlign: 'center' }}>Start Your <em>Project.</em></h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/447706938064?text=Hi Stravion! I'd like to discuss a project."
                target="_blank" rel="noopener noreferrer"
                className="btn-gold"
              ><span>WhatsApp Us</span></a>
              <Link to="/contact" className="btn-outline"><span>Get A Quote</span></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
