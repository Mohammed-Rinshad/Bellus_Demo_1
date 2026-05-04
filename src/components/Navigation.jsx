import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styles from './Navigation.module.css';

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { name: 'Home', target: '#hero' },
  { name: 'Services', target: '#services' },
  { name: 'Team', target: '#team' },
  { name: 'Location', target: '#location' },
  { name: 'Booking', target: '#booking' }
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      // Find active section based on scroll position
      const sections = navItems.map(item => document.querySelector(item.target));
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].target);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (target) => {
    setIsOpen(false);
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 0 },
      ease: "power3.inOut"
    });
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
