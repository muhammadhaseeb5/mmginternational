import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

export function Brand() {
  return (
    <Link to="/" className="group inline-flex shrink-0 items-center" aria-label="MMG International home">
      <img
        src="/mmg-international-logo-transparent.png"
        alt=""
        width="720"
        height="658"
        className="h-14 w-auto object-contain drop-shadow-[0_5px_14px_rgba(0,0,0,.24)] transition-transform duration-500 group-hover:scale-105 sm:h-16"
      />
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
