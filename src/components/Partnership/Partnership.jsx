import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  FaCheckCircle,
  FaChartLine,
  FaShieldAlt,
  
  FaGlobe,
  
  FaRocket
} from 'react-icons/fa';
import { partnersData } from '../../data/constants';
import './Partnership.css';

const Partnership = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-play only for desktop carousel
  useEffect(() => {
    if (!isDesktop) return;
    
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % partnersData.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoplay, isDesktop, partnersData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % partnersData.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + partnersData.length) % partnersData.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

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

  const getIcon = (id) => {
    switch(id) {
      case 1: return <FaUniversity />;
      case 2: return <FaLandmark />;
      case 3: return <FaGem />;
      case 4: return <FaBuilding />;
      default: return <FaBuilding />;
    }
  };

  return (
    <section className="partnership section-padding" id="partnership">
      <div className="container">
        <div className="section-title">
          <h2>Regional Partnership</h2>
          <p>Building on success across the GCC region</p>
        </div>

        <div className="partnership-content">
          {/* Partnership Intro */}
          <div className="partnership-intro">
            <h3>Proven Success in Qatar</h3>
            <p>
              Betterhomes has been selected to manage prestigious property portfolios including CBQ 
              (Qatar's largest bank) and QIB (Qatar's largest Islamic bank), with successful launches 
              at Viva Bahriya Towers in The Pearl, Qatar.
            </p>
            
            <div className="region-tags">
              {['Qatar', 'UAE', 'Saudi Arabia', 'Lebanon (2026)'].map((region, index) => (
                <motion.span
                  key={region}
                  className={`region-tag ${region.includes('Lebanon') ? 'highlight' : ''}`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaMapMarkerAlt /> {region}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ========== IMPROVED DESKTOP CAROUSEL ========== */}
          {isDesktop && (
            <motion.div 
              className="partners-carousel-container"
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="carousel-header">
                <h3>Our Portfolio Partners</h3>
                <p>Trusted by leading institutions</p>
              </div>
              
              <div className="carousel-wrapper">
                <div className="carousel-controls">
                  <button 
                    className="carousel-btn prev"
                    onClick={prevSlide}
                  >
                    <FaChevronLeft />
                  </button>
                  
                  <div className="partners-carousel">
                    <div className="carousel-track">
                      {partnersData.map((partner, index) => (
                        <motion.div
                          key={partner.id}
                          className={`partner-card carousel-card ${index === currentSlide ? 'active' : ''}`}
                          animate={{
                            scale: index === currentSlide ? 1 : 0.85,
                            opacity: index === currentSlide ? 1 : 0.7,
                            x: `${(index - currentSlide) * 105}%`
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="partner-icon">
                            {getIcon(partner.id)}
                          </div>
                          <h4>{partner.name}</h4>
                          <p className="partner-type">{partner.type}</p>
                          <p className="partner-desc">{partner.description}</p>
                          
                          {index === currentSlide && (
                            <motion.div 
                              className="active-indicator"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring" }}
                            >
                              <FaCheckCircle />
                              <span>Active Partner</span>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className="carousel-btn next"
                    onClick={nextSlide}
                  >
                    <FaChevronRight />
                  </button>
                </div>
                
                <div className="carousel-dots">
                  {partnersData.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentSlide(index);
                        setAutoplay(false);
                        setTimeout(() => setAutoplay(true), 5000);
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== MOBILE CARDS ========== */}
          {!isDesktop && (
            <motion.div 
              className="partners-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="partners-header">
                <h3>Our Portfolio Partners</h3>
                <p>Trusted by leading institutions</p>
              </div>
              
              <div className="mobile-cards">
                {partnersData.map((partner) => (
                  <motion.div 
                    key={partner.id} 
                    className="partner-card mobile-card"
                    whileHover={{ y: -10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="partner-icon">
                      {getIcon(partner.id)}
                    </div>
                    <h4>{partner.name}</h4>
                    <p className="partner-type">{partner.type}</p>
                    <p className="partner-desc">{partner.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Achievements Timeline */}
          <motion.div 
            className="achievements"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Key Achievements</h3>
            
            <div className="achievements-timeline">
              {achievements.map((achievement, index) => (
                <motion.div 
                  key={index} 
                  className="achievement-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="achievement-year">{achievement.year}</div>
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                  {index < achievements.length - 1 && (
                    <div className="timeline-connector" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Portfolio Showcase - In one line */}
          <motion.div 
            className="portfolio-showcase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3>Premium Portfolio</h3>
            <p>Luxury developments managed by Betterhomes</p>
            
            <div className="portfolio-container">
              <div className="portfolio-scroll">
                {portfolioItems.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="portfolio-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
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
                    <div className="portfolio-status">
                      <FaCheckCircle /> Successfully Launched
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Coming to Lebanon - Enhanced Clean Design */}
          <motion.div 
            className="coming-to-lebanon"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="coming-content">
              <div className="coming-badge">
                <FaRocket /> Launching Soon
              </div>
              <h3>Expanding to Lebanon in 2026</h3>
              <p className="coming-description">
                Building on our unparalleled GCC success, we're bringing institutional-grade property 
                management, professional governance, and regional expertise to Lebanon's real estate market.
              </p>
              
              <div className="launch-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <FaGlobe />
                  </div>
                  <div className="highlight-content">
                    <h4>Regional Expertise</h4>
                    <p>30+ years of GCC experience</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <FaShieldAlt />
                  </div>
                  <div className="highlight-content">
                    <h4>Professional Governance</h4>
                    <p>Institutional standards & compliance</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <FaChartLine />
                  </div>
                  <div className="highlight-content">
                    <h4>Proven Track Record</h4>
                    <p>50+ premium properties managed</p>
                  </div>
                </div>
              </div>
              
              <div className="launch-timeline">
                <div className="timeline-item">
                  <div className="timeline-year1">2026</div>
                  <div className="timeline-content">
                    <h4>Lebanon Launch</h4>
                    <p>Institutional-grade property management services</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;