import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './ServiceModal.module.css';

const ServiceModal = ({ service, onClose }) => {
  const navigate = useNavigate();

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleBookNow = () => {
    navigate(`/book?service=${encodeURIComponent(service.name)}`, {
      state: { selectedService: service.name },
    });
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
        onClick={(e) => e.stopPropagation()}
      >
        <button className={`interactive ${styles.closeBtn}`} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>{service.name}</h2>
          <p className={styles.description}>{service.desc}</p>
          <span className={styles.price}>&#8377;{service.price}</span>

          <motion.button
            className={`interactive ${styles.bookBtn}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBookNow}
          >
            Book Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceModal;
