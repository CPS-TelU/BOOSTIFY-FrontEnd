import React, { useState, useEffect } from 'react';
import styles from './SignIn.module.css';
import { useTheme } from '../pages/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { signIn, useSession, getSession } from 'next-auth/react';
import { DefaultSession } from 'next-auth';

interface CustomUser {
  id?: number;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string;
}

interface CustomSession extends DefaultSession {
  user: CustomUser;
}

const SignIn: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [assistantCode, setAssistantCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession() as { data: CustomSession };

  // Check authData in localStorage and redirect if already logged in

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      username: assistantCode,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid credentials');
    } else {
      // Get the latest session after sign-in
      const session = await getSession() as CustomSession; // Ensure type casting here
      if (session?.user?.token) {
        const userData = {
          id: session.user.id,
          name: session.user.name,
          assistant_code: session.user.email,
          token: session.user.token,
        };
        localStorage.setItem('authData', JSON.stringify(userData));
      }
      router.push('/HomePage');
    }
  };
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

  

  return (
    <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Boostify Logo" />
        <img 
          src={isDarkMode ? "/tagline-dark.png" : "/tagline.png"} 
          alt="Tagline" 
          className={styles.tagline} 
        />
      </div>
      <div className={styles.logo}></div>
      <div className={`${styles.formContainer}`}>
        <h2 className={styles.title}>Sign In to Your Account</h2>
        <form className={styles.form} onSubmit={handleSignIn}>
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
