
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../hooks/useDarkMode';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-blue-100 text-blue-800'}`}
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
};

export default ThemeToggle;
