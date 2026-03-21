import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import longStayImage from '../assets/images/atrium.jpg'
import { episodeDesignLibrary } from '../design-library'

type EpisodeLandingOffersProps = {
  sectionRef: React.RefObject<HTMLElement | null>
  isActive: boolean
}

const EpisodeLandingOffers: React.FC<EpisodeLandingOffersProps> = ({ sectionRef, isActive }) => {
  const { colors, motion: motionTokens } = episodeDesignLibrary

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen snap-start snap-always items-center justify-center overflow-hidden bg-[#eef2f2] px-4 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="episode-ambient-orb episode-ambient-orb-a"
          style={{ backgroundColor: colors.brand.light }}
        />
        <div
          className="episode-ambient-orb episode-ambient-orb-b"
          style={{ backgroundColor: colors.accent.blue }}
        />
        <div
          className="episode-ambient-orb episode-ambient-orb-c"
          style={{ backgroundColor: colors.accent.green }}
        />
        <div className="episode-noise-overlay absolute inset-0 opacity-100" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1320px]">
        <h2 className="mb-6 text-[46px] font-semibold tracking-tight text-[#1f3436] md:mb-8 md:text-[62px]">Offers</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: -72 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -72 }}
            whileHover={{ y: motionTokens.hover.slightLiftY, scale: 1.01 }}
            transition={{ duration: motionTokens.timing.slow, ease: 'easeOut', delay: isActive ? 0.06 : 0 }}
            className="group rounded-[28px] bg-[#1f3436] p-8 text-white md:p-12"
          >
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/72">Direct booking</p>
            <h3 className="mt-3 text-[30px] font-semibold leading-[1.06] md:text-[38px]">Save 10% when you book direct</h3>
            <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.6] text-white/82">
              Book directly with Episode and unlock an additional 10% discount on all publicly available rates.
            </p>

            <button
              type="button"
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[#d1e9ec]/45 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#d1e9ec] transition-colors hover:bg-[#d1e9ec] hover:text-[#1f3436]"
            >
              Discover rate
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 72 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 72 }}
            whileHover={{ y: motionTokens.hover.slightLiftY, scale: 1.01 }}
            transition={{ duration: motionTokens.timing.slow, ease: 'easeOut', delay: isActive ? 0.38 : 0 }}
            className="group flex flex-col overflow-hidden rounded-[28px] bg-white p-3 md:flex-row md:p-4"
          >
            <div className="relative h-[200px] overflow-hidden rounded-[22px] bg-[#cfd5d5] md:h-auto md:w-2/5">
              <img src={longStayImage} alt="Episode coworking and long-stay ambiance" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-black/5 to-transparent" />
            </div>

            <div className="p-5 md:w-3/5 md:p-7">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#1f3436]/66">Long stay</p>
              <h3 className="mt-3 text-[28px] font-semibold leading-[1.08] tracking-tight text-[#1f3436] md:text-[34px]">
                Stay longer, unlock elevated perks
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#1f3436]/78">
                Designed for modern travelers who blend work, rest, and city living in one seamless stay.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#d1e9ec] px-3 py-1 text-[12px] font-medium text-[#1f3436]">
                  <Sparkles size={12} />
                  20% off F&B
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#d8f6c5] px-3 py-1 text-[12px] font-medium text-[#1f3436]">
                  <Sparkles size={12} />
                  30% off laundry
                </span>
                <span className="inline-flex items-center rounded-full bg-[#edf3f4] px-3 py-1 text-[12px] font-medium text-[#1f3436]/85">
                  24/7 gym
                </span>
                <span className="inline-flex items-center rounded-full bg-[#edf3f4] px-3 py-1 text-[12px] font-medium text-[#1f3436]/85">
                  coworking access
                </span>
              </div>

              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1f3436] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#173033]"
              >
                View details
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

export default EpisodeLandingOffers
