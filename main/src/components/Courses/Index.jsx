import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './Style.module.css';

gsap.registerPlugin(ScrollTrigger);

const courseData = [
  {
    id: 1,
    title: "Business Analyst Internship",
    rating: 5,
    description: "Gain practical business analysis skills by working on real-world projects. Learn to gather requirements, analyze data, and create business solutions.",
    icon: "💼",
    color: "#3b82f6",
    duration: "3 months"
  },
  {
    id: 2,
    title: "Front-End Development",
    rating: 5,
    description: "Kickstart your journey into web development by mastering HTML, CSS, JavaScript, and modern frameworks like React.",
    icon: "🖥️",
    color: "#8b5cf6",
    duration: "3 months"
  },
  {
    id: 3,
    title: "Ethical Hacking",
    rating: 5,
    description: "Gain practical skills in ethical hacking using Kali Linux. Learn penetration testing, vulnerability assessment, and security techniques.",
    icon: "🔐",
    color: "#10b981",
    duration: "4 months"
  },
  {
    id: 4,
    title: "Full Stack Development",
    rating: 5,
    description: "Master web development from the ground up with both front-end and back-end technologies. Build complete, functional web applications.",
    icon: "⚛️",
    color: "#6366f1",
    duration: "6 months"
  },
  {
    id: 5,
    title: "AI & Machine Learning",
    rating: 5,
    description: "Build a strong foundation in artificial intelligence and machine learning. Work on practical AI projects and algorithms.",
    icon: "🤖",
    color: "#0ea5e9",
    duration: "5 months"
  },
  {
    id: 6,
    title: "Data Analyst",
    rating: 5,
    description: "Learn how to collect, clean, analyze, and visualize data to derive meaningful insights for business decision-making.",
    icon: "📊",
    color: "#f59e0b",
    duration: "3 months"
  },
  {
    id: 7,
    title: "Offensive Cyber Security",
    rating: 5,
    description: "Dive deep into the world of ethical hacking and offensive security. Learn to identify and exploit vulnerabilities safely.",
    icon: "🛡️",
    color: "#64748b",
    duration: "4 months"
  },
  {
    id: 8,
    title: "Data Science",
    rating: 5,
    description: "Master the fundamentals of data science by working with real datasets. Learn statistical analysis, machine learning, and data visualization.",
    icon: "📈",
    color: "#14b8a6",
    duration: "5 months"
  },
  {
    id: 9,
    title: "Web Development",
    rating: 5,
    description: "Learn to build dynamic, responsive websites with modern web technologies. Create professional web applications from scratch.",
    icon: "🌐",
    color: "#06b6d4",
    duration: "3 months"
  },
  {
    id: 10,
    title: "DevOps Engineering",
    rating: 5,
    description: "Learn CI/CD pipelines, containerization, cloud infrastructure, and automation to streamline software development and deployment.",
    icon: "⚙️",
    color: "#f97316",
    duration: "4 months"
  },
  {
    id: 11,
    title: "Mobile App Development",
    rating: 5,
    description: "Build native and cross-platform mobile applications using React Native, Flutter, and other modern frameworks.",
    icon: "📱",
    color: "#ec4899",
    duration: "4 months"
  },
  {
    id: 12,
    title: "Cloud Computing",
    rating: 5,
    description: "Master AWS, Azure, or Google Cloud platforms. Learn to deploy, manage, and scale applications in the cloud.",
    icon: "☁️",
    color: "#3b82f6",
    duration: "3 months"
  },
  {
    id: 13,
    title: "Blockchain Development",
    rating: 5,
    description: "Learn to build decentralized applications and smart contracts using blockchain technologies like Ethereum and Solidity.",
    icon: "🔗",
    color: "bg-purple-500",
    border: "border-purple-200",
    duration: "5 months"
  },
  {
    id: 14,
    title: "Digital Marketing",
    rating: 5,
    description: "Master SEO, content marketing, social media strategies, and analytics to drive business growth through digital channels.",
    icon: "📣",
    color: "bg-green-500",
    border: "border-green-200",
    duration: "3 months"
  },
  {
    id: 15,
    title: "UI/UX Design",
    rating: 5,
    description: "Learn user research, wireframing, prototyping, and design principles to create intuitive and engaging user experiences.",
    icon: "🎨",
    color: "bg-indigo-500",
    border: "border-indigo-200",
    duration: "4 months"
  }
];

