import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HomeNav from '../components/HomeNav';
import Footer from '../components/footer';
import styles from './AttendanceCard.module.css';
import { useTheme } from '../pages/ThemeContext';


const AttendanceCard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { isDarkMode } = useTheme();
 

  const attendanceData = [
    { code: 'CIT', name: 'Citra Kusumadewi Sribawono', time: '15:30' },
    { code: 'LIA', name: 'Aulia Ramadhani', time: '15:30' },
    { code: 'KNP', name: 'Rizki Nugroho Firdaus', time: '15:30' },
    { code: 'MMA', name: 'Mitchel Mohamad Affandi', time: '15:30' },
    { code: 'LIA', name: 'Aulia Ramadhani', time: '15:30' },
  ];

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // Add logic here to filter attendanceData based on selectedDate
  };

  const currentDate = selectedDate || new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <HomeNav />
      <main className={styles.main}>
        <h2 className={styles.h2}>ATTENDANCE</h2>

        <div className={styles.filterSection}>
          <label htmlFor="date-picker" className={styles.filterLabel}>
            Select Date:
          </label>
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={handleDateChange}
            className={styles.datePicker}
            dateFormat="dd/MM/yyyy"
            placeholderText="Click to select a date"
          />
        </div>

        <div className={styles.attendanceList}>
          {attendanceData.map((attendance, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.left}>
                <h3>{attendance.code}</h3>
                <p>{attendance.name}</p>
              </div>
              <div className={styles.right}>
                <p>{formattedDate}, {attendance.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <button>PAGE 1</button>
          <a href="/AttendanceCard2">
            <button>▶</button>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AttendanceCard;
