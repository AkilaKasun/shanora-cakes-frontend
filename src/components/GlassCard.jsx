import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      // Fade-in animation on scroll
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: delay, duration: 0.6, ease: 'easeOut' }}

      // Modern Hover Interaction: Smooth lift and scaling
      whileHover={{ 
        y: -15, // Lifts the card up
        scale: 1.02, // Subtle scaling effect
        transition: { type: 'spring', stiffness: 400, damping: 15 } // 'Magnetic' snap feel
      }}
      className={`
        relative group
        
        /* 1. The 'Glass' Effect (v4 compatible) */
        bg-white/40           /* Translucent background */
        backdrop-blur-xl       /* The frost/blur effect */
        
        /* 2. The Translucent Border */
        border border-white/40
        
        /* 3. The Custom Light Purple Shadow Glow */
        shadow-purple-glow
        
        /* Layout and Presentation */
        rounded-[2.5rem]      /* Extra round for soft look */
        p-10                   /* Generous inner padding */
        
        /* Optional: Add a subtle 'shine' effect in the corner on hover */
        after:absolute after:inset-0 after:rounded-[2.5rem]
        after:bg-gradient-to-br after:from-white/20 after:to-transparent
        after:opacity-0 group-hover:opacity-100 transition-opacity duration-700

        ${className}           /* Merge any extra classes */
      `}
    >
      {/* Container for content, ensuring it's above the shine overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;