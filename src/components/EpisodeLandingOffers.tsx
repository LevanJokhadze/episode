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
  const { motion: motionTokens } = episodeDesignLibrary

  return (
    <section
      ref={sectionRef}
      className="relative z-0 flex h-screen snap-start snap-always items-start justify-center overflow-hidden bg-[#f8fafa] px-4 pb-5 pt-[82px] md:items-center md:px-10 md:pb-0 md:pt-0"
    >
      <div className="absolute inset-0 z-[-3] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="pointer-events-none absolute inset-0 z-[-2]">
        <div className="offers-aurora-orb-a absolute -left-[10%] -top-[20%] h-[800px] w-[800px] rounded-full bg-[#d1e9ec]/60 blur-[140px] mix-blend-multiply" />
        <div className="offers-aurora-orb-b absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[#d8f6c5]/40 blur-[140px] mix-blend-multiply" />
      </div>

      <div className="offers-cinematic-noise pointer-events-none absolute inset-0 z-[-1]" />

      <div className="relative z-10 mx-auto w-full max-w-[1320px]">
        <h2 className="mb-4 text-[31px] font-semibold tracking-tight text-[#1f3436] md:mb-8 md:text-[62px]">Offers</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <motion.article
            initial={{ opacity: 0, y: -72 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -72 }}
            whileHover={{ y: motionTokens.hover.slightLiftY, scale: 1.01 }}
            transition={{ duration: motionTokens.timing.slow, ease: 'easeOut', delay: isActive ? 0.06 : 0 }}
            className="group rounded-[24px] bg-[#1f3436] p-5 text-white md:rounded-[28px] md:p-12"
          >
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/72">Direct booking</p>
            <h3 className="mt-2 text-[21px] font-semibold leading-[1.08] md:text-[38px]">Save 10% when you book direct</h3>
            <p className="mt-3 max-w-[44ch] text-[14px] leading-[1.5] text-white/82 md:text-[15px] md:leading-[1.6]">
              Book directly with Episode and unlock an additional 10% discount on all publicly available rates.
            </p>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#d1e9ec]/45 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#d1e9ec] transition-colors hover:bg-[#d1e9ec] hover:text-[#1f3436] md:px-5 md:py-3 md:text-[12px]"
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
            className="group flex flex-col overflow-hidden rounded-[24px] bg-white p-2.5 md:rounded-[28px] md:p-4"
          >
            <div className="relative hidden overflow-hidden rounded-[18px] bg-[#cfd5d5] md:block md:h-auto md:w-2/5 md:rounded-[22px]">
              <img src={longStayImage} alt="Episode coworking and long-stay ambiance" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-black/5 to-transparent" />
            </div>

            <div className="p-4 md:w-3/5 md:p-7">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#1f3436]/66">Long stay</p>
              <h3 className="mt-2 text-[22px] font-semibold leading-[1.08] tracking-tight text-[#1f3436] md:mt-3 md:text-[34px]">
                Stay longer, unlock elevated perks
              </h3>
              <p className="mt-2 text-[14px] leading-[1.45] text-[#1f3436]/78 md:mt-3 md:text-[15px] md:leading-[1.55]">
                Designed for modern travelers who blend work, rest, and city living in one seamless stay.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#d1e9ec] px-2.5 py-1 text-[11px] font-medium text-[#1f3436] md:px-3 md:text-[12px]">
                  <Sparkles size={12} />
                  20% off F&B
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#d8f6c5] px-2.5 py-1 text-[11px] font-medium text-[#1f3436] md:px-3 md:text-[12px]">
                  <Sparkles size={12} />
                  30% off laundry
                </span>
                <span className="inline-flex items-center rounded-full bg-[#edf3f4] px-2.5 py-1 text-[11px] font-medium text-[#1f3436]/85 md:px-3 md:text-[12px]">
                  24/7 gym
                </span>
                <span className="inline-flex items-center rounded-full bg-[#edf3f4] px-2.5 py-1 text-[11px] font-medium text-[#1f3436]/85 md:px-3 md:text-[12px]">
                  coworking access
                </span>
              </div>

              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#1f3436] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#173033] md:mt-6 md:px-5 md:py-3 md:text-[12px]"
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
