
// Main application component that sets up routing and global providers
// المكون الرئيسي للتطبيق الذي يعد التوجيه والموفرين العالميين

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThemeToggle from "./components/ThemeToggle";

// Create a QueryClient instance for managing API data
// إنشاء نموذج QueryClient لإدارة بيانات واجهة برمجة التطبيقات
const queryClient = new QueryClient();

// Root application component with all providers and routing setup
// مكون التطبيق الجذري مع جميع الموفرين وإعداد التوجيه
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Global toast notifications | إشعارات منبثقة عالمية */}
      <Toaster />
      <Sonner />
      
      {/* Theme toggle button in top right | زر تبديل السمة في الأعلى يمين */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Application routing setup | إعداد توجيه التطبيق */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Catch-all route for 404 errors | مسار شامل لأخطاء 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
