import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from 'framer-motion';
import styles from './style.module.scss';

gsap.registerPlugin(ScrollTrigger);

function Contact() {
    const contactRef = useRef(null);

    useEffect(() => {
        var clutter = "";
        const para = document.querySelector(".textpara2")
        if (para) {
            const characters = para.textContent.split("")
            characters.forEach(function(e) {
                clutter += `<span>${e}</span>`
            })
            para.innerHTML = clutter;   
            gsap.set(".textpara2 span", {opacity: .1})
            gsap.to(".textpara2 span", {
                scrollTrigger: {
                    trigger: ".contact",
                    start: "top 60%",
                    end: "bottom 90%",
                    scrub: 1,
                },
                opacity: 1, 
                stagger: .03,   
            })
        }

        // Animate contact cards
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".contact-section",
                start: "top 70%",
                end: "bottom 80%",
                scrub: false,
            }
        });

        tl.fromTo(".contact-card", {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out"
        });

    },[]);

    return (
        <div 
            ref={contactRef}
            data-color="white" 
            className="contact section w-full mt-32 px-8 py-16"
        >
            <div className="text w-full max-w-7xl mx-auto">
                <div className='hidden w-full sm:flex items-center justify-center mb-12'>
                    <hr className='bg-zinc-400 w-[20%] h-[.3vh]' />
                </div>    
                <h2 className='textpara2 text-purple-600 font-[Sansita] text-[2.4vh] sm:text-[3.5vh] font-medium text-center tracking-wide leading-[5vh] mb-16'>GET IN TOUCH</h2>
                
                <div className="contact-section grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Visit Us Card */}
                    <motion.div 
                        className="contact-card bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg relative overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.cardGlow}></div>
                        <div className={`${styles.cardIcon} bg-blue-500 text-white rounded-full p-4 mb-6 inline-flex`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Visit Our Office</h3>
                        <p className="text-gray-600 mb-4">
                            Corporate Office- Office No: VO-301, WeWork Prestige Central, Ground Floor, 36, Infantry Rd, Tasker Town, Shivaji Nagar, Bengaluru, Karnataka 560001
                        </p>
                        <a href="#" className={`${styles.contactLink} text-blue-600 font-medium inline-flex items-center`}>
                            Get Directions
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </motion.div>

                    {/* Call Us Card */}
                    <motion.div 
                        className="contact-card bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg relative overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className={styles.cardGlow}></div>
                        <div className={`${styles.cardIcon} bg-purple-500 text-white rounded-full p-4 mb-6 inline-flex`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Call Us</h3>
                        <p className="text-gray-600 mb-2">We're available Monday-Friday</p>
                        <p className="text-gray-600 mb-4">9:00 AM - 6:00 PM IST</p>
                        <a href="tel:+919368842663" className={`${styles.contactLink} text-purple-600 font-medium inline-flex items-center`}>
                            +91 9368842663
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </motion.div>

                    {/* Email Us Card */}
                    <motion.div 
                        className="contact-card bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl shadow-lg relative overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className={styles.cardGlow}></div>
                        <div className={`${styles.cardIcon} bg-green-500 text-white rounded-full p-4 mb-6 inline-flex`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Email Us</h3>
                        <p className="text-gray-600 mb-2">For general inquiries:</p>
                        <a href="mailto:info@inlighntech.com" className="text-gray-600 mb-4 block">info@inlighntech.com</a>
                        <p className="text-gray-600 mb-2">For internship inquiries:</p>
                        <a href="mailto:internships@inlighntech.com" className={`${styles.contactLink} text-green-600 font-medium inline-flex items-center`}>
                            internships@inlighntech.com
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
                
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Connect With Us</h3>
                    <div className="flex justify-center space-x-6">
                        <a href="#" className={styles.socialIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                            </svg>
                        </a>
                        <a href="#" className={styles.socialIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                        <a href="#" className={styles.socialIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
                        <a href="#" className={styles.socialIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default Contact
