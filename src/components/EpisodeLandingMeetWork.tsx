import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MoveHorizontal } from 'lucide-react'
import hotDesksImage from '../assets/images/atrium.jpg'
import meetingRoomsImage from '../assets/images/meeting.jpg'
import privateOfficeImage from '../assets/images/episode4.jpg'
import { episodeDesignLibrary } from '../design-library'

type EpisodeLandingMeetWorkProps = {
  sectionRef: React.RefObject<HTMLElement | null>
  isActive: boolean
}

const panels = [
  {
    title: 'Hot Desks',
    description: 'Flexible stations with ultra-fast Wi-Fi, natural light, and all-day lounge access.',
    image: hotDesksImage,
  },
  {
    title: 'Meeting Rooms',
    description: 'Seats up to 12. Smart screens, integrated conferencing, and privacy-grade acoustics.',
    image: meetingRoomsImage,
  },
  {
    title: 'Private Offices',
    description: 'Fully serviced offices for focused teams with premium hospitality built into the workflow.',
    image: privateOfficeImage,
  },
] as const

const EpisodeLandingMeetWork: React.FC<EpisodeLandingMeetWorkProps> = ({ sectionRef, isActive }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const ui = episodeDesignLibrary.components

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen snap-start snap-always flex-col overflow-hidden bg-[#f8fafa] px-4 pb-6 pt-[82px] max-[390px]:px-3 max-[390px]:pb-4 max-[390px]:pt-[74px] md:px-10 md:pb-7 md:pt-[98px]"
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        shapeRendering="geometricPrecision"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-[0.86] max-[390px]:opacity-[0.58]"
      >
        <defs>
          <filter id="meetWorkLineGlow" x="-220%" y="-220%" width="560%" height="560%">
            <feGaussianBlur stdDeviation="8.2" result="blurred" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="coreGlow" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="coreGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path id="meetWorkLineA" d="M-80 740 C240 712 372 566 496 462 C620 358 796 326 1128 298 C1320 282 1486 240 1700 118" />
          <path id="meetWorkLineB" d="M-120 518 C140 492 288 424 456 334 C624 244 842 204 1120 156 C1326 122 1508 78 1710 -10" />
          <path id="meetWorkLineC" d="M-60 860 C198 828 342 730 486 620 C630 510 760 430 906 402 C1090 366 1272 402 1700 354" />
          <path id="meetWorkLineD" d="M-40 670 C180 620 278 548 354 430 C432 312 508 196 700 126" />
        </defs>

        <use href="#meetWorkLineA" fill="none" stroke="#d1e9ec" strokeWidth="2.6" opacity="0.66" />
        <use href="#meetWorkLineB" fill="none" stroke="#d1e9ec" strokeWidth="2.2" opacity="0.58" />
        <use href="#meetWorkLineC" fill="none" stroke="#d1e9ec" strokeWidth="2.1" opacity="0.52" />
        <use href="#meetWorkLineD" fill="none" stroke="#d1e9ec" strokeWidth="1.9" opacity="0.48" />

        <g filter="url(#meetWorkLineGlow)" opacity="0.88">
          <circle r="7.2" fill="#ffffff" opacity="0.5" />
          <circle r="3.1" fill="#ffffff" />
          <animateMotion dur="8.2s" repeatCount="indefinite" rotate="auto">
            <mpath href="#meetWorkLineA" />
          </animateMotion>
        </g>
        <g filter="url(#meetWorkLineGlow)" opacity="0.82">
          <circle r="6.6" fill="#d1e9ec" opacity="0.54" />
          <circle r="2.8" fill="#ffffff" />
          <animateMotion dur="9.1s" repeatCount="indefinite" rotate="auto">
            <mpath href="#meetWorkLineB" />
          </animateMotion>
        </g>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.2, 0.9, 0.24, 1] }}
        className="relative z-10 mb-4 flex shrink-0 flex-col gap-4 max-[390px]:mb-2.5 max-[390px]:gap-2.5 md:mb-5 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h2 className="text-[clamp(40px,8vw,74px)] font-medium tracking-tight text-[#1f3436] max-[390px]:text-[34px]">Meet & Work</h2>
          <p className="mt-2.5 max-w-2xl text-[14px] text-[#1f3436]/70 max-[390px]:mt-1.5 max-[390px]:text-[12px] max-[390px]:leading-[1.35] md:text-[15px]">
            Designed for modern professionals, teams, and creative sessions with seamless hospitality, elegant spaces, and
            effortless booking flow.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 max-[390px]:gap-1.5">
          <button
            type="button"
            className={`${ui.bookingPanel.submit} inline-flex h-10 items-center justify-center px-5 text-[11px] uppercase tracking-[0.12em] max-[390px]:h-8 max-[390px]:px-3 max-[390px]:text-[9px]`}
          >
            View rooms
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#1f3436]/25 px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1f3436] transition-colors hover:bg-[#1f3436]/6 max-[390px]:h-8 max-[390px]:px-3 max-[390px]:text-[9px]"
          >
            Book now
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.75, delay: isActive ? 0.1 : 0, ease: [0.2, 0.9, 0.24, 1] }}
        className="relative z-10 flex min-h-0 flex-1 w-full flex-col gap-2 max-[390px]:gap-1.5 md:flex-row md:gap-3"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {panels.map((panel, idx) => {
          const isHovered = hoveredIndex === idx
          const expanded = hoveredIndex !== null && isHovered
          const desktopFlexBasis = hoveredIndex === null ? '33.3333%' : expanded ? '60%' : '20%'
          return (
            <motion.article
              key={panel.title}
              onMouseEnter={() => setHoveredIndex(idx)}
              onClick={() => setHoveredIndex((prev) => (prev === idx ? null : idx))}
              onFocus={() => setHoveredIndex(idx)}
              onBlur={() => setHoveredIndex(null)}
              style={{ flexBasis: desktopFlexBasis }}
              initial={{ opacity: 0, y: 22 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.62, delay: isActive ? 0.14 + idx * 0.08 : 0, ease: [0.2, 0.9, 0.24, 1] }}
              className="group relative min-h-0 w-full cursor-pointer overflow-hidden rounded-[24px] max-[390px]:rounded-[18px] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] md:h-full md:flex-[0_0_auto]"
            >
              <img
                src={panel.image}
                alt={panel.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f3436]/90 via-[#1f3436]/20 to-transparent" />

              <motion.div
                className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm transition-all duration-300 max-[390px]:right-2.5 max-[390px]:top-2.5 max-[390px]:px-2 max-[390px]:py-0.5 max-[390px]:text-[8px] ${
                  expanded ? 'translate-y-1 opacity-0' : 'translate-y-0 opacity-100'
                }`}
                animate={expanded ? { scale: 0.96 } : { scale: [1, 1.05, 1] }}
                transition={expanded ? { duration: 0.2 } : { duration: 2.2, repeat: Infinity, repeatType: 'loop' }}
              >
                <MoveHorizontal size={12} />
                Hover or tap
              </motion.div>

              <div className="absolute inset-0 flex items-end p-5 max-[390px]:p-3 md:p-6">
                <div className="w-full">
                  <h3
                    className={`text-[24px] font-medium tracking-tight text-white transition-transform duration-500 max-[390px]:text-[18px] md:text-[30px] ${
                      expanded ? '-translate-y-1' : 'translate-y-0'
                    }`}
                  >
                    {panel.title}
                  </h3>
                <div
                  className={`overflow-hidden transition-all duration-700 ${
                    expanded ? 'max-h-40 translate-y-0 opacity-100 delay-100' : 'max-h-0 translate-y-4 opacity-0'
                  }`}
                >
                  <p className="mt-2.5 max-w-[34ch] text-[13px] leading-[1.45] text-white/86 max-[390px]:mt-1 max-[390px]:text-[10px] max-[390px]:leading-[1.3] md:text-[14px]">{panel.description}</p>
                  <button
                    type="button"
                    className="group/button mt-3 inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/20 max-[390px]:mt-1.5 max-[390px]:px-2.5 max-[390px]:py-1 max-[390px]:text-[8px] md:text-[11px]"
                  >
                    Book Space
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/button:translate-x-1" />
                  </button>
                </div>
                </div>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}

export default EpisodeLandingMeetWork
