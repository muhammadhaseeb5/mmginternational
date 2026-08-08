import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { allCollectionItems } from '../data/collections'
import { Reveal, Eyebrow } from '../components/Shared'

export default function CatalogueHub() {
  return (
    <main className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-2xl">
          <Eyebrow>The complete catalogue</Eyebrow>
          <h1 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[.92] tracking-[-0.04em] text-forest">
            Every collection, <span className="italic text-bronze">every design.</span>
          </h1>
          <p className="mt-6 text-sm leading-7 text-forest/55">
            Choose a range to browse its complete photo library — every colourway and volume we have on file, all in one place.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {allCollectionItems.map((item, index) => (
            <Reveal key={item.slug} delay={(index % 3) * 0.06}>
              <Link
                to={`/catalogue/${item.slug}`}
                className="collection-card group relative block min-h-[360px] overflow-hidden bg-[#0a201b] shadow-[0_20px_50px_rgba(7,29,25,.15)]"
              >
                <img
                  src={item.image}
                  alt={`${item.title} collection`}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: item.position }}
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031713]/92 via-[#031713]/15 to-black/5" />
                <span className="shine-sweep" />
                <span className="absolute left-6 top-6 border border-white/25 bg-black/15 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur-md">
                  {item.type === 'bedding' ? 'Bedding' : 'Ladies Suiting'}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.24em] text-gold-soft">{item.overline}</p>
                  <h3 className="font-display text-3xl font-semibold leading-[.95] text-white">{item.title}</h3>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    {item.price && (
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">From</span>
                        <p className="font-display text-base font-semibold text-gold-soft">{item.price}</p>
                      </div>
                    )}
                    <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-soft">
                      View catalogue
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  )
}
