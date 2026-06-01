import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LineReveal, WordReveal } from './TextReveal'
import '../styles/hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Eyebrow + buttons + scroll indicator fade+slide up ── */
      gsap.set(['.hero-eyebrow', '.hero-sub', '.hero-btns', '.hero-scroll'], {
        opacity: 0, y: 24,
      })
      gsap.set('.hero-scroll', { opacity: 0, y: 0 })

      const tl = gsap.timeline({ delay: 3.2 })
      tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        /* hero title is handled by LineReveal with its own delay */
        .to('.hero-sub',     { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '+=0.35')
        .to('.hero-btns',    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to('.hero-scroll',  { opacity: 1,        duration: 0.6 }, '-=0.2')

      /* Parallax on scroll */
      gsap.to('.hero-video-wrap', {
        yPercent: 22, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top', end: 'bottom top', scrub: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="hero">
      <div className="hero-video-wrap">
        <video autoPlay muted loop playsInline>
          <source src="/assets/vid1.mp4" type="video/mp4" />
          <source src="/assets/vid2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        {/* Eyebrow */}
        <div className="hero-eyebrow">
          <span className="line" />
          London&apos;s Premier Construction Group
          <span className="line" />
        </div>

        {/* Title — cinematic line-clip reveal */}
        <h1 className="hero-title">
          <LineReveal
            as="span"
            lines={['Luxury Construction.', 'Built To Impress.']}
            delay={3.6}
            duration={1.05}
            staggerTime={0.18}
            trigger="mount"
          />
        </h1>

        {/* Sub */}
        <p className="hero-sub">
          Delivering high-end residential, commercial, and structural<br />
          construction projects across the United Kingdom.
        </p>

        {/* Buttons */}
        <div className="hero-btns">
          <Link to="/projects" className="btn-gold">
            <span>View Projects</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </Link>
          <Link to="/contact" className="btn-outline">
            <span>Get A Quote</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <span className="hero-scroll-label">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
