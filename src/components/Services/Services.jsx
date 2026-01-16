import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Services.css';

// Import ALL necessary icons
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

  FaHeadset,
  FaChevronRight, 
  FaArrowRight,
  FaChartBar,
  FaBalanceScale
} from 'react-icons/fa';

// Define animations
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

const Services = () => {
  const [activeTab, setActiveTab] = useState('property');
  const [activeDetail, setActiveDetail] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Memoize service tabs data
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
        icon: <FaChartBar />,
        title: 'Strategic Portfolio Analysis',
        description: 'Comprehensive oversight and optimization of large property portfolios',
        features: [
          'Performance benchmarking & KPI tracking',
          'Asset value enhancement strategies',
          'Risk assessment & mitigation plans',
          'Market trend analysis & forecasting'
        ]
      },
      {
        icon: <FaBalanceScale />,
        title: 'Governance & Compliance',
        description: 'Structured governance frameworks for institutional stakeholders',
        features: [
          'Customized compliance frameworks',
          'Audit preparation & support',
          'Regulatory reporting automation',
          'Policy development & implementation'
        ]
      },
      {
        icon: <FaHeadset />,
        title: 'Executive Account Management',
        description: 'Dedicated senior-level support for institutional clients',
        features: [
          'Dedicated relationship manager',
          '24/7 executive support line',
          'Quarterly strategy reviews',
          'Custom SLA development'
        ]
      }
    ]
  }), []);

  // Memoize process steps
  const processSteps = useMemo(() => [
    {
      number: '1',
      title: 'Assessment',
      description: 'Thorough analysis of property needs'
    },
    {
      number: '2',
      title: 'Planning',
      description: 'Customized management strategy'
    },
    {
      number: '3',
      title: 'Implementation',
      description: 'Execution by certified professionals'
    },
    {
      number: '4',
      title: 'Monitoring',
      description: 'Continuous oversight & reporting'
    },
    {
      number: '5',
      title: 'Optimization',
      description: 'Regular reviews & improvements'
    }
  ], []);

  // Memoize event handlers
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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

        {/* Service Details - Mobile first approach with sidebar on top */}
        <motion.div 
          className="service-details-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile Sidebar - Always on top */}
          <div className="mobile-sidebar">
            {currentServiceDetails.map((detail, index) => (
              <motion.button
                key={index}
                className={`mobile-detail-btn ${activeDetail === index ? 'active' : ''}`}
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

          {/* Desktop Sidebar */}
          <div className="desktop-sidebar">
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

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="service-details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
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
                      <div className="detail-title-section">
                        <h3>{currentDetail.title}</h3>
                        <p className="detail-description">{currentDetail.description}</p>
                      </div>
                    </div>

                    <div className="detail-features">
                      <h4>Key Features:</h4>
                      <div className="features-list">
                        {currentDetail.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            className="feature-item"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <div className="feature-check">
                              <FaArrowRight />
                            </div>
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
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
                        <p>Regular detailed reports on all activities</p>
                      </motion.div>

                      <motion.div 
                        className="feature-card"
                        whileHover={{ y: -5 }}
                        variants={scaleIn}
                      >
                        <div className="card-icon">⚡</div>
                        <h5>Quick Response</h5>
                        <p>24/7 support for emergencies</p>
                      </motion.div>

                      <motion.div 
                        className="feature-card"
                        whileHover={{ y: -5 }}
                        variants={scaleIn}
                      >
                        <div className="card-icon">📊</div>
                        <h5>Cost Savings</h5>
                        <p>Proven track record of reducing costs</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Our Process - 2 boxes per row, last centered */}
        <motion.div 
          className="our-process"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Our 5-Step Management Process</h3>
          <p className="process-subtitle">A structured approach to ensure excellence</p>

          <div className="process-steps-grid">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`process-step-card ${index === 4 ? 'last-step' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="step-number-wrapper">
                  <span className="step-number">{step.number}</span>
                </div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
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
              y: [0, -10, 0]
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