import React, { useState, useEffect, useRef } from "react";
import "../Components/Home.css";
import profilePic from "../assets/profile-pic.jpeg";
import ping from "../assets/ping.gif";
import Html from "../assets/html.png";
import Css from "../assets/css.png";
import Sass from "../assets/sass.svg";
import Tailwind from "../assets/tailwind.png";
import Javascript from "../assets/javascript.png";
import ReactLogo from "../assets/react.png";
import Typescript from "../assets/typescript.png";
import mongodb from "../assets/mongodb.png";
import docker from "../assets/docker.svg";
import nodejs from "../assets/Node.js.png";
import Contact from "./ContactSimple";
import Footer from "./Footer";

import GSAPRayBackground from "./GSAPRayBackground";
// import Background from "./Background";

// Import the resume PDF from assets
import resumePDF from "../assets/ResumeShiva.pdf";

import Example from "./Card";
import Card2 from "./Card2";
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaArrowRight,
  FaDownload,
} from "react-icons/fa";

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Typewriter = ({ texts, speed = 100, deleteSpeed = 50, pauseTime = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const fullText = texts[currentTextIndex];
    
    const typeInterval = setInterval(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearInterval(typeInterval);
  }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseTime]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="animate-gradient-fullstack bg-gradient-to-r from-orange-400 via-yellow-300 to-green-400 bg-clip-text text-transparent bg-size-400">
      {currentText}
      <span className={`typewriter-cursor ${showCursor ? 'visible' : 'invisible'}`}>|</span>
    </span>
  );
};

