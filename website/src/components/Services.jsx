import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal, { LineReveal } from './TextReveal'
import '../styles/services.css'
import '../styles/service-modal.css'

gsap.registerPlugin(ScrollTrigger)

const WA = '447706938064'

const SERVICES = [
  {
    icon: '🏗️',
    title: 'Extensions & Structural Works',
    desc: 'Full structural modifications, rear and side extensions built to the highest standard.',
    fullDesc: 'We design and build bespoke rear, side, and over-structure extensions that seamlessly integrate with your existing property. Our structural engineers handle everything from planning drawings to RSJ installation, party wall agreements, and building regulations sign-off.',
    includes: ['Planning permission support', 'Structural engineering & calculations', 'RSJ / steel beam installation', 'Party wall agreements', 'Full masonry & roofing works', 'Internal remodelling & decoration'],
    typical: '£40,000 – £150,000',
  },
  {
    icon: '🏢',
    title: 'Commercial Fit-Outs',
    desc: 'Bespoke commercial interiors designed to elevate your business environment.',
    fullDesc: 'From restaurants to offices, retail units to clinics — we deliver complete commercial fit-outs that reflect your brand, meet regulatory requirements, and create an environment that works hard for your business.',
    includes: ['Full design & specification', 'Strip-out & structural alterations', 'M&E (mechanical & electrical)', 'Suspended ceilings & partitioning', 'Flooring, tiling & decoration', 'Furniture, signage & commissioning'],
    typical: '£30,000 – £500,000+',
  },
  {
    icon: '🪟',
    title: 'Shopfront Installation',
    desc: 'High-impact shopfronts — aluminium, glass, and steel systems professionally installed.',
    fullDesc: 'Your shopfront is your first impression. We install bespoke aluminium-framed glazed shopfronts, roller shutters, and composite entrance systems that balance aesthetics, security, and building regulations compliance.',
    includes: ['Aluminium & glass shopfront systems', 'Roller shutters & grilles', 'Structural lintel installation', 'Planning & building control', 'Signage integration', 'Access control systems'],
    typical: '£8,000 – £40,000',
  },
  {
    icon: '🏠',
    title: 'Roofing & External Works',
    desc: 'Flat roof, pitched roof, and all external weatherproofing solutions.',
    fullDesc: 'Our roofing division handles everything from full pitched roof replacements to flat roof systems, fascias, soffits, guttering, and external wall insulation. All works are carried out by qualified operatives with full warranty.',
    includes: ['Pitched roof replacement (concrete & slate)', 'Flat roof systems (GRP, felt, EPDM)', 'Fascias, soffits & guttering', 'Chimneys, flashings & valleys', 'External wall insulation (EWI)', 'Velux & roof light installation'],
    typical: '£5,000 – £60,000',
  },
  {
    icon: '🛁',
    title: 'Bathrooms & Wet Rooms',
    desc: 'Luxury bathroom design and installation with premium materials and gold finishes.',
    fullDesc: 'We create hotel-grade bathroom and wet room experiences in residential and commercial settings. From concept to completion, our bathroom specialists handle waterproofing, plumbing, tiling, and all luxury fixtures and fittings.',
    includes: ['Wet room waterproofing systems', 'Bespoke tiling (porcelain, marble)', 'Underfloor heating', 'Luxury fixtures & fittings', 'Steam shower enclosures', 'LED mood lighting'],
    typical: '£8,000 – £50,000',
  },
  {
    icon: '🔧',
    title: 'Plumbing & Gas Installations',
    desc: 'Gas Safe certified engineers for all plumbing, heating, and gas installation works.',
    fullDesc: 'Our Gas Safe registered engineers handle all plumbing and gas works across residential and commercial projects. From full re-pipes to boiler replacements, underfloor heating systems, and commercial gas installations.',
    includes: ['Full property re-plumbing', 'Boiler installation & servicing', 'Underfloor heating systems', 'Bathroom & kitchen plumbing', 'Gas Safe commercial installations', 'Landlord gas safety certificates'],
    typical: '£2,000 – £30,000',
  },
  {
    icon: '⚡',
    title: 'Electrical Works',
    desc: 'Part P certified electricians. Rewires, consumer units, smart lighting systems.',
    fullDesc: 'Our NICEIC-approved electricians carry out the full range of domestic and commercial electrical works — from full property rewires and consumer unit upgrades to smart home systems, EV charger installation, and commercial distribution boards.',
    includes: ['Full property rewires', 'Consumer unit upgrades', 'Smart home / automation systems', 'EV charger installation', 'Commercial distribution boards', 'NICEIC certificates & sign-off'],
    typical: '£3,000 – £40,000',
  },
  {
    icon: '🎨',
    title: 'Plastering & Decorating',
    desc: 'Perfect skims, feature walls, and premium decorating across all project types.',
    fullDesc: 'Our plastering and decorating teams deliver flawless finishes across every project. From scratch coat and skim plaster to specialist finishes, feature walls, and premium decorating — the difference is in the detail.',
    includes: ['Full room skim plastering', 'Dot & dab boarding', 'Coving & cornice installation', 'Feature walls & specialist finishes', 'Full interior decoration', 'External rendering & painting'],
    typical: '£500 – £15,000',
  },
  {
    icon: '🪵',
    title: 'Tiling & Flooring',
    desc: 'LVT, porcelain, marble, and hardwood flooring — expertly laid and finished.',
    fullDesc: 'From luxury vinyl tile to natural stone, engineered hardwood to large-format porcelain — our flooring specialists ensure perfect preparation, precision installation, and flawless finishing on every surface.',
    includes: ['Large-format porcelain & stone', 'Marble & natural stone', 'Engineered hardwood', 'LVT & carpet installation', 'Floor preparation & levelling', 'Underfloor heating compatibility'],
    typical: '£1,000 – £20,000',
  },
  {
    icon: '💨',
    title: 'Ventilation Systems',
    desc: 'MVHR and mechanical ventilation solutions for residential and commercial builds.',
    fullDesc: 'Effective ventilation is essential for air quality, building performance, and regulatory compliance. We design and install MVHR (heat recovery) systems, MEV, and mechanical ventilation across residential and commercial projects.',
    includes: ['MVHR whole-house systems', 'MEV centralised extraction', 'Commercial ventilation design', 'Building regulations compliance', 'Duct design & installation', 'Commissioning & certification'],
    typical: '£2,000 – £15,000',
  },
  {
    icon: '🔩',
    title: 'Steel & Structural Modifications',
    desc: 'RSJ installation, steel frames, load-bearing alterations with full calculations.',
    fullDesc: 'Load-bearing alterations require precision, expertise, and the right engineering. Our structural team handles RSJ beam installation, steel frame construction, loft conversions, and all structural modifications with full SE calculations and building control approval.',
    includes: ['RSJ & universal beam installation', 'Steel frame construction', 'Load-bearing wall removal', 'Structural engineer calculations', 'Building control liaison', 'Temporary support works'],
    typical: '£3,000 – £50,000',
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const [modal, setModal] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header text */
      gsap.from('.services-header > *', {
        y: 35, opacity: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-header', start: 'top 82%', once: true },
      })

      /* Cards — bottom-to-up, quick stagger */
      gsap.from('.service-card', {
        y: 60, opacity: 0,
        stagger: { amount: 0.55, from: 'start' },
        duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 84%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (modal !== null) {
      gsap.from('.svc-modal-box', { scale: 0.94, opacity: 0, duration: 0.35, ease: 'power3.out' })
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [modal])

  const openModal  = (s) => setModal(s)
  const closeModal = ()  => setModal(null)

  return (
    <>
      <section id="services" ref={sectionRef} className="services section-pad">
        <div className="container">
          <div className="services-header">
            <p className="section-label" style={{ justifyContent: 'center' }}>What We Do</p>
            <h2 className="section-title">
              Full-Service <em>Construction</em><br />Expertise
            </h2>
            <p className="services-sub">
              From structural foundations to luxury finishing touches — everything under one roof.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="service-card"
                onClick={() => openModal(s)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && openModal(s)}
              >
                <div className="service-card-inner">
                  <span className="service-icon">{s.icon}</span>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                  <div className="service-arrow">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE MODAL */}
      {modal && (
        <div className="svc-modal-overlay" onClick={closeModal}>
          <div className="svc-modal-box" onClick={e => e.stopPropagation()}>
            <button className="svc-modal-close" onClick={closeModal} aria-label="Close">✕</button>

            <div className="svc-modal-header">
              <span className="svc-modal-icon">{modal.icon}</span>
              <div>
                <p className="svc-modal-tag">Our Services</p>
                <h2 className="svc-modal-title">{modal.title}</h2>
              </div>
            </div>

            <p className="svc-modal-desc">{modal.fullDesc}</p>

            <div className="svc-modal-includes">
              <h4>What's Included</h4>
              <ul>
                {modal.includes.map((item, i) => (
                  <li key={i}>
                    <span className="svc-modal-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="svc-modal-typical">
              <span>Typical Investment:</span>
              <strong>{modal.typical}</strong>
            </div>

            <div className="svc-modal-actions">
              <a
                href={`https://wa.me/${WA}?text=Hi Stravion! I'm interested in your ${modal.title} service and would like a free quote.`}
                target="_blank" rel="noopener noreferrer"
                className="svc-modal-wa-btn"
                onClick={closeModal}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Get a Quote on WhatsApp
              </a>
              <a href="tel:07706938064" className="svc-modal-call-btn">
                📞 Call Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
