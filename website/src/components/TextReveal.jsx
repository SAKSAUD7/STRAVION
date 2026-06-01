import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * TextReveal — wraps children in a clip-mask line reveal animation.
 * The child slides UP from below an overflow:hidden boundary into view.
 *
 * Props:
 *   as        — element tag (default: 'div')
 *   delay     — initial delay in seconds (default: 0)
 *   duration  — animation duration (default: 0.85)
 *   trigger   — 'scroll' (default) | 'mount' (fires immediately on mount)
 *   className — extra classes for the inner element
 *   style     — extra style for the outer wrapper
 */
export default function TextReveal({
  children,
  as: Tag = 'div',
  delay = 0,
  duration = 0.85,
  trigger = 'scroll',
  className = '',
  style = {},
}) {
  const innerRef = useRef(null)
  const stRef    = useRef(null)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    gsap.set(el, { yPercent: 110 })

    const animVars = {
      yPercent: 0,
      duration,
      delay,
      ease: 'power4.out',
    }

    if (trigger === 'scroll') {
      animVars.scrollTrigger = {
        trigger: el,
        start: 'top 92%',
        once: true,
      }
    }

    const tween = gsap.to(el, animVars)
    stRef.current = tween

    return () => {
      tween.kill()
      if (animVars.scrollTrigger) {
        ScrollTrigger.getById(tween.scrollTrigger?.vars?.id)?.kill()
      }
    }
  }, [delay, duration, trigger])

  return (
    <div style={{ overflow: 'hidden', display: 'block', paddingBottom: '0.06em', ...style }}>
      <Tag ref={innerRef} className={className} style={{ display: 'block', willChange: 'transform' }}>
        {children}
      </Tag>
    </div>
  )
}

/**
 * WordReveal — splits text into individual words.
 * Each word sits inside an overflow:hidden span and slides up with stagger.
 * Used for body copy and smaller headings.
 */
export function WordReveal({
  text,
  className = '',
  delay = 0,
  duration = 0.7,
  staggerTime = 0.05,
  trigger = 'scroll',
  as: Tag = 'p',
}) {
  const words   = text.split(' ')
  const innerRefs = useRef([])
  const tweenRef  = useRef(null)

  useEffect(() => {
    const els = innerRefs.current.filter(Boolean)
    if (!els.length) return

    gsap.set(els, { yPercent: 115 })

    const animVars = {
      yPercent: 0,
      duration,
      stagger: staggerTime,
      delay,
      ease: 'power3.out',
    }

    if (trigger === 'scroll') {
      animVars.scrollTrigger = {
        trigger: els[0],
        start: 'top 90%',
        once: true,
      }
    }

    tweenRef.current = gsap.to(els, animVars)

    return () => {
      tweenRef.current?.kill()
    }
  }, [delay, duration, staggerTime, trigger])

  return (
    <Tag
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.28em' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.06em' }}
        >
          <span
            ref={el => { innerRefs.current[i] = el }}
            style={{ display: 'inline-block', willChange: 'transform' }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * LineReveal — reveal multiple lines sequentially (staggered clip-up).
 * Best for hero headings split into lines.
 */
export function LineReveal({
  lines,
  className = '',
  delay = 0,
  duration = 1,
  staggerTime = 0.14,
  as: Tag = 'span',
  trigger = 'mount',
}) {
  const innerRefs = useRef([])
  const tweenRef  = useRef(null)

  useEffect(() => {
    const els = innerRefs.current.filter(Boolean)
    if (!els.length) return

    gsap.set(els, { yPercent: 110 })

    const animVars = {
      yPercent: 0,
      duration,
      stagger: staggerTime,
      delay,
      ease: 'power4.out',
    }

    if (trigger === 'scroll') {
      animVars.scrollTrigger = {
        trigger: els[0],
        start: 'top 88%',
        once: true,
      }
    }

    tweenRef.current = gsap.to(els, animVars)

    return () => {
      tweenRef.current?.kill()
    }
  }, [delay, duration, staggerTime, trigger])

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}
        >
          <span
            ref={el => { innerRefs.current[i] = el }}
            style={{ display: 'block', willChange: 'transform' }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
