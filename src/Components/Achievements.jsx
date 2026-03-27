import React, { useState, useEffect, useRef } from "react";
import { FaTrophy, FaFire, FaMedal, FaGraduationCap, FaStar, FaCode, FaUsers, FaRocket } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Achievements = () => {
  const [counters, setCounters] = useState({
    projects: 0,
    certifications: 0,
    experience: 0,
    followers: 0,
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Stats data with animation targets
  const stats = [
    {
      key: "projects",
      icon: FaCode,
      label: "Projects Completed",
      target: 3,
      suffix: "+",
      color: "from-blue-500 to-cyan-400",
    },
    {
      key: "certifications",
      icon: FaGraduationCap,
      label: "Certifications",
      target: 4,
      suffix: "",
      color: "from-purple-500 to-pink-400",
    },
    {
      key: "experience",
      icon: FaFire,
      label: "Years Coding",
      target: 3,
      suffix: "+",
      color: "from-orange-500 to-red-400",
    },
    {
      key: "followers",
      icon: FaUsers,
      label: "Community Reach",
      target: 500,
      suffix: "+",
      color: "from-green-500 to-emerald-400",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "Full Stack Mastery",
      icon: FaRocket,
      description: "Built 12+ projects with modern tech stack",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: 2,
      title: "Certified Professional",
      icon: FaMedal,
      description: "Completed 4+ industry-recognized certifications",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      id: 3,
      title: "Problem Solver",
      icon: FaStar,
      description: "Excelled in DSA and competitive problem-solving",
      color: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
    },
    {
      id: 4,
      title: "Innovation Leader",
      icon: FaTrophy,
      description: "Pioneered AI-driven solutions & modern workflows",
      color: "from-emerald-500/20 to-green-500/20",
      borderColor: "border-emerald-500/30",
    },
  ];

  // Counter animation effect
  useEffect(() => {
    if (!isVisible) return;

    const intervals = {};
    const duration = 2000; // 2 seconds

    Object.keys(counters).forEach((key) => {
      const target = stats.find((s) => s.key === key).target;
      const increment = target / (duration / 16); // 60fps

      intervals[key] = setInterval(() => {
        setCounters((prev) => {
          const newValue = prev[key] + increment;
          return {
            ...prev,
            [key]: newValue >= target ? target : newValue,
          };
        });
      }, 16);
    });

    return () => {
      Object.values(intervals).forEach((interval) => clearInterval(interval));
    };
  }, [isVisible]);

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="mt-40 lg:mt-56 xl:mt-64 w-full max-w-7xl xl:max-w-[94rem] 2xl:max-w-[102rem] mx-auto px-4 lg:px-8 xl:px-12 smooth-section relative overflow-hidden flex flex-col items-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Gradient line header */}
      <motion.div 
        className="w-full flex justify-center mb-8 lg:mb-12 xl:mb-16 section-divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        <motion.div
          className="w-80 lg:w-96 xl:w-[500px] 2xl:w-[600px] h-[2px] lg:h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 section-divider"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #3b82f6 15%, #8b5cf6 50%, #ec4899 85%, transparent 100%)",
            boxShadow:
              "0 0 20px rgba(59, 130, 246, 0.5), 0 4px 20px rgba(139, 92, 246, 0.3)",
          }}
          animate={{ opacity: [0, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
      </motion.div>

      {/* Title */}
      <motion.div 
        className="text-center flex justify-center flex-col items-center mb-12 lg:mb-16 xl:mb-20"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold pb-6 lg:pb-10 xl:pb-12 animate-gradient-achievements bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent bg-size-400 scale-on-scroll"
          whileInView={{ scale: [0.8, 1.05, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Achievements
        </motion.h1>
        <motion.p 
          className="text-reveal fade-on-scroll text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-relaxed lg:leading-relaxed xl:leading-relaxed 2xl:leading-relaxed max-w-4xl mx-auto text-white/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Milestones that define my journey as a developer
        </motion.p>
      </motion.div>

      {/* Counter Stats Section */}
      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16 lg:mb-20 xl:mb-24 w-full auto-rows-fr">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const currentValue = counters[stat.key];

          return (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-6 lg:p-8 text-center cursor-pointer flex flex-col items-center justify-center min-h-[200px] lg:min-h-[220px]"
            >
              {/* Animated background */}
              <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-b ${stat.color}`}
                whileHover={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              ></motion.div>

              {/* Shine effect on hover */}
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                ></motion.div>
              </motion.div>

              <div className="relative z-10 flex flex-col items-center h-full justify-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Icon className={`w-8 lg:w-10 h-8 lg:h-10 mb-3 lg:mb-4 text-white/80 group-hover:text-white transition-colors`} />
                </motion.div>

                <motion.div 
                  className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 flex items-baseline justify-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  whileInView={{ scale: [0.8, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                >
                  {Math.floor(currentValue)}<span className="text-lg lg:text-2xl ml-1">{stat.suffix}</span>
                </motion.div>
                <motion.p 
                  className="text-xs lg:text-sm text-white/70 group-hover:text-white/90 transition-colors uppercase tracking-widest text-center"
                  whileHover={{ letterSpacing: "0.1em" }}
                >
                  {stat.label}
                </motion.p>
              </div>

              {/* Bottom glow */}
              <motion.div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-50 blur"
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Achievement Cards Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 w-full">
        {achievements.map((achievement, index) => {
          const AchievementIcon = achievement.icon;

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 12
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-md text-reveal flex flex-col justify-center min-h-[280px] lg:min-h-[300px] cursor-pointer"
            >
              {/* Gradient background */}
              <motion.div 
                className={`absolute inset-0 ${achievement.color}`}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>

              {/* Border gradient */}
              <motion.div
                className={`absolute inset-0 rounded-2xl border-2 ${achievement.borderColor} opacity-0 group-hover:opacity-100`}
                style={{
                  background: `linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`,
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>

              {/* Animated shine on hover */}
              <motion.div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100">
                <motion.div
                  className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                ></motion.div>
              </motion.div>

              {/* Content */}
              <div className="relative z-10 p-6 lg:p-8 flex flex-col items-center justify-center text-center space-y-3 h-full">
                {/* Icon container */}
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 group-hover:bg-white/20"
                    whileHover={{ 
                      scale: 1.15,
                      backgroundColor: "rgba(255, 255, 255, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 20, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <AchievementIcon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Text content */}
                <motion.div className="flex-1">
                  <motion.h3 
                    className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-white"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {achievement.title}
                  </motion.h3>
                  <motion.p 
                    className="text-white/80 text-sm lg:text-base group-hover:text-white/90 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.8 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  >
                    {achievement.description}
                  </motion.p>
                </motion.div>
              </div>

              {/* Animated corner accent */}
              <motion.div 
                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div 
        className="mt-16 lg:mt-20 xl:mt-24 flex justify-center section-divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      >
        <motion.div 
          className="w-80 lg:w-96 xl:w-[500px] 2xl:w-[600px] h-[2px] lg:h-[3px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 section-divider"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #a855f7 15%, #ec4899 50%, #3b82f6 85%, transparent 100%)',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.5), 0 4px 20px rgba(236, 72, 153, 0.3)',
          }}
          animate={{ opacity: [0, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        ></motion.div>
      </motion.div>
    </section>
  );
};

export default Achievements;
