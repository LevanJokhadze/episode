import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarCheck2, CalendarDays, ChevronDown, Menu, MessageCircle, Users, X } from 'lucide-react'
import hotelHeroVideo from '../assets/videos/hotel-hero.mp4'
import hotelHeroVideo2 from '../assets/videos/hotel-hero-2.mp4'
import hotelHeroVideo3 from '../assets/videos/hotel-hero-3.mp4'
import episodeRoomImage from '../assets/images/episode4.jpg'
import logoImage from '../assets/images/logo2.png'
import { episodeDesignLibrary } from '../design-library'

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
  const [desktopDropdown, setDesktopDropdown] = useState<'stay' | 'about' | 'work' | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [collisionFlash, setCollisionFlash] = useState(false)
  const [collisionSpark, setCollisionSpark] = useState(false)
  const sceneVideos = [hotelHeroVideo, hotelHeroVideo2, hotelHeroVideo3]
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const dropdownCloseTimeout = useRef<number | null>(null)
  const mainScrollRef = useRef<HTMLElement | null>(null)
  const firstSectionRef = useRef<HTMLElement | null>(null)
  const secondSectionRef = useRef<HTMLElement | null>(null)
  const energyPathBRef = useRef<SVGPathElement | null>(null)
  const energyPathCRef = useRef<SVGPathElement | null>(null)
  const ballBOuterRef = useRef<SVGCircleElement | null>(null)
  const ballBInnerRef = useRef<SVGCircleElement | null>(null)
  const ballCOuterRef = useRef<SVGCircleElement | null>(null)
  const ballCInnerRef = useRef<SVGCircleElement | null>(null)
  const snapLockRef = useRef(false)
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  }
  const ui = episodeDesignLibrary.components
  const accentLineColor = episodeDesignLibrary.colors.accent.blue
  const accentGreenColor = episodeDesignLibrary.colors.accent.green
  const accentTerracottaColor = episodeDesignLibrary.colors.accent.terracotta
  const brandLightColor = episodeDesignLibrary.colors.brand.light
  const dropdownItems: Record<'stay' | 'about' | 'work', string[]> = {
    stay: ['Sleep', 'Meet & Work', 'Eat & Drink'],
    about: ['About Episode', 'FAQ', 'Blog'],
    work: ['Develop with us', 'Careers'],
  }

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

  useEffect(() => {
    const cycleMs = 5600
    const collisionStartRatio = 0.45
    const collisionEndRatio = 0.63
    const sparkDurationMs = 180
    let rafId = 0
    const startedAt = performance.now()
    let lastPhase = 0
    let sparkUntil = 0
    let lastFlashState = false

    const setBallPosition = (circleRef: React.RefObject<SVGCircleElement | null>, x: number, y: number) => {
      const el = circleRef.current
      if (!el) return
      el.setAttribute('cx', x.toFixed(2))
      el.setAttribute('cy', y.toFixed(2))
    }

    const getProgressOnPath = (phase: number) => {
      if (phase < collisionStartRatio) {
        return (phase / collisionStartRatio) * 0.5
      }
      if (phase < collisionEndRatio) {
        return 0.5
      }
      return 0.5 + ((phase - collisionEndRatio) / (1 - collisionEndRatio)) * 0.5
    }

    const tick = (now: number) => {
      const elapsed = now - startedAt
      const phase = (elapsed % cycleMs) / cycleMs
      const wrapped = phase < lastPhase
      const enteredCollision = (lastPhase < collisionStartRatio && phase >= collisionStartRatio) || (wrapped && phase >= collisionStartRatio)
      const enteredSeparation = (lastPhase < collisionEndRatio && phase >= collisionEndRatio) || (wrapped && phase >= collisionEndRatio)

      if (enteredCollision) {
        sparkUntil = now + sparkDurationMs
      }
      if (enteredSeparation) {
        setCarouselIndex((prev) => {
          if (sectionCarouselImages.length === 0) return prev
          return (prev + 1) % sectionCarouselImages.length
        })
      }

      const inCollision = phase >= collisionStartRatio && phase < collisionEndRatio
      if (inCollision !== lastFlashState) {
        lastFlashState = inCollision
        setCollisionFlash(inCollision)
      }

      const sparkNow = now < sparkUntil
      setCollisionSpark((prev) => (prev !== sparkNow ? sparkNow : prev))

      const pathB = energyPathBRef.current
      const pathC = energyPathCRef.current
      if (pathB && pathC) {
        const progress = getProgressOnPath(phase)
        const totalB = pathB.getTotalLength()
        const totalC = pathC.getTotalLength()
        const pointB = pathB.getPointAtLength(totalB * progress)
        const pointC = pathC.getPointAtLength(totalC * progress)
        setBallPosition(ballBOuterRef, pointB.x, pointB.y)
        setBallPosition(ballBInnerRef, pointB.x, pointB.y)
        setBallPosition(ballCOuterRef, pointC.x, pointC.y)
        setBallPosition(ballCInnerRef, pointC.x, pointC.y)
      }

      lastPhase = phase
      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(rafId)
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

    const sections = [firstSectionRef.current, secondSectionRef.current].filter(Boolean) as HTMLElement[]
    if (sections.length < 2) return

    const lockFor = (ms: number) => {
      snapLockRef.current = true
      window.setTimeout(() => {
        snapLockRef.current = false
      }, ms)
    }

    const snapToIndex = (targetIndex: number) => {
      const boundedIndex = Math.max(0, Math.min(targetIndex, sections.length - 1))
      sections[boundedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      lockFor(650)
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
      if (Math.abs(event.deltaY) < 4) return
      event.preventDefault()
      const currentIndex = getActiveIndex()
      const nextIndex = event.deltaY > 0 ? currentIndex + 1 : currentIndex - 1
      snapToIndex(nextIndex)
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', onWheel)
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
                className={`absolute inset-0 h-full w-full object-cover blur-[0.5px] transition-opacity duration-1000 ${
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
            className="relative z-20 container mx-auto grid h-full grid-cols-1 items-start gap-10 px-5 pb-48 pt-24 md:grid-cols-2 md:items-center md:px-6 md:pb-20 md:pt-0"
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
              <button type="button" className={ui.bookingPanel.field}>
                <span>Check In</span>
                <CalendarDays size={16} className={ui.bookingPanel.icon} />
              </button>
              <button type="button" className={ui.bookingPanel.field}>
                <span>Check Out</span>
                <CalendarCheck2 size={16} className={ui.bookingPanel.icon} />
              </button>
              <button type="button" className={ui.bookingPanel.field}>
                <span>Guest number</span>
                <Users size={16} className={ui.bookingPanel.icon} />
              </button>
              <button type="button" className={ui.bookingPanel.submit}>
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
            className={ui.chatButton.wrapper}
          >
            <MessageCircle size={24} />
          </motion.button>
        </section>

        <section
          ref={secondSectionRef}
          className="relative flex h-screen snap-start snap-always items-center overflow-hidden bg-[#edf3f4] px-4 pb-8 pt-24 text-[#171717] md:px-10 md:pt-28"
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(62% 56% at 14% 18%, ${accentGreenColor}66 0%, transparent 62%),
                  radial-gradient(50% 44% at 82% 20%, ${accentLineColor}52 0%, transparent 64%),
                  radial-gradient(40% 38% at 66% 80%, ${accentTerracottaColor}2f 0%, transparent 68%),
                  linear-gradient(128deg, ${brandLightColor}a6 0%, #f3f7f7 44%, #eaf1f2 100%)
                `,
              }}
            />
            <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(31,52,54,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(31,52,54,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(255,255,255,0.26)_100%)]" />
          </div>
          <svg
            viewBox="0 0 1000 360"
            preserveAspectRatio="none"
            shapeRendering="geometricPrecision"
            className="pointer-events-none absolute inset-x-0 top-20 h-[34%] w-full opacity-[0.82] md:hidden"
          >
            <defs>
              <filter id="energyGlowMobile" x="-220%" y="-220%" width="560%" height="560%">
                <feGaussianBlur stdDeviation="10" result="blurred" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="coreGlow" />
                <feMerge>
                  <feMergeNode in="blurred" />
                  <feMergeNode in="coreGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <path id="energyPathM1" d="M-60 92 C 120 26, 320 20, 500 132 C 650 224, 830 216, 1060 110" />
              <path id="energyPathM2" d="M-80 214 C 140 140, 330 126, 520 78 C 700 34, 850 52, 1080 198" />
              <path id="energyPathM3" d="M-40 290 C 180 250, 360 214, 560 152 C 760 92, 910 116, 1080 244" />
            </defs>
            <use href="#energyPathM1" fill="none" stroke={accentLineColor} strokeWidth="2.4" />
            <use href="#energyPathM2" fill="none" stroke={accentLineColor} strokeWidth="2.2" />
            <use href="#energyPathM3" fill="none" stroke={accentLineColor} strokeWidth="2" />

            <circle r="12.3" fill={accentGreenColor} filter="url(#energyGlowMobile)" opacity="0.62">
              <animateMotion dur="4.6s" repeatCount="indefinite" rotate="auto">
                <mpath href="#energyPathM1" />
              </animateMotion>
            </circle>
            <circle r="6.3" fill="#fcfff7" filter="url(#energyGlowMobile)" opacity="1">
              <animateMotion dur="4.6s" repeatCount="indefinite" rotate="auto">
                <mpath href="#energyPathM1" />
              </animateMotion>
            </circle>
            <circle r="12.3" fill={accentGreenColor} filter="url(#energyGlowMobile)" opacity="0.62">
              <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
                <mpath href="#energyPathM2" />
              </animateMotion>
            </circle>
            <circle r="6.3" fill="#fcfff7" filter="url(#energyGlowMobile)" opacity="1">
              <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
                <mpath href="#energyPathM2" />
              </animateMotion>
            </circle>
            <circle r="12.3" fill={accentGreenColor} filter="url(#energyGlowMobile)" opacity="0.62">
              <animateMotion dur="5.4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#energyPathM3" />
              </animateMotion>
            </circle>
            <circle r="6.3" fill="#fcfff7" filter="url(#energyGlowMobile)" opacity="1">
              <animateMotion dur="5.4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#energyPathM3" />
              </animateMotion>
            </circle>
          </svg>

          <svg
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
            shapeRendering="geometricPrecision"
            className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-[0.78] md:block"
          >
            <defs>
              <filter id="energyGlowDesktop" x="-220%" y="-220%" width="560%" height="560%">
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
              <path id="energyPathA" d="M-120 300 C 180 40, 480 40, 520 320 L 520 900" />
              <path ref={energyPathBRef} id="energyPathB" d="M-120 210 C 180 120, 540 120, 900 210 C 1260 300, 1620 300, 1920 210" />
              <path ref={energyPathCRef} id="energyPathC" d="M1920 250 C 1620 340, 1260 340, 900 210 C 540 80, 180 80, -120 250" />
              <path id="energyPathD" d="M740 900 L 740 520 C 740 340, 860 250, 1020 250 C 1170 250, 1280 330, 1280 500 L 1280 900" />
            </defs>
            <use href="#energyPathA" fill="none" stroke={accentLineColor} strokeWidth="2.6" />
            <use href="#energyPathB" fill="none" stroke={accentLineColor} strokeWidth="2.45" />
            <use href="#energyPathC" fill="none" stroke={accentLineColor} strokeWidth="2.1" />
            <use href="#energyPathD" fill="none" stroke={accentLineColor} strokeWidth="1.95" opacity="0.9" />
            <circle r="12.3" fill={accentGreenColor} filter="url(#energyGlowDesktop)" opacity="0.62"><animateMotion dur="5.1s" repeatCount="indefinite" rotate="auto"><mpath href="#energyPathA" /></animateMotion></circle>
            <circle r="6.3" fill="#fcfff7" filter="url(#energyGlowDesktop)" opacity="1"><animateMotion dur="5.1s" repeatCount="indefinite" rotate="auto"><mpath href="#energyPathA" /></animateMotion></circle>
            <circle ref={ballBOuterRef} cx="0" cy="0" r={collisionFlash ? 17.2 : 12.3} fill={accentGreenColor} filter="url(#energyGlowDesktop)" opacity={collisionFlash ? 0.95 : 0.62} />
            <circle ref={ballBInnerRef} cx="0" cy="0" r={collisionFlash ? 8.8 : 6.3} fill="#fcfff7" filter="url(#energyGlowDesktop)" opacity="1" />
            <circle ref={ballCOuterRef} cx="0" cy="0" r={collisionFlash ? 17.2 : 12.3} fill={accentGreenColor} filter="url(#energyGlowDesktop)" opacity={collisionFlash ? 0.95 : 0.62} />
            <circle ref={ballCInnerRef} cx="0" cy="0" r={collisionFlash ? 8.8 : 6.3} fill="#fcfff7" filter="url(#energyGlowDesktop)" opacity="1" />
            <circle cx="900" cy="210" r="3" fill="#f6ffe9" opacity="0">
              <animate attributeName="opacity" dur="4.6s" repeatCount="indefinite" values="0;0;1;0" keyTimes="0;0.47;0.5;0.56" />
              <animate attributeName="r" dur="4.6s" repeatCount="indefinite" values="3;3;18;3" keyTimes="0;0.47;0.52;0.56" />
            </circle>
            <circle r="12.3" fill={accentGreenColor} filter="url(#energyGlowDesktop)" opacity="0.62"><animateMotion dur="5.6s" repeatCount="indefinite" rotate="auto"><mpath href="#energyPathD" /></animateMotion></circle>
            <circle r="6.3" fill="#fcfff7" filter="url(#energyGlowDesktop)" opacity="1"><animateMotion dur="5.6s" repeatCount="indefinite" rotate="auto"><mpath href="#energyPathD" /></animateMotion></circle>
            <g transform="translate(900 210)" opacity={collisionSpark ? 1 : 0} filter="url(#energyGlowDesktop)">
              <circle r="18" fill="#ffd94a" opacity="0.35" />
              <circle r="30" fill="#ffde59" opacity="0.16" />
              <path d="M2 -24 L-8 -5 L3 -5 L-6 22 L16 -3 L4 -3 Z" fill="#ffe872" stroke="#fff6b8" strokeWidth="1.2" />
              <path d="M-20 -3 L-8 -6 L-13 4 Z" fill="#ffe872" opacity="0.9" />
              <path d="M20 2 L8 5 L13 -5 Z" fill="#ffe872" opacity="0.9" />
            </g>
          </svg>
          <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="max-w-[640px]">
              <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Who we are</h2>
              <p className="text-base leading-7 text-[#1f1f1f]/85 md:text-lg">
                Episode is created for today&apos;s modern travelers: those who demand more for less. We are innovators who merge technology with chic design to create unique experiences. Our hotel rooms and social spaces are created to offer maximum comfort and style, providing everything you need and nothing you don&apos;t. Join us and experience the future of hospitality today.
              </p>
              <h3 className="mt-10 text-3xl font-medium tracking-tight md:text-4xl">
                Just like our doors, our minds are open too!
              </h3>
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="mt-5 hidden items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#121212] md:inline-flex"
              >
                Read more
                <ArrowRight size={16} />
              </motion.button>
            </div>

            <div
              className={`relative h-[320px] overflow-hidden rounded-3xl border-0 transition-all duration-200 md:h-[420px] md:border-2 ${
                collisionFlash
                  ? 'md:border-[#86d8ff] md:shadow-[0_0_0_1px_rgba(134,216,255,0.92),0_0_24px_rgba(91,195,255,0.9),0_0_56px_rgba(91,195,255,0.62),inset_0_0_18px_rgba(143,226,255,0.35)]'
                  : 'md:border-transparent md:shadow-none'
              }`}
            >
              <img
                src={sectionCarouselImages[carouselIndex] ?? episodeRoomImage}
                alt="Episode hotel room"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-black/5 to-transparent" />
            </div>
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="mt-1 inline-flex justify-self-start items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#121212] md:hidden"
            >
              Read more
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default EpisodeLandingTenth
