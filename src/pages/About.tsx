import React from 'react';
import { motion } from 'framer-motion';
import AboutSection from '../components/sections/AboutSection/AboutSection';

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <AboutSection />
    </motion.div>
  );
};

export default About;