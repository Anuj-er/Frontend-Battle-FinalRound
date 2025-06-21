import {useEffect} from 'react';
import { gsap } from "gsap";
import { Power4} from 'gsap/gsap-core';

// Program logos and icons
const programIcons = {
  fullstack: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full p-4">
      <path d="M16.5 6a3 3 0 00-3-3H6a3 3 0 00-3 3v7.5a3 3 0 003 3v-6A4.5 4.5 0 0110.5 6h6z" />
      <path d="M18 7.5a3 3 0 013 3V18a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-7.5a3 3 0 013-3H18z" />
    </svg>
  ),
  dataScience: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full p-4">
      <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
    </svg>
  ),
  dataAnalytics: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full p-4">
      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
    </svg>
  ),
  python: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full p-4">
      <path fillRule="evenodd" d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" clipRule="evenodd" />
    </svg>
  ),
  business: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full p-4">
      <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
      <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
    </svg>
  ),
  security: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full p-4">
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  ),
  project: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full p-4">
      <path d="M11.625 16.5a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75z" />
      <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 001.06-1.06l-1.047-1.048A3.375 3.375 0 1011.625 18z" clipRule="evenodd" />
      <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
    </svg>
  ),
  uiux: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full p-4">
      <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 00-3.471 2.987 10.04 10.04 0 014.815 4.815 18.748 18.748 0 002.987-3.472l3.386-5.079A1.902 1.902 0 0020.599 1.5zm-8.3 14.025a18.76 18.76 0 001.896-1.207 8.026 8.026 0 00-4.513-4.513A18.75 18.75 0 008.475 11.7l-.278.5a5.26 5.26 0 013.601 3.602l.502-.278zM6.75 13.5A3.75 3.75 0 003 17.25a1.5 1.5 0 01-1.601 1.497.75.75 0 00-.7 1.123 5.25 5.25 0 009.8-2.62 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
    </svg>
  ),
  marketing: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full p-4">
      <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clipRule="evenodd" />
    </svg>
  )
};

const data = [
    {key: 1, title: "Full Stack Development", role: "React, Node.js, MongoDB, API Development", icon: programIcons.fullstack, bgColor: "bg-blue-100"},
    {key: 2, title: "Data Science", role: "Machine Learning, Data Visualization, AI Models", icon: programIcons.dataScience, bgColor: "bg-purple-100"},
    {key: 3, title: "Data Analytics", role: "SQL, Power BI, Tableau, Data Cleaning", icon: programIcons.dataAnalytics, bgColor: "bg-green-100"},
    {key: 4, title: "Python Development", role: "Django, Flask, Web Scraping, Automation", icon: programIcons.python, bgColor: "bg-yellow-100"},
    {key: 5, title: "Business Analysis", role: "Market Research, Business Intelligence, Financial Analysis", icon: programIcons.business, bgColor: "bg-orange-100"},
    {key: 6, title: "Cyber Security", role: "Network Security, Ethical Hacking, Security Analysis", icon: programIcons.security, bgColor: "bg-red-100"},
    {key: 7, title: "Project Management", role: "Agile, Scrum, Risk Management, Stakeholder Communication", icon: programIcons.project, bgColor: "bg-indigo-100"},
    {key: 8, title: "UI/UX Design", role: "User Research, Wireframing, Prototyping, Design Systems", icon: programIcons.uiux, bgColor: "bg-pink-100"},
    {key: 9, title: "Digital Marketing", role: "SEO, Social Media, Content Marketing, Analytics", icon: programIcons.marketing, bgColor: "bg-teal-100"},
]


function List() {

  
  useEffect(() => {
    var rotate = 0;
    var diffrot = 0;
    const list = document.querySelectorAll('.listelem')

    list.forEach((el) => {  
      el.addEventListener('mousemove', function(dets) {
        
        var diff = dets.clientY - el.getBoundingClientRect()
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(this.querySelector(".program-icon"), {
          opacity: 1,
          ease: Power4,
          top: diff,
          left: dets.clientX,
          rotate: gsap.utils.clamp(-20, 20, diffrot * 0.2),
        })
      })
      el.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector(".program-icon"), {opacity: 0, ease: Power4, duration: .5})
      })
      el.addEventListener('mousemove', function() {
        gsap.to(this.querySelector(".bluelayer"), {
          height: '100%', 
          ease: Power4,
          duration: .1
        })
      })
      el.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector(".bluelayer"), {
          height: '0%',  
          ease: Power4, 
          duration: .1})
      })
    })
  })

  return (
    <div className="list-container">
      {data.map((item, index) => {
        return (
          <div 
            key={index} 
            className="listelem w-full py-[3vh] sm:px-[4vh] sm:py-[6vh] 
            flex justify-between items-center
            border-b-2 border-black sm:relative"
          >
            <div 
              className="relative w-full sm:flex 
              sm:items-center justify-between z-[3]"
            >
              <div className="left sm:flex items-center gap-14 sm:text-5xl">
                <h3 className="hidden sm:inline-block opacity-25">0{item.key}</h3>
                <h1 className="text-blue-600 text-3xl sm:text-black sm:text-[6vh]">{item.title}</h1>
              </div>
              <h3 className="font-[Sansita] text-[3vh] sm:text-[2.4vh] font-medium tracking-tight">
                {item.role}
              </h3>   
            </div>
            <div 
              className={`program-icon w-[14vh] h-[14vh] opacity-100 right-0 
              sm:opacity-0 sm:absolute z-[4] sm:top-1/2 
              sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[15rem] sm:h-[15rem] 
              overflow-hidden rounded-full ${item.bgColor} text-gray-800 flex items-center justify-center`}
            >
              {item.icon}
            </div>
            <div className="hidden sm:inline-block bluelayer sm:absolute top-0 left-0 z-[2] w-full h-0 bg-[#f5f19c]"></div>
          </div>
        )
      })}
    </div>
  )
}

export default List
