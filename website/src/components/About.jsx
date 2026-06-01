import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/about.css'

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-img-wrap', {
        xPercent: -8, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
      gsap.from('.about-content > *', {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      })
      // Subtle parallax on image
      gsap.to('.about-img-wrap img', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', end: 'bottom top', scrub: true,
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="about section-pad">
      <div className="container about-grid">
        <div className="about-img-wrap">
          <img src="/assets/proj-b8.jpeg" alt="STRAVION luxury interior project" loading="lazy" />
          <div className="about-img-badge">
            <span className="badge-num">15+</span>
            <span className="badge-txt">Years of Excellence</span>
          </div>
        </div>

        <div className="about-content">
          <p className="section-label">About Stravion</p>
          <h2 className="section-title">
            Built For <em>High-End Living</em><br />
            &amp; Commercial Excellence
          </h2>
          <div className="gold-rule" />
          <p className="about-body">
            STRAVION Construction Group is a premium London-based construction company delivering world-class residential, commercial, and structural projects. From luxury home extensions to bespoke commercial fit-outs, we combine precision engineering with refined craftsmanship.
          </p>
          <p className="about-body" style={{ marginTop: '16px' }}>
            Every project is treated as a signature work — managed end-to-end with an unwavering commitment to quality, transparency, and on-time delivery.
          </p>

          <ul className="about-pillars">
            {[
              ['Turnkey Solutions', 'One team. Full delivery.'],
              ['Premium Materials', 'Only the finest finishes.'],
              ['Certified Engineers', 'Fully licensed & insured.'],
            ].map(([title, sub]) => (
              <li key={title} className="pillar">
                <div className="pillar-dot" />
                <div>
                  <strong>{title}</strong>
                  <span>{sub}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="about-ctas">
            <Link to="/about" className="btn-gold">
              <span>Our Story</span>
            </Link>
            <a href="tel:07706938064" className="btn-outline">
              <span>Call Us Today</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
