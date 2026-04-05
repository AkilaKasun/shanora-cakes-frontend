// import React, { useLayoutEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// // --- GSAP Imports for Parallax ---
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Assets
// import Logo from './assets/logo.png';
// import BrownieAsset from './assets/brownie.png'; // Assuming this is the brownie stack image

// // Using Ionicons and Font Awesome from react-icons
// import { 
//   IoCallOutline, 
//   IoMailOutline, 
//   IoLocationOutline, 
//   IoLogoFacebook, 
//   IoLogoInstagram, 
//   IoLogoWhatsapp 
// } from 'react-icons/io5';
// import { FaBirthdayCake, FaCookie } from 'react-icons/fa';

// // Register GSAP Plugin
// gsap.registerPlugin(ScrollTrigger);

// const App = () => {
//   // Ref for the parallax container
//   const parallaxRef = useRef(null);

//   const products = [
//     { name: "Birthday Cakes", icon: <FaBirthdayCake /> },
//     { name: "Anniversary Cakes", icon: <span className="text-3xl">💍</span> },
//     { name: "Customized Cakes", icon: <span className="text-3xl">✨</span> },
//     { name: "Bento Cakes", icon: <span className="text-3xl">🍱</span> },
//     { name: "Brownies", icon: <FaCookie /> },
//     { name: "Cup Cakes", icon: <span className="text-3xl">🧁</span> }
//   ];

//   // --- GSAP Parallax Implementation ---
//   useLayoutEffect(() => {
//     let ctx = gsap.context(() => {
//       // Setup the master timeline linked to scroll
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: parallaxRef.current, // Start when this section enters viewport
//           start: "top bottom", // Animation starts when top of section hits bottom of screen
//           end: "bottom top", // Ends when bottom of section hits top of screen
//           scrub: true, // Smoothly links animation to scrollbar
//           // markers: true, // Uncomment to visualize start/end points during dev
//         }
//       });

//       // Layer 1: The stylized cake outline (fastest)
//       tl.to(".parallax-cake", { y: -150, ease: "none" }, 0);

//       // Layer 2: The actual brownie asset (medium)
//       tl.to(".parallax-brownie", { y: -80, ease: "none" }, 0);

//       // Layer 3: Text & Accent Circles (slowest)
//       tl.to(".parallax-text", { y: -30, ease: "none" }, 0);
//       tl.to(".parallax-circle", { y: -50, scale: 1.1, ease: "none" }, 0);

//     }, parallaxRef); // scope to this component

//     return () => ctx.revert(); // cleanup on unmount
//   }, []);

//   return (
//     <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-purple-200">
      
//       {/* 1. STICKY NAVIGATION (Unchanged) */}
//       <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-purple-100 px-8 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <motion.img 
//             src={Logo} 
//             alt="Shanora Cakes Logo" 
//             className="w-12 h-12 object-contain"
//             whileHover={{ rotate: 10, scale: 1.1 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           />
//           <span className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
//             Shanora Cakes
//           </span>
//         </div>
        
//         <div className="hidden md:flex space-x-10 font-medium text-gray-600">
//           <a href="#home" className="hover:text-pink-500 transition-colors">Home</a>
//           <a href="#items" className="hover:text-pink-500 transition-colors">Our Menu</a>
//           <a href="#contact" className="hover:text-pink-500 transition-colors">Contact</a>
//         </div>

//         <button className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-7 py-2.5 rounded-full font-bold shadow-md hover:shadow-pink-200/50 transition-all hover:-translate-y-0.5 active:scale-95">
//           Order Now
//         </button>
//       </nav>

//       {/* 2. HERO SECTION (Unchanged) */}
//       <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-50 via-white to-purple-50">
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//           className="text-center z-10 px-6"
//         >
//           <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
//             Sweetening <br />
//             <span className="text-pink-400 italic">Every Story</span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
//             Premium customized cakes and brownies handcrafted in Matale. 
//             We turn your sweet dreams into edible art.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <a href="#items" className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-xl">
//               Explore Menu
//             </a>
//             <a href="#contact" className="bg-white text-purple-600 border border-purple-100 px-10 py-4 rounded-full font-bold hover:bg-purple-50 transition shadow-sm">
//               Get a Quote
//             </a>
//           </div>
//         </motion.div>

//         <motion.div 
//           animate={{ rotate: 360 }} 
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           className="absolute -top-20 -right-20 w-96 h-96 border border-pink-100 rounded-full opacity-50"
//         />
//       </section>

//       {/* --- NEW: PARALLAX VISUAL SHOWCASE SECTION --- */}
//       <section 
//         ref={parallaxRef} 
//         className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-white border-y border-purple-50"
//       >
//         {/* Layer 1: Background Accents (Blurred Circles) */}
//         <div className="parallax-circle absolute top-1/4 left-1/4 w-64 h-64 bg-purple-100/40 rounded-full blur-3xl opacity-60"></div>
//         <div className="parallax-circle absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-100/40 rounded-full blur-3xl opacity-60"></div>

//         {/* Layer 2: Parallax Content Container */}
//         <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 h-full">
          
//           {/* Left Side: Parallax Text (Slowest) */}
//           <div className="parallax-text text-center md:text-left">
//             <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-purple-800 leading-snug">
//               Handcrafted <br /> with <span className="text-pink-500">Love</span> & Precision
//             </h2>
//             <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
//               From our famous fudgy brownies to customized wedding masterpieces, we use only the finest ingredients to ensure every bite is a celebration of flavor.
//             </p>
//           </div>

