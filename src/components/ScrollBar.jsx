import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = (e) => {
      const target = e.target;

      // 1. Check if the thing scrolling is your horizontal Product Page
      if (target.classList && target.classList.contains('horizontal-scroll-container')) {
        const { scrollLeft, scrollWidth, clientWidth } = target;
        setProgress(scrollLeft / (scrollWidth - clientWidth) || 0);
        return;
      }

      // 2. Otherwise, calculate standard vertical scrolling (About, Contact, Work)
      if (target === document || target === window) {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        setProgress(scrollTop / (scrollHeight - clientHeight) || 0);
      }
    };

    // The 'true' at the end is the secret sauce. It captures scroll events from ALL elements, 
    // even divs with overflow: hidden, allowing it to track your horizontal slider.
    window.addEventListener('scroll', calculateProgress, true);

    return () => {
      window.removeEventListener('scroll', calculateProgress, true);
    };
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '6px', // Thickness of the bar
        backgroundColor: '#000000', // Black as requested
        transformOrigin: '0%',
        zIndex: 999999, // Stays above your navigation menu and fullscreen overlays
      }}
      animate={{ scaleX: progress }}
      transition={{ ease: "linear", duration: 0.1 }}
    />
  );
}