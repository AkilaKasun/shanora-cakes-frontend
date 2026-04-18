'use client';
import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoChevronDownOutline } from 'react-icons/io5';

import img1 from '../assets/MSGridd/1.png';
import img3 from '../assets/MSGridd/3.png';
import img4 from '../assets/MSGridd/4.png';
import img5 from '../assets/MSGridd/5.png';
import j1 from '../assets/MSGridd/20260402_173933.jpg';
import j2 from '../assets/MSGridd/20260402_173951.jpg';
import j3 from '../assets/MSGridd/20260402_174010.jpg';
import c1 from '../assets/MSGridd/C1.png';
import c2 from '../assets/MSGridd/C2.png';
import c4 from '../assets/MSGridd/C4.png';
import cc1 from '../assets/MSGridd/CC1.png';
import cc3 from '../assets/MSGridd/CC3.png';
import cc6 from '../assets/MSGridd/CC6.png';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const galleryRef = useRef(null);
  const containerRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 10;
  
    
    const galleryImages = [
    { id: 1, src: img1, title: 'Signature Cakes' },
    { id: 2, src: j1, title: 'Fresh Bakes' },
    { id: 3, src: c1, title: 'Customized Designs' },
    { id: 4, src: img3, title: 'Sweet Treats' },
    { id: 5, src: j2, title: 'Artisan Pastries' },
    { id: 6, src: cc1, title: 'Premium Cupcakes' },
    { id: 7, src: img4, title: 'Shanora Classics' },
    { id: 8, src: c2, title: 'Celebration Cakes' },
    { id: 9, src: cc3, title: 'Gourmet Selection' },
    { id: 10, src: img5, title: 'Luxury Bites' },
    { id: 11, src: j3, title: 'Oven Fresh' },
    { id: 12, src: c4, title: 'Special Orders' },
    { id: 13, src: cc6, title: 'Party Favors' },
  ];

  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, INITIAL_COUNT);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();
    const items = galleryRef.current.querySelectorAll('.gallery-item');

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      // Dynamic end value: Mobile needs a much shorter scroll to feel "right"
      const scrollDistance = isMobile ? "+=1000" : "+=2000";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",      
          end: scrollDistance, 
          pin: true,             
          pinSpacing: true,      
          scrub: 1,              
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      items.forEach((item) => {
        // We reduce the "messy" range on mobile so images don't fly off-screen
        const rangeMultiplier = isMobile ? 0.5 : 1; 

        tl.fromTo(item, 
          { 
            opacity: 0, 
            x: (Math.random() - 0.5) * (2000 * rangeMultiplier), 
            y: (Math.random() - 0.5) * (1000 * rangeMultiplier), 
            rotation: (Math.random() - 0.5) * 120, 
            scale: 0.2 
          },
          { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, ease: "power2.inOut" },
          0 
        );
      });
    });

    return () => mm.revert();
  }, [visibleImages]); // Re-run when "Explore More" is clicked

  return (
    <section 
      ref={containerRef} 
      id="gallery" 
      className="relative py-12 lg:py-24 bg-base-light px-4 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-title text-shanora-dark">
            Our <span className="text-shanora-purple">Gallery</span>
          </h2>
        </div>

        {/* On mobile, 'columns-2' makes cards very long. 
           We add 'pb-20' to ensure the 'Explore More' button 
           isn't covered during the pin.
        */}
        <div 
          ref={galleryRef}
          className="columns-2 md:columns-3 xl:columns-4 gap-4 lg:gap-6 space-y-4 lg:space-y-6 pb-24"
        >
          {visibleImages.map((image) => (
            <div 
              key={`${image.id}-${showAll}`}
              className="gallery-item break-inside-avoid group relative overflow-hidden rounded-xl border border-white/40 shadow-sm bg-white"
            >
              <img 
                src={image.src} 
                alt={image.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="mt-4 text-center relative z-50">
            <button 
              onClick={() => {
                setShowAll(true);
                // Reset scroll to the top of the section so the new 
                // animation sequence starts from the beginning
                const offset = containerRef.current.offsetTop;
                window.scrollTo({ top: offset, behavior: 'instant' });
              }}
              className="group bg-white border-2 border-shanora-purple text-shanora-purple px-8 py-3 rounded-full font-bold hover:bg-shanora-purple hover:text-white transition-all shadow-lg flex items-center gap-2 mx-auto pointer-events-auto"
            >
              Explore More 
              <IoChevronDownOutline />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;