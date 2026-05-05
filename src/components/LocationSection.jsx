import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import styles from './LocationSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/BELLUS+UNISEX+SALON/@10.7753966,76.4340645,856m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba7d990fefd5fa7:0x5a1aede0f4edb3d8!8m2!3d10.7753966!4d76.4340645!16s%2Fg%2F11m6ggn0t2?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D';

const LocationSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleLocationClick = () => {
    window.open(GOOGLE_MAPS_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={styles.location} id="location" ref={containerRef}>
      <div className="container">
        <motion.div 
          className={styles.content}
          onClick={handleLocationClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
          style={{ cursor: 'pointer' }}
        >
          <MapPin size={48} className={styles.icon} />
          <h2 className={styles.cityName}>Ottapalam</h2>
          <p className={styles.details}>
            Experience premium grooming at our central location. Drop by for an elite haircut or styling session.
          </p>
          <p className={styles.clickHint}>Click to open in Google Maps</p>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
