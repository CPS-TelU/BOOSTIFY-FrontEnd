import React, { useState } from 'react';
import styles from './HomeNav.module.css';
import { useTheme } from '../pages/ThemeContext';

const HomeNav: React.FC = () => {
  const { isDarkMode, toggleMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu Toggled:', isMenuOpen); // Debugging log
  };

  return (
    <header className={`${styles.header} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <div className={`${styles.logoContainer}${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
        <a href="/HomePage">
          <img src="/logo.png" alt="Logo" className={styles.logo} />
        </a>
      </div>
      <nav className={styles.navbarContainer}>
        <button onClick={toggleMode} className={styles.modeToggle}>
          <img
            src={isDarkMode ? "/light-mode-icon.png" : "/path-to-darkmode-icon.png"}
            alt={isDarkMode ? "Light Mode Icon" : "Dark Mode Icon"}
          />
        </button>
        {/* Hamburger Menu for small screens */}
        <button className={styles.hamburger} onClick={handleMenuToggle}>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
        {/* Navbar Links */}
        <ul className={`${styles.navLinks} ${isDarkMode ? styles['dark-mode'] : ''} ${isMenuOpen ? styles.showMenu : ''}`}>
          <li><a href="/About" className={styles.navLink}>About</a></li>
          <li><a href="/Team" className={styles.navLink}>Our Team</a></li>
          <li><a href="/SignOut" className={`${styles.navLink} ${styles.signOut}`}>Sign Out</a></li>
        </ul>
        <a href="/Profile">
          <button className={styles.profileButton}>CIT</button>
        </a>
      </nav>
    </header>
  );
};

export default HomeNav;
