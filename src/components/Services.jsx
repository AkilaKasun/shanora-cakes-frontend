import React from 'react';
import { motion } from 'framer-motion';
// Using react-icons for a more professional look
import { IoSparklesOutline, IoHeartOutline, IoBalloonOutline, IoGiftOutline, IoCafeOutline, IoColorWandOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const services = [
  { name: 'Birthday Cakes', icon: <IoBalloonOutline />, desc: 'Custom designs that make every birthday wish come true.' },
  { name: 'Anniversary Cakes', icon: <IoHeartOutline />, desc: 'Elegant tiers to celebrate your most cherished milestones.' },
  { name: 'Customized Cakes', icon: <IoColorWandOutline />, desc: 'Your imagination, baked to perfection with artisan detail.' },
  { name: 'Bento Cakes', icon: <IoGiftOutline />, desc: 'Adorable mini-cakes, perfect for intimate gifting.' },
  { name: 'Brownies', icon: <IoCafeOutline />, desc: 'Signature fudgy textures for the ultimate chocolate lover.' },
  { name: 'Cupcakes', icon: <IoSparklesOutline />, desc: 'Bite-sized masterpieces for parties or solo treats.' },
];

const Services = () => {
  return (
    <section id="menu" className="relative py-32 overflow-hidden bg-base-light">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-shanora-pink/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-shanora-purple/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-shanora-purple font-bold tracking-[0.2em] uppercase text-sm mb-4"
          >
            The Shanora Collection
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-title text-shanora-dark"
          >
            Everything Sweet <span className="italic text-shanora-pink">Under One Roof</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -15,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="relative group bg-shanora-purple/20 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white shadow-elegant hover:shadow-2xl hover:shadow-shanora-purple transition-all duration-500 overflow-hidden"
            >
              {/* Animated Gradient Border on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-shanora-pink/20 to-shanora-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              <div className="relative z-10">
                <motion.div 
                  className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl text-shanora-purple shadow-sm mb-8 group-hover:bg-shanora-purple group-hover:text-white transition-colors duration-500"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  {service.icon}
                </motion.div>

                <h3 className="text-2xl font-title text-shanora-dark mb-4">{service.name}</h3>
                <p className="text-gray-600 font-sans leading-relaxed group-hover:text-shanora-dark transition-colors">
                  {service.desc}
                </p>

                <div className="mt-8 flex items-center gap-2 text-shanora-purple font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <Link to="/order"><button className='px-6 py-2.5 rounded-full font-semibold hover:bg-shanora-pink  transition'>Inquire Now</button></Link>
                  <div className="h-px w-8 bg-shanora-purple" />
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