import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import episodeRoomImage from '../assets/images/episode4.jpg'
import roomTwoImage from '../assets/images/room2.avif'
import meetingImage from '../assets/images/meeting.jpg'

type EpisodeLandingSleepProps = {
  sectionRef: React.RefObject<HTMLElement | null>
}

const rooms = [
  {
    id: '01',
    title: 'Solo Room',
    specs: '20m2 • 1 Bed',
    description: 'A compact premium space crafted for solo stays, quiet mornings, and seamless city routines.',
    image: episodeRoomImage,
  },
  {
    id: '02',
    title: 'Double Room',
    specs: '20m2 • 1 Bed',
    description: 'A refined double setup with warm textures, calm lighting, and intuitive comfort for two guests.',
    image: roomTwoImage,
  },
  {
    id: '03',
    title: 'Twin Room',
    specs: '20m2 • 2 Beds',
    description: 'An editorial twin layout with efficient luxury and relaxed social comfort for shared stays.',
    image: meetingImage,
  },
] as const

const EpisodeLandingSleep: React.FC<EpisodeLandingSleepProps> = ({ sectionRef }) => {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0)
  const [hoveredRoomIndex, setHoveredRoomIndex] = useState<number | null>(null)
  const activeRoomIndex = hoveredRoomIndex ?? selectedRoomIndex

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full snap-start snap-always flex-col overflow-hidden bg-[#eef2f2] md:flex-row"
    >
      <div className="relative order-1 h-[50vh] w-full overflow-hidden md:order-2 md:h-full md:w-[60%]">
        {rooms.map((room, idx) => {
          const isActive = idx === activeRoomIndex
          return (
            <img
              key={room.id}
              src={room.image}
              alt={room.title}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
                isActive ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
          )
        })}
      </div>

      <div className="z-10 order-2 flex w-full flex-col justify-center px-6 py-10 md:order-1 md:w-[40%] md:px-16">
        <h2 className="mb-8 text-[62px] font-medium tracking-tight text-[#1f3436] md:mb-12 md:text-[84px]">Sleep</h2>

        <div className="space-y-4 md:space-y-5">
          {rooms.map((room, idx) => {
            const isActive = idx === activeRoomIndex
            return (
              <button
                key={room.id}
                type="button"
                onMouseEnter={() => setHoveredRoomIndex(idx)}
                onMouseLeave={() => setHoveredRoomIndex(null)}
                onFocus={() => setHoveredRoomIndex(idx)}
                onBlur={() => setHoveredRoomIndex(null)}
                onClick={() => setSelectedRoomIndex(idx)}
                className="w-full text-left"
              >
                <span className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-[#1f3436]/55">{room.id}</span>
                <h3
                  className={`tracking-tight transition-all duration-500 ${
                    isActive
                      ? 'text-[42px] font-semibold text-[#1f3436] md:text-[52px]'
                      : 'cursor-pointer text-[24px] font-medium text-[#1f3436]/40 hover:text-[#1f3436]/70 md:text-[32px]'
                  }`}
                >
                  {room.title}
                </h3>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isActive ? 'h-auto opacity-100' : 'h-0 opacity-0'
                  }`}
                >
                  <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-[#1f3436]/65">{room.specs}</p>
                  <p className="mt-2 max-w-[44ch] text-[14px] leading-[1.5] text-[#1f3436]/84 md:text-[15px]">
                    {room.description}
                  </p>
                  <span className="group mt-4 inline-flex items-center gap-2 rounded-xl bg-[#1f3436] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
                    Book Room
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EpisodeLandingSleep
