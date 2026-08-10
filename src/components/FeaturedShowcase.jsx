import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { featuredList } from '../data/collections'

export default function FeaturedShowcase({ onOpen }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % featuredList.length)
    }, 4800)
    return () => window.clearInterval(id)
  }, [])

  const current = featuredList[active]
  const { item } = current
  const typeLabel = current.type === 'bedding' ? 'Bedding' : current.type === 'curtains' ? 'Curtains' : 'Ladies Suiting'

  return (
    <section className="relative overflow-hidden bg-[#04120f] text-white">
      <div className="relative min-h-[540px] sm:min-h-[620px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={item.image}
            src={item.image}
            alt={`${item.title} collection`}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            loading="lazy"
            style={{ objectPosition: item.position }}
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[#04120f]/97 via-[#04120f]/55 to-[#04120f]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04120f]/70 via-transparent to-transparent" />

        <div className="relative mx-auto flex h-full min-h-[540px] max-w-[1500px] flex-col justify-end px-5 py-14 sm:min-h-[620px] sm:px-8 sm:py-20 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-gold-soft">
                Featured this season · {typeLabel}
              </p>
              <h3 className="mt-4 max-w-xl font-display text-5xl font-semibold leading-[.92] sm:text-7xl">{item.title}</h3>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/60">{item.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-9 flex flex-wrap items-center gap-7">
            <button
              type="button"
              onClick={() => onOpen(current.type, current.index)}
              className="group relative inline-flex min-h-13 items-center justify-center gap-3 overflow-hidden bg-gold px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-forest transition-colors hover:bg-gold-soft"
            >
              <span className="shine-sweep" />
              View all designs
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <div className="flex items-center gap-2">
              {featuredList.map((entry, index) => (
                <button
                  key={entry.item.title}
                  type="button"
                  aria-label={`Show ${entry.item.title}`}
                  onClick={() => setActive(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? 'w-8 bg-gold' : 'w-1.5 bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
