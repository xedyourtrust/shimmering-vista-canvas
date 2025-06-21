
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToNext = () => {
    const gallery = document.querySelector('#gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-primary">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-6xl lg:text-7xl font-quicksand font-bold text-white mb-6 animate-float"
        >
          Welcome to Our
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
            Digital Journey
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-white/90 mb-8 font-inter font-medium max-w-2xl mx-auto animate-fade-in">
          Discover our story through stunning visuals, memorable events, and captivating moments
        </p>

        <button
          onClick={scrollToNext}
          className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-poppins font-medium text-lg hover:bg-white/30 transition-all duration-300 hover-scale hover-glow animate-glow"
          aria-label="Explore our gallery"
        >
          Explore Gallery
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToNext}
            className="text-white/70 hover:text-white transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ChevronDown className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
