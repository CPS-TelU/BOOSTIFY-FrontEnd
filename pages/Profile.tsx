import React from 'react';
import HomeNav from '../components/HomeNav'; 
import Footer from '../components/footer'; // Pastikan nama komponen sesuai
import styles from './Profile.module.css';
import { useTheme } from '../pages/ThemeContext';

const Profile: React.FC = () => {
    const { isDarkMode } = useTheme();
 
    return (
        <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
            <HomeNav />
            
            <main className={styles.main}>
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <img src="/user.png" alt="User" className={styles.avatarImage} />
                    </div>
                    <h1 className={styles.name}>Citra Kusumadewi Sribawono</h1>
                </div>
                <section className={styles.attendanceHistory}>
                    <h2>Attendance History</h2>
                    <div className={styles.historyItem}>
                        <span>Today, 8 August 2024</span>
                        <span>14:34</span>
                    </div>
                    <div className={styles.historyItem}>
                        <span>Today, 8 August 2024</span>
                        <span>14:34</span>
                    </div>
                    <div className={styles.historyItem}>
                        <span>Today, 8 August 2024</span>
                        <span>14:34</span>
                    </div>
                    <div className={styles.historyItem}>
                        <span>Today, 8 August 2024</span>
                        <span>14:34</span>
                    </div>
                    <div className={styles.historyItem}>
                        <span>Today, 8 August 2024</span>
                        <span>14:34</span>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
