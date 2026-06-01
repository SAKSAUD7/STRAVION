import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/services.css'
import '../styles/service-modal.css'

gsap.registerPlugin(ScrollTrigger)

const WA = '447706938064'

/* ── Clean SVG line icons (stroke-based, gold) ── */
const ICONS = {
  Extensions: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="18" rx="1"/>
      <rect x="13" y="8" width="8" height="13" rx="1"/>
      <path d="M11 7h2M11 12h2"/>
    </svg>
  ),
  Commercial: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 7l9-4 9 4"/>
      <path d="M5 7v14M19 7v14"/>
      <rect x="9" y="12" width="6" height="9"/>
      <path d="M9 7h6"/>
    </svg>
  ),
  Shopfront: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h20v14H2z"/>
      <path d="M6 7V5a2 2 0 014 0v2M14 7V5a2 2 0 014 0v2"/>
      <path d="M2 12h20"/>
      <rect x="9" y="15" width="6" height="6"/>
    </svg>
  ),
  Roofing: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10L12 3l9 7"/>
      <path d="M5 10v11h14V10"/>
      <rect x="9" y="15" width="6" height="6"/>
      <path d="M9 10h6"/>
    </svg>
  ),
  Bathroom: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16v3a7 7 0 01-14 0v-3z"/>
      <path d="M6 12V5a2 2 0 014 0"/>
      <path d="M8 19v2M16 19v2"/>
      <circle cx="15" cy="6" r="2"/>
    </svg>
  ),
  Plumbing: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  Electrical: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Plastering: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      <path d="M15 5l3 3"/>
    </svg>
  ),
  Flooring: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="8" rx="1"/>
      <rect x="13" y="3" width="8" height="8" rx="1"/>
      <rect x="3" y="13" width="8" height="8" rx="1"/>
      <rect x="13" y="13" width="8" height="8" rx="1"/>
    </svg>
  ),
  Ventilation: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12m-3 0a3 3 0 106 0 3 3 0 00-6 0"/>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  ),
  Steel: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h20M2 16h20"/>
      <path d="M6 4v16M18 4v16"/>
      <path d="M6 8l12-4M6 16l12 4"/>
    </svg>
  ),
}

