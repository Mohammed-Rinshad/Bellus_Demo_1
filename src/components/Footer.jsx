import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>Bellus Unisex Salon</div>
          
          <div className={styles.info}>
            <p>Ottapalam, Kerala, India</p>
            <p>
              <a href="tel:+910000000000" className={`interactive ${styles.link}`}>+91 00000 00000</a>
            </p>
            <p>
              <a href="mailto:hello@bellus.com" className={`interactive ${styles.link}`}>hello@bellus.com</a>
            </p>
          </div>

          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} Bellus Unisex Salon. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
