imporimport Css from "../assets/css.png";React, { useState, useEffect, useRef } from "react";
import "../Components/Home.css";
import profilePic from "../assets/profile-pic.jpeg";
import ping from "../assets/ping.gif";
import Html from "../assets/html.png";
import Css from         <div className="experties bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent font-medium mt-7 text-center smooth-section">
          <p className="text-reveal fade-on-scroll">
            I build modern, high-performance web applications with React.js,
            Next.js, and Tailwind CSS, enhanced by Shadcn/UI components for
            sleek and intuitive interfaces. Skilled in Node.js, MongoDB, and
            EJS, I create seamless full-stack experiences, including secure
            authentication flows and real-time communication with Socket.io. I'm
            also exploring AI-powered solutions using LangChain and RAG to
            deliver smarter applications. Passionate about clean, maintainable
            code and great UI/UX, I focus on crafting scalable, accessible, and/css.png";
import Sass from "../assets/sass.svg";
import Tailwind from "../assets/tailwind.png";
import Javascript from "../assets/javascript.png";
import ReactLogo from "../assets/react.png";
import Typescript from "../assets/typescript.png";
import mongodb from "../assets/mongodb.png";
import docker from "../assets/docker.svg";
import nodejs from "../assets/Node.js.png";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "./Navbar";
// import Background from "./Background";

