
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../hooks/useDarkMode';

// مكون زر تبديل السمة - للتنقل بين الوضع المظلم والوضع المضيء
const ThemeToggle: React.FC = () => {
  // استخدام خطاف الوضع المظلم للحصول على الحالة الحالية والدالة المسؤولة عن التبديل
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      // تأثيرات حركية عند التحويم والنقر
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      // تطبيق أنماط مختلفة حسب الوضع الحالي (مظلم أو مضيء)
      className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-blue-100 text-blue-800'}`}
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      {/* عرض أيقونة الشمس في الوضع المظلم وأيقونة القمر في الوضع المضيء */}
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
};

export default ThemeToggle;
