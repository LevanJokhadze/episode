/**
 * Episode Design Library (Single Source of Truth)
 * Use this file as the default design reference for all next pages.
 * Goal: keep 60+ pages visually consistent and faster to build.
 */

export const DESIGN_LIBRARY_VERSION = '1.0.0' as const

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const colors = {
  brand: {
    dark: '#1f3436',
    light: '#d1e9ec',
  },
  text: {
    onDarkHigh: '#ffffff',
    onDarkMid: 'rgba(255,255,255,0.92)',
    onDarkLow: 'rgba(255,255,255,0.72)',
    onLightHigh: '#1f3436',
    onLightMid: 'rgba(31,52,54,0.76)',
    onLightLow: 'rgba(31,52,54,0.58)',
  },
  surfaces: {
    glassDark: 'rgba(31,52,54,0.58)',
    glassDarkStrong: 'rgba(31,52,54,0.95)',
    glassLight: 'rgba(209,233,236,0.72)',
    borderSoftOnDark: 'rgba(255,255,255,0.10)',
    borderSoftOnLight: 'rgba(31,52,54,0.18)',
  },
  accent: {
    blue: '#b8daf0',
    green: '#d8f6c5',
    terracotta: '#fed5ca',
  },
} as const

export const typography = {
  fontFamily: {
    display: '"Beatrice Display", "Playfair Display", serif',
    body: '"Untitled Sans", "Inter", "Segoe UI", Arial, sans-serif',
    mono: '"JetBrains Mono", "SFMono-Regular", Menlo, monospace',
  },
  navItem: {
    desktop: 'text-[13px] uppercase tracking-[0.12em] font-medium',
    mobile: 'text-[13px] uppercase tracking-[0.12em] font-medium',
  },
  heroTitle: {
    mobile: 'text-[42px] leading-[0.92] font-bold tracking-tight',
    desktop: 'md:text-7xl',
  },
  buttonText: {
    primary: 'text-[12px] uppercase tracking-[0.14em] font-semibold',
    secondary: 'text-[12px] uppercase tracking-[0.08em] font-semibold',
    booking: 'text-sm font-medium',
  },
} as const

export const spacing = {
  nav: {
    mobile: 'px-4 py-4',
    desktop: 'md:px-8 md:py-6',
  },
  section: {
    mobileTopOffset: 'pt-16',
    desktopTopOffset: 'md:pt-20',
  },
  booking: {
    wrapperMobile: 'px-4',
    containerMobile: 'p-[11px] gap-2',
    containerDesktop: 'md:p-[13px]',
  },
} as const

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '22px',
  pill: '9999px',
} as const

export const shadows = {
  nav: 'none',
  bookingPanel: 'none',
  chat: '0 10px 24px rgba(0,0,0,0.28)',
  subtleTextOnLight: '0 1px 2px rgba(0,0,0,0.20)',
  subtleTextOnLightHover: '0 1px 3px rgba(0,0,0,0.26)',
} as const

export const motion = {
  easing: {
    softOut: [0.2, 0.9, 0.24, 1],
    standardOut: 'easeOut',
    inOut: 'easeInOut',
  },
  timing: {
    fast: 0.22,
    normal: 0.34,
    slow: 0.55,
  },
  hover: {
    slightLiftY: -1,
    scaleUp: 1.02,
    scaleDownTap: 0.98,
  },
} as const

export const zIndex = {
  nav: 50,
  dropdown: 65,
  mobileMenu: 60,
  booking: 30,
  chat: 40,
} as const

