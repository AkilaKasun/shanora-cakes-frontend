import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBackOutline, IoSendOutline, IoCheckmarkCircleOutline, IoCalendarOutline, IoCallOutline, IoAlertCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const OrderPage = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({}); // State to track errors
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cakeType: 'Birthday Cake',
    quantity: 1,
    orderDate: '', 
    message: ''
  });

  const validateForm = () => {
    let newErrors = {};

    // Name Validation
    if (!formData.name.trim()) newErrors.name = "Full name is required";

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email (must include @ and .com)";
    }

    // Phone Validation (Exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone) {
      newErrors.phone = "Contact number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Date Validation
    if (!formData.orderDate) newErrors.orderDate = "Please select a delivery date";

    // Quantity Validation
    if (formData.quantity < 1) newErrors.quantity = "Quantity must be at least 1";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const sendEmail = (e) => {
    e.preventDefault();
    
    // Run validation before sending
    if (!validateForm()) return;

    setLoading(true);

    const SERVICE_ID = "service_fdkvhok";
    const ADMIN_TEMPLATE_ID = "template_x8og9ls";
    const CUSTOMER_TEMPLATE_ID = "template_amlvib4";
    const PUBLIC_KEY = "AGqzetc_qDMbu3hkP";

    const adminEmail = emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, formData, PUBLIC_KEY);
    const customerEmail = emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE_ID, formData, PUBLIC_KEY);

    Promise.all([adminEmail, customerEmail])
      .then(() => {
        setLoading(false);
        setIsSent(true);
        setFormData({ name: '', email: '', phone: '', cakeType: 'Birthday Cake', quantity: 1, orderDate: '', message: '' });
        setErrors({});
      })
      .catch((error) => {
        setLoading(false);
        alert("Oops! Something went wrong. Please try again.");
        console.error("Email Error:", error);
      });
  };

  // Helper component for error messages
  const ErrorMsg = ({ msg }) => (
    <motion.span 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="text-red-500 text-xs font-bold mt-1 ml-2 flex items-center gap-1"
    >
      <IoAlertCircleOutline /> {msg}
    </motion.span>
  );

  return (
    <div className="min-h-screen bg-base-light pt-28 pb-12 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-2xl">
        <Link to="/" className="flex items-center gap-2 text-shanora-purple font-bold mb-8 hover:text-shanora-pink transition">
          <IoArrowBackOutline size={20} /> Back to Home
        </Link>

        <motion.div className="bg-white/70 backdrop-blur-xl border border-white/40 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
          {isSent && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center text-center p-10">
              <IoCheckmarkCircleOutline className="text-shanora-purple text-8xl mb-4" />
              <h2 className="text-3xl font-title text-shanora-dark text-shanora-pink">Order Received!</h2>
              <p className="text-gray-600 mt-4 text-lg">We'll be in touch shortly to confirm your sweet treats.</p>
              <button onClick={() => setIsSent(false)} className="mt-8 bg-shanora-purple text-white px-8 py-3 rounded-full font-bold hover:bg-shanora-pink transition">Place Another Order</button>
            </motion.div>
          )}

          <h1 className="text-4xl font-title text-shanora-dark mb-2">Place Your <span className="text-shanora-purple">Order</span></h1>
          <p className="text-gray-600 mb-8 font-sans">Handcrafted with love. Please fill out the details below.</p>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-5" noValidate>
            
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-bold text-shanora-dark ml-2 text-sm uppercase mb-1">Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className={`bg-white border ${errors.name ? 'border-red-400 ring-1 ring-red-100' : 'border-gray-100'} p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition shadow-sm`}
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
                {errors.name && <ErrorMsg msg={errors.name} />}
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-shanora-dark ml-2 text-sm uppercase mb-1">Email Address *</label>
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className={`bg-white border ${errors.email ? 'border-red-400 ring-1 ring-red-100' : 'border-gray-100'} p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition shadow-sm`}
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
                {errors.email && <ErrorMsg msg={errors.email} />}
              </div>
            </div>

            {/* Phone & Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-bold text-shanora-dark ml-2 text-sm uppercase mb-1">Contact Number *</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder="07XXXXXXXX" 
                    className={`w-full bg-white border ${errors.phone ? 'border-red-400 ring-1 ring-red-100' : 'border-gray-100'} p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition shadow-sm`}
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  />
                  <IoCallOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.phone && <ErrorMsg msg={errors.phone} />}
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-shanora-dark ml-2 text-sm uppercase mb-1">Delivery Date *</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className={`w-full bg-white border ${errors.orderDate ? 'border-red-400 ring-1 ring-red-100' : 'border-gray-100'} p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition shadow-sm`}
                    value={formData.orderDate}
                    onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                  />
                  <IoCalendarOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
                {errors.orderDate && <ErrorMsg msg={errors.orderDate} />}
              </div>
            </div>

            {/* Category & Quantity Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 flex flex-col">
                <label className="font-bold text-shanora-dark ml-2 text-sm uppercase mb-1">Category *</label>
                <select className="bg-white border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none cursor-pointer shadow-sm" value={formData.cakeType} onChange={(e) => setFormData({...formData, cakeType: e.target.value})}>
                  <option value="Birthday Cake">Birthday Cake</option>
                  <option value="Anniversary Cake">Anniversary Cake</option>
                  <option value="Cupcakes (Set)">Cupcakes (Set)</option>
                  <option value="Brownies (Box)">Brownies (Box)</option>
                  <option value="Customized Cake">Customized Cake</option>
                  <option value="Bento Cake">Bento Cake</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-shanora-dark ml-2 text-sm uppercase mb-1">Quantity *</label>
                <input 
                  type="number" 
                  min="1" 
                  className={`bg-white border ${errors.quantity ? 'border-red-400 ring-1 ring-red-100' : 'border-gray-100'} p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none shadow-sm`}
                  value={formData.quantity} 
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})} 
                />
                {errors.quantity && <ErrorMsg msg={errors.quantity} />}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold text-shanora-dark ml-2 text-sm uppercase mb-1">Special Instructions</label>
              <textarea rows="3" placeholder="Flavors, allergies, or cake text..." className="bg-white border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition resize-none shadow-sm" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
            </div>

            <button disabled={loading} type="submit" className={`w-full ${loading ? 'bg-gray-400' : 'bg-shanora-purple'} text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-shanora-pink transition-all shadow-lg active:scale-95`}>
              {loading ? "Processing..." : "Confirm My Order"} <IoSendOutline />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderPage;