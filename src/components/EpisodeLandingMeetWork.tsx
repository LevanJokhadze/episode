import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import hotDesksImage from '../assets/images/atrium.jpg'
import meetingRoomsImage from '../assets/images/meeting.jpg'
import privateOfficeImage from '../assets/images/episode4.jpg'
import { episodeDesignLibrary } from '../design-library'

type EpisodeLandingMeetWorkProps = {
  sectionRef: React.RefObject<HTMLElement | null>
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

const EpisodeLandingMeetWork: React.FC<EpisodeLandingMeetWorkProps> = ({ sectionRef }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const ui = episodeDesignLibrary.components

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen snap-start snap-always flex-col overflow-hidden bg-[#f8fafa] px-4 pb-10 pt-24 md:px-10"
    >
      <div className="relative z-10 mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-[48px] font-medium tracking-tight text-[#1f3436] md:text-[84px]">Meet & Work</h2>
          <p className="mt-4 max-w-2xl text-[16px] text-[#1f3436]/70">
            Designed for modern professionals, teams, and creative sessions with seamless hospitality, elegant spaces, and
            effortless booking flow.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className={`${ui.bookingPanel.submit} inline-flex h-11 items-center justify-center px-6 text-[12px] uppercase tracking-[0.12em]`}
          >
            View rooms
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#1f3436]/25 px-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#1f3436] transition-colors hover:bg-[#1f3436]/6"
          >
            Book now
          </button>
        </div>
      </div>

      <div
        className="relative z-10 flex h-[60vh] w-full flex-col gap-2 md:flex-row md:gap-4"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {panels.map((panel, idx) => {
          const isHovered = hoveredIndex === idx
          const expanded = hoveredIndex !== null && isHovered
          return (
            <article
              key={panel.title}
              onMouseEnter={() => setHoveredIndex(idx)}
              onFocus={() => setHoveredIndex(idx)}
              onBlur={() => setHoveredIndex(null)}
              className={`group relative cursor-pointer overflow-hidden rounded-[24px] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                hoveredIndex === null ? 'w-full md:w-1/3' : expanded ? 'w-full md:w-[60%]' : 'w-full md:w-[20%]'
              }`}
            >
              <img
                src={panel.image}
                alt={panel.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f3436]/90 via-[#1f3436]/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3 className="text-3xl font-medium tracking-tight text-white">{panel.title}</h3>
                <div
                  className={`overflow-hidden transition-all duration-700 delay-100 ${
                    expanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                >
                  <p className="mt-3 max-w-[36ch] text-[14px] leading-[1.5] text-white/86">{panel.description}</p>
                  <button
                    type="button"
                    className="group/button mt-4 inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/20"
                  >
                    Book Space
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/button:translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default EpisodeLandingMeetWork
