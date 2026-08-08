import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { FaWhatsapp } from 'react-icons/fa'
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { catalogueMessage, whatsapp } from '../lib/whatsapp'

export default function CollectionModal({ type, items, activeIndex, onClose, onSelectIndex }) {
  const item = items[activeIndex]
  const typeLabel = type === 'bedding' ? 'Bedding' : 'Ladies Suiting'

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onSelectIndex((activeIndex + 1) % items.length)
      if (event.key === 'ArrowLeft') onSelectIndex((activeIndex - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, items.length, onClose, onSelectIndex])

  if (!item) return null

  const related = items.filter((_, index) => index !== activeIndex)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020e0c]/88 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} collection designs`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="relative grid max-h-[92vh] w-full max-w-6xl grid-rows-[auto_1fr] overflow-hidden border border-gold/25 bg-[#071d19] shadow-[0_40px_120px_rgba(0,0,0,.55)] lg:grid-cols-[1.2fr_1fr] lg:grid-rows-1"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 grid size-10 place-items-center border border-white/25 bg-black/25 text-white backdrop-blur-md transition-colors hover:border-gold hover:bg-black/45"
        >
          <X size={18} />
        </button>

        <div className="relative min-h-[300px] overflow-hidden bg-[#04120f] sm:min-h-[360px] lg:min-h-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={item.image}
              src={item.image}
              alt={`${item.title} collection`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.2, 0.75, 0.25, 1] }}
              style={{ objectPosition: item.position }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#031713]/90 via-transparent to-[#031713]/10 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#071d19]/50" />

          <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4 sm:top-6 sm:px-6">
            <span className="border border-white/25 bg-black/20 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-md">
              {typeLabel}
            </span>
            <span className="font-display text-lg italic text-white/70">
              {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelectIndex((activeIndex - 1 + items.length) % items.length)}
            aria-label="Previous design"
            className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/20 bg-black/25 text-white backdrop-blur-md transition-colors hover:border-gold hover:bg-black/50 sm:left-5"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => onSelectIndex((activeIndex + 1) % items.length)}
            aria-label="Next design"
            className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/20 bg-black/25 text-white backdrop-blur-md transition-colors hover:border-gold hover:bg-black/50 sm:right-5"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex flex-col overflow-y-auto p-7 sm:p-9 lg:p-11">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-soft">{item.overline}</p>
              <h3 className="mt-3 font-display text-4xl font-semibold leading-[.94] text-white sm:text-5xl">{item.title}</h3>
              <p className="mt-5 text-sm leading-7 text-white/60">{item.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsapp(catalogueMessage(item, type))}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-13 flex-1 items-center justify-center gap-3 bg-gold px-6 text-[10px] font-bold uppercase tracking-[0.17em] text-forest transition-colors hover:bg-gold-soft"
            >
              <FaWhatsapp size={17} />
              Request this design
            </a>
            <Link
              to={`/catalogue/${item.slug}`}
              onClick={onClose}
              className="group inline-flex min-h-13 items-center justify-center gap-3 border border-white/25 px-6 text-[10px] font-bold uppercase tracking-[0.17em] text-white transition-colors hover:border-gold hover:bg-white/5"
            >
              View full catalogue <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 border-t border-white/10 pt-7">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-soft">
              Related designs in {typeLabel}
            </p>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
              {related.map((relatedItem) => {
                const realIndex = items.indexOf(relatedItem)
                return (
                  <button
                    key={relatedItem.title}
                    type="button"
                    onClick={() => onSelectIndex(realIndex)}
                    className="group relative w-24 shrink-0 overflow-hidden border border-white/15 transition-colors hover:border-gold sm:w-28"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-[#04120f]">
                      <img
                        src={relatedItem.image}
                        alt={relatedItem.title}
                        loading="lazy"
                        style={{ objectPosition: relatedItem.position }}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2 pb-2 pt-4 text-left text-[8px] font-bold uppercase leading-tight tracking-[0.08em] text-white">
                      {relatedItem.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
