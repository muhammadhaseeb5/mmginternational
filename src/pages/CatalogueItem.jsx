import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { FaWhatsapp } from 'react-icons/fa'
import { ArrowLeft, ChevronLeft, ChevronRight, ImageOff, X } from 'lucide-react'
import { findBySlug } from '../data/collections'
import { catalogueMessage, whatsapp } from '../lib/whatsapp'
import { Eyebrow, Reveal } from '../components/Shared'

const typeLabels = {
  bedding: 'Bedding',
  ladies: 'Ladies Suiting',
  curtains: 'Curtains',
  clothes: 'Clothes Collections',
}

const designLabel = (src, index) => {
  const fileName = decodeURIComponent(src.split('/').pop() || '').replace(/\.[^.]+$/, '')
  const curtainMatch = fileName.match(/^\d+_(\d+-\d+)_(.+)$/)

  if (curtainMatch) {
    return `Style ${curtainMatch[1]} · ${curtainMatch[2].replaceAll('_', ' ')}`
  }

  const clothesMatch = fileName.match(/^(\d+)\s+(.+)$/)
  if (clothesMatch) {
    return `Code ${clothesMatch[1]} · ${clothesMatch[2]}`
  }

  const superGfMatch = fileName.match(/^SUPER GF LAWN MOCKUP (\d+)$/i)
  if (superGfMatch) {
    return `Mockup ${superGfMatch[1]}`
  }

  return `Design ${index + 1}`
}

export default function CatalogueItem() {
  const { slug } = useParams()
  const item = findBySlug(slug)
  const [images, setImages] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    if (!item) return undefined
    let cancelled = false
    setImages(null)
    fetch(`/catalogue/${slug}/manifest.json`)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('no manifest'))))
      .then((list) => {
        if (!cancelled) setImages(Array.isArray(list) && list.length > 0 ? list : [item.image])
      })
      .catch(() => {
        if (!cancelled) setImages([item.image])
      })
    return () => {
      cancelled = true
    }
  }, [slug, item])

  useEffect(() => {
    if (lightboxIndex === null || !images) return undefined
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowRight') setLightboxIndex((current) => (current + 1) % images.length)
      if (event.key === 'ArrowLeft') setLightboxIndex((current) => (current - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxIndex, images])

  if (!item) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-5 text-center">
        <ImageOff size={36} className="text-bronze" />
        <h1 className="font-display text-4xl font-semibold text-forest">Collection not found</h1>
        <Link to="/catalogue" className="text-sm font-bold uppercase tracking-[0.2em] text-bronze hover:text-forest">
          Back to full catalogue
        </Link>
      </main>
    )
  }

  const typeLabel = typeLabels[item.type]

  return (
    <main className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Link to="/catalogue" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-bronze transition-colors hover:text-forest">
          <ArrowLeft size={14} /> Full catalogue
        </Link>

        <Reveal className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>{typeLabel} · {item.overline}</Eyebrow>
            <h1 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[.92] tracking-[-0.04em] text-forest">
              {item.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-forest/55">{item.description}</p>
          </div>
          <a
            href={whatsapp(catalogueMessage(item, item.type))}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex min-h-13 shrink-0 items-center justify-center gap-3 overflow-hidden bg-gold px-6 text-[10px] font-bold uppercase tracking-[0.17em] text-forest transition-colors hover:bg-gold-soft"
          >
            <span className="shine-sweep" />
            <FaWhatsapp size={17} />
            Request this design
          </a>
        </Reveal>

        <div className="mt-4 text-[9px] font-bold uppercase tracking-[0.22em] text-forest/40">
          {images ? `${images.length} design${images.length === 1 ? '' : 's'}` : 'Loading designs…'}
        </div>

        {!images && (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-[3/4] animate-pulse bg-forest/8" />
            ))}
          </div>
        )}

        {images && (
          <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [column-fill:balance]">
            {images.map((src, index) => {
              const label = designLabel(src, index)

              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="collection-card group relative mb-4 block w-full overflow-hidden break-inside-avoid bg-[#0a201b] shadow-[0_16px_40px_rgba(7,29,25,.12)]"
                  aria-label={`Open ${label} from ${item.title}`}
                >
                  <img
                    src={src}
                    alt={`${item.title} ${label}`}
                    loading="lazy"
                    decoding="async"
                    className="block w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 z-10 p-4 text-left text-[9px] font-bold uppercase tracking-[0.16em] text-white/90">{label}</span>
                  <span className="shine-sweep" />
                </button>
              )
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${item.title} design ${lightboxIndex + 1}`}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020e0c]/94 p-4 backdrop-blur-md"
            onClick={(event) => {
              if (event.target === event.currentTarget) setLightboxIndex(null)
            }}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid size-10 place-items-center border border-white/25 bg-black/25 text-white backdrop-blur-md transition-colors hover:border-gold hover:bg-black/45"
            >
              <X size={18} />
            </button>
            <span className="absolute left-4 top-4 font-display text-lg italic text-white/70">
              {String(lightboxIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={() => setLightboxIndex((current) => (current - 1 + images.length) % images.length)}
              aria-label="Previous design"
              className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/20 bg-black/25 text-white backdrop-blur-md transition-colors hover:border-gold hover:bg-black/50 sm:left-6"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setLightboxIndex((current) => (current + 1) % images.length)}
              aria-label="Next design"
              className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/20 bg-black/25 text-white backdrop-blur-md transition-colors hover:border-gold hover:bg-black/50 sm:right-6"
            >
              <ChevronRight size={20} />
            </button>

            <motion.img
              key={images[lightboxIndex]}
              src={images[lightboxIndex]}
              alt={`${item.title} ${designLabel(images[lightboxIndex], lightboxIndex)}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="max-h-[86vh] max-w-[92vw] object-contain shadow-[0_30px_100px_rgba(0,0,0,.5)]"
            />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/55 px-4 py-2 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
              {designLabel(images[lightboxIndex], lightboxIndex)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
