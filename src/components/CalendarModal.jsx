import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './CalendarModal.module.css';

const CalendarModal = ({ selectedDate, onSelectDate, onClose }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const getDaysArray = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of month
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  };

  const isDateDisabled = (day) => {
    if (!day) return true;
    
    const date = new Date(currentYear, currentMonth, day);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return date < tomorrow || date.getDay() === 0; // Disable past dates and Sundays
  };

  const isDateSelected = (day) => {
    if (!day) return false;
    const date = new Date(currentYear, currentMonth, day);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return key === selectedDate;
  };

  const handleDayClick = (day) => {
    if (!isDateDisabled(day)) {
      const date = new Date(currentYear, currentMonth, day);
      onSelectDate(date);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const days = getDaysArray();
  const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>Select a Date</h3>
          <button
            className={`interactive ${styles.closeBtn}`}
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <div className={styles.monthControls}>
          <motion.button
            className={`interactive ${styles.navBtn}`}
            onClick={prevMonth}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className={styles.monthYear}>
            <span>{months[currentMonth]}</span>
            <span>{currentYear}</span>
          </div>

          <motion.button
            className={`interactive ${styles.navBtn}`}
            onClick={nextMonth}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        <div className={styles.calendar}>
          <div className={styles.dayLabels}>
            {dayLabels.map((day) => (
              <div key={day} className={styles.dayLabel}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.days}>
            {days.map((day, index) => (
              <motion.button
                key={index}
                className={`${styles.day} ${
                  isDateDisabled(day) ? styles.disabled : ''
                } ${isDateSelected(day) ? styles.selected : ''}`}
                onClick={() => handleDayClick(day)}
                whileHover={!isDateDisabled(day) ? { scale: 1.05 } : {}}
                whileTap={!isDateDisabled(day) ? { scale: 0.95 } : {}}
                disabled={isDateDisabled(day)}
              >
                {day}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CalendarModal;
