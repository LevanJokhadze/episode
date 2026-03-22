import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock3 } from 'lucide-react'
import { episodeDesignLibrary } from '../design-library'
import barOneImage from '../assets/images/bar1.jpg'
import barTwoImage from '../assets/images/bar2.jpg'
import barThreeImage from '../assets/images/bar3.jpeg'

type EpisodeLandingEatDrinkProps = {
  sectionRef: React.RefObject<HTMLElement | null>
  isActive: boolean
}

const eatDrinkCards = [
  {
    title: 'Episode Bar',
    image: barOneImage,
  },
  {
    title: 'Signature Restaurant',
    image: barTwoImage,
  },
  {
    title: 'Private Dining',
    image: barThreeImage,
  },
] as const

const EpisodeLandingEatDrink: React.FC<EpisodeLandingEatDrinkProps> = ({ sectionRef, isActive }) => {
  const motionTokens = episodeDesignLibrary.motion

  return (
    <section
      ref={sectionRef}
      className="relative z-0 flex h-screen snap-start snap-always items-start overflow-hidden bg-[#101c1d] pt-[76px] md:pt-[104px]"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-[14%] top-[8%] h-[680px] w-[680px] rounded-full bg-[#fed5ca]/10 blur-[160px]" />
        <div className="absolute -bottom-[18%] right-[-6%] h-[620px] w-[620px] rounded-full bg-[#d1e9ec]/10 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-4 md:px-10 md:py-0">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_320px] md:items-end md:gap-4">
          <div>
            <h2 className="text-[44px] font-semibold tracking-tight text-white md:text-[58px]">Eat & Drink</h2>
            <p className="mt-2 max-w-[620px] text-[14px] leading-[1.45] text-white/80 md:mt-4 md:text-lg md:leading-[1.55]">
              Explore expressive flavors, crafted cocktails, and refined social spaces designed for long evenings and memorable moments.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 md:mt-5 md:gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white/80 backdrop-blur-md md:px-4 md:py-2 md:text-sm">
                <Clock3 size={14} />
                Daily Breakfast 07:00 - 11:00
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white/80 backdrop-blur-md md:px-4 md:py-2 md:text-sm">
                <Clock3 size={14} />
                Bar & Dinner 12:00 - 00:00
              </span>
            </div>
          </div>

          <div className="md:justify-self-end">
            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#d1e9ec] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#101c1d] transition-transform duration-300 hover:translate-y-[-1px] md:px-5 md:py-2.5 md:text-[11px]"
            >
              View spaces
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="group/section mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-6 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0">
          {eatDrinkCards.map((card, idx) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 44 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
              transition={{ duration: motionTokens.timing.slow, ease: [0.2, 0.9, 0.24, 1], delay: isActive ? 0.1 + idx * 0.12 : 0 }}
              className={`group/card relative min-w-[78%] snap-start overflow-hidden rounded-[22px] transition-all duration-500 md:min-w-0 md:group-hover/section:[&:not(:hover)]:scale-[0.98] md:group-hover/section:[&:not(:hover)]:opacity-50 ${
                idx === 1 ? 'md:translate-y-4' : ''
              }`}
            >
              <div className="h-[250px] w-full overflow-hidden md:h-[290px]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 md:px-5 md:pb-5 md:pt-12">
                <p className="text-[22px] font-medium text-white md:text-2xl">{card.title}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EpisodeLandingEatDrink
