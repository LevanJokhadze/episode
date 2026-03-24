import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import directBookingImage from '../assets/images/episode4.jpg'
import longStayImage from '../assets/images/meeting.jpg'

type EpisodeLandingOffersProps = {
  sectionRef: React.RefObject<HTMLElement | null>
  isActive: boolean
}

const offers = [
  {
    id: 'direct',
    eyebrow: 'Direct booking',
    title: 'Member Rate: Save 10% instantly',
    description:
      'Book direct with Episode for the best available price, flexible policy options, and priority room assignment.',
    bullets: ['Best direct rate', 'Priority room assignment', 'Early access to upgrades'],
    cta: 'Unlock member rate',
    image: directBookingImage,
  },
  {
    id: 'long-stay',
    eyebrow: 'Long stay',
    title: 'Stay 5+ nights, unlock lifestyle perks',
    description:
      'For guests blending work and leisure: premium savings, social access, and daily comfort benefits in one package.',
    bullets: ['20% off F&B', '30% off laundry', '24/7 gym + coworking access'],
    cta: 'View long-stay perks',
    image: longStayImage,
  },
] as const

const EpisodeLandingOffers: React.FC<EpisodeLandingOffersProps> = ({ sectionRef, isActive }) => {
  const [activeOffer, setActiveOffer] = useState(0)

  return (
    <section
      ref={sectionRef}
      className="relative z-0 flex h-screen snap-start snap-always overflow-hidden bg-[#f1f3f3] px-4 pb-6 pt-[82px] max-[390px]:px-3 max-[390px]:pb-4 max-[390px]:pt-[74px] md:px-10 md:pb-7 md:pt-[96px]"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-[12%] -top-[18%] h-[620px] w-[620px] rounded-full bg-[#d1e9ec]/40 blur-[130px]" />
        <div className="absolute -bottom-[24%] right-[-8%] h-[640px] w-[640px] rounded-full bg-[#fed5ca]/28 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(58%_48%_at_18%_30%,rgba(184,218,240,0.18),transparent_72%),radial-gradient(56%_52%_at_82%_76%,rgba(209,233,236,0.2),transparent_70%)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16)_0%,transparent_42%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.12)_0%,transparent_40%)]" />
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        shapeRendering="geometricPrecision"
        className="pointer-events-none absolute inset-0 z-[2] hidden h-full w-full opacity-[0.58] md:block"
      >
        <defs>
          <path id="offersLineA" d="M-80 788 C172 760 332 654 472 544 C612 434 760 356 980 316 C1222 272 1436 206 1700 64" />
          <path id="offersLineB" d="M-120 612 C164 578 326 494 500 404 C676 314 844 246 1046 218 C1282 186 1492 122 1712 -10" />
          <path id="offersLineC" d="M-42 900 C220 862 364 760 468 648 C572 536 650 428 810 378 C1022 312 1298 378 1710 334" />
        </defs>

        <use href="#offersLineA" fill="none" stroke="#b8daf0" strokeWidth="2.6" opacity="0.82" />
        <use href="#offersLineB" fill="none" stroke="#b8daf0" strokeWidth="2.3" opacity="0.74" />
        <use href="#offersLineC" fill="none" stroke="#b8daf0" strokeWidth="2.0" opacity="0.64" />

        <circle cx="290" cy="640" r="6.5" fill="#d1e9ec" opacity="0.48" />
        <circle cx="1080" cy="250" r="5.8" fill="#d1e9ec" opacity="0.44" />
      </svg>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1320px] min-h-0 flex-col">
        <div className="mb-4 flex shrink-0 flex-col gap-3 max-[390px]:mb-2.5 max-[390px]:gap-2 md:mb-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.65, ease: [0.2, 0.9, 0.24, 1] }}
          >
            <h2 className="text-[clamp(40px,8vw,74px)] font-medium tracking-tight text-[#1f3436] max-[390px]:text-[34px]">Exclusive Offers</h2>
            <p className="mt-1.5 max-w-[64ch] text-[13px] text-[#1f3436]/74 max-[390px]:mt-1 max-[390px]:text-[11px] max-[390px]:leading-[1.34] md:text-[14px]">
              Two curated ways to get more value from every stay. Hover each card to preview its atmosphere, then lock your best fit.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.65, delay: isActive ? 0.12 : 0, ease: [0.2, 0.9, 0.24, 1] }}
            className="hidden w-fit items-center gap-2 rounded-2xl border border-[#1f3436]/14 bg-white/55 px-3.5 py-2 text-[11px] text-[#1f3436]/84 shadow-[0_10px_24px_rgba(31,52,54,0.08)] backdrop-blur-xl md:inline-flex"
          >
            <Sparkles size={14} />
            Best value guaranteed for direct guests
          </motion.div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-2.5 md:grid-cols-[1.02fr_0.98fr] md:gap-5">
          {offers.map((offer, idx) => {
            const isSelected = idx === activeOffer
            return (
              <motion.article
                key={offer.id}
                initial={{ opacity: 0, y: idx === 0 ? -64 : 64 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: idx === 0 ? -64 : 64 }}
                transition={{ duration: 0.58, delay: isActive ? 0.08 + idx * 0.14 : 0, ease: [0.2, 0.9, 0.24, 1] }}
                onMouseEnter={() => setActiveOffer(idx)}
                onFocus={() => setActiveOffer(idx)}
                onClick={() => setActiveOffer(idx)}
                className={`group relative flex min-h-0 cursor-pointer flex-col justify-between overflow-hidden rounded-[20px] border p-3.5 text-[#1f3436] shadow-[0_18px_38px_rgba(31,52,54,0.12)] backdrop-blur-[2px] transition-all duration-500 md:rounded-[32px] md:p-7 ${
                  isSelected
                    ? 'border-[#1f3436]/22 bg-white/70 -translate-y-0.5'
                    : 'border-[#1f3436]/12 bg-white/52 hover:-translate-y-1 hover:bg-white/64'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[9px] uppercase tracking-[0.16em] text-[#1f3436]/70 md:text-[11px]">{offer.eyebrow}</p>
                    {idx === 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#d8f6c5]/55 px-2 py-0.5 text-[9px] font-medium text-[#1f3436] md:text-[10px]">
                        <Sparkles size={11} />
                        Most popular
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-2 max-w-[17ch] text-[18px] font-semibold leading-[1] md:text-[32px]">{offer.title}</h3>
                  <p className="mt-2.5 hidden max-w-[36ch] text-[13px] leading-[1.45] text-[#1f3436]/82 md:block md:text-[14px]">{offer.description}</p>
                  <div className="mt-3 hidden grid gap-1.5 md:grid">
                    {offer.bullets.map((bullet) => (
                      <p key={bullet} className="inline-flex items-center gap-1.5 text-[11px] text-[#1f3436]/82 md:text-[12px]">
                        <Check size={13} className="text-[#5f8f8c]" />
                        {bullet}
                      </p>
                    ))}
                  </div>
                  <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[#1f3436]/58 md:hidden">Tap for details</p>
                </div>

                <button
                  type="button"
                  className="group/button mt-2 inline-flex w-fit items-center gap-2 rounded-xl border border-[#1f3436]/22 bg-[#1f3436] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#173033] md:mt-4 md:px-4 md:py-2 md:text-[11px]"
                >
                  {offer.cta}
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover/button:translate-x-1" />
                </button>

                <motion.div
                  initial={false}
                  animate={{ opacity: isSelected ? 0.92 : 0.74, scale: isSelected ? 1 : 0.98 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.9, 0.24, 1] }}
                  className="pointer-events-none absolute bottom-0 right-0 h-[46%] w-[48%] overflow-hidden rounded-tl-[22px] md:h-[52%] md:w-[52%] md:rounded-tl-[32px]"
                >
                  <img
                    src={offer.image}
                    alt={idx === 0 ? 'Bedroom detail' : 'Coworking and lounge ambiance'}
                    className="h-full w-full object-cover opacity-[0.92] transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.45, delay: isActive ? 0.16 : 0, ease: [0.2, 0.9, 0.24, 1] }}
          className="relative z-20 mt-1.5 rounded-2xl border border-[#1f3436]/12 bg-white/72 p-3 shadow-[0_12px_30px_rgba(31,52,54,0.1)] backdrop-blur-sm md:hidden"
        >
          <p className="text-[10px] uppercase tracking-[0.15em] text-[#1f3436]/58">Selected offer</p>
          <h3 className="mt-1 text-[16px] font-semibold leading-tight text-[#1f3436]">{offers[activeOffer].title}</h3>
          <p className="mt-1 text-[10px] leading-[1.3] text-[#1f3436]/78">{offers[activeOffer].description}</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {offers[activeOffer].bullets.map((bullet) => (
              <span key={`mobile-${bullet}`} className="inline-flex items-center gap-1 rounded-full bg-[#d1e9ec]/55 px-2 py-0.5 text-[9px] text-[#1f3436]/86">
                <Check size={11} />
                {bullet}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EpisodeLandingOffers
