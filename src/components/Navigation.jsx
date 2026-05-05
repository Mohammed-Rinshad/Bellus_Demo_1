import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styles from './Navigation.module.css';

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { name: 'Home', target: '/' },
  { name: 'Services', target: '#services' },
  { name: 'Team', target: '#team' },
  { name: 'Location', target: '#location' },
  { name: 'Booking', target: '/book' }
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      // Only track sections on home page
      if (location.pathname !== '/') return;

      const sections = navItems
        .filter(item => item.target.startsWith('#'))
        .map(item => ({ target: item.target, element: document.querySelector(item.target) }));
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPos) {
          setActiveSection(section.target);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (target) => {
    setIsOpen(false);

    if (target.startsWith('#')) {
      // Smooth scroll to section
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 0 },
        ease: "power3.inOut"
      });
    } else {
      // Navigate to route
      navigate(target);
    }
  };

  return (
    <>
      <div className={styles.navContainer}>
        <button 
          className={`${styles.hamburger} interactive ${isOpen ? styles.open : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className={styles.sidebar}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
          >
            <ul className={styles.menuList}>
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`${styles.menuItem} interactive ${activeSection === item.target ? styles.active : ''}`}
                  onClick={() => handleNavClick(item.target)}
                >
                  {item.name}
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
