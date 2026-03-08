import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  UserPlus,
  LogIn
} from 'lucide-react';

const IMAGES = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];

const LandingPage = ({ onGetStarted }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCarouselIndex(i => (i + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused]);

  const prev = useCallback(() => {
    setPaused(true);
    setCarouselIndex(i => (i - 1 + IMAGES.length) % IMAGES.length);
    setTimeout(() => setPaused(false), 6000);
  }, []);

  const next = useCallback(() => {
    setPaused(true);
    setCarouselIndex(i => (i + 1) % IMAGES.length);
    setTimeout(() => setPaused(false), 6000);
  }, []);

  const goTo = useCallback((idx) => {
    setPaused(true);
    setCarouselIndex(idx);
    setTimeout(() => setPaused(false), 6000);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                <img src="/image0.png" alt="ISCC Midwifery Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Kumadronas
                </span>
                <p className="text-xs text-gray-500 hidden sm:block">ISCC Duty System</p>
              </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => onGetStarted('login')}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-full border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              <button
                onClick={() => onGetStarted('signup')}
                className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => { onGetStarted('login'); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center space-x-2 border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-full font-semibold"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              <button
                onClick={() => { onGetStarted('signup'); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-full font-semibold"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-emerald-50 via-green-50 to-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Text */}
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-slate-600 bg-clip-text text-transparent">
                  Streamline Your
                </span>
                <br />
                <span className="text-gray-900">Midwifery Journey</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The complete duty scheduling system for ISCC midwifery students.
                Manage schedules, track progress, and stay connected with your academic journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => onGetStarted('login')}
                  className="group bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right — Image Carousel */}
            <div className="relative animate-fade-in-up delay-200">
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>

                {/* Images */}
                {IMAGES.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Kumadronas ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      idx === carouselIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}

                {/* Prev / Next arrows */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors z-10"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goTo(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        idx === carouselIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating accent blobs */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-pulse pointer-events-none"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-20 animate-pulse delay-1000 pointer-events-none"></div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center mt-16 animate-bounce">
          <ChevronDown className="w-6 h-6 mx-auto text-gray-400" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full overflow-hidden">
                <img src="/image0.png" alt="ISCC Midwifery Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-sm">Kumadronas System</span>
            </div>
            <p className="text-xs text-gray-500">© 2025 Ilocos Sur Community College. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .delay-100  { animation-delay: 100ms; }
        .delay-200  { animation-delay: 200ms; }
        .delay-300  { animation-delay: 300ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
};

export default LandingPage;
