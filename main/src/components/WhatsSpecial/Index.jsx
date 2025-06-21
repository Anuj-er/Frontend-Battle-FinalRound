import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './Style.module.css';

gsap.registerPlugin(ScrollTrigger);

function WhatsSpecial({ onBackToMain }) {
  const specialRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState([false, false, false]);

  const testimonials = [
    {
      id: 1,
      name: "Niha Anjum",
      position: "Cyber Security Intern",
      image: "/img/testimonial1.jpg", // Replace with actual image path
      text: "I really appreciate the hands-on approach, even in the early stages - there are plenty of projects that make the concepts more practical and engaging. The video explanations are clear and easy to follow, which helps a lot, especially when diving into technical topics."
    },
    {
      id: 2,
      name: "Garima Pandey",
      position: "Data Analyst Intern",
      image: "/img/testimonial2.jpg", // Replace with actual image path
      text: "I gained valuable hands-on experience at Inlighn Tech, where I enhanced my skills by developing a project portfolio using Jupyter Notebook, SQL, MS Excel, and Power BI. I also created interactive dashboards to provide insights into datasets."
    },
    {
      id: 3,
      name: "Vignesh",
      position: "Business Analyst Intern",
      image: "/img/testimonial3.jpg", // Replace with actual image path
      text: "I interned in Business Analysis at INLIGHN TECH, where I gained hands-on experience in Market Research, Business Intelligence, and Financial Analysis. The training and projects provided deep insights into business strategies, and I developed strong analytical and problem-solving skills."
    },
    {
      id: 4,
      name: "Hariharan Rajendaran",
      position: "Full-Stack Developer Intern",
      image: "/img/testimonial4.jpg", // Replace with actual image path
      text: "At INLIGHN TECH, I completed my Full-Stack Development internship, where I worked on React, Node.js, MongoDB, and API development. I built web applications from scratch, which helped me understand both frontend and backend development. The real-world exposure and expert guidance made me industry-ready."
    },
    {
      id: 5,
      name: "Athira Nair",
      position: "Data Analyst Intern",
      image: "/img/testimonial5.jpg", // Replace with actual image path
      text: "I am grateful for the opportunity I had during this internship. I worked remotely, using the Inlighn Tech platform's LMS, which offers a structured curriculum including video lectures, notes, and projects. I'm thankful for the experience and the skills I've gained."
    }
  ];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Analytics Dashboard",
      description: "A comprehensive data visualization project analyzing customer behavior and sales trends",
      image: "/img/project1.jpg" // Replace with actual image path
    },
    {
      id: 2,
      title: "Cybersecurity Threat Detection System",
      description: "An AI-powered system to identify and mitigate potential security vulnerabilities",
      image: "/img/project2.jpg" // Replace with actual image path
    },
    {
      id: 3,
      title: "Full-Stack Web Application",
      description: "A responsive web application with user authentication and database integration",
      image: "/img/project3.jpg" // Replace with actual image path
    }
  ];

  const benefits = [
    {
      id: 1,
      title: "Top 10 Intern Reward",
      description: "₹15,000 stipend + Welcome kit",
      icon: "💰"
    },
    {
      id: 2,
      title: "Offer Letter",
      description: "Within 30 minutes",
      icon: "📄"
    },
    {
      id: 3,
      title: "Industry-Based Projects",
      description: "Work on real-world applications",
      icon: "💼"
    },
    {
      id: 4,
      title: "Experience Letter",
      description: "With QR Code verification",
      icon: "🔖"
    },
    {
      id: 5,
      title: "Certificate Verification",
      description: "Secure and verifiable credentials",
      icon: "🏆"
    },
    {
      id: 6,
      title: "Internship Portal Access",
      description: "Within 5 minutes of registration",
      icon: "🚪"
    },
    {
      id: 7,
      title: "Exclusive Job Updates",
      description: "Shared on WhatsApp",
      icon: "💬"
    },
    {
      id: 8,
      title: "Community Forum",
      description: "Peer & mentor support",
      icon: "👥"
    },
    {
      id: 9,
      title: "Virtual Internship",
      description: "Work from home with flexible schedule",
      icon: "🏠"
    }
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleVideoPlay = (index) => {
    const newIsPlaying = [...isPlaying];
    newIsPlaying[index] = !newIsPlaying[index];
    setIsPlaying(newIsPlaying);

    if (newIsPlaying[index]) {
      videoRefs.current[index].play();
    } else {
      videoRefs.current[index].pause();
    }
  };

  useEffect(() => {
    // Animation for the heading text
    const createTextAnimation = () => {
      var clutter = "";
      const para = document.querySelector(".special-heading");
      if (para) {
        const characters = para.textContent.split("");
        characters.forEach(function(e) {
          clutter += `<span>${e}</span>`;
        });
        para.innerHTML = clutter;
        
        gsap.set(".special-heading span", { opacity: 0, y: 50 });
        gsap.to(".special-heading span", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power3.out"
        });
      }
    };

    // Staggered animation for sections
    const sectionsAnimation = () => {
      gsap.from(".special-section", {
        scrollTrigger: {
          trigger: ".special-section",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out"
      });
    };

    // Benefits animation
    const benefitsAnimation = () => {
      gsap.from(".benefit-card", {
        scrollTrigger: {
          trigger: ".benefits-grid",
          start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });
    };

    // Projects animation
    const projectsAnimation = () => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    };

    // Execute animations
    createTextAnimation();
    sectionsAnimation();
    benefitsAnimation();
    projectsAnimation();

    // Testimonial auto-scroll
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    // Particle animation
    const particles = document.querySelectorAll('.special-particle');
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

    return () => {
      clearInterval(testimonialInterval);
    };
  }, [testimonials.length]);

  // Create particles
  const particles = [];
  for (let i = 0; i < 30; i++) {
    particles.push(<div key={i} className={`special-particle ${styles.particle}`}></div>);
  }

  return (
    <div 
      ref={specialRef} 
      className={styles.specialContainer}
    >
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
          <h1 className="special-heading">What's Special at INLIGHN TECH</h1>
          <p className="special-subheading">
            Discover the unique features and opportunities that set our internship programs apart from the rest.
          </p>
        </div>
        
        {/* Testimonials Section */}
        <div className="special-section">
          <div className={styles.sectionTitle}>
            <h2>Feedback from Our Interns</h2>
            <div className={styles.titleUnderline}></div>
          </div>
          
          <div className={styles.testimonialContainer}>
            <button 
              className={`${styles.testimonialArrow} ${styles.prevArrow}`}
              onClick={handlePrevTestimonial}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className={styles.testimonialWrapper}>
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial.id}
                  className={`${styles.testimonialCard} ${activeTestimonial === index ? styles.activeTestimonial : ''}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ 
                    opacity: activeTestimonial === index ? 1 : 0,
                    x: activeTestimonial === index ? 0 : 100,
                    scale: activeTestimonial === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={styles.testimonialContent}>
                    <div className={styles.testimonialQuote}>
                      <svg className={styles.quoteIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p>{testimonial.text}</p>
                    </div>
                    <div className={styles.testimonialAuthor}>
                      <div className={styles.testimonialImage}>
                        <img src={testimonial.image} alt={testimonial.name} />
                      </div>
                      <div className={styles.testimonialInfo}>
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button 
              className={`${styles.testimonialArrow} ${styles.nextArrow}`}
              onClick={handleNextTestimonial}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className={styles.testimonialDots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.testimonialDot} ${activeTestimonial === index ? styles.activeDot : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Videos Section */}
        <div className="special-section">
          <div className={styles.sectionTitle}>
            <h2>Knowledge Through Videos</h2>
            <div className={styles.titleUnderline}></div>
          </div>
          
          <div className={styles.videosGrid}>
            {[1, 2, 3].map((_, index) => (
              <div key={index} className={styles.videoCard}>
                <div className={styles.videoWrapper}>
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={`/videos/sample-${index + 1}.mp4`} // Replace with actual video paths
                    poster={`/img/video-thumbnail-${index + 1}.jpg`} // Replace with actual thumbnail paths
                  ></video>
                  <button 
                    className={styles.playButton}
                    onClick={() => handleVideoPlay(index)}
                  >
                    {isPlaying[index] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
                <h3>Video Tutorial {index + 1}</h3>
              </div>
            ))}
          </div>
        </div>
        
        {/* Interns of the Month Challenge */}
        <div className="special-section">
          <div className={styles.challengeSection}>
            <motion.div 
              className={styles.challengeHeader}
              whileInView={{ y: [50, 0], opacity: [0, 1] }}
              transition={{ duration: 0.8 }}
            >
              <h2>Interns of the Month Challenge</h2>
              <p className={styles.epicTag}>EPIC OPPORTUNITY 🎉✨</p>
            </motion.div>
            
            <div className={styles.challengeContent}>
              <p>
                Inlighn Tech is bringing you an EPIC opportunity with the "Interns of the Month Challenge"! 🎉✨
                <br /><br />
                Every single month, we're recognizing 10 OUTSTANDING interns who have shown exceptional dedication, innovation, and top-tier performance! 🏆
              </p>
              
              <div className={styles.challengeRewards}>
                <motion.div 
                  className={styles.rewardItem}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <span className={styles.rewardIcon}>💰</span>
                  <p>A Stipend Reward of ₹15,000!</p>
                </motion.div>
                <motion.div 
                  className={styles.rewardItem}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <span className={styles.rewardIcon}>🎁</span>
                  <p>An Exclusive Inlighn Tech Welcome Kit & Swag Pack!</p>
                </motion.div>
                <motion.div 
                  className={styles.rewardItem}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <span className={styles.rewardIcon}>🏆</span>
                  <p>Special Recognition on Our Platform!</p>
                </motion.div>
              </div>
              
              <p className={styles.challengeFooter}>
                Because here at Inlighn Tech, we believe in REWARDING EXCELLENCE! 💡✨
              </p>
            </div>
          </div>
        </div>
        
        {/* How to Participate */}
        <div className="special-section">
          <div className={styles.sectionTitle}>
            <h2>How to Participate?</h2>
            <div className={styles.titleUnderline}></div>
          </div>
          
          <div className={styles.participationContent}>
            <p className={styles.participationIntro}>
              If you're in your last month of internship, you're eligible!
              <br />
              You'll receive a Google Form to apply for this prestigious title!
            </p>
            
            <div className={styles.participationSteps}>
              <motion.div 
                className={styles.participationStep}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>Submit Projects</h3>
                  <p>Submit your best projects related to your domain!</p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.participationStep}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>Skill Assessment Test</h3>
                  <p>Take a skill assessment test to prove your expertise!</p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.participationStep}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Final Round</h3>
                  <p>Ace the interview round (if shortlisted)!</p>
                </div>
              </motion.div>
            </div>
            
            <div className={styles.rulesSection}>
              <h3>RULES & SELECTION PROCESS</h3>
              <ul className={styles.rulesList}>
                <li>Each intern can apply only ONCE in their final month.</li>
                <li>Winners will be announced on the last day of every month! 🎊</li>
                <li>Top 10 interns will be celebrated with amazing rewards & recognition!</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Projects Section */}
        <div className="special-section">
          <div className={styles.sectionTitle}>
            <h2>Our Interns' Projects</h2>
            <div className={styles.titleUnderline}></div>
          </div>
          
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                className="project-card"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className={styles.projectCard}>
                  <div className={styles.projectImage}>
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className={styles.projectContent}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <motion.button 
                      className={styles.viewProjectButton}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Project
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="special-section">
          <div className={styles.sectionTitle}>
            <h2>Perks & Benefits</h2>
            <div className={styles.titleUnderline}></div>
          </div>
          
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit) => (
              <motion.div 
                key={benefit.id}
                className="benefit-card"
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsSpecial; 