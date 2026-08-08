import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

export function Brand({ light = false }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="MMG International home">
      <img
        src="/mmg-international-logo.png"
        alt=""
        width="56"
        height="56"
        className="size-12 object-contain transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105 sm:size-14"
      />
      <span className="flex flex-col leading-none">
        <strong className={`font-display text-xl tracking-wide ${light ? 'text-white' : 'text-forest'}`}>MMG</strong>
        <span className={`mt-1.5 text-[8px] font-bold tracking-[0.32em] ${light ? 'text-gold-soft' : 'text-bronze'}`}>
          INTERNATIONAL
        </span>
      </span>
    </Link>
  )
}

export function Reveal({ children, className = '', delay = 0, amount = 0.15 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.75, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children, light = false }) {
  return (
    <div className={`mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] ${light ? 'text-gold-soft' : 'text-bronze'}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </div>
  )
}

export function PrimaryLink({ href, children, inverse = false }) {
  const external = href.startsWith('http')
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex min-h-13 items-center justify-center gap-3 overflow-hidden px-6 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
        inverse ? 'bg-ivory text-forest hover:bg-white' : 'bg-gold text-forest hover:bg-gold-soft'
      }`}
    >
      <span className="shine-sweep" />
      {children}
      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
    </motion.a>
  )
}
