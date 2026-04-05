import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Brownie from '../assets/brownie.png'

const ParallaxSection = () => {
  const ref = useRef(null);
  
  // hook into scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // map scroll progress to different element movements
  const yImage = useTransform(scrollYProgress, [0, 1], [-80, 80]); // image moves up
  const yText = useTransform(scrollYProgress, [0, 1], [30, -30]); // text moves down slower

  return (
    <div ref={ref} className="relative h-[80vh] bg-base-light overflow-hidden flex items-center justify-center my-16">
      <div className="absolute inset-0 z-0">
        {/* Full-width image background (can use image_0.png) */}
        <motion.img 
          style={{ y: yImage }}
          src={Brownie} 
          alt="Baking texture background" 
          className="w-full h-[140%] object-cover scale-110" // Extra height for the parallax range
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content that moves slower than the background image */}
      <motion.div style={{ y: yText }} className="relative z-10 text-center text-white px-6">
        <p className="text-xl uppercase font-sans font-bold tracking-widest text-shanora-pink mb-4">Our Commitment</p>
        <h2 className="text-5xl font-title max-w-3xl">Crafted with the Finest Ingredients, Baked with Perfection</h2>
      </motion.div>
    </div>
  );
};

export default ParallaxSection;