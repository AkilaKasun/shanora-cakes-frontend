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
  
  // Reduced to 8 so button is more likely to be visible above the scroll-end
  const INITIAL_COUNT = 8; 
  
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
      let { isDesktop } = context.conditions;

      if (isDesktop) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",      
            end: "+=1200", // Reduced distance so user reaches the button faster
            pin: true,             
            pinSpacing: true,      
            scrub: 1,              
            invalidateOnRefresh: true,
          }
        });

        items.forEach((item) => {
          tl.fromTo(item, 
            { 
              opacity: 0, 
              x: (Math.random() - 0.5) * 1500, 
              y: (Math.random() - 0.5) * 800, 
              rotation: (Math.random() - 0.5) * 90, 
              scale: 0.2 
            },
            { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, ease: "power2.inOut" },
            0 
          );
        });
      } else {
        items.forEach((item) => {
          gsap.fromTo(item, 
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.6,
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse",
              }
            }
          );
        });
      }
    });

    ScrollTrigger.refresh();
    return () => mm.revert();
  }, [visibleImages, showAll]); 

  const handleExploreMore = (e) => {
    e.preventDefault();
    setShowAll(true);
    // Force a small delay to allow DOM to render before refresh
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <section 
      ref={containerRef} 
      id="gallery" 
      className="relative py-16 lg:py-24 bg-base-light px-4 overflow-visible min-h-screen"
    >
      <div className="container mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-title text-shanora-dark mb-4">
            Our <span className="text-shanora-purple">Gallery</span>
          </h2>
          <div className="h-1 w-24 bg-shanora-pink mx-auto rounded-full"></div>
        </div>

        <div 
          ref={galleryRef}
          className="columns-2 md:columns-3 xl:columns-4 gap-4 lg:gap-6 space-y-4 lg:space-y-6 w-full"
        >
          {visibleImages.map((image) => (
            <div 
              key={`${image.id}-${showAll}`}
              className="gallery-item break-inside-avoid group relative overflow-hidden rounded-xl lg:rounded-2xl border border-white/40 shadow-sm bg-white"
            >
              <div className="absolute inset-0 bg-shanora-purple/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center text-center p-4">
                <span className="text-white font-title text-sm lg:text-xl">
                  {image.title}
                </span>
              </div>
              <img 
                src={image.src} 
                alt={image.title} 
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Explicitly check showAll and items length */}
        {!showAll && galleryImages.length > INITIAL_COUNT && (
          <div className="mt-12 mb-20 text-center relative z-[100] w-full">
            <button 
              onClick={handleExploreMore}
              className="group bg-white border-2 border-shanora-purple text-shanora-purple px-10 py-4 rounded-full font-bold text-lg hover:bg-shanora-purple hover:text-white transition-all duration-300 shadow-xl flex items-center gap-2 mx-auto cursor-pointer"
              style={{ pointerEvents: 'auto' }}
            >
              Explore More 
              <IoChevronDownOutline className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;