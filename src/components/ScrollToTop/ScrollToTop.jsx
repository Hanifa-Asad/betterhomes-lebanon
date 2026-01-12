import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      // Calculate scroll progress
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = docHeight - winHeight;
      const progress = Math.floor((scrollTop / trackLength) * 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="scroll-to-top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Progress Ring */}
          <motion.div 
            className="progress-ring"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (scrollProgress * 283) / 100 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="60" height="60" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (scrollProgress * 283) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
          </motion.div>

          {/* Scroll Button */}
          <motion.button
            className="scroll-btn"
            onClick={scrollToTop}
            whileHover={{ 
              scale: 1.1,
              rotate: 360
            }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>

          {/* Progress Text */}
          <motion.div 
            className="progress-text"
            animate={{ 
              scale: [1, 1.2, 1],
              color: ['#999', 'var(--gold)', '#999']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {scrollProgress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;