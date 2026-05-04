import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import styles from './BookingSection.module.css';

const servicesList = [
  "Men's Haircut", "Women's Haircut", "Hair Coloring", "Hair Treatment", "Hair Care",
  "Beard Grooming", "Shaving", "Body Waxing", "Curly Hair Styling"
];

const dates = [
  { day: 'Mon', num: '12' },
  { day: 'Tue', num: '13' },
  { day: 'Wed', num: '14' },
  { day: 'Thu', num: '15' },
  { day: 'Fri', num: '16' },
  { day: 'Sat', num: '17' },
];

const timeSlots = {
  early: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"],
  late: ["12:00 PM", "01:30 PM", "02:00 PM", "03:30 PM", "05:00 PM"]
};

const BookingSection = ({ preSelectedService, onServiceChange }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    if (!preSelectedService || !selectedDate || !selectedTime) {
      setError("Please select service, date, and time");
      return;
    }
    
    setError('');
    setIsSuccess(true);
  };

  return (
    <section className={`section ${styles.booking}`} id="booking">
      <div className="container">
        <h2 className="section-title">Book Appointment</h2>
        
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="formContainer"
              className={styles.containerBox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <form onSubmit={handleBook}>
                {/* User Details */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Name</label>
                  <input type="text" className={`interactive ${styles.input}`} placeholder="Enter your name" required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input type="tel" className={`interactive ${styles.input}`} placeholder="Enter your phone" required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Location</label>
                  <input type="text" className={`interactive ${styles.input}`} placeholder="Your preferred location" required />
                </div>

                {/* Service Selection */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>1. Select Service</label>
                  <div className={styles.selectGroup}>
                    {servicesList.map(s => (
                      <button 
                        type="button"
                        key={s} 
                        className={`interactive ${styles.selectChip} ${preSelectedService === s ? styles.active : ''}`}
                        onClick={() => onServiceChange(s)}
                      >
                        {s}
                        {preSelectedService === s && (
                          <span className={styles.selectedLabel}>Selected</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>2. Select Date</label>
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

                {/* Time Selection */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>3. Select Time</label>
                  
                  <div className={styles.timeGroup}>
                    <div className={styles.timeGroupTitle}>Early Hours</div>
                    <div className={styles.timeGrid}>
                      {timeSlots.early.map(t => (
                        <button 
                          type="button"
                          key={t}
                          className={`interactive ${styles.selectChip} ${selectedTime === t ? styles.active : ''}`}
                          onClick={() => setSelectedTime(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.timeGroup}>
                    <div className={styles.timeGroupTitle}>Late Hours</div>
                    <div className={styles.timeGrid}>
                      {timeSlots.late.map(t => (
                        <button 
                          type="button"
                          key={t}
                          className={`interactive ${styles.selectChip} ${selectedTime === t ? styles.active : ''}`}
                          onClick={() => setSelectedTime(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Error Message with Shake Animation */}
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      className={styles.errorMsg}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: 1, 
                        x: [0, -10, 10, -10, 10, 0],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit" 
                  className={`interactive ${styles.submitBtn}`}
                >
                  Book Appointment
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              className={styles.successState}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <CheckCircle2 size={80} className={styles.successIcon} />
              <h3 className={styles.successText}>Your appointment has been successfully booked!</h3>
              <button 
                className={`interactive ${styles.submitBtn}`}
                style={{ width: 'auto', padding: '1rem 3rem' }}
                onClick={() => {
                  setIsSuccess(false);
                  onServiceChange('');
                  setSelectedDate('');
                  setSelectedTime('');
                }}
              >
                Book Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BookingSection;
