import { motion, useReducedMotion } from 'motion/react'
import { ArrowDownRight, Sparkles } from 'lucide-react'
import { Eyebrow } from './Shared'

const officers = [
  {
    name: 'Abdul Rashid (Pasha)',
    role: 'General Manager',
    badge: 'GM',
    image: '/team/general-manager.webp',
    width: 1200,
    height: 900,
    position: '50% 40%',
    number: '01',
    note: 'Leadership & direction',
  },
  {
    name: 'M. Haseeb Shahzad',
    role: 'Assistant Manager',
    badge: 'AM',
    image: '/team/assistant-manager.webp',
    width: 1200,
    height: 960,
    position: '50% 38%',
    number: '02',
    note: 'Operations & coordination',
  },
]

const salesRepresentative = {
  name: 'Sohail Malik',
  role: 'Sales Representative',
  badge: 'Sales',
  image: '/team/sales-representative.webp',
  width: 1086,
  height: 1448,
  position: '50% 28%',
  number: '03',
  note: 'Wholesale relationships',
}

const titleLines = [
  ['Member', 'Of'],
  ['MMG', 'International'],
]

function AnimatedTitle() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.h2
      id="members-heading"
      aria-label="Member Of MMG International"
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
      }}
      className="font-display text-[clamp(3.15rem,7.5vw,7.6rem)] font-semibold leading-[0.76] tracking-[-0.055em] text-white [perspective:1000px]"
    >
      <span aria-hidden="true" className="block">
        {titleLines.map((line, lineIndex) => (
          <span key={line.join('-')} className="flex flex-wrap items-baseline gap-x-[0.18em] overflow-hidden pb-[0.1em]">
            {line.map((word, wordIndex) => {
              const highlighted = lineIndex === 1
              return (
                <motion.span
                  key={word}
                  variants={{
                    hidden: { opacity: 0, y: '115%', rotateX: -68 },
                    visible: { opacity: 1, y: 0, rotateX: 0 },
                  }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-block origin-bottom ${
                    highlighted ? (wordIndex === 1 ? 'italic text-gold-soft' : 'text-gold') : ''
                  }`}
                >
                  {word}
                </motion.span>
              )
            })}
          </span>
        ))}
      </span>
    </motion.h2>
  )
}

function GroupHeading({ number, title, count }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-5 border-b border-white/15 pb-5 sm:mb-10">
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="font-display text-3xl italic text-gold sm:text-4xl">{number}</span>
        <h3 id={`${title.toLowerCase().replaceAll(' ', '-')}-heading`} className="text-[10px] font-bold uppercase tracking-[0.3em] text-white sm:text-xs">
          {title}
        </h3>
      </div>
      <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/60">{count}</span>
    </div>
  )
}

function OfficerCard({ member, index }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 70, rotate: index === 0 ? -1.25 : 1.25 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.95, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduceMotion ? undefined : { y: -9 }}
      aria-label={`${member.name}, ${member.role}, MMG International`}
      className={`member-card group relative isolate overflow-hidden border border-white/15 bg-[#0a2c25] shadow-[0_30px_90px_rgba(0,0,0,.28)] ${
        index === 1 ? 'lg:mt-28' : ''
      }`}
    >
      <div className={index === 0 ? 'aspect-[5/6]' : 'aspect-[4/5]'}>
        <img
          src={member.image}
          alt={`${member.name}, ${member.role} at MMG International`}
          width={member.width}
          height={member.height}
          loading="lazy"
          decoding="async"
          sizes={index === 0 ? '(min-width: 1024px) 700px, 100vw' : '(min-width: 1024px) 500px, 100vw'}
          style={{ objectPosition: member.position }}
          className="member-image absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#021612] via-[#021612]/10 to-transparent" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-7">
        <span className="inline-flex min-h-8 items-center border border-white/30 bg-[#031914]/35 px-3 text-[8px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-md">
          {member.badge}
        </span>
        <span className="font-display text-4xl italic text-white/55 sm:text-5xl">{member.number}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
        <p className="mb-3 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.28em] text-gold-soft">
          <Sparkles size={12} /> {member.note}
        </p>
        <h4 className="max-w-xl font-display text-[clamp(2.5rem,5vw,4.6rem)] font-semibold leading-[0.86] tracking-[-0.04em] text-white">
          {member.name}
        </h4>
        <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.28em] text-white/65">{member.role}</p>
      </div>
    </motion.article>
  )
}

function SalesCard() {
  const reduceMotion = useReducedMotion()
  const member = salesRepresentative

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`${member.name}, ${member.role}, MMG International`}
      className="member-card group relative isolate grid overflow-hidden border border-gold/25 bg-[#0a2c25] shadow-[0_35px_110px_rgba(0,0,0,.32)] lg:grid-cols-[.86fr_1.14fr]"
    >
      <div className="relative order-2 flex min-h-[400px] flex-col justify-between overflow-hidden p-7 sm:min-h-[520px] sm:p-11 lg:order-1 lg:min-h-[620px] lg:p-14">
        <div className="member-title-outline pointer-events-none absolute -left-4 top-8 font-display text-[clamp(7rem,16vw,14rem)] font-semibold leading-none" aria-hidden="true">
          {member.number}
        </div>
        <div className="relative flex items-start justify-between">
          <span className="inline-flex min-h-8 items-center border border-gold/35 px-3 text-[8px] font-bold uppercase tracking-[0.25em] text-gold-soft">
            {member.badge}
          </span>
          <ArrowDownRight size={32} strokeWidth={1.15} className="text-gold" />
        </div>
        <div className="relative">
          <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-gold-soft">{member.note}</p>
          <h4 className="max-w-lg font-display text-[clamp(3.4rem,7vw,6.8rem)] font-semibold leading-[0.78] tracking-[-0.045em] text-white">
            Sohail <span className="italic text-gold-soft">Malik</span>
          </h4>
          <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.3em] text-white/65">{member.role}</p>
          <p className="mt-7 max-w-sm text-sm leading-7 text-white/50">
            Your direct connection to MMG collections, current availability and wholesale guidance.
          </p>
        </div>
      </div>

      <div className="relative order-1 min-h-[500px] overflow-hidden sm:min-h-[620px] lg:order-2">
        <img
          src={member.image}
          alt={`${member.name}, ${member.role} at MMG International`}
          width={member.width}
          height={member.height}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 760px, 100vw"
          style={{ objectPosition: member.position }}
          className="member-image absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031914]/55 via-transparent to-[#031914]/10 lg:bg-gradient-to-r lg:from-[#0a2c25]/25 lg:via-transparent lg:to-transparent" />
      </div>
    </motion.article>
  )
}

export default function MembersShowcase() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="members" aria-labelledby="members-heading" className="members-showcase relative isolate overflow-hidden border-b border-white/10 px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="member-weave pointer-events-none absolute inset-0 -z-20" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-56 -z-10 size-[520px] rounded-full bg-gold/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-56 bottom-40 -z-10 size-[620px] rounded-full bg-[#15584c]/40 blur-[140px]" aria-hidden="true" />
      <div className="member-section-watermark pointer-events-none absolute -right-12 top-8 -z-10 font-display text-[clamp(8rem,22vw,23rem)] font-semibold leading-none" aria-hidden="true">
        MMG
      </div>

      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[.64fr_1.36fr] lg:items-end lg:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.2, 0.75, 0.25, 1] }}
          >
            <Eyebrow light>Meet the people</Eyebrow>
            <p className="max-w-sm text-sm leading-7 text-white/50">
              The officers and representative moving MMG International forward, together.
            </p>
          </motion.div>
          <AnimatedTitle />
        </div>

        <motion.div
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.15, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 h-px origin-left bg-gradient-to-r from-gold via-gold-soft/55 to-transparent lg:mt-20"
        />

        <section aria-labelledby="officers-heading" className="pt-16 sm:pt-20 lg:pt-24">
          <GroupHeading number="01" title="Officers" count="02 members" />
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <OfficerCard member={officers[0]} index={0} />
            </div>
            <div className="lg:col-span-5">
              <OfficerCard member={officers[1]} index={1} />
            </div>
          </div>
        </section>

        <section aria-labelledby="sales-representative-heading" className="pt-24 sm:pt-32 lg:pt-40">
          <GroupHeading number="02" title="Sales Representative" count="01 member" />
          <SalesCard />
        </section>
      </div>
    </section>
  )
}
