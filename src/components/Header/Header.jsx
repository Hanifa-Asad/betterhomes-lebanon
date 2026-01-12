import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = ({ scrollY }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll
      const sections = ['home', 'about', 'services', 'why-us', 'partnership', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'why-us', label: 'Why Choose Us' },
    { id: 'partnership', label: 'Partnership' },
    { id: 'contact', label: 'Contact' }
  ];

  // SVG Logo Component
//   
// Update just the BetterHomesLogo component in your Header.jsx:

// SVG Logo Component with explicit colors
const BetterHomesLogo = () => (
  <svg 
    className="logo-svg" 
    width="212" 
    height="60" 
    viewBox="0 0 268 76" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="BetterHomes Qatar"
    preserveAspectRatio="xMidYMid meet"
  >
    <path d="M14.1388 34.3187C11.768 34.3187 9.7703 35.1642 8.04241 36.5695V37.6892C9.35124 36.6495 10.6773 36.1754 12.0091 36.1754C13.6796 36.1754 15.0343 36.8723 15.97 38.5404C16.9115 40.2085 17.4338 42.8535 17.4338 46.7495C17.4338 54.0961 15.3902 58.432 11.6072 58.432C9.20773 58.432 7.34207 56.6211 6.58433 53.919V19.5L0 26.0467V58.7805H1.29161L3.82316 56.2612C5.82085 58.0778 8.53609 59.1804 12.4511 59.1804C19.0297 59.1804 24.4085 53.8733 24.4085 46.2583C24.4085 39.2259 19.8735 34.313 14.1388 34.313" fill="#1F343F"></path>
    <path d="M129.391 58.7805H135.969V19.5L129.391 26.0467V58.7805Z" fill="#1F343F"></path>
    <path d="M143.97 34.3018C141.209 34.3018 139.177 35.2101 137.426 36.6268V37.6094C138.677 36.7125 139.865 36.3355 141.123 36.3355C145.21 36.3355 145.256 40.6371 145.256 42.2767V60.4945L151.834 53.9477V42.7508C151.834 36.9524 148.947 34.3018 143.964 34.3018" fill="#1F343F"></path>
    <path d="M33.5458 45.2587V45.4358C33.5458 53.1365 36.858 56.6955 41.5537 56.6955C44.1944 56.6955 47.0129 55.5416 49.246 52.7766L49.7856 53.0851C46.7891 57.5353 42.8052 59.3176 38.5113 59.3176C31.7547 59.3176 26.7031 54.6904 26.7031 47.2981C26.7031 39.3289 32.1623 34.3018 39.5848 34.3018C47.0072 34.3018 50.0956 39.3746 49.8258 45.253H33.5458V45.2587ZM33.5458 44.5446H43.9705C44.5503 38.7577 42.3574 34.9759 39.2288 34.9759C35.8305 34.9759 33.7697 39.1633 33.5458 44.5446Z" fill="#1F343F"></path>
    <path d="M67.9054 56.7409C65.7585 58.2548 63.6116 59.323 60.661 59.323C54.8458 59.323 54.2201 55.2727 54.2201 52.9991V35.8153H51.2695V35.0612L54.134 34.8384L60.6208 26.6064H60.7987V34.8384H70.0696L67.2453 35.8153H60.8045V53.2219C60.8045 54.3359 60.8045 57.3179 63.9388 57.3179C64.9204 57.3179 66.1316 57.0094 67.561 56.2039L67.9169 56.7352L67.9054 56.7409Z" fill="#1F343F"></path>
    <path d="M83.8351 56.7409C81.6882 58.2548 79.5412 59.323 76.5906 59.323C70.7755 59.323 70.1498 55.2727 70.1498 52.9991V35.8153H67.1992V35.0612L70.0637 34.8384L76.5505 26.6064H76.7284V34.8384H83.749L83.1692 35.8153H76.7284V53.2219C76.7284 54.3359 76.7284 57.3179 79.8627 57.3179C80.8443 57.3179 82.0556 57.0094 83.485 56.2039L83.8409 56.7352L83.8351 56.7409Z" fill="#1F343F"></path>
    <path d="M90.4598 45.2587V45.4358C90.4598 53.1365 93.7721 56.6955 98.4678 56.6955C101.108 56.6955 103.927 55.5416 106.16 52.7766L106.7 53.0851C103.703 57.5353 99.7192 59.3176 95.4253 59.3176C88.6688 59.3176 83.6172 54.6904 83.6172 47.2981C83.6172 39.3289 89.0764 34.3018 96.4988 34.3018C103.921 34.3018 107.01 39.3746 106.74 45.253H90.4598V45.2587ZM90.4598 44.5446H100.885C101.464 38.7577 99.2715 34.9759 96.1429 34.9759C92.7445 34.9759 90.6837 39.1633 90.4598 44.5446Z" fill="#1F343F"></path>
    <path d="M125.75 34.5755L124.005 39.4256C123.201 39.0257 122.351 38.8486 121.634 38.8486C119.395 38.8486 117.564 40.4482 116.846 42.8989V58.7916H110.273V35.7295L116.49 34.1699H116.668V41.5164C117.834 37.112 120.56 34.307 123.781 34.307C124.584 34.307 125.434 34.4841 125.75 34.5755Z" fill="#1F343F"></path>
    <path d="M154.66 46.9498C154.66 39.3348 160.251 34.3076 167.68 34.3076C175.108 34.3076 180.337 39.0263 180.337 46.6813C180.337 54.3363 174.7 59.3235 167.318 59.3235C159.936 59.3235 154.66 54.6048 154.66 46.9498ZM173.357 46.9955C173.357 39.7861 171.21 34.9303 167.41 34.9303C163.61 34.9303 161.641 39.6033 161.641 46.727C161.641 53.8507 163.788 58.7008 167.548 58.7008C171.308 58.7008 173.363 54.0278 173.363 46.9955" fill="#1F343F"></path>
    <path d="M220.952 42.8075V58.7859H214.333V42.1791C214.333 40.5339 214.333 36.3465 210.217 36.3465C208.426 36.3465 206.865 37.1462 204.85 39.3285C205.165 40.3054 205.297 41.465 205.297 42.8018V58.7802H198.725V42.1734C198.725 40.5281 198.679 36.3407 194.563 36.3407C192.909 36.3407 191.388 37.0091 189.643 38.8315V58.7745H183.07V35.7295L189.465 34.1699H189.643V37.9974C191.698 35.8152 193.937 34.3013 197.513 34.3013C201.09 34.3013 203.506 35.6781 204.626 38.5744C206.819 36.0837 209.144 34.3013 213.168 34.3013C218.087 34.3013 220.952 36.9691 220.952 42.8018" fill="#1F343F"></path>
    <path d="M230.694 45.2587V45.4358C230.694 53.1365 234.006 56.6955 238.702 56.6955C241.343 56.6955 244.161 55.5416 246.394 52.7766L246.934 53.0851C243.937 57.5353 239.954 59.3176 235.66 59.3176C228.903 59.3176 223.852 54.6904 223.852 47.2981C223.852 39.3289 229.311 34.3018 236.733 34.3018C244.156 34.3018 247.244 39.3746 246.974 45.253H230.694V45.2587ZM230.694 44.5446H241.119C241.699 38.7577 239.506 34.9759 236.377 34.9759C232.979 34.9759 230.918 39.1633 230.694 44.5446Z" fill="#1F343F"></path>
    <path d="M249.072 57.5012L249.968 54.2963C251.759 56.7014 254.979 58.7008 258.733 58.7008C262.086 58.7008 263.969 57.1013 263.969 54.7819C263.969 52.1141 261.328 51.0458 258.509 49.9775L256.632 49.2634C253.992 48.2409 249.428 46.4585 249.428 41.7398C249.428 37.7352 252.694 34.3076 258.819 34.3076C262.356 34.3076 265.576 35.4216 266.736 35.9986L265.978 38.8035C264.411 37.0211 261.638 34.9303 258.148 34.9303C255.105 34.9303 253.452 36.5299 253.452 38.535C253.452 41.2028 256.271 42.2311 258.952 43.2537L260.783 43.9221C263.331 44.9447 267.987 46.6813 267.987 51.6228C267.987 55.7645 264.675 59.3235 258.056 59.3235C254.52 59.3235 250.45 58.3009 249.066 57.4954" fill="#1F343F"></path>
  </svg>
);

  return (
    <motion.header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container header-container">
        <motion.div 
          className="logo-container"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="logo-link"
          >
            <BetterHomesLogo />
          </Link>
        </motion.div>

        <nav className="nav-desktop">
          <ul>
            {navItems.map((item) => (
              <motion.li 
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onSetActive={() => setActiveSection(item.id)}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div 
                      className="nav-indicator"
                      layoutId="nav-indicator"
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <motion.button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.nav 
                className="mobile-menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mobile-menu-header">
                  <div className="mobile-logo">
                    <BetterHomesLogo />
                  </div>
                </div>
                
                <ul>
                  {navItems.map((item) => (
                    <motion.li 
                      key={item.id}
                      whileHover={{ x: 10 }}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: item.id * 0.1 }}
                    >
                      <Link
                        to={item.id}
                        spy={true}
                        smooth={true}
                        offset={-80}
                        duration={500}
                        className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div 
                  className="mobile-menu-footer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="coming-soon-badge">Coming 2026</div>
                  <p>Betterhomes Lebanon</p>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;