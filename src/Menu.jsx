import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './MenuList.css';
import ScrollProgress from './components/ScrollBar';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      
      {/* 1. Trigger is just the base class. No black/white variants. */}
      <button 
        className="menu-trigger" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            className="nav-overlay"
            /* 2. ONLY opacity. No x or y animations, which break the blend mode */
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: 'auto' }} 
          >
            <ul>
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
              <li><Link to="/product" onClick={() => setIsMenuOpen(false)}>Product</Link></li>
              <li><Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
              <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
              <li><Link to="/recruitment" onClick={() => setIsMenuOpen(false)}>Recruitment</Link></li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}