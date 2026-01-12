import { useState, useEffect } from 'react';

const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * (1 - threshold) && elementBottom > 0) {
          if (!element.classList.contains('animated')) {
            element.classList.add('animated');
            
            // Add different animation classes based on data-animation attribute
            const animationType = element.getAttribute('data-animation') || 'fade-up';
            element.classList.add(`animate-${animationType}`);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { isVisible, hasAnimated };
};

export default useScrollAnimation;