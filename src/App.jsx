import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import ContactFooter from './components/ContactFooter';
import OrderPage from './components/OrderPage';
import ParallaxSection from './components/ParallaxSection'
import ChatBot from './chatbot/chatBot';   // FIXED

function App() {
  return (
    <Router>
      <div className="font-sans antialiased overflow-x-hidden">
        <Navigation />

        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Services />
              <ParallaxSection/>
              <Gallery />
              <ContactFooter />
            </main>
          } />

          <Route path="/order" element={<OrderPage />} />
        </Routes>

        {/* ✅ Place chatbot HERE */}
        <ChatBot />

      </div>
    </Router>
  );
}

export default App;