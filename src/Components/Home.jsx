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
import resumePDF from "../assets/Shiva_CV_t.pdf";
import sheryiansJobReadyCertificate from "../assets/Sheryians coading (1)_page-0001.jpg";
import infosysNoCodeCertificate from "../assets/1-890c1668-edd8-4c14-8c1b-9e3674f7e1fd (1)_page-0001.jpg";
import infosysPromptCertificate from "../assets/Prompt Engineering_page-0001.jpg";
import nptelSocialNetworksCertificate from "../assets/NPTEl_Result (1)_page-0001.jpg";

import Example from "./Card";
import Card2 from "./Card2";
import Achievements from "./Achievements";
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaArrowRight,
  FaDownload,
  FaTimes,
  FaChartLine,
  FaBrain,
  FaLink,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiExpress,
  SiPostman,
  SiJsonwebtokens,
  SiSocketdotio,
  SiGithubactions,
  SiPython,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiOpenai,
} from "react-icons/si";

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
  const [isCertificatesGalleryOpen, setIsCertificatesGalleryOpen] = useState(false);
  const [selectedCertificateCategory, setSelectedCertificateCategory] = useState("All");

  const certificatesDriveUrl = "https://drive.google.com/drive/folders/YOUR_CERTIFICATES_FOLDER_ID";

  const educationTimeline = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Lovely Professional University",
      period: "2023 - 2027",
      cgpa: "7.21",
      details:
        "Focused on software engineering, data structures, DBMS, and modern web development with hands-on full stack projects. Alongside this, I studied data science fundamentals including statistics, Python-based analysis, visualization, and machine learning experimentation through coursework and mini projects.",
    },
    {
      degree: "Senior Secondary (Class XII)",
      institution: "Mahara Agrasen Public school",
      period: "2022 - 2023",
      marks: "85%",
      details:
        "Completed higher secondary education with a strong focus on Mathematics and Computer Science. This phase strengthened my logical reasoning, problem-solving, and quantitative skills, which later helped me in both coding and data science learning.",
    },
    {
      degree: "Secondary (Class X)",
      institution: "Maharaja Agrasen Publis School",
      period: "2020 - 2021",
      marks: "94%",
      details:
        "Built a strong academic foundation across core subjects and developed discipline in learning. During this stage, I developed an early interest in technology, computers, and structured problem-solving that motivated my path toward engineering.",
    },
  ];

  const certificationsShowcase = [
    {
      title: "Job Ready Cohort",
      issuer: "Sheryians Coding School",
      period: "Sep 30, 2025",
      category: "Full Stack",
      level: "Professional Certificate",
      skills: ["Frontend Development", "DSA", "Backend + DevOps"],
      verifyUrl: "",
      imageUrl: sheryiansJobReadyCertificate,
      driveUrl: "https://drive.google.com/file/d/1WKAp8-foba_6wBd9A8bWrsGMEMjE0uMn/view?usp=sharing",
      details:
        "Comprehensive cohort covering frontend development, data structures and algorithms, backend development, CI/CD, Docker, Kubernetes, and aptitude/reasoning with real-world projects.",
    },
    {
      title: "Build Generative AI Apps and Solutions with No-Code Tools",
      issuer: "Infosys Springboard",
      period: "Aug 12, 2025",
      category: "Generative AI",
      level: "Career Track",
      skills: ["Generative AI", "No-Code Tools", "AI Workflows"],
      verifyUrl: "https://verify.onwingspan.com",
      imageUrl: infosysNoCodeCertificate,
      driveUrl: "https://drive.google.com/file/d/1x1ot7nZ7s3ViynY7ec5EHobEJVx--wHz/view?usp=sharing",
      details:
        "Course completion certificate focused on building practical generative AI solutions and application workflows using no-code platforms.",
    },
    {
      title: "ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM",
      issuer: "Infosys Springboard",
      period: "Aug 13, 2025",
      category: "Generative AI",
      level: "Specialization",
      skills: ["Prompt Engineering", "ChatGPT-4", "LLM Basics"],
      verifyUrl: "https://verify.onwingspan.com",
      imageUrl: infosysPromptCertificate,
      driveUrl: "https://drive.google.com/file/d/19_CCS2Y7p3P7yHpGahY3EPH6CbIR8v7J/view?usp=sharing",
      details:
        "Validated skills in prompt design, generative AI fundamentals, and applied usage of GPT-based models for practical tasks.",
    },
    {
      title: "Social Networks",
      issuer: "NPTEL (IIT Madras)",
      period: "Jan-Apr 2025",
      category: "Data Science",
      level: "NPTEL Certified",
      skills: ["Social Network Analysis", "Network Models", "Graph Concepts"],
      verifyUrl: "https://nptel.ac.in/noc",
      imageUrl: nptelSocialNetworksCertificate,
      driveUrl: "https://drive.google.com/file/d/1xeZeMmhf27jRAM2WSX_eyX9bd49DLgdF/view?usp=sharing",
      details:
        "Successfully completed the 12-week NPTEL Social Networks course with a consolidated score of 54%, strengthening network-analysis and graph-based reasoning.",
    },
  ];

  const groupedSkills = [
    {
      category: "Frontend",
      colorClass:
        "from-blue-500/20 to-cyan-500/10 border-blue-300/30 text-blue-100",
      skills: [
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "Sass" },
        { name: "Tailwind CSS" },
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "React.js" },
        { name: "Next.js" },
      ],
    },
    {
      category: "Backend",
      colorClass:
        "from-purple-500/20 to-pink-500/10 border-purple-300/30 text-purple-100",
      skills: [
        { name: "Node.js" },
        { name: "Express.js" },
        { name: "MongoDB" },
        { name: "REST APIs" },
        { name: "Authentication" },
        { name: "Socket.io" },
        { name: "Docker" },
        { name: "CI/CD" },
      ],
    },
    {
      category: "Data Science",
      colorClass:
        "from-emerald-500/20 to-lime-500/10 border-emerald-300/30 text-emerald-100",
      skills: [
        { name: "Python" },
        { name: "Data Analysis" },
        { name: "Statistics Basics" },
        { name: "Visualization" },
        { name: "Machine Learning Basics" },
        { name: "Prompt Engineering" },
        { name: "LLM Fundamentals" },
        { name: "LangChain + RAG" },
      ],
    },
  ];

  const skillLogoMap = {
    "HTML5": { type: "image", src: Html, alt: "HTML5 logo" },
    "CSS3": { type: "image", src: Css, alt: "CSS3 logo" },
    Sass: { type: "image", src: Sass, alt: "Sass logo" },
    "Tailwind CSS": { type: "image", src: Tailwind, alt: "Tailwind CSS logo" },
    JavaScript: { type: "image", src: Javascript, alt: "JavaScript logo" },
    TypeScript: { type: "image", src: Typescript, alt: "TypeScript logo" },
    "React.js": { type: "image", src: ReactLogo, alt: "React logo" },
    "Next.js": { type: "icon", component: SiNextdotjs },
    "Node.js": { type: "image", src: nodejs, alt: "Node.js logo" },
    "Express.js": { type: "icon", component: SiExpress },
    MongoDB: { type: "image", src: mongodb, alt: "MongoDB logo" },
    "REST APIs": { type: "icon", component: SiPostman },
    Authentication: { type: "icon", component: SiJsonwebtokens },
    "Socket.io": { type: "icon", component: SiSocketdotio },
    Docker: { type: "image", src: docker, alt: "Docker logo" },
    "CI/CD": { type: "icon", component: SiGithubactions },
    Python: { type: "icon", component: SiPython },
    "Data Analysis": { type: "icon", component: SiPandas },
    "Statistics Basics": { type: "icon", component: SiNumpy },
    Visualization: { type: "icon", component: FaChartLine },
    "Machine Learning Basics": { type: "icon", component: SiScikitlearn },
    "Prompt Engineering": { type: "icon", component: SiOpenai },
    "LLM Fundamentals": { type: "icon", component: FaBrain },
    "LangChain + RAG": { type: "icon", component: FaLink },
  };

  const certificateCategories = [
    "All",
    "Full Stack",
    "Generative AI",
    "Data Science",
  ];

  const filteredCertifications =
    selectedCertificateCategory === "All"
      ? certificationsShowcase
      : certificationsShowcase.filter(
          (certificate) => certificate.category === selectedCertificateCategory
        );

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

  const openCertificatesGallery = () => {
    setIsCertificatesGalleryOpen(true);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + "px";
    document.body.classList.add("gallery-open");
  };

  const closeCertificatesGallery = () => {
    setIsCertificatesGalleryOpen(false);
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.body.classList.remove("gallery-open");
  };

  // Cleanup gallery state on mount and unmount
  useEffect(() => {
    return () => {
      setIsCertificatesGalleryOpen(false);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

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
        
        <div className="pt-40 px-5 md:px-6 xl:px-10 w-full max-w-[92rem] mx-auto flex flex-col items-center justify-center text-center relative z-10" style={{ transform: 'translateZ(0)' }}>
          {/* Profile Image */}
          <div className="hero-text-effect entrance-animation" style={{ backfaceVisibility: 'hidden', opacity: 0, transform: 'translateY(30px)' }}>
            <img
              src={profilePic}
              alt="Profile"
              loading="eager"
              decoding="async"
              className="w-40 h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full object-cover border-white shadow-lg hero-text-effect floating-effect"
              style={{ transform: 'translate3d(0,0,0)' }}
            />
          </div>

          {/* Status Badge */}
          <div className="hero-text-effect entrance-animation" style={{ backfaceVisibility: 'hidden', opacity: 0, transform: 'translateY(30px)' }}>
            <div className="font-mono text-sm lg:text-base border-[0.1px] border-gray-100 p-2 lg:p-3 flex items-center justify-center mt-10 lg:mt-12 rounded-2xl">
              <div>
                <img src={ping} alt="Ping" loading="lazy" className="w-6 h-6 lg:w-7 lg:h-7 inline-block" />
              </div>
              Available for work!
            </div>
          </div>

          {/* Hero Title */}
          <div className="text-center mt-10 lg:mt-12 xl:mt-16 hero-text-effect entrance-animation max-w-[88rem] mx-auto" style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0,30px,0)', opacity: 0 }}>
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
                  texts={[
                    "Full Stack Developer",
                    "Data Science Enthusiast",
                    "AI Builder",
                    "Problem Solver",
                  ]}
                  speed={100}
                  deleteSpeed={50}
                  pauseTime={2000}
                />
              </div>
            </h1>
          </div>

          {/* Description */}
          <div className="experties bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent font-medium mt-7 lg:mt-10 xl:mt-12 text-center smooth-section entrance-animation max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <p className="description text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-relaxed lg:leading-relaxed xl:leading-relaxed 2xl:leading-relaxed px-4 lg:px-6 xl:px-8">
              I build modern, high-performance web applications with React.js,
              Next.js, and Tailwind CSS, enhanced by Shadcn/UI components for
              sleek and intuitive interfaces. Skilled in Node.js, MongoDB, and
              EJS, I create seamless full-stack experiences, including secure
              authentication flows and real-time communication with Socket.io.
              Alongside development, I work on data science workflows including
              data analysis, model experimentation, and AI-powered solutions
              using LangChain and RAG to deliver smarter applications.
              Passionate about clean, maintainable code and great UI/UX, I
              focus on crafting scalable, accessible, and modern applications.
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
      <div className="pt-40 px-5 md:px-6 xl:px-10 w-full flex flex-col items-center" style={{ transform: 'translateZ(0)' }}>

        {/* Original HR Divider */}
        <div className="w-20 mb-20 rotate-90 smooth-section">
          <hr className="section-divider" />
        </div>

        {/* Tech Stack Section */}
        <div className="mt-16 lg:mt-24 xl:mt-32 w-full smooth-section">
          <h2 className="sr-only">Tech Stack</h2>
          
          {/* Mobile/Tablet Grid View */}
          <div className="tech-stack-mobile lg:hidden max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-12 gap-x-6 place-items-center text-white/90">
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={Html} alt="HTML5" loading="lazy" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">HTML5</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={Css} alt="CSS3" loading="lazy" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">CSS3</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={Sass} alt="Sass" loading="lazy" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">Sass</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={Tailwind} alt="Tailwind CSS" loading="lazy" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">Tailwind</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={Javascript} alt="JavaScript" loading="lazy" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">JavaScript</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={ReactLogo} alt="React.js" loading="lazy" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">React.js</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={Typescript} alt="TypeScript" loading="lazy" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">TypeScript</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={mongodb} alt="MongoDB" loading="lazy" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">MongoDB</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={docker} alt="Docker" loading="lazy" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">Docker</span>
              </div>
              <div className="group flex flex-col items-center gap-3 w-13 stagger-animation">
                <img src={nodejs} alt="Node.js" loading="lazy" className="w-12 h-12 group-hover:scale-110 transition-transform image-reveal" />
                <span className="text-xs uppercase tracking-wide text-white/50 text-reveal">Node.js</span>
              </div>
            </div>
          </div>

          {/* Desktop Marquee View */}
          <div className="tech-stack-desktop hidden lg:block w-full overflow-hidden">
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
        <div id="about" className="mt-30 text-center smooth-section max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 lg:px-8 xl:px-12">
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
            features, and backend integrations. I actively explore data science
            with practical work in data cleaning, exploratory analysis, and
            machine learning experimentation. Lately, I've been building with
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

        {/* Education Section */}
        <div id="education" className="mt-40 lg:mt-52 text-center smooth-section w-full max-w-7xl xl:max-w-[88rem] 2xl:max-w-[96rem] mx-auto px-4 lg:px-8 xl:px-12">
          {/* Animated Gradient Line Above Education */}
          <div className="w-full flex justify-center mb-8 lg:mb-12 xl:mb-16 section-divider">
            <div
              className="w-80 lg:w-96 xl:w-[500px] 2xl:w-[600px] h-[2px] lg:h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 section-divider"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #3b82f6 15%, #8b5cf6 50%, #ec4899 85%, transparent 100%)",
                boxShadow:
                  "0 0 20px rgba(59, 130, 246, 0.5), 0 4px 20px rgba(139, 92, 246, 0.3)",
              }}
            ></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold pb-6 lg:pb-10 xl:pb-12 animate-gradient-about bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent bg-size-400 scale-on-scroll">
            Education
          </h1>

          <p className="text-reveal fade-on-scroll text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed max-w-4xl mx-auto mb-14 lg:mb-20">
            A quick timeline of my academic journey, covering both full stack engineering foundations and my growing data science focus.
          </p>

          <div className="relative">
            <div className="absolute left-5 top-0 h-full w-[2px] md:left-1/2 md:-translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-80"></div>

            <div className="space-y-10 lg:space-y-12">
              {educationTimeline.map((item, index) => (
                <div
                  key={`${item.degree}-${index}`}
                  className={`relative flex w-full ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div className="absolute left-5 top-8 h-4 w-4 -translate-x-1/2 rounded-full border border-white/50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 shadow-[0_0_18px_rgba(139,92,246,0.6)] md:left-1/2 md:top-10"></div>

                  <div
                    className={`ml-12 md:ml-0 w-full md:w-[46%] rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 lg:p-8 text-left text-reveal fade-on-scroll shadow-[0_8px_40px_rgba(80,80,120,0.22)] ${
                      index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <span className="inline-block rounded-full border border-blue-300/35 px-4 py-1 text-sm lg:text-base tracking-wide text-blue-200/90 mb-4">
                      {item.period}
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2">
                      {item.degree}
                    </h3>
                    <p className="text-base md:text-lg lg:text-xl text-purple-200/90 mb-3">
                      {item.institution}
                    </p>
                    <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white/80">
                      {item.details}
                    </p>
                    {item.cgpa && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="inline-block rounded-full bg-blue-500/20 border border-blue-300/40 px-3 py-1 text-xs md:text-sm text-blue-200/90">
                          CGPA: {item.cgpa}
                        </span>
                      </div>
                    )}
                    {item.marks && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="inline-block rounded-full bg-purple-500/20 border border-purple-300/40 px-3 py-1 text-xs md:text-sm text-purple-200/90">
                          Marks: {item.marks}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div id="skills" className="skills-zone-wrapper mt-36 lg:mt-48 text-center smooth-section w-full max-w-7xl xl:max-w-[94rem] 2xl:max-w-[102rem] mx-auto px-4 lg:px-8 xl:px-12">
          <div className="w-full flex justify-center mb-8 lg:mb-12 xl:mb-16 section-divider">
            <div
              className="w-80 lg:w-96 xl:w-[500px] 2xl:w-[600px] h-[2px] lg:h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 section-divider"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #3b82f6 15%, #8b5cf6 50%, #ec4899 85%, transparent 100%)",
                boxShadow:
                  "0 0 20px rgba(59, 130, 246, 0.5), 0 4px 20px rgba(139, 92, 246, 0.3)",
              }}
            ></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold pb-6 lg:pb-10 xl:pb-12 animate-gradient-about bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent bg-size-400 scale-on-scroll">
            Skills
          </h1>

          <p className="text-reveal fade-on-scroll text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed max-w-5xl mx-auto mb-10 lg:mb-14">
            My capabilities organized by domain to clearly show what I can build across frontend, backend, and data science.
          </p>

          <div className="skills-headline-pill text-reveal fade-on-scroll">
            Skill Constellation • 3 Domains • 24 Tools
          </div>

          <div className="skills-creative-shell grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 text-left">
            {groupedSkills.map((group, index) => (
              <article
                key={group.category}
                className={`skill-group-card rounded-2xl border bg-gradient-to-br backdrop-blur-md p-5 lg:p-6 shadow-[0_8px_30px_rgba(60,55,110,0.22)] ${group.colorClass}`}
                style={{ "--skill-tilt": `${(index - 1) * 0.9}deg` }}
              >
                <div className="skill-orb skill-orb-one"></div>
                <div className="skill-orb skill-orb-two"></div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {group.category}
                  </h3>
                  <span className="skills-count-chip">{group.skills.length} Skills</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skillItem, skillIndex) => {
                    const skill = skillItem.name;
                    const logo = skillLogoMap[skill];
                    const IconComp = logo?.type === "icon" ? logo.component : null;

                    return (
                    <span
                      key={`${group.category}-${skill}`}
                      className="skill-chip rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs md:text-sm text-white/90"
                      style={{ animationDelay: `${skillIndex * 70}ms` }}
                    >
                      {logo?.type === "image" && (
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          loading="lazy"
                          className="skill-chip-logo"
                        />
                      )}
                      {IconComp && <IconComp className="skill-chip-icon" aria-hidden="true" />}
                      {skill}
                    </span>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div id="certifications" className="mt-36 lg:mt-48 text-center smooth-section w-full max-w-7xl xl:max-w-[94rem] 2xl:max-w-[102rem] mx-auto px-4 lg:px-8 xl:px-12">
          {/* Animated Gradient Line Above Certifications */}
          <div className="w-full flex justify-center mb-8 lg:mb-12 xl:mb-16 section-divider">
            <div
              className="w-80 lg:w-96 xl:w-[500px] 2xl:w-[600px] h-[2px] lg:h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 section-divider"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #3b82f6 15%, #8b5cf6 50%, #ec4899 85%, transparent 100%)",
                boxShadow:
                  "0 0 20px rgba(59, 130, 246, 0.5), 0 4px 20px rgba(139, 92, 246, 0.3)",
              }}
            ></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold pb-6 lg:pb-10 xl:pb-12 animate-gradient-about bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent bg-size-400 scale-on-scroll">
            Certifications
          </h1>

          <p className="text-reveal fade-on-scroll text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed max-w-5xl mx-auto mb-10 lg:mb-14">
            A curated credential showcase in a modern card format, highlighting verified learning across full stack and data science.
          </p>

          <div className="certificates-redesign max-w-7xl mx-auto rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-7 lg:p-10 text-reveal fade-on-scroll shadow-[0_8px_40px_rgba(80,80,120,0.22)]">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="rounded-full border border-blue-300/35 px-3 py-1 text-xs md:text-sm text-blue-200/90 bg-blue-500/10">
                {filteredCertifications.length} Verified Certifications
              </span>
              {certificateCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCertificateCategory(category)}
                  className={`rounded-full border px-3 py-1 text-xs md:text-sm transition-colors ${
                    selectedCertificateCategory === category
                      ? "border-blue-300/45 text-blue-100 bg-blue-500/20"
                      : "border-white/20 text-white/80 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="certificates-rail-window mb-8">
              <div className="certificates-rail-track">
                {filteredCertifications.map((item) => (
                  <article key={`${item.title}-summary`} className="certificates-rail-card text-left">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="certificates-rail-image"
                      loading="lazy"
                    />
                    <div className="certificates-rail-content">
                      <p className="text-white font-medium text-base md:text-lg leading-snug">
                        {item.title}
                      </p>
                      <p className="text-white/70 text-sm md:text-base mt-1.5">
                        {item.issuer} • {item.period}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.skills.slice(0, 2).map((skill) => (
                          <span
                            key={`${item.title}-${skill}-summary`}
                            className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/75"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={openCertificatesGallery}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base md:text-lg text-white/90 hover:bg-white/10 transition-colors"
            >
              View Certificates ({filteredCertifications.length})
              <FaArrowRight className="text-sm" />
            </button>
          </div>
        </div>

        {isCertificatesGalleryOpen && (
          <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex justify-center items-center p-4 md:p-8" onClick={closeCertificatesGallery}>
            <div className="w-full max-w-5xl max-h-[90vh] bg-black/90 rounded-2xl border border-white/20 shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/15 bg-black/50 flex-shrink-0">
                <h2 className="text-white text-2xl md:text-3xl font-bold">All Certificates</h2>
                <button onClick={closeCertificatesGallery} className="text-white/70 hover:text-white transition-colors p-1 flex-shrink-0">
                  <FaTimes size={28} />
                </button>
              </div>

              <div className="overflow-y-auto flex-1">
                <div className="grid grid-cols-1 gap-8 p-6 md:p-8">
                  {filteredCertifications.map((cert, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <a href={cert.driveUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <img 
                          src={cert.imageUrl} 
                          alt={cert.title}
                          className="w-full h-auto rounded-lg border border-white/10 hover:border-white/30 transition-colors"
                          style={{ maxHeight: "450px", objectFit: "contain" }}
                        />
                      </a>
                      <div>
                        <p className="text-white font-bold text-lg md:text-xl">{cert.title}</p>
                        <p className="text-white/60 text-sm">{cert.issuer} • {cert.period}</p>
                        <a href={cert.driveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm mt-2 inline-block hover:text-blue-300">
                          → Open on Google Drive
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        <section
          id="projects"
          className="projects-zone-wrapper mt-40 lg:mt-56 xl:mt-64 w-full max-w-7xl xl:max-w-[94rem] 2xl:max-w-[102rem] mx-auto px-4 lg:px-8 xl:px-12 smooth-section"
        >
          <div className="text-center flex justify-center flex-col items-center">
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
              <div className="w-full h-[2px] lg:h-[3px] bg-gradient-to-r from-transparent via-white/40 to-transparent mt-20 lg:mt-24 xl:mt-28 section-divider" />
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
          <div className="projects-showcase flex flex-col lg:flex-row lg:justify-center lg:items-start w-full gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 mb-2 lg:mb-4 mt-14 lg:mt-20 xl:mt-20 projects-container smooth-section">
            <div className="hero-text-effect floating-effect smooth-section flex-1 lg:max-w-[48%] xl:max-w-[45%]">
              <Example />
            </div>
            <div className="hero-text-effect floating-effect smooth-section flex-1 lg:max-w-[48%] xl:max-w-[45%]">
              <Card2 />
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <Achievements />

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