import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import styles from './ServiceModal.module.css';

const dates = [
  { day: 'Mon', num: '12' },
  { day: 'Tue', num: '13' },
  { day: 'Wed', num: '14' },
  { day: 'Thu', num: '15' },
  { day: 'Fri', num: '16' },
  { day: 'Sat', num: '17' },
];

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"];

const ServiceModal = ({ service, onClose }) => {
  const [isBookingExpanded, setIsBookingExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setError("Please select date and time.");
      return;
    }
    setError('');
    setIsSuccess(true);
  };

  return (
    <motion.div 
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className={styles.modal}
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className={`interactive ${styles.closeBtn}`} onClick={onClose}>
          <X size={24} />
        </button>

        {!isSuccess ? (
          <>
            <div className={styles.header}>
              <h2 className={styles.title}>{service.name}</h2>
              <p className={styles.description}>{service.desc}</p>
              <span className={styles.price}>₹{service.price}</span>
              
              <AnimatePresence>
                {!isBookingExpanded && (
                  <motion.button 
                    className={`interactive ${styles.bookBtn}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    onClick={() => setIsBookingExpanded(true)}
                  >
                    Book Now
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {isBookingExpanded && (
                <motion.div 
                  className={styles.bookingContainer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <form className={styles.bookingForm} onSubmit={handleBookSubmit}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Name</label>
                      <input type="text" className={styles.input} placeholder="Your name" required />
                    </div>
                    
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Phone</label>
                      <input type="tel" className={styles.input} placeholder="Your phone number" required />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Select Date</label>
                      <div className={styles.dateScroll}>
                        {dates.map(d => (
                          <button 
                            type="button"
                            key={d.num}
                            className={`interactive ${styles.dateCard} ${selectedDate === d.num ? styles.active : ''}`}
                            onClick={() => setSelectedDate(d.num)}
                          >
                            <span className={styles.dateDay}>{d.day}</span>
                            <span className={styles.dateNum}>{d.num}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Select Time</label>
                      <div className={styles.timeGrid}>
                        {timeSlots.map(t => (
                          <button 
                            type="button"
                            key={t}
                            className={`interactive ${styles.timeChip} ${selectedTime === t ? styles.active : ''}`}
                            onClick={() => setSelectedTime(t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div 
                          className={styles.errorMsg}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button type="submit" className={`interactive ${styles.submitBtn}`}>
                      Confirm Booking
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div 
            className={styles.successState}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle2 size={64} color="var(--success-color)" />
            <h3 className={styles.title}>Booking Confirmed!</h3>
            <p className={styles.description}>Your appointment for {service.name} has been successfully booked.</p>
            <button className={`interactive ${styles.submitBtn}`} onClick={onClose} style={{ width: 'auto', padding: '1rem 3rem' }}>
              Done
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ServiceModal;
