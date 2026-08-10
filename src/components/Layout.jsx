import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { FaWhatsapp } from 'react-icons/fa'
import { Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { whatsapp } from '../lib/whatsapp'
import { navItems } from '../data/collections'
import { Brand } from './Shared'
import CursorGlow from './CursorGlow'

export default function Layout() {
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
      <div className="grain-overlay" />
      <CursorGlow />
      <motion.div className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-gold" style={{ scaleX: progress }} />

      <div className="relative z-50 flex min-h-9 items-center justify-center bg-[#031713] px-5 text-center text-[9px] font-bold uppercase tracking-[0.23em] text-white/55 sm:justify-between sm:px-[5vw]">
        <span>Wholesale collections</span>
        <span className="hidden text-gold-soft/80 sm:block">Bedding · Ladies Suiting · Curtains</span>
        <a className="hidden transition-colors hover:text-white md:block" href="tel:+923219658666">+92 321 9658666</a>
      </div>

      <header className={`sticky top-0 z-40 border-b border-white/15 bg-[#031713]/92 backdrop-blur-xl transition-all duration-500 ${scrolled ? 'shadow-[0_10px_35px_rgba(0,0,0,.18)]' : ''}`}>
        <div className={`mx-auto flex max-w-[1500px] items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-12 ${scrolled ? 'h-[70px]' : 'h-[82px]'}`}>
          <Brand light />
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="nav-link text-[11px] font-bold uppercase tracking-[0.16em] text-white/85 transition-colors hover:text-gold-soft">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={whatsapp("Assalam-o-Alaikum MMG International. Please share your latest wholesale collections and prices.")}
              target="_blank"
              rel="noreferrer"
              className="group relative hidden min-h-11 items-center gap-2 overflow-hidden bg-gold px-5 text-[9px] font-bold uppercase tracking-[0.17em] text-forest transition-all hover:-translate-y-0.5 hover:bg-gold-soft sm:flex"
            >
              <span className="shine-sweep" />
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
                href={whatsapp('Please send me your latest Bedding, Ladies Suiting and Curtains catalogues.')}
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

      <Outlet />

      <footer className="bg-[#031713] px-5 pb-8 pt-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.2fr_.7fr_1fr]">
            <div><Brand light /><p className="mt-7 max-w-sm text-sm leading-7 text-white/45">Premium wholesale bedding, ladies suiting and curtain collections for textile businesses across Pakistan.</p></div>
            <div>
              <h3 className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-soft">Collections</h3>
              <div className="mt-6 flex flex-col gap-3">
                <a href="/#bedding" className="w-fit text-sm text-white/55 transition-colors hover:text-white">Bedding</a>
                <a href="/#ladies-suiting" className="w-fit text-sm text-white/55 transition-colors hover:text-white">Ladies Suiting</a>
                <a href="/#curtains" className="w-fit text-sm text-white/55 transition-colors hover:text-white">Curtains</a>
                <a href="/catalogue" className="w-fit text-sm text-white/55 transition-colors hover:text-white">Full Catalogue</a>
                <a href="/#our-standard" className="w-fit text-sm text-white/55 transition-colors hover:text-white">Our Standard</a>
              </div>
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
                <a className="flex items-center gap-3 transition-colors hover:text-white" href="tel:+923219658666"><Phone size={16} className="text-gold" />+92 321 9658666</a>
                <a className="flex items-center gap-3 transition-colors hover:text-white" href="mailto:mmgsinternational@gmail.com"><Mail size={16} className="text-gold" />mmgsinternational@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-7 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} MMG International. All rights reserved.</p>
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
                    <p className="text-sm font-bold">MMG International</p>
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
                  <a
                    href={whatsapp('Assalam-o-Alaikum. Please share the complete Curtains collection catalogue and wholesale prices.')}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-2 rounded-lg border border-[#075e54]/15 bg-white px-3 py-3 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-[#075e54] transition-colors hover:bg-[#e7f6ef]"
                  >
                    Curtains
                  </a>
                </div>
                <a
                  href={whatsapp("Assalam-o-Alaikum MMG International. Please send me your complete wholesale catalogue and latest prices.")}
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
