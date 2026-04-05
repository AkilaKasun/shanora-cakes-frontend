import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom'; // Added for navigation
import Cake from '../assets/logo.png'; 

// Import local assets
import BgLightPinkCake from '../assets/cake.jpg';
import BgCupcakePlatter from '../assets/brownie.png';
import BgBentoBaking from '../assets/cupcake.jpg';

const Hero = () => {
  const comp = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const cakeRef = useRef(null);
  const [bgIndex, setBgIndex] = useState(0);

  const bgImages = [BgLightPinkCake, BgCupcakePlatter, BgBentoBaking];

  useEffect(() => {
    if (bgImages.length > 1) {
      const timer = setInterval(() => {
        setBgIndex((prev) => (prev + 1) % bgImages.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [bgImages.length]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      gsap.set([titleRef.current, textRef.current, ctaRef.current, cakeRef.current], { 
        opacity: 0, 
        y: 30 
      });

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.4')
        .to(cakeRef.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.2, 
          ease: 'power4.out',
          startAt: { scale: 0.9 }
        }, '-=0.5');
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className="relative min-h-screen flex items-center pt-20 lg:pt-28 overflow-hidden text-white">
      
      {/* --- Background Slider --- */}
      <div className="absolute inset-0 -z-20">
        {bgImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${index === bgIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Darker overlay for mobile readability */}
        <div className="absolute inset-0 bg-black/30 lg:bg-transparent"></div>
      </div>

      {/* --- Glass Overlay --- */}
      <div className="absolute inset-0 -z-10 bg-shanora-purple/20 backdrop-blur-[2px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Content - Center text on mobile, left-align on desktop */}
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-title leading-[1.1] drop-shadow-2xl text-white">
              Crafting <span className="text-shanora-pink-light">Graceful</span> Moments,<br className="hidden sm:block" /> One Cake At A Time
            </h1>
            
            <p ref={textRef} className="text-base sm:text-lg md:text-xl font-sans text-gray-100 max-w-xl mx-auto lg:mx-0 drop-shadow-md leading-relaxed">
              Indulge in our exquisite range of handcrafted confections, from delicate pastel designs to artisan brownies.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Link to="/order" className="w-full sm:w-auto">
                <button className="w-full bg-shanora-pink-light text-shanora-purple px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition shadow-xl hover:-translate-y-1">
                  Order Now
                </button>
              </Link>
              <button className="w-full sm:w-auto border-2 border-white/50 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-shanora-purple transition">
                View Gallery
              </button>
            </div>
          </div>

          {/* Right Side: Hero Image - Scaled for different screens */}
          <div ref={cakeRef} className="relative flex justify-center items-center order-1 lg:order-2 px-6 sm:px-12 lg:px-0">
            {/* Background Glow */}
            <div className="absolute w-[80%] h-[80%] sm:w-[100%] sm:h-[100%] rounded-full bg-shanora-pink-light/40 blur-[60px] sm:blur-[100px] -z-10 animate-pulse-slow"></div>
            
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