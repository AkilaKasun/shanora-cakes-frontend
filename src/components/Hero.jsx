'use client';
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Cake from '../assets/logo.png'; 

// Import local assets
import BgLightPinkCake from '../assets/cake.jpg';
import BgCupcakePlatter from '../assets/brownie.png';
import BgBentoBaking from '../assets/cupcake.jpg';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const comp = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const cakeRef = useRef(null);

  const bgImages = [BgLightPinkCake, BgCupcakePlatter, BgBentoBaking];

  // Background Slideshow Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bgImages.length]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // PINNING LOGIC
      ScrollTrigger.create({
        trigger: comp.current,
        start: "top top",
        pin: true,
        pinSpacing: false, 
        anticipatePin: 1,
      });

      // Intro Animation using specific refs for better targeting
      const tl = gsap.timeline();
      tl.from([titleRef.current, textRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2
      });

      tl.from(cakeRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "elastic.out(1, 0.7)"
      }, "-=0.8");

    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} id="hero" className="section-layer flex items-center text-white overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 -z-20">
        {bgImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${index === bgIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 -z-10 bg-shanora-purple/20 backdrop-blur-[2px]"></div>

      {/* CRITICAL FIX: Added relative, z-30, and pointer-events-auto 
          to ensure the buttons stay on top of the GSAP pin spacer 
      */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30 pointer-events-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-title leading-[1.1] drop-shadow-2xl text-white">
              Crafting <span className="text-shanora-pink-light">Graceful</span> Moments,<br className="hidden sm:block" /> One Cake At A Time
            </h1>
            
            <p ref={textRef} className="text-base sm:text-lg md:text-xl font-sans text-gray-100 max-w-xl mx-auto lg:mx-0 drop-shadow-md leading-relaxed">
              Indulge in our exquisite range of handcrafted confections, from delicate pastel designs to artisan brownies.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              {/* React Router Link needs to be wrapping the button correctly */}
              <Link to="/order" className="w-full sm:w-auto relative z-50">
                <button className="w-full bg-shanora-pink-light text-shanora-purple px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all shadow-xl hover:-translate-y-1 active:scale-95 cursor-pointer">
                  Order Now
                </button>
              </Link>
              <button className="w-full sm:w-auto border-2 border-white/50 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-shanora-purple transition-all active:scale-95 cursor-pointer relative z-50">
                View Gallery
              </button>
            </div>
          </div>

          <div ref={cakeRef} className="relative flex justify-center items-center order-1 lg:order-2 px-6 sm:px-12 lg:px-0">
            <div className="absolute w-[80%] h-[80%] sm:w-[100%] sm:h-[100%] rounded-full bg-shanora-pink-light/40 blur-[60px] sm:blur-[100px] -z-10 animate-pulse"></div>
            <img 
              src={Cake} 
              alt="Featured Cake" 
              className="h-[200px] sm:h-[350px] lg:h-[450px] xl:h-[550px] w-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-contain" 
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;