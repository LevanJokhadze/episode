import React, { useEffect, useState } from 'react'
import {
  Calendar,
  ChevronDown,
  Cpu,
  Menu,
  X,
} from 'lucide-react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import atriumImage from '../assets/images/atrium.jpg'

const EpisodeLanding: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [nights, setNights] = useState(3)
  const [guests, setGuests] = useState(2)
  const [rooms, setRooms] = useState(1)
  const [cursorScale, setCursorScale] = useState(1)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorXSpring = useSpring(cursorX, { stiffness: 420, damping: 30 })
  const cursorYSpring = useSpring(cursorY, { stiffness: 420, damping: 30 })

  const { scrollYProgress } = useScroll()
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0.05, 1])
  const lineOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0.2, 0.8, 1])

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
      const target = event.target as HTMLElement | null
      setCursorScale(target?.closest('.smart-hover') ? 1.9 : 1)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [cursorX, cursorY])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--episode-primary-dark)] episode-font-body text-[var(--episode-primary-light)] selection:bg-[var(--episode-primary-light)] selection:text-[var(--episode-primary-dark)]">
      <div
        className="absolute left-0 right-0 top-0 h-[110vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${atriumImage})` }}
      />
      <div className="absolute left-0 right-0 top-0 h-[110vh] bg-[var(--episode-overlay-900)]/85" />
      <div className="absolute left-0 right-0 top-0 h-[110vh] episode-global-grid" />

      <motion.div
        className="pointer-events-none fixed z-40 hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--episode-secondary-blue)]/80 bg-[var(--episode-secondary-blue)]/20 backdrop-blur-sm md:block"
        style={{ x: cursorXSpring, y: cursorYSpring, scale: cursorScale }}
      />

      <motion.svg
        viewBox="0 0 1440 2200"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        fill="none"
      >
        <motion.path
          d="M1400 120 H980 L980 420 H760 L760 740 H520 L520 1120 H280 L280 1500 H120"
          stroke="rgba(209,233,236,0.35)"
          strokeWidth="1.4"
          style={{ pathLength: lineProgress, opacity: lineOpacity }}
        />
        <motion.path
          d="M80 200 H460 L460 520 H720 L720 860 H980 L980 1260 H1220 L1220 1700 H1360"
          stroke="rgba(184,218,240,0.28)"
          strokeWidth="1.2"
          style={{ pathLength: lineProgress, opacity: lineOpacity }}
        />
      </motion.svg>

      <nav className="relative z-50 flex items-center justify-between border-b border-[var(--episode-line-soft)] px-6 py-6 md:px-8">
        <div className="episode-font-body text-lg font-bold tracking-[0.03em]">EPISODE</div>

        <div className="episode-glass hidden items-center space-x-8 rounded-full border border-[var(--episode-line-soft)] px-5 py-2 text-[15px] font-semibold lg:flex">
          <a href="#offers" className="episode-nav-link smart-hover">Offers</a>

          <div className="group relative">
            <button className="episode-nav-link smart-hover flex items-center space-x-1">
              <span>Stay at Episode</span>
              <ChevronDown size={14} />
            </button>
            <div className="episode-glass invisible absolute right-0 top-full z-10 mt-2 w-52 rounded-2xl border border-[var(--episode-line-soft)] p-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <ul className="space-y-2">
                <li><a href="#rooms" className="episode-nav-link block py-1">Sleep</a></li>
                <li><a href="#spaces" className="episode-nav-link block py-1">Meet & Work</a></li>
                <li><a href="#spaces" className="episode-nav-link block py-1">Eat & Drink</a></li>
              </ul>
            </div>
          </div>

          <div className="group relative">
            <button className="episode-nav-link smart-hover flex items-center space-x-1">
              <span>Who we are</span>
              <ChevronDown size={14} />
            </button>
            <div className="episode-glass invisible absolute right-0 top-full z-10 mt-2 w-52 rounded-2xl border border-[var(--episode-line-soft)] p-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <ul className="space-y-2">
                <li><a href="#about" className="episode-nav-link block py-1">About Episode</a></li>
                <li><a href="#about" className="episode-nav-link block py-1">System Ready</a></li>
                <li><a href="#about" className="episode-nav-link block py-1">Journal</a></li>
              </ul>
            </div>
          </div>

          <div className="group relative">
            <button className="episode-nav-link smart-hover flex items-center space-x-1">
              <span>Work with us</span>
              <ChevronDown size={14} />
            </button>
            <div className="episode-glass invisible absolute right-0 top-full z-10 mt-2 w-52 rounded-2xl border border-[var(--episode-line-soft)] p-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <ul className="space-y-2">
                <li><a href="#spaces" className="episode-nav-link block py-1">Develop with us</a></li>
                <li><a href="#spaces" className="episode-nav-link block py-1">Careers</a></li>
              </ul>
            </div>
          </div>

          <a href="#app" className="episode-nav-link smart-hover">Get the App</a>
        </div>

        <button
          className="episode-glass smart-hover rounded-full p-2 transition-colors lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="episode-glass absolute left-0 top-0 z-40 w-full rounded-b-3xl border-b border-[var(--episode-line-soft)] px-6 pb-12 pt-24 lg:hidden"
          >
            <div className="episode-font-body flex flex-col space-y-6 text-xl font-medium">
              <a href="#offers" onClick={() => setIsMenuOpen(false)}>Offers</a>
              <div className="space-y-4">
                <div className="text-sm uppercase tracking-widest text-[var(--episode-text-mid)]">Stay at Episode</div>
                <div className="flex flex-col space-y-3 pl-4">
                  <a href="#rooms" onClick={() => setIsMenuOpen(false)}>Sleep</a>
                  <a href="#spaces" onClick={() => setIsMenuOpen(false)}>Meet & Work</a>
                  <a href="#spaces" onClick={() => setIsMenuOpen(false)}>Eat & Drink</a>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-sm uppercase tracking-widest text-[var(--episode-text-mid)]">Who we are</div>
                <div className="flex flex-col space-y-3 pl-4">
                  <a href="#about" onClick={() => setIsMenuOpen(false)}>About Episode</a>
                  <a href="#about" onClick={() => setIsMenuOpen(false)}>Journal</a>
                </div>
              </div>
              <a href="#app" onClick={() => setIsMenuOpen(false)}>Get the App</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-20">
        <section className="px-6 pb-24 pt-24 md:px-8 md:pb-28 md:pt-36">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[var(--episode-line-soft)] bg-[var(--episode-overlay-700)] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--episode-text-mid)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--episode-secondary-green)]" />
                Active
              </div>
              <h1 className="episode-font-display max-w-[13ch] text-[40px] leading-[1.02] text-[var(--episode-text-high)] sm:text-5xl md:text-6xl lg:text-7xl">
                Welcome to New Generation Hotel.
              </h1>
              <p className="mt-3 max-w-2xl text-base text-[var(--episode-text-mid)] md:text-xl">
                Your space to Stay, Work and Connect.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="episode-glass rounded-3xl border border-[var(--episode-line-soft)] p-5 md:p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="episode-font-mono text-xs uppercase tracking-[0.17em] text-[var(--episode-text-mid)]">
                  Booking Command Center
                </p>
                <Cpu size={16} className="text-[var(--episode-secondary-blue)]" />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-[var(--episode-line-soft)] bg-[var(--episode-glass-light)] p-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--episode-text-mid)]">Nights</p>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      className="episode-btn-ambient smart-hover rounded-lg border border-[var(--episode-line-soft)] px-2 py-1 transition-transform hover:scale-105"
                      onClick={() => setNights((prev) => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <span className="episode-font-mono text-xl">{nights}</span>
                    <button
                      type="button"
                      className="episode-btn-ambient smart-hover rounded-lg border border-[var(--episode-line-soft)] px-2 py-1 transition-transform hover:scale-105"
                      onClick={() => setNights((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--episode-line-soft)] bg-[var(--episode-glass-light)] p-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--episode-text-mid)]">Guests</p>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      className="episode-btn-ambient smart-hover rounded-lg border border-[var(--episode-line-soft)] px-2 py-1 transition-transform hover:scale-105"
                      onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <span className="episode-font-mono text-xl">{guests}</span>
                    <button
                      type="button"
                      className="episode-btn-ambient smart-hover rounded-lg border border-[var(--episode-line-soft)] px-2 py-1 transition-transform hover:scale-105"
                      onClick={() => setGuests((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--episode-line-soft)] bg-[var(--episode-glass-light)] p-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--episode-text-mid)]">Rooms</p>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      className="episode-btn-ambient smart-hover rounded-lg border border-[var(--episode-line-soft)] px-2 py-1 transition-transform hover:scale-105"
                      onClick={() => setRooms((prev) => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <span className="episode-font-mono text-xl">{rooms}</span>
                    <button
                      type="button"
                      className="episode-btn-ambient smart-hover rounded-lg border border-[var(--episode-line-soft)] px-2 py-1 transition-transform hover:scale-105"
                      onClick={() => setRooms((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                <button className="episode-btn-ambient smart-hover rounded-xl border border-[var(--episode-line-soft)] bg-[var(--episode-glass-light)] px-4 py-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--episode-text-mid)]">Check-in</span>
                    <Calendar size={16} className="text-[var(--episode-secondary-blue)]" />
                  </div>
                </button>
                <button className="episode-btn-ambient smart-hover rounded-xl border border-[var(--episode-secondary-blue)] bg-[var(--episode-secondary-blue)]/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--episode-text-high)] transition-transform hover:scale-[1.02]">
                  Book a Room
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  )
}

export default EpisodeLanding
