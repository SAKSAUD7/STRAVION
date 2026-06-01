import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'
import TextReveal, { LineReveal, WordReveal } from '../components/TextReveal'
import '../styles/about-page.css'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE = [
  { year: '2009', title: 'Founded in London',       desc: 'Stravion was established with a single mission: to deliver construction excellence without compromise.' },
  { year: '2013', title: 'Commercial Expansion',    desc: 'We expanded into the commercial sector, completing high-profile fit-outs across Central London.' },
  { year: '2017', title: 'Structural Specialists',  desc: 'Our structural team grew to handle complex RSJ, steel frame, and multi-storey extension projects.' },
  { year: '2021', title: '500+ Projects Delivered', desc: 'A landmark milestone — 500 completed projects across residential, commercial, and structural sectors.' },
  { year: '2024', title: 'Award-Level Quality',     desc: "Recognised as one of London's premier construction groups, with a 98% client satisfaction record." },
]

const PILLARS = [
  { icon: '🏆', title: 'Uncompromising Quality',   desc: "Every project is held to the same exacting standard — whether it's a £10k bathroom or a £500k development." },
  { icon: '🤝', title: 'Transparent Partnership',  desc: 'We keep clients informed at every stage. No surprises, no hidden costs, no excuses — just honest delivery.' },
  { icon: '⚙️', title: 'End-to-End Delivery',      desc: "From planning permission to final snagging, we manage every element so you don't have to." },
  { icon: '🎖️', title: 'Certified Professionals',  desc: "Gas Safe, NICEIC, and fully insured. You're always in safe, qualified hands with Stravion." },
  { icon: '⏱️', title: 'On-Time Commitment',        desc: 'Our structured project management ensures milestones are met and completion dates are honoured.' },
  { icon: '💎', title: 'Premium Materials Only',    desc: 'We specify and source only the finest materials — built to last, built to impress.' },
]

const STATS = [
  { num: '500+', label: 'Projects Delivered' },
  { num: '98%',  label: 'Client Satisfaction' },
  { num: '15+',  label: 'Years in Business' },
  { num: '24/7', label: 'Project Support' },
]

