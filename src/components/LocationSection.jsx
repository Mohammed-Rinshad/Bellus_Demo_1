import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import styles from './LocationSection.module.css';

gsap.registerPlugin(ScrollTrigger);

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

  return (
    <section className={styles.location} id="location" ref={containerRef}>
      <div className="container">
        <div className={styles.content}>
          <MapPin size={48} className={styles.icon} />
          <h2 className={styles.cityName}>Ottapalam</h2>
          <p className={styles.details}>
            Experience premium grooming at our central location. Drop by for an elite haircut or styling session.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
