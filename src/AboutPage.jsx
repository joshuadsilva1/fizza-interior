import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import './AboutPage.css';
import Menu from './Menu';

// Placeholder high-end textures/interiors
const textures = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" // Fixed modern office
];

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="about-container" ref={containerRef}>
      <Menu variant="dark" />
      {/* SECTION 1: THE HERO SPLIT */}
      <section className="about-hero">
        <div className="hero-left">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            FIZZA<br/><span>INTERIORS</span>
          </motion.h1>
          <p className="location-tag">MUMBAI, INDIA — EST. SINCE YEARS</p>
        </div>
        <div className="hero-right">
          <motion.div 
            className="hero-image-wrapper"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* REPLACE standard img with this */}
            <ParallaxImage src={textures[0]} alt="Fizza Interior Wood" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE MANIFESTO */}
      <section className="about-manifesto">
        <div className="manifesto-content">
          <h2 className="section-label">01 / OUR STORY</h2>
          <p className="large-text">
            We are a <span>dedicated company</span> frequently motivated to source, innovate, and bring new trends to the 
            architectural industry. Supported by years of experience, we know the current and future market needs.
          </p>
          <p className="sub-text">
            Today, FIZZA stands as one of the largest interior decorative panels companies in India, 
            operating entirely under one roof—from sales and billing to our massive manufacturing unit.
          </p>
        </div>
      </section>

      {/* SECTION 3: THE CAPABILITIES GRID */}
     <section className="capabilities-grid">
        <div className="grid-item tall">
          {/* REPLACE standard img with this */}
          <ParallaxImage src={textures[1]} alt="CNC Cutting" />
          <div className="overlay-text">
            <h3>Customized Cutting</h3>
            <p>Acrylic, Corian, Sunmica, Veneer, and ACP.</p>
          </div>
        </div>
        <div className="grid-info">
          <h2 className="section-label">02 / EXPERTISE</h2>
          <div className="capability-list">
            <div className="list-item"><span>MDF Wall Panels</span></div>
            <div className="list-item"><span>Architectural Signage</span></div>
            <div className="list-item"><span>350+ Catalog Designs</span></div>
            <div className="list-item"><span>9 Distinct Categories</span></div>
          </div>
        </div>
        <div className="grid-item wide">
          {/* REPLACE standard img with this */}
          <ParallaxImage src={textures[2]} alt="Modern Office" />
        </div>
      </section>

      {/* SECTION 4: THE MISSION */}
      <section className="about-mission">
        <div className="mission-box">
          <h2>Our Management's Intent</h2>
          <p>
            To distribute only quality products and services. We develop new ways to market our 
            products to potential clients via branded applications and competitive catalogues 
            intentional to boost commercial and residential decor.
          </p>
          <button className="contact-cta">Get the Catalogue</button>
        </div>
      </section>

      <footer className="about-footer">
        <p>© 2026 FIZZA INTERIORS & SIGNAGE. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}


function ParallaxImage({ src, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  // Moves the image slightly opposite to the scroll direction
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y }} 
      />
    </div>
  );
}