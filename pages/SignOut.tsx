import React from 'react';
import styles from './SignOut.module.css';
import { useTheme } from '../pages/ThemeContext';

const ConfirmPage: React.FC = () => {
  const { isDarkMode } = useTheme();

  const handleGoBack = () => {
    console.log('Go Back');
  };

  const handleConfirm = () => {
    console.log('Confirmed');
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <h1 className={styles.title}>Are You Sure?</h1>
      <div className={styles.buttons}>
        <div className={`${styles.buttonContainer} ${styles.goBackButtonContainer}`}>
          <a href="/HomePage">
            <button className={`${styles.button} ${styles.goBackButton}`} onClick={handleGoBack}>
              Go Back
            </button>
          </a>
        </div>
        <div className={`${styles.buttonContainer} ${styles.confirmButtonContainer}`}>
          <a href="/">
            <button className={`${styles.button} ${styles.confirmButton}`} onClick={handleConfirm}>
              Yes
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
