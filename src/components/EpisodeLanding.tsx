import React, { useEffect, useState } from 'react'
import { Calendar, ChevronDown, Menu, MessageCircle, X } from 'lucide-react'
import atriumImage from '../assets/images/atrium.jpg'
import episode1Image from '../assets/images/episode1.jpg'
import episode2Image from '../assets/images/episode2.jpg'
import episode3Image from '../assets/images/episode3.jpg'
import episode4Image from '../assets/images/episode4.jpg'

const EpisodeLanding: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const backgroundSlides = [atriumImage, episode4Image, episode1Image, episode2Image, episode3Image]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % backgroundSlides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [backgroundSlides.length])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f1819] text-[var(--episode-primary-light)]">
      <div className="absolute inset-0">
        {backgroundSlides.map((image, index) => (
          <img
            key={image}
            src={image}
            alt="Episode hotel background"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/28" />

      <header className="relative z-30 px-4 pt-4 md:px-6 md:pt-5">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/45 bg-[#dbe9e6]/48 px-5 py-3 shadow-[0_14px_42px_rgba(31,52,54,0.2)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="episode-font-body text-2xl font-bold tracking-[0.06em] text-[#173032] md:text-[30px]">EPISODE</div>
          </div>

          <nav className="hidden items-center gap-8 text-[15px] font-semibold text-[#173032] lg:flex">
            <div className="group relative">
              <button type="button" className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-75">
                Stay <ChevronDown size={15} />
              </button>
              <div className="invisible absolute left-0 top-full z-40 mt-2 w-44 rounded-xl border border-white/45 bg-[#dbe9e6]/60 p-2 opacity-0 shadow-[0_10px_28px_rgba(31,52,54,0.15)] backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <button type="button" className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/45">Rooms</button>
                <button type="button" className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/45">Suites</button>
                <button type="button" className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/45">Long Stay</button>
              </div>
            </div>
            <div className="group relative">
              <button type="button" className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-75">
                Offers <ChevronDown size={15} />
              </button>
              <div className="invisible absolute left-0 top-full z-40 mt-2 w-44 rounded-xl border border-white/45 bg-[#dbe9e6]/60 p-2 opacity-0 shadow-[0_10px_28px_rgba(31,52,54,0.15)] backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <button type="button" className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/45">Early Bird</button>
                <button type="button" className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/45">Weekend</button>
                <button type="button" className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/45">Packages</button>
              </div>
            </div>
            <div className="group relative">
              <button type="button" className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-75">
                Experience <ChevronDown size={15} />
              </button>
              <div className="invisible absolute left-0 top-full z-40 mt-2 w-44 rounded-xl border border-white/45 bg-[#dbe9e6]/60 p-2 opacity-0 shadow-[0_10px_28px_rgba(31,52,54,0.15)] backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <button type="button" className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/45">Dining</button>
                <button type="button" className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/45">Wellness</button>
                <button type="button" className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/45">Events</button>
              </div>
            </div>
            <button type="button" className="transition-opacity hover:opacity-75">Get the App</button>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="hidden rounded-xl border border-[#173032]/25 bg-white px-4 py-2 text-sm font-semibold text-[#173032] md:inline-flex"
            >
              Sign In
            </button>
            <button
              type="button"
              className="hidden rounded-xl border border-[#2c5a5f] bg-[#0f3f43] px-4 py-2 text-sm font-semibold text-[#d1e9ec] md:inline-flex"
            >
              Check Rates
            </button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#173032]/20 bg-white text-[#173032] lg:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              type="button"
            >
              {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="relative z-30 mx-4 mt-2 rounded-2xl border border-white/45 bg-[#dbe9e6]/55 px-5 py-4 text-sm text-[#173032] shadow-[0_10px_28px_rgba(31,52,54,0.15)] backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-3">
            <button type="button" className="text-left">Offers</button>
            <button type="button" className="text-left">Stay at Episode</button>
            <button type="button" className="text-left">Who we are</button>
            <button type="button" className="text-left">Work with us</button>
            <button type="button" className="text-left">Get the App</button>
          </div>
        </div>
      )}

      <main className="relative z-20 flex min-h-[calc(100vh-76px)] flex-col items-center justify-center px-4 pb-36 pt-14 text-center md:px-6 md:pb-40">
        <h1 className="episode-font-display max-w-4xl text-4xl leading-tight text-[#d9e9ec] drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)] md:text-6xl">
          Experience modern living at Episode
        </h1>
        <button
          type="button"
          className="mt-6 rounded-xl border border-white/35 bg-[#dbe9e6]/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#dbe9e6] transition hover:bg-[#dbe9e6]/30"
        >
          View Hotel In 360℃
        </button>
      </main>

      <div className="pointer-events-none absolute inset-x-0 bottom-24 z-30 flex justify-center">
        <div className="relative flex items-center gap-2">
          {backgroundSlides.map((image) => (
            <span key={`dash-${image}`} className="h-1.5 w-8 rounded-full bg-white/35" />
          ))}
          <span
            className="absolute left-0 top-0 h-1.5 w-8 rounded-full bg-white transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${activeSlide * 2.5}rem)` }}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-30 px-3 md:px-5">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-2xl border border-white/40 bg-[#dbe9e6]/24 p-2 shadow-[0_10px_34px_rgba(5,18,20,0.35)] backdrop-blur-xl md:flex-row">
          <button type="button" className="flex h-12 items-center justify-between rounded-xl border border-white/45 bg-[#dbe9e6]/56 px-4 text-left text-[#173032] backdrop-blur-lg md:flex-1">
            <span className="text-sm font-medium">Check In</span>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-[#173032]/25 bg-black/5">
              <Calendar size={14} />
            </span>
          </button>
          <button type="button" className="flex h-12 items-center justify-between rounded-xl border border-white/45 bg-[#dbe9e6]/56 px-4 text-left text-[#173032] backdrop-blur-lg md:flex-1">
            <span className="text-sm font-medium">Check Out</span>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-[#173032]/25 bg-black/5">
              <Calendar size={14} />
            </span>
          </button>
          <button type="button" className="flex h-12 items-center justify-between rounded-xl border border-white/45 bg-[#dbe9e6]/56 px-4 text-left text-[#173032] backdrop-blur-lg md:flex-1">
            <span className="text-sm font-medium">Guest number</span>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-[#173032]/25 bg-black/5">
              <Calendar size={14} />
            </span>
          </button>
          <button type="button" className="h-12 rounded-xl border border-[#2c5a5f] bg-[#0f3f43] px-7 text-sm font-semibold text-[#d1e9ec] md:w-[160px]">
            Book now
          </button>
        </div>
      </div>

      <button
        type="button"
        className="absolute bottom-5 right-4 z-30 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[#173032]/84 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-white/90 backdrop-blur-sm md:right-6"
      >
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#d8f6c5] text-[#173032]">
          <MessageCircle size={12} />
        </span>
        AI Concierge
      </button>
    </div>
  )
}

export default EpisodeLanding
