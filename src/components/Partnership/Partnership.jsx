import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaUniversity, 
  FaLandmark, 
  FaGem, 
  FaBuilding,
  FaAward,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaCheckCircle
} from 'react-icons/fa';
import { partnersData } from '../../data/constants';
import { fadeInUp, staggerContainer, scaleIn } from '../../animations';
import './Partnership.css';

const Partnership = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const achievements = [
    { year: "2017", title: "CBQ Portfolio", description: "Selected to manage Qatar's largest bank portfolio", icon: <FaUniversity /> },
    { year: "2019", title: "QIB Partnership", description: "Trusted with Qatar's largest Islamic bank properties", icon: <FaLandmark /> },
    { year: "2023", title: "Arabian Property Awards", description: "Recognized for excellence in real estate services", icon: <FaAward /> },
    { year: "2024", title: "Flagship Office", description: "Expanded with new flagship office in Burj Al Mana", icon: <FaBuilding /> }
  ];

  const portfolioItems = [
    { name: "Viva Bahriya Tower 20", location: "The Pearl, Qatar", type: "Luxury Residential", year: "2017" },
    { name: "Viva Bahriya Tower 3", location: "The Pearl, Qatar", type: "Luxury Residential", year: "2019" },
    { name: "Viva Bahriya Tower 4", location: "The Pearl, Qatar", type: "Luxury Residential", year: "2019" },
    { name: "Viva Bahriya Tower 21", location: "The Pearl, Qatar", type: "Luxury Residential", year: "2018" },
    { name: "Viva Bahriya Tower 24", location: "The Pearl, Qatar", type: "Luxury Residential", year: "2022" }
  ];

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % portfolioItems.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoplay, portfolioItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioItems.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  return (
    <section className="partnership section-padding" id="partnership">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Regional Partnership</h2>
          <p>Building on success across the GCC region</p>
        </motion.div>

        <div className="partnership-content" ref={ref}>
          {/* Partnership Intro */}
          <motion.div 
            className="partnership-intro"
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h3>Proven Success in Qatar</h3>
            <p>
              Betterhomes has been selected to manage prestigious property portfolios including CBQ 
              (Qatar's largest bank) and QIB (Qatar's largest Islamic bank), with successful launches 
              at Viva Bahriya Towers in The Pearl, Qatar.
            </p>
            
            <motion.div 
              className="region-tags"
              variants={staggerContainer}
            >
              {['Qatar', 'UAE', 'Saudi Arabia', 'Lebanon (2026)'].map((region, index) => (
                <motion.span
                  key={region}
                  className={`region-tag ${region.includes('Lebanon') ? 'highlight' : ''}`}
                  variants={scaleIn}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <FaMapMarkerAlt /> {region}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Partners Carousel */}
          <motion.div 
            className="partners-carousel-container"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div className="carousel-header">
              <h3>Our Portfolio Partners</h3>
              <p>Trusted by leading institutions</p>
            </div>
            
            <div className="carousel-controls">
              <motion.button 
                className="carousel-btn prev"
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronLeft />
              </motion.button>
              
              <div className="partners-carousel">
                {partnersData.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    className={`partner-card ${index === currentSlide ? 'active' : ''}`}
                    variants={fadeInUp}
                    initial={false}
                    animate={{
                      x: (index - currentSlide) * 100 - 50,
                      scale: index === currentSlide ? 1 : 0.8,
                      opacity: Math.abs(index - currentSlide) > 1 ? 0 : 1
                    }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -10 }}
                  >
                    <motion.div 
                      className="partner-icon"
                      animate={index === currentSlide ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {partner.id === 1 && <FaUniversity />}
                      {partner.id === 2 && <FaLandmark />}
                      {partner.id === 3 && <FaGem />}
                      {partner.id === 4 && <FaBuilding />}
                    </motion.div>
                    <h4>{partner.name}</h4>
                    <p className="partner-type">{partner.type}</p>
                    <p className="partner-desc">{partner.description}</p>
                    
                    {index === currentSlide && (
                      <motion.div 
                        className="active-indicator"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <FaCheckCircle />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <motion.button 
                className="carousel-btn next"
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronRight />
              </motion.button>
            </div>
            
            <div className="carousel-dots">
              {portfolioItems.map((_, index) => (
                <motion.button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentSlide(index);
                    setAutoplay(false);
                    setTimeout(() => setAutoplay(true), 5000);
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Achievements Timeline */}
          <motion.div 
            className="achievements"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Key Achievements</h3>
            
            <div className="achievements-timeline">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="achievement-item"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="achievement-year">{achievement.year}</div>
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                  {index < achievements.length - 1 && (
                    <motion.div 
                      className="timeline-connector"
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Portfolio Showcase */}
          <motion.div 
            className="portfolio-showcase"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h3>Premium Portfolio</h3>
            <p>Luxury developments managed by Betterhomes</p>
            
            <div className="portfolio-grid">
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="portfolio-item"
                  variants={scaleIn}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                >
                  <div className="portfolio-header">
                    <FaBuilding className="portfolio-icon" />
                    <div className="portfolio-badge">{item.year}</div>
                  </div>
                  <h4>{item.name}</h4>
                  <div className="portfolio-details">
                    <p><FaMapMarkerAlt /> {item.location}</p>
                    <p><FaCalendarAlt /> {item.type}</p>
                  </div>
                  <motion.div 
                    className="portfolio-status"
                    animate={{ 
                      backgroundColor: ['#e8f5e9', '#c8e6c9', '#e8f5e9']
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ✓ Successfully Launched
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Coming to Lebanon */}
          <motion.div 
            className="coming-to-lebanon"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="coming-content">
              <h3>Coming Soon to Lebanon</h3>
              <p>
                Building on our GCC success, we're bringing the same institutional standards, 
                professional governance, and regional expertise to Lebanon's real estate market in 2026.
              </p>
              
              <motion.div 
                className="countdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="countdown-item">
                  <div className="countdown-value">2026</div>
                  <div className="countdown-label">Launch Year</div>
                </div>
                
                <motion.div 
                  className="countdown-progress"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 2, delay: 0.8 }}
                >
                  <div className="progress-text">75% Prepared</div>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div 
              className="coming-visual"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🇱🇧
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;