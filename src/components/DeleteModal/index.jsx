import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './style.module.scss';

const DeleteModal = ({ isDarkMode, isOpen, onCancel, onDeleteConfirm }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const modalVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const modalContentVariants = {
    hidden: {
      opacity: 0,
      y: -100, // Move the modal content 100 units up
    },
    visible: {
      opacity: 1,
      y: 0, // Move the modal content to its original position (center)
    },
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className={classes.modal}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <motion.div
            className={`${classes.modalContent} ${isDarkMode ? classes.darkMode : ''}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalContentVariants}
            transition={{ duration: 0.1, type: 'spring', damping: 8, stiffness: 125 }}
          >
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className={classes.buttons}>
              <button
                type="button"
                onClick={onCancel}
                className={`${classes.cancelButton} ${isDarkMode ? classes.dark : ''}`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onDeleteConfirm}
                className={`${classes.deleteButton} ${isDarkMode ? classes.darkButton : ''}`}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

DeleteModal.propTypes = {
  isDarkMode: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDeleteConfirm: PropTypes.func.isRequired,
};

export default DeleteModal;
