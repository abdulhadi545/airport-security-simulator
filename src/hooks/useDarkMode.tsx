
import { useEffect, useState } from 'react';

// خطاف الوضع المظلم - يوفر التحكم في الوضع المظلم والمضيء للتطبيق
export function useDarkMode() {
  // استخدام قيمة localStorage كحالة أولية إذا كانت متاحة، وإلا التحقق من تفضيل النظام
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // التحقق من وجود قيمة محفوظة في التخزين المحلي
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    // استخدام تفضيل النظام كقيمة افتراضية
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // تأثير جانبي لتحديث صنف المستند وحفظ الإعداد عند تغيير وضع السمة
  useEffect(() => {
    // تحديث صنف المستند عند تغيير الوضع المظلم
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // حفظ الإعداد في التخزين المحلي
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  // دالة تبديل الوضع المظلم/المضيء
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // إرجاع الحالة الحالية ودالة التبديل
  return { isDarkMode, toggleDarkMode };
}
