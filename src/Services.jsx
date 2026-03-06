import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion } from 'framer-motion';
import Menu from './Menu';
import './PageStyles.css';// Assuming you'll route a shared CSS file for these text pages

export default function Services() {
  
  // --- ADD THIS LENIS SETUP ---
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
  // ----------------------------

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
          <h1>Our Services</h1>
          <p className="subtitle">Delivering consistent, high-quality interior decorative panels.</p>
        </div>

        <div className="page-content">
          <section className="text-block">
            <p>
              <strong>FIZZA INTERIOR & SIGNAGE</strong> is one of the largest interior decorative panels companies in India. Our range of tools includes machines of wide-ranging capacities; this makes sure that jobs of varying scale and consistently high quality can be delivered on time and in a cost-effective manner. Since all our operations exist under one roof, we are able to ensure strict quality control and can deliver all jobs in a quick turnaround time. Improvement and research in interior decorative panels have been our motivating principles. Our internal processes and systems are fully equipped to deliver the highest quality products.
            </p>
          </section>

          <section className="text-block">
            <p>
              We offer more than 350 designs in MDF panels, available in any large quantity anywhere in India and abroad. We also provide customized (make-to-order) sizes for the same designs. Besides our readymade catalogue designs, we accept other materials like <strong>Plywood, Wood, Corian, Veneer, Laminates, Acrylic, and ACP</strong> for CNC cutting at highly competitive rates.
            </p>
          </section>

          <section className="text-block">
            <p>
              Our deep interest in quality control and excellence has meant that we have long-standing relationships with our clients, dealers, distributors, retailers, and customers in India and abroad. We are therefore in a position to source a wide range of interior decorative panels' samples in a short time and advise our clients on the same.
            </p>
          </section>
        </div>
      </motion.div>
    </>
  );
}