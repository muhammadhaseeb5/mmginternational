import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

export default function StatCounter({ value, prefix = '', suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplay(value)
      return
    }
    const duration = 1200
    const start = performance.now()
    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <div ref={ref}>
      <p className="font-display text-5xl font-semibold text-white sm:text-6xl">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">{label}</p>
    </div>
  )
}
