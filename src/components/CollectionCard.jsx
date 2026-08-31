import { useMotionValue, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Reveal } from './Shared'
import CoverImage from './CoverImage'

export default function CollectionCard({ item, index, type = 'bedding', onOpen }) {
  const isBedding = type === 'bedding'
  const typeLabel = type === 'bedding' ? 'Bedding' : type === 'curtains' ? 'Curtains' : type === 'clothes' ? 'Clothes Collections' : 'Ladies Suiting'
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 6)
    rotateX.set(py * -6)
  }

  const handlePointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <Reveal className={isBedding ? item.layout : ''} delay={(index % 3) * 0.07}>
      <motion.button
        type="button"
        onClick={onOpen}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 190, damping: 22 }}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className={`collection-card group relative block w-full overflow-hidden bg-[#0a201b] text-left shadow-[0_28px_70px_rgba(7,29,25,.15)] ${
          isBedding ? 'min-h-[430px] sm:min-h-[520px]' : 'min-h-[560px] sm:min-h-[640px]'
        }`}
        aria-label={`View all ${item.title} designs`}
      >
        <CoverImage
          src={item.image}
          eager={index === 0}
          alt={`${item.title} collection`}
          decoding="async"
          style={{ objectPosition: item.position }}
          className={`absolute inset-0 size-full bg-[#ececea] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045] ${
            item.imageFit === 'contain' ? 'object-contain' : 'object-cover'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031713]/95 via-[#031713]/10 to-black/5 transition-colors duration-500 group-hover:via-[#031713]/20" />
        <span className="shine-sweep" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 sm:p-8">
          <span className="border border-white/25 bg-black/15 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-md">
            {typeLabel}
          </span>
          <span className="font-display text-xl italic text-white/70">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
          <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.24em] text-gold-soft">{item.overline}</p>
          <h3 className={`font-display font-semibold leading-[.92] text-white ${isBedding ? 'text-4xl sm:text-[48px]' : 'text-4xl sm:text-[42px]'}`}>
            {item.title}
          </h3>
          <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="max-w-md pt-4 text-sm leading-7 text-white/65">{item.description}</p>
            </div>
          </div>
          <span className="mt-5 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-soft">
            View all designs
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </div>
      </motion.button>
    </Reveal>
  )
}
