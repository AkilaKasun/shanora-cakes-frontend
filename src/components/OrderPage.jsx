import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoArrowBackOutline, 
  IoSendOutline, 
  IoCheckmarkCircleOutline, 
  IoCalendarOutline, 
  IoCallOutline, 
  IoAlertCircleOutline 
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const OrderPage = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cakeType: 'Birthday Cake',
    quantity: 1,
    orderDate: '',
    message: ''
  });

  // Validation Logic
  const validateForm = () => {
    let newErrors = {};

    // Name: Required
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Email: Required + @ symbol check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email (e.g. name@mail.com)";
    }

    // Phone: Required + Exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone) {
      newErrors.phone = "Contact number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Date: Required
    if (!formData.orderDate) {
      newErrors.orderDate = "Please select a delivery date";
    }

    // Quantity: Minimum 1
    if (formData.quantity < 1) {
      newErrors.quantity = "Quantity must be 1 or more";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Securely accessing keys from .env
    const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAIL_ADMIN_TEMPLATE_ID;
    const CUSTOMER_TEMPLATE_ID = import.meta.env.VITE_EMAIL_CUSTOMER_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

    const adminEmail = emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, formData, PUBLIC_KEY);
    const customerEmail = emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE_ID, formData, PUBLIC_KEY);

    Promise.all([adminEmail, customerEmail])
      .then(() => {
        setLoading(false);
        setIsSent(true);
        // Clear form after success
        setFormData({ 
          name: '', email: '', phone: '', 
          cakeType: 'Birthday Cake', quantity: 1, 
          orderDate: '', message: '' 
        });
        setErrors({});
      })
      .catch((error) => {
        setLoading(false);
        alert("Oops! Something went wrong. Please check your internet and try again.");
        console.error("EmailJS Error:", error);
      });
  };

  // Reusable Error Component
  const ErrorLabel = ({ msg }) => (
    <motion.span 
      initial={{ opacity: 0, x: -5 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="text-red-500 text-[11px] font-bold mt-1 ml-2 flex items-center gap-1 italic"
    >
      <IoAlertCircleOutline size={14} /> {msg}
    </motion.span>
  );

  return (
    <div className="min-h-screen bg-base-light pt-28 pb-12 px-6 relative overflow-hidden font-sans">
      {/* Decorative Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-shanora-pink/15 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-shanora-purple/15 blur-[120px] rounded-full -z-10"></div>

      <div className="container mx-auto max-w-2xl">
        <Link to="/" className="flex items-center gap-2 text-shanora-purple font-bold mb-8 hover:text-shanora-pink transition group">
          <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" size={20} /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-2xl border border-white/50 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
        >
          {/* Success Overlay */}
          <AnimatePresence>
            {isSent && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center text-center p-10"
              >
                <IoCheckmarkCircleOutline className="text-shanora-purple text-9xl mb-4" />
                <h2 className="text-4xl font-title text-shanora-dark">Sweet Success!</h2>
                <p className="text-gray-600 mt-4 text-lg max-w-md">
                  Your order has been sent to our kitchen. Check your email for confirmation!
                </p>
                <button 
                  onClick={() => setIsSent(false)}
                  className="mt-10 bg-shanora-purple text-white px-10 py-4 rounded-full font-bold hover:bg-shanora-pink transition shadow-lg"
                >
                  Place Another Order
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <h1 className="text-4xl font-title text-shanora-dark mb-2">Place Your <span className="text-shanora-purple">Order</span></h1>
          <p className="text-gray-500 mb-10">Fill in the details below. Required fields are marked with *</p>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-6" noValidate>
            
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-bold text-shanora-dark ml-2 text-xs uppercase tracking-widest mb-2">Full Name *</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className={`bg-white/50 border ${errors.name ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-100'} p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition shadow-sm`}
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
                {errors.name && <ErrorLabel msg={errors.name} />}
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-shanora-dark ml-2 text-xs uppercase tracking-widest mb-2">Email Address *</label>
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className={`bg-white/50 border ${errors.email ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-100'} p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition shadow-sm`}
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
                {errors.email && <ErrorLabel msg={errors.email} />}
              </div>
            </div>

            {/* Phone & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-bold text-shanora-dark ml-2 text-xs uppercase tracking-widest mb-2">Contact Number *</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder="07XXXXXXXX" 
                    className={`w-full bg-white/50 border ${errors.phone ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-100'} p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition shadow-sm`}
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  />
                  <IoCallOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.phone && <ErrorLabel msg={errors.phone} />}
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-shanora-dark ml-2 text-xs uppercase tracking-widest mb-2">Delivery Date *</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className={`w-full bg-white/50 border ${errors.orderDate ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-100'} p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition shadow-sm`}
                    value={formData.orderDate}
                    onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                  />
                  <IoCalendarOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
                {errors.orderDate && <ErrorLabel msg={errors.orderDate} />}
              </div>
            </div>

            {/* Category & Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 flex flex-col">
                <label className="font-bold text-shanora-dark ml-2 text-xs uppercase tracking-widest mb-2">Category *</label>
                <select 
                  className="bg-white/50 border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none cursor-pointer shadow-sm appearance-none" 
                  value={formData.cakeType} 
                  onChange={(e) => setFormData({...formData, cakeType: e.target.value})}
                >
                  <option value="Birthday Cake">Birthday Cake</option>
                  <option value="Anniversary Cake">Anniversary Cake</option>
                  <option value="Cupcakes (Set)">Cupcakes (Set)</option>
                  <option value="Brownies (Box)">Brownies (Box)</option>
                  <option value="Customized Cake">Customized Cake</option>
                  <option value="Bento Cake">Bento Cake</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-shanora-dark ml-2 text-xs uppercase tracking-widest mb-2">Quantity *</label>
                <input 
                  type="number" 
                  min="1" 
                  className={`bg-white/50 border ${errors.quantity ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-100'} p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none shadow-sm`}
                  value={formData.quantity} 
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})} 
                />
                {errors.quantity && <ErrorLabel msg={errors.quantity} />}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label className="font-bold text-shanora-dark ml-2 text-xs uppercase tracking-widest mb-2">Special Instructions</label>
              <textarea 
                rows="4" 
                placeholder="Flavors, design themes, or allergies..." 
                className="bg-white/50 border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition resize-none shadow-sm" 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              disabled={loading} 
              type="submit" 
              className={`w-full relative overflow-hidden ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-shanora-purple hover:bg-shanora-pink'} text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95`}
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>Confirm My Order <IoSendOutline /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderPage;