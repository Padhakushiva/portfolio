import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusSquare,
} from "react-icons/fi";
import { FaLinkedin, FaGithub, FaTwitter, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Import the resume PDF from assets
import resumePDF from "../assets/ResumeShiva.pdf";
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" }); // smooth scroll hoga
  }
};

const StaggeredDropDown = () => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // Always show navbar at the top of the page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide navbar
        setIsVisible(false);
        setOpen(false); // Close dropdown if open
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false); // Close dropdown after navigation
  };

  const socialLinks = [
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/shivachoudhry/", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/Padhakushiva", label: "GitHub" },
    { icon: FaTwitter, href: "https://x.com/JaatShaab640956", label: "Twitter" },
  ];

  const handleResumeDownload = () => {
    // Using imported PDF from assets folder
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Shiva_Choudhry_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigationItems = [
    { text: "My Resume", icon: FiEdit, action: handleResumeDownload },
    { text: "About", icon: FiPlusSquare, action: () => scrollToSection('about') },
    { text: "Projects", icon: FiShare, action: () => scrollToSection('projects') },
    { text: "Contact", icon: FiTrash, action: () => scrollToSection('contact') },
  ];

  return (
    <>
      {/* Background blur overlay when navigation is open (mobile only) */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl w-[94%] sm:w-[92%] lg:w-fit lg:max-w-7xl xl:max-w-8xl h-[70px] lg:h-[80px] xl:h-[90px] flex items-center"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 flex justify-between lg:justify-center items-center h-full gap-3 sm:gap-4 lg:gap-10 xl:gap-14">
          {/* Left side - Social Links */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-5 xl:space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group p-2.5 sm:p-3 lg:p-4 xl:p-4.5 rounded-xl bg-white/5 hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-white/30"
                whileHover={{ 
                  scale: 1.05, 
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <motion.div
                  className="text-white group-hover:text-blue-300 transition-colors duration-300"
                  whileHover={{ 
                    filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
                  }}
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
                </motion.div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500 opacity-0 group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>

          {/* Desktop Navigation - Individual Items */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {navigationItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={item.action}
                className="relative flex items-center gap-2.5 xl:gap-3 px-5 py-3 xl:px-6 xl:py-3.5 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 hover:border-white/40 text-white transition-all duration-300 font-medium backdrop-blur-xl text-base xl:text-lg overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 32px rgba(255,255,255,0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                }}
              >
                <motion.span 
                  className="text-blue-300 flex-shrink-0"
                  whileHover={{
                    rotate: 360,
                    transition: { duration: 0.5 }
                  }}
                >
                  <item.icon className="w-5 h-5 xl:w-6 xl:h-6" />
                </motion.span>
                <span className="font-semibold tracking-wide whitespace-nowrap">{item.text}</span>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10 transition-all duration-500" />
              </motion.button>
            ))}
          </div>

          {/* Mobile Navigation Dropdown */}
          <motion.div animate={open ? "open" : "closed"} className="relative lg:hidden">
            <motion.button
              onClick={() => setOpen((pv) => !pv)}
              className="flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white transition-all duration-300 font-medium backdrop-blur-xl"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 32px rgba(255,255,255,0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              }}
            >
              <span className="text-sm sm:text-base lg:text-lg font-semibold tracking-wide">Navigation</span>
              <motion.span 
                variants={iconVariants}
                className="text-blue-300"
              >
                <FiChevronDown className="w-5 h-5" />
              </motion.span>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10 transition-all duration-500" />
            </motion.button>

            <motion.ul
              initial={wrapperVariants.closed}
              variants={wrapperVariants}
              style={{ 
                originY: "top", 
                translateX: "-50%",
                background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
              className="flex flex-col gap-1.5 p-3 rounded-2xl backdrop-blur-2xl border border-white/30 shadow-2xl absolute top-[120%] left-[50%] w-56 overflow-hidden"
            >
              {navigationItems.map((item, index) => (
                <Option key={index} setOpen={setOpen} Icon={item.icon} text={item.text} onClick={item.action} />
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

const Option = ({ text, Icon, setOpen, onClick }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setOpen(false);
        onClick && onClick();
      }}
      className="relative group flex items-center gap-3 w-full p-3 text-sm font-medium whitespace-nowrap rounded-xl hover:bg-white/20 text-white hover:text-blue-300 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/30"
      whileHover={{ 
        x: 4,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span 
        variants={actionIconVariants}
        className="text-blue-300 group-hover:text-white transition-colors duration-300"
        whileHover={{
          rotate: 360,
          transition: { duration: 0.5 }
        }}
      >
        <Icon />
      </motion.span>
      <span className="font-medium tracking-wide">{text}</span>
      
      {/* Hover gradient effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 opacity-0 group-hover:opacity-100" />
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3,
      ease: "easeOut"
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      duration: 0.2,
      ease: "easeIn"
    },
  },
};

const iconVariants = {
  open: { rotate: 180, transition: { duration: 0.3, ease: "easeOut" } },
  closed: { rotate: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.3,
      ease: "easeOut"
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    scale: 0.9,
    transition: {
      when: "afterChildren",
      duration: 0.2,
      ease: "easeIn"
    },
  },
};

const actionIconVariants = {
  open: { 
    scale: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  closed: { 
    scale: 0, 
    y: -7,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  },
};