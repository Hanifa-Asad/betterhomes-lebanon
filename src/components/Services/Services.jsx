import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Services.css';

// Import ALL necessary icons - fix the undefined FaArrowRight error
import { 
  FaBuilding, 
  FaTools, 
  FaHandshake,
  FaChartLine, 
  FaUsers, 
  FaFileContract, 
  FaCogs, 
  FaShieldAlt,
  FaLightbulb, 
  FaClipboardCheck, 
  FaMoneyBillWave, 
  FaHeadset,
  FaChevronRight, 
  FaArrowRight  // This was missing!
} from 'react-icons/fa';

// Define animations - fix the undefined staggerContainer and fadeInUp errors
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
};

const slideInUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('property');
  const [activeDetail, setActiveDetail] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Memoize service tabs data - fix the undefined serviceTabs error
  const serviceTabs = useMemo(() => [
    {
      id: 'property',
      title: 'Property Management',
      icon: <FaBuilding />,
      color: '#1a365d',
      description: 'Comprehensive oversight for residential and commercial properties'
    },
    {
      id: 'facilities',
      title: 'Facilities Management',
      icon: <FaTools />,
      color: '#d4af37',
      description: 'Professional supervision of building operations and maintenance'
    },
    {
      id: 'institutional',
      title: 'Institutional Services',
      icon: <FaHandshake />,
      color: '#0a2540',
      description: 'Tailored solutions for banks and large property portfolios'
    }
  ], []);

  // Memoize service details data
  const serviceDetails = useMemo(() => ({
    property: [
      {
        icon: <FaChartLine />,
        title: 'Financial Management',
        description: 'Budget planning, financial reporting, and cost optimization',
        features: [
          'Annual budget preparation',
          'Quarterly financial reports',
          'Vendor payment processing',
          'Expense tracking & analysis'
        ]
      },
      {
        icon: <FaUsers />,
        title: 'Owner Representation',
        description: 'Acting as the single point of contact for all stakeholders',
        features: [
          'Syndicate meeting coordination',
          'Owner communication portal',
          'Decision-making facilitation',
          'Conflict resolution'
        ]
      },
      {
        icon: <FaFileContract />,
        title: 'Legal & Administrative',
        description: 'Handling all legal documentation and compliance requirements',
        features: [
          'Contract management',
          'Regulatory compliance',
          'Document archiving',
          'Meeting minutes'
        ]
      }
    ],
    facilities: [
      {
        icon: <FaCogs />,
        title: 'Maintenance Supervision',
        description: 'Overseeing all technical aspects and preventive maintenance',
        features: [
          'Preventive maintenance schedules',
          'Emergency response coordination',
          'Technical assessment',
          'Quality control inspections'
        ]
      },
      {
        icon: <FaShieldAlt />,
        title: 'Safety & Compliance',
        description: 'Ensuring building safety standards and regulatory compliance',
        features: [
          'Safety audits',
          'Fire system maintenance',
          'Health & safety training',
          'Compliance documentation'
        ]
      },
      {
        icon: <FaLightbulb />,
        title: 'Energy Management',
        description: 'Optimizing energy consumption and sustainability initiatives',
        features: [
          'Energy audits',
          'Utility monitoring',
          'Sustainability planning',
          'Cost reduction strategies'
        ]
      }
    ],
    institutional: [
      {
        icon: <FaClipboardCheck />,
        title: 'Portfolio Management',
        description: 'Comprehensive oversight of large property portfolios',
        features: [
          'Portfolio performance analysis',
          'Asset value optimization',
          'Risk assessment',
          'Strategic planning'
        ]
      },
      {
        icon: <FaMoneyBillWave />,
        title: 'Financial Reporting',
        description: 'Detailed financial insights for institutional stakeholders',
        features: [
          'Custom financial reports',
          'ROI analysis',
          'Cash flow management',
          'Investment tracking'
        ]
      },
      {
        icon: <FaHeadset />,
        title: 'Dedicated Account Management',
        description: 'Personalized service with dedicated relationship managers',
        features: [
          '24/7 priority support',
          'Regular strategy meetings',
          'Custom service level agreements',
          'Executive reporting'
        ]
      }
    ]
  }), []);

  // Memoize process steps - fix the undefined processSteps error
  const processSteps = useMemo(() => [
    {
      number: '01',
      title: 'Assessment',
      description: 'We conduct a thorough analysis of your property needs and requirements'
    },
    {
      number: '02',
      title: 'Planning',
      description: 'Developing a customized management strategy tailored to your goals'
    },
    {
      number: '03',
      title: 'Implementation',
      description: 'Executing the plan with our team of certified professionals'
    },
    {
      number: '04',
      title: 'Monitoring',
      description: 'Continuous oversight and regular reporting on all aspects'
    },
    {
      number: '05',
      title: 'Optimization',
      description: 'Regular reviews and improvements to enhance performance'
    }
  ], []);

  // Memoize event handlers - fix the undefined handleTabChange error
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    setActiveDetail(0);
  }, []);

  const handleDetailChange = useCallback((index) => {
    setActiveDetail(index);
  }, []);

  // Get current service details
  const currentServiceDetails = useMemo(() => 
    serviceDetails[activeTab] || [],
    [activeTab, serviceDetails]
  );

  // Get current detail
  const currentDetail = useMemo(() => 
    currentServiceDetails[activeDetail] || currentServiceDetails[0],
    [currentServiceDetails, activeDetail]
  );

  // Render only after mount to prevent SSR hydration issues
  if (!isMounted) {
    return (
      <section className="services section-padding" id="services">
        <div className="container">
          <div className="loading-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-tabs"></div>
            <div className="skeleton-content"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="services section-padding" id="services">
      <div className="container">
        {/* Section Title */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Professional Services</h2>
          <p>Comprehensive property and facilities management solutions tailored for Lebanon</p>
        </motion.div>

        {/* Service Tabs */}
        <motion.div 
          className="service-tabs-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="service-tabs">
            {serviceTabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`service-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  borderColor: activeTab === tab.id ? tab.color : 'transparent'
                }}
              >
                <div className="tab-icon" style={{ color: tab.color }}>
                  {tab.icon}
                </div>
                <div className="tab-content">
                  <h3>{tab.title}</h3>
                  <p>{tab.description}</p>
                </div>
                <motion.div 
                  className="tab-indicator"
                  animate={{ 
                    scale: activeTab === tab.id ? 1 : 0,
                    opacity: activeTab === tab.id ? 1 : 0
                  }}
                  style={{ backgroundColor: tab.color }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Service Details */}
        <motion.div 
          className="service-details-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="service-details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Detail Navigation */}
              <div className="detail-navigation">
                {currentServiceDetails.map((detail, index) => (
                  <motion.button
                    key={index}
                    className={`detail-nav-btn ${activeDetail === index ? 'active' : ''}`}
                    onClick={() => handleDetailChange(index)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FaChevronRight className="nav-arrow" />
                    <span>{detail.title}</span>
                  </motion.button>
                ))}
              </div>

              {/* Detail Content */}
              <div className="detail-content-wrapper">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDetail}
                    className="detail-content"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="detail-header">
                      <div className="detail-icon">
                        {currentDetail.icon}
                      </div>
                      <div>
                        <h3>{currentDetail.title}</h3>
                        <p className="detail-description">{currentDetail.description}</p>
                      </div>
                    </div>

                    <div className="detail-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {currentDetail.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <FaArrowRight className="feature-arrow" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Feature Cards */}
                    <div className="feature-cards">
                      <motion.div 
                        className="feature-card"
                        whileHover={{ y: -5 }}
                        variants={scaleIn}
                      >
                        <div className="card-icon">✓</div>
                        <h5>Transparent Reporting</h5>
                        <p>Regular detailed reports on all activities and expenditures</p>
                      </motion.div>

                      <motion.div 
                        className="feature-card"
                        whileHover={{ y: -5 }}
                        variants={scaleIn}
                      >
                        <div className="card-icon">⚡</div>
                        <h5>Quick Response</h5>
                        <p>24/7 support for emergencies and urgent matters</p>
                      </motion.div>

                      <motion.div 
                        className="feature-card"
                        whileHover={{ y: -5 }}
                        variants={scaleIn}
                      >
                        <div className="card-icon">📊</div>
                        <h5>Cost Savings</h5>
                        <p>Proven track record of reducing operational costs</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Our Process */}
        <motion.div 
          className="our-process"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Our 5-Step Management Process</h3>
          <p className="process-subtitle">A structured approach to ensure excellence in every aspect</p>

          <div className="process-steps">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="process-step"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <motion.div 
                    className="step-connector"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="services-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-content">
            <h3>Ready to Experience Professional Property Management?</h3>
            <p>
              Join our waiting list to be among the first to benefit from our institutional-grade 
              services when we launch in Lebanon in 2026.
            </p>
            <motion.a
              href="#contact"
              className="cta-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Waiting List
              <FaArrowRight className="btn-arrow" />
            </motion.a>
          </div>
          <motion.div 
            className="cta-decoration"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🏢
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Services);