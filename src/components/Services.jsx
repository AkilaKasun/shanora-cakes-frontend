'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoSparklesOutline, IoHeartOutline, IoBalloonOutline, IoGiftOutline, IoCafeOutline, IoColorWandOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: 'Birthday Cakes', icon: <IoBalloonOutline />, desc: 'Custom designs that make every birthday wish come true.' },
  { name: 'Anniversary Cakes', icon: <IoHeartOutline />, desc: 'Elegant tiers to celebrate your most cherished milestones.' },
  { name: 'Customized Cakes', icon: <IoColorWandOutline />, desc: 'Your imagination, baked to perfection with artisan detail.' },
  { name: 'Bento Cakes', icon: <IoGiftOutline />, desc: 'Adorable mini-cakes, perfect for intimate gifting.' },
  { name: 'Brownies', icon: <IoCafeOutline />, desc: 'Signature fudgy textures for the ultimate chocolate lover.' },
  { name: 'Cupcakes', icon: <IoSparklesOutline />, desc: 'Bite-sized masterpieces for parties or solo treats.' },
];

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        pin: true,
        pinSpacing: false, 
        anticipatePin: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="services" 
      className="relative min-h-screen w-full overflow-hidden bg-base-light flex flex-col justify-center py-20 shadow-2xl z-20 pointer-events-auto"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-shanora-pink/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-shanora-purple/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-shanora-purple font-bold tracking-[0.2em] uppercase text-xs mb-2"
          >
            The Shanora Collection
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-title text-shanora-dark"
          >
            Everything Sweet <span className="italic text-shanora-pink">Under One Roof</span>
          </motion.h2>
        </div>

        {/* Reduced gap from 10 to 6 to save screen real estate */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              // Reduced padding from p-10 to p-7 and rounded corner size slightly for better fit
              className="relative group bg-shanora-purple/20 backdrop-blur-xl p-7 rounded-[2rem] border border-white shadow-elegant hover:shadow-2xl hover:shadow-shanora-purple transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-shanora-pink/20 to-shanora-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              <div className="relative z-10">
                <motion.div 
                  // Scaled icon box from w-16 to w-14
                  className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl text-shanora-purple shadow-sm mb-5 group-hover:bg-shanora-purple group-hover:text-white transition-colors duration-500"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  {service.icon}
                </motion.div>

                <h3 className="text-xl font-title text-shanora-dark mb-3">{service.name}</h3>
                <p className="text-gray-600 font-sans text-sm leading-relaxed group-hover:text-shanora-dark transition-colors line-clamp-2">
                  {service.desc}
                </p>

                <div className="mt-6 flex items-center gap-2 text-shanora-purple font-bold text-xs opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <Link to="/order">
                    <button className='px-5 py-2 rounded-full font-semibold hover:bg-shanora-pink transition'>
                      Inquire Now
                    </button>
                  </Link>
                  <div className="h-px w-6 bg-shanora-purple" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;