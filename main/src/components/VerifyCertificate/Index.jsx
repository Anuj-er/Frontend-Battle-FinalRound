import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './Style.module.css';

gsap.registerPlugin(ScrollTrigger);

function VerifyCertificate({ onBackToMain }) {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Animation for the heading text
    var clutter = "";
    const para = document.querySelector(".verify-title")
    if (para) {
      const characters = para.textContent.split("")
      characters.forEach(function(e) {
        clutter += `<span>${e}</span>`
      })
      para.innerHTML = clutter;   
      gsap.set(".verify-title span", {opacity: .1})
      gsap.to(".verify-title span", {
        scrollTrigger: {
          trigger: ".verify-certificate",
          start: "top 60%",
          end: "bottom 90%",
          scrub: 1,
        },
        opacity: 1, 
        stagger: .03,   
      })
    }

    // 3D certificate animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".certificate-container",
        start: "top 70%",
        end: "bottom 80%",
        scrub: false,
      }
    });

    tl.fromTo(".certificate-graphic", {
      y: 50,
      opacity: 0,
      rotateY: -15,
    }, {
      y: 0,
      opacity: 1,
      rotateY: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Floating animation for the certificate
    gsap.to(".certificate-graphic", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Particle animation
    const particles = document.querySelectorAll('.verify-particle');
    particles.forEach((particle, i) => {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
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
  }, []);
  
  // Create particles
  const particles = [];
  for (let i = 0; i < 30; i++) {
    particles.push(<div key={i} className={`verify-particle ${styles.particle}`}></div>);
  }

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      if (certificateId.toLowerCase() === 'demo123') {
        setVerificationResult({
          valid: true,
          name: "John Doe",
          course: "Full Stack Development",
          issueDate: "June 15, 2023",
          completionDate: "May 30, 2023"
        });
      } else if (certificateId.toLowerCase() === 'demo456') {
        setVerificationResult({
          valid: true,
          name: "Jane Smith",
          course: "Data Science",
          issueDate: "July 10, 2023",
          completionDate: "June 25, 2023"
        });
      } else {
        setVerificationResult({
          valid: false,
          message: "Certificate ID not found. Please check the ID and try again."
        });
      }
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <div 
      ref={containerRef} 
      data-color="white" 
      className="verify-certificate section w-full min-h-screen py-20 px-6 relative overflow-hidden"
    >
      {/* Back button */}
      <motion.button
        className={`${styles.backButton} fixed top-6 left-6 z-20 flex items-center gap-2 text-gray-800 bg-white/70 backdrop-blur-md px-4 py-2 rounded-lg`}
        onClick={onBackToMain}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
      </motion.button>
      
      {/* Animated background particles */}
      <div className={styles.particlesContainer}>
        {particles}
      </div>
      
      {/* 3D grid background */}
      <div className={styles.grid3d}></div>
      
      <div className="z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="verify-title text-purple-600 font-[Sansita] text-[2.4vh] sm:text-[3.5vh] font-medium tracking-wide leading-[5vh]">
            VERIFY YOUR CERTIFICATE
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Enter your certificate ID to verify its authenticity and view details of your INLIGHN TECH certification.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="certificate-container order-2 md:order-1">
            <motion.div 
              className="certificate-graphic relative"
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className={styles.certificateOuter}>
                <div className={styles.certificateInner}>
                  <div className={styles.certificateHeader}>
                    <h3 className="text-2xl font-bold">INLIGHN TECH</h3>
                    <p>Certificate of Completion</p>
                  </div>
                  <div className={styles.certificateContent}>
                    {verificationResult && verificationResult.valid ? (
                      <>
                        <div className={styles.certificateName}>{verificationResult.name}</div>
                        <p>has successfully completed the</p>
                        <div className={styles.certificateCourse}>{verificationResult.course}</div>
                        <p>internship program</p>
                        <div className={styles.certificateDate}>
                          <p>Issued: {verificationResult.issueDate}</p>
                          <p>Completion: {verificationResult.completionDate}</p>
                        </div>
                      </>
                    ) : (
                      <div className={styles.certificatePlaceholder}>
                        <p>Enter a certificate ID to verify</p>
                        <p className="text-sm text-gray-500 mt-2">Try "demo123" or "demo456" for a demo</p>
                      </div>
                    )}
                  </div>
                  <div className={styles.certificateFooter}>
                    <div className={styles.certificateSeal}></div>
                    <div className={styles.certificateSignature}>
                      <div className={styles.signatureLine}></div>
                      <p>Director, INLIGHN TECH</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.certificateShadow}></div>
            </motion.div>
          </div>
          
          <div className="order-1 md:order-2">
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className={styles.formGlow}></div>
              
              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <label htmlFor="certificate-id" className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate ID
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      id="certificate-id"
                      type="text"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Enter your certificate ID"
                      required
                    />
                    <div className={styles.inputGlow}></div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isVerifying}
                  className={`${styles.verifyButton} w-full relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 py-3.5 px-4 text-white font-semibold shadow-lg hover:from-blue-500 hover:to-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300`}
                >
                  <span className="relative z-10">
                    {isVerifying ? 'Verifying...' : 'Verify Certificate'}
                  </span>
                </button>
              </form>
              
              {verificationResult && (
                <motion.div 
                  className={`mt-6 p-4 rounded-lg ${verificationResult.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {verificationResult.valid ? (
                    <div className="text-green-700">
                      <div className="flex items-center mb-2">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="font-bold">Certificate Verified Successfully!</p>
                      </div>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Name:</span> {verificationResult.name}
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Program:</span> {verificationResult.course}
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Issue Date:</span> {verificationResult.issueDate}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Completion Date:</span> {verificationResult.completionDate}
                      </p>
                    </div>
                  ) : (
                    <div className="text-red-700">
                      <div className="flex items-center mb-2">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="font-bold">Verification Failed</p>
                      </div>
                      <p className="text-sm">{verificationResult.message}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyCertificate; 