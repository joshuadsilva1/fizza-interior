import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Preloader from './Preloader'; // Import the new preloader
import WorkPage from './WorkPage';
import AboutPage from './AboutPage';
import ProductsPage from './ProductPage';
import ContactPage from './ContactPage';
import Services from './Services';
import Recruitment from './Recruitment';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* AnimatePresence allows the Preloader to animate out smoothly */}
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Router basename="/fizza-interior">
        <Routes>
          <Route path="/" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<Services />} /> 
          <Route path="/recruitment" element={<Recruitment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;