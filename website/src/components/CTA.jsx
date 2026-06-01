import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/cta.css'

export default function CTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content > *', {
        y: 40, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="cta-section">
      <div className="cta-bg">
        <img src="/assets/proj-b8.jpeg" alt="" aria-hidden="true"
          onError={e => { e.target.style.display='none' }}
        />
      </div>
      <div className="cta-overlay" />
      <div className="container">
        <div className="cta-content">
          <p className="section-label" style={{ justifyContent: 'center' }}>Ready To Build</p>
          <h2 className="cta-heading">
            Let's Build Something<br /><em>Exceptional.</em>
          </h2>
          <p className="cta-sub">
            Contact our team today for a free consultation and detailed quotation on your project.
          </p>
          <div className="cta-actions">
            <a href="tel:07706938064" className="btn-gold">
              <span>Call 07706 938064</span>
            </a>
            <a
              href="https://wa.me/447706938064?text=Hi Stravion! I'd like a free quote for my project."
              target="_blank" rel="noopener noreferrer"
              className="btn-outline"
            >
              <span>WhatsApp Us</span>
            </a>
          </div>
          <div className="cta-trust">
            <span>✓ Free Consultation</span>
            <span>✓ Detailed Quotation</span>
            <span>✓ No Obligation</span>
          </div>
        </div>
      </div>
    </section>
  )
}
