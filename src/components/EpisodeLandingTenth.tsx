import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarCheck2, CalendarDays, ChevronDown, Menu, MessageCircle, Users, X } from 'lucide-react'
import mainHeroVideo from '../assets/video.mp4'
import episodeRoomImage from '../assets/images/episode4.jpg'
import atriumPersonsImage from '../assets/images/atrium-persons.jpg'
import meetingImage from '../assets/images/meeting.jpg'
import logoImage from '../assets/images/logo2.png'
import { episodeDesignLibrary } from '../design-library'
import EpisodeLandingOffers from './EpisodeLandingOffers'
import EpisodeLandingEatDrink from './EpisodeLandingEatDrink'
import EpisodeLandingSleep from './EpisodeLandingSleep'
import EpisodeLandingMeetWork from './EpisodeLandingMeetWork'

const imageModules = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const sectionCarouselImages = Object.entries(imageModules)
  .filter(([filePath]) => /episode4\.jpg|atrium\.jpg/i.test(filePath))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src)

const EpisodeLandingTenth: React.FC = () => {
  const [activeScene, setActiveScene] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileBookingOpen, setIsMobileBookingOpen] = useState(false)
  const [desktopDropdown, setDesktopDropdown] = useState<'stay' | 'about' | 'work' | null>(null)
  const [activeSnapIndex, setActiveSnapIndex] = useState(0)
  const sceneVideos = [mainHeroVideo]
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const dropdownCloseTimeout = useRef<number | null>(null)
  const mainScrollRef = useRef<HTMLElement | null>(null)
  const firstSectionRef = useRef<HTMLElement | null>(null)
  const secondSectionRef = useRef<HTMLElement | null>(null)
  const thirdSectionRef = useRef<HTMLElement | null>(null)
  const fourthSectionRef = useRef<HTMLElement | null>(null)
  const fifthSectionRef = useRef<HTMLElement | null>(null)
  const sixthSectionRef = useRef<HTMLElement | null>(null)
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  }
  const ui = episodeDesignLibrary.components
  const accentLineColor = episodeDesignLibrary.colors.accent.blue
  const dropdownItems: Record<'stay' | 'about' | 'work', string[]> = {
    stay: ['Sleep', 'Meet & Work', 'Eat & Drink'],
    about: ['About Episode', 'FAQ', 'Blog'],
    work: ['Develop with us', 'Careers'],
  }
  const whoWeAreCollageImages = [
    sectionCarouselImages[0] ?? episodeRoomImage,
    atriumPersonsImage,
    meetingImage,
  ] as const
  const isWhoWeAreActive = activeSnapIndex === 1
  const whoWeArePillars = [
    { title: 'Networking', detail: 'Curated people and conversations.' },
    { title: 'Bar Culture', detail: 'Cocktails, music, and social energy.' },
    { title: 'Communal Spaces', detail: 'Work, rest, and connect in one flow.' },
  ] as const

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveScene((prev) => (prev + 1) % sceneVideos.length)
    }, 8000)

    return () => window.clearInterval(timer)
  }, [sceneVideos.length])

  useEffect(() => {
    videoRefs.current.forEach((videoEl) => {
      if (!videoEl) return
      videoEl.defaultMuted = true
      videoEl.muted = true
      videoEl.play().catch(() => {
        // Autoplay can still be blocked on some environments.
      })
    })
  }, [activeScene])

  useEffect(() => {
    return () => {
      if (dropdownCloseTimeout.current) {
        window.clearTimeout(dropdownCloseTimeout.current)
      }
    }
  }, [])

  const openDropdown = (menu: 'stay' | 'about' | 'work') => {
    if (dropdownCloseTimeout.current) {
      window.clearTimeout(dropdownCloseTimeout.current)
    }
    setDesktopDropdown(menu)
  }

  const closeDropdownSoon = () => {
    if (dropdownCloseTimeout.current) {
      window.clearTimeout(dropdownCloseTimeout.current)
    }
    dropdownCloseTimeout.current = window.setTimeout(() => {
      setDesktopDropdown(null)
    }, 120)
  }

  const scrollToSecondSection = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const container = mainScrollRef.current
    if (!container) return

    const sections = [firstSectionRef.current, secondSectionRef.current, thirdSectionRef.current, fourthSectionRef.current, fifthSectionRef.current, sixthSectionRef.current].filter(Boolean) as HTMLElement[]
    if (sections.length < 2) return

    const getActiveIndex = () => {
      const top = container.scrollTop
      let bestIndex = 0
      let bestDistance = Number.POSITIVE_INFINITY
      sections.forEach((section, index) => {
        const distance = Math.abs(section.offsetTop - top)
        if (distance < bestDistance) {
          bestDistance = distance
          bestIndex = index
        }
      })
      return bestIndex
    }

    // Keep active section in sync with native CSS snap behavior.
    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry
          }
        }
        if (!bestEntry) return
        const idx = sections.findIndex((section) => section === bestEntry?.target)
        if (idx >= 0) setActiveSnapIndex(idx)
      },
      {
        root: container,
        threshold: [0.25, 0.5, 0.75],
      },
    )

    sections.forEach((section) => observer.observe(section))

    let rafId: number | null = null
    const onScroll = () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      rafId = window.requestAnimationFrame(() => {
        setActiveSnapIndex(getActiveIndex())
      })
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      observer.disconnect()
      container.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1f3436] text-[#d1e9ec]">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={ui.navbar.wrapper}
      >
        <a href="#" className="flex items-center">
          <img src={logoImage} alt="Episode Hotels" className={ui.navbar.logo} />
        </a>
        <div
          onMouseLeave={closeDropdownSoon}
          className="relative hidden items-center space-x-8 text-[13px] uppercase tracking-[0.12em] text-white md:flex"
        >
          <a href="#" className="opacity-90 transition-opacity hover:opacity-100">Offers</a>
          <button
            type="button"
            onMouseEnter={() => openDropdown('stay')}
            className="inline-flex items-center gap-1 opacity-90 transition-opacity hover:opacity-100"
          >
            Stay at Episode
            <ChevronDown size={14} className={`transition-transform duration-200 ${desktopDropdown === 'stay' ? 'rotate-180' : ''}`} />
          </button>
          <button
            type="button"
            onMouseEnter={() => openDropdown('about')}
            className="inline-flex items-center gap-1 opacity-90 transition-opacity hover:opacity-100"
          >
            Who we are
            <ChevronDown size={14} className={`transition-transform duration-200 ${desktopDropdown === 'about' ? 'rotate-180' : ''}`} />
          </button>
          <button
            type="button"
            onMouseEnter={() => openDropdown('work')}
            className="inline-flex items-center gap-1 opacity-90 transition-opacity hover:opacity-100"
          >
            Work with us
            <ChevronDown size={14} className={`transition-transform duration-200 ${desktopDropdown === 'work' ? 'rotate-180' : ''}`} />
          </button>
          <a href="#" className="opacity-90 transition-opacity hover:opacity-100">Get the App</a>
        </div>
        <motion.button
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={ui.navbar.desktopCta}
        >
          Book now
        </motion.button>
        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-[#d1e9ec]/80 text-[#1f3436] md:hidden"
        >
          {isMobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </motion.nav>
      <AnimatePresence>
        {desktopDropdown && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.08 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.08 }}
            transition={{ duration: 0.46, ease: [0.2, 0.9, 0.24, 1] }}
            onMouseEnter={() => openDropdown(desktopDropdown)}
            onMouseLeave={closeDropdownSoon}
            className="fixed left-0 right-0 top-[102px] z-[65] hidden origin-center md:block"
          >
            <div className="relative mx-auto flex w-full max-w-[1220px] items-center justify-center gap-7 px-8 text-[17px] font-medium tracking-[0.01em] text-white/92">
              {dropdownItems[desktopDropdown].map((item, index) => (
                <React.Fragment key={item}>
                  <motion.a
                    href="#"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.34, delay: 0.12 * index, ease: 'easeOut' }}
                    className="group whitespace-nowrap px-1 py-0.5 transition-all duration-300 [filter:drop-shadow(0_10px_24px_rgba(0,0,0,0.24))] [text-shadow:0_1px_2px_rgba(0,0,0,0.24)] hover:-translate-y-[1px] hover:text-[#d1e9ec] hover:opacity-100 hover:[filter:drop-shadow(0_14px_30px_rgba(0,0,0,0.32))] hover:[text-shadow:0_1px_3px_rgba(0,0,0,0.3)]"
                  >
                    {item.split('').map((char, charIndex) => (
                      <motion.span
                        key={`${item}-${charIndex}`}
                        initial={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
                        transition={{
                          duration: 0.24,
                          delay: 0.08 + 0.11 * index + charIndex * 0.018,
                          ease: 'easeOut',
                        }}
                        className="inline-block will-change-transform"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </motion.a>
                  {index < dropdownItems[desktopDropdown].length - 1 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.46 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.26, delay: 0.2 + 0.12 * index }}
                      className="select-none text-white/45"
                    >
                      |
                    </motion.span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scaleX: 0.3 }}
              animate={{ opacity: 0.75, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.3 }}
              transition={{ duration: 0.44, ease: 'easeOut' }}
              className="mx-auto mt-4 h-px w-[92%] max-w-[1220px] origin-center bg-gradient-to-r from-transparent via-white/45 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed left-4 right-4 top-[72px] z-[60] rounded-2xl border border-white/15 bg-[#1f3436]/95 p-4 text-white shadow-[0_16px_32px_rgba(0,0,0,0.35)] backdrop-blur md:hidden"
        >
          <div className="flex flex-col gap-2 text-[13px] uppercase tracking-[0.12em]">
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg px-3 py-2 transition-colors hover:bg-white/10">Offers</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg px-3 py-2 transition-colors hover:bg-white/10">Stay at Episode</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg px-3 py-2 transition-colors hover:bg-white/10">Who we are</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg px-3 py-2 transition-colors hover:bg-white/10">Work with us</a>
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg px-3 py-2 transition-colors hover:bg-white/10">Get the App</a>
          </div>
          <button
            type="button"
            className="mt-3 h-11 w-full rounded-xl bg-[#d1e9ec] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1f3436]"
          >
            Book now
          </button>
        </motion.div>
      )}
      <main ref={mainScrollRef} className="h-screen snap-y snap-mandatory overflow-y-auto overscroll-y-contain scroll-smooth">
        <section ref={firstSectionRef} className="relative flex h-screen snap-start snap-always items-center justify-center overflow-hidden pt-16 md:pt-20">
          <div className="absolute inset-0 z-0 bg-[#1f3436]">
            {sceneVideos.map((videoSrc, index) => (
              <video
                key={videoSrc}
                ref={(el) => {
                  videoRefs.current[index] = el
                }}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
                preload="auto"
                className={`absolute inset-0 h-full w-full object-cover object-[center_38%] md:object-center blur-[0.5px] transition-opacity duration-1000 ${
                  index === activeScene ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="relative z-20 container mx-auto grid h-full grid-cols-1 items-start gap-10 px-5 pb-64 pt-28 md:grid-cols-2 md:items-center md:px-6 md:pb-20 md:pt-0"
          >
            <div className="md:col-span-2">
              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.75, ease: 'easeOut', delay: 0.3 }}
                className={ui.hero.heading}
              >
                Experience modern living at Episode
              </motion.h1>
              <div className="flex justify-center">
                <motion.button
                  type="button"
                  variants={fadeUp}
                  transition={{ duration: 0.65, ease: 'easeOut', delay: 0.45 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={ui.hero.subCta}
                >
                  View Hotel In 360°
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.55 }}
            className={ui.bookingPanel.wrapper}
          >
            <div className={ui.bookingPanel.container}>
              <AnimatePresence initial={false}>
                {isMobileBookingOpen && (
                  <>
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.28, ease: 'easeOut', delay: 0 }}
                      className={`${ui.bookingPanel.field} md:hidden`}
                    >
                      <span>Check In</span>
                      <CalendarDays size={16} className={ui.bookingPanel.icon} />
                    </motion.button>
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.28, ease: 'easeOut', delay: 0.08 }}
                      className={`${ui.bookingPanel.field} md:hidden`}
                    >
                      <span>Check Out</span>
                      <CalendarCheck2 size={16} className={ui.bookingPanel.icon} />
                    </motion.button>
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.28, ease: 'easeOut', delay: 0.16 }}
                      className={`${ui.bookingPanel.field} md:hidden`}
                    >
                      <span>Guest number</span>
                      <Users size={16} className={ui.bookingPanel.icon} />
                    </motion.button>
                  </>
                )}
              </AnimatePresence>

              <button type="button" className={`${ui.bookingPanel.field} hidden md:flex`}>
                <span>Check In</span>
                <CalendarDays size={16} className={ui.bookingPanel.icon} />
              </button>
              <button type="button" className={`${ui.bookingPanel.field} hidden md:flex`}>
                <span>Check Out</span>
                <CalendarCheck2 size={16} className={ui.bookingPanel.icon} />
              </button>
              <button type="button" className={`${ui.bookingPanel.field} hidden md:flex`}>
                <span>Guest number</span>
                <Users size={16} className={ui.bookingPanel.icon} />
              </button>

              <button type="button" className={`${ui.bookingPanel.submit} hidden md:block`}>
                Book now
              </button>
              <button
                type="button"
                onClick={() => setIsMobileBookingOpen(true)}
                className={`${ui.bookingPanel.submit} md:hidden`}
              >
                Book now
              </button>
            </div>
          </motion.div>

          <motion.button
            type="button"
            onClick={scrollToSecondSection}
            aria-label="Scroll to next section"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: [0, -4, 0] }}
            transition={{ opacity: { duration: 0.5, ease: 'easeOut', delay: 0.65 }, y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/25 bg-[#1f3436]/36 p-2 text-white/90 backdrop-blur-sm md:bottom-5"
          >
            <ChevronDown size={18} />
          </motion.button>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: [0, -4, 0] }}
            transition={{ opacity: { duration: 0.5, ease: 'easeOut', delay: 0.65 }, y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="absolute bottom-8 right-4 z-40 inline-flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#d1e9ec]/70 p-3 text-[#1f3436] shadow-[0_10px_24px_rgba(0,0,0,0.28)] md:hidden"
          >
            <MessageCircle size={24} />
          </motion.button>
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: [0, -4, 0] }}
            transition={{ opacity: { duration: 0.5, ease: 'easeOut', delay: 0.65 }, y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:fixed md:bottom-6 md:right-8 md:z-40 md:inline-flex md:h-[74px] md:w-[74px] md:items-center md:justify-center md:rounded-full md:bg-[#d1e9ec]/70 md:p-[13px] md:text-[#1f3436] md:shadow-[0_10px_24px_rgba(0,0,0,0.28)]"
          >
            <MessageCircle size={24} />
          </motion.button>
        </section>

        <section
          ref={secondSectionRef}
          className="relative flex h-screen snap-start snap-always items-center overflow-hidden bg-[#f1f3f3] px-4 pb-6 pt-[82px] text-[#171717] max-[390px]:px-3 max-[390px]:pb-4 max-[390px]:pt-[74px] md:px-10 md:pb-0 md:pt-0"
        >
          <svg
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.9] max-[390px]:opacity-[0.58]"
          >
            <defs>
              <filter id="whoWeAreLineGlow" x="-250%" y="-250%" width="600%" height="600%">
                <feGaussianBlur stdDeviation="7" result="softGlow" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="coreGlow" />
                <feMerge>
                  <feMergeNode in="softGlow" />
                  <feMergeNode in="coreGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <path id="whoWeAreLineA" d="M-80 40 V572 C-80 708 38 776 188 776 C338 776 458 708 458 572 C458 498 404 450 332 450 C262 450 208 498 208 572 V630" />
              <path id="whoWeAreLineB" d="M1680 760 V228 C1680 92 1562 24 1412 24 C1262 24 1142 92 1142 228 C1142 302 1196 350 1268 350 C1338 350 1392 302 1392 228 V170" />
              <path id="whoWeAreLineC" d="M800 -40 V960" />
              <path id="whoWeAreLineD" d="M520 -40 C520 210 536 388 510 566 C488 714 502 842 560 960" />
              <path id="whoWeAreLineE" d="M1080 -40 C1080 210 1064 388 1090 566 C1112 714 1098 842 1040 960" />
            </defs>
            <use href="#whoWeAreLineA" fill="none" stroke={accentLineColor} strokeWidth="3.1" opacity="1" />
            <use href="#whoWeAreLineB" fill="none" stroke={accentLineColor} strokeWidth="3.1" opacity="1" />
            <use href="#whoWeAreLineC" fill="none" stroke={accentLineColor} strokeWidth="2.5" opacity="0.96" />
            <use href="#whoWeAreLineD" fill="none" stroke={accentLineColor} strokeWidth="2.1" opacity="0.92" />
            <use href="#whoWeAreLineE" fill="none" stroke={accentLineColor} strokeWidth="2.1" opacity="0.92" />

            <circle r="8.4" fill="#d8f6c5" opacity="0.5" filter="url(#whoWeAreLineGlow)">
              <animateMotion dur="8.8s" repeatCount="indefinite" rotate="auto">
                <mpath href="#whoWeAreLineA" />
              </animateMotion>
            </circle>
            <circle r="3.6" fill="#fcfff7" opacity="1" filter="url(#whoWeAreLineGlow)">
              <animateMotion dur="8.8s" repeatCount="indefinite" rotate="auto">
                <mpath href="#whoWeAreLineA" />
              </animateMotion>
            </circle>

            <circle r="8.8" fill="#b8daf0" opacity="0.5" filter="url(#whoWeAreLineGlow)">
              <animateMotion dur="10.2s" repeatCount="indefinite" rotate="auto">
                <mpath href="#whoWeAreLineB" />
              </animateMotion>
            </circle>
            <circle r="3.8" fill="#fcfff7" opacity="1" filter="url(#whoWeAreLineGlow)">
              <animateMotion dur="10.2s" repeatCount="indefinite" rotate="auto">
                <mpath href="#whoWeAreLineB" />
              </animateMotion>
            </circle>

            <circle r="8.2" fill="#d1e9ec" opacity="0.48" filter="url(#whoWeAreLineGlow)">
              <animateMotion dur="11.6s" repeatCount="indefinite" rotate="auto">
                <mpath href="#whoWeAreLineC" />
              </animateMotion>
            </circle>
            <circle r="3.3" fill="#fcfff7" opacity="0.98" filter="url(#whoWeAreLineGlow)">
              <animateMotion dur="11.6s" repeatCount="indefinite" rotate="auto">
                <mpath href="#whoWeAreLineC" />
              </animateMotion>
            </circle>

            <circle r="7.2" fill="#d8f6c5" opacity="0.42" filter="url(#whoWeAreLineGlow)">
              <animateMotion dur="9.4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#whoWeAreLineD" />
              </animateMotion>
            </circle>

            <circle r="7.2" fill="#d8f6c5" opacity="0.42" filter="url(#whoWeAreLineGlow)">
              <animateMotion dur="9.9s" repeatCount="indefinite" rotate="auto">
                <mpath href="#whoWeAreLineE" />
              </animateMotion>
            </circle>
          </svg>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={isWhoWeAreActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            transition={{ duration: 0.75, ease: [0.2, 0.9, 0.24, 1] }}
            className="relative mx-auto grid w-full max-w-[1260px] grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -34 }}
              animate={isWhoWeAreActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -34 }}
              transition={{ duration: 0.7, delay: isWhoWeAreActive ? 0.06 : 0, ease: [0.2, 0.9, 0.24, 1] }}
              className="max-w-[650px] max-[390px]:max-w-[360px] md:translate-y-4"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isWhoWeAreActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.55, delay: isWhoWeAreActive ? 0.08 : 0 }}
                className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#1f3436]/68 md:mb-3"
              >
                Who we are
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={isWhoWeAreActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.62, delay: isWhoWeAreActive ? 0.14 : 0, ease: [0.2, 0.9, 0.24, 1] }}
                className="mb-3 text-[32px] font-semibold leading-[0.92] tracking-tight text-[#1f3436] max-[390px]:mb-2.5 max-[390px]:text-[28px] max-[390px]:leading-[0.96] md:mb-6 md:text-[64px]"
              >
                Everything social,
                <br />
                under one roof.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isWhoWeAreActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.66, delay: isWhoWeAreActive ? 0.22 : 0, ease: [0.2, 0.9, 0.24, 1] }}
                className="max-w-[58ch] text-[14px] leading-[1.5] text-[#1f1f1f]/84 max-[390px]:text-[12px] max-[390px]:leading-[1.38] md:text-[17px] md:leading-[1.58]"
              >
                At Episode, your day flows naturally from productive networking to vibrant bar evenings and relaxed communal moments.
                No disconnected venues, no friction, just one living ecosystem built for modern city life.
              </motion.p>
              <div className="mt-4 grid gap-2.5 max-[390px]:mt-3 max-[390px]:gap-2 md:mt-6">
                {whoWeArePillars.map((pillar, idx) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: -18 }}
                    animate={isWhoWeAreActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
                    transition={{ duration: 0.55, delay: isWhoWeAreActive ? 0.28 + idx * 0.08 : 0, ease: [0.2, 0.9, 0.24, 1] }}
                    className={`inline-flex w-fit items-center gap-3 rounded-2xl border border-[#1f3436]/12 bg-white/55 px-3.5 py-2 shadow-[0_10px_24px_rgba(31,52,54,0.08)] backdrop-blur-sm max-[390px]:gap-2 max-[390px]:px-2.5 max-[390px]:py-1.5 md:px-4 ${idx === 2 ? 'max-[390px]:hidden' : ''}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1f3436]" />
                    <p className="text-[12px] text-[#1f3436]/82 max-[390px]:text-[11px] md:text-[13px]">
                      <span className="font-semibold text-[#1f3436]">{pillar.title}</span>
                      <span className="ml-2">{pillar.detail}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 18 }}
                animate={isWhoWeAreActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.6, delay: isWhoWeAreActive ? 0.48 : 0, ease: [0.2, 0.9, 0.24, 1] }}
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`${ui.bookingPanel.submit} group mt-4 inline-flex h-10 w-auto items-center gap-2 px-6 text-[13px] max-[390px]:mt-3 max-[390px]:h-9 max-[390px]:px-4 max-[390px]:text-[11px] md:mt-6 md:h-11 md:px-7 md:text-sm`}
              >
                Read more
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 34 }}
              animate={isWhoWeAreActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 34 }}
              transition={{ duration: 0.75, delay: isWhoWeAreActive ? 0.12 : 0, ease: [0.2, 0.9, 0.24, 1] }}
              className="group relative mx-auto h-[230px] w-full max-w-[620px] max-[390px]:h-[188px] max-[390px]:max-w-[350px] md:h-[500px]"
            >
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 1.05 }}
                animate={isWhoWeAreActive ? { opacity: 1, y: [0, -4, 0], scale: 1 } : { opacity: 0, y: 18, scale: 1.05 }}
                transition={{
                  opacity: { duration: 0.7, delay: isWhoWeAreActive ? 0.18 : 0, ease: [0.2, 0.9, 0.24, 1] },
                  scale: { duration: 0.7, delay: isWhoWeAreActive ? 0.18 : 0, ease: [0.2, 0.9, 0.24, 1] },
                  y: { duration: 5.4, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute right-0 top-[8%] h-[85%] w-[74%] overflow-hidden rounded-[34px] shadow-[0_26px_52px_rgba(31,52,54,0.24)]"
              >
                <img src={whoWeAreCollageImages[0]} alt="Episode architecture" className="h-full w-full object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -42 }}
                animate={isWhoWeAreActive ? { opacity: 1, y: [0, -5, 0] } : { opacity: 0, y: -42 }}
                transition={{
                  opacity: { duration: 0.7, delay: isWhoWeAreActive ? 0.26 : 0, ease: [0.2, 0.9, 0.24, 1] },
                  y: { duration: 5.1, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute left-[2%] top-0 w-[38%]"
              >
                <img
                  src={whoWeAreCollageImages[1]}
                  alt="Episode networking spaces"
                  className="aspect-[4/5] w-full rounded-[22px] border-4 border-[#f1f3f3] object-cover shadow-xl transition-transform duration-700 ease-[cubic-bezier(0.2,0.9,0.24,1)] group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:-rotate-1"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={isWhoWeAreActive ? { opacity: 1, y: [0, 5, 0] } : { opacity: 0, y: 48 }}
                transition={{
                  opacity: { duration: 0.7, delay: isWhoWeAreActive ? 0.34 : 0, ease: [0.2, 0.9, 0.24, 1] },
                  y: { duration: 5.8, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute bottom-[2%] left-[16%] w-[34%]"
              >
                <img
                  src={whoWeAreCollageImages[2]}
                  alt="Episode communal and social moments"
                  className="aspect-square w-full rounded-[22px] border-4 border-[#f1f3f3] object-cover shadow-xl transition-transform duration-700 ease-[cubic-bezier(0.2,0.9,0.24,1)] group-hover:translate-x-2 group-hover:translate-y-2 group-hover:rotate-1"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={isWhoWeAreActive ? { opacity: 1, scale: [1, 1.03, 1] } : { opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.8, delay: isWhoWeAreActive ? 0.42 : 0, scale: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' } }}
                className="absolute bottom-[8%] right-[6%] rounded-2xl border border-white/70 bg-white/78 px-4 py-2 shadow-[0_14px_32px_rgba(31,52,54,0.16)] backdrop-blur-sm"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#1f3436]/65">Episode ecosystem</p>
                <p className="mt-1 text-[13px] font-semibold text-[#1f3436]">Network • Bar • Communal</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <EpisodeLandingSleep sectionRef={thirdSectionRef} isActive={activeSnapIndex === 2} />

        <EpisodeLandingMeetWork sectionRef={fourthSectionRef} isActive={activeSnapIndex === 3} />

        <EpisodeLandingOffers sectionRef={fifthSectionRef} isActive={activeSnapIndex === 4} />
        <EpisodeLandingEatDrink sectionRef={sixthSectionRef} isActive={activeSnapIndex === 5} />
      </main>
    </div>
  )
}

export default EpisodeLandingTenth