export default function AboutPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Stats strip — quick stagger up ── */
      gsap.from('.ap-stat', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.ap-stats-row', start: 'top 82%', once: true },
      })

      /* ── Story section image ── */
      gsap.from('.ap-story-img-wrap', {
        xPercent: -5, opacity: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.ap-story', start: 'top 78%', once: true },
      })
      gsap.from('.ap-story-content > *', {
        y: 30, opacity: 0, stagger: 0.12, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.ap-story-content', start: 'top 80%', once: true },
      })

      /* ── Timeline — items slide up fast with stagger ── */
      gsap.from('.ap-tl-item', {
        y: 50, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.ap-tl-list', start: 'top 80%', once: true },
      })
      /* Line fill draws down */
      gsap.from('.ap-tl-spine-fill', {
        scaleY: 0, transformOrigin: 'top center', duration: 2.2, ease: 'power2.inOut',
        scrollTrigger: { trigger: '.ap-tl-list', start: 'top 78%', once: true },
      })

      /* ── Pillars — bottom-to-up quick stagger ── */
      gsap.from('.ap-pillar', {
        y: 60, opacity: 0, stagger: 0.08, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.ap-pillars-grid', start: 'top 82%', once: true },
      })

      /* ── Hero parallax ── */
      gsap.to('.ap-hero-img', {
        yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: '.ap-hero', start: 'top top', end: 'bottom top', scrub: true },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>

      {/* ── HERO ── */}
      <section className="ap-hero">
        <div className="ap-hero-img-wrap">
          <img className="ap-hero-img" src="/assets/proj-b8.jpeg" alt="Stravion project site" />
        </div>
        <div className="ap-hero-overlay" />
        <div className="ap-hero-content container">
          <TextReveal as="p" className="section-label ap-hero-label" delay={0.15} duration={0.7} trigger="mount">
            Our Story
          </TextReveal>
          <h1 className="ap-hero-title">
            <TextReveal as="span" className="ap-title-plain" delay={0.35} duration={0.85} trigger="mount">
              Built on
            </TextReveal>
            <TextReveal as="em" className="ap-title-em" delay={0.5} duration={0.85} trigger="mount">
              Integrity.
            </TextReveal>
            <TextReveal as="span" className="ap-title-plain" delay={0.65} duration={0.85} trigger="mount">
              Driven by
            </TextReveal>
            <TextReveal as="em" className="ap-title-em" delay={0.8} duration={0.85} trigger="mount">
              Excellence.
            </TextReveal>
          </h1>
          <TextReveal as="p" className="ap-hero-sub" delay={0.95} duration={0.75} trigger="mount">
            London's premier construction group — since 2009.
          </TextReveal>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="ap-stats-section">
        <div className="container ap-stats-row">
          {STATS.map(s => (
            <div key={s.label} className="ap-stat">
              <span className="ap-stat-num">{s.num}</span>
              <span className="ap-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY SECTION ── */}
      <section className="ap-story section-pad">
        <div className="container ap-story-grid">
          <div className="ap-story-img-wrap">
            <img src="/assets/img-living.jpeg" alt="Stravion luxury interior" />
            <div className="ap-story-badge">
              <span className="badge-num">15+</span>
              <span className="badge-txt">Years of Excellence</span>
            </div>
          </div>
          <div className="ap-story-content">
            <p className="section-label">Who We Are</p>
            <h2 className="section-title">
              Built For <em>High-End Living</em><br />
              &amp; Commercial Excellence
            </h2>
            <div className="gold-rule" />
            <WordReveal
              className="about-body"
              text="STRAVION Construction Group is a premium London-based construction company delivering world-class residential, commercial, and structural projects. From luxury home extensions to bespoke commercial fit-outs, we combine precision engineering with refined craftsmanship."
              delay={0}
              duration={0.65}
              staggerTime={0.025}
              trigger="scroll"
            />
            <WordReveal
              className="about-body"
              text="Every project is treated as a signature work — managed end-to-end with an unwavering commitment to quality, transparency, and on-time delivery. We don't just build structures; we build legacies."
              delay={0.1}
              duration={0.65}
              staggerTime={0.025}
              trigger="scroll"
            />
            <div className="about-ctas" style={{ marginTop: '2rem' }}>
              <a href="tel:07706938064" className="btn-gold"><span>Call Us Today</span></a>
              <a href="/contact" className="btn-outline"><span>Get A Quote</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY / TIMELINE ── */}
      <section className="ap-timeline-section section-pad">
        <div className="container">

          <div className="ap-timeline-header">
            <TextReveal as="p" className="section-label" trigger="scroll" duration={0.7}>
              Our Journey
            </TextReveal>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              <LineReveal
                as="span"
                lines={['A Decade of', 'Milestones']}
                trigger="scroll"
                duration={0.85}
                staggerTime={0.14}
              />
            </h2>
          </div>

          {/* ── Timeline grid — 3 columns: left-content | spine | right-content ── */}
          <div className="ap-tl-list">
            {/* Central animated spine */}
            <div className="ap-tl-spine">
              <div className="ap-tl-spine-track">
                <div className="ap-tl-spine-fill" />
              </div>
            </div>

            {TIMELINE.map((t, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={t.year} className={`ap-tl-item ${isLeft ? 'ap-tl-left' : 'ap-tl-right'}`}>
                  {/* Card — always in the correct half */}
                  <div className="ap-tl-card-wrap">
                    <div className="ap-tl-card">
                      <span className="ap-tl-year">{t.year}</span>
                      <h3 className="ap-tl-title">{t.title}</h3>
                      <p className="ap-tl-desc">{t.desc}</p>
                    </div>
                  </div>

                  {/* Dot — sits on the spine */}
                  <div className="ap-tl-dot-wrap">
                    <div className="ap-tl-dot" />
                  </div>

                  {/* Empty spacer for the other half */}
                  <div className="ap-tl-spacer" />
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="ap-pillars-section section-pad">
        <div className="container">
          <div className="ap-pillars-header">
            <TextReveal as="p" className="section-label" trigger="scroll" duration={0.7}>
              Why Choose Us
            </TextReveal>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              <LineReveal
                as="span"
                lines={['The Stravion', 'Difference']}
                trigger="scroll"
                duration={0.85}
                staggerTime={0.14}
              />
            </h2>
            <p className="section-sub" style={{ color: 'var(--silver)', maxWidth: 520, margin: '1rem auto 0' }}>
              Six core principles that define every project we deliver.
            </p>
          </div>
          <div className="ap-pillars-grid">
            {PILLARS.map(p => (
              <div key={p.title} className="ap-pillar">
                <span className="ap-pillar-icon">{p.icon}</span>
                <h3 className="ap-pillar-title">{p.title}</h3>
                <p className="ap-pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
