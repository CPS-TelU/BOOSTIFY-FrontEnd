import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import Navbar from '../components/Navbar';
import HomeNav from '../components/HomeNav';
import Footer from '../components/Footer';
import FeatureCard from '@/components/FeatureCard';
import { FaSmile, FaShieldAlt, FaChartLine, FaThumbsUp } from 'react-icons/fa';
import { useTheme } from '../styles/ThemeContext';

const About: React.FC = () => {
  const { data: session, status } = useSession(); // Use useSession to check authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Update isAuthenticated state based on session status
    setIsAuthenticated(status === 'authenticated');
  }, [status]);

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-[#] text-gray-300' : 'bg-white text-black'}`}>
      {/* Conditionally render HomeNav or Navbar based on isAuthenticated state */}
      {isAuthenticated ? <HomeNav /> : <Navbar />}
      
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-0">
        <section className={`text-center my-12 sm:my-16 md:my-20 lg:my-24 xl:my-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">FEATURES</h2>
        </section>

        {/* First Section: How It Works */}
        <section className={`flex flex-col md:flex-row items-center justify-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 ${isDarkMode}`}>
          <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-[#EAD196] rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-800 mb-4">HOW DOES IT WORK?</h3>
            <ul className="list-none p-0 m-0 text-left">
              <li className="mb-2 flex items-center text-gray-700">
                <Image src="/standImg.png" alt="stand" className="mr-4" width={24} height={24} /> Stand in front of Boostify
              </li>
              <li className="mb-2 flex items-center text-gray-700">
                <Image src="/smileImg.png" alt="Smile" className="mr-4" width={24} height={24} /> Smile to the camera
              </li>
              <li className="mb-2 flex items-center text-gray-700">
                <Image src="/checkImg.png" alt="Check" className="mr-4" width={24} height={24} /> Presence completes when emoticon appears
              </li>
            </ul>
          </div>
          <Image src="/boostify-device.png" alt="Boostify Device" className="w-full max-w-xs mt-6 md:mt-0 md:ml-8 lg:ml-10 xl:ml-12 mb-8" width={300} height={200} />
        </section>

        {/* Second Section: Boostify Features */}
        <section className={`flex flex-col md:flex-row items-center justify-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 ${isDarkMode}`}>
          <Image src="/boostify-device2.png" alt="Boostify Device2" className="w-full max-w-xs mb-8 md:mb-0 md:mr-8 lg:mr-10 xl:mr-12" width={300} height={200} />
          <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-[#EAD196] rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-800 mb-4">BOOSTIFY FEATURES</h3>
            <ul className="list-none p-0 m-0 text-left">
              <li className="mb-2 flex items-center text-gray-700">
                <Image src="/playImg.png" alt="Play" className="mr-4" width={24} height={24} /> TFT Display
              </li>
              <li className="mb-2 flex items-center text-gray-700">
                <Image src="/playImg.png" alt="Play" className="mr-4" width={24} height={24} /> Web Integration
              </li>
              <li className="mb-2 flex items-center text-gray-700">
                <Image src="/playImg.png" alt="Play" className="mr-4" width={24} height={24} /> Speaker
              </li>
              <li className="mb-2 flex items-center text-gray-700">
                <Image src="/playImg.png" alt="Play" className="mr-4" width={24} height={24} /> Anti Spoofing Protection
              </li>
            </ul>
          </div>
        </section>

        {/* Vertical Feature Cards */}
        <section className={`flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
          <div className="flex flex-col gap-8 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full">
            <FeatureCard
              title="Happiness and Productivity"
              description="Smiles have a positive effect on mood and productivity. BOOSTIFY integrates happiness in the attendance process."
              icon={<FaSmile size={30} color="#7D0A0A" />}
            />
            <FeatureCard
              title="High Security"
              description="Anti-spoofing system ensures the security of attendance data with advanced facial recognition technology."
              icon={<FaShieldAlt size={30} color="#7D0A0A" />}
            />
            <FeatureCard
              title="Ease of Monitoring"
              description="Live reports and attendance data recap make it easy for management to monitor attendance in real-time."
              icon={<FaChartLine size={30} color="#7D0A0A" />}
            />
            <FeatureCard
              title="Positive Feedback"
              description="A pleasant feedback voice makes the attendance process a positive and motivating experience."
              icon={<FaThumbsUp size={30} color="#7D0A0A" />}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
