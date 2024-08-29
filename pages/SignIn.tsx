import React, { useState } from 'react';
import styles from './SignIn.module.css';
import { useTheme } from '../pages/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const SignIn: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [assistantCode, setAssistantCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAssistantCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uppercaseValue = e.target.value.toUpperCase();
    setAssistantCode(uppercaseValue);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!assistantCode || !password) {
      setError('Assistant Code and Password are required.');
      return;
    }

    try {
      const response = await fetch('https://boostify-back-end.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assisstant_code: assistantCode,
          password,
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        router.push('/HomePage');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Boostify Logo" />
      </div>
      <div className={`${styles.formContainer}`}>
        <h2 className={styles.title}>Sign In to Your Account</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="assistantcode" className={styles.label}>Assistant Code</label>
            <input
              type="text"
              id="assistantcode"
              className={styles.input}
              placeholder="Assistant Code"
              value={assistantCode}
              onChange={handleAssistantCodeChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <div className={styles.passwordContainer}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className={styles.input}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className={styles.toggleButton}
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.signInButton}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
