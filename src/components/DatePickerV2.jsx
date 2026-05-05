import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CalendarModal from './CalendarModal';
import styles from './DatePickerV2.module.css';

const generateDates = () => {
  const dateList = [];
  const today = new Date();

  // Generate next 14 days
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip Sundays (day 0)
    if (date.getDay() !== 0) {
      dateList.push(date);
    }
  }

  return dateList;
};

const formatDateKey = (date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const DatePickerV2 = ({ selectedDate, onDateSelect }) => {
  const dates = generateDates();
  const [showCalendar, setShowCalendar] = useState(false);

  const getDayName = (date) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[date.getDay()];
  };

  const getDateNumber = (date) => {
    return date.getDate().toString().padStart(2, '0');
  };

  const isSelectedDate = (date) => {
    return selectedDate === formatDateKey(date);
  };

  const handleDateClick = (date) => {
    onDateSelect(formatDateKey(date));
  };

  const handleCalendarSelect = (date) => {
    onDateSelect(formatDateKey(new Date(date)));
    setShowCalendar(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.scrollContainer}>
          <div className={styles.dateScroll}>
            {dates.map((date) => (
              <motion.button
                key={formatDateKey(date)}
                className={`interactive ${styles.dateCard} ${isSelectedDate(date) ? styles.active : ''}`}
                onClick={() => handleDateClick(date)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <span className={styles.dateDay}>{getDayName(date)}</span>
                <span className={styles.dateNum}>{getDateNumber(date)}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          className={`interactive ${styles.viewMoreBtn}`}
          onClick={() => setShowCalendar(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ChevronDown size={20} />
          View More Dates
        </motion.button>
      </div>

      <AnimatePresence>
        {showCalendar && (
          <CalendarModal
            selectedDate={selectedDate}
            onSelectDate={handleCalendarSelect}
            onClose={() => setShowCalendar(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DatePickerV2;
