import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom';


const Navigation = () => {
    const navItems = ['Our Story', 'Menu', 'Gallery', 'Contact'];

    return (
        <motion.nav
            className="bg-base-light/95 backdrop-blur-sm fixed top-0 left-0 w-full z-50 py-4 shadow-sm"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Main Logo from image_1.png */}
                    <img src={Logo} alt="Shanora Cakes Logo" className="h-12 w-auto" />
                    <span className="text-3xl font-title text-shanora-dark italic text-shanora-pink">Shanora Cakes</span>
                </div>
                <div className="flex items-center gap-8">
                    {navItems.map((item, index) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="font-sans font-semibold text-shanora-dark hover:text-shanora-purple transition-colors relative group"
                        >
                            {item}
                            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-shanora-purple transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                    <Link to="/order">
                        <button className="bg-shanora-purple text-white px-6 py-2.5 rounded-full font-semibold hover:bg-shanora-pink transition">
                            Order Now
                        </button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navigation;