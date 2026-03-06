import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Preloader.css'; // We will create this next

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    let interval;

    // Simulate loading progress
    const updateProgress = () => {
      currentProgress += Math.floor(Math.random() * 10) + 1; // Random jump for realism
      if (currentProgress > 90) {
        currentProgress = 90; // Hold at 90% until all images/assets actually load
      }
      setProgress(currentProgress);
    };

    interval = setInterval(updateProgress, 100);

    // When the whole window (including images) is fully loaded
    const handleComplete = () => {
      clearInterval(interval);
      setProgress(100);
      // Wait a split second at 100% for a polished feel
      setTimeout(() => {
        onComplete();
      }, 600); 
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleComplete);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="premium-preloader"
      initial={{ y: 0 }}
      // This cubic-bezier creates that buttery smooth "Apple" slide up effect
      exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="preloader-content">
        <span className="preloader-brand">FIZZA INTERIORS</span>
        <div className="preloader-counter">{progress}%</div>
      </div>
    </motion.div>
  );
}