import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm, ValidationError } from '@formspree/react';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGlobe,
  FaPaperPlane,
  FaCheckCircle,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';
import { fadeInUp, staggerContainer, scaleIn } from '../../animations';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  });
  
  // ✅ FIXED: Use just the form ID, NOT the full URL
  const [state, handleSubmitFormspree] = useForm("mbddjgpv");
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const propertyTypes = [
    'Residential Building',
    'Commercial Property',
    'Mixed-Use Development',
    'Office Building',
    'Institutional Property',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ FIXED: Simplified submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitFormspree(e);
    
    // Reset form if successful
    if (state.succeeded) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        message: ''
      });
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Coming Soon',
      details: ['Lebanon (2026)', 'Regional Presence: Qatar, UAE, KSA']
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Us',
      details: ['info@betterhomes-lebanon.com', 'partnerships@betterhomes.com']
    },
    {
      icon: <FaGlobe />,
      title: 'Regional Offices',
      details: ['Qatar (2009)', 'UAE (1986)', 'Saudi Arabia (2025)']
    }
  ];

  const socialMedia = [
    { icon: <FaFacebook />, name: 'Facebook', url: '#' },
    { icon: <FaLinkedin />, name: 'LinkedIn', url: '#' },
    { icon: <FaInstagram />, name: 'Instagram', url: '#' },
    { icon: <FaYoutube />, name: 'YouTube', url: '#' }
  ];

  return (
    <section className="contact section-padding" id="contact">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Get In Touch</h2>
          <p>Join our waiting list for the Lebanon launch</p>
        </motion.div>

        <div className="contact-content" ref={ref}>
          {/* Left Side - Contact Info */}
          <motion.div 
            className="contact-info"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div 
              className="contact-intro"
              variants={fadeInUp}
            >
              <h3>Betterhomes Lebanon</h3>
              <p>
                Launching soon with the same commitment to excellence that has made us a leader 
                in Qatar and the Gulf region. Join our waiting list to be among the first to 
                experience institutional-grade property management in Lebanon.
              </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="contact-card"
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                >
                  <div className="contact-card-icon">
                    {info.icon}
                  </div>
                  <h4>{info.title}</h4>
                  <div className="contact-details">
                    {info.details.map((detail, i) => (
                      <p key={i}>{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div 
              className="social-media"
              variants={fadeInUp}
            >
              <h4>Follow Our Journey</h4>
              <div className="social-icons">
                {socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="social-icon"
                    whileHover={{ 
                      scale: 1.2,
                      y: -5,
                      backgroundColor: 'var(--gold)',
                      color: 'var(--primary-blue)'
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                  >
                    {social.icon}
                    <span className="tooltip">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Launch Countdown */}
            <motion.div 
              className="launch-countdown"
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
            >
              <div className="countdown-header">
                <FaCheckCircle />
                <h4>Launch Progress</h4>
              </div>
              <div className="progress-bar">
                <motion.div 
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 2, delay: 0.5 }}
                >
                  {/* <span className="progress-text">75% Complete</span> */}
                </motion.div>
              </div>
              <p className="countdown-text">Target Launch: Q1 2026</p>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div 
            className="contact-form-container"
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="form-header">
              <h3>Join Our Waiting List</h3>
              <p>Be the first to know when we launch in Lebanon</p>
            </div>

            {/* ✅ FIXED: Removed action attribute - Formspree handles it */}
            <form 
              className="contact-form" 
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="form-input"
                />
                <ValidationError 
                  prefix="Name" 
                  field="name"
                  errors={state.errors}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="form-input"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+961 XX XXX XXX"
                    className="form-input"
                  />
                  <ValidationError 
                    prefix="Phone" 
                    field="phone"
                    errors={state.errors}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="propertyType">Property Type</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Property Type</option>
                  {propertyTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                <ValidationError 
                  prefix="PropertyType" 
                  field="propertyType"
                  errors={state.errors}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your property management needs..."
                  className="form-textarea"
                  rows="4"
                />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                />
              </div>

              {/* ✅ ADDED: Hidden fields for Formspree */}
              <input type="hidden" name="_subject" value="BetterHomes Lebanon - Waiting List Request" />
              <input type="text" name="_gotcha" style={{ display: 'none' }} />

              <div className="form-options">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="updates" 
                    required 
                  />
                  <span>I agree to receive updates about Betterhomes Lebanon</span>
                </label>
                
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="privacy" 
                    required 
                  />
                  <span>I have read and agree to the privacy policy</span>
                </label>
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={state.submitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={state.submitting ? { scale: [1, 1.1, 1] } : {}}
                transition={state.submitting ? { duration: 1, repeat: Infinity } : {}}
              >
                {state.submitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Join Waiting List
                    <FaPaperPlane className="send-icon" />
                  </>
                )}
              </motion.button>

              {/* Submit Status Messages */}
              <AnimatePresence>
                {state.succeeded && (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FaCheckCircle />
                    Thank you! You've been added to our waiting list. We'll contact you soon.
                  </motion.div>
                )}

                {state.errors && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Something went wrong. Please try again or contact us directly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Form Footer */}
            <div className="form-footer">
              <p>
                <strong>Privacy Notice:</strong> We respect your privacy. Your information will only 
                be used to notify you about Betterhomes Lebanon's launch and will never be shared 
                with third parties.
              </p>
              
              <div className="form-stats">
                <div className="stat">
                  <span className="stat-number">150+</span>
                  <span className="stat-label">Already Joined</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24h</span>
                  <span className="stat-label">Response Time</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;