//           {/* Right Side: The Parallax Imagery Assembly */}
//           <div className="relative flex justify-center h-full">
            
//             {/* Asset 1: Stylized Cake (Fastest - Moves furthest up) */}
//             {/* I am using a large version of your logo here as a placeholder for the tiered cake. Swap this img for a standalone cake asset if you have one. */}
//             <img 
//               src={Logo} 
//               alt="Tiered Cake Visual" 
//               className="parallax-cake absolute top-10 md:-top-10 w-64 md:w-80 h-auto object-contain opacity-70 grayscale hover:grayscale-0 transition duration-500"
//             />

//             {/* Asset 2: Brownie Stack (Medium speed) */}
//             <img 
//               src={BrownieAsset} 
//               alt="Fudgy Brownies Stack" 
//               className="parallax-brownie absolute bottom-1/4 md:bottom-20 w-48 md:w-60 h-auto object-contain shadow-2xl rounded-2xl border-4 border-white"
//             />
//           </div>
//         </div>
//       </section>

//       {/* 3. ITEMS GRID (Unchanged) */}
//       <section id="items" className="py-32 px-6 max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
//           <div className="max-w-md">
//             <h2 className="text-4xl font-serif font-bold mb-4">Our Signature Items</h2>
//             <p className="text-gray-500">From bento boxes to grand anniversary tiers, every item is baked with love and precision.</p>
//           </div>
//           <div className="h-px flex-grow bg-gradient-to-r from-purple-100 to-transparent mx-8 hidden md:block"></div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {products.map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -12 }}
//               className="group relative bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-purple-100 transition-all duration-500"
//             >
//               <div className="text-4xl mb-6 text-pink-400 group-hover:scale-110 transition-transform duration-500">
//                 {item.icon}
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.name}</h3>
//               <p className="text-gray-500 leading-relaxed">Tailored to your theme with premium flavors and artistic decoration.</p>
//               <div className="mt-6 w-8 h-1 bg-purple-200 group-hover:w-full transition-all duration-500"></div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* 4. MODERN FOOTER (Unchanged) */}
//       <footer id="contact" className="bg-gray-50 pt-24 pb-12 px-8 border-t border-purple-50">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
//           <div className="col-span-1 md:col-span-1">
//             <h3 className="text-2xl font-serif font-bold mb-6 text-purple-600">Shanora Cakes</h3>
//             <p className="text-gray-500 leading-relaxed mb-8">
//               Creating unforgettable celebration cakes in the heart of Matale. 21+ years of baking excellence.
//             </p>
//             <div className="flex gap-5">
//               <a href="https://www.facebook.com/profile.php?id=61588449220490" className="text-2xl text-gray-400 hover:text-blue-600 transition-colors"><IoLogoFacebook /></a>
//               <a href="https://instagram.com/shanora_cakes" className="text-2xl text-gray-400 hover:text-pink-600 transition-colors"><IoLogoInstagram /></a>
//             </div>
//           </div>

//           <div>
//             <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">Contact Details</h4>
//             <ul className="space-y-6">
//               <li className="flex items-start gap-4 text-gray-600 group">
//                 <IoCallOutline className="text-2xl text-pink-400 shrink-0 group-hover:rotate-12 transition" />
//                 <span className="font-medium">072 214 6868</span>
//               </li>
//               <li className="flex items-start gap-4 text-gray-600 group">
//                 <IoLogoWhatsapp className="text-2xl text-green-500 shrink-0 group-hover:scale-110 transition" />
//                 <span className="font-medium">+94 72 214 6868</span>
//               </li>
//               <li className="flex items-start gap-4 text-gray-600 group">
//                 <IoMailOutline className="text-2xl text-purple-400 shrink-0 group-hover:-translate-y-1 transition" />
//                 <span className="font-medium">shanoracakez@gmail.com</span>
//               </li>
//             </ul>
//           </div>

//           <div className="md:col-span-2">
//             <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">Find Us</h4>
//             <div className="flex items-start gap-4 text-gray-600 mb-8">
//               <IoLocationOutline className="text-3xl text-pink-400 shrink-0" />
//               <p className="font-medium">16/2 Udupihilla Matale, Matale, Sri Lanka, 21000</p>
//             </div>
//             <div className="w-full h-40 bg-purple-100 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition duration-700">
//                <div className="w-full h-full flex items-center justify-center text-purple-300 italic font-serif">
//                  Interactive Map Coming Soon
//                </div>
//             </div>
//           </div>
//         </div>

//         <div className="text-center pt-10 border-t border-gray-200">
//           <p className="text-gray-400 text-sm">
//             © 2026 <span className="font-bold">Shanora Cakes</span>. Designing Sweet Moments in Sri Lanka.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import ContactFooter from './components/ContactFooter';
import OrderPage from './components/OrderPage'; // We will create this next
import ParallaxSection from './components/ParallaxSection'

function App() {
  return (
    <Router>
      <div className="font-sans antialiased overflow-x-hidden">
        <Navigation />
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={
            <main>
              <Hero />
              <Services />
              <ParallaxSection/>
              <Gallery />
              <ContactFooter />
            </main>
          } />
          
          {/* Order Page */}
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;