import Example from "./card";
import Card2 from "./Card2";
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaArrowRight,
} from "react-icons/fa";
// import LinkAsButton from "./Card";

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
  }, [currentText, currentTextIndex, isDeleting, texts, speed, deleteSpeed, pauseTime]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
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
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Parallax effect for background elements
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.setProperty('--scroll-offset', `${scrollY * speed}px`);
      });
      
      // Scale and fade effects
      const scaleElements = document.querySelectorAll('.scale-on-scroll');
      scaleElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
        
        const scaleValue = 0.8 + (progress * 0.2);
        element.style.setProperty('--scale-factor', scaleValue);
      });
      
      // Fade on scroll
      const fadeElements = document.querySelectorAll('.fade-on-scroll');
      fadeElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / windowHeight));
        element.style.setProperty('--fade-opacity', progress);
      });
      
      // Smooth section reveals
      const smoothSections = document.querySelectorAll('.smooth-section');
      smoothSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < windowHeight * 0.8) {
          section.classList.add('visible');
        }
      });
      
      // Image reveals
      const imageReveals = document.querySelectorAll('.image-reveal');
      imageReveals.forEach((image) => {
        const rect = image.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9) {
          image.classList.add('visible');
        }
      });
      
      // Text reveals with stagger
      const textReveals = document.querySelectorAll('.text-reveal');
      textReveals.forEach((text, index) => {
        const rect = text.getBoundingClientRect();
        if (rect.top < windowHeight * 0.8) {
          setTimeout(() => {
            text.classList.add('visible');
          }, index * 100);
        }
      });
      
      // Section dividers
      const dividers = document.querySelectorAll('.section-divider');
      dividers.forEach((divider) => {
        const rect = divider.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9) {
          divider.classList.add('visible');
        }
      });

      // Existing card stack effect
      const cards = document.querySelectorAll('.card-stack');
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - cardCenter) / windowHeight));
        
        if (scrollProgress > 0.3) {
          const trigger = card.getAttribute('data-scroll-trigger');
          card.classList.add(trigger);
        } else {
          card.classList.remove('stacked-1', 'stacked-2');
        }
      });
    };

    // Hero text animation on load
    const heroElements = document.querySelectorAll('.hero-text-effect');
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate');
      }, index * 200);
    });

    // Stagger animations for skills
    const staggerElements = document.querySelectorAll('.stagger-animation');
    staggerElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate');
      }, 1000 + (index * 100));
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col items-center relative">
      
      
      <Navbar />

    
      <div className="px-4 w-full flex flex-col items-center">
        <div className="hero-text-effect">
          <img
            src={profilePic}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-white shadow-lg image-reveal floating-effect"
          />
        </div>

        <div className="hero-text-effect">
          <div className="font-mono text-sm border-[0.1px] border-gray-100 p-2 flex items-center align-center justify-center mt-10 rounded-2xl">
            <div>
              <img src={ping} alt="Ping" className="w-6 h-6 inline-block" />
            </div>
            Available for work!
          </div>
        </div>

        <div className="text-center mt-10 smooth-section scale-on-scroll">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent hero-text-effect">
            Hi I'm{" "}
            <span className="relative bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 bg-clip-text text-transparent animate-gradient bg-size-400 text-reveal">
              SHIVA CHOUDHRY
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent font-medium text-reveal">
              making websites smoother than my excuses.
            </span>{" "}
            <br />
            <div className="text-reveal">
              <Typewriter 
                texts={["Full Stack Developer", "Creative Thinker", "Problem Solver"]}
                speed={100}
                deleteSpeed={50}
                pauseTime={2000}
              />
            </div>
          </h1>
        </div>

        <div className="experties bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent font-medium mt-7 text-center">
          <p>
            I build modern, high-performance web applications with React.js,
            Next.js, and Tailwind CSS, enhanced by Shadcn/UI components for
            sleek and intuitive interfaces. Skilled in Node.js, MongoDB, and
            EJS, I create seamless full-stack experiences, including secure
            authentication flows and real-time communication with Socket.io. I’m
            also exploring AI-powered solutions using LangChain and RAG to
            deliver smarter applications. Passionate about clean, maintainable
            code and great UI/UX, I focus on crafting scalable, accessible, and
            user-friendly digital experiences.
          </p>
        </div>

        {/* Tech Stack Grid */}

        <div className="connect mt-10 flex items-center space-x-6">
          <button className="bg-gray-200 text-black px-6 py-3 rounded-full border-2 border-black flex items-center space-x-2 font-semibold hover:bg-gray-300 transition">
            <span>Get in touch</span>
            <FaArrowRight />
          </button>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/shivachoudhry/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border-2 border-gray-400 rounded-full hover:bg-gray-700 transition"
            >
              <FaLinkedinIn className="text-white" />
            </a>
            <a
              href="https://github.com/Padhakushiva"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border-2 border-gray-400 rounded-full hover:bg-gray-700 transition"
            >
              <FaGithub className="text-white" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border-2 border-gray-400 rounded-full hover:bg-gray-700 transition"
            >
              <FaInstagram className="text-white" />
            </a>
            <a
              href="https://x.com/JaatShaab640956"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border-2 border-gray-400 rounded-full hover:bg-gray-700 transition"
            >
              <FaTwitter className="text-white" />
            </a>
          </div>
        </div>

        <div className="w-20 mt-32 rotate-90">
          {" "}
          <hr />{" "}
        </div>

        <div className="mt-30 text-center">
          <h1
            className="text-4xl font-bold pb-5 animate-gradient-about bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent bg-size-400"
          >
            About Me
          </h1>
          <br />
          <p>
            I also work across the full stack using Node.js, MongoDB, EJS, and
            Socket.io, with experience in authentication systems, real-time
            features, and backend integrations. Lately, I’ve been building with
            LangChain and RAG, exploring ways to integrate AI-driven solutions
            into modern applications.
          </p>{" "}
          <br />
          <p>
            I enjoy building projects end-to-end—from UI design to backend
            logic—while keeping performance, accessibility, and maintainability
            at the core. Always curious about new technologies, I aim to deliver
            work that’s practical, modern, and impactful.
          </p>
        </div>

        <div className="mt-16 w-full max-w-4xl px-4 smooth-section">
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent section-divider mb-8"></div>
          <h2 className="sr-only">Tech Stack</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-16 gap-x-10 place-items-center text-white/90">
            <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
              <img
                src={Html}
                alt="HTML5"
                className="text-5xl group-hover:scale-110 transition-transform image-reveal"
              />
              <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">
                HTML5
              </span>
            </div>
            <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
              <img
                src={Css}
                alt="CSS3"
                className="text-5xl group-hover:scale-110 transition-transform"
              />
              <span className="text-xs uppercase tracking-wide text-white/50">
                CSS3
              </span>
            </div>
            <div className="group flex flex-col items-center gap-3 w-13">
              <img
                src={Sass}
                alt="Sass"
                className="text-5xl group-hover:scale-110 transition-transform"
              />
              <span className="text-xs uppercase tracking-wide text-white/50">
                Sass
              </span>
            </div>
            <div className="group flex flex-col items-center gap-3 w-13">
              <img
                src={Tailwind}
                alt="Tailwind CSS"
                className="text-5xl group-hover:scale-110 transition-transform"
              />
              <span className="text-xs uppercase tracking-wide text-white/50">
                Tailwind
              </span>
            </div>
            <div className="group flex flex-col items-center gap-3 w-13">
              <img
                src={Javascript}
                alt="JavaScript"
                className="text-5xl group-hover:scale-110 transition-transform"
              />
              <span className="text-xs uppercase tracking-wide text-white/50">
                JavaScript
              </span>
            </div>
            <div className="group flex flex-col items-center gap-3 w-13">
              <img
                src={Typescript}
                alt="TypeScript"
                className="text-5xl group-hover:scale-110 transition-transform"
              />
              <span className="text-xs uppercase tracking-wide text-white/50">
                TypeScript
              </span>
            </div>
            <div className="group flex flex-col items-center gap-3 w-13">
              <img
                src={ReactLogo}
                alt="React"
                className="text-5xl group-hover:scale-110 transition-transform"
              />
              <span className="text-xs uppercase tracking-wide text-white/50">
                React
              </span>
            </div>
            <div className="group flex flex-col items-center gap-3 w-13">
              <img
                src={nodejs}
                alt="Next.js"
                className="text-5xl group-hover:scale-110 transition-transform"
              />
              <span className="text-xs uppercase tracking-wide text-white/50">
                Node.js
              </span>
            </div>
            <div className="group flex flex-col items-center gap-3 w-13">
              <img
                src={mongodb}
                alt="MongoDB"
                className="text-5xl group-hover:scale-110 transition-transform"
              />
              <span className="text-xs uppercase tracking-wide text-white/50">
                MongoDB
              </span>
            </div>
            <div className="group flex flex-col items-center gap-3 w-13">
              <img
                src={docker}
                alt="Docker"
                className="text-5xl group-hover:scale-110 transition-transform"
              />
              <span className="text-xs uppercase tracking-wide text-white/50">
                Docker
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center flex justify-center flex-col items-center">
          <div className=" flex flex-row md:flex-row items-center justify-center gap-4">
           <div className="w-full h-[5px] bg-white mt-20" />
            <h1 className="text-4xl font-bold pb-5 animate-gradient-projects bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent bg-size-400"> Projects</h1>
          </div>
          <p>
            Here’s a showcase of my work—each project tells its own story
            through a case study.
          </p>
        </div>

        <div className="flex flex-col w-full max-w-4xl px-4 gap-10 mb-10 projects-container">
          <div className="card-stack" data-scroll-trigger="stacked-1">
            <Example />
          </div>

          <div className="card-stack" data-scroll-trigger="stacked-2">
            <Card2 />
          </div>
        </div>

        <div className="w-full h-200 ">
          <h2 className="text-4xl font-bold text-center mb-8"></h2>
          <Contact />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