export const components = {
  navbar: {
    wrapper:
      'fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-[#1f3436]/50 backdrop-blur-[1px] px-4 py-4 md:px-8 md:py-6',
    logo: 'h-8 w-auto md:h-10',
    desktopMenu: 'hidden items-center space-x-8 text-[13px] uppercase tracking-[0.12em] text-white md:flex',
    desktopCta:
      'hidden rounded-xl bg-[#d1e9ec] px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1f3436] transition-colors hover:bg-white md:inline-flex',
    mobileBurger:
      'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-[#d1e9ec]/80 text-[#1f3436] md:hidden',
  },
  desktopDropdown: {
    wrapper: 'fixed left-0 right-0 top-[102px] z-[65] hidden origin-center md:block',
    row: 'relative mx-auto flex w-full max-w-[1220px] items-center justify-center gap-7 px-8 text-[17px] font-medium tracking-[0.01em] text-white/92',
    item: 'whitespace-nowrap px-1 py-0.5 [text-shadow:0_1px_2px_rgba(0,0,0,0.20)] transition-all duration-300 hover:text-[#d1e9ec] hover:[text-shadow:0_1px_3px_rgba(0,0,0,0.26)]',
    divider: 'select-none text-white/45',
    bottomLine: 'mx-auto mt-4 h-px w-[92%] max-w-[1220px] origin-center bg-gradient-to-r from-transparent via-white/45 to-transparent',
  },
  hero: {
    heading: 'mx-auto mb-4 max-w-[320px] text-center text-[24px] font-bold leading-[1.05] tracking-tight text-white sm:text-[32px] md:mb-6 md:max-w-4xl md:text-7xl',
    subCta:
      'mt-3 rounded-xl border border-white/10 bg-[#1f3436]/55 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#dbe9e6] transition hover:bg-[#1f3436]/60 md:mt-[12px] md:px-6 md:text-sm',
  },
  bookingPanel: {
    wrapper: 'absolute inset-x-0 top-[64%] z-30 -translate-y-1/2 px-4 md:bottom-[106px] md:top-auto md:translate-y-0',
    container:
      'mx-auto flex w-full max-w-5xl flex-col gap-2 rounded-[22px] border border-white/10 bg-[#1f3436]/58 p-[11px] md:flex-row md:p-[13px]',
    field:
      'flex h-11 items-center justify-between rounded-xl bg-[#d1e9ec]/72 px-4 text-left text-sm font-medium text-[#1f3436] md:h-12 md:flex-1',
    submit: 'h-11 rounded-xl bg-[#1f3436] px-7 text-sm font-semibold text-white md:h-12 md:w-[170px]',
    icon: 'opacity-80',
  },
  chatButton: {
    wrapper:
      'fixed bottom-8 right-4 z-40 inline-flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#d1e9ec]/70 p-3 text-[#1f3436] shadow-[0_10px_24px_rgba(0,0,0,0.28)] md:bottom-6 md:right-8 md:h-[74px] md:w-[74px] md:p-[13px]',
  },
} as const

export const contentGuidelines = {
  navLabels: ['Offers', 'Stay at Episode', 'Who we are', 'Work with us', 'Get the App'],
  ctaPrimary: 'Book now',
  heroHeadlinePattern: 'Experience modern living at {BrandOrPlace}',
  voice: {
    tone: 'premium, modern, concise',
    buttonCase: 'title case for short CTAs',
    avoid: 'long paragraphs inside hero',
  },
} as const

export const pageRules = {
  r01: 'Do not introduce new border radius values unless required; use radii tokens.',
  r02: 'Do not invent new text colors for standard UI; use text tokens.',
  r03: 'Keep desktop dropdown as text-first (no boxed cards) unless a page explicitly requires cards.',
  r04: 'Use subtle shadows only for readability and depth; avoid heavy visible glow.',
  r05: 'Primary CTA style must stay consistent across pages.',
  r06: 'Booking fields always include themed icons and the same height pattern.',
  r07: 'Animations should use motion.easing.softOut or standardOut for consistency.',
  r08: 'Mobile nav uses burger menu; desktop keeps horizontal nav.',
  r09: 'Hero section should protect booking panel space to avoid overlaps on mobile.',
  r10: 'When uncertain, reuse class strings from components object instead of creating new ones.',
} as const

export const episodeDesignLibrary = {
  version: DESIGN_LIBRARY_VERSION,
  breakpoints,
  colors,
  typography,
  spacing,
  radii,
  shadows,
  motion,
  zIndex,
  components,
  contentGuidelines,
  pageRules,
} as const

export default episodeDesignLibrary
