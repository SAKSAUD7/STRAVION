import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import '../styles/preloader.css'

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Particle generation
    const root = rootRef.current
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*2}s;animation-duration:${2+Math.random()*3}s`
      root.appendChild(p)
    }

    // Counter 0→100
    let n = 0
    const interval = setInterval(() => {
      n += Math.floor(Math.random() * 8) + 2
      if (n >= 100) { n = 100; clearInterval(interval) }
      setCount(n)
    }, 30)

    // ── CINEMATIC APERTURE REVEAL ──
    const tl = gsap.timeline()

    // Phase 1: Logo appears
    tl.to('.pl-logo',    { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' }, 0.3)
      .to('.pl-tagline', { opacity: 1, y: 0,     duration: 0.7, ease: 'power2.out' }, 0.9)
      .to('.pl-line',    { width: '200px',        duration: 1.0, ease: 'power2.inOut' }, 1.1)
      .to('.pl-counter', { opacity: 1,            duration: 0.4 }, 0.5)

    // Phase 2: Aperture open — logo grows, clip expands
    tl.to('.pl-logo', {
        scale: 18, opacity: 0.6, duration: 1.2, ease: 'power4.in'
      }, 2.5)
      .to('.pl-tagline, .pl-line, .pl-counter', {
        opacity: 0, duration: 0.4, ease: 'power2.in'
      }, 2.5)

    // Phase 3: Full screen wipe up
    tl.to(root, {
        yPercent: -100, duration: 0.9, ease: 'power4.inOut'
      }, 3.4)
      .call(() => onComplete(), [], 4.2)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div id="preloader" ref={rootRef}>
      <div className="pl-counter">{count}</div>

      <div className="pl-logo">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
          <defs>
            <linearGradient id="gld2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#8E6C3F"/>
              <stop offset="50%"  stopColor="#E4C98A"/>
              <stop offset="100%" stopColor="#D6B06A"/>
            </linearGradient>
          </defs>
          <path d="M40 4 L55 4 L55 20 L45 20 L45 36 L58 36 L58 52 L43 52 L43 68 L58 68 L58 76 L22 76 L22 60 L36 60 L36 44 L22 44 L22 28 L36 28 L36 12 L22 12 L22 4 Z" fill="url(#gld2)"/>
          <path d="M20 76 L60 76" stroke="url(#gld2)" strokeWidth="1.5"/>
        </svg>
      </div>

      <p className="pl-tagline">STRAVION CONSTRUCTION GROUP</p>
      <div className="pl-line-wrap">
        <div className="pl-line" />
      </div>
    </div>
  )
}
