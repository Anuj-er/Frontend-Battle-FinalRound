import './App.css'
import Hero from './components/Hero/Index'
import About from './components/About/Index'
import Programs from './components/Programs/Index'
import Features from './components/Features/Index'
import Testimonials from './components/Testimonials/Index'
import Contact from './components/Contact/Index'
import Login from './components/Login/Index'
import VerifyCertificate from './components/VerifyCertificate/Index'
import Courses from './components/Courses/Index'
import CustomCursor from './components/CustomCursor/Index'
import WhatsAppButton from './components/WhatsAppButton/Index'
import ScrollToTop from './components/ScrollToTop/Index'
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from 'locomotive-scroll';
import Footer from './components/Footer/Index';
import WhatsSpecial from './components/WhatsSpecial/Index';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const scrollRef = useRef(null);
  const aboutRef = useRef(null);
  const programsRef = useRef(null);
  const featuresRef = useRef(null);
  const contactRef = useRef(null);
  const testimonialsRef = useRef(null);
  const whatsSpecialRef = useRef(null);
  const faqRef = useRef(null);
  
  const [currentView, setCurrentView] = useState('main'); // 'main', 'login', 'verify', or 'courses'

  const [animatedStats, setAnimatedStats] = useState({
    placementRate: 0,
    partnerCompanies: 0,
    graduates: 0,
    salaryIncrease: 0
  });

  const achievementRef = useRef(null);
  const statsAnimated = useRef(false);
  
  // FAQ state
  const [activeIndex, setActiveIndex] = useState(null);
  
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const faqItems = [
    {
      question: "How long are your internship programs?",
      answer: "Our internship programs typically run for 3-6 months, depending on the specific track and your availability. We offer both full-time and part-time options to accommodate different schedules."
    },
    {
      question: "Do I need prior experience to join your programs?",
      answer: "While some basic knowledge is helpful, many of our programs are designed for beginners. We have different tracks based on experience levels, from complete beginners to those looking to advance existing skills."
    },
    {
      question: "Are your internships paid or unpaid?",
      answer: "We offer both paid and unpaid internship opportunities. Our premium internship tracks include stipends, while our standard programs focus on skill development and portfolio building with potential for performance-based bonuses."
    },
    {
      question: "Will I receive a certificate upon completion?",
      answer: "Yes, all interns who successfully complete the program receive an industry-recognized certificate. Our certificates are verifiable through our online portal and are well-regarded by our 500+ partner companies."
    },
    {
      question: "How do you help with job placement after the program?",
      answer: "Our career services team provides comprehensive support including resume building, interview preparation, portfolio development, and direct connections with our hiring partners. We maintain a 98% placement rate within 3 months of program completion."
    },
    {
      question: "Can I join from anywhere in the world?",
      answer: "Yes, our programs are fully remote and accessible globally. We have participants from over 50 countries, and our mentors and instructors are distributed across different time zones to provide support regardless of your location."
    }
  ];

  useEffect(() => {
    if (scrollRef.current && currentView === 'main') {
      const scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true, 
      });

      return () => {
        scroll.destroy();
      };
    }
  }, [currentView]);

  useEffect(() => {
    if (currentView === 'main') {
      const list = document.querySelectorAll('.section')
      list.forEach(function(e) {
        ScrollTrigger.create({
          trigger: e,
          start: "top 90%",
          end: "bottom 90%",
          onEnter: function(){
            document.body.setAttribute("theme", e.dataset.color);
          },
          onEnterBack: function() {
            document.body.setAttribute("theme", e.dataset.color);
          }
        })
      })
    }
  }, [currentView]);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !statsAnimated.current) {
        statsAnimated.current = true;
        
        // Animate placement rate from 0 to 98
        const placementInterval = setInterval(() => {
          setAnimatedStats(prev => {
            if (prev.placementRate >= 98) {
              clearInterval(placementInterval);
              return prev;
            }
            return { ...prev, placementRate: prev.placementRate + 1 };
          });
        }, 20);
        
        // Animate partner companies from 0 to 500
        const partnersInterval = setInterval(() => {
          setAnimatedStats(prev => {
            if (prev.partnerCompanies >= 500) {
              clearInterval(partnersInterval);
              return prev;
            }
            return { ...prev, partnerCompanies: prev.partnerCompanies + 5 };
          });
        }, 10);
        
        // Animate graduates from 0 to 15000
        const graduatesInterval = setInterval(() => {
          setAnimatedStats(prev => {
            if (prev.graduates >= 15000) {
              clearInterval(graduatesInterval);
              return prev;
            }
            return { ...prev, graduates: prev.graduates + 150 };
          });
        }, 10);
        
        // Animate salary increase from 0 to 40
        const salaryInterval = setInterval(() => {
          setAnimatedStats(prev => {
            if (prev.salaryIncrease >= 40) {
              clearInterval(salaryInterval);
              return prev;
            }
            return { ...prev, salaryIncrease: prev.salaryIncrease + 1 };
          });
        }, 25);
      }
    }, { threshold: 0.3 });

    if (achievementRef.current) {
      observer.observe(achievementRef.current);
    }

    return () => {
      if (achievementRef.current) {
        observer.unobserve(achievementRef.current);
      }
    };
  }, []);

  // Simple navigation handler
  const handleNavigation = (page) => {
    setCurrentView(page);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  const scrollToSection = (ref) => {
    if (currentView !== 'main') {
      setCurrentView('main');
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Custom cursor for desktop */}
      <CustomCursor />
      
      {/* WhatsApp chat button */}
      <WhatsAppButton />
      
      {/* Scroll to top button */}
      <ScrollToTop />
      
      {currentView === 'main' ? (
        <div className='section main w-full' ref={scrollRef}>
          <Hero 
            onLoginClick={() => handleNavigation('login')} 
            onVerifyClick={() => handleNavigation('verify')}
            onCoursesClick={() => scrollToSection(programsRef)}
            onWhatsSpecialClick={() => scrollToSection(whatsSpecialRef)}
            onAboutClick={() => scrollToSection(aboutRef)}
            onContactClick={() => scrollToSection(contactRef)}
            onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <div ref={aboutRef}>
            <About />
          </div>
          <div ref={featuresRef}>
            <Features />
          </div>
          <div ref={programsRef}>
            <Programs onCoursesClick={() => handleNavigation('courses')} />
          </div>
          <div ref={whatsSpecialRef}>
            <div className="py-16 px-8" data-color="white">
              <h1 className="text-5xl sm:text-6xl text-center tracking-tight mb-16 font-[SansitaReg]">
                What's Special About Us
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">Industry-Relevant Skills</h3>
                  <p>Our curriculum is designed in collaboration with industry experts to ensure you learn the most in-demand skills.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-green-600">Hands-on Projects</h3>
                  <p>Work on real-world projects that you can showcase in your portfolio to impress potential employers.</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-purple-600">Career Support</h3>
                  <p>Receive personalized career guidance, resume reviews, and interview preparation to help you land your dream job.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Achievements Section */}
          <div ref={achievementRef} className="py-24 px-8 bg-gradient-to-b from-blue-900 to-black overflow-hidden relative" data-color="blue">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute w-64 h-64 rounded-full bg-blue-500/10 blur-3xl -top-20 -left-20 animate-blob"></div>
              <div className="absolute w-80 h-80 rounded-full bg-purple-500/10 blur-3xl top-1/2 left-1/4 animate-blob animation-delay-2000"></div>
              <div className="absolute w-72 h-72 rounded-full bg-green-500/10 blur-3xl bottom-0 right-1/3 animate-blob animation-delay-4000"></div>
              <div className="absolute w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl -bottom-20 -right-20 animate-blob animation-delay-6000"></div>
            </div>
            
            <div className="max-w-7xl mx-auto relative z-10">
              <motion.h2 
                className="text-5xl sm:text-6xl text-center text-white font-[SansitaReg] mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Our Achievements
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Achievement 1 */}
                <motion.div 
                  className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-xl border border-blue-500/30 text-center shadow-xl shadow-blue-500/5"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 20px 30px rgba(59, 130, 246, 0.2)",
                    transition: { duration: 0.3 } 
                  }}
                >
                  <div className="text-5xl font-bold text-blue-400 mb-4 relative">
                    <span className="relative z-10">{animatedStats.placementRate}%</span>
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Placement Rate</h3>
                  <p className="text-gray-300">Of our graduates secure positions within 3 months of program completion</p>
                </motion.div>
                
                {/* Achievement 2 */}
                <motion.div 
                  className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-xl border border-green-500/30 text-center shadow-xl shadow-green-500/5"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 20px 30px rgba(34, 197, 94, 0.2)",
                    transition: { duration: 0.3 } 
                  }}
                >
                  <div className="text-5xl font-bold text-green-400 mb-4 relative">
                    <span className="relative z-10">{animatedStats.partnerCompanies}+</span>
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Partner Companies</h3>
                  <p className="text-gray-300">Leading tech companies trust our graduates and hire directly from our programs</p>
                </motion.div>
                
                {/* Achievement 3 */}
                <motion.div 
                  className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-xl border border-purple-500/30 text-center shadow-xl shadow-purple-500/5"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 20px 30px rgba(168, 85, 247, 0.2)",
                    transition: { duration: 0.3 } 
                  }}
                >
                  <div className="text-5xl font-bold text-purple-400 mb-4 relative">
                    <span className="relative z-10">{(animatedStats.graduates / 1000).toFixed(1)}K+</span>
                    <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Graduates</h3>
                  <p className="text-gray-300">Successful alumni working at top companies worldwide</p>
                </motion.div>
                
                {/* Achievement 4 */}
                <motion.div 
                  className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-xl border border-yellow-500/30 text-center shadow-xl shadow-yellow-500/5"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 20px 30px rgba(234, 179, 8, 0.2)",
                    transition: { duration: 0.3 } 
                  }}
                >
                  <div className="text-5xl font-bold text-yellow-400 mb-4 relative">
                    <span className="relative z-10">{animatedStats.salaryIncrease}%</span>
                    <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Salary Increase</h3>
                  <p className="text-gray-300">Average salary boost for professionals after completing our programs</p>
                </motion.div>
              </div>
              
              {/* Trusted By Section */}
              <motion.div 
                className="mt-24"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-center text-2xl text-white mb-12 font-[SansitaReg]">Trusted By Industry Leaders</h3>
                <div className="flex flex-wrap justify-center items-center gap-12">
                  {["GOOGLE", "MICROSOFT", "AMAZON", "META", "APPLE", "IBM"].map((company, index) => (
                    <motion.div 
                      key={company}
                      className="w-32 h-12 backdrop-blur-md bg-white/10 rounded-md flex items-center justify-center text-white font-bold border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 10px 20px rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {company}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          
          <div ref={testimonialsRef}>
            <Testimonials />
          </div>
          
          {/* FAQ Section */}
          <div ref={faqRef} className="py-24 px-8 bg-gradient-to-b from-gray-900 to-black" data-color="black">
            <div className="max-w-4xl mx-auto">
              <motion.h2 
                className="text-5xl sm:text-6xl text-center text-white font-[SansitaReg] mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Frequently Asked Questions
              </motion.h2>
              
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="backdrop-blur-xl bg-white/5 rounded-xl border border-blue-500/20 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <button
                      className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border border-blue-400/50 transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 text-blue-400" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-gray-300 border-t border-blue-500/20 pt-4">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-lg text-gray-300 mb-6">Still have questions? We're here to help!</p>
                <button 
                  onClick={() => scrollToSection(contactRef)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  Contact Us
                </button>
              </motion.div>
            </div>
          </div>
          
          {/* Call to Action Section - Enhanced with glassy effects */}
          <div className="py-24 px-8 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden" data-color="purple">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute w-96 h-96 rounded-full bg-white/10 blur-3xl -top-48 -left-48 animate-blob"></div>
              <div className="absolute w-80 h-80 rounded-full bg-blue-500/10 blur-3xl top-1/2 -right-20 animate-blob animation-delay-4000"></div>
            </div>
            
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
                <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                  Join thousands of successful professionals who have accelerated their careers through our industry-leading programs.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.button 
                  onClick={() => handleNavigation('courses')}
                  className="backdrop-blur-md px-8 py-4 bg-white/20 border border-white/40 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-white/30 transition-all duration-300"
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 20px 25px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Explore Programs
                </motion.button>
                <motion.button 
                  onClick={() => scrollToSection(contactRef)}
                  className="backdrop-blur-md px-8 py-4 bg-transparent border-2 border-white/60 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-white/10 transition-all duration-300"
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 20px 25px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Contact Us
                </motion.button>
              </motion.div>
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    emoji: "🚀",
                    title: "Fast-Track Your Career",
                    description: "Accelerate your professional growth with our intensive, focused programs"
                  },
                  {
                    emoji: "💼",
                    title: "Job Placement Guarantee",
                    description: "We're so confident in our training that we offer a job placement guarantee"
                  },
                  {
                    emoji: "🌐",
                    title: "Global Network",
                    description: "Join our community of professionals and connect with industry leaders worldwide"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="backdrop-blur-xl bg-white/10 p-6 rounded-lg border border-white/20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div className="text-white text-4xl mb-4">{item.emoji}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/80">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div ref={contactRef}>
            <Contact />
          </div>
          <Footer 
            onLoginClick={() => handleNavigation('login')} 
            onVerifyClick={() => handleNavigation('verify')}
            onCoursesClick={() => handleNavigation('courses')}
            onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onAboutClick={() => scrollToSection(aboutRef)}
            onContactClick={() => scrollToSection(contactRef)}
          />
        </div>
      ) : currentView === 'login' ? (
        <Login onBackToMain={() => handleNavigation('main')} />
      ) : currentView === 'verify' ? (
        <VerifyCertificate onBackToMain={() => handleNavigation('main')} />
      ) : currentView === 'courses' ? (
        <Courses onBackToMain={() => handleNavigation('main')} />
      ) : null}
    </>
  )
}

export default App
