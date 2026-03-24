import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export type RoomPresentationItem = {
  title: string
  description: string
  specs: string
  image: string
}

type EpisodeLandingRoomsProps = {
  sectionRef: React.RefObject<HTMLElement | null>
  rooms: readonly RoomPresentationItem[]
}

const EpisodeLandingRooms: React.FC<EpisodeLandingRoomsProps> = ({ sectionRef, rooms }) => {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0)
  const triggerRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const targets = triggerRefs.current.filter(Boolean) as HTMLDivElement[]
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = Number((entry.target as HTMLElement).dataset.roomIndex)
          if (!Number.isNaN(idx)) setActiveRoomIndex(idx)
        })
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-45% 0px -45% 0px',
      },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[300vh] snap-start snap-always bg-[#eef2f2]">
      <div className="absolute inset-0 z-0" aria-hidden>
        {rooms.map((room, idx) => (
          <div
            key={`room-trigger-${room.title}`}
            ref={(el) => {
              triggerRefs.current[idx] = el
            }}
            data-room-index={idx}
            className="h-screen"
          />
        ))}
      </div>

      <div className="sticky top-0 z-10 h-screen w-full overflow-hidden bg-[#eef2f2]">
        <div className="flex h-full w-full flex-col md:flex-row">
          <div className="order-2 flex h-[44vh] w-full flex-col justify-end px-6 pb-8 md:order-1 md:h-full md:w-[40%] md:justify-center md:px-16 md:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={rooms[activeRoomIndex]?.title ?? 'room-copy'}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease: [0.2, 0.9, 0.24, 1] }}
                className="max-w-[520px]"
              >
                <h2 className="text-[42px] font-semibold tracking-tight text-[#1f3436] md:text-[52px]">
                  {rooms[activeRoomIndex]?.title}
                </h2>
                <p className="mt-4 text-[15px] leading-[1.55] text-[#1f3436]/82 md:text-[17px] md:leading-[1.6]">
                  {rooms[activeRoomIndex]?.description}
                </p>
                <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-[#1f3436]/64">
                  {rooms[activeRoomIndex]?.specs}
                </p>
                <button
                  type="button"
                  className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1f3436] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-transform duration-300 hover:-translate-y-[1px]"
                >
                  Book now
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-1 relative h-[56vh] w-full overflow-hidden rounded-b-3xl shadow-2xl md:order-2 md:h-full md:w-[60%] md:rounded-b-none md:rounded-l-[40px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={rooms[activeRoomIndex]?.image ?? 'room-image'}
                src={rooms[activeRoomIndex]?.image}
                alt={rooms[activeRoomIndex]?.title ?? 'Room image'}
                initial={{ opacity: 0, y: 32, scale: 1.05 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 1.02 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EpisodeLandingRooms
