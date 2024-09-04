import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from './ThemeContext'; // Pastikan path ini sesuai
import { SessionProvider } from 'next-auth/react';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
