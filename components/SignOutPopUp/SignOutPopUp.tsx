import React from 'react';
import styles from './SignOutPopUp.module.css';
import { useTheme } from '../../pages/ThemeContext';

interface SignOutPopupProps {
  onClose: () => void;
  onSignOut: () => void;
}

const SignOutPopup: React.FC<SignOutPopupProps> = ({ onClose, onSignOut }) => {
  const { isDarkMode } = useTheme(); // Asumsikan useTheme mengembalikan objek dengan isDarkMode

  return (
    <div className={`${styles.overlay} ${isDarkMode ? styles['dark-mode'] : ''}`}>
      <div className={`${styles.popup} ${isDarkMode ? styles['dark-mode'] : ''}`}>
        <h2 className={`${styles.title}`}>Are You Sure?</h2>
        <div className={styles.buttons}>
            <a href="/HomePage">
          <button onClick={onClose} className={styles.goBackButton}>Go Back</button>
            </a>
            <a href="/">
          <button onClick={onSignOut} className={styles.signOutButton}>Yes</button>
            </a>
        </div>
      </div>
    </div>
  );
};

export default SignOutPopup;
