import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './Style.module.css';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

function Login({ onBackToMain }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(".login-title", {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    tl.fromTo(".login-card", {
      opacity: 0,
      y: 30,
      rotateX: 10,
    }, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");
    
    tl.fromTo(".form-element", {
      opacity: 0,
      x: -20
    }, {
      opacity: 1,
      x: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4");
    
    tl.fromTo(".hero-image", {
      opacity: 0,
      scale: 0.9,
    }, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=1");
    
    // Floating animation for the card
    gsap.to(".login-card", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
    
    // Particle animation
    const particles = document.querySelectorAll('.particle');
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
  }, [isLogin]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    // Add login logic here
  };
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };
  
  // Create particles
  const particles = [];
  for (let i = 0; i < 30; i++) {
    particles.push(<div key={i} className={`particle ${styles.particle}`}></div>);
  }

  return (
    <div ref={containerRef} data-color="black" className={`login-page ${styles.loginPage} section min-h-screen w-full flex items-center justify-center relative overflow-hidden`}>
      {/* Back button */}
      <motion.button
        className={`${styles.backButton} fixed top-6 left-6 z-20 flex items-center gap-2 text-white bg-black/30 backdrop-blur-md px-4 py-2 rounded-lg`}
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
      
      <div className="z-10 flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12 lg:px-8 w-full max-w-7xl">
        {/* Left side - Hero image and text */}
        <motion.div 
          className="hero-image w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className={`${styles.heroImageContainer} relative w-full max-w-md mx-auto md:mx-0`}>
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
              alt="Tech professional working" 
              className="rounded-2xl shadow-2xl object-cover w-full aspect-square md:aspect-auto md:h-[500px]"
            />
            <div className={styles.heroImageGlow}></div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mt-8">
            {isLogin ? "Welcome Back!" : "Join Our Community"}
          </h2>
          <p className="text-gray-300 mt-4 max-w-md">
            {isLogin 
              ? "Access your personalized dashboard, track your progress, and continue your learning journey with INLIGHN TECH." 
              : "Create an account to start your tech career journey, access exclusive resources, and join our community of tech professionals."}
          </p>
        </motion.div>
        
        {/* Right side - Login form */}
        <div className="w-full md:w-1/2">
          <motion.h2 
            className="login-title text-center md:text-left text-3xl md:text-4xl font-bold tracking-tight text-white mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {isLogin ? "Log in to " : "Sign up for "}
            <span className="text-blue-500">INLIGHN TECH</span>
          </motion.h2>
          
          <motion.div 
            className="login-card relative bg-black/40 backdrop-blur-lg w-full max-w-md mx-auto md:mx-0 p-8 rounded-2xl shadow-[0_0_40px_rgba(0,100,255,0.3)] border border-blue-500/30"
            initial={{ opacity: 0, y: 30, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className={styles.cardGlow}></div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="form-element">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className={`${styles.inputWrapper} relative`}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/30 text-white block w-full rounded-lg border-0 py-3 px-4 shadow-sm ring-1 ring-inset ring-blue-500/30 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none transition-all duration-300"
                    placeholder="Enter your email"
                  />
                  <div className={styles.inputGlow}></div>
                </div>
              </div>

              <div className="form-element">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  {isLogin && (
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                        Forgot password?
                      </a>
                    </div>
                  )}
                </div>
                <div className={`${styles.inputWrapper} relative`}>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black/30 text-white block w-full rounded-lg border-0 py-3 px-4 shadow-sm ring-1 ring-inset ring-blue-500/30 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none transition-all duration-300"
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                  />
                  <div className={styles.inputGlow}></div>
                </div>
              </div>

              {!isLogin && (
                <div className="form-element">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className={`${styles.inputWrapper} relative`}>
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="bg-black/30 text-white block w-full rounded-lg border-0 py-3 px-4 shadow-sm ring-1 ring-inset ring-blue-500/30 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none transition-all duration-300"
                      placeholder="Confirm your password"
                    />
                    <div className={styles.inputGlow}></div>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="form-element flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
              )}

              <div className="form-element">
                <button
                  type="submit"
                  className={`${styles.loginButton} w-full relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 py-3.5 px-4 text-white font-semibold shadow-lg hover:from-blue-500 hover:to-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300`}
                >
                  <span className="relative z-10">{isLogin ? "Log in" : "Sign up"}</span>
                </button>
              </div>
            </form>
            
            <div className="form-element mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-[#0f172a] px-2 text-gray-400">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-3">
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-black/30 px-3 py-2.5 text-white shadow-sm ring-1 ring-inset ring-blue-500/20 hover:bg-blue-900/20 transition-all duration-300"
                >
                  <FaGoogle className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-black/30 px-3 py-2.5 text-white shadow-sm ring-1 ring-inset ring-blue-500/20 hover:bg-blue-900/20 transition-all duration-300"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-black/30 px-3 py-2.5 text-white shadow-sm ring-1 ring-inset ring-blue-500/20 hover:bg-blue-900/20 transition-all duration-300"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="form-element mt-6 text-center">
              <p className="text-sm text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button 
                  onClick={toggleAuthMode}
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login; 