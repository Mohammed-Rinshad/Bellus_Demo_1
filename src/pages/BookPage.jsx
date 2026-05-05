import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import DatePickerV2 from '../components/DatePickerV2';
import styles from './BookPage.module.css';

const servicesList = [
  "Men's Haircut", "Women's Haircut", "Hair Coloring", "Hair Treatment", "Hair Care",
  "Beard Grooming", "Shaving", "Body Waxing", "Curly Hair Styling"
];

const timeSlots = {
  early: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"],
  late: ["12:00 PM", "01:30 PM", "02:00 PM", "03:30 PM", "05:00 PM"]
};

const getIncomingService = (routerLocation) => {
  const params = new URLSearchParams(routerLocation.search);
  const incomingService = routerLocation.state?.selectedService || params.get('service');

  return servicesList.includes(incomingService) ? incomingService : '';
};

const BookPage = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [selectedService, setSelectedService] = useState(() => getIncomingService(routerLocation));
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    if (!name || !phone || !preferredLocation || !selectedService || !selectedDate || !selectedTime) {
      setError("Please fill in all fields");
      return;
    }
    
    setError('');
    setIsSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setPhone('');
      setPreferredLocation('');
      setSelectedService('');
      setSelectedDate('');
      setSelectedTime('');
    }, 3000);
  };

  return (
    <>
      <CustomCursor />
      <Navigation />
      
      <section className={`section ${styles.bookPage}`}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.header}
          >
            <h1 className="section-title">Book Your Appointment</h1>
            <p className={styles.subtitle}>Experience premium grooming at BELLUS</p>
          </motion.div>

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
                    <label className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      className={`interactive ${styles.input}`}
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone Number</label>
                    <input
                      type="tel"
                      className={`interactive ${styles.input}`}
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Preferred Location</label>
                    <input
                      type="text"
                      className={`interactive ${styles.input}`}
                      placeholder="Enter your location"
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      required
                    />
                  </div>

                  {/* Service Selection */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>1. Select Service</label>
                    <div className={styles.selectGroup}>
                      {servicesList.map(s => (
                        <button 
                          type="button"
                          key={s} 
                          className={`interactive ${styles.selectChip} ${selectedService === s ? styles.active : ''}`}
                          onClick={() => setSelectedService(s)}
                        >
                          {s}
                          {selectedService === s && (
                            <span className={styles.selectedLabel}>Selected</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>2. Select Date</label>
                    <DatePickerV2 selectedDate={selectedDate} onDateSelect={setSelectedDate} />
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

                  {/* Error Message */}
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
                <p className={styles.successSubtext}>We'll contact you shortly to confirm.</p>
                <div className={styles.successButtons}>
                  <button 
                    className={`interactive ${styles.submitBtn}`}
                    onClick={() => setIsSuccess(false)}
                  >
                    Book Another
                  </button>
                  <button 
                    className={`interactive ${styles.homeBtn}`}
                    onClick={() => navigate('/')}
                  >
                    Back to Home
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BookPage;