const SERVICES = [
  {
    iconKey: 'Extensions',
    title: 'Extensions & Structural Works',
    desc: 'Full structural modifications, rear and side extensions built to the highest standard.',
    fullDesc: 'We design and build bespoke rear, side, and over-structure extensions that seamlessly integrate with your existing property. Our structural engineers handle everything from planning drawings to RSJ installation, party wall agreements, and building regulations sign-off.',
    includes: ['Planning permission support','Structural engineering & calculations','RSJ / steel beam installation','Party wall agreements','Full masonry & roofing works','Internal remodelling & decoration'],
    typical: '£40,000 – £150,000',
  },
  {
    iconKey: 'Commercial',
    title: 'Commercial Fit-Outs',
    desc: 'Bespoke commercial interiors designed to elevate your business environment.',
    fullDesc: 'From restaurants to offices, retail units to clinics — we deliver complete commercial fit-outs that reflect your brand, meet regulatory requirements, and create an environment that works hard for your business.',
    includes: ['Full design & specification','Strip-out & structural alterations','M&E (mechanical & electrical)','Suspended ceilings & partitioning','Flooring, tiling & decoration','Furniture, signage & commissioning'],
    typical: '£30,000 – £500,000+',
  },
  {
    iconKey: 'Shopfront',
    title: 'Shopfront Installation',
    desc: 'High-impact shopfronts — aluminium, glass, and steel systems professionally installed.',
    fullDesc: 'Your shopfront is your first impression. We install bespoke aluminium-framed glazed shopfronts, roller shutters, and composite entrance systems that balance aesthetics, security, and building regulations compliance.',
    includes: ['Aluminium & glass shopfront systems','Roller shutters & grilles','Structural lintel installation','Planning & building control','Signage integration','Access control systems'],
    typical: '£8,000 – £40,000',
  },
  {
    iconKey: 'Roofing',
    title: 'Roofing & External Works',
    desc: 'Flat roof, pitched roof, and all external weatherproofing solutions.',
    fullDesc: 'Our roofing division handles everything from full pitched roof replacements to flat roof systems, fascias, soffits, guttering, and external wall insulation. All works are carried out by qualified operatives with full warranty.',
    includes: ['Pitched roof replacement (concrete & slate)','Flat roof systems (GRP, felt, EPDM)','Fascias, soffits & guttering','Chimneys, flashings & valleys','External wall insulation (EWI)','Velux & roof light installation'],
    typical: '£5,000 – £60,000',
  },
  {
    iconKey: 'Bathroom',
    title: 'Bathrooms & Wet Rooms',
    desc: 'Luxury bathroom design and installation with premium materials and gold finishes.',
    fullDesc: 'We create hotel-grade bathroom and wet room experiences in residential and commercial settings. From concept to completion, our bathroom specialists handle waterproofing, plumbing, tiling, and all luxury fixtures and fittings.',
    includes: ['Wet room waterproofing systems','Bespoke tiling (porcelain, marble)','Underfloor heating','Luxury fixtures & fittings','Steam shower enclosures','LED mood lighting'],
    typical: '£8,000 – £50,000',
  },
  {
    iconKey: 'Plumbing',
    title: 'Plumbing & Gas Installations',
    desc: 'Gas Safe certified engineers for all plumbing, heating, and gas installation works.',
    fullDesc: 'Our Gas Safe registered engineers handle all plumbing and gas works across residential and commercial projects. From full re-pipes to boiler replacements, underfloor heating systems, and commercial gas installations.',
    includes: ['Full property re-plumbing','Boiler installation & servicing','Underfloor heating systems','Bathroom & kitchen plumbing','Gas Safe commercial installations','Landlord gas safety certificates'],
    typical: '£2,000 – £30,000',
  },
  {
    iconKey: 'Electrical',
    title: 'Electrical Works',
    desc: 'Part P certified electricians. Rewires, consumer units, smart lighting systems.',
    fullDesc: 'Our NICEIC-approved electricians carry out the full range of domestic and commercial electrical works — from full property rewires and consumer unit upgrades to smart home systems, EV charger installation, and commercial distribution boards.',
    includes: ['Full property rewires','Consumer unit upgrades','Smart home / automation systems','EV charger installation','Commercial distribution boards','NICEIC certificates & sign-off'],
    typical: '£3,000 – £40,000',
  },
  {
    iconKey: 'Plastering',
    title: 'Plastering & Decorating',
    desc: 'Perfect skims, feature walls, and premium decorating across all project types.',
    fullDesc: 'Our plastering and decorating teams deliver flawless finishes across every project. From scratch coat and skim plaster to specialist finishes, feature walls, and premium decorating — the difference is in the detail.',
    includes: ['Full room skim plastering','Dot & dab boarding','Coving & cornice installation','Feature walls & specialist finishes','Full interior decoration','External rendering & painting'],
    typical: '£500 – £15,000',
  },
  {
    iconKey: 'Flooring',
    title: 'Tiling & Flooring',
    desc: 'LVT, porcelain, marble, and hardwood flooring — expertly laid and finished.',
    fullDesc: 'From luxury vinyl tile to natural stone, engineered hardwood to large-format porcelain — our flooring specialists ensure perfect preparation, precision installation, and flawless finishing on every surface.',
    includes: ['Large-format porcelain & stone','Marble & natural stone','Engineered hardwood','LVT & carpet installation','Floor preparation & levelling','Underfloor heating compatibility'],
    typical: '£1,000 – £20,000',
  },
  {
    iconKey: 'Ventilation',
    title: 'Ventilation Systems',
    desc: 'MVHR and mechanical ventilation solutions for residential and commercial builds.',
    fullDesc: 'Effective ventilation is essential for air quality, building performance, and regulatory compliance. We design and install MVHR (heat recovery) systems, MEV, and mechanical ventilation across residential and commercial projects.',
    includes: ['MVHR whole-house systems','MEV centralised extraction','Commercial ventilation design','Building regulations compliance','Duct design & installation','Commissioning & certification'],
    typical: '£2,000 – £15,000',
  },
  {
    iconKey: 'Steel',
    title: 'Steel & Structural Modifications',
    desc: 'RSJ installation, steel frames, load-bearing alterations with full calculations.',
    fullDesc: 'Load-bearing alterations require precision, expertise, and the right engineering. Our structural team handles RSJ beam installation, steel frame construction, loft conversions, and all structural modifications with full SE calculations and building control approval.',
    includes: ['RSJ & universal beam installation','Steel frame construction','Load-bearing wall removal','Structural engineer calculations','Building control liaison','Temporary support works'],
    typical: '£3,000 – £50,000',
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const [modal, setModal] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-header > *', {
        y: 35, opacity: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-header', start: 'top 82%', once: true },
      })
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

  const closeModal = () => setModal(null)

  return (
    <>
      <section id="services" ref={sectionRef} className="services section-pad">
        <div className="container">

          {/* Header */}
          <div className="services-header">
            <p className="section-label" style={{ justifyContent: 'center' }}>What We Do</p>
            <h2 className="section-title">
              Full-Service <em>Construction</em><br />Expertise
            </h2>
            <p className="services-sub">
              From structural foundations to luxury finishing touches — everything under one roof.
            </p>
          </div>

          {/* Grid */}
          <div className="services-grid">
            {SERVICES.map((s, i) => {
              const num = String(i + 1).padStart(2, '0')
              return (
                <div
                  key={i}
                  className="service-card"
                  onClick={() => setModal(s)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setModal(s)}
                  aria-label={`Open details for ${s.title}`}
                >
                  <div className="service-card-inner" data-num={num}>
                    {/* Icon */}
                    <div className="service-icon-wrap">
                      {ICONS[s.iconKey]}
                    </div>

                    {/* Title */}
                    <h3 className="service-title">{s.title}</h3>

                    {/* Gold divider */}
                    <div className="service-divider" />

                    {/* Desc */}
                    <p className="service-desc">{s.desc}</p>

                    {/* Arrow */}
                    <div className="service-arrow">
                      <span>Learn More</span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* SERVICE MODAL */}
      {modal && (
        <div className="svc-modal-overlay" onClick={closeModal}>
          <div className="svc-modal-box" onClick={e => e.stopPropagation()}>
            <button className="svc-modal-close" onClick={closeModal} aria-label="Close">✕</button>

            <div className="svc-modal-header">
              <div className="svc-modal-icon-svg">
                {ICONS[modal.iconKey]}
              </div>
              <div>
                <p className="svc-modal-tag">Our Services</p>
                <h2 className="svc-modal-title">{modal.title}</h2>
              </div>
            </div>

            <p className="svc-modal-desc">{modal.fullDesc}</p>

            <div className="svc-modal-includes">
              <h4>What&apos;s Included</h4>
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
              <span>Typical Investment</span>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Call Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
