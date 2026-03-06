import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkPage from './WorkPage';
import AboutPage from './AboutPage';
import ProductsPage from './ProductPage';
import ContactPage from './ContactPage';
// Inside your <Routes> block, add:
import Services from './Services';
import Recruitment from './Recruitment';


function App() {
  return (
    <Router>
      <Routes>
        {/* This is your main page */}
        <Route path="/" element={<WorkPage />} />
        
        {/* This is the new about page */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductsPage />} />
         <Route path="/contact" element={<ContactPage />} />
         <Route path="/services" element={<Services />} /> 
          <Route path="/recruitment" element={<Recruitment />} />
      </Routes>
    </Router>
  );
}

export default App;