import { useEffect, useRef, useState } from 'react'

export default function CoverImage({ src, eager = false, ...props }) {
  const imageRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(eager)

  useEffect(() => {
    if (eager) {
      setShouldLoad(true)
      return undefined
    }

    const image = imageRef.current

    if (!image || !('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return undefined
    }

    setShouldLoad(false)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShouldLoad(true)
        observer.disconnect()
      },
      { rootMargin: '900px 0px', threshold: 0.01 },
    )

    observer.observe(image)
    return () => observer.disconnect()
  }, [eager, src])

  return (
    <img
      ref={imageRef}
      src={shouldLoad ? src : undefined}
      data-src={shouldLoad ? undefined : src}
      loading="eager"
      {...props}
    />
  )
}
