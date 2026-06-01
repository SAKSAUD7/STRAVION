import { Link } from 'react-router-dom'
import '../styles/footer.css'

const LogoSVG = () => (
  <svg width="36" height="36" viewBox="0 0 80 80" fill="none">
    <defs>
      <linearGradient id="ftgld" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#8E6C3F"/>
        <stop offset="50%"  stopColor="#E4C98A"/>
        <stop offset="100%" stopColor="#D6B06A"/>
      </linearGradient>
    </defs>
    <path d="M40 4 L55 4 L55 20 L45 20 L45 36 L58 36 L58 52 L43 52 L43 68 L58 68 L58 76 L22 76 L22 60 L36 60 L36 44 L22 44 L22 28 L36 28 L36 12 L22 12 L22 4 Z" fill="url(#ftgld)"/>
    <path d="M20 76 L60 76" stroke="url(#ftgld)" strokeWidth="1.5"/>
  </svg>
)

const SERVICES = [
  'Extensions & Structural Works', 'Commercial Fit-Outs', 'Shopfront Installation',
  'Roofing & External Works', 'Bathrooms & Wet Rooms', 'Plumbing & Gas',
  'Electrical Works', 'Plastering & Decorating', 'Tiling & Flooring',
]

const NAV_LINKS = [
  ['/', 'Home'],
  ['/about', 'About Us'],
  ['/projects', 'Projects'],
  ['/contact', 'Contact'],
]

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <LogoSVG />
              <div>
                <p className="footer-logo-name">STRAVION</p>
                <p className="footer-logo-sub">Construction Group</p>
              </div>
            </div>
            <p className="footer-tagline">
              Luxury Construction.<br />Built To Impress.
            </p>
            <p className="footer-desc">
              Delivering high-end residential, commercial, and structural construction projects across the United Kingdom.
            </p>
            <div className="footer-socials">
              <a href="https://wa.me/447706938064" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-link">WA</a>
              <a href="mailto:info@stravion.co.uk" aria-label="Email" className="social-link">EM</a>
              <a href="https://www.stravion.co.uk" target="_blank" rel="noopener noreferrer" aria-label="Website" className="social-link">WEB</a>
            </div>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-links">
              {SERVICES.map(s => (
                <li key={s}><Link to="/contact">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {NAV_LINKS.map(([to, label]) => (
                <li key={label}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📍</span>
                <span>167-169 Great Portland Street, 5th Floor, London W1W 5PF</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <a href="tel:07706938064">07706 938064</a>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <a href="mailto:info@stravion.co.uk">info@stravion.co.uk</a>
              </li>
              <li>
                <span className="contact-icon">🌐</span>
                <a href="https://www.stravion.co.uk" target="_blank" rel="noopener noreferrer">www.stravion.co.uk</a>
              </li>
            </ul>

            <div className="footer-cta-block">
              <p className="footer-cta-label">Ready to start your project?</p>
              <a
                href="https://wa.me/447706938064?text=Hi Stravion! I'd like a free quote."
                target="_blank" rel="noopener noreferrer"
                className="btn-gold"
                style={{ fontSize: '10px', padding: '14px 28px' }}
              >
                <span>Get A Free Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">© {new Date().getFullYear()} STRAVION Construction Group. All rights reserved.</p>
          <p className="footer-reg">Registered in England &amp; Wales · info@stravion.co.uk</p>
        </div>
      </div>
    </footer>
  )
}
