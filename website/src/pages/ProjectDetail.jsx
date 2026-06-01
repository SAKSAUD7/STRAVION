import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../data/projects'
import Footer from '../components/Footer'
import '../styles/project-detail.css'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectDetail() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const pageRef    = useRef(null)
  const [lightbox, setLightbox] = useState(null) // { src, type }
  const [vidErr,   setVidErr]   = useState({})

  const project = PROJECTS.find(p => p.id === Number(id))

  useEffect(() => {
    if (!project) { navigate('/projects'); return }
    const ctx = gsap.context(() => {
      gsap.from('.pd-back',       { opacity: 0, x: -20, duration: 0.55, ease: 'power2.out', delay: 0.1 })
      gsap.from('.pd-hero-title', { opacity: 0, y: 50,  duration: 0.85, ease: 'power3.out', delay: 0.25 })
      gsap.from('.pd-hero-meta',  { opacity: 0, y: 24,  duration: 0.7,  ease: 'power3.out', delay: 0.5 })
      gsap.from('.pd-cover',      { scale: 1.06, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.1 })
      gsap.from('.pd-desc', {
        opacity: 0, y: 28, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.pd-desc', start: 'top 85%', once: true },
      })
      gsap.from('.pd-highlight', {
        opacity: 0, x: -18, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.pd-highlights', start: 'top 85%', once: true },
      })
      gsap.from('.pd-media-item', {
        opacity: 0, y: 40, stagger: 0.08, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.pd-media-grid', start: 'top 82%', once: true },
      })
      gsap.from('.pd-other-card', {
        opacity: 0, y: 40, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.pd-other-grid', start: 'top 84%', once: true },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [project, navigate])

  if (!project) return null

  const otherProjects = PROJECTS.filter(p => p.id !== project.id)

  return (
    <div ref={pageRef}>
      {/* HERO */}
      <section className="pd-hero">
        <div className="pd-hero-bg">
          <img className="pd-cover" src={project.cover} alt={project.title} />
        </div>
        <div className="pd-hero-overlay" />
        <div className="container pd-hero-content">
          <Link to="/projects" className="pd-back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8H2M8 2l-6 6 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            All Projects
          </Link>
          <span className="pd-cat">{project.category}</span>
          <h1 className="pd-hero-title">{project.title}</h1>
          <div className="pd-hero-meta">
            <span>📍 {project.location}</span>
            <span>📅 {project.year}</span>
            <span>💰 {project.value}</span>
            <span>⏱ {project.duration}</span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="pd-body section-pad">
        <div className="container pd-layout">

          {/* LEFT — Description + highlights */}
          <div className="pd-main">
            <p className="section-label">Project Overview</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', textAlign: 'left', marginBottom: '1.5rem' }}>
              {project.subtitle}
            </h2>
            <p className="pd-desc">{project.description}</p>

            <div className="pd-highlights-wrap">
              <h3 className="pd-hl-title">Project Highlights</h3>
              <ul className="pd-highlights">
                {project.highlights.map((h, i) => (
                  <li key={i} className="pd-highlight">
                    <span className="pd-hl-dot" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pd-cta-block">
              <p style={{ color: 'var(--silver)', marginBottom: '1rem' }}>Interested in a similar project?</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/447706938064?text=Hi, I'd like to discuss a project similar to ${project.title}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-gold"
                >
                  <span>Chat on WhatsApp</span>
                </a>
                <a href="tel:07706938064" className="btn-outline"><span>Call Us</span></a>
              </div>
            </div>
          </div>

          {/* RIGHT — sidebar info */}
          <aside className="pd-sidebar">
            <div className="pd-info-card">
              <h4 className="pd-info-title">Project Details</h4>
              <ul className="pd-info-list">
                <li><span>Category</span><strong>{project.category}</strong></li>
                <li><span>Location</span><strong>{project.location}</strong></li>
                <li><span>Completed</span><strong>{project.year}</strong></li>
                <li><span>Value</span><strong>{project.value}</strong></li>
                <li><span>Duration</span><strong>{project.duration}</strong></li>
              </ul>
            </div>
            <div className="pd-wa-card">
              <p>Get a free quote for your project</p>
              <a
                href={`https://wa.me/447706938064?text=Hi, I'd like a quote for a project similar to ${project.title}`}
                target="_blank" rel="noopener noreferrer"
                className="pd-wa-btn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* MEDIA GALLERY */}
      <section className="pd-media-section section-pad">
        <div className="container">
          <p className="section-label">Project Gallery</p>
          <h2 className="section-title" style={{ textAlign: 'left', fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}>
            Photos & <em>Videos</em>
          </h2>

          <div className="pd-media-grid">
            {/* Images */}
            {project.images.map((src, i) => (
              <div key={`img-${i}`} className="pd-media-item" onClick={() => setLightbox({ src, type: 'img' })}>
                <img src={src} alt={`${project.title} ${i + 1}`} loading="lazy"
                  onError={e => { e.target.parentNode.style.background = 'var(--charcoal)'; e.target.style.display = 'none' }}
                />
                <div className="pd-media-zoom">🔍</div>
              </div>
            ))}
            {/* Videos */}
            {project.videos.map((src, i) => (
              !vidErr[i] && (
                <div key={`vid-${i}`} className="pd-media-item pd-media-video" onClick={() => setLightbox({ src, type: 'vid' })}>
                  <video src={src} muted playsInline preload="metadata"
                    onError={() => setVidErr(prev => ({ ...prev, [i]: true }))}
                  />
                  <div className="pd-video-play">▶</div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="pd-lightbox" onClick={() => setLightbox(null)}>
          <button className="pd-lb-close" onClick={() => setLightbox(null)}>✕</button>
          {lightbox.type === 'img'
            ? <img src={lightbox.src} alt="" onClick={e => e.stopPropagation()} />
            : <video src={lightbox.src} controls autoPlay onClick={e => e.stopPropagation()} />
          }
        </div>
      )}

      {/* OTHER PROJECTS */}
      <section className="pd-other section-pad">
        <div className="container">
          <p className="section-label">More Work</p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            Other <em>Projects</em>
          </h2>
          <div className="pd-other-grid">
            {otherProjects.map(p => (
              <Link key={p.id} to={`/projects/${p.id}`} className="pd-other-card">
                <img src={p.cover} alt={p.title} loading="lazy" />
                <div className="pd-other-info">
                  <span>{p.category}</span>
                  <h4>{p.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
