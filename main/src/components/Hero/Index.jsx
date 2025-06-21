import video from '../../assets/video/1ENIoa5sjq.mp4'
import Row from '../Row'
import {useEffect, useState, useRef} from 'react';
import {motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { gsap } from "gsap";
import styles from './Style.module.css';
import { Power2, Power4 } from 'gsap/gsap-core';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { BiMenu, BiX } from "react-icons/bi";

gsap.registerPlugin(ScrollTrigger);

gsap.set(".slidesm", {scale: 5})

function Hero({ onLoginClick, onVerifyClick, onCoursesClick, onWhatsSpecialClick, onAboutClick, onContactClick, onHomeClick }) {

    const container = useRef(null);

    useEffect(() => {
        var clutter = "";
        const para = document.querySelector(".toptext")
        const characters = para.textContent.split("")
        characters.forEach(function(e) {
            
            clutter += `<span>${e}</span>`
        })
        para.innerHTML = clutter;   
        gsap.set(".toptext span", {opacity: .1})
        gsap.to(".toptext span", {
            scrollTrigger: {
                trigger: ".hero",
                start: "top 50%",
                end: "bottom 90%",
                scrub: 1,
            },
            opacity: 1, 
            stagger: .03,
            
        })
    },[]);

    
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom bottom",
            scrub: .5,
            }
         });
         tl.to(".vdodiv", {
            clipPath: 'circle(0% at 50% 50%)',
            ease: Power4,
          }, "start")
          tl.to(".slidesm", {
            scale: 1,
            ease: Power2,
         }, 'start');
         tl.to(".lft", {
            xPercent: -10,
            stagger: .03,
            ease: Power4,
            duration: 1,
         }, 'start');
         tl.to(".rgt", {
            xPercent: 10,
            stagger: .03,
            ease: Power4,
            duration: 1,
         }, 'start');           
    }, container )

    const {scrollY} = useScroll();
    const [hidden, setHidden] = useState(false);
  
    useMotionValueEvent(scrollY, "change", (latest) => {

        const previous = scrollY.getPrevious() ?? 0;
        console.log(previous, latest);

        if(latest > previous) {
        setHidden(true);
        }
        else {
        setHidden(false);
        }
    });
   
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when clicking a navigation item
    const handleMobileNavClick = (handler) => {
        setIsMenuOpen(false);
        if (handler) handler();
    };

    return (
    <div ref={container} data-color="black" className="hero section w-full h-[200vh] relative  ">
        <div className='w-full sticky top-0 left-0 '>
            {/* navbar */}
            <motion.div 
                variants={{
                visible: {y: 0},
                hidden: {y: "-100%"},
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{duration: 0.35, ease: "easeInOut"}}
                className="section w-[100vw] sm:w-full px-6 fixed top-0 left-0 z-[9] bg-black/30 backdrop-blur-sm"
            >
                <div className="w-full flex sm:flex items-center justify-between  ">
                    <div className="logo w-[12vh] h-[12vh] sm:w-[16vh] sm:h-[10vh] cursor-pointer z-[9] " onClick={onHomeClick}>
                        {/* INLIGHN TECH Logo */}
                        <div className="text-white font-bold text-2xl sm:text-3xl">
                            INLIGHN TECH
                        </div>
                    </div>                   
                    <div className="hidden md:flex gap-4 items-center z-[9] cursor-pointer">
                        {[
                            { name: "Home", handler: onHomeClick },
                            { name: "About Us", handler: onAboutClick },
                            { name: "Programs", handler: onCoursesClick },
                            { name: "What's Special", handler: onWhatsSpecialClick },
                            { name: "Contact Us", handler: onContactClick }
                        ].map((item, index) => (
                            <h4 
                                key={index} 
                                className={`${styles.links} h-[3vh] relative py[2.4vh] px-[2.2vh] text-center flex flex-col
                                font-[Sansita] text-[2.1vh] overflow-hidden font-medium leading-[2.5vh] text-white`}
                                onClick={item.handler}
                            > 
                                <a className={`atag ${styles.atag} relative`}>{item.name}</a>
                                <a className={`atag ${styles.atag} relative`}>{item.name}</a>                      
                            </h4>
                        ))}
                        <div className="flex gap-2">
                            <button 
                                onClick={onVerifyClick}
                                className="relative overflow-hidden bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg group"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                <span className="relative flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Verify Certificate
                                </span>
                            </button>
                            <button 
                                onClick={onLoginClick}
                                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 group"
                            >
                                <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 bg-white/20"></span>
                                <span className="relative flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Login
                                </span>
                            </button>
                        </div>
                    </div>
                    
                    {!isMenuOpen ? (
                        <BiMenu
                            style={{
                                fontSize: "5.5vw",
                                color: "white"
                            }}
                            className='inline-block sm:hidden z-[9] cursor-pointer'
                            onClick={toggleMenu}
                        />
                    ) : (
                        <BiX
                            style={{
                                fontSize: "5.5vw",
                                color: "white"
                            }}
                            className='inline-block sm:hidden z-[9] cursor-pointer'
                            onClick={toggleMenu}
                        />
                    )}
                 
                    
                </div>
            </motion.div>

            <div className='btmtext absolute z-[4] bottom-[4%] left-[25%] text-center sm:text-start sm:bottom-[7%] sm:left-8 w-48 '>
                <h1 className='sm:text-[2vh] font-semibold text-white'>
                    Transform Your Career with INLIGHN TECH
                    Gain real-world experience with our immersive internship programs.
                </h1>
            </div>
            {/* video div */}
            <div 
                
                className={` vdodiv w-full h-screen absolute z-[3] 
                top-0 left-0 overflow-hidden sm:overflow-visible ${styles.vdodiv}`}
            >   
                <video
                    className="absolute w-full h-screen object-cover top-1/2 left-1/2 
                    -translate-x-1/2 -translate-y-1/2"
                    autoPlay
                    loop
                    muted
                    src={video}
                >     
                </video> 
            </div>

            {/* marquee div */}
            <div 
                className="marqueecontainer w-full h-screen 
                relative overflow-hidden "
            >
                {/* /* top Heading div */ }
                <div 
                    className=' heading absolute  top-[12%] sm:top-[7%] left-1/2 
                    -translate-x-1/2 w-72'
                >
                    <h2 className='toptext text-[2.2vh] font-[Sansita] tracking-wide font-medium text-center text-white'>Transform Your Career with INLIGHN TECH</h2>
                </div>

                <div 
                    
                    className='slidesm absolute scale-[5]  top-1/2 left-1/2
                    -translate-x-1/2 -translate-y-1/2 w-[90%]'
                >    
                    <div className='row'>
                        <Row 
                            translateClass="-translate-x-1/2"  
                            direction="lft"
                        />
                        <Row 
                            translateClass="-translate-x-2/3"  
                            direction="rgt"
                        />
                        <Row 
                            translateClass="-translate-x-1/4"  
                            direction="lft" 
                        />
                        <Row 
                            translateClass="-translate-x-1/3"  
                            direction="rgt"
                        />
                    </div>            
                    
                </div>
            </div>
        </div>

        {isMenuOpen && (
            <div className="md:hidden absolute top-16 right-0 bg-black/80 backdrop-blur-md p-4 rounded-bl-lg z-20">
                <div className="flex flex-col gap-4">
                    <button onClick={() => handleMobileNavClick(onHomeClick)} className="text-white hover:text-blue-300 transition-colors">Home</button>
                    <button onClick={() => handleMobileNavClick(onAboutClick)} className="text-white hover:text-blue-300 transition-colors">About Us</button>
                    <button onClick={() => handleMobileNavClick(onCoursesClick)} className="text-white hover:text-blue-300 transition-colors">Programs</button>
                    <button onClick={() => handleMobileNavClick(onWhatsSpecialClick)} className="text-white hover:text-blue-300 transition-colors">What's Special</button>
                    <button onClick={() => handleMobileNavClick(onContactClick)} className="text-white hover:text-blue-300 transition-colors">Contact Us</button>
                    <button 
                        onClick={() => handleMobileNavClick(onVerifyClick)}
                        className="relative overflow-hidden bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg group mt-2"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                        <span className="relative flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Verify Certificate
                        </span>
                    </button>
                    <button 
                        onClick={() => handleMobileNavClick(onLoginClick)}
                        className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 group"
                    >
                        <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 bg-white/20"></span>
                        <span className="relative flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Login
                        </span>
                    </button>
                </div>
            </div>
        )}
    </div>
  )
}

export default Hero
