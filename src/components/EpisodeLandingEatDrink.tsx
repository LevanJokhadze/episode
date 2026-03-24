import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock3, Sparkles } from 'lucide-react'
import barOneImage from '../assets/images/bar1.jpg'

type EpisodeLandingEatDrinkProps = {
  sectionRef: React.RefObject<HTMLElement | null>
  isActive: boolean
}

const episodeRestaurant = {
  title: 'Episode Restaurant & Bar',
  image: barOneImage,
  subtitle: 'All-day dining + evening cocktails',
  description:
    'One unified social destination for breakfast meetings, signature dinners, and crafted cocktail nights. Designed as a seamless flow, not separate venues.',
  highlights: ['Chef-led seasonal menu', 'Signature cocktail program', 'Social lounge atmosphere'],
} as const

const EpisodeLandingEatDrink: React.FC<EpisodeLandingEatDrinkProps> = ({ sectionRef, isActive }) => {
  return (
    <section
      ref={sectionRef}
      className="relative z-0 flex h-screen w-full snap-start snap-always overflow-hidden bg-[#f1f3f3]"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#f1f3f3]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.9, 0.24, 1] }}
          className="absolute -left-[14%] -top-[18%] h-[560px] w-[560px] rounded-full bg-[#fed5ca]/18 blur-[95px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: isActive ? 0.08 : 0, ease: [0.2, 0.9, 0.24, 1] }}
          className="absolute -bottom-[22%] right-[-8%] h-[580px] w-[580px] rounded-full bg-[#d1e9ec]/20 blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 0.42 } : { opacity: 0 }}
          transition={{ duration: 0.85, delay: isActive ? 0.14 : 0, ease: [0.2, 0.9, 0.24, 1] }}
          className="absolute inset-0 bg-[radial-gradient(58%_50%_at_16%_30%,rgba(254,213,202,0.22),transparent_72%),radial-gradient(58%_55%_at_84%_76%,rgba(209,233,236,0.2),transparent_70%)]"
        />
      </div>
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        shapeRendering="geometricPrecision"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-[0.74] max-[390px]:opacity-[0.48]"
      >
        <defs>
          <path id="eatDrinkLineA" d="M-120 720 C128 690 248 620 392 528 C536 436 680 330 980 276 C1236 226 1468 180 1718 80" />
          <path id="eatDrinkLineB" d="M-80 884 C200 844 346 736 470 612 C594 488 688 380 892 326 C1122 266 1366 320 1718 284" />
          <path id="eatDrinkLineC" d="M-160 542 C164 500 346 434 520 324 C694 214 904 150 1228 102 C1408 76 1550 42 1710 -40" />
        </defs>
        <use href="#eatDrinkLineA" fill="none" stroke="#b8daf0" strokeWidth="2.5" opacity="0.8" />
        <use href="#eatDrinkLineB" fill="none" stroke="#b8daf0" strokeWidth="2.1" opacity="0.7" />
        <use href="#eatDrinkLineC" fill="none" stroke="#b8daf0" strokeWidth="2.2" opacity="0.66" />
        <circle cx="260" cy="640" r="6.4" fill="#d1e9ec" opacity="0.44" />
        <circle cx="1040" cy="280" r="6" fill="#d1e9ec" opacity="0.4" />
      </svg>

      <div className="relative z-20 mx-auto flex h-full w-full max-w-[1320px] min-h-0 flex-col px-4 pb-6 pt-[82px] max-[390px]:px-3 max-[390px]:pb-4 max-[390px]:pt-[74px] md:px-10 md:pb-7 md:pt-[96px]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
          transition={{ duration: 0.68, ease: [0.2, 0.9, 0.24, 1] }}
          className="mb-4 flex shrink-0 flex-col gap-3 max-[390px]:mb-2.5 max-[390px]:gap-2 md:mb-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#1f3436]/62 max-[390px]:text-[9px]">Culinary & social scene</p>
            <h2 className="mt-1 text-[clamp(40px,8vw,74px)] font-medium tracking-tight text-[#1f3436] max-[390px]:text-[34px]">Eat & Drink</h2>
            <p className="mt-1.5 max-w-[64ch] text-[13px] text-[#1f3436]/74 max-[390px]:text-[11px] max-[390px]:leading-[1.3] md:text-[14px]">
              From breakfast meetings to late-night cocktails, Episode blends flavor, design, and social energy in one continuous experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 max-[390px]:gap-1.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1f3436]/14 bg-white/58 px-3 py-1.5 text-[11px] text-[#1f3436]/86 shadow-[0_10px_24px_rgba(31,52,54,0.08)] backdrop-blur-xl max-[390px]:px-2 max-[390px]:py-1 max-[390px]:text-[9px]">
              <Clock3 size={13} />
              Breakfast 07:00 - 11:00
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1f3436]/14 bg-white/58 px-3 py-1.5 text-[11px] text-[#1f3436]/86 shadow-[0_10px_24px_rgba(31,52,54,0.08)] backdrop-blur-xl max-[390px]:px-2 max-[390px]:py-1 max-[390px]:text-[9px]">
              <Clock3 size={13} />
              Bar & Dinner 12:00 - 00:00
            </span>
          </div>
        </motion.div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-1 md:gap-5">
          <motion.article
            initial={{ opacity: 0, x: -28 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: 0.7, delay: isActive ? 0.1 : 0, ease: [0.2, 0.9, 0.24, 1] }}
            className="relative min-h-0 overflow-hidden rounded-[30px] border border-[#1f3436]/15 bg-white/66 shadow-[0_22px_46px_rgba(31,52,54,0.12)] backdrop-blur-[2px] max-[390px]:rounded-[20px]"
          >
            <img src={episodeRestaurant.image} alt={episodeRestaurant.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/18 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 max-[390px]:p-3.5 md:p-7">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#d1e9ec]/90 max-[390px]:text-[9px]">{episodeRestaurant.subtitle}</p>
              <h3 className="mt-1.5 text-[30px] font-semibold leading-[0.95] tracking-tight text-white max-[390px]:text-[22px] md:text-[44px]">
                {episodeRestaurant.title}
              </h3>
              <p className="mt-2 max-w-[52ch] text-[13px] leading-[1.45] text-white/86 max-[390px]:text-[11px] max-[390px]:leading-[1.3] md:text-[14px]">{episodeRestaurant.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 max-[390px]:mt-2 max-[390px]:gap-1.5">
                {episodeRestaurant.highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-full border border-white/22 bg-white/12 px-2.5 py-1 text-[10px] font-medium text-white/90 max-[390px]:px-2 max-[390px]:py-0.5 max-[390px]:text-[8px] md:text-[11px]"
                  >
                    <Sparkles size={11} />
                    {item}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="group mt-3 inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/24 max-[390px]:mt-2 max-[390px]:px-3 max-[390px]:py-1.5 max-[390px]:text-[8px] md:text-[11px]"
              >
                Reserve table
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

export default EpisodeLandingEatDrink
