import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaArrowDown, FaPlay } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ scrollY }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Start animations
    const sequence = async () => {
      await textControls.start({ opacity: 1, y: 0 });
      await buttonControls.start({ opacity: 1, y: 0 });
      await controls.start({
        y: [0, -10, 0],
        transition: { repeat: Infinity, duration: 2 }
      });
    };

    sequence();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [controls, textControls, buttonControls]);

  const handleWatchVideo = () => {
    // In a real app, this would open a video modal
    console.log('Opening video...');
  };

  return (
    <section className="hero" id="home">
      {/* Animated Background */}
      <div className="hero-bg">
        <div 
          className="parallax-bg"
          style={{
            transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`
          }}
        />
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ 
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="hero-content">
          {/* Badge */}
          <motion.div 
            className="coming-soon-badge"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <span className="badge-text">Coming Soon in Lebanon</span>
            <motion.span 
              className="badge-year"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              2026
            </motion.span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            className="hero-title-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={textControls}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              {/* Betterhomes */}
              <motion.span 
                className="hero-title-highlight"
                animate={{ 
                  color: ['#d4af37', '#f4e8c1', '#d4af37']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Betterhomes <br />
                Lebanon
              </motion.span>
            </h1>
            
            <motion.div 
              className="title-line"
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={textControls}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Professional Property & Facilities Management – 
            <motion.span 
              className="highlight-text"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Rooted in Regional Excellence
            </motion.span>
          </motion.p>

          {/* Stats */}
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { value: '30+', label: 'Years Experience' },
              { value: '4', label: 'Countries' },
              { value: '50+', label: 'Properties Managed' },
              { value: '100%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-item"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.h3 
                  className="stat-value"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                >
                  {stat.value}
                </motion.h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={buttonControls}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link to="contact" smooth={true} duration={500} offset={-80}>
              <motion.button 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Waiting List
                <motion.span 
                  className="btn-icon"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
            
            <motion.button 
              className="btn btn-secondary"
              onClick={handleWatchVideo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlay className="play-icon" />
              Watch Our Story
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="scroll-indicator"
            animate={controls}
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Scroll to explore</span>
            <FaArrowDown className="scroll-arrow" />
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="floating-element-1"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🏢
      </motion.div>
      
      <motion.div 
        className="floating-element-2"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        🔑
      </motion.div>
      
      <motion.div 
        className="floating-element-3"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0]
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
      >
        ⭐
      </motion.div>
    </section>
  );
};

export default Hero;