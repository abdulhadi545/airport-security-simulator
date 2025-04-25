
import React from 'react';
import { Shield, AlertTriangle, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { getTranslation } from '../utils/translations';
import ThemeToggle from './ThemeToggle';

// مكون ترويسة المحاكاة - يعرض عنوان المحاكاة والحالة الحية
const SimulationHeader: React.FC = () => {
  return (
    <motion.div 
      className="flex items-center justify-between mb-4 bg-security-primary text-white p-4 rounded-lg shadow-lg"
      // حركات البداية - تظهر العنصر تدريجيا من أعلى إلى أسفل
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3">
        {/* أيقونة الدرع المتحركة - تتأرجح ببطء */}
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <Shield className="h-8 w-8 text-white" />
        </motion.div>
        <div>
          {/* عنوان المحاكاة - يعرض بالإنجليزية والعربية */}
          <h1 className="text-xl font-bold">
            {getTranslation('simulator.title', 'en')} / {getTranslation('simulator.title', 'ar')}
          </h1>
          {/* وصف المحاكاة - يعرض بالإنجليزية والعربية */}
          <p className="text-sm opacity-80">
            {getTranslation('simulator.description', 'en')} / {getTranslation('simulator.description', 'ar')}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        {/* مؤشر الحالة الحية - يتوهج ويتضخم بشكل دوري */}
        <motion.div 
          className="text-sm bg-white text-security-primary px-3 py-1 rounded-full font-medium mr-2 flex items-center"
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: [
              "0px 0px 0px rgba(0,0,0,0)",
              "0px 0px 8px rgba(255,255,255,0.5)",
              "0px 0px 0px rgba(0,0,0,0)"
            ]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="mr-1">{getTranslation('simulator.liveStatus', 'en')} / {getTranslation('simulator.liveStatus', 'ar')}</span>
          <Plane className="h-3 w-3" />
        </motion.div>
        {/* أيقونة التحذير - تومض */}
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <AlertTriangle className="h-5 w-5 text-security-warning" />
        </motion.div>
        {/* إضافة زر تبديل السمة */}
        <div className="ml-2">
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
};

export default SimulationHeader;
