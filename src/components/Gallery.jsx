import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import images from your MSGridd folder
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

  // Array mapping your imported assets
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


//     const galleryImages = [
//     { id: 1, src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', title: 'Customized Cake' },
//     { id: 2, src: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2', title: 'Purple Cupcakes' },
//     { id: 3, src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3', title: 'Pastel Brownies' },
//     { id: 4, src: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579', title: 'Bento Cakes' },
//     { id: 5, src: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e', title: 'Pink Delights' },
//     { id: 6, src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c', title: 'Chocolate Gems' },
//   ];
  useEffect(() => {
    const items = galleryRef.current.querySelectorAll('.gallery-item');
    
    let ctx = gsap.context(() => {
      gsap.fromTo(items, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
          }
        }
      );
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className="py-20 bg-base-light px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-title text-shanora-dark mb-4">
            Our <span className="text-shanora-purple">Gallery</span>
          </h2>
          <div className="h-1 w-24 bg-shanora-pink mx-auto rounded-full"></div>
        </div>

        {/* Masonry Layout */}
        <div 
          ref={galleryRef}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        >
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className="gallery-item break-inside-avoid group relative overflow-hidden rounded-xl border border-white/40 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Purple Glass Hover Effect */}
              <div className="absolute inset-0 bg-shanora-purple/30 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center text-center p-4">
                <span className="text-white font-title text-xl drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {image.title}
                </span>
              </div>

              <img 
                src={image.src} 
                alt={image.title} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;