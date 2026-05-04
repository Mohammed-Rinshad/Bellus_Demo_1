import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TeamSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { id: 1, name: 'Vinay', role: 'Haircut + Styling' },
  { id: 2, name: 'Akshay', role: 'Haircut + Waxing' },
  { id: 3, name: 'Karthik', role: 'Beard + Hair Coloring' },
  { id: 4, name: 'Surya', role: 'Hair Treatment + Styling' },
  { id: 5, name: 'Lakshmi', role: "Hair Coloring + Women's Haircut" },
];

const TeamSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const members = gsap.utils.toArray(`.${styles.member}`);
      
      gsap.fromTo(members, 
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

  return (
    <section className={`section ${styles.team}`} id="team" ref={containerRef}>
      <div className="container">
        <h2 className="section-title">The Team</h2>
        
        <div className={styles.grid}>
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id} 
              className={`${styles.member} interactive`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className={styles.avatarContainer}>
                {/* Silhouette placeholder */}
                <div className={styles.silhouette}></div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
