import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaGlobe, 
  FaBalanceScale, 
  FaChartLine, 
  FaShieldAlt, 
  FaAward,
  FaUsers,
  FaCheckCircle,
  FaStar
} from 'react-icons/fa';
import { benefitsData } from '../../data/constants';
import { fadeInUp, staggerContainer, scaleIn } from '../../animations';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const principles = [
    {
      title: "Clear Accountability",
      description: "Single point of responsibility through structured approval thresholds and regular reporting",
      icon: <FaCheckCircle />
    },
    {
      title: "Performance Driven",
      description: "Agreed service levels with measurable performance indicators at all stages",
      icon: <FaChartLine />
    },
    {
      title: "Transparent Engagement",
      description: "Trial periods allow service quality to demonstrate value before long-term commitments",
      icon: <FaBalanceScale />
    }
  ];

  return (
    <section className="why-choose-us section-padding" id="why-us">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Choose Betterhomes</h2>
          <p>What sets us apart in property management</p>
        </motion.div>

        <div className="why-content" ref={ref}>
          {/* Benefits Grid */}
          <motion.div 
            className="benefits-grid"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {benefitsData.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                className="benefit-card"
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="benefit-icon-wrapper"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    delay: index * 0.5
                  }}
                >
                  <div className="benefit-icon">
                    {benefit.icon}
                  </div>
                  <div className="benefit-icon-bg" />
                </motion.div>
                
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
                
                <motion.div 
                  className="benefit-hover-content"
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="benefit-stats">
                    <span>✓ Proven Results</span>
                    <span>✓ Client Approved</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* How We Work Section */}
          <motion.div 
            className="how-we-work"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3>How We Work</h3>
            
            <div className="work-process">
              {[
                { step: 1, title: "Define Scope", desc: "Clearly defined services and objectives" },
                { step: 2, title: "Set Metrics", desc: "Agreed service levels and KPIs" },
                { step: 3, title: "Implement", desc: "Structured processes and approvals" },
                { step: 4, title: "Report", desc: "Regular transparent reporting" },
                { step: 5, title: "Optimize", desc: "Continuous improvement based on results" }
              ].map((process, index) => (
                <motion.div 
                  key={index}
                  className="process-step"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className="step-number">
                    {process.step}
                  </div>
                  <div className="step-content">
                    <h4>{process.title}</h4>
                    <p>{process.desc}</p>
                  </div>
                  {index < 4 && (
                    <motion.div 
                      className="process-connector"
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 * index }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Principles */}
          <motion.div 
            className="principles"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h3>Our Core Principles</h3>
            
            <div className="principles-grid">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  className="principle-card"
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(212, 175, 55, 0.05)'
                  }}
                >
                  <div className="principle-icon">
                    {principle.icon}
                    <motion.div 
                      className="principle-icon-glow"
                      animate={{ 
                        boxShadow: [
                          '0 0 0px rgba(212, 175, 55, 0.3)',
                          '0 0 20px rgba(212, 175, 55, 0.6)',
                          '0 0 0px rgba(212, 175, 55, 0.3)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <h4>{principle.title}</h4>
                  <p>{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Client Types */}
          <motion.div 
            className="client-types"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>Who We Serve</h3>
            
            <div className="client-grid">
              {[
                { type: "Residential", icon: "🏢", count: "100+ Buildings" },
                { type: "Commercial", icon: "🏬", count: "50+ Offices" },
                { type: "Mixed-Use", icon: "🏪", count: "30+ Developments" },
                { type: "Institutional", icon: "🏛️", count: "Major Banks" }
              ].map((client, index) => (
                <motion.div
                  key={index}
                  className="client-card"
                  whileHover={{ 
                    y: -5,
                    rotateY: 10
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className="client-icon">{client.icon}</div>
                  <h4>{client.type}</h4>
                  <p>{client.count}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;