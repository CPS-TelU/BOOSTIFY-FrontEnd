import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './HomeNav.module.css';
import { useTheme } from '../pages/ThemeContext';
import SignOutPopUp from './SignOutPopUp/SignOutPopUp';
import { signOut } from 'next-auth/react';

const HomeNav: React.FC = () => {
  const { isDarkMode, toggleMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [assistantCode, setAssistantCode] = useState<string | null>(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const authDataString = localStorage.getItem('authData');

      if (authDataString) {
        const authData = JSON.parse(authDataString);
        const token = authData.token.token;

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
                localStorage.removeItem('authData');
                router.push('/SignIn');
              } else {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
              }
            }

            const data = await response.json();
            setUserName(data.name);
            setAssistantCode(data.assisstant_code);
            setAvatarUrl(data.avatarUrl || null);
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        }
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
      localStorage.removeItem('nextauth.message');
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
        <a href="/Profile" className={styles.profileButton}>
          {avatarUrl ? (
            <div
              className={styles.userAvatar}
              style={{ backgroundImage: `url(${avatarUrl})` }}
            />
          ) : (
            <span>{assistantCode || userName}</span>
          )}
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
