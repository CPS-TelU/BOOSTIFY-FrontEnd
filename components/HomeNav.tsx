import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './HomeNav.module.css';
import { useTheme } from '../pages/ThemeContext';
import SignOutPopUp from './SignOutPopUp/SignOutPopUp';
import { signOut } from 'next-auth/react';

const HomeNav: React.FC = () => {
  const { isDarkMode, toggleMode } = useTheme();
  const [userName, setUserName] = useState<string | null>(null);
  const [assistantCode, setAssistantCode] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      // Ambil data dari localStorage
      const authDataString = localStorage.getItem('authData');
      console.log('Retrieved authData from localStorage:', authDataString);

      if (authDataString) {
        // Parse data dari string menjadi objek
        const authData = JSON.parse(authDataString);

        // Ambil token dari authData
        const token = authData.token.token; // Sesuaikan dengan struktur data Anda
        console.log('Extracted token:', token);

        if (token) {
          try {
            const response = await fetch('https://boostify-back-end.vercel.app/api/whoami', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              if (response.status === 401) {
                console.warn('Token invalid, redirecting to SignIn');
                localStorage.removeItem('authData');
                router.push('/SignIn');
              } else {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
              }
            }

            const data = await response.json();
            console.log('Fetched user data:', data);
            setUserName(data.name);
            setAssistantCode(data.assisstant_code);
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        } else {
          console.warn('No token found in authData');
        }
      } else {
        console.warn('No authData found');
      }
    };

    fetchUserData();
  }, [router]);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('authData');
      await signOut({ callbackUrl: '/SignIn' });
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setShowPopUp(false);
    }
  };

  const handleConfirmSignOut = () => {
    setShowPopUp(false);
    handleSignOut();
  };

  const handleGoBack = () => {
    setShowPopUp(false);
  };

  const saveTokenToLocalStorage = (authData: any): void => {
    localStorage.setItem('authData', JSON.stringify(authData));
    console.log('authData saved:', JSON.stringify(authData));
  };

  return (
    <header className={`${styles.header} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <div className={`${styles.logoContainer} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
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
        <button className={styles.hamburger} onClick={handleMenuToggle}>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
        <ul className={`${styles.navLinks} ${isDarkMode ? styles['dark-mode'] : ''} ${isMenuOpen ? styles.showMenu : ''}`}>
          <li><a href="/About" className={styles.navLink}>About</a></li>
          <li><a href="/Team" className={styles.navLink}>Our Team</a></li>
          <li>
            <button onClick={() => setShowPopUp(true)} className={`${styles.navLink} ${styles.signOut}`}>
              Sign Out
            </button>
          </li>
        </ul>
        {userName && <span className={styles.userName}>{userName}</span>}
        <a href="/Profile" className={styles.userAvatarButton}>
          <div className={styles.userAvatar}>
            {assistantCode && <span className={styles.assistantCode}>{assistantCode}</span>}
          </div>
        </a>
      </nav>

      {showPopUp && (
        <SignOutPopUp 
          onConfirm={handleConfirmSignOut} 
          onGoBack={handleGoBack} 
        />
      )}
    </header>
  );
};

export default HomeNav;
