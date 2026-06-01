import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/stats.css'

const STATS = [
  { num: 500, suffix: '+', label: 'Projects Delivered' },
  { num: 98,  suffix: '%', label: 'Client Satisfaction' },
  { num: 15,  suffix: '+', label: 'Years Experience' },
  { num: 24,  suffix: '/7', label: 'Project Support' },
]

export default function Stats() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stats-intro > *', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-intro', start: 'top 80%' }
      })

      // FIX: use gsap.to with a proxy object — counts UP from 0 to target
      STATS.forEach((stat, i) => {
        const el = document.querySelectorAll('.stat-num')[i]
        if (!el) return
        const proxy = { val: 0 }
        gsap.to(proxy, {
          val: stat.num,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(proxy.val) },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,          // only fires once — prevents reverse on scroll back
          }
        })
      })

      gsap.from('.stat-item', {
        y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="stats-section section-pad">
      <div className="stats-bg-texture" />
      <div className="container">
        <div className="stats-intro">
          <p className="section-label">By The Numbers</p>
          <h2 className="section-title">
            Why Choose <em>Stravion</em>
          </h2>
          <p className="stats-desc">
            A decade and a half of delivering premium construction projects with precision, care, and uncompromising quality.
          </p>
        </div>

        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value">
                <span className="stat-num">0</span>
                <span className="stat-suffix">{s.suffix}</span>
              </div>
              <div className="stat-divider" />
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