const Home = () => {
  const [animatedElements, setAnimatedElements] = useState(new Set());
  const scrollTimeoutRef = useRef(null);
  const lastScrollY = useRef(0);

  // Resume download function
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Shiva_Choudhry_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Scroll to contact section function  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let isScrolling = false;

    const handleScroll = () => {
      // Debounce scroll events to prevent conflicts with background
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        if (!isScrolling) {
          window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Only process if scroll position has changed significantly
            if (Math.abs(scrollY - lastScrollY.current) < 5) {
              isScrolling = false;
              return;
            }
            lastScrollY.current = scrollY;
            
            // Smooth section reveals - trigger immediately when entering viewport
            const smoothSections = document.querySelectorAll('.smooth-section');
            smoothSections.forEach((section) => {
              const rect = section.getBoundingClientRect();
              const sectionId = section.dataset.sectionId || Math.random().toString();
              section.dataset.sectionId = sectionId;
              
              // Trigger as soon as element enters viewport (bottom of element is visible)
              if (rect.bottom > 0 && rect.top < windowHeight && !animatedElements.has(sectionId)) {
                section.classList.add('visible');
                setAnimatedElements(prev => new Set(prev).add(sectionId));
              }
            });
            
            // Image reveals - trigger immediately when entering viewport
            const imageReveals = document.querySelectorAll('.image-reveal');
            imageReveals.forEach((image) => {
              const rect = image.getBoundingClientRect();
              const imageId = image.dataset.imageId || Math.random().toString();
              image.dataset.imageId = imageId;
              
              // Trigger as soon as element enters viewport (bottom of element is visible)
              if (rect.bottom > 0 && rect.top < windowHeight && !animatedElements.has(imageId)) {
                image.classList.add('visible');
                setAnimatedElements(prev => new Set(prev).add(imageId));
              }
            });
            
            // Text reveals with stagger - trigger immediately when entering viewport
            const textReveals = document.querySelectorAll('.text-reveal');
            textReveals.forEach((text, index) => {
              const rect = text.getBoundingClientRect();
              const textId = text.dataset.textId || `text-${index}`;
              text.dataset.textId = textId;
              
              // Trigger as soon as element enters viewport (bottom of element is visible)
              if (rect.bottom > 0 && rect.top < windowHeight && !animatedElements.has(textId)) {
                setTimeout(() => {
                  text.classList.add('visible');
                  setAnimatedElements(prev => new Set(prev).add(textId));
                }, index * 15); // Ultra fast stagger for scroll reveals - reduced from 30ms to 15ms
              }
            });
            
            // Section dividers - trigger immediately when entering viewport
            const dividers = document.querySelectorAll('.section-divider');
            dividers.forEach((divider) => {
              const rect = divider.getBoundingClientRect();
              const dividerId = divider.dataset.dividerId || Math.random().toString();
              divider.dataset.dividerId = dividerId;
              
              // Trigger as soon as element enters viewport (bottom of element is visible)
              if (rect.bottom > 0 && rect.top < windowHeight && !animatedElements.has(dividerId)) {
                divider.classList.add('visible');
                setAnimatedElements(prev => new Set(prev).add(dividerId));
              }
            });

            isScrolling = false;
          });
        }
        isScrolling = true;
      }, 5); // 5ms debounce for ultra fast scroll animation response - reduced from 10ms
    };

    // Hero text animation on load
    setTimeout(() => {
      const heroElements = document.querySelectorAll('.hero-text-effect');
      heroElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('animate');
        }, index * 200);
      });
    }, 500);

    // Entrance animations for all hero elements - synchronized with ray effect
    setTimeout(() => {
      const entranceElements = document.querySelectorAll('.entrance-animation');
      entranceElements.forEach((element, index) => {
        setTimeout(() => {
          element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0px)';
        }, 1200 + (index * 300)); // Start after ray background animation, slower stagger
      });
    }, 100);

    // Stagger animations for tech stack
    setTimeout(() => {
      const staggerElements = document.querySelectorAll('.stagger-animation');
      staggerElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('animate');
        }, 1000 + (index * 150));
      });
    }, 1000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col items-center relative" style={{ isolation: 'isolate' }}>
      {/* Hero Section with Ray Background */}
      <div className="relative w-full" style={{ minHeight: '100vh' }}>
        <GSAPRayBackground 
          rayCount={60}
          rayLength={600}
          rayWidth={4}
          rayOpacity={0.12}
          raySpeed={0.05}
          mouseInfluence={0.35}
          colors={['#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#f3f4f6', '#ffffff']}
          className="absolute inset-0"
        />
        
        <div className="pt-40 px-4 xl:px-8 w-full max-w-7xl mx-auto flex flex-col items-center relative z-10" style={{ transform: 'translateZ(0)' }}>
          {/* Profile Image */}
          <div className="hero-text-effect entrance-animation" style={{ backfaceVisibility: 'hidden', opacity: 0, transform: 'translateY(30px)' }}>
            <img
              src={profilePic}
              alt="Profile"
              className="w-40 h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full object-cover border-white shadow-lg hero-text-effect floating-effect"
              style={{ transform: 'translate3d(0,0,0)' }}
            />
          </div>

          {/* Status Badge */}
          <div className="hero-text-effect entrance-animation" style={{ backfaceVisibility: 'hidden', opacity: 0, transform: 'translateY(30px)' }}>
            <div className="font-mono text-sm lg:text-base border-[0.1px] border-gray-100 p-2 lg:p-3 flex items-center justify-center mt-10 lg:mt-12 rounded-2xl">
              <div>
                <img src={ping} alt="Ping" className="w-6 h-6 lg:w-7 lg:h-7 inline-block" />
              </div>
              Available for work!
            </div>
          </div>

          {/* Hero Title */}
          <div className="text-center mt-10 lg:mt-12 xl:mt-16 hero-text-effect entrance-animation max-w-6xl mx-auto" style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0,30px,0)', opacity: 0 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent hero-text-effect">
              Hi I'm{" "}
              <span className="relative bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 bg-clip-text text-transparent animate-gradient bg-size-400 hero-text-effect">
                SHIVA CHOUDHRY
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent font-medium hero-text-effect">
                making websites smoother than my excuses.
              </span>
              <br />
              <div className="hero-text-effect text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-4">
                <Typewriter 
                  texts={["Full Stack Developer", "Creative Thinker", "Problem Solver"]}
                  speed={100}
                  deleteSpeed={50}
                  pauseTime={2000}
                />
              </div>
            </h1>
          </div>

          {/* Description */}
          <div className="experties bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent font-medium mt-7 lg:mt-10 xl:mt-12 text-center smooth-section entrance-animation max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <p className="description text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-relaxed lg:leading-relaxed xl:leading-relaxed 2xl:leading-relaxed px-4 lg:px-6 xl:px-8">
              I build modern, high-performance web applications with React.js,
              Next.js, and Tailwind CSS, enhanced by Shadcn/UI components for
              sleek and intuitive interfaces. Skilled in Node.js, MongoDB, and
              EJS, I create seamless full-stack experiences, including secure
              authentication flows and real-time communication with Socket.io. I'm
              also exploring AI-powered solutions using LangChain and RAG to
              deliver smarter applications. Passionate about clean, maintainable
              code and great UI/UX, I focus on crafting scalable, accessible, and
              modern applications.
            </p>
          </div>

          {/* CTA Buttons and Social Links */}
          <div className="mt-10 lg:mt-14 xl:mt-16 flex flex-col lg:flex-row items-center lg:justify-center lg:space-x-10 xl:space-x-12 space-y-8 lg:space-y-0 smooth-section entrance-animation" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            
            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
              <button 
                onClick={scrollToContact}
                className="bg-gray-200 text-black px-8 sm:px-10 lg:px-12 xl:px-14 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl lg:text-2xl rounded-full border-2 border-black flex items-center space-x-3 font-semibold hover:bg-gray-300 transition text-reveal transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Get in touch</span>
                <FaArrowRight className="text-lg sm:text-xl lg:text-2xl" />
              </button>
              <button 
                onClick={handleResumeDownload}
                className="bg-gray-200 text-black px-8 sm:px-10 lg:px-12 xl:px-14 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl lg:text-2xl rounded-full border-2 border-black flex items-center space-x-3 font-semibold hover:bg-gray-300 transition text-reveal transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Download CV</span>
                <FaDownload className="text-lg sm:text-xl lg:text-2xl" />
              </button>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 sm:space-x-5 lg:space-x-6 xl:space-x-8">
              <a
                href="https://www.linkedin.com/in/shivachoudhry/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 lg:p-6 xl:p-7 border-2 border-gray-400 rounded-full hover:bg-gray-700 hover:border-blue-400 transition-all duration-300 text-reveal transform hover:scale-110 shadow-lg hover:shadow-blue-400/20"
              >
                <FaLinkedinIn className="text-white text-xl sm:text-2xl lg:text-3xl hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="https://github.com/Padhakushiva"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 lg:p-6 xl:p-7 border-2 border-gray-400 rounded-full hover:bg-gray-700 hover:border-purple-400 transition-all duration-300 text-reveal transform hover:scale-110 shadow-lg hover:shadow-purple-400/20"
              >
                <FaGithub className="text-white text-xl sm:text-2xl lg:text-3xl hover:text-purple-400 transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 lg:p-6 xl:p-7 border-2 border-gray-400 rounded-full hover:bg-gray-700 hover:border-pink-400 transition-all duration-300 text-reveal transform hover:scale-110 shadow-lg hover:shadow-pink-400/20"
              >
                <FaInstagram className="text-white text-xl sm:text-2xl lg:text-3xl hover:text-pink-400 transition-colors" />
              </a>
              <a
                href="https://x.com/JaatShaab640956"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 lg:p-6 xl:p-7 border-2 border-gray-400 rounded-full hover:bg-gray-700 hover:border-cyan-400 transition-all duration-300 text-reveal transform hover:scale-110 shadow-lg hover:shadow-cyan-400/20"
              >
                <FaTwitter className="text-white text-xl sm:text-2xl lg:text-3xl hover:text-cyan-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the content */}
      <div className="pt-40 px-4 w-full flex flex-col items-center" style={{ transform: 'translateZ(0)' }}>

        {/* Original HR Divider */}
        <div className="w-20 mb-20 rotate-90 smooth-section">
          <hr className="section-divider" />
        </div>

        {/* Tech Stack Section */}
        <div className="mt-16 lg:mt-24 xl:mt-32 w-full smooth-section">
          <h2 className="sr-only">Tech Stack</h2>
          
          {/* Mobile/Tablet Grid View */}
          <div className="lg:hidden max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-12 gap-x-6 place-items-center text-white/90">
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={Html} alt="HTML5" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">HTML5</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={Css} alt="CSS3" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">CSS3</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={Sass} alt="Sass" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">Sass</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={Tailwind} alt="Tailwind CSS" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">Tailwind</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={Javascript} alt="JavaScript" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">JavaScript</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={ReactLogo} alt="React.js" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">React.js</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={Typescript} alt="TypeScript" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">TypeScript</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={mongodb} alt="MongoDB" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">MongoDB</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={docker} alt="Docker" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">Docker</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={nodejs} alt="Node.js" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">Node.js</span>
              </div>
            </div>
          </div>

          {/* Desktop Marquee View */}
          <div className="hidden lg:block w-full overflow-hidden">
            <div className="flex items-center">
              <div className="flex animate-marquee space-x-16 xl:space-x-20 2xl:space-x-24">
                {/* First set of tech items */}
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={Html} alt="HTML5" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">HTML5</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={Css} alt="CSS3" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">CSS3</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={Sass} alt="Sass" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">Sass</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={Tailwind} alt="Tailwind CSS" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">Tailwind</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={Javascript} alt="JavaScript" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">JavaScript</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={ReactLogo} alt="React.js" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">React.js</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={Typescript} alt="TypeScript" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">TypeScript</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={mongodb} alt="MongoDB" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">MongoDB</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={docker} alt="Docker" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">Docker</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={nodejs} alt="Node.js" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">Node.js</span>
                </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={Html} alt="HTML5" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">HTML5</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={Css} alt="CSS3" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">CSS3</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={Sass} alt="Sass" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">Sass</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={Tailwind} alt="Tailwind CSS" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">Tailwind</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={Javascript} alt="JavaScript" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">JavaScript</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={ReactLogo} alt="React.js" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">React.js</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={Typescript} alt="TypeScript" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">TypeScript</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={mongodb} alt="MongoDB" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">MongoDB</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={docker} alt="Docker" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">Docker</span>
                </div>
                <div className="group flex flex-col items-center gap-4 xl:gap-5 min-w-[120px] xl:min-w-[140px] stagger-animation">
                  <img src={nodejs} alt="Node.js" className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 group-hover:scale-110 transition-transform image-reveal" />
                  <span className="text-sm xl:text-base uppercase tracking-wide text-white/50 text-reveal">Node.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Me Section - Enhanced Responsive Style */}
        <div id="about" className="mt-30 text-center smooth-section max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          {/* Animated Gradient Line Above About Me */}
          <div className="w-full flex justify-center mb-8 lg:mb-12 xl:mb-16 section-divider">
            <div className="w-80 lg:w-96 xl:w-[500px] 2xl:w-[600px] h-[2px] lg:h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 section-divider"
                 style={{
                   background: 'linear-gradient(90deg, transparent 0%, #3b82f6 15%, #8b5cf6 50%, #ec4899 85%, transparent 100%)',
                   boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 4px 20px rgba(139, 92, 246, 0.3)'
                 }}>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold pb-6 lg:pb-10 xl:pb-12 animate-gradient-about bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent bg-size-400 scale-on-scroll">
            About Me
          </h1>
          <br />
          <p className="text-reveal fade-on-scroll text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-relaxed lg:leading-relaxed xl:leading-relaxed 2xl:leading-relaxed mb-6 lg:mb-8 xl:mb-10">
            I also work across the full stack using Node.js, MongoDB, EJS, and
            Socket.io, with experience in authentication systems, real-time
            features, and backend integrations. Lately, I've been building with
            LangChain and RAG, exploring ways to integrate AI-driven solutions
            into modern applications.
          </p>
          <br />
          <p className="text-reveal fade-on-scroll text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-relaxed lg:leading-relaxed xl:leading-relaxed 2xl:leading-relaxed">
            I enjoy building projects end-to-end—from UI design to backend
            logic—while keeping performance, accessibility, and maintainability
            at the core. Always curious about new technologies, I aim to deliver
            work that's practical, modern, and impactful.
          </p>
        </div>

        {/* Projects Section */}
        <div id="projects" className="mt-40 lg:mt-56 xl:mt-64 text-center flex justify-center flex-col items-center smooth-section max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 lg:px-8 xl:px-12">
          {/* Animated Gradient Line Above Projects */}
          <div className="w-full flex justify-center mb-8 lg:mb-12 xl:mb-16 section-divider">
            <div className="w-80 lg:w-96 xl:w-[500px] 2xl:w-[600px] h-[2px] lg:h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 section-divider"
                 style={{
                   background: 'linear-gradient(90deg, transparent 0%, #3b82f6 15%, #8b5cf6 50%, #ec4899 85%, transparent 100%)',
                   boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 4px 20px rgba(139, 92, 246, 0.3)'
                 }}>
            </div>
          </div>
          
          <div className="flex flex-row md:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-10">
            <div className="w-full h-[5px] lg:h-[6px] bg-white mt-20 lg:mt-24 xl:mt-28 section-divider" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold pb-6 lg:pb-10 xl:pb-12 animate-gradient-projects bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent bg-size-400 scale-on-scroll">
              Projects
            </h1>
          </div>
          <p className="text-reveal fade-on-scroll text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-relaxed lg:leading-relaxed xl:leading-relaxed 2xl:leading-relaxed mt-6 lg:mt-8 xl:mt-10 max-w-4xl mx-auto">
            Here's a showcase of my work—each project tells its own story
            through a case study.
          </p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl px-4 lg:px-8 xl:px-12 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 mb-10 lg:mb-16 xl:mb-20 mt-16 lg:mt-20 xl:mt-24 projects-container smooth-section">
          <div className="hero-text-effect floating-effect smooth-section flex-1 lg:max-w-[48%] xl:max-w-[45%]">
            <Example />
          </div>
          <div className="hero-text-effect floating-effect smooth-section flex-1 lg:max-w-[48%] xl:max-w-[45%]">
            <Card2 />
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="w-full min-h-screen flex items-center justify-center relative overflow-hidden smooth-section">
          <Contact />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;