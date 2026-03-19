import React, { useState } from 'react';
import { ChevronDown, Calendar, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import atriumImage from '../assets/images/atrium.jpg';

const EpisodeLanding: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[var(--episode-primary-light)] episode-font-body text-[var(--episode-primary-dark)] selection:bg-[var(--episode-primary-dark)] selection:text-[var(--episode-primary-light)] overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${atriumImage})` }}
      />
      <div className="absolute inset-0 bg-[var(--episode-primary-light)]/78" />

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-8 py-6 relative z-50 border-b border-[var(--episode-primary-dark)]/20">
        <div className="text-sm font-bold tracking-tighter episode-font-body">EPISODE</div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium episode-font-body">
          <a href="#" className="hover:opacity-70 transition-opacity">Offers</a>
          
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
              <span>Stay at Episode</span>
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white/92 rounded-2xl border border-[var(--episode-primary-dark)]/20 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <ul className="space-y-2">
                <li><a href="#" className="hover:opacity-60 block py-1">Sleep</a></li>
                <li><a href="#" className="hover:opacity-60 block py-1">Meet & Work</a></li>
                <li><a href="#" className="hover:opacity-60 block py-1">Eat & Drink</a></li>
              </ul>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
              <span>Who we are</span>
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white/92 rounded-2xl border border-[var(--episode-primary-dark)]/20 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <ul className="space-y-2">
                <li><a href="#" className="hover:opacity-60 block py-1">About Episode</a></li>
                <li><a href="#" className="hover:opacity-60 block py-1">FAQ</a></li>
                <li><a href="#" className="hover:opacity-60 block py-1">Blog</a></li>
              </ul>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center space-x-1 hover:opacity-70 transition-opacity">
              <span>Work with us</span>
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white/92 rounded-2xl border border-[var(--episode-primary-dark)]/20 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <ul className="space-y-2">
                <li><a href="#" className="hover:opacity-60 block py-1">Develop with us</a></li>
                <li><a href="#" className="hover:opacity-60 block py-1">Careers</a></li>
              </ul>
            </div>
          </div>

          <a href="#" className="hover:opacity-70 transition-opacity">Get the App</a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 hover:bg-[var(--episode-primary-dark)]/5 rounded-full transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-0 left-0 w-full bg-[var(--episode-primary-light)]/95 z-40 pt-24 pb-12 px-6 border-b border-[var(--episode-primary-dark)]/20 rounded-b-3xl"
          >
            <div className="flex flex-col space-y-6 text-xl font-medium episode-font-body">
              <a href="#" onClick={() => setIsMenuOpen(false)}>Offers</a>
              <div className="space-y-4">
                <div className="text-sm text-[var(--episode-primary-dark)]/50 uppercase tracking-widest font-bold">Stay at Episode</div>
                <div className="flex flex-col space-y-3 pl-4">
                  <a href="#" onClick={() => setIsMenuOpen(false)}>Sleep</a>
                  <a href="#" onClick={() => setIsMenuOpen(false)}>Meet & Work</a>
                  <a href="#" onClick={() => setIsMenuOpen(false)}>Eat & Drink</a>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-sm text-[var(--episode-primary-dark)]/50 uppercase tracking-widest font-bold">Who we are</div>
                <div className="flex flex-col space-y-3 pl-4">
                  <a href="#" onClick={() => setIsMenuOpen(false)}>About Episode</a>
                  <a href="#" onClick={() => setIsMenuOpen(false)}>FAQ</a>
                  <a href="#" onClick={() => setIsMenuOpen(false)}>Blog</a>
                </div>
              </div>
              <a href="#" onClick={() => setIsMenuOpen(false)}>Get the App</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-32 md:pt-48 pb-48 md:pb-64 px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="episode-font-display text-[40px] sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-center max-w-5xl leading-[1.1] text-[var(--episode-primary-dark)]"
        >
          Experience modern living at Episode
        </motion.h1>
      </main>

      {/* Booking Widget */}
      <div className="fixed bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Check In */}
          <div className="bg-white/80 rounded-2xl border border-[var(--episode-primary-dark)]/20 flex items-center justify-between px-6 py-4 backdrop-blur-[2px]">
            <span className="text-[var(--episode-primary-dark)]/55 text-base md:text-lg">Check In</span>
            <button className="bg-[var(--episode-primary-light)] p-2 rounded-xl border border-[var(--episode-primary-dark)]/15 hover:opacity-90 transition-opacity">
              <Calendar size={20} />
            </button>
          </div>

          {/* Check Out */}
          <div className="bg-white/80 rounded-2xl border border-[var(--episode-primary-dark)]/20 flex items-center justify-between px-6 py-4 backdrop-blur-[2px]">
            <span className="text-[var(--episode-primary-dark)]/55 text-base md:text-lg">Check Out</span>
            <button className="bg-[var(--episode-primary-light)] p-2 rounded-xl border border-[var(--episode-primary-dark)]/15 hover:opacity-90 transition-opacity">
              <Calendar size={20} />
            </button>
          </div>

          {/* Guest Number */}
          <div className="bg-white/80 rounded-2xl border border-[var(--episode-primary-dark)]/20 flex items-center justify-between px-6 py-4 backdrop-blur-[2px]">
            <span className="text-[var(--episode-primary-dark)]/55 text-base md:text-lg">Guest number</span>
            <button className="bg-[var(--episode-primary-light)] p-2 rounded-xl border border-[var(--episode-primary-dark)]/15 hover:opacity-90 transition-opacity">
              <Calendar size={20} />
            </button>
          </div>

          {/* Book Now Button */}
          <button className="bg-[var(--episode-primary-dark)] text-[var(--episode-primary-light)] rounded-2xl py-4 md:py-5 text-lg font-semibold hover:opacity-95 active:scale-95 transition-all border border-[var(--episode-primary-dark)]">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EpisodeLanding;
