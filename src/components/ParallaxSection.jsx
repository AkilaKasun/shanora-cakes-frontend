'use client';
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Brownie from '../assets/brownie.png';

gsap.registerPlugin(ScrollTrigger);

const ParallaxSection = () => {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);
  
  // 1. GSAP Pinning Logic for the "Card" effect
  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        pin: true,
        pinSpacing: false, // Next section (Gallery) slides over this
        anticipatePin: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Framer Motion Logic for internal parallax movement
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={containerRef} className="relative w-full h-screen z-30 shadow-2xl">
      <div 
        ref={parallaxRef} 
        className="relative h-full w-full bg-base-light overflow-hidden flex items-center justify-center"
      >
        <div className="absolute inset-0 z-0">
          <motion.img 
            style={{ y: yImage }}
            src={Brownie} 
            alt="Baking texture" 
            className="w-full h-[150%] object-cover scale-110" 
          />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <motion.div 
          style={{ y: yText }} 
          className="relative z-10 text-center text-white px-6"
        >
          <p className="text-lg md:text-xl uppercase font-sans font-bold tracking-widest text-shanora-pink-light mb-4">
            Our Commitment
          </p>
          <h2 className="text-4xl md:text-6xl font-title max-w-4xl leading-tight drop-shadow-lg">
            Crafted with the <span className="text-shanora-pink-light">Finest Ingredients</span>, Baked with Perfection
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxSection;