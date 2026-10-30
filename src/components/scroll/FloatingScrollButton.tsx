import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLenis } from './SmoothScroll';

export const FloatingScrollButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const { scrollTo } = useLenis();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercentage(Math.round(latest * 100));
      setIsVisible(latest > 0.08); // visible after scrolling ~8% of page
    });
  }, [scrollYProgress]);

  const handleScrollToTop = () => {
    scrollTo(0, { duration: 1.2 });
  };

  const circumference = 2 * Math.PI * 18; // radius 18
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          onClick={handleScrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#E2EAE6] shadow-[0_8px_24px_rgba(6,63,131,0.12)] hover:shadow-[0_12px_28px_rgba(6,63,131,0.2)] flex items-center justify-center group transition-transform active:scale-95"
        >
          {/* Circular SVG Scroll Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="#E2EAE6"
              strokeWidth="2.5"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="#16845B"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-150"
            />
          </svg>

          {/* Up Arrow Icon */}
          <ArrowUp className="w-4 h-4 text-[#063F83] group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
