import React, { useState } from 'react';
import HomeNav from '../components/HomeNav'; 
import Footer from '../components/footer'; 
import styles from './Profile.module.css';
import { useTheme } from '../pages/ThemeContext';

const Profile: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [profileImage, setProfileImage] = useState<string>('/user.png');
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleDeleteImage = () => {
        setProfileImage('/user.png');  // Reset to default image
        setShowModal(false);
    };

    return (
        <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
            <HomeNav />
            
            <main className={styles.main}>
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <img src={profileImage} alt="User" className={styles.avatarImage} />
                        <img 
                            src={isDarkMode ? "/pencil-dark.png" : "/pencil-light.png"} 
                            alt="Edit Profile" 
                            className={styles.pencilIcon}
                            onClick={() => setShowModal(true)} 
                        />
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

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Edit Profile Picture</h3>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange}
                        />
                        <button onClick={handleDeleteImage}>Delete Image</button>
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Profile;
