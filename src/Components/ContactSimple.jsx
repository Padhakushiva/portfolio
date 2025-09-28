import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactSimple = () => {
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const [animatedElements, setAnimatedElements] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Get EmailJS configuration from environment variables
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'CdaGaWQ48SxJ-BPUS';
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_5yp4pem';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_584h2ad';

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      console.log('Email sent successfully:', result.text);
      setSubmitMessage('✅ Message sent successfully! I\'ll get back to you soon.');
      formRef.current.reset();
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitMessage('❌ Failed to send message. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  // Smooth animation trigger - when form reaches 50% of viewport
  useEffect(() => {
    const contact = contactRef.current;
    if (!contact) return;

    const handleScroll = () => {
      const rect = contact.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Trigger when form top reaches 50% of viewport
      const triggerPoint = windowHeight * 0.5;
      
      if (rect.top <= triggerPoint) {
        // Smooth animation with moderate delays
        const animationElements = contact.querySelectorAll(
          '.smooth-section, .stagger-animation, .image-reveal'
        );
        
        animationElements.forEach((element, index) => {
          const elementId = element.dataset.animId || `anim-${index}`;
          element.dataset.animId = elementId;
          
          if (!animatedElements.has(elementId)) {
            // Moderate 60ms delays for smooth staggered effect
            setTimeout(() => {
              element.classList.add('visible', 'animate');
              setAnimatedElements(prev => new Set(prev).add(elementId));
            }, index * 60); // Smooth 60ms delays
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [animatedElements]);

  return (
    <div 
      ref={contactRef}
      className="w-full min-h-screen flex items-center justify-center p-6 relative"
    >
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Content with overlay */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        
        {/* Animated Gradient Line */}
        <div className="w-full flex justify-center mb-6">
          <div className="w-32 sm:w-48 md:w-64 lg:w-80 xl:w-96 h-[2px] section-divider opacity-0"
               style={{
                 background: 'linear-gradient(90deg, transparent 0%, #3b82f6 20%, #8b5cf6 50%, #ec4899 80%, transparent 100%)',
                 boxShadow: '0 0 15px rgba(59, 130, 246, 0.4), 0 2px 15px rgba(139, 92, 246, 0.2)'
               }}>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent hero-text-effect animate-gradient-projects bg-size-400">
          Get In Touch
        </h1>
        
        {/* Description */}
        <p className="text-white/90 text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-reveal">
          Contact me directly at{" "}
          <a 
            href="mailto:chaudharyshiva@gmail.com"
            className="font-semibold underline text-blue-400 hover:text-blue-300 transition-colors duration-300 text-reveal"
          >
            chaudharyshiva@gmail.com
          </a>{" "}
          or use the form below.
        </p>

        {/* Contact Form */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl pointer-events-auto">
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-gray-900/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-600/40 shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 space-y-6 smooth-section"
          >
            
            {/* Success/Error Message */}
            {submitMessage && (
              <div className={`p-4 rounded-lg text-center font-semibold ${
                submitMessage.includes('✅') 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {submitMessage}
              </div>
            )}
            
            {/* Name Field */}
            <div className="stagger-animation">
              <label className="block text-white font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">
                Name
              </label>
              <input 
                type="text"
                name="from_name"
                placeholder="Your name"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5
                           bg-white/95 text-gray-900 placeholder-gray-500 
                           border border-gray-300 rounded-lg sm:rounded-xl
                           text-base sm:text-lg md:text-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-300 hover:bg-white hover:shadow-md
                           focus:scale-[1.02] disabled:opacity-50"
              />
            </div>

            {/* Email Field */}
            <div className="stagger-animation">
              <label className="block text-white font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">
                Email
              </label>
              <input 
                type="email"
                name="from_email"
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5
                           bg-white/95 text-gray-900 placeholder-gray-500 
                           border border-gray-300 rounded-lg sm:rounded-xl
                           text-base sm:text-lg md:text-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-300 hover:bg-white hover:shadow-md
                           focus:scale-[1.02] disabled:opacity-50"
              />
            </div>

            {/* Message Field */}
            <div className="stagger-animation">
              <label className="block text-white font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">
                Message
              </label>
              <textarea 
                name="message"
                rows="4"
                placeholder="Your message..."
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5
                           bg-white/95 text-gray-900 placeholder-gray-500 
                           border border-gray-300 rounded-lg sm:rounded-xl resize-none
                           text-base sm:text-lg md:text-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-300 hover:bg-white hover:shadow-md
                           focus:scale-[1.02] sm:rows-5 md:rows-6 disabled:opacity-50"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4 image-reveal">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full bg-white hover:bg-gray-50 text-gray-900 font-bold 
                           py-4 px-6 sm:py-5 sm:px-8 md:py-6 md:px-10
                           rounded-lg sm:rounded-xl transition-all duration-300 
                           text-base sm:text-lg md:text-xl
                           hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50 
                           shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
              >
                <span className="flex items-center justify-center">
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  {!isSubmitting && (
                    <svg 
                      className="ml-3 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
                                 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 8l7.89 3.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                      />
                    </svg>
                  )}
                </span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSimple;