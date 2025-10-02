import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GSAPRayBackground = ({ 
  rayCount = 150,
  rayLength = 800,
  rayWidth = 2,
  rayOpacity = 0.3,
  raySpeed = 0.5,
  mouseInfluence = 0.15,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'],
  className = ""
}) => {
  const containerRef = useRef(null);
  const raysRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing rays
    container.innerHTML = '';
    raysRef.current = [];

    // Initial container animation - slide from top
    gsap.fromTo(container, {
      y: -100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.5
    });

    // Create rays
    for (let i = 0; i < rayCount; i++) {
      const ray = document.createElement('div');
      ray.className = 'ray';
      
      // Lamp-like positioning and rotation (rays emanating from top)
      const angle = (i / rayCount) * 180 - 90 + (Math.random() - 0.5) * 40; // Spread from -90 to 90 degrees
      const distance = Math.random() * rayLength + 200;
      const width = rayWidth + Math.random() * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Set initial styles (positioned from top center)
      Object.assign(ray.style, {
        position: 'absolute',
        left: '50%',
        top: '0%', // Changed from 50% to 0% (top of viewport)
        width: `${width}px`,
        height: `${distance}px`,
        background: `linear-gradient(0deg, transparent 0%, ${color} 20%, ${color} 60%, transparent 100%)`,
        transformOrigin: '50% 0%',
        transform: `translate(-50%, 0) rotate(${angle}deg)`,
        opacity: rayOpacity + Math.random() * 0.2,
        borderRadius: `${width/2}px`,
        boxShadow: `0 0 ${width * 3}px ${color}`,
        willChange: 'transform, opacity',
        pointerEvents: 'none'
      });

      // Store ray data
      ray.rayData = {
        baseAngle: angle,
        baseDistance: distance,
        baseOpacity: parseFloat(ray.style.opacity),
        color: color,
        pulseOffset: Math.random() * Math.PI * 2
      };

      container.appendChild(ray);
      raysRef.current.push(ray);

      // Individual ray entrance animation
      gsap.fromTo(ray, {
        opacity: 0,
        height: 0
      }, {
        opacity: rayOpacity + Math.random() * 0.2,
        height: `${distance}px`,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.8 + (i * 0.02) // Staggered delay
      });
    }

    // Mouse and touch tracking (adjusted for top-center origin)
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const topY = rect.top;
      
      mouseRef.current = {
        x: (e.clientX - centerX) / rect.width,
        y: (e.clientY - topY) / rect.height
      };
    };

    // Touch tracking for mobile devices
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const topY = rect.top;
        
        mouseRef.current = {
          x: (touch.clientX - centerX) / rect.width,
          y: (touch.clientY - topY) / rect.height
        };
      }
    };

    // Handle touch start for immediate response
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        handleTouchMove(e);
      }
    };

    // Animation loop
    let startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;

      raysRef.current.forEach((ray, index) => {
        const data = ray.rayData;
        
        // Mouse influence (improved for mobile responsiveness)
        const isMobile = window.innerWidth <= 768;
        const mouseDistance = Math.sqrt(mouseRef.current.x ** 2 + mouseRef.current.y ** 2);
        const distanceMultiplier = isMobile ? 0.5 : 0.8; // More sensitive on mobile
        const mouseInfluenceStrength = Math.max(0, 1 - mouseDistance * distanceMultiplier) * mouseInfluence;
        
        // Add continuous organic movement to base angle
        const organicMovement = Math.sin(elapsed * 0.2 + index * 0.3) * 15 + Math.cos(elapsed * 0.15 + index * 0.5) * 8;
        const animatedBaseAngle = data.baseAngle + organicMovement;
        
        // Calculate proper angle to point toward cursor position
        const angleToMouse = Math.atan2(mouseRef.current.y, mouseRef.current.x) * (180 / Math.PI);
        // Blend animated base angle with mouse direction based on influence strength
        const targetAngle = animatedBaseAngle * (1 - mouseInfluenceStrength) + angleToMouse * mouseInfluenceStrength;
        
        // Much slower rotation animation
        const currentTransform = ray.style.transform;
        const currentAngle = parseFloat(currentTransform.match(/rotate\(([^)]+)deg\)/)?.[1] || data.baseAngle);
        const newAngle = gsap.utils.interpolate(currentAngle, targetAngle, 0.02); // Increased from 0.005 to 0.02 for faster response
        
        // Enhanced pulsing effect with multiple wave layers
        const primaryPulse = Math.sin(elapsed * raySpeed * 0.3 + data.pulseOffset) * 0.1;
        const secondaryPulse = Math.cos(elapsed * raySpeed * 0.5 + index * 0.8) * 0.05;
        const pulseIntensity = 0.9 + primaryPulse + secondaryPulse;
        const opacity = data.baseOpacity * pulseIntensity * (1 + mouseInfluenceStrength * 0.2);
        
        // Dynamic length variation with organic movement
        const primaryLength = Math.sin(elapsed * raySpeed * 0.15 + index * 0.03) * 0.08;
        const organicLength = Math.cos(elapsed * 0.1 + index * 0.2) * 0.06;
        const lengthMultiplier = 1 + primaryLength + organicLength;
        const newHeight = data.baseDistance * lengthMultiplier * (1 + mouseInfluenceStrength * 0.1);
        
        // Add subtle width variation for more organic feel
        const widthVariation = 1 + Math.sin(elapsed * 0.3 + index * 0.4) * 0.3;
        const dynamicWidth = (rayWidth + Math.random() * 0.5) * widthVariation;
        
        // Apply transformations with dynamic properties
        gsap.set(ray, {
          transform: `translate(-50%, 0) rotate(${newAngle}deg)`,
          opacity: Math.max(0, Math.min(1, opacity)),
          height: `${newHeight}px`,
          width: `${dynamicWidth}px`,
          duration: 0.1,
          ease: "none"
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Event listeners for both mouse and touch
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [rayCount, rayLength, rayWidth, rayOpacity, raySpeed, mouseInfluence, colors]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{
        background: 'radial-gradient(ellipse at top center, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.02) 40%, transparent 70%)',
        willChange: 'transform'
      }}
    />
  );
};

export default GSAPRayBackground;