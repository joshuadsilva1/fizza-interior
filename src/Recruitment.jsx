import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion } from 'framer-motion';
import Menu from './Menu';
import './PageStyles.css';

export default function Recruitment() {

    useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1.5,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup when leaving the page
    return () => lenis.destroy();
  }, []);
  return (
    <>
      <Menu />
      <motion.div 
        className="page-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="page-header">
          <h1>Recruitment</h1>
          <p className="subtitle">Join the team at Fizza Interiors.</p>
        </div>

        <div className="page-content">
          <section className="text-block">
            <p>
              One of our key assets is our people, and as we succeed in the markets we operate in, we need to build and strengthen our foundations. We have a number of opportunities for all levels, backgrounds, and ambitions.
            </p>
          </section>

          <section className="contact-block">
            <h3>Applying for a position:</h3>
            <p>Please send your resume to our team at the emails below:</p>
            <div className="email-links">
              <a href="mailto:info@fizzainteriors.com">info@fizzainteriors.com</a>
              <a href="mailto:fizzainteriorsign@gmail.com">fizzainteriorsign@gmail.com</a>
            </div>
          </section>
        </div>
      </motion.div>
    </>
  );
}