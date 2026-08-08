import { lazy, Suspense, useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FaWhatsapp } from 'react-icons/fa'
import { ArrowDown, ArrowRight, Check, Gem, Layers3, Phone, Sparkles, Truck } from 'lucide-react'
import { whatsapp } from '../lib/whatsapp'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { bedding, ladiesSuiting, collectionsByType, heroParticles } from '../data/collections'
import { Reveal, Eyebrow, PrimaryLink } from '../components/Shared'
import CollectionCard from '../components/CollectionCard'
import FeaturedShowcase from '../components/FeaturedShowcase'
import CollectionModal from '../components/CollectionModal'
import StatCounter from '../components/StatCounter'

const ImmersiveLoom = lazy(() => import('../components/ImmersiveLoom'))

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

export default function Home() {
  const [modal, setModal] = useState(null)
  const isXlUp = useMediaQuery('(min-width: 1280px)')

  const openCollection = useCallback((type, index) => setModal({ type, index }), [])
  const closeCollection = useCallback(() => setModal(null), [])
  const selectCollectionIndex = useCallback(
    (index) => setModal((current) => (current ? { type: current.type, index } : current)),
    [],
  )

  const modalItems = useMemo(() => (modal ? collectionsByType[modal.type] : null), [modal])

  return (
    <main>
      <section id="home" className="hero-showroom relative isolate -mt-[82px] min-h-[calc(100svh-36px)] overflow-hidden bg-forest pt-[82px] text-white">
        <img
          src="/mmg-showroom-hero.png"
          alt="MMG International showroom filled with premium bedding collections"
          width="1918"
          height="820"
          fetchPriority="high"
          className="absolute inset-0 -z-20 size-full object-cover object-[52%_center] sm:object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,23,19,.97)_0%,rgba(3,23,19,.86)_34%,rgba(3,23,19,.38)_64%,rgba(3,23,19,.12)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#031713]/75 via-transparent to-black/20" />

        <div className="mesh-blob -left-24 top-10 -z-10 size-[420px] bg-gold/40" aria-hidden="true" />
        <div className="mesh-blob -right-16 bottom-0 -z-10 size-[380px] bg-jade/60" style={{ animationDelay: '-6s' }} aria-hidden="true" />
        {heroParticles.map((particle, index) => (
          <span
            key={index}
            className="hero-particle -z-10"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: `${particle.delay}s`,
            }}
            aria-hidden="true"
          />
        ))}

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
              <a
                href={whatsapp('Assalam-o-Alaikum MMG International. Please share your latest wholesale prices.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-13 items-center justify-center gap-3 border border-white/25 px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-white/60 hover:bg-white/5"
              >
                Get wholesale prices <FaWhatsapp size={17} className="text-gold-soft" />
              </a>
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

        {isXlUp && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="absolute right-12 top-32 z-10 hidden h-[280px] w-[280px] overflow-hidden border border-gold/25 bg-black/25 shadow-[0_30px_90px_rgba(0,0,0,.5)] backdrop-blur-sm xl:block"
          >
            <Suspense fallback={<div className="size-full bg-[#04120f]" />}>
              <ImmersiveLoom />
            </Suspense>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
              <p className="text-[8px] font-bold uppercase tracking-[0.26em] text-gold-soft">Live weave preview</p>
              <p className="mt-1 font-display text-lg text-white">MMG Signature Motion</p>
            </div>
          </motion.div>
        )}

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

      <section className="border-b border-white/10 bg-[#071d19] px-5 py-14 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-8 sm:grid-cols-4">
          <Reveal><StatCounter value={2} label="Product Worlds" /></Reveal>
          <Reveal delay={0.08}><StatCounter value={11} suffix="+" label="Signature Ranges" /></Reveal>
          <Reveal delay={0.16}><StatCounter value={100} suffix="%" label="Wholesale Focused" /></Reveal>
          <Reveal delay={0.24}>
            <div>
              <p className="font-display text-5xl font-semibold text-white sm:text-6xl">Faisalabad</p>
              <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">Nationwide Supply</p>
            </div>
          </Reveal>
        </div>
      </section>

      <FeaturedShowcase onOpen={openCollection} />

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
              <p className="max-w-lg text-sm leading-7 text-white/55 lg:ml-auto">Five bedding identities—from exact fitted comfort to expressive florals and refined satin texture—ready for your next wholesale selection. Tap any design to browse the complete range.</p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-12">
            {bedding.map((item, index) => (
              <CollectionCard key={item.title} item={item} index={index} type="bedding" onOpen={() => openCollection('bedding', index)} />
            ))}
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
              <p className="max-w-lg text-sm leading-7 text-forest/55 lg:ml-auto">Six expressive ranges, each with its own fabric story—from shimmering festive lawn to vivid summer prints and classic digital florals. Tap any design to browse the complete range.</p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-24 lg:grid-cols-3">
            {ladiesSuiting.map((item, index) => (
              <CollectionCard key={item.title} item={item} index={index} type="ladies" onOpen={() => openCollection('ladies', index)} />
            ))}
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
            <PrimaryLink inverse href={whatsapp("Assalam-o-Alaikum. Please send me the complete MMG Bedding and Ladies Suiting catalogues with wholesale prices.")}>Chat on WhatsApp</PrimaryLink>
            <a href="tel:+923239658666" className="inline-flex min-h-13 items-center justify-center gap-3 border border-white/30 px-6 text-[10px] font-bold uppercase tracking-[0.17em] text-white transition-colors hover:border-gold hover:bg-gold hover:text-forest"><Phone size={15} />+92 323 9658666</a>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {modal && modalItems && (
          <CollectionModal
            type={modal.type}
            items={modalItems}
            activeIndex={modal.index}
            onClose={closeCollection}
            onSelectIndex={selectCollectionIndex}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
