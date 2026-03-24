import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import episodeRoomImage from '../assets/images/episode4.jpg'
import roomTwoImage from '../assets/images/room2.avif'
import meetingImage from '../assets/images/meeting.jpg'

type EpisodeLandingSleepProps = {
  sectionRef: React.RefObject<HTMLElement | null>
  isActive: boolean
}

const rooms = [
  {
    id: '01',
    title: 'Solo Room',
    specs: '20m2 • 1 Bed',
    description: 'Compact premium room crafted for solo stays, calm mornings, and seamless city routines.',
    mood: 'Quiet city reset',
    image: episodeRoomImage,
  },
  {
    id: '02',
    title: 'Double Room',
    specs: '20m2 • 1 Bed',
    description: 'Refined double setup with warm textures, intuitive comfort, and balanced space for two.',
    mood: 'Couple comfort',
    image: roomTwoImage,
  },
  {
    id: '03',
    title: 'Twin Room',
    specs: '20m2 • 2 Beds',
    description: 'Editorial twin layout with practical luxury for friends, colleagues, and flexible stays.',
    mood: 'Shared smart stay',
    image: meetingImage,
  },
] as const

const EpisodeLandingSleep: React.FC<EpisodeLandingSleepProps> = ({ sectionRef, isActive }) => {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0)
  const [hoveredRoomIndex, setHoveredRoomIndex] = useState<number | null>(null)
  const activeRoomIndex = hoveredRoomIndex ?? selectedRoomIndex
  const activeRoom = rooms[activeRoomIndex]
  const imageCarouselRef = useRef<HTMLDivElement | null>(null)
  const roomTypeCarouselRef = useRef<HTMLDivElement | null>(null)

  const scrollToRoom = (index: number) => {
    const bounded = Math.max(0, Math.min(index, rooms.length - 1))
    setSelectedRoomIndex(bounded)

    const imageCarousel = imageCarouselRef.current
    if (imageCarousel) {
      const firstCard = imageCarousel.querySelector('[data-sleep-mobile-card="true"]') as HTMLElement | null
      const gap = Number.parseFloat(window.getComputedStyle(imageCarousel).columnGap || window.getComputedStyle(imageCarousel).gap || '0')
      const step = (firstCard?.offsetWidth ?? imageCarousel.clientWidth) + (Number.isFinite(gap) ? gap : 0)
      imageCarousel.scrollTo({ left: step * bounded, behavior: 'smooth' })
    }

    const roomTypeCarousel = roomTypeCarouselRef.current
    const chip = roomTypeCarousel?.querySelector(`[data-room-chip-index="${bounded}"]`) as HTMLElement | null
    chip?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  const goToPrevRoom = () => scrollToRoom((activeRoomIndex - 1 + rooms.length) % rooms.length)
  const goToNextRoom = () => scrollToRoom((activeRoomIndex + 1) % rooms.length)

  const handleMobileImageScroll = () => {
    const imageCarousel = imageCarouselRef.current
    if (!imageCarousel) return
    const firstCard = imageCarousel.querySelector('[data-sleep-mobile-card="true"]') as HTMLElement | null
    const gap = Number.parseFloat(window.getComputedStyle(imageCarousel).columnGap || window.getComputedStyle(imageCarousel).gap || '0')
    const step = (firstCard?.offsetWidth ?? imageCarousel.clientWidth) + (Number.isFinite(gap) ? gap : 0)
    const nextIndex = Math.round(imageCarousel.scrollLeft / Math.max(step, 1))
    const bounded = Math.max(0, Math.min(nextIndex, rooms.length - 1))
    if (bounded !== selectedRoomIndex) {
      setSelectedRoomIndex(bounded)
      const roomTypeCarousel = roomTypeCarouselRef.current
      const chip = roomTypeCarousel?.querySelector(`[data-room-chip-index="${bounded}"]`) as HTMLElement | null
      chip?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  return (
    <section ref={sectionRef} className="relative flex h-screen w-full snap-start snap-always flex-col overflow-hidden bg-[#eef2f2] md:flex-row">
      {/* Mobile storytelling version */}
      <div className="relative flex h-full flex-col justify-center gap-4 pb-3 pt-[72px] md:hidden">
        <svg
          viewBox="0 0 1000 1200"
          preserveAspectRatio="none"
          shapeRendering="geometricPrecision"
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-[0.82]"
        >
          <defs>
            <path id="sleepMobileLineA" d="M-70 48 V772 C-70 942 78 1038 258 1038 C438 1038 584 942 584 772 C584 676 516 614 430 614 C344 614 276 676 276 772 V844" />
            <path id="sleepMobileLineB" d="M1070 1128 V378 C1070 208 922 112 742 112 C562 112 416 208 416 378 C416 474 484 536 570 536 C656 536 724 474 724 378 V306" />
            <path id="sleepMobileLineC" d="M500 -50 V1250" />
            <path id="sleepMobileLineD" d="M320 -40 C320 252 346 458 320 654 C296 834 308 1032 378 1240" />
            <path id="sleepMobileLineE" d="M680 -40 C680 252 654 458 680 654 C704 834 692 1032 622 1240" />
          </defs>
          <use href="#sleepMobileLineA" fill="none" stroke="#b8daf0" strokeWidth="3.2" opacity="0.88" />
          <use href="#sleepMobileLineB" fill="none" stroke="#b8daf0" strokeWidth="3.2" opacity="0.88" />
          <use href="#sleepMobileLineC" fill="none" stroke="#b8daf0" strokeWidth="2.6" opacity="0.82" />
          <use href="#sleepMobileLineD" fill="none" stroke="#b8daf0" strokeWidth="2.2" opacity="0.72" />
          <use href="#sleepMobileLineE" fill="none" stroke="#b8daf0" strokeWidth="2.2" opacity="0.72" />
          <circle cx="278" cy="844" r="6.2" fill="#d1e9ec" opacity="0.62" />
          <circle cx="724" cy="306" r="6.2" fill="#d1e9ec" opacity="0.62" />
          <circle cx="500" cy="620" r="5.4" fill="#d1e9ec" opacity="0.56" />
          <circle cx="355" cy="512" r="4.8" fill="#d1e9ec" opacity="0.52" />
          <circle cx="645" cy="728" r="4.8" fill="#d1e9ec" opacity="0.52" />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.2, 0.9, 0.24, 1] }}
          className="relative z-10 h-[36vh] overflow-hidden"
        >
          <div
            ref={imageCarouselRef}
            onScroll={handleMobileImageScroll}
            className="relative z-10 flex h-full snap-x snap-mandatory gap-2 overflow-x-auto px-3 pb-2 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {rooms.map((room, idx) => {
              const isCurrentRoom = idx === activeRoomIndex
              return (
                <button
                  key={`mobile-image-${room.id}`}
                  type="button"
                  data-sleep-mobile-card="true"
                  onClick={() => scrollToRoom(idx)}
                  className="relative min-w-[84%] snap-center overflow-hidden rounded-[22px] shadow-[0_18px_34px_rgba(0,0,0,0.26)]"
                >
                  <motion.img
                    src={room.image}
                    alt={room.title}
                    initial={false}
                    animate={{ scale: isCurrentRoom ? 1 : 1.04, opacity: isCurrentRoom ? 1 : 0.86 }}
                    transition={{ duration: 0.45, ease: [0.2, 0.9, 0.24, 1] }}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1c1e]/62 via-[#0f1c1e]/20 to-transparent" />
                </button>
              )
            })}
          </div>
          <div className="absolute inset-x-3 top-3 grid grid-cols-3 gap-1.5">
            {rooms.map((room, idx) => (
              <div key={`progress-${room.id}`} className="h-1 overflow-hidden rounded-full bg-white/35">
                <motion.div
                  key={`progress-active-${room.id}-${activeRoomIndex}`}
                  initial={{ width: 0 }}
                  animate={{ width: activeRoomIndex === idx ? '100%' : activeRoomIndex > idx ? '100%' : '0%' }}
                  transition={{ duration: activeRoomIndex === idx ? 0.55 : 0.25, ease: 'easeOut' }}
                  className="h-full bg-white"
                />
              </div>
            ))}
          </div>
          <div className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/25 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white">
            {activeRoom.id} / 03
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: isActive ? 0.06 : 0, ease: [0.2, 0.9, 0.24, 1] }}
          className="relative z-10 mt-1 flex h-[34vh] flex-col bg-[#eef2f2] px-3 pb-3 pt-2"
        >
          <motion.div
            key={`mobile-copy-${activeRoom.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.2, 0.9, 0.24, 1] }}
            className="rounded-[18px] border border-[#1f3436]/12 bg-white p-3 shadow-[0_14px_30px_rgba(31,52,54,0.1)]"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#1f3436]/62">Sleep</p>
            <h3 className="mt-1 text-[22px] font-semibold leading-[0.98] tracking-tight text-[#1f3436]">{activeRoom.title}</h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#1f3436]/62">{activeRoom.specs}</p>
            <p className="mt-1.5 text-[12px] leading-[1.34] text-[#1f3436]/82">{activeRoom.description}</p>
            <span className="mt-2 inline-flex rounded-full bg-[#d1e9ec]/62 px-2 py-0.5 text-[10px] font-medium text-[#1f3436]">{activeRoom.mood}</span>
          </motion.div>

          <div
            ref={roomTypeCarouselRef}
            className="mt-2 flex snap-x snap-mandatory gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {rooms.map((room, idx) => {
              const isCurrentRoom = idx === activeRoomIndex
              return (
                <button
                  key={`mobile-chip-${room.id}`}
                  type="button"
                  data-room-chip-index={idx}
                  onClick={() => scrollToRoom(idx)}
                  className={`min-w-[104px] snap-start rounded-xl border px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.12em] transition-all ${
                    isCurrentRoom ? 'border-[#1f3436] bg-[#1f3436] text-white' : 'border-[#1f3436]/16 bg-white text-[#1f3436]/76'
                  }`}
                >
                  {room.title.replace(' Room', '')}
                </button>
              )
            })}
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5">
              <button
                type="button"
                onClick={goToPrevRoom}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1f3436]/16 bg-white text-[#1f3436]"
                aria-label="Previous room"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={goToNextRoom}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#1f3436]/16 bg-white text-[#1f3436]"
                aria-label="Next room"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#1f3436] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
            >
              Book Room
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Desktop version (same direction as web) */}
      <svg
        viewBox="0 0 760 960"
        preserveAspectRatio="none"
        shapeRendering="geometricPrecision"
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden h-full w-[52%] opacity-[0.92] md:block"
      >
        <defs>
          <filter id="sleepLeftLineGlow" x="-220%" y="-220%" width="560%" height="560%">
            <feGaussianBlur stdDeviation="7.2" result="blurred" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="core" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="core" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path id="sleepLeftLineA" d="M-40 920 C140 900 230 780 232 650 C234 520 176 420 178 300 C180 160 280 62 470 34" />
          <path id="sleepLeftLineB" d="M-26 760 C118 734 214 646 250 540 C286 434 272 312 336 208 C382 134 472 80 602 50" />
          <path id="sleepLeftLineC" d="M-60 610 C120 580 208 488 304 430 C402 370 528 372 694 292" />
          <path id="sleepLeftLineD" d="M46 964 C104 812 104 700 126 594 C150 478 216 392 336 330" />
        </defs>

        <use href="#sleepLeftLineA" fill="none" stroke="#ffffff" strokeWidth="2.8" opacity="0.82" />
        <use href="#sleepLeftLineB" fill="none" stroke="#ffffff" strokeWidth="2.4" opacity="0.74" />
        <use href="#sleepLeftLineC" fill="none" stroke="#ffffff" strokeWidth="2.1" opacity="0.62" />
        <use href="#sleepLeftLineD" fill="none" stroke="#ffffff" strokeWidth="1.9" opacity="0.56" />

        <g filter="url(#sleepLeftLineGlow)" opacity="0.9">
          <circle r="7.2" fill="#ffffff" opacity="0.38" />
          <circle r="3.1" fill="#ffffff" opacity="0.98" />
          <animateMotion dur="7.6s" repeatCount="indefinite" rotate="auto">
            <mpath href="#sleepLeftLineA" />
          </animateMotion>
        </g>
      </svg>

      <motion.div
        initial={{ opacity: 0, x: 36 }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }}
        transition={{ duration: 0.75, ease: [0.2, 0.9, 0.24, 1], delay: isActive ? 0.1 : 0 }}
        className="relative order-2 hidden h-full w-[60%] overflow-hidden md:block"
      >
        {rooms.map((room, idx) => (
          <motion.img
            key={room.id}
            src={room.image}
            alt={room.title}
            initial={false}
            animate={{ opacity: activeRoomIndex === idx ? 1 : 0, scale: activeRoomIndex === idx ? 1 : 1.05, y: activeRoomIndex === idx ? 0 : 14 }}
            transition={{ duration: 0.9, ease: [0.2, 0.9, 0.24, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -34 }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -34 }}
        transition={{ duration: 0.75, ease: [0.2, 0.9, 0.24, 1] }}
        className="z-10 order-1 hidden w-[40%] flex-col justify-center px-12 py-4 md:flex lg:px-14"
      >
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7, delay: isActive ? 0.08 : 0, ease: [0.2, 0.9, 0.24, 1] }}
          className="mb-6 text-[clamp(42px,8vw,70px)] font-medium tracking-tight text-[#1f3436]"
        >
          Sleep
        </motion.h2>

        <div className="space-y-3">
          {rooms.map((room, idx) => {
            const isCurrentRoom = idx === activeRoomIndex
            return (
              <motion.button
                key={room.id}
                type="button"
                onMouseEnter={() => setHoveredRoomIndex(idx)}
                onMouseLeave={() => setHoveredRoomIndex(null)}
                onFocus={() => setHoveredRoomIndex(idx)}
                onBlur={() => setHoveredRoomIndex(null)}
                onClick={() => setSelectedRoomIndex(idx)}
                initial={{ opacity: 0, y: 16 }}
                animate={isCurrentRoom ? { opacity: 1, y: 0 } : { opacity: 0.92, y: 0 }}
                transition={{ duration: 0.55, delay: isActive ? 0.04 + idx * 0.06 : 0, ease: [0.2, 0.9, 0.24, 1] }}
                className="w-full text-left"
              >
                <span className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-[#1f3436]/55">{room.id}</span>
                <h3
                  className={`tracking-tight transition-all duration-500 ${
                    isCurrentRoom
                      ? 'text-[32px] font-semibold text-[#1f3436] md:text-[clamp(34px,3.2vw,46px)]'
                      : 'cursor-pointer text-[21px] font-medium text-[#1f3436]/40 hover:text-[#1f3436]/70 md:text-[clamp(24px,2.4vw,30px)]'
                  }`}
                >
                  {room.title}
                </h3>

                <div className={`overflow-hidden transition-all duration-500 ${isCurrentRoom ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
                  <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-[#1f3436]/65">{room.specs}</p>
                  <p className="mt-1.5 max-w-[44ch] text-[13px] leading-[1.42] text-[#1f3436]/84 md:text-[14px]">{room.description}</p>
                  <span className="group mt-3 inline-flex items-center gap-2 rounded-xl bg-[#1f3436] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white md:mt-3.5">
                    Book Room
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default EpisodeLandingSleep
