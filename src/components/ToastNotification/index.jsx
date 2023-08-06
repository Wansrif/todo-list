import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './style.module.scss';

const ToastNotification = ({ message }) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setVisible(true);
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClose = () => {
    setVisible(false); // Hide the toast when the close button is clicked
  };

  return visible ? (
    <div className={classes.toastContainer}>
      <p className={classes.toastMessage}>{message}</p>
      <div className={classes.timerBarContainer}>
        <div className={classes.timerBarFill} />
      </div>
      <div className={classes.btnContainer}>
        <span className={classes.closeButton} onClick={handleClose}>
          &times;
        </span>
      </div>
    </div>
  ) : null;
};

ToastNotification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ToastNotification;
