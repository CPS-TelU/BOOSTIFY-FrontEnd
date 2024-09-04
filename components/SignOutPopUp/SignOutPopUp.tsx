import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import styles from './SignOutPopUp.module.css';
import { useTheme } from '../../pages/ThemeContext';

interface SignOutPopupProps {
  onClose?: () => void;
  onSignOut?: () => void;
}

const SignOutPopup: React.FC<SignOutPopupProps> = ({ onClose = () => {}, onSignOut = () => {} }) => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const handleGoBack = () => {
    console.log("Go Back button clicked"); // Tambahkan log untuk memeriksa apakah fungsi dipanggil
    onClose(); // Menutup pop-up
    router.push('/HomePage'); // Mengarahkan ke halaman HomePage
  };

  const handleSignOut = async () => {
    const authData = localStorage.getItem('authData');

    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      const token = parsedAuthData.token?.token;

      if (token) {
        try {
          const response = await fetch('https://boostify-back-end.vercel.app/api/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            console.log('Sign-out successful, removing token from localStorage...');
            localStorage.removeItem('authData');
            signOut({ callbackUrl: '/' });
          } else {
            console.error('Sign-out failed, response status:', response.status);
          }
        } catch (error) {
          console.error('Error during sign-out:', error);
        }
      } else {
        console.error('No token found in localStorage');
      }
    } else {
      console.error('No authData found in localStorage');
    }
  };

  return (
    <div className={`${styles.overlay} ${isDarkMode ? styles['dark-mode'] : ''}`}>
      <div className={`${styles.popup} ${isDarkMode ? styles['dark-mode'] : ''}`}>
        <h2 className={styles.title}>Are You Sure?</h2>
        <div className={styles.buttons}>
          <a href="/HomePage">
          <button onClick={handleGoBack} className={styles.goBackButton}>Go Back</button>
          </a>
          <button onClick={handleSignOut} className={styles.signOutButton}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default SignOutPopup;
