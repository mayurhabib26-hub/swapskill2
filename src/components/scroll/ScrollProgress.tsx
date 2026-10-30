import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3.5px] z-[9999] pointer-events-none bg-transparent">
      {/* Ambient background track */}
      <div className="absolute inset-0 bg-[#063F83]/5" />

      {/* Spring-animated gradient progress bar */}
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#063F83] via-[#16845B] to-[#5EEAD4] shadow-[0_0_12px_rgba(22,132,91,0.5)]"
        style={{ scaleX }}
      />
    </div>
  );
};
