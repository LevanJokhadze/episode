import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BedDouble, CalendarCheck2, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Menu, MessageCircle, Star, Users, X } from 'lucide-react'
import mainHeroVideo from '../assets/video.mp4'
import episodeRoomImage from '../assets/images/episode4.jpg'
import roomTwoImage from '../assets/images/room2.avif'
import atriumPersonsImage from '../assets/images/atrium-persons.jpg'
import meetingImage from '../assets/images/meeting.jpg'
import logoImage from '../assets/images/logo2.png'
import { episodeDesignLibrary } from '../design-library'
import EpisodeLandingOffers from './EpisodeLandingOffers'

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
  const [activeMobileTestimonialSlide, setActiveMobileTestimonialSlide] = useState(0)
  const sceneVideos = [mainHeroVideo]
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const dropdownCloseTimeout = useRef<number | null>(null)
  const mainScrollRef = useRef<HTMLElement | null>(null)
  const firstSectionRef = useRef<HTMLElement | null>(null)
  const secondSectionRef = useRef<HTMLElement | null>(null)
  const thirdSectionRef = useRef<HTMLElement | null>(null)
  const fourthSectionRef = useRef<HTMLElement | null>(null)
  const fifthSectionRef = useRef<HTMLElement | null>(null)
  const mobileTestimonialCarouselRef = useRef<HTMLDivElement | null>(null)
  const snapLockRef = useRef(false)
  const wheelDeltaAccumulatorRef = useRef(0)
  const wheelResetTimeoutRef = useRef<number | null>(null)
  const snapSettleTimeoutRef = useRef<number | null>(null)
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  }
  const ui = episodeDesignLibrary.components
  const accentLineColor = episodeDesignLibrary.colors.accent.blue
  const accentGreenColor = episodeDesignLibrary.colors.accent.green
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
  const sleepRoomCards = [
    { title: 'Solo', src: episodeRoomImage, guests: 'x1', beds: 'x1', size: '20 m²' },
    { title: 'Double Room', src: roomTwoImage, guests: 'x2', beds: 'x1', size: '20 m²' },
    { title: 'Twin Room', src: sectionCarouselImages[0] ?? episodeRoomImage, guests: 'x2', beds: 'x2', size: '20 m²' },
  ] as const
  const testimonialBaseSlides = [
    {
      quote:
        'Modern interiors, automated check-in process, nice cafe and bar downstairs, and a free co-working space. I enjoyed every minute of my stay!',
      author: 'Denis',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
    {
      quote:
        'Smart rooms, super fast check-in, and an amazing social vibe. Perfect blend of comfort and modern city living.',
      author: 'Nina',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    },
    {
      quote:
        'Great location, clean spaces, and a super smooth digital stay experience. I would absolutely come back again.',
      author: 'Mark',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
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

  const scrollMobileTestimonialCarousel = (direction: -1 | 1) => {
    const carousel = mobileTestimonialCarouselRef.current
    if (!carousel) return
    const firstCard = carousel.querySelector('[data-mobile-testimonial-card="true"]') as HTMLElement | null
    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap || window.getComputedStyle(carousel).gap || '0')
    const step = (firstCard?.offsetWidth ?? carousel.clientWidth) + (Number.isFinite(gap) ? gap : 0)
    const next = (activeMobileTestimonialSlide + direction + testimonialBaseSlides.length) % testimonialBaseSlides.length
    carousel.scrollTo({ left: step * next, behavior: 'smooth' })
    setActiveMobileTestimonialSlide(next)
  }

  useEffect(() => {
    if (activeSnapIndex !== 3) return
    if (window.matchMedia('(min-width: 768px)').matches) return
    const carousel = mobileTestimonialCarouselRef.current
    if (!carousel) return

    const syncSlideFromScroll = () => {
      const firstCard = carousel.querySelector('[data-mobile-testimonial-card="true"]') as HTMLElement | null
      const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap || window.getComputedStyle(carousel).gap || '0')
      const baseWidth = firstCard?.offsetWidth ?? carousel.clientWidth
      const step = (baseWidth || 1) + (Number.isFinite(gap) ? gap : 0)
      const nextIndex = Math.round(carousel.scrollLeft / step)
      const bounded = Math.max(0, Math.min(nextIndex, testimonialBaseSlides.length - 1))
      setActiveMobileTestimonialSlide(bounded)
    }

    syncSlideFromScroll()
    carousel.addEventListener('scroll', syncSlideFromScroll, { passive: true })

    const timer = window.setInterval(() => {
      const firstCard = carousel.querySelector('[data-mobile-testimonial-card="true"]') as HTMLElement | null
      const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap || window.getComputedStyle(carousel).gap || '0')
      const baseWidth = firstCard?.offsetWidth ?? carousel.clientWidth
      const step = (baseWidth || 1) + (Number.isFinite(gap) ? gap : 0)
      setActiveMobileTestimonialSlide((prev) => {
        const next = (prev + 1) % testimonialBaseSlides.length
        carousel.scrollTo({ left: step * next, behavior: 'smooth' })
        return next
      })
    }, 4600)

    return () => {
      carousel.removeEventListener('scroll', syncSlideFromScroll)
      window.clearInterval(timer)
    }
  }, [activeSnapIndex])

  useEffect(() => {
    const container = mainScrollRef.current
    if (!container) return

    const sections = [firstSectionRef.current, secondSectionRef.current, thirdSectionRef.current, fourthSectionRef.current, fifthSectionRef.current].filter(Boolean) as HTMLElement[]
    if (sections.length < 2) return

    const lockFor = (ms: number) => {
      snapLockRef.current = true
      window.setTimeout(() => {
        snapLockRef.current = false
      }, ms)
    }

    const snapToIndex = (targetIndex: number) => {
      const boundedIndex = Math.max(0, Math.min(targetIndex, sections.length - 1))
      setActiveSnapIndex(boundedIndex)
      sections[boundedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      lockFor(560)
    }

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

    const onWheel = (event: WheelEvent) => {
      if (snapLockRef.current) {
        event.preventDefault()
        return
      }

      if (Math.abs(event.deltaY) < 2) return
      event.preventDefault()

      wheelDeltaAccumulatorRef.current += event.deltaY
      if (wheelResetTimeoutRef.current) {
        window.clearTimeout(wheelResetTimeoutRef.current)
      }
      wheelResetTimeoutRef.current = window.setTimeout(() => {
        wheelDeltaAccumulatorRef.current = 0
      }, 140)

      if (Math.abs(wheelDeltaAccumulatorRef.current) < 42) return

      const currentIndex = getActiveIndex()
      const direction = wheelDeltaAccumulatorRef.current > 0 ? 1 : -1
      wheelDeltaAccumulatorRef.current = 0
      const nextIndex = currentIndex + direction
      if (nextIndex === currentIndex) return
      snapToIndex(nextIndex)
    }

    const onScroll = () => {
      setActiveSnapIndex(getActiveIndex())
      if (snapSettleTimeoutRef.current) {
        window.clearTimeout(snapSettleTimeoutRef.current)
      }
      snapSettleTimeoutRef.current = window.setTimeout(() => {
        if (snapLockRef.current) return
        const settledIndex = getActiveIndex()
        sections[settledIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        lockFor(380)
      }, 120)
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      if (wheelResetTimeoutRef.current) {
        window.clearTimeout(wheelResetTimeoutRef.current)
      }
      if (snapSettleTimeoutRef.current) {
        window.clearTimeout(snapSettleTimeoutRef.current)
      }
      container.removeEventListener('wheel', onWheel)
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
      <main ref={mainScrollRef} className="h-screen snap-y snap-mandatory md:snap-proximity overflow-y-auto overscroll-y-contain scroll-smooth">
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
          className="relative flex h-screen snap-start snap-always items-center overflow-hidden bg-[#f1f3f3] px-4 pb-6 pt-[82px] text-[#171717] md:px-10 md:pb-0 md:pt-0"
        >
          <svg
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.9]"
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
          <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-4 md:grid-cols-2 md:items-center md:gap-12">
            <div className="max-w-[640px]">
              <h2 className="mb-2 text-[30px] font-semibold leading-[0.95] tracking-tight text-[#1f3436] md:mb-5 md:text-[62px]">Who we are</h2>
              <p className="text-[14px] leading-[1.5] text-[#1f1f1f]/85 md:text-lg md:leading-7">
                Episode is created for today&apos;s modern travelers: those who demand more for less. We are innovators who merge technology with chic design to create unique experiences. Our hotel rooms and social spaces are created to offer maximum comfort and style, providing everything you need and nothing you don&apos;t. Join us and experience the future of hospitality today.
              </p>
              <h3 className="mt-3 text-[22px] font-medium leading-[1.08] tracking-tight text-[#1f3436] md:mt-9 md:text-[40px]">
                Just like our doors, our minds are open too!
              </h3>
              <motion.button
                type="button"
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`${ui.bookingPanel.submit} group mt-4 inline-flex h-10 w-auto items-center gap-2 px-6 text-[13px] md:mt-6 md:h-11 md:px-7 md:text-sm`}
              >
                Read more
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </div>

            <div className="group relative mx-auto h-[204px] w-full max-w-[560px] md:h-[520px]">
              <img
                src={whoWeAreCollageImages[0]}
                alt="Episode architecture"
                className="h-full w-full rounded-[32px] object-cover shadow-lg"
              />
              <motion.div
                initial={{ opacity: 0, y: -46 }}
                animate={activeSnapIndex === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -46 }}
                transition={{ duration: 0.7, ease: [0.2, 0.9, 0.24, 1], delay: activeSnapIndex === 1 ? 0.12 : 0 }}
                className="absolute -left-1 -top-1 w-[40%] md:-left-6 md:-top-6 md:w-1/2"
              >
                <img
                  src={whoWeAreCollageImages[1]}
                  alt="Episode social vibe"
                  className="aspect-[4/5] w-full rounded-[15px] border-4 border-[#f1f3f3] object-cover shadow-xl transition-transform duration-700 ease-[cubic-bezier(0.2,0.9,0.24,1)] group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:-rotate-1 md:rounded-[24px]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 52 }}
                animate={activeSnapIndex === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 52 }}
                transition={{ duration: 0.7, ease: [0.2, 0.9, 0.24, 1], delay: activeSnapIndex === 1 ? 0.28 : 0 }}
                className="absolute -bottom-2 -right-1 w-[34%] md:-bottom-8 md:-right-4 md:w-5/12"
              >
                <img
                  src={whoWeAreCollageImages[2]}
                  alt="Connected guest stories"
                  className="aspect-square w-full rounded-[15px] border-4 border-[#f1f3f3] object-cover shadow-xl transition-transform duration-700 ease-[cubic-bezier(0.2,0.9,0.24,1)] group-hover:translate-x-2 group-hover:translate-y-2 group-hover:rotate-1 md:rounded-[24px]"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={thirdSectionRef} className="relative flex h-screen w-full snap-start snap-always overflow-hidden bg-[#1f3436] pt-[74px] md:pt-0">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_12%_18%,rgba(239,211,172,0.08),transparent_66%),radial-gradient(44%_38%_at_84%_80%,rgba(184,218,240,0.08),transparent_68%)]" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(209,233,236,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(209,233,236,0.14)_1px,transparent_1px)] [background-size:72px_72px]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-6 md:px-10 md:py-24">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-start md:gap-8">
              <div>
                <h2 className="text-[48px] font-semibold tracking-tight text-[#efd3ac] md:text-[84px]">Sleep</h2>
              </div>
              <div>
                <p className="max-w-[46ch] text-[14px] leading-[1.45] text-white/80 md:text-lg md:leading-[1.6]">
                  Step into modern comfort with thoughtfully designed rooms that balance calm, technology, and effortless city living.
                </p>
                <a
                  href="#"
                  className="group mt-4 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[#d1e9ec] [text-shadow:0_0_14px_rgba(209,233,236,0.34)] md:mt-6 md:text-[13px]"
                >
                  Book directly for exclusive benefits
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-16 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0">
              {sleepRoomCards.map((room) => (
                <article
                  key={room.title}
                  className="group min-w-[84%] snap-start transition-transform duration-500 md:min-w-0"
                >
                  <div className="relative aspect-[4/3.6] w-full overflow-hidden rounded-[28px]">
                    <img
                      src={room.src}
                      alt={room.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 z-20 flex gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/82 px-2 py-0.5 text-[11px] font-medium text-[#1f3436] backdrop-blur-sm">
                        <Users size={11} />
                        {room.guests}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/82 px-2 py-0.5 text-[11px] font-medium text-[#1f3436] backdrop-blur-sm">
                        <BedDouble size={11} />
                        {room.beds}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-white/82 px-2 py-0.5 text-[11px] font-medium text-[#1f3436] backdrop-blur-sm">
                        {room.size}
                      </span>
                    </div>
                  </div>
                  <h3 className="inline-flex items-center gap-2 text-3xl font-medium text-white">
                    {room.title}
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section ref={fourthSectionRef} className={ui.testimonialSection.wrapper}>
          <svg
            viewBox="0 0 1000 360"
            preserveAspectRatio="none"
            shapeRendering="geometricPrecision"
            className="pointer-events-none absolute inset-x-0 top-20 h-[34%] w-full opacity-[0.9] md:hidden"
          >
            <defs>
              <filter id="energyGlowPage4Mobile" x="-220%" y="-220%" width="560%" height="560%">
                <feGaussianBlur stdDeviation="10" result="blurred" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="coreGlow" />
                <feMerge>
                  <feMergeNode in="blurred" />
                  <feMergeNode in="coreGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <path id="energyPathPage4M1" d="M-40 18 V236 C-40 304 24 338 108 338 C192 338 256 304 256 236 C256 198 228 172 188 172 C148 172 120 198 120 236 V266" />
              <path id="energyPathPage4M2" d="M1040 342 V102 C1040 34 976 0 892 0 C808 0 744 34 744 102 C744 140 772 166 812 166 C852 166 880 140 880 102 V72" />
              <path id="energyPathPage4M3" d="M500 -20 V380" />
            </defs>
            <use href="#energyPathPage4M1" fill="none" stroke={accentLineColor} strokeWidth="2.5" opacity="1" />
            <use href="#energyPathPage4M2" fill="none" stroke={accentLineColor} strokeWidth="2.5" opacity="1" />
            <use href="#energyPathPage4M3" fill="none" stroke={accentLineColor} strokeWidth="2.1" opacity="0.95" />

            <g filter="url(#energyGlowPage4Mobile)" opacity="1">
              <circle r="8.6" fill={accentGreenColor} opacity="0.54" />
              <circle r="3.8" fill="#fcfff7" />
              <animateMotion dur="4.6s" repeatCount="indefinite" rotate="auto">
                <mpath href="#energyPathPage4M1" />
              </animateMotion>
            </g>
            <g filter="url(#energyGlowPage4Mobile)" opacity="1">
              <circle r="8.6" fill={accentGreenColor} opacity="0.54" />
              <circle r="3.8" fill="#fcfff7" />
              <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
                <mpath href="#energyPathPage4M2" />
              </animateMotion>
            </g>
            <g filter="url(#energyGlowPage4Mobile)" opacity="1">
              <circle r="7.8" fill={accentLineColor} opacity="0.5" />
              <circle r="3.2" fill="#fcfff7" />
              <animateMotion dur="5.4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#energyPathPage4M3" />
              </animateMotion>
            </g>
          </svg>

          <svg
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
            shapeRendering="geometricPrecision"
            className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-[0.9] md:block"
          >
            <defs>
              <filter id="energyGlowPage4Desktop" x="-220%" y="-220%" width="560%" height="560%">
                <feGaussianBlur stdDeviation="12" result="blurred" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.6" result="coreGlow" />
                <feColorMatrix in="coreGlow" type="saturate" values="1.9" result="saturatedCore" />
                <feComponentTransfer in="saturatedCore" result="brightCore">
                  <feFuncR type="linear" slope="1.2" />
                  <feFuncG type="linear" slope="1.35" />
                  <feFuncB type="linear" slope="1.15" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="blurred" />
                  <feMergeNode in="brightCore" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <path id="energyPathPage4A" d="M-80 40 V572 C-80 708 38 776 188 776 C338 776 458 708 458 572 C458 498 404 450 332 450 C262 450 208 498 208 572 V630" />
              <path id="energyPathPage4B" d="M1680 760 V228 C1680 92 1562 24 1412 24 C1262 24 1142 92 1142 228 C1142 302 1196 350 1268 350 C1338 350 1392 302 1392 228 V170" />
              <path id="energyPathPage4C" d="M800 -40 V960" />
              <path id="energyPathPage4D" d="M520 -40 C520 210 536 388 510 566 C488 714 502 842 560 960" />
              <path id="energyPathPage4E" d="M1080 -40 C1080 210 1064 388 1090 566 C1112 714 1098 842 1040 960" />
            </defs>
            <use href="#energyPathPage4A" fill="none" stroke={accentLineColor} strokeWidth="3.1" opacity="1" />
            <use href="#energyPathPage4B" fill="none" stroke={accentLineColor} strokeWidth="3.1" opacity="1" />
            <use href="#energyPathPage4C" fill="none" stroke={accentLineColor} strokeWidth="2.5" opacity="0.96" />
            <use href="#energyPathPage4D" fill="none" stroke={accentLineColor} strokeWidth="2.1" opacity="0.92" />
            <use href="#energyPathPage4E" fill="none" stroke={accentLineColor} strokeWidth="2.1" opacity="0.92" />
            <g filter="url(#energyGlowPage4Desktop)" opacity="1">
              <circle r="8.8" fill={accentGreenColor} opacity="0.52" />
              <circle r="3.8" fill="#fcfff7" />
              <animateMotion dur="5.1s" repeatCount="indefinite" rotate="auto"><mpath href="#energyPathPage4A" /></animateMotion>
            </g>
            <g filter="url(#energyGlowPage4Desktop)" opacity="1">
              <circle r="8.8" fill={accentGreenColor} opacity="0.52" />
              <circle r="3.8" fill="#fcfff7" />
              <animateMotion dur="4.1s" repeatCount="indefinite" rotate="auto"><mpath href="#energyPathPage4B" /></animateMotion>
            </g>
            <g filter="url(#energyGlowPage4Desktop)" opacity="1">
              <circle r="8.2" fill={accentLineColor} opacity="0.5" />
              <circle r="3.3" fill="#fcfff7" />
              <animateMotion dur="4.8s" repeatCount="indefinite" rotate="auto"><mpath href="#energyPathPage4C" /></animateMotion>
            </g>
            <g filter="url(#energyGlowPage4Desktop)" opacity="1">
              <circle r="7.4" fill={accentGreenColor} opacity="0.46" />
              <circle r="3.1" fill="#fcfff7" />
              <animateMotion dur="5.6s" repeatCount="indefinite" rotate="auto"><mpath href="#energyPathPage4D" /></animateMotion>
            </g>
            <g filter="url(#energyGlowPage4Desktop)" opacity="1">
              <circle r="7.4" fill={accentGreenColor} opacity="0.46" />
              <circle r="3.1" fill="#fcfff7" />
              <animateMotion dur="5.9s" repeatCount="indefinite" rotate="auto"><mpath href="#energyPathPage4E" /></animateMotion>
            </g>
          </svg>
          <div className={ui.testimonialSection.container}>
            <div className="mb-5 md:hidden">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#1f3436]/70">Reviews</p>
              <h3 className="mt-2 text-[26px] font-semibold leading-[1.05] tracking-tight text-[#101616]">Guest stories</h3>
              <p className="mt-2 text-[13px] leading-[1.4] text-[#2f3839]/75">Swipe or tap arrows to explore verified experiences.</p>
            </div>

            <div
              ref={mobileTestimonialCarouselRef}
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
            >
              {testimonialBaseSlides.map((item) => (
                <article
                  key={`mobile-${item.author}`}
                  data-mobile-testimonial-card="true"
                  className="min-w-full snap-start rounded-[24px] border border-[#d8dede] bg-[#e8ecec] px-5 py-6 shadow-[0_10px_24px_rgba(31,52,54,0.08)]"
                >
                  <div className="mb-2 flex items-center gap-1 text-[#d2a96c]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={`${item.author}-mobile-star-${starIndex}`} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-[38px] font-bold leading-none text-[#111]">“</p>
                  <p className="mt-1 text-[18px] leading-[1.35] text-[#101616]">{item.quote}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 text-[16px] text-[#111]">
                    <div>
                      <span className="font-semibold">{item.author}</span>
                      <span className="ml-2 text-[#2f3839]/80">(More reviews →)</span>
                    </div>
                    <img
                      src={item.avatar}
                      alt={`${item.author} profile`}
                      loading="lazy"
                      className="h-11 w-11 rounded-full border border-white/80 object-cover shadow-[0_6px_14px_rgba(31,52,54,0.20)]"
                    />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between md:hidden">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => scrollMobileTestimonialCarousel(-1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1f3436]/15 bg-white/85 text-[#1f3436] shadow-[0_8px_18px_rgba(31,52,54,0.12)]"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-1.5">
                {testimonialBaseSlides.map((item, dotIndex) => (
                  <span
                    key={`mobile-dot-${item.author}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIndex === activeMobileTestimonialSlide ? 'w-6 bg-[#1f3436]' : 'w-2 bg-[#1f3436]/30'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => scrollMobileTestimonialCarousel(1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1f3436]/15 bg-white/85 text-[#1f3436] shadow-[0_8px_18px_rgba(31,52,54,0.12)]"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="hidden md:block">
              <div className={ui.testimonialSection.carouselViewport}>
                <div className={ui.testimonialSection.carouselTrack}>
                  {[...testimonialBaseSlides, ...testimonialBaseSlides].map((item, cardIndex) => (
                    <div key={`${item.author}-${cardIndex}`} className={ui.testimonialSection.panel}>
                      <div className="mb-3 flex items-center gap-1 text-[#d2a96c]">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star key={`${item.author}-star-${starIndex}`} size={15} fill="currentColor" />
                        ))}
                      </div>
                      <p className={ui.testimonialSection.quoteMark}>“</p>
                      <p className={ui.testimonialSection.quoteText}>{item.quote}</p>
                      <div className={`${ui.testimonialSection.authorRow} flex items-center justify-between gap-3`}>
                        <div>
                          <span className={ui.testimonialSection.authorName}>{item.author}</span>
                          <span className={ui.testimonialSection.authorMeta}>(More reviews →)</span>
                        </div>
                        <img
                          src={item.avatar}
                          alt={`${item.author} profile`}
                          loading="lazy"
                          className="h-12 w-12 rounded-full border border-white/85 object-cover shadow-[0_8px_18px_rgba(31,52,54,0.22)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <EpisodeLandingOffers sectionRef={fifthSectionRef} isActive={activeSnapIndex === 4} />
      </main>
    </div>
  )
}

export default EpisodeLandingTenth
