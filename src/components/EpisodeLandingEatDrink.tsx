import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock3 } from 'lucide-react'
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
    description: 'Signature cocktails, curated playlists, and a magnetic social pulse after sunset.',
  },
  {
    title: 'Signature Restaurant',
    image: barTwoImage,
    description: 'Contemporary cuisine with layered textures, seasonal products, and warm hospitality.',
  },
  {
    title: 'Private Dining',
    image: barThreeImage,
    description: 'Refined intimate space designed for celebrations, chef-led moments, and quiet luxury.',
  },
] as const

const EpisodeLandingEatDrink: React.FC<EpisodeLandingEatDrinkProps> = ({ sectionRef, isActive }) => {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <section
      ref={sectionRef}
      className="relative z-0 flex h-screen w-full snap-start snap-always overflow-hidden bg-[#101c1d]"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {eatDrinkCards.map((card, index) => (
          <motion.img
            key={card.title}
            src={card.image}
            alt=""
            initial={false}
            animate={{ opacity: activeImage === index ? 1 : 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}
        <div className="absolute inset-0 bg-[#1f3436]/80 mix-blend-multiply transition-colors duration-700" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[1320px] px-4 pb-5 pt-[82px] md:px-10 md:pb-8 md:pt-[96px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_300px] md:items-end md:gap-5">
          <div>
            <h2 className="text-[44px] font-medium tracking-tight text-white md:text-[64px]">Eat & Drink</h2>
            <p className="mt-2 max-w-[620px] text-[14px] leading-[1.45] text-white/80 md:mt-3 md:text-[16px] md:leading-[1.5]">
              Explore expressive flavors, crafted cocktails, and refined social spaces designed for long evenings and memorable moments.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[12px] text-white/80 backdrop-blur-md md:px-4 md:py-2 md:text-sm">
                <Clock3 size={14} />
                Daily Breakfast 07:00 - 11:00
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[12px] text-white/80 backdrop-blur-md md:px-4 md:py-2 md:text-sm">
                <Clock3 size={14} />
                Bar & Dinner 12:00 - 00:00
              </span>
            </div>
          </div>
        </div>

        <div className="group/section relative z-20 mt-5 grid grid-cols-1 gap-4 pb-3 md:mt-7 md:grid-cols-3 md:gap-5 md:pb-0">
          {eatDrinkCards.map((card, idx) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 44 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
              transition={{ duration: 0.55, ease: [0.2, 0.9, 0.24, 1], delay: isActive ? 0.1 + idx * 0.12 : 0 }}
              onMouseEnter={() => setActiveImage(idx)}
              onFocus={() => setActiveImage(idx)}
              onClick={() => setActiveImage(idx)}
              className={`group/card relative flex h-[250px] flex-col justify-end rounded-[24px] border border-white/10 bg-transparent p-5 transition-all duration-500 hover:-translate-y-2 hover:border-white/30 md:h-[295px] md:p-6 md:group-hover/section:[&:not(:hover)]:scale-[0.98] md:group-hover/section:[&:not(:hover)]:opacity-50 ${
                idx === 1 ? 'md:translate-y-3' : ''
              }`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="pointer-events-none absolute inset-0 h-full w-full rounded-[24px] object-cover [filter:none]"
              />
              <p className="text-[30px] font-semibold leading-[0.94] tracking-tight text-white md:text-[34px]">{card.title}</p>
              <p className="mt-2 max-w-[34ch] text-[13px] leading-[1.38] text-white/78 transition-all duration-500 group-hover/card:-translate-y-1 group-hover/card:text-white/92 md:text-[14px] md:leading-[1.45]">
                {card.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EpisodeLandingEatDrink
