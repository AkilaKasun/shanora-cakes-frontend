import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/logo.png';
import { 
  IoLocationOutline, 
  IoCallOutline, 
  IoLogoWhatsapp, 
  IoLogoFacebook, 
  IoLogoInstagram,
  IoLogoTiktok 
} from 'react-icons/io5';

const ContactFooter = () => {
  return (
    <footer id="contact" className="relative bg-shanora-dark text-white pt-24 pb-12 mt-20 rounded-t-[60px] overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-shanora-purple/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-shanora-pink/10 blur-[150px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Column 1: Brand Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            <motion.img 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              src={Logo} 
              alt="Shanora Cakes Logo" 
              className="h-28 w-auto drop-shadow-2xl" 
            />
            <p className="text-gray-300 font-sans text-lg leading-relaxed max-w-sm">
              Crafting premium, customized sweetness for your most cherished celebrations. Experience the art of baking in every bite.
            </p>
            <div className="flex gap-5">
              {[
                { icon: <IoLogoFacebook size={22}/>, href: "https://www.facebook.com/profile.php?id=61588449220490" },
                { icon: <IoLogoInstagram size={22}/>, href: "https://www.instagram.com/shanora_cakes/" },
                { icon: <IoLogoTiktok size={22}/>, href: "https://www.tiktok.com/@shanora_cakes" },
                { icon: <IoLogoWhatsapp size={22}/>, href: "https://wa.me/94722146868" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 hover:bg-shanora-purple hover:border-shanora-purple transition-all duration-300 shadow-xl"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation (3 Cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-2xl font-title text-shanora-pink tracking-wide">Quick Links</h4>
            <nav className="flex flex-col gap-4">
              {['Menu', 'Customized Cakes', 'Gallery', 'Get A Quote'].map(link => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="text-gray-400 font-sans text-lg hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact & Location (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[40px] shadow-2xl">
              <h4 className="text-2xl font-title text-shanora-purple mb-6">Visit Our Bakery</h4>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <IoLocationOutline className="text-shanora-pink text-3xl shrink-0" />
                  <span className="font-sans text-gray-200">
                    16/2, Udupihilla,<br />Matale, Central Province, Sri Lanka
                  </span>
                </div>
                
                <div className="flex items-center gap-4 group cursor-pointer">
                  <IoCallOutline className="text-shanora-purple text-2xl shrink-0" />
                  <a href="tel:0722146868" className="font-sans text-gray-200 group-hover:text-shanora-pink transition">0722 146 868</a>
                </div>
              </div>

              {/* Google Maps Integration */}
              <div className="w-full h-48 rounded-3xl overflow-hidden border border-white/10 shadow-inner">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.912664537167!2d80.6091483!3d7.4748809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae35da07c2a5789%3A0x6b49e89d980479f6!2sUdupihilla%2C%20Matale!5e0!3m2!1sen!2slk!4v1712351234567!5m2!1sen!2slk" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(0.3) invert(0.9) contrast(0.9)' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/50 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-sans">
          <p>&copy; {new Date().getFullYear()} Shanora Cakes. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-white/50 hover:text-shanora-pink transition">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-shanora-pink transition">Terms of Service</a>
          </div>
          <p className="text-shanora-purple/60">Designed with Passion</p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;