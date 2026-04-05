import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import Cake from '../assets/cake.jpg'; // The main foreground animated cake (image_0.png)

// 1. IMPORT YOUR NEW GENERATED PASTEL BACKGROUND IMAGES HERE
// Example paths (replace with your actual filenames and paths):
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

  // 2. UPDATE THIS ARRAY WITH YOUR IMPORTED PASTEL IMAGE VARIABLES
  // Example array structure:
//   const bgImages = [BgLightPinkCake, BgCupcakePlatter, BgBentoBaking];
  
  // Placeholder array for demonstration
  const bgImages = [
    'https://images.wallpaperscraft.com/image/single/cupcake_topping_whipped_cream_1067507_3840x2400.jpg', // Light Pink Cake with Lavender Edible Glass
    'https://images.wallpaperscraft.com/image/single/cake_dessert_sweet_148288_3840x2400.jpg', // Pastel Cupcakes on Glass Platter
    'https://images.wallpaperscraft.com/image/single/cupcakes_muffin_topping_881850_3840x2400.jpg', // Lavender Bento Cake with Glass Rose
   
  ];

  // Background Slider Logic (cross-fade)
  useEffect(() => {
    if (bgImages.length > 1) {
        const timer = setInterval(() => {
          setBgIndex((prev) => (prev + 1) % bgImages.length);
        }, 6000); // 6-second interval for graceful transition
        return () => clearInterval(timer);
    }
  }, [bgImages.length]);

  // GSAP Entrance Animation Logic
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Set initial hidden state (opacity 0 and y offset)
      gsap.set([titleRef.current, textRef.current, ctaRef.current, cakeRef.current], { 
        opacity: 0, 
        y: 40 // Slightly increased initial offset for a softer rise
      });

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.4') // Adjusted back ease for grace
        .to(cakeRef.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.2, 
          ease: 'power4.out',
          startAt: { scale: 0.96 } // Very subtle start scale
        }, '-=0.5');
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className="relative min-h-screen flex items-center pt-24 overflow-hidden text-white">
      
      {/* --- Background Slider Layer --- */}
      <div className="absolute inset-0 -z-20">
        {bgImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-in-out ${index === bgIndex ? 'opacity-100' : 'opacity-0'}`}
            // 3. THIS STYLE NOW REFERENCES YOUR LOCAL IMPORTED VARIABLES
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      {/* --- Glass/Pastel Overlay for consistent readability --- */}
      <div className="absolute inset-0 -z-10 bg-shanora-purple/10 backdrop-blur-[3px] gradient-overlay-subtle"></div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Content */}
        <div className="space-y-6">
          <h1 ref={titleRef} className="text-6xl md:text-7xl font-title leading-tight drop-shadow-lg text-shanora-pink-light">
            Crafting <span className="text-white">Graceful</span> Moments,<br /> One Cake At A Time
          </h1>
          <p ref={textRef} className="text-xl font-sans text-gray-100 max-w-lg drop-shadow-md">
            Indulge in our exquisite range of handcrafted confections, from delicate pastel designs to classic favorites.
          </p>
          <div ref={ctaRef} className="flex gap-4 pt-2">
            <button className="bg-shanora-pink-light text-shanora-purple px-9 py-3.5 rounded-full font-bold text-lg hover:bg-white transition shadow-xl">
              Explore Our Menu
            </button>
            <button className="border-2 border-white text-white px-9 py-3.5 rounded-full font-bold text-lg hover:bg-white hover:text-shanora-purple transition">
              Get A Quote
            </button>
          </div>
        </div>

        {/* Right Side: Hero Image (image_0.png remains the main cake) */}
        <div ref={cakeRef} className="relative flex justify-center items-center">
          {/* Subtle Background Glow suited for pastel theme */}
          <div className="absolute w-[110%] h-[110%] rounded-full bg-shanora-pink-light/30 blur-[80px] -z-10 animate-pulse-slow"></div>
          {/* <img src={Cake} alt="Featured Tiered Cake" className="h-[550px] md:h-[650px] w-auto drop-shadow-2xl" /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;