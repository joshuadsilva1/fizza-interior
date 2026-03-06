import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import './ContactPage.css';
import Menu from './Menu';

export default function ContactPage() {
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="contact-wrapper">
      <Menu variant="dark" />

      <motion.div 
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="contact-header" variants={itemVariants}>
          <h1>Let's build<br/>something timeless.</h1>
          <p>Whether you're looking for custom MDF panels, architectural signage, or bespoke CNC cutting, our team is ready to assist.</p>
        </motion.div>

        <div className="contact-split">
          
          {/* Left Side: Info */}
          <motion.div className="contact-info" variants={itemVariants}>
            <div className="info-block">
              <h3>Headquarters</h3>
              <p>Fizza Interiors & Signage</p>
              <p>123 Architectural District</p>
              <p>Mumbai, Maharashtra, India</p>
            </div>
            
            <div className="info-block">
              <h3>Inquiries</h3>
              <p><a href="mailto:hello@fizzainteriors.com">hello@fizzainteriors.com</a></p>
              <p><a href="tel:+919876543210">+91 98765 43210</a></p>
            </div>

            <div className="info-block">
              <h3>Socials</h3>
              <div className="social-links">
                <a href="#instagram">Instagram</a>
                <a href="#linkedin">LinkedIn</a>
                <a href="#pinterest">Pinterest</a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div className="contact-form-container" variants={itemVariants}>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="John Doe" required />
              </div>
              
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="john@company.com" required />
              </div>
              
              <div className="input-group">
                <label htmlFor="interest">Area of Interest</label>
                <select id="interest" required>
                  <option value="">Select a service...</option>
                  <option value="mdf">MDF Wall Panels</option>
                  <option value="cnc">Custom CNC Cutting</option>
                  <option value="signage">Architectural Signage</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Tell us about your project..." required></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </motion.div>
          
        </div>
      </motion.div>
    </div>
  );
}