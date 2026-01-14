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
  FaCheckCircle
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
      setIsDesktop(window.innerWidth >= 701);
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
                <span
                  key={region}
                  className={`region-tag ${region.includes('Lebanon') ? 'highlight' : ''}`}
                >
                  <FaMapMarkerAlt /> {region}
                </span>
              ))}
            </div>
          </div>

          {/* ========== DESKTOP CAROUSEL (700px+) ========== */}
          {isDesktop && (
            <div 
              className="partners-carousel-container"
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <div className="carousel-header">
                <h3>Our Portfolio Partners</h3>
                <p>Trusted by leading institutions</p>
              </div>
              
              <div className="carousel-controls">
                <button 
                  className="carousel-btn prev"
                  onClick={prevSlide}
                >
                  <FaChevronLeft />
                </button>
                
                <div className="partners-carousel">
                  {partnersData.map((partner, index) => (
                    <div
                      key={partner.id}
                      className={`partner-card carousel-card ${index === currentSlide ? 'active' : ''}`}
                      style={{
                        transform: `translateX(${(index - currentSlide) * 100 - 50}%) scale(${index === currentSlide ? 1 : 0.8})`,
                        opacity: Math.abs(index - currentSlide) > 1 ? 0 : 1
                      }}
                    >
                      <div className="partner-icon">
                        {getIcon(partner.id)}
                      </div>
                      <h4>{partner.name}</h4>
                      <p className="partner-type">{partner.type}</p>
                      <p className="partner-desc">{partner.description}</p>
                      
                      {index === currentSlide && (
                        <div className="active-indicator">
                          <FaCheckCircle />
                        </div>
                      )}
                    </div>
                  ))}
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
          )}

          {/* ========== MOBILE CARDS (0-700px) ========== */}
          {!isDesktop && (
            <div className="partners-section">
              <div className="partners-header">
                <h3>Our Portfolio Partners</h3>
                <p>Trusted by leading institutions</p>
              </div>
              
              <div className="mobile-cards">
                {partnersData.map((partner) => (
                  <div key={partner.id} className="partner-card mobile-card">
                    <div className="partner-icon">
                      {getIcon(partner.id)}
                    </div>
                    <h4>{partner.name}</h4>
                    <p className="partner-type">{partner.type}</p>
                    <p className="partner-desc">{partner.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Timeline */}
          <div className="achievements">
            <h3>Key Achievements</h3>
            
            <div className="achievements-timeline">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <div className="achievement-year">{achievement.year}</div>
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                  {index < achievements.length - 1 && (
                    <div className="timeline-connector" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Showcase */}
          <div className="portfolio-showcase">
            <h3>Premium Portfolio</h3>
            <p>Luxury developments managed by Betterhomes</p>
            
            <div className="portfolio-grid">
              {portfolioItems.map((item, index) => (
                <div key={index} className="portfolio-item">
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
                    ✓ Successfully Launched
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coming to Lebanon */}
          <div className="coming-to-lebanon">
            <div className="coming-content">
              <h3>Coming Soon to Lebanon</h3>
              <p>
                Building on our GCC success, we're bringing the same institutional standards, 
                professional governance, and regional expertise to Lebanon's real estate market in 2026.
              </p>
              
              <div className="countdown">
                <div className="countdown-item">
                  <div className="countdown-value">2026</div>
                  <div className="countdown-label">Launch Year</div>
                </div>
                
                <div className="countdown-progress">
                  {/* <div className="progress-text">75% Prepared</div> */}
                </div>
              </div>
            </div>
            
            <div className="coming-visual">
              🇱🇧
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;