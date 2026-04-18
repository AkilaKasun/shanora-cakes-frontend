'use client';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react'; // Ensure correct import
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import ContactFooter from './components/ContactFooter';
import OrderPage from './components/OrderPage';
import ParallaxSection from './components/ParallaxSection';
import ChatBot from './chatbot/chatBot'; 

function App() {
  return (
    /* 1. Add the root prop to ensure Lenis tracks the global scroll */
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <Router>
        {/* 2. Remove overflow-x-hidden from the main wrapper if it conflicts with Lenis */}
        <div className="font-sans antialiased">
          <Navigation />

          <Routes>
            <Route path="/" element={
              <main>
                <Hero />
                <Services />
                <ParallaxSection />
                <Gallery />
                <ContactFooter />
              </main>
            } />
            <Route path="/order" element={<OrderPage />} />
          </Routes>

          <ChatBot />
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;