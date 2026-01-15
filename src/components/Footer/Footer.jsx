import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { 
  FaHome, 
  FaFacebook, 
  FaLinkedin, 
  FaInstagram, 
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowUp
} from 'react-icons/fa';
import { fadeInUp, staggerContainer } from '../../animations';
import './Footer.css';

const Footer = () => {
  const footerLinks = {
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Why Choose Us', href: '#why-us' },
      { label: 'Partnership', href: '#partnership' },
      { label: 'Contact', href: '#contact' }
    ],
    services: [
      { label: 'Property Management', href: '#services' },
      { label: 'Facilities Management', href: '#services' },
      { label: 'Portfolio Management', href: '#partnership' },
      { label: 'Institutional Services', href: '#services' }
    ],
    regions: [
      { label: 'Qatar (2009)', status: 'active' },
      { label: 'UAE (1986)', status: 'active' },
      { label: 'Saudi Arabia (2025)', status: 'active' },
      { label: 'Lebanon (2026)', status: 'coming' }
    ]
  };

  const socialMedia = [
    { icon: <FaFacebook />, label: 'Facebook', url: '#' },
    { icon: <FaLinkedin />, label: 'LinkedIn', url: '#' },
    { icon: <FaInstagram />, label: 'Instagram', url: '#' },
    { icon: <FaYoutube />, label: 'YouTube', url: '#' },
    { icon: <FaEnvelope />, label: 'Email', url: 'mailto:info@betterhomes-lebanon.com' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Footer Main Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Logo & About */}
            <motion.div 
              className="footer-about"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="footer-logo">
                <FaHome />
                <span>Better<span className="logo-highlight">homes</span></span>
              </div>
              <p className="footer-description">
                Professional property and facilities management with institutional standards, 
                now coming to Lebanon in 2026. Part of the Betterhomes Regional Group.
              </p>
              
              <div className="footer-contact">
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>Coming soon to Lebanon</span>
                </div>
                <div className="contact-item email-item">
                  <FaEnvelope />
                  <span>info@betterhomes-lebanon.com</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="footer-links"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="links-column">
                <h4>Company</h4>
                <ul>
                  {footerLinks.company.map((link, index) => (
                    <motion.li 
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                    >
                      <Link 
                        to={link.href.substring(1)} 
                        smooth={true} 
                        duration={500}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="links-column">
                <h4>Services</h4>
                <ul>
                  {footerLinks.services.map((link, index) => (
                    <motion.li 
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                    >
                      <Link 
                        to={link.href.substring(1)} 
                        smooth={true} 
                        duration={500}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="links-column">
                <h4>Regions</h4>
                <ul>
                  {footerLinks.regions.map((region, index) => (
                    <motion.li 
                      key={index}
                      variants={fadeInUp}
                      className={`region-item ${region.status}`}
                    >
                      <FaMapMarkerAlt className="region-icon" />
                      <span className="region-text">{region.label}</span>
                      {region.status === 'coming' && (
                        <span className="coming-badge1">Coming Soon</span>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div 
              className="footer-newsletter"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4>Stay Updated</h4>
              <p>Be the first to know about our Lebanon launch</p>
              
              <form className="newsletter-form">
                <div className="input-group">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="newsletter-input"
                  />
                  <motion.button 
                    type="submit"
                    className="newsletter-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </form>

              <div className="footer-social">
                <h5>Connect With Us</h5>
                <div className="social-icons">
                  {socialMedia.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      className="social-icon"
                      aria-label={social.label}
                      whileHover={{ 
                        scale: 1.2,
                        y: -5,
                        backgroundColor: 'var(--gold)',
                        color: 'var(--primary-blue)'
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Centered Content */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <motion.div 
              className="copyright-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="copyright-year">&copy; 2026 Betterhomes Lebanon. Part of the Betterhomes Regional Group.</p>
              <p className="tagline">Buy. Sell. Rent. Manage. Trust Betterhomes – Your Real Estate Partner.</p>
              
              <div className="footer-legal">
                <a href="#">Privacy Policy</a>
                <span className="legal-separator">•</span>
                <a href="#">Terms of Service</a>
                <span className="legal-separator">•</span>
                <a href="#">Cookie Policy</a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button 
        className="scroll-top-btn"
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp />
      </motion.button>

      {/* Floating Elements */}
      <div className="footer-floating">
        <motion.div 
          className="floating-element"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🏢
        </motion.div>
        <motion.div 
          className="floating-element"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          🔑
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;