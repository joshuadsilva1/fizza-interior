import './WorkPage.css';
import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent
} from 'framer-motion';

import roseatehotel from './assets/image/roseatehotel.jpg';
import sixsenses from './assets/image/sixsenses.jpg';
import parkindore from './assets/image/parkindoreupscale.jpg';
import denhotel from './assets/image/denhotelupscale.jpg';
import roseatehouse from './assets/image/roseatehouse.jpg';
import marriottsurat from './assets/image/marriottsurat.jpg';
import marriotindore from './assets/image/marriotindoreupscale.jpg';
import oberoimumbai from './assets/image/oberoimumbaiupscale.jpg';

const projects = [
  { id: 1, title: 'The Roseate Hotel', location: 'New Delhi', client: 'Hospitality', img: roseatehotel },
  { id: 2, title: 'Six Senses Fort Barwara', location: 'Sawai Madhavpur, Rajasthan', client: 'Hospitality', img: sixsenses },
  { id: 3, title: 'The Park Indore', location: 'Indore, Madhya Pradesh', client: 'Hospitality', img: parkindore },
  { id: 4, title: 'DEN Hotel', location: 'Bangalore, Karnataka', client: 'Hospitality', img: denhotel },
  { id: 5, title: 'Roseate House', location: 'Aerocity, New Delhi', client: 'Hospitality', img: roseatehouse },
  { id: 6, title: 'Marriott', location: 'Surat, Gujarat', client: 'Hospitality', img: marriottsurat },
  { id: 7, title: 'Marriott', location: 'Indore, Madhya Pradesh', client: 'Hospitality', img: marriotindore },
  { id: 8, title: 'Oberoi', location: 'Mumbai, Maharashtra', client: 'Hospitality', img: oberoimumbai }
];

export default function WorkPage() {
  const [centerThumbnails, setCenterThumbnails] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
const [selectedProject, setSelectedProject] = useState(null);
  const lenisRef = useRef(null);
  

  const { scrollYProgress } = useScroll();

  // Thumbnail vertical scroll AFTER 15%
  const thumbnailScroll = useTransform(
  scrollYProgress,
  [0, 1],
  ["0%", "-50%"] // Use percentages for more reliable movement
);

  const thumbnailY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowBackToTop(latest > 0.1);
    // setCenterThumbnails(latest > 0.15);
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1.5,
      smoothTouch: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, { duration: 1.5 });
  };

  const handleThumbnailClick = (index) => {
  setCenterThumbnails(false);

  // wait for animation to finish before scrolling
  setTimeout(() => {
    lenisRef.current?.scrollTo(index * window.innerHeight, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4)
    });
  }, 600); // matches transition timing
};

  return (
    <>
      <button className="menu-trigger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      <AnimatePresence>
  {isMenuOpen && (
    <motion.nav 
      className="nav-overlay"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      style={{ pointerEvents: 'auto' }}
    >
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/product">Product</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/careers">Careers</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </motion.nav>
  )}
</AnimatePresence>

      {/* Fullscreen projects */}
    <motion.section className="work-container">
        {projects.map((proj, i) => (
          <ProjectCard
            key={proj.id}
            project={proj}
            index={i}
            setActiveIndex={setActiveIndex}
            setSelectedProject={setSelectedProject} // Add this line
          />
        ))}
      </motion.section>

      {/* Thumbnail sidebar */}
     <motion.div
  className="thumbnail-sidebar"
  style={{
    y: thumbnailScroll, // Ensure this is active
    pointerEvents: "auto",
    opacity: 1
  }}
  transition={{
    duration: 0.6,
    ease: [0.76, 0, 0.24, 1]
  }}
>
        {projects.map((proj, i) => (
          <div
            key={proj.id}
            className={`thumbnail-container ${activeIndex === i ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(i)}
          >
            <motion.img
              layoutId={`thumb-${proj.id}`} 
              style={{ y: thumbnailY }}
              src={proj.img}
              alt={proj.title}
              className="thumbnail-image"
            />
          </div>
        ))}

       {centerThumbnails && (
  <div className="thumbnail-counter">
    {activeIndex + 1}
    <span className="counter-line"></span>
    {projects.length}
  </div>
)}
      </motion.div>
      <AnimatePresence>
  {showBackToTop && (
    <motion.button 
      className="back-to-top"
      onClick={scrollToTop}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      style={{ color: '#ffffff', borderColor: '#ffffff' }}
    >
      ↑
    </motion.button>
  )}
</AnimatePresence>
    </>
  );
}

function ProjectCard({ project, index, setActiveIndex, setSelectedProject }) {
  const ref = useRef(null);
  
  

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const objectPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["center 100%", "center 0%"]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.6, 1, 0.6]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.3 && latest < 0.7) {
      setActiveIndex(index);
    }
  });

  return (
    <div ref={ref} className="project-wrapper" onClick={() => setSelectedProject(project)}>
      <motion.div className="project-image-container">
        <motion.img
          layoutId={`main-${project.id}`} /* Change 'project' to 'main' */
          style={{ objectPosition }}
          src={project.img}
          alt={project.title}
          className="project-image"
        />
      </motion.div>
      <div className="project-info">
        <h3>{project.client}</h3>
        <h2>{project.title}</h2>
        <p style={{ color: '#ffffff', opacity: 0.8 }}>
          {project.location}
        </p>
      </div>
    </div>
  );
}