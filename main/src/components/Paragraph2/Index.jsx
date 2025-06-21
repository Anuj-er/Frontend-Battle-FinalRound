import img1 from '../../assets/images/review2.jpg'
import { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



function Contact() {
    useEffect(() => {
        var clutter = "";
        const para = document.querySelector(".textpara2")
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
    },[]);
  return (
    <div data-color="white" className="contact section w-full flex items-center mt-32 px-8
    justify-center -translate-y-1/5 ">
        <div className="text sm:w-[80%] flex flex-col items-center sm:items-center justify-center ">
            <div className='hidden w-[40%] sm:flex items-center justify-center mb-12'>
                <hr className='bg-zinc-400 w-[20%] h-[.3vh]' />
            </div>    
            <h2 className='textpara2 sm:w-[40%] text-purple-600 font-[Sansita] text-[2.4vh] sm:text-[3.5vh] font-medium text-center tracking-wide leading-[5vh] mb-10'>GET IN TOUCH</h2>
            
            <div className="contact-form w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                        <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input 
                            type="email" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Domain of Internship *</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Full Stack Development</option>
                            <option>Data Science</option>
                            <option>Data Analytics</option>
                            <option>Python Development</option>
                            <option>Business Analysis</option>
                            <option>Cyber Security</option>
                            <option>Project Management</option>
                            <option>UI/UX Design</option>
                            <option>Digital Marketing</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                        <textarea 
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
            
            <div className="contact-info mt-8 text-center">
                <p className="text-gray-600 mb-4">
                    Corporate Office- Office No: VO-301, WeWork Prestige Central, Ground Floor, 36, Infantry Rd, Tasker Town, Shivaji Nagar, Bengaluru, Karnataka 560001
                </p>
                <p className="text-gray-600 mb-2">+91 9368842663</p>
                <p className="text-gray-600">info@inlighntech.com</p>
            </div>
        </div>  
    </div>
  )
}

export default Contact
