import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (prefersReducedMotion || isTouch) return undefined

    const node = glowRef.current
    if (!node) return undefined

    let frame = null
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    const apply = () => {
      node.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`
      frame = null
    }

    const onPointerMove = (event) => {
      x = event.clientX
      y = event.clientY
      if (frame === null) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden size-[520px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-700 will-change-transform lg:block"
      style={{
        opacity: 0.9,
        background: 'radial-gradient(circle, rgba(201,167,93,.16) 0%, rgba(201,167,93,.06) 38%, transparent 70%)',
      }}
    />
  )
}
