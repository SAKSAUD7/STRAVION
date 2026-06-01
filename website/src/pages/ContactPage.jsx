import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'
import TextReveal from '../components/TextReveal'
import '../styles/contact-page.css'

gsap.registerPlugin(ScrollTrigger)

const WA_NUMBER = '447706938064'
const PHONE     = '07706938064'
const EMAIL     = 'info@stravion.co.uk'
const ADDRESS   = '167-169 Great Portland Street, 5th Floor, London W1W 5PF'

const SERVICES_LIST = [
  'Extensions & Structural Works',
  'Commercial Fit-Outs',
  'Shopfront Installation',
  'Roofing & External Works',
  'Bathrooms & Wet Rooms',
  'Plumbing & Gas Installations',
  'Electrical Works',
  'Plastering & Decorating',
  'Tiling & Flooring',
  'Ventilation Systems',
  'Steel & Structural Modifications',
  'Other / Not Listed',
]

export default function ContactPage() {
  const pageRef = useRef(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero animations — simple fade+up (label is TextReveal, handled separately) */
      gsap.from('.cp-hero-sub', { opacity: 0, y: 20, duration: 0.65, ease: 'power3.out', delay: 0.55 })

      /* Info cards — bottom-to-up stagger */
      gsap.from('.cp-info-item', {
        y: 45, opacity: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.cp-info-grid', start: 'top 82%', once: true },
      })
      /* Form */
      gsap.from('.cp-form-wrap > *', {
        y: 30, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.cp-form-wrap', start: 'top 82%', once: true },
      })
      /* WA panel */
      gsap.from('.cp-wa-panel', {
        x: 40, opacity: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.cp-wa-panel', start: 'top 82%', once: true },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleWhatsApp = (e) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    const msg = `Hi Stravion! 👋\n\nName: ${form.name}\nPhone: ${form.phone || 'N/A'}\nEmail: ${form.email || 'N/A'}\nService: ${form.service || 'N/A'}\n\n${form.message}`
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
  }

  return (
    <div ref={pageRef}>
      {/* HERO */}
      <section className="cp-hero">
        <div className="cp-hero-bg">
          <img src="/assets/proj-b5.jpeg" alt="Contact Stravion" />
        </div>
        <div className="cp-hero-overlay" />
        <div className="container cp-hero-content">
          <TextReveal as="p" className="section-label cp-hero-label" delay={0.12} duration={0.65} trigger="mount">
            Get In Touch
          </TextReveal>
          <h1 className="cp-hero-title">
            <TextReveal as="span" className="cp-hero-line-1" delay={0.3} duration={0.9} trigger="mount">
              Let&apos;s Build
            </TextReveal>
            <TextReveal as="em" className="cp-hero-line-2" delay={0.48} duration={0.9} trigger="mount">
              Something Great.
            </TextReveal>
          </h1>
          <p className="cp-hero-sub">Contact our team for a free consultation and detailed quotation on your next project.</p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="cp-info-section section-pad">
        <div className="container">
          <div className="cp-info-grid">
            <a href={`tel:${PHONE}`} className="cp-info-item">
              <div className="cp-info-icon">📞</div>
              <div>
                <h4>Call Us</h4>
                <p>{PHONE}</p>
                <span>Mon–Sat 7am–7pm</span>
              </div>
            </a>
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="cp-info-item cp-wa-info">
              <div className="cp-info-icon">💬</div>
              <div>
                <h4>WhatsApp</h4>
                <p>Chat With Us Now</p>
                <span>Usually replies within an hour</span>
              </div>
            </a>
            <a href={`mailto:${EMAIL}`} className="cp-info-item">
              <div className="cp-info-icon">✉️</div>
              <div>
                <h4>Email Us</h4>
                <p>{EMAIL}</p>
                <span>Response within 24 hours</span>
              </div>
            </a>
            <div className="cp-info-item">
              <div className="cp-info-icon">📍</div>
              <div>
                <h4>Our Office</h4>
                <p>167-169 Great Portland St</p>
                <span>London W1W 5PF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM + WA PANEL */}
      <section className="cp-contact-section section-pad">
        <div className="container cp-contact-layout">

          {/* FORM */}
          <div className="cp-form-wrap">
            <p className="section-label">Free Quote</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', textAlign: 'left', marginBottom: '1.5rem' }}>
              Tell Us About<br /><em>Your Project</em>
            </h2>

            {sent ? (
              <div className="cp-success">
                <span>✅</span>
                <h3>Message Sent via WhatsApp!</h3>
                <p>Our team will reply as soon as possible. Thank you for choosing STRAVION.</p>
                <button className="btn-gold" onClick={() => setSent(false)} style={{ marginTop: '1.5rem' }}>
                  <span>Send Another</span>
                </button>
              </div>
            ) : (
              <form className="cp-form" onSubmit={handleWhatsApp}>
                <div className="cp-form-row">
                  <div className="cp-field">
                    <label>Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="John Smith" required />
                  </div>
                  <div className="cp-field">
                    <label>Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="07700 000000" />
                  </div>
                </div>
                <div className="cp-field">
                  <label>Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
                </div>
                <div className="cp-field">
                  <label>Service Required</label>
                  <select name="service" value={form.service} onChange={handleChange}>
                    <option value="">Select a service...</option>
                    {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="cp-field">
                  <label>Project Description *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                    placeholder="Tell us about your project — location, scope, timescales and any specific requirements..." required />
                </div>
                <button type="submit" className="cp-submit-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send via WhatsApp
                </button>
                <p className="cp-form-note">
                  This will open WhatsApp with your message pre-filled for our team.
                </p>
              </form>
            )}
          </div>

          {/* WA PANEL */}
          <div className="cp-wa-panel">
            <div className="cp-wa-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h3>Prefer to chat?</h3>
            <p>Message us directly on WhatsApp for the fastest response. Our team is available Monday to Saturday.</p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hi Stravion! I'd like to discuss a project and get a free quote.`}
              target="_blank" rel="noopener noreferrer"
              className="cp-wa-btn"
            >
              Start WhatsApp Chat
            </a>
            <div className="cp-wa-divider"><span>or call directly</span></div>
            <a href={`tel:${PHONE}`} className="cp-call-btn">{PHONE}</a>

            <div className="cp-trust-items">
              <div className="cp-trust-item"><span>✓</span> Free Consultation</div>
              <div className="cp-trust-item"><span>✓</span> Detailed Quotation</div>
              <div className="cp-trust-item"><span>✓</span> No Obligation</div>
              <div className="cp-trust-item"><span>✓</span> Fast Response</div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
