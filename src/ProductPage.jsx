import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './ProductPage.css';
import Menu from './Menu';

const products = [
  {
    id: 'texture-wall-panel',
    title: 'Texture wall Panel',
    description: 'MDF Textured Wall Panels are high in demand; this textured wall is used in households, offices, and other premises for adding a unique look.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'View'
  },
  {
    id: 'wave-boards',
    title: 'Wave Boards',
    description: 'These Wave Boards have never-ending potential. MDF and natural wood. We have a wide collection of MDF Wave Boards.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'View'
  },
  {
    id: '3d-panel',
    title: '3D Panel',
    description: 'We are the Innovative to enter the market with our Eco-friendly home decor interior wall panels. 3D Panels give an extra dimension to your walls.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'View'
  },
  {
    id: 'grooved-panel',
    title: 'Grooved Panel',
    description: 'Re-create, classic match, boarding with panel Tongue & Groove. This versatile design is perfect for creating a simple timber boarded look and natural wood grain effect.',
    image: 'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'View'
  },
  {
    id: 'engraved-panel',
    title: 'Engraved Panel',
    description: 'This range is a perfect combination of contemporary and traditional designs, therefore, it enhances the look of your interior.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'View'
  },
  {
    id: 'engroo-panel',
    title: 'Engroo Panel',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'View'
  },
  {
    id: 'mashrabiya-grill',
    title: 'Mashrabiya Grill',
    description: 'First in India we provide Mashrabiya architectural fabrication decorative screens on wood.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'View'
  },
  {
    id: 'grill',
    title: 'Grill',
    description: 'We are providing excellent quality of MDF Grill Panels, which are manufactured by using high grade material.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'View'
  },
  {
    id: 'borders',
    title: 'Borders',
    description: 'MDF Borders Panels are designed and manufactured for a variety of purposes for both interior and exterior applications.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'View'
  }
];

const ParallaxImage = ({ src, alt, containerRef }) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ['start end', 'end start'] 
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <div ref={ref} className="gallery-parallax-wrapper">
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y }} 
        className="gallery-parallax-img"
      />
    </div>
  );
};

const ProductPage = () => {
  const scrollContainerRef = useRef(null);
  const overlayScrollRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    
    const handleWheel = (e) => {
      if (selectedProduct) return;
      if (Math.abs(e.deltaX) > 0) return;
      
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [selectedProduct]);

  return (
    <div className="akuko-wrapper">
      <Menu variant="dark" />

      <main className="horizontal-scroll-container" ref={scrollContainerRef}>
        
        <section className="scroll-panel intro-panel">
          <div className="intro-content">
            <h1>Innovative Interior Wall Panels & Decorative Screens</h1>
            <p>Slide to explore our latest architectural solutions, concepts, and available products.</p>
          </div>
        </section>

        {products.map((product) => (
          <section className="scroll-panel product-panel" key={product.id}>
            
            <motion.div 
              className="product-card-inner"
              layoutId={`card-container-${product.id}`}
            >
              <motion.div 
                className="image-wrapper"
                layoutId={`image-wrapper-${product.id}`}
              >
                <motion.img 
                  src={product.image} 
                  alt={product.title} 
                  className="product-image" 
                  layoutId={`image-${product.id}`} 
                />
              </motion.div>
              
              <div className="hover-info">
                <div className="info-header">
                  <h2>{product.title}</h2>
                  <button 
                    className="cta-button"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.buttonText}
                  </button>
                </div>
                <p>{product.description}</p>
              </div>

            </motion.div>

          </section>
        ))}

        <section className="scroll-panel footer-panel">
           <div className="footer-content" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="newsletter-box" style={{ flex: 'none', width: '100%', maxWidth: '500px' }}>
              <h3>Get Updates</h3>
              <p>Be the first to know about our newest panel collections and materials.</p>
              <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email *" required />
                <button type="submit">→</button>
              </form>
            </div>
          </div>
        </section>

      </main>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            className="fullscreen-detail-view"
            style={{ backgroundColor: 'transparent' }} 
            ref={overlayScrollRef} 
          >
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'var(--bg-color)',
                zIndex: -1
              }}
            />

            <motion.button 
              className="close-detail-btn" 
              onClick={() => setSelectedProduct(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              Close
            </motion.button>

            <motion.div 
              className="detail-hero-section"
              layoutId={`card-container-${selectedProduct.id}`}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                className="detail-hero-wrapper"
                layoutId={`image-wrapper-${selectedProduct.id}`}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title}
                  className="detail-hero-image"
                  layoutId={`image-${selectedProduct.id}`}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className="detail-scrollable-content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="detail-text-header">
                <h1>{selectedProduct.title}</h1>
                <p>{selectedProduct.description}</p>
              </div>

              <div className="detail-gallery">
                <ParallaxImage src={products[1].image} alt="Detail view 1" containerRef={overlayScrollRef} />
                <ParallaxImage src={products[2].image} alt="Detail view 2" containerRef={overlayScrollRef} />
                <ParallaxImage src={products[3].image} alt="Detail view 3" containerRef={overlayScrollRef} />
                <ParallaxImage src={products[4].image} alt="Detail view 4" containerRef={overlayScrollRef} />
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;