import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedStarsBackground = ({ 
  starCount = 200,
  starSizes = [1, 2, 3],
  colors = ['#ffffff', '#e5e7eb', '#d1d5db', '#9ca3af', '#f3f4f6'],
  twinkleSpeed = 0.3,
  className = ""
}) => {
  const containerRef = useRef(null);
  const starsRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing stars
    container.innerHTML = '';
    starsRef.current = [];

    // Initial container animation - fade in
    gsap.fromTo(container, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 2,
      ease: "power2.out",
      delay: 0.3
    });

    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random positioning
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = starSizes[Math.floor(Math.random() * starSizes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Set initial styles
      Object.assign(star.style, {
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: '50%',
        boxShadow: `0 0 ${size * 2}px ${color}`,
        willChange: 'transform, opacity',
        pointerEvents: 'none',
        opacity: Math.random() * 0.8 + 0.2,
      });

      // Store star data
      star.starData = {
        baseX: x,
        baseY: y,
        baseSize: size,
        color: color,
        baseOpacity: parseFloat(star.style.opacity),
        twinkleOffset: Math.random() * Math.PI * 2,
      };

      container.appendChild(star);
      starsRef.current.push(star);

      // Individual star entrance animation
      gsap.fromTo(star, {
        opacity: 0,
        scale: 0
      }, {
        opacity: star.starData.baseOpacity,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.5 + (i * 0.01) // Very fast staggered delay
      });
    }

    // Mouse tracking
    const handleMouseMove = (e) => {
      // Mouse tracking removed - no movement effect
    };

    // Touch tracking for mobile
    const handleTouchMove = (e) => {
      // Touch tracking removed - no movement effect
    };

    // Animation loop
    let startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;

      starsRef.current.forEach((star, index) => {
        const data = star.starData;
        
        // Twinkling effect only
        const twinkle = Math.sin(elapsed * twinkleSpeed + data.twinkleOffset) * 0.3 + 0.7;
        const opacity = data.baseOpacity * twinkle;
        
        // Size pulsing
        const sizePulse = 1 + Math.sin(elapsed * twinkleSpeed * 0.5 + index * 0.1) * 0.2;
        
        // Stars stay at their original positions
        const finalX = data.baseX;
        const finalY = data.baseY;
        
        // Apply transformations
        gsap.set(star, {
          left: `${finalX}%`,
          top: `${finalY}%`,
          opacity: Math.max(0, Math.min(1, opacity)),
          scale: sizePulse,
          duration: 0.1,
          ease: "none"
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Event listeners removed - no mouse/touch tracking
    // No event listeners needed now

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [starCount, starSizes, colors, twinkleSpeed]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-[-2] overflow-hidden ${className}`}
      style={{
        background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%)',
        willChange: 'transform'
      }}
    />
  );
};

export default AnimatedStarsBackground;
