import React, { useEffect, useRef, useState } from 'react';
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaCode,
  FaArrowUp
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const [animatedElements, setAnimatedElements] = useState(new Set());

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate if we're within 30% from bottom
      const thirtyPercentFromBottom = documentHeight - windowHeight * 1.3; // 30% from bottom
      
      if (scrollY >= thirtyPercentFromBottom) {
        // Trigger all footer animations when 30% from bottom
        const footerElements = footer.querySelectorAll(
          '.smooth-section, .image-reveal, .text-reveal, .hero-text-effect, .stagger-animation, .section-divider'
        );
        
        footerElements.forEach((element, index) => {
          const elementId = element.dataset.footerId || `footer-${index}`;
          element.dataset.footerId = elementId;
          
          if (!animatedElements.has(elementId)) {
            setTimeout(() => {
              element.classList.add('visible', 'animate');
              setAnimatedElements(prev => new Set(prev).add(elementId));
            }, index * 100); // Staggered animation with 100ms delay
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [animatedElements]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer 
      ref={footerRef}
      className="relative w-full overflow-hidden mt-20 smooth-section rounded-4xl"
    >
      {/* Modern gradient background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>
        
        {/* Floating orbs for visual appeal */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 image-reveal">
            <div className="mb-6">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent mb-4 hero-text-effect">
                Shiva Choudhry
              </h2>
              <p className="text-gray-300 text-xl leading-relaxed max-w-md text-reveal">
                Crafting digital experiences with passion and precision. Let's build something amazing together.
              </p>
            </div>
            
            {/* Enhanced Social Links */}
            <div className="flex gap-4 stagger-animation">
              <a
                href="https://www.linkedin.com/in/shivachoudhry/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:bg-blue-500/10 hover:border-blue-400/50 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <FaLinkedinIn className="text-xl text-gray-300 group-hover:text-blue-400 transition-all duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </a>
              <a
                href="https://github.com/Padhakushiva"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <FaGithub className="text-xl text-gray-300 group-hover:text-purple-400 transition-all duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:bg-pink-500/10 hover:border-pink-400/50 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25"
              >
                <FaInstagram className="text-xl text-gray-300 group-hover:text-pink-400 transition-all duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-pink-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </a>
              <a
                href="https://x.com/JaatShaab640956"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <FaTwitter className="text-xl text-gray-300 group-hover:text-cyan-400 transition-all duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="text-reveal">
            <h3 className="text-2xl font-semibold text-white mb-6 relative hero-text-effect">
              Navigate
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full section-divider"></div>
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' }
              ].map((item, index) => (
                <li key={item.name} className="stagger-animation" style={{ animationDelay: `${index * 100}ms` }}>
                  <a
                    href={item.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 text-lg"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125"></div>
                    <span className="relative">
                      {item.name}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="image-reveal">
            <h3 className="text-2xl font-semibold text-white mb-6 relative hero-text-effect">
              Connect
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full section-divider"></div>
            </h3>
            <ul className="space-y-4">
              <li className="group flex items-center text-gray-400 stagger-animation">
                <div className="p-2 bg-blue-500/10 rounded-lg mr-3 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <FaEnvelope className="text-blue-400 text-base" />
                </div>
                <a 
                  href="mailto:chaudharyshiva@gmail.com"
                  className="hover:text-white transition-colors duration-300 text-lg"
                >
                  chaudharyshiva@gmail.com
                </a>
              </li>
              <li className="group flex items-center text-gray-400 stagger-animation">
                <div className="p-2 bg-purple-500/10 rounded-lg mr-3 group-hover:bg-purple-500/20 transition-colors duration-300">
                  <FaMapMarkerAlt className="text-purple-400 text-base" />
                </div>
                <span className="text-lg">India</span>
              </li>
              <li className="group flex items-center text-gray-400 stagger-animation">
                <div className="p-2 bg-green-500/10 rounded-lg mr-3 group-hover:bg-green-500/20 transition-colors duration-300">
                  <FaCode className="text-green-400 text-base" />
                </div>
                <span className="text-lg text-green-400">Available for Work</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modern Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-12 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          {/* Copyright with enhanced styling */}
          <div className="flex items-center space-x-2 text-gray-400 text-lg text-reveal">
            <span>© {currentYear} Shiva Choudhry.</span>
            <span className="hidden md:inline">Crafted with</span>
            <FaHeart className="text-red-500 animate-pulse mx-1 text-lg" />
            <span className="hidden md:inline">and lots of ☕</span>
          </div>

          {/* Enhanced Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group relative px-6 py-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-full hover:bg-blue-500/10 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 image-reveal"
          >
            <div className="flex items-center space-x-2">
              <span className="text-gray-300 group-hover:text-blue-400 transition-colors duration-300 text-lg">Back to top</span>
              <FaArrowUp className="text-gray-300 group-hover:text-blue-400 group-hover:-translate-y-1 transition-all duration-300 text-lg" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>

        {/* Tech Stack with improved design */}
        <div className="mt-12 text-center text-reveal">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-full">
            <span className="text-gray-400 text-base">Built with</span>
            <div className="flex space-x-2 text-base">
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md">React</span>
              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-md">Tailwind</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-md">GSAP</span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-md">Three.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;