function Courses({ onBackToMain }) {
  const coursesRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);
  const headingRef = useRef(null);
  const blurLayerRef = useRef(null);

  // Track mouse position for custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Move blur layer with mouse for dynamic effect
      if (blurLayerRef.current && headingRef.current) {
        const headingRect = headingRef.current.getBoundingClientRect();
        const centerX = headingRect.left + headingRect.width / 2;
        const centerY = headingRect.top + headingRect.height / 2;
        
        // Calculate distance from center
        const distX = (e.clientX - centerX) / 20;
        const distY = (e.clientY - centerY) / 20;
        
        // Apply transform to blur layer
        gsap.to(blurLayerRef.current, {
          x: distX,
          y: distY,
          duration: 1,
          ease: "power2.out"
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Apply mouse position to custom cursor
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  }, [mousePosition]);

  useEffect(() => {
    // Create text animation by splitting characters
    const createTextAnimation = () => {
      var clutter = "";
      const para = document.querySelector(".courses-heading");
      if (para) {
        const characters = para.textContent.split("");
        characters.forEach(function(e) {
          clutter += `<span>${e}</span>`;
        });
        para.innerHTML = clutter;
        
        gsap.set(".courses-heading span", { opacity: 0, y: 50 });
        gsap.to(".courses-heading span", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power3.out"
        });
      }
    };

    // Animation for the subheading
    const subheadingAnimation = () => {
      const subheading = document.querySelector(".courses-subheading");
      if (subheading) {
        gsap.from(subheading, {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.5,
          ease: "power3.out"
        });
      }
    };

    // Animated heading blur effect
    const headingBlurAnimation = () => {
      if (headingRef.current && blurLayerRef.current) {
        // Initial animation
        gsap.fromTo(blurLayerRef.current, 
          { opacity: 0, scale: 0.8 },
          { 
            opacity: 0.8, 
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)"
          }
        );
        
        // Continuous subtle animation
        gsap.to(blurLayerRef.current, {
          scale: 1.05,
          opacity: 0.7,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };

    // Staggered animation for course cards with 3D effect
    const cardsAnimation = () => {
      gsap.from(".course-card", {
        scrollTrigger: {
          trigger: ".courses-grid",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        rotateX: 15,
        rotateY: -5,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });

      // Add floating animation to cards
      const cards = document.querySelectorAll(".course-card");
      cards.forEach((card, index) => {
        // Create random values for each card to make the animation unique
        const randomY = 5 + Math.random() * 5;
        const randomDuration = 2 + Math.random() * 1;
        const randomDelay = index * 0.2;
        
        // Apply floating animation
        gsap.to(card, {
          y: `-=${randomY}`,
          duration: randomDuration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: randomDelay
        });
      });
    };

    // Floating animation for course icons with random timing
    const iconsAnimation = () => {
      const icons = document.querySelectorAll(".course-icon");
      icons.forEach((icon, index) => {
        const randomDelay = index * 0.2;
        const randomDuration = 1.5 + Math.random() * 1;
        
        gsap.to(icon, {
          y: -8,
          duration: randomDuration,
          delay: randomDelay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    };

    // Particle animation
    const createParticles = () => {
      const particles = document.querySelectorAll('.course-particle');
      particles.forEach((particle, i) => {
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        
        gsap.set(particle, {
          x: randomX,
          y: randomY,
          scale: Math.random() * 0.5 + 0.5
        });
        
        gsap.to(particle, {
          x: '+=' + (Math.random() * 200 - 100),
          y: '+=' + (Math.random() * 200 - 100),
          opacity: Math.random() * 0.7 + 0.3,
          duration: Math.random() * 5 + 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    };

    // 3D grid background animation
    const gridAnimation = () => {
      gsap.to(".grid3d", {
        backgroundPosition: "0 40px",
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    };

    // Run animations
    createTextAnimation();
    subheadingAnimation();
    headingBlurAnimation();
    cardsAnimation();
    iconsAnimation();
    createParticles();
    gridAnimation();

    // Animate CTA section
    gsap.from(".cta-section", {
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Animate info sections
    gsap.from(".info-column", {
      scrollTrigger: {
        trigger: ".info-section",
        start: "top 70%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: "power3.out"
    });

    // Animate process steps
    gsap.from(".process-step", {
      scrollTrigger: {
        trigger: ".process-list",
        start: "top 80%",
      },
      x: -50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out"
    });

    // Animate apply section
    gsap.from(".apply-section", {
      scrollTrigger: {
        trigger: ".apply-section",
        start: "top 80%",
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    return () => {
      // Cleanup animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Create particles
  const particles = [];
  for (let i = 0; i < 30; i++) {
    particles.push(<div key={i} className={`course-particle ${styles.particle}`}></div>);
  }

  // Handle card hover with 3D tilt effect
  const handleCardHover = (id) => {
    setActiveCard(id);
    
    // Add 3D tilt effect on hover
    const card = document.querySelector(`.course-card[data-id="${id}"]`);
    if (card) {
      card.addEventListener('mousemove', handleCardTilt);
    }
  };

  const handleCardLeave = () => {
    // Remove tilt effect when mouse leaves
    const card = document.querySelector(`.course-card[data-id="${activeCard}"]`);
    if (card) {
      card.removeEventListener('mousemove', handleCardTilt);
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
    }
    setActiveCard(null);
  };

  // 3D tilt effect on mouse move
  const handleCardTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={coursesRef} 
      className={styles.coursesContainer}
    >
      {/* Custom cursor */}
      <div ref={cursorRef} className={styles.customCursor} style={{ transform: `scale(${activeCard ? 1.5 : 1})` }}></div>
      
      {/* Animated background particles */}
      <div className={styles.particlesContainer}>
        {particles}
      </div>
      
      {/* 3D grid background */}
      <div className={styles.grid3d}></div>
      
      {/* Back button */}
      <motion.button
        className={styles.backButton}
        onClick={onBackToMain}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={styles.backIcon} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
      </motion.button>
      
      <div className={styles.mainContent}>
        <div className={styles.headerSection}>
          <div className="relative inline-block">
            {/* Animated blur layer */}
            <div 
              ref={blurLayerRef}
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-2xl opacity-70 z-0"
            ></div>
            
            {/* Main heading with animated characters */}
            <h1 
              ref={headingRef}
              className="courses-heading relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-sm"
            >
              Our Internship Courses
            </h1>
          </div>
          
          <p className="courses-subheading mt-6 text-gray-600">
            Gain real-world experience with our industry-focused internship programs designed to launch your tech career.
          </p>
        </div>
        
        <div className={styles.coursesGrid}>
          {courseData.map((course) => (
            <motion.div
              key={course.id}
              data-id={course.id}
              className={`course-card ${styles.courseCard} ${activeCard === course.id ? styles.activeCard : ''}`}
              style={{ '--card-color': course.color }}
              onMouseEnter={() => handleCardHover(course.id)}
              onMouseLeave={handleCardLeave}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: course.id * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.03 }}
            >
              <div className={styles.cardGlow}></div>
              <div className={styles.cardHighlight}></div>
              <div 
                className={styles.courseIcon} 
                style={{ backgroundColor: course.color }}
              >
                {course.icon}
              </div>
              <div className={styles.ratingContainer}>
                {[...Array(course.rating)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.duration}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.duration}
                </span>
                <button className={styles.learnMoreButton}>
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="cta-section">
          <motion.div
            className={styles.ctaWrapper}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="#apply" 
              className={styles.applyButton}
            >
              <span>Apply for Internship</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </div>

        <div className="info-section">
          <div className={styles.infoColumns}>
            <motion.div 
              className="info-column"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <h2>Why Choose INLIGHN TECH?</h2>
              <ul className={styles.benefitsList}>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Industry-relevant curriculum designed by experts</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Hands-on experience with real-world projects</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mentorship from industry professionals</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Verified certification upon completion</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Job placement assistance and career guidance</span>
                </motion.li>
              </ul>
            </motion.div>
            <motion.div 
              className="info-column"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <h2>Application Process</h2>
              <div className="process-list">
                <motion.div 
                  className={`process-step ${styles.processStep}`}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className={styles.processNumber}>1</div>
                  <div>
                    <h3>Submit Application</h3>
                    <p>Fill out the online application form with your details</p>
                  </div>
                </motion.div>
                <motion.div 
                  className={`process-step ${styles.processStep}`}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className={styles.processNumber}>2</div>
                  <div>
                    <h3>Assessment</h3>
                    <p>Complete a brief skills assessment relevant to your program</p>
                  </div>
                </motion.div>
                <motion.div 
                  className={`process-step ${styles.processStep}`}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className={styles.processNumber}>3</div>
                  <div>
                    <h3>Interview</h3>
                    <p>Virtual interview with our program coordinators</p>
                  </div>
                </motion.div>
                <motion.div 
                  className={`process-step ${styles.processStep}`}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className={styles.processNumber}>4</div>
                  <div>
                    <h3>Onboarding</h3>
                    <p>Selected candidates will receive an offer and onboarding details</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <div id="apply" className="apply-section">
          <h2>Ready to Start Your Journey?</h2>
          <motion.div 
            className={styles.applyCard}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 30px rgba(59, 130, 246, 0.4)",
              transition: { duration: 0.3 }
            }}
          >
            <h3>Applications for the next cohort are now open</h3>
            <p>Join thousands of successful graduates who have transformed their careers with INLIGHN TECH</p>
            <motion.button 
              className={styles.applyNowButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Courses; 