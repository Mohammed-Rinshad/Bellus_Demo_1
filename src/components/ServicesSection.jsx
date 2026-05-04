import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scissors, Beaker, Wind } from 'lucide-react';
import styles from './ServicesSection.module.css';
import ServiceModal from './ServiceModal';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  { id: 's1', name: "Men's Haircut", price: 300, desc: "Precision haircut tailored to your face shape and style.", icon: Scissors },
  { id: 's2', name: "Women's Haircut", price: 500, desc: "Expert styling, layers, and cuts to enhance your natural beauty.", icon: Scissors },
  { id: 's3', name: "Hair Coloring", price: 600, desc: "Premium colors and highlights using high-quality products.", icon: Beaker },
  { id: 's4', name: "Hair Treatment", price: 700, desc: "Deep conditioning and repair treatments for healthy hair.", icon: Beaker },
  { id: 's5', name: "Hair Care", price: 400, desc: "Essential care routines to maintain shine and strength.", icon: Wind },
  { id: 's6', name: "Beard Grooming", price: 250, desc: "Sharp, clean beard shaping and maintenance.", icon: Scissors },
  { id: 's7', name: "Shaving", price: 200, desc: "Classic hot towel shave for a smooth finish.", icon: Scissors },
  { id: 's8', name: "Body Waxing", price: 500, desc: "Gentle and effective waxing services.", icon: Beaker },
  { id: 's9', name: "Curly Hair Styling", price: 650, desc: "Specialized styling and care for curly hair textures.", icon: Wind },
];

const ServicesSection = () => {
  const containerRef = useRef(null);
  const [selectedServiceData, setSelectedServiceData] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(`.${styles.card}`);
      
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
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

  const handleCardClick = (service) => {
    setSelectedServiceData(service);
  };

  const closeModal = () => {
    setSelectedServiceData(null);
  };

  return (
    <section className={`section ${styles.services}`} id="services" ref={containerRef}>
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        
        <div className={styles.content}>
          <div className={styles.grid}>
            {servicesData.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={item.id}
                  className={`${styles.card} interactive`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onClick={() => handleCardClick(item)}
                >
                  <div className={styles.header}>
                    <span className={styles.serviceName}>{item.name}</span>
                    <Icon className={styles.icon} size={24} />
                  </div>
                  <p className={styles.description}>{item.desc}</p>
                  <span className={styles.servicePrice}>₹{item.price}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedServiceData && (
          <ServiceModal service={selectedServiceData} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
