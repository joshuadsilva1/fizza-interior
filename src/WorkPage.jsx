import './WorkPage.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
  useMotionTemplate // Add this
} from 'framer-motion';
import Menu from './Menu';

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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // --- INTRO TIMELINE PHASES ---
  const [introPhase, setIntroPhase] = useState('start');
  const lenisRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const thumbnailScroll = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const thumbnailY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowBackToTop(latest > 0.1);
  });

  // --- THE INTRO TIMELINE CONTROL ---
  useEffect(() => {
    // 1. Trigger the massive horizontal slide
    const t1 = setTimeout(() => setIntroPhase('sliding'), 100);
    // 2. Interrupt the slide halfway through and suck them into the sidebar
    const t2 = setTimeout(() => setIntroPhase('morphing'), 1800);
    // 3. Mark as done, unlock scrolling
    const t3 = setTimeout(() => setIntroPhase('done'), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // --- LENIS SCROLL SETUP ---
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

  useEffect(() => {
    if (!lenisRef.current) return;
    if (introPhase !== 'done') {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [introPhase]);

  const scrollToTop = () => lenisRef.current?.scrollTo(0, { duration: 1.5 });

  const handleThumbnailClick = (index) => {
    setTimeout(() => {
      lenisRef.current?.scrollTo((index + 1) * window.innerHeight, {
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 4)
      });
    }, 600); 
  };

  return (
    <>
      <Menu />
      
      {/* 1. THE BLURRED CURTAIN OVERLAY */}
      <motion.div 
        className="intro-curtain"
        initial={{ x: 0 }}
        animate={{ x: (introPhase === 'morphing' || introPhase === 'done') ? '-100vw' : '0' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* 2. HERO SECTION */}
      <section className="work-hero">
        <div className="work-hero-bg">
          <motion.img 
            src={parkindore} 
            alt="Fizza Interiors Hero"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-left">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            FIZZA<br/><span>INTERIORS</span>
          </motion.h1>
          <p className="location-tag">MUMBAI, INDIA — OUR PORTFOLIO</p>
        </div>
      </section>

      {/* 3. FULLSCREEN PROJECTS */}
      <motion.section className="work-container">
        {projects.map((proj, i) => (
          <ProjectCard
            key={proj.id}
            project={proj}
            index={i}
            setActiveIndex={setActiveIndex}
            setSelectedProject={setSelectedProject} 
          />
        ))}
      </motion.section>


<motion.div
        layout="position"
        className={`thumbnail-sidebar ${introPhase === 'morphing' || introPhase === 'done' ? 'is-column' : 'is-track-visible'}`}
        initial={{ x: '100vw' }}
        animate={{ x: introPhase === 'start' ? '100vw' : introPhase === 'sliding' ? '-20vw' : 0 }}
        style={{
          y: thumbnailScroll, 
          pointerEvents: introPhase === 'done' ? "auto" : "none"
        }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {projects.map((proj, i) => {
          const isLarge = introPhase === 'start' || introPhase === 'sliding';
          return (
            <motion.div
              key={proj.id}
              layout
              className={`thumbnail-container ${isLarge ? 'is-large' : 'is-small'} ${activeIndex === i ? 'active' : ''}`}
              onClick={() => introPhase === 'done' && handleThumbnailClick(i)}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img
                layout
                layoutId={`thumb-${proj.id}`} 
                src={proj.img}
                alt={proj.title}
                className="thumbnail-image"
                style={{ y: thumbnailY }} 
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          );
        })}
        {/* The old counter has been completely removed from here */}
      </motion.div>
      
      {/* --- FLOATING ANIMATED COUNTER --- */}
      <AnimatePresence>
        {introPhase === 'done' && (
          <motion.div 
            className="fixed-thumbnail-counter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The sliding active digit */}
            {/* The sliding active digit */}
            <div className="counter-digit-wrapper">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={activeIndex} 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  /* INCREASED DURATION HERE */
                  transition={{ duration: 1.5}}
                  className="counter-digit"
                >
                  {activeIndex + 1}
                </motion.span>
              </AnimatePresence>
            </div>

            <span className="counter-line"></span>
            
            <span className="counter-total">{projects.length}</span>
          </motion.div>
        )}
      </AnimatePresence>

      
      {/* 5. BACK TO TOP */}
      <AnimatePresence>
        {showBackToTop && introPhase === 'done' && (
          <motion.button 
            className="back-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const objectPosition = useTransform(scrollYProgress, [0, 1], ["center 100%", "center 0%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.3 && latest < 0.7) setActiveIndex(index);
  });

  return (
    <div ref={ref} className="project-wrapper" onClick={() => setSelectedProject(project)}>
      <motion.div className="project-image-container">
        <motion.img layoutId={`main-${project.id}`} style={{ objectPosition }} src={project.img} alt={project.title} className="project-image" />
      </motion.div>
      <div className="project-info">
        <h3>{project.client}</h3>
        <h2>{project.title}</h2>
        <p style={{ color: '#ffffff', opacity: 0.8 }}>{project.location}</p>
      </div>
    </div>
  );
}