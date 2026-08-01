import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { FaWhatsapp } from 'react-icons/fa'
import {
  ArrowDown,
  ArrowRight,
  Check,
  Gem,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from 'lucide-react'

const phone = '923009658666'
const whatsapp = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

const navItems = [
  ['Bedding', '#bedding'],
  ['Ladies Suiting', '#ladies-suiting'],
  ['Our Standard', '#our-standard'],
  ['Contact', '#contact'],
]

const bedding = [
  {
    title: 'Royal Fit',
    overline: 'Fitted comfort',
    description: 'A refined fitted-sheet collection designed for a precise finish and effortless presentation.',
    image: '/collections/royal-fit.jpg',
    position: 'center 42%',
    layout: 'lg:col-span-7',
  },
  {
    title: 'Elga Premium',
    overline: 'Elevated essentials',
    description: 'Premium three-piece bedding with distinctive prints and a polished retail presence.',
    image: '/collections/elga-premium.jpg',
    position: 'center 43%',
    layout: 'lg:col-span-5',
  },
  {
    title: 'Elga Signature',
    overline: 'Signature florals',
    description: 'Statement designs, coordinated pillow covers and an unmistakably luxurious character.',
    image: '/collections/elga-signature.jpg',
    position: 'center 43%',
    layout: 'lg:col-span-5',
  },
  {
    title: 'CheckMate',
    overline: 'Modern texture',
    description: 'A confident checkerboard weave with a sleek, contemporary bedroom aesthetic.',
    image: '/collections/checkmate.png',
    position: 'center',
    layout: 'lg:col-span-3',
  },
  {
    title: 'Demase',
    overline: 'Satin stripe',
    description: 'Rich colour and subtle stripe texture composed for an elegant, hotel-inspired finish.',
    image: '/collections/demase.jpeg',
    position: 'center',
    layout: 'lg:col-span-4',
  },
]

const ladiesSuiting = [
  {
    title: 'Chamki Lawn',
    overline: 'Shimmering lawn',
    description: 'Graceful floral detailing with a luminous finish for standout seasonal looks.',
    image: '/collections/chamki-lawn.jpeg',
    position: 'center',
  },
  {
    title: '3D Digital Poly Lilan Lawn',
    overline: 'Dimensional print',
    description: 'Bold digital florals with depth, clarity and coordinated three-piece styling.',
    image: '/collections/3d-digital-poly-lilan-lawn.png',
    position: 'center top',
  },
  {
    title: 'Elga Cotton BanaDora Lawn',
    overline: 'Cotton refinement',
    description: 'Soft cotton character paired with delicate florals and beautifully balanced colour.',
    image: '/collections/elga-cotton-banadora-lawn.jpeg',
    position: 'center top',
  },
  {
    title: 'Classic Digital Lilan Lawn',
    overline: 'Classic elegance',
    description: 'Elegant digital florals created for timeless, versatile everyday dressing.',
    image: '/collections/classic-digital-lilan-lawn.jpeg',
    position: 'center top',
  },
  {
    title: 'Elga Summer Collection',
    overline: 'Summer edit',
    description: 'Fresh colour stories and expressive patterns made for the energy of summer.',
    image: '/collections/elga-summer-collection.jpg',
    position: 'center top',
  },
  {
    title: 'Snow Flake',
    overline: 'Cool-touch style',
    description: 'A crisp floral story with rich colour contrast and an effortlessly graceful mood.',
    image: '/collections/snow-flake.jpg',
    position: 'center top',
  },
]

const benefits = [
  {
    icon: Gem,
    title: 'Premium by design',
    text: 'Collections selected for impressive presentation, distinctive detail and confident retail appeal.',
  },
  {
    icon: Layers3,
    title: 'Two complete worlds',
    text: 'Five bedding ranges and six ladies suiting ranges, curated under one trusted textile house.',
  },
  {
    icon: Truck,
    title: 'Wholesale support',
    text: 'Direct catalogue guidance, current availability and nationwide supply from Faisalabad.',
  },
]

function Brand({ light = false }) {
  return (
    <a href="#home" className="group inline-flex items-center gap-3" aria-label="MMG's International home">
      <img
        src="/mmg-international-logo.png"
        alt=""
        width="56"
        height="56"
        className="size-12 object-contain transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105 sm:size-14"
      />
      <span className="flex flex-col leading-none">
        <strong className={`font-display text-xl tracking-wide ${light ? 'text-white' : 'text-forest'}`}>MMG’S</strong>
        <span className={`mt-1.5 text-[8px] font-bold tracking-[0.32em] ${light ? 'text-gold-soft' : 'text-bronze'}`}>
          INTERNATIONAL
        </span>
      </span>
    </a>
  )
}

function Reveal({ children, className = '', delay = 0, amount = 0.15 }) {
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

function Eyebrow({ children, light = false }) {
  return (
    <div className={`mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] ${light ? 'text-gold-soft' : 'text-bronze'}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </div>
  )
}

function PrimaryLink({ href, children, inverse = false }) {
  const external = href.startsWith('http')
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`group inline-flex min-h-13 items-center justify-center gap-3 px-6 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
        inverse ? 'bg-ivory text-forest hover:bg-white' : 'bg-gold text-forest hover:bg-gold-soft'
      }`}
    >
      {children}
      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
    </motion.a>
  )
}

function CollectionCard({ item, index, type = 'bedding' }) {
  const message = `Assalam-o-Alaikum. I am interested in the ${item.title} ${type === 'bedding' ? 'Bedding' : 'Ladies Suiting'} collection. Please share the catalogue, wholesale pricing and availability.`
  const isBedding = type === 'bedding'

  return (
    <Reveal className={isBedding ? item.layout : ''} delay={(index % 3) * 0.07}>
      <motion.a
        href={whatsapp(message)}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 190, damping: 22 }}
        className={`collection-card group relative block overflow-hidden bg-[#0a201b] shadow-[0_28px_70px_rgba(7,29,25,.15)] ${
          isBedding ? 'min-h-[430px] sm:min-h-[520px]' : 'min-h-[560px] sm:min-h-[640px]'
        }`}
        aria-label={`Request the ${item.title} catalogue on WhatsApp`}
      >
        <img
          src={item.image}
          alt={`${item.title} collection`}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: item.position }}
          className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031713]/95 via-[#031713]/10 to-black/5 transition-colors duration-500 group-hover:via-[#031713]/20" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 sm:p-8">
          <span className="border border-white/25 bg-black/15 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-md">
            {type === 'bedding' ? 'Bedding' : 'Ladies Suiting'}
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
            Request catalogue
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </div>
      </motion.a>
    </Reveal>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [whatsappOpen, setWhatsappOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const popupTimer = window.setTimeout(() => setWhatsappOpen(true), 2600)
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setWhatsappOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(popupTimer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div className="overflow-clip bg-ivory text-ink">
      <motion.div className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-gold" style={{ scaleX: progress }} />

      <div className="relative z-50 flex min-h-9 items-center justify-center bg-[#031713] px-5 text-center text-[9px] font-bold uppercase tracking-[0.23em] text-white/55 sm:justify-between sm:px-[5vw]">
        <span>Wholesale collections</span>
        <span className="hidden text-gold-soft/80 sm:block">Bedding &amp; Ladies Suiting</span>
        <a className="hidden transition-colors hover:text-white md:block" href="tel:+923009658666">+92 300 9658666</a>
      </div>

      <header className={`sticky top-0 z-40 border-b transition-all duration-500 ${scrolled ? 'border-white/15 bg-[#031713]/82 shadow-[0_10px_35px_rgba(0,0,0,.18)] backdrop-blur-xl' : 'border-white/15 bg-transparent'}`}>
        <div className={`mx-auto flex max-w-[1500px] items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-12 ${scrolled ? 'h-[70px]' : 'h-[82px]'}`}>
          <Brand light />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="nav-link text-[10px] font-bold uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={whatsapp("Assalam-o-Alaikum MMG's International. Please share your latest wholesale collections and prices.")}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-11 items-center gap-2 bg-gold px-5 text-[9px] font-bold uppercase tracking-[0.17em] text-forest transition-all hover:-translate-y-0.5 hover:bg-gold-soft sm:flex"
            >
              <FaWhatsapp size={17} />
              WhatsApp us
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center border border-white/30 text-white lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="absolute inset-x-0 top-full border-t border-forest/10 bg-ivory px-6 pb-8 pt-4 shadow-2xl lg:hidden"
            >
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {navItems.map(([label, href], index) => (
                  <motion.a
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-forest/10 py-5 font-display text-3xl text-forest"
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>
              <a
                href={whatsapp('Please send me your latest Bedding and Ladies Suiting catalogues.')}
                target="_blank"
                rel="noreferrer"
                className="mt-7 flex items-center justify-center gap-2 bg-forest p-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
              >
                <FaWhatsapp size={18} /> Chat on WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="hero-showroom relative isolate -mt-[82px] min-h-[calc(100svh-36px)] overflow-hidden bg-forest pt-[82px] text-white">
          <img
            src="/mmg-showroom-hero.png"
            alt="MMG's International showroom filled with premium bedding collections"
            width="1918"
            height="820"
            fetchPriority="high"
            className="absolute inset-0 -z-20 size-full object-cover object-[52%_center] sm:object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,23,19,.97)_0%,rgba(3,23,19,.86)_34%,rgba(3,23,19,.38)_64%,rgba(3,23,19,.12)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#031713]/75 via-transparent to-black/20" />
          <div className="mx-auto flex min-h-[calc(100svh-36px)] max-w-[1500px] items-center px-5 py-20 sm:px-8 lg:px-12 lg:py-16">
            <motion.div initial="hidden" animate="show" className="relative z-10 max-w-3xl lg:w-[52%]">
              <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.7 }}>
                <Eyebrow light>Premium wholesale textiles · Faisalabad</Eyebrow>
              </motion.div>
              <motion.h1
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } } }}
                className="font-display text-[clamp(4rem,7.2vw,7.8rem)] font-semibold leading-[0.82] tracking-[-0.05em]"
              >
                {['Fabric', 'with', 'forward', 'motion.'].map((word, index) => (
                  <motion.span
                    key={word}
                    variants={{ hidden: { opacity: 0, y: 55, rotateX: -40 }, show: { opacity: 1, y: 0, rotateX: 0 } }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className={`block origin-bottom ${index > 1 ? 'text-gold-soft' : ''}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.75, delay: 0.55 }}
                className="mt-8 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8"
              >
                Premium Bedding and Ladies Suiting collections curated for retailers, distributors and ambitious textile businesses across Pakistan.
              </motion.p>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.75, delay: 0.68 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <PrimaryLink href="#collection-index">Explore collections</PrimaryLink>
                <button
                  type="button"
                  onClick={() => setWhatsappOpen(true)}
                  className="inline-flex min-h-13 items-center justify-center gap-3 border border-white/25 px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-white/60 hover:bg-white/5"
                >
                  Get wholesale prices <FaWhatsapp size={17} className="text-gold-soft" />
                </button>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                transition={{ delay: 0.9 }}
                className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/45"
              >
                {['2 collections', '11 signature ranges', 'Nationwide supply'].map((point) => (
                  <span key={point} className="flex items-center gap-2"><Check size={13} className="text-gold" />{point}</span>
                ))}
              </motion.div>
            </motion.div>
          </div>
          <a href="#collection-index" aria-label="Scroll to the collection index" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[8px] font-bold uppercase tracking-[0.28em] text-white/40 xl:flex">
            Discover
            <motion.span animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><ArrowDown size={14} /></motion.span>
          </a>
        </section>

        <div className="marquee overflow-hidden border-b border-forest/10 bg-gold py-3 text-[9px] font-bold uppercase tracking-[0.28em] text-forest">
          <div className="marquee-track flex min-w-max items-center gap-9">
            {[...Array(2)].flatMap((_, group) => ['Royal Fit', 'Elga Premium', 'Elga Signature', 'Chamki Lawn', 'Classic Digital Lawn', 'Snow Flake'].map((item) => (
              <span key={`${group}-${item}`} className="flex items-center gap-9"><Sparkles size={12} />{item}</span>
            )))}
          </div>
        </div>

        <section id="collection-index" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
              <Reveal>
                <Eyebrow>The collection house</Eyebrow>
                <p className="max-w-sm text-sm leading-7 text-ink/55">Two distinct product worlds, presented with one uncompromising MMG standard.</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-forest">
                  Your next bestseller <span className="italic text-bronze">starts here.</span>
                </h2>
              </Reveal>
            </div>

            <div className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-2">
              <Reveal>
                <a href="#bedding" className="collection-gateway group relative flex min-h-[540px] overflow-hidden bg-forest p-8 text-white sm:p-11">
                  <img src="/collections/royal-fit.jpg" alt="Royal Fit bedding" className="absolute inset-0 size-full object-cover object-[center_42%] transition-transform duration-[1400ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031713]/95 via-[#031713]/25 to-black/10" />
                  <div className="relative mt-auto w-full">
                    <div className="mb-5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.24em] text-gold-soft">
                      <span>Collection 01</span><span>05 ranges</span>
                    </div>
                    <h3 className="font-display text-6xl font-semibold leading-none sm:text-7xl">Bedding</h3>
                    <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">Beautifully coordinated fitted, printed and textured bedding collections for a premium bedroom story.</p>
                    <span className="mt-7 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-soft">View bedding <ArrowRight size={15} className="transition-transform group-hover:translate-x-1.5" /></span>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={0.1}>
                <a href="#ladies-suiting" className="collection-gateway group relative flex min-h-[540px] overflow-hidden bg-forest p-8 text-white sm:p-11">
                  <img src="/collections/chamki-lawn.jpeg" alt="Chamki Lawn ladies suiting" className="absolute inset-0 size-full object-cover object-top transition-transform duration-[1400ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031713]/95 via-[#031713]/20 to-black/5" />
                  <div className="relative mt-auto w-full">
                    <div className="mb-5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.24em] text-gold-soft">
                      <span>Collection 02</span><span>06 ranges</span>
                    </div>
                    <h3 className="font-display text-6xl font-semibold leading-none sm:text-7xl">Ladies Suiting</h3>
                    <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">Expressive lawn, digital florals and summer colour stories curated for modern seasonal dressing.</p>
                    <span className="mt-7 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-soft">View ladies suiting <ArrowRight size={15} className="transition-transform group-hover:translate-x-1.5" /></span>
                  </div>
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="bedding" className="relative overflow-hidden bg-[#061b17] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="texture-grid pointer-events-none absolute inset-0 opacity-25" />
          <div className="absolute -right-44 top-32 size-[520px] rounded-full border border-gold/10" />
          <div className="relative mx-auto max-w-[1320px]">
            <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_.75fr]">
              <Reveal>
                <Eyebrow light>Collection 01 · Bedding</Eyebrow>
                <h2 className="font-display text-[clamp(4rem,8vw,8rem)] font-semibold leading-[.8] tracking-[-0.05em]">Rest, <span className="italic text-gold-soft">reimagined.</span></h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-lg text-sm leading-7 text-white/55 lg:ml-auto">Five bedding identities—from exact fitted comfort to expressive florals and refined satin texture—ready for your next wholesale selection.</p>
              </Reveal>
            </div>

            <div className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-12">
              {bedding.map((item, index) => <CollectionCard key={item.title} item={item} index={index} type="bedding" />)}
            </div>
          </div>
        </section>

        <section id="ladies-suiting" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_.8fr]">
              <Reveal>
                <Eyebrow>Collection 02 · Ladies Suiting</Eyebrow>
                <h2 className="font-display text-[clamp(4rem,8vw,8rem)] font-semibold leading-[.8] tracking-[-0.05em] text-forest">Style in <span className="italic text-bronze">full bloom.</span></h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-lg text-sm leading-7 text-forest/55 lg:ml-auto">Six expressive ranges, each with its own fabric story—from shimmering festive lawn to vivid summer prints and classic digital florals.</p>
              </Reveal>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-24 lg:grid-cols-3">
              {ladiesSuiting.map((item, index) => <CollectionCard key={item.title} item={item} index={index} type="ladies" />)}
            </div>
          </div>
        </section>

        <section id="our-standard" className="border-y border-forest/10 bg-[#efe8da] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1320px]">
            <Reveal className="max-w-4xl">
              <Eyebrow>The MMG standard</Eyebrow>
              <h2 className="font-display text-[clamp(3.2rem,6vw,6.2rem)] font-semibold leading-[.9] tracking-[-0.04em] text-forest">Designed to be noticed. Selected to <span className="italic text-bronze">sell.</span></h2>
            </Reveal>
            <div className="mt-16 grid divide-y divide-forest/12 border-y border-forest/12 md:grid-cols-3 md:divide-x md:divide-y-0">
              {benefits.map(({ icon: Icon, title, text }, index) => (
                <Reveal key={title} delay={index * 0.08} className="p-7 sm:p-9 lg:p-12">
                  <Icon size={25} strokeWidth={1.4} className="text-bronze" />
                  <h3 className="mt-9 font-display text-3xl font-semibold text-forest">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-forest/55">{text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-7 border border-forest/12 bg-ivory p-7 sm:p-10">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-bronze">Wholesale ordering</p>
                <h3 className="mt-3 font-display text-3xl font-semibold text-forest sm:text-4xl">Choose a range. Share your quantity. Receive current pricing.</h3>
              </div>
              <PrimaryLink href={whatsapp('Please guide me through placing a wholesale order for MMG bedding or ladies suiting.')}>Start an order</PrimaryLink>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="relative isolate overflow-hidden bg-forest px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12">
          <img
            src="/mmg-showroom-hero.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 -z-30 size-full object-cover object-center"
          />
          <div className="absolute inset-0 -z-20 bg-[#031713]/78" />
          <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#031713]/95 via-[#031713]/72 to-[#031713]/40" />
          <div className="absolute -right-32 -top-40 -z-10 size-[520px] rounded-full border border-gold/20" />
          <div className="absolute -right-10 -top-20 -z-10 size-[360px] rounded-full border border-gold/20" />
          <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <Reveal>
              <Eyebrow light>Request the complete catalogue</Eyebrow>
              <h2 className="max-w-4xl font-display text-[clamp(3.5rem,7vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.05em] text-white">Which collection speaks to you?</h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65">Tell us the collection, quantity and delivery city. Our team will respond with current availability and wholesale prices.</p>
            </Reveal>
            <Reveal delay={0.1} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
              <PrimaryLink inverse href={whatsapp("Assalam-o-Alaikum. Please send me MMG's complete Bedding and Ladies Suiting catalogues with wholesale prices.")}>Chat on WhatsApp</PrimaryLink>
              <a href="tel:+923009658666" className="inline-flex min-h-13 items-center justify-center gap-3 border border-white/30 px-6 text-[10px] font-bold uppercase tracking-[0.17em] text-white transition-colors hover:border-gold hover:bg-gold hover:text-forest"><Phone size={15} />+92 300 9658666</a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#031713] px-5 pb-8 pt-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.2fr_.7fr_1fr]">
            <div><Brand light /><p className="mt-7 max-w-sm text-sm leading-7 text-white/45">Premium wholesale bedding and ladies suiting collections for textile businesses across Pakistan.</p></div>
            <div>
              <h3 className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-soft">Collections</h3>
              <div className="mt-6 flex flex-col gap-3"><a href="#bedding" className="w-fit text-sm text-white/55 transition-colors hover:text-white">Bedding</a><a href="#ladies-suiting" className="w-fit text-sm text-white/55 transition-colors hover:text-white">Ladies Suiting</a><a href="#our-standard" className="w-fit text-sm text-white/55 transition-colors hover:text-white">Our Standard</a></div>
            </div>
            <div>
              <h3 className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-soft">Contact</h3>
              <div className="mt-6 space-y-4 text-sm text-white/55">
                <a
                  href="https://maps.app.goo.gl/1RrrCTT1iW289HPz9?g_st=awb"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open MMG International FSD location in Google Maps"
                  className="group flex items-start gap-3 transition-colors hover:text-white"
                >
                  <MapPin size={17} className="mt-0.5 shrink-0 text-gold transition-transform group-hover:-translate-y-0.5" />
                  <span><strong className="font-semibold text-white/75">MMG International FSD</strong><br />Masha Allah Plaza, Habib Center Street,<br />Factory Area, Faisalabad, Pakistan</span>
                </a>
                <a className="flex items-center gap-3 transition-colors hover:text-white" href="tel:+923009658666"><Phone size={16} className="text-gold" />+92 300 9658666</a>
                <a className="flex items-center gap-3 transition-colors hover:text-white" href="mailto:mmgsinternational@gmail.com"><Mail size={16} className="text-gold" />mmgsinternational@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-7 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} MMG’s International. All rights reserved.</p>
            <p>Wholesale textiles · Faisalabad</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end sm:bottom-7 sm:right-7">
        <AnimatePresence>
          {whatsappOpen && (
            <motion.aside
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              role="dialog"
              aria-label="WhatsApp catalogue assistance"
              className="mb-4 w-[calc(100vw-40px)] max-w-[350px] overflow-hidden rounded-2xl bg-white shadow-[0_24px_75px_rgba(0,0,0,.28)]"
            >
              <div className="relative bg-[#075e54] px-5 pb-5 pt-6 text-white">
                <button
                  type="button"
                  onClick={() => setWhatsappOpen(false)}
                  className="absolute right-3 top-3 grid size-8 place-items-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close WhatsApp popup"
                >
                  <X size={17} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-full bg-white text-[#075e54] shadow-md">
                    <FaWhatsapp size={26} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">MMG’s International</p>
                    <p className="mt-1 flex items-center gap-1.5 text-[10px] text-white/70"><span className="size-1.5 rounded-full bg-[#5df076]" />Typically replies quickly</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#efeae2] p-4">
                <div className="rounded-xl rounded-tl-sm bg-white p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#075e54]">MMG Sales Team</p>
                  <p className="mt-2 text-sm leading-6 text-forest/75">Assalam-o-Alaikum! Which collection would you like to explore today?</p>
                  <p className="mt-2 text-right text-[9px] text-forest/35">Now</p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={whatsapp('Assalam-o-Alaikum. Please share the complete Bedding collection catalogue and wholesale prices.')}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-[#075e54]/15 bg-white px-3 py-3 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-[#075e54] transition-colors hover:bg-[#e7f6ef]"
                  >
                    Bedding
                  </a>
                  <a
                    href={whatsapp('Assalam-o-Alaikum. Please share the complete Ladies Suiting collection catalogue and wholesale prices.')}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-[#075e54]/15 bg-white px-3 py-3 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-[#075e54] transition-colors hover:bg-[#e7f6ef]"
                  >
                    Ladies Suiting
                  </a>
                </div>
                <a
                  href={whatsapp("Assalam-o-Alaikum MMG's International. Please send me your complete wholesale catalogue and latest prices.")}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_10px_25px_rgba(37,211,102,.24)] transition-transform hover:-translate-y-0.5"
                >
                  <FaWhatsapp size={19} /> Start conversation
                </a>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
        <motion.button
          type="button"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.1, type: 'spring' }}
          whileHover={{ scale: 1.08, rotate: 4 }}
          onClick={() => setWhatsappOpen((open) => !open)}
          aria-label={whatsappOpen ? 'Close WhatsApp assistance' : 'Open WhatsApp assistance'}
          aria-expanded={whatsappOpen}
          className="relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_15px_35px_rgba(0,0,0,.25)] sm:size-16"
        >
          <FaWhatsapp size={31} />
          {!whatsappOpen && <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full border-2 border-white bg-[#ff3b30] text-[9px] font-bold">1</span>}
        </motion.button>
      </div>
    </div>
  )
}

export default App
