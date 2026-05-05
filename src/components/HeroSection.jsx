import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styles from './HeroSection.module.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const FRAME_COUNT = 100; // Soft limit for performance
// Create dummy arrays for frame paths (since we don't have actual images yet, we will handle failures gracefully)
const currentFrame = index => `/images/hero_${(index + 1).toString().padStart(4, '0')}.webp`;

const HeroSection = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isFinalFrame, setIsFinalFrame] = useState(false);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef(0);

  useEffect(() => {
    // Check mobile
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobile(checkMobile());
    if (checkMobile()) {
      setIsLoading(false); // Skip heavy preloading on mobile
      return;
    }

    // Preload images
    let loadedCount = 0;
    const loadImages = async () => {
      // Lock scroll
      document.body.classList.add('scroll-locked');

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        // We resolve immediately on error to skip missing frames gracefully
        await new Promise((resolve) => {
          img.onload = () => {
            imagesRef.current.push(img);
            loadedCount++;
            resolve();
          };
          img.onerror = () => {
            // Push null for missing frames
            imagesRef.current.push(null);
            loadedCount++;
            resolve();
          };
        });
      }

      // Filter out nulls
      imagesRef.current = imagesRef.current.filter(img => img !== null);
      
      setIsLoading(false);
      document.body.classList.remove('scroll-locked');
      
      // Draw first frame immediately
      if (imagesRef.current.length > 0) {
        renderFrame(0);
      }
    };

    loadImages();

    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, []);

  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];
    if (!img) return;

    // Handle Resize & DPR
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Object-fit: contain logic
    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawWidth = rect.width;
      drawHeight = rect.width / imgRatio;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
    } else {
      drawHeight = rect.height;
      drawWidth = rect.height * imgRatio;
      offsetY = 0;
      offsetX = (rect.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    frameIndexRef.current = index;
  };

  useEffect(() => {
    if (isLoading || isMobile || imagesRef.current.length === 0) return;

    // Canvas Resize listener
    const handleResize = () => renderFrame(frameIndexRef.current);
    window.addEventListener('resize', handleResize);

    // GSAP Scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Scroll distance
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Subtly fade out near the end
          if (progress > 0.9) {
            setIsFinalFrame(true);
          } else {
            setIsFinalFrame(false);
          }
        }
      }
    });

    const frameCount = imagesRef.current.length;
    const proxy = { frame: 0 };

    tl.to(proxy, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => renderFrame(Math.round(proxy.frame))
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading, isMobile]);

  const handleBookClick = () => {
    navigate('/book');
  };

  return (
    <section className={styles.heroContainer} id="hero" ref={containerRef}>
      <AnimatePresence>
        {isLoading && !isMobile && (
          <motion.div 
            className={styles.preloader}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.preloaderText}>BELLUS</div>
            <div className={styles.spinner}></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.stickyWrapper}>
        {/* Canvas or Mobile Fallback */}
        {!isMobile ? (
          <canvas 
            ref={canvasRef} 
            className={`${styles.canvas} ${isFinalFrame ? styles['fade-out'] : ''}`} 
          />
        ) : (
          <div className={styles.canvas} style={{ backgroundColor: '#111' }}>
            {/* Fallback image background could go here */}
          </div>
        )}

        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: isLoading ? 0.5 : 0 }}
        >
          <h1 className={styles.title}>BELLUS</h1>
          <p className={styles.subtitle}>Premium Grooming Experience</p>
          <button className={`interactive ${styles.bookBtn}`} onClick={handleBookClick}>
            Book Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
