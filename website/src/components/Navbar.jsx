import { useRef, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/navbar.css'

const NAV_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'About',    to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact',  to: '/contact' },
]

/* ── Logo mark image ── */
const LogoImg = () => (
  <img
    src="/assets/logo-symbol.png"
    alt="Stravion logo mark"
    className="nav-logo-img"
    width={40}
    height={40}
  />
)

export default function Navbar() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  const handleLogoClick = (e) => {
    e.preventDefault()
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isInner = location.pathname !== '/'
  const navClass = `navbar${(scrolled || isInner) ? ' scrolled' : ''}`

  return (
    <>
      <nav className={navClass} role="navigation" aria-label="Main navigation">
        <a href="/" className="nav-logo" onClick={handleLogoClick} aria-label="Stravion home">
          <LogoImg />
          <div className="nav-logo-text">
            <span className="nav-logo-name">STRAVION</span>
            <span className="nav-logo-sub">Construction Group</span>
          </div>
        </a>

        <ul className="nav-links" role="list">
          {NAV_LINKS.map(l => (
            <li key={l.label}>
              <Link
                to={l.to}
                className={
                  location.pathname === l.to ||
                  (l.to !== '/' && location.pathname.startsWith(l.to))
                    ? 'active' : ''
                }
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <a href="tel:07706938064" className="nav-cta" aria-label="Call us">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}>
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <span>07706 938064</span>
        </a>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <span /><span />
        </button>
        <div className="mobile-menu-logo">
          <LogoImg />
          <span>STRAVION</span>
        </div>
        <ul>
          {NAV_LINKS.map(l => (
            <li key={l.label}>
              <Link to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-contact">
          <a href="tel:07706938064">07706 938064</a>
          <a href="mailto:info@stravion.co.uk">info@stravion.co.uk</a>
        </div>
      </div>
    </>
  )
}
