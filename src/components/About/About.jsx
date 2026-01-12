import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHistory, FaEye, FaAward, FaChartLine } from 'react-icons/fa';
import { fadeInUp, staggerContainer, scaleIn } from '../../animations';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const timelineData = [
    { year: '1986', event: 'Founded in Dubai', icon: <FaHistory /> },
    { year: '2009', event: 'Launched in Qatar', icon: <FaChartLine /> },
    { year: '2023', event: 'Arabian Property Awards', icon: <FaAward /> },
    { year: '2026', event: 'Launching in Lebanon', icon: <FaEye />, highlight: true }
  ];

  return (
    <section className="about section-padding" id="about">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>About Us</h2>
          <p>Building on decades of regional excellence</p>
        </motion.div>

        <div className="about-content" ref={ref}>
          {/* Left Column - Text */}
          <motion.div 
            className="about-text"
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3 variants={fadeInUp}>
              Regional Excellence, Lebanese Precision
            </motion.h3>
            
            <motion.p variants={fadeInUp}>
              Betterhomes Lebanon is part of a well-established regional group with a strong presence 
              across Qatar, the UAE, and Saudi Arabia. Building on this regional experience, we focus 
              exclusively on Property Management (PM) and Facilities Management (FM), delivering 
              institutional standards tailored to the Lebanese market.
            </motion.p>
            
            <motion.p variants={fadeInUp}>
              Our role is to act as a neutral, professional party responsible for the day-to-day 
              management and protection of real estate assets, ensuring clarity, accountability, 
              and long-term value for owners and occupiers.
            </motion.p>

            {/* Vision Card */}
            <motion.div 
              className="vision-card"
              variants={scaleIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="vision-icon">
                <FaEye />
              </div>
              <div>
                <h4>Our Vision</h4>
                <p>
                  To become the most trusted Property and Facilities Management Partner in Lebanon, 
                  recognized for integrity, professional governance and reliable asset stewardship.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div 
            className="about-timeline"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h3>Our Journey</h3>
            
            <div className="timeline">
              {timelineData.map((item, index) => (
                <motion.div 
                  key={index}
                  className={`timeline-item ${item.highlight ? 'highlight' : ''}`}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="timeline-icon">
                    {item.icon}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-event">{item.event}</div>
                  </div>
                  {index < timelineData.length - 1 && (
                    <div className="timeline-connector" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          className="about-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { value: '30+', label: 'Years Experience', suffix: '' },
            { value: '4', label: 'Countries', suffix: '' },
            { value: '50', label: 'Premium Properties', suffix: '+' },
            { value: '2', label: 'Major Banks', suffix: '' },
            { value: '100', label: 'Client', suffix: '%' }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              whileHover={{ 
                scale: 1.1,
                backgroundColor: 'rgba(212, 175, 55, 0.1)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="stat-value"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ 
                  delay: 0.6 + index * 0.1,
                  type: 'spring',
                  stiffness: 200
                }}
              >
                {stat.value}<span className="stat-suffix">{stat.suffix}</span>
              </motion.div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;