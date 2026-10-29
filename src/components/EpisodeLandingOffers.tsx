import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import atmosphericImage from '../assets/images/atrium.jpg'
import directBookingImage from '../assets/images/episode4.jpg'
import longStayImage from '../assets/images/meeting.jpg'

type EpisodeLandingOffersProps = {
  sectionRef: React.RefObject<HTMLElement | null>
  isActive: boolean
}

const EpisodeLandingOffers: React.FC<EpisodeLandingOffersProps> = ({ sectionRef, isActive }) => {
  return (
    <section
      ref={sectionRef}
      className="relative z-0 flex min-h-screen snap-start snap-always items-center justify-center overflow-hidden bg-[#1f3436] px-4 pb-8 pt-[82px] md:px-10 md:pb-10 md:pt-[110px]"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={atmosphericImage}
          alt=""
          aria-hidden
          className="h-full w-full scale-110 object-cover opacity-60 blur-[100px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(64%_52%_at_20%_28%,rgba(254,213,202,0.24),transparent_70%),radial-gradient(56%_50%_at_80%_72%,rgba(209,233,236,0.24),transparent_72%)]" />
      </div>
      <div className="offers-cinematic-noise pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto w-full max-w-[1320px]">
        <h2 className="mb-8 text-[44px] font-medium tracking-tight text-white md:mb-16 md:text-[84px]">Exclusive Offers</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <motion.article
            initial={{ opacity: 0, y: -72 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -72 }}
            whileHover={{ y: -12 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: isActive ? 0.06 : 0 }}
            className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-10 text-white shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/15 md:p-14"
          >
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/78">Direct booking</p>
            <h3 className="mt-3 max-w-[16ch] text-[30px] font-semibold leading-[0.98] md:text-[44px]">Save 10% when you book direct</h3>
            <p className="mt-4 max-w-[34ch] text-[14px] leading-[1.5] text-white/84 md:text-[16px] md:leading-[1.58]">
              Book directly with Episode and unlock an additional 10% discount on all publicly available rates.
            </p>

            <button
              type="button"
              className="group/button mt-6 inline-flex w-fit items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/20 md:mt-8"
            >
              Discover rate
              <ArrowRight size={15} className="transition-transform duration-300 group-hover/button:translate-x-1" />
            </button>

            <div className="pointer-events-none absolute bottom-0 right-0 h-1/2 w-1/2 overflow-hidden rounded-tl-[32px]">
              <img
                src={directBookingImage}
                alt="Bedroom detail"
                className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 72 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 72 }}
            whileHover={{ y: -12 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: isActive ? 0.32 : 0 }}
            className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-10 text-white shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/15 md:p-14"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/78">Long stay</p>
              <h3 className="mt-3 max-w-[18ch] text-[30px] font-semibold leading-[0.98] tracking-tight text-white md:text-[44px]">
                Stay longer, unlock elevated perks
              </h3>
              <p className="mt-4 max-w-[34ch] text-[14px] leading-[1.5] text-white/84 md:text-[16px] md:leading-[1.58]">
                Designed for modern travelers blending work, rest, and social city living in one seamless stay.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white md:text-[12px]">
                  <Sparkles size={12} />
                  20% off F&B
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white md:text-[12px]">
                  <Sparkles size={12} />
                  30% off laundry
                </span>
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white md:text-[12px]">
                  24/7 gym
                </span>
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white md:text-[12px]">
                  coworking access
                </span>
              </div>
            </div>

            <button
              type="button"
              className="group/button mt-6 inline-flex w-fit items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/20 md:mt-8"
            >
              View details
              <ArrowRight size={15} className="transition-transform duration-300 group-hover/button:translate-x-1" />
            </button>

            <div className="pointer-events-none absolute bottom-0 right-0 h-1/2 w-1/2 overflow-hidden rounded-tl-[32px]">
              <img
                src={longStayImage}
                alt="Coworking and lounge ambiance"
                className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

export default EpisodeLandingOffers
