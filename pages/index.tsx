import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import styles from './LandingPage.module.css';
import { useTheme } from '../pages/ThemeContext';
import HomeNav from '@/components/HomeNav';

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession(); // Get the session data
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (status === 'loading') {
      // Wait for session loading to finish
      return;
    }

    if (session) {
      // Redirect to HomePage if the user is already logged in
      router.push('/HomePage');
    } else {
      // If not logged in, set loading to false
      setIsLoading(false);
    }
  }, [session, status, router]);

  if (isLoading) {
    // Optionally render a loading spinner or message
    return <div>Loading...</div>;
  }

  return (
    
    <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      {session ? <HomeNav /> : <Navbar />}
      <main className={styles.mainContent} >
        <div className={styles.textSection}>
          <h1 className={styles.title}>Capture Your Smile, Capture Your Presence</h1>
          <p className={styles.description}>
            This device is an attendance system based on facial recognition technology that requires users to smile as a sign of presence. With just a smile, your attendance is automatically recorded, enhancing the positive atmosphere in the workplace or school. Additionally, this device aims to boost people's enthusiasm and motivation to start their day with a smile, creating a more positive and productive environment.
          </p>
          <a href="/SignIn">
          <button className={styles.attendanceButton}>See Your Attendance</button>
          </a>
        </div>

        <div className={styles.imageSection}>
          <img src="/smile-image.png" alt="Smiling Face" className={styles.smileImage} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
