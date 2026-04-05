import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoArrowBackOutline, IoSendOutline, IoCheckmarkCircleOutline, IoCalendarOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const OrderPage = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cakeType: 'Birthday Cake',
    quantity: 1,
    orderDate: '', // New State for Date
    message: ''
  });

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

   
    // Replace these with your actual IDs from EmailJS Account
    const SERVICE_ID = "service_fdkvhok";
    const ADMIN_TEMPLATE_ID = "template_x8og9ls"; // Template for you
    const CUSTOMER_TEMPLATE_ID = "template_amlvib4"; // Template for customer
    const PUBLIC_KEY = "AGqzetc_qDMbu3hkP";

    // The formData object now includes 'orderDate' which will be sent to {{orderDate}} in your templates
    const adminEmail = emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, formData, PUBLIC_KEY);
    const customerEmail = emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE_ID, formData, PUBLIC_KEY);

    Promise.all([adminEmail, customerEmail])
      .then(() => {
        setLoading(false);
        setIsSent(true);
        // Reset form
        setFormData({ name: '', email: '', cakeType: 'Birthday Cake', quantity: 1, orderDate: '', message: '' });
      })
      .catch((error) => {
        setLoading(false);
        alert("Oops! Something went wrong. Please try again.");
        console.error("Email Error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-base-light pt-28 pb-12 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-shanora-pink/20 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-shanora-purple/20 blur-[120px] rounded-full -z-10"></div>

      <div className="container mx-auto max-w-2xl">
        <Link to="/" className="flex items-center gap-2 text-shanora-purple font-bold mb-8 hover:text-shanora-pink transition">
          <IoArrowBackOutline size={20} /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl border border-white/40 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
        >
          {isSent && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center text-center p-10"
            >
              <IoCheckmarkCircleOutline className="text-shanora-purple text-8xl mb-4" />
              <h2 className="text-3xl font-title text-shanora-dark">Sweet Success!</h2>
              <p className="text-gray-600 mt-4 text-lg">
                Your order for <span className="font-bold text-shanora-purple">{formData.orderDate}</span> has been received! 
                Check your email for confirmation.
              </p>
              <button 
                onClick={() => setIsSent(false)}
                className="mt-8 bg-shanora-purple text-white px-8 py-3 rounded-full font-bold hover:bg-shanora-pink transition"
              >
                Place Another Order
              </button>
            </motion.div>
          )}

          <h1 className="text-4xl font-title text-shanora-dark mb-2">Place Your <span className="text-shanora-purple">Order</span></h1>
          <p className="text-gray-600 mb-8">Tell us when you need your delicious treats.</p>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            {/* ... Name and Email fields stay the same ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-shanora-dark ml-2 text-sm uppercase tracking-wider">Full Name</label>
                <input required type="text" placeholder="John Doe" className="bg-white border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition shadow-sm" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-shanora-dark ml-2 text-sm uppercase tracking-wider">Email Address</label>
                <input required type="email" placeholder="name@email.com" className="bg-white border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition shadow-sm" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            {/* NEW ROW: Date and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-shanora-dark ml-2 text-sm uppercase tracking-wider">Required Date</label>
                <div className="relative">
                  <input 
                    required
                    type="date" 
                    className="w-full bg-white border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition shadow-sm appearance-none"
                    value={formData.orderDate}
                    onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                  />
                  <IoCalendarOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-shanora-dark ml-2 text-sm uppercase tracking-wider">Cake Category</label>
                <select className="bg-white border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none cursor-pointer shadow-sm" value={formData.cakeType} onChange={(e) => setFormData({...formData, cakeType: e.target.value})}>
                  <option>Birthday Cake</option>
                  <option>Anniversary Cake</option>
                  <option>Cupcakes (Set)</option>
                  <option>Brownies (Box)</option>
                  <option>Customized Cake</option>
                  <option>Bento Cake</option>
                </select>
              </div>
            </div>

            {/* Quantity and Message */}
            <div className="flex flex-col gap-2">
                <label className="font-bold text-shanora-dark ml-2 text-sm uppercase tracking-wider">Quantity</label>
                <input required type="number" min="1" className="bg-white border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition shadow-sm" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-shanora-dark ml-2 text-sm uppercase tracking-wider">Special Message</label>
              <textarea rows="4" placeholder="Themes, flavors, or allergies..." className="bg-white border border-gray-100 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition resize-none shadow-sm" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
            </div>

            <button disabled={loading} type="submit" className={`w-full ${loading ? 'bg-gray-400' : 'bg-shanora-purple'} text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-shanora-pink transition-all shadow-lg`}>
              {loading ? "Sending Order..." : "Confirm My Order"} <IoSendOutline />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderPage;














// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { IoArrowBackOutline, IoSendOutline } from 'react-icons/io5';
// import { Link } from 'react-router-dom';

// const OrderPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     cakeType: 'Birthday Cake',
//     quantity: 1,
//     message: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Order Submitted:", formData);
//     alert("Thank you! Shanora Cakes will contact you soon to confirm your order.");
//   };

//   return (
//     <div className="min-h-screen bg-base-light pt-28 pb-12 px-6 relative overflow-hidden">
//       {/* Decorative Brand Glows */}
//       <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-shanora-pink/20 blur-[120px] rounded-full -z-10"></div>
//       <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-shanora-purple/20 blur-[120px] rounded-full -z-10"></div>

//       <div className="container mx-auto max-w-2xl">
//         {/* Back Button */}
//         <Link to="/" className="flex items-center gap-2 text-shanora-purple font-bold mb-8 hover:text-shanora-pink transition">
//           <IoArrowBackOutline size={20} /> Back to Home
//         </Link>

//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white/70 backdrop-blur-xl border border-white/40 p-8 md:p-12 rounded-[40px] shadow-2xl"
//         >
//           <h1 className="text-4xl font-title text-shanora-dark mb-2">Place Your <span className="text-shanora-purple">Order</span></h1>
//           <p className="text-gray-600 mb-8">Fill in the details below and we'll get back to you shortly.</p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Name & Email Group */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col gap-2">
//                 <label className="font-bold text-shanora-dark ml-2">Full Name</label>
//                 <input 
//                   required
//                   type="text" 
//                   placeholder="John Doe"
//                   className="bg-white border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition"
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <label className="font-bold text-shanora-dark ml-2">Email Address</label>
//                 <input 
//                   required
//                   type="email" 
//                   placeholder="john@example.com"
//                   className="bg-white border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition"
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 />
//               </div>
//             </div>

//             {/* Cake Type Dropdown & Quantity */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="md:col-span-2 flex flex-col gap-2">
//                 <label className="font-bold text-shanora-dark ml-2">Select Category</label>
//                 <select 
//                   className="bg-white border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none appearance-none cursor-pointer"
//                   onChange={(e) => setFormData({...formData, cakeType: e.target.value})}
//                 >
//                   <option>Birthday Cake</option>
//                   <option>Anniversary Cake</option>
//                   <option>Cupcakes (Set)</option>
//                   <option>Brownies (Box)</option>
//                   <option>Customized Cake</option>
//                   <option>Bento Cake</option>
//                 </select>
//               </div>
//               <div className="flex flex-col gap-2">
//                 <label className="font-bold text-shanora-dark ml-2">Quantity</label>
//                 <input 
//                   type="number" 
//                   min="1"
//                   defaultValue="1"
//                   className="bg-white border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition"
//                   onChange={(e) => setFormData({...formData, quantity: e.target.value})}
//                 />
//               </div>
//             </div>

//             {/* Special Message */}
//             <div className="flex flex-col gap-2">
//               <label className="font-bold text-shanora-dark ml-2">Special Message / Instructions</label>
//               <textarea 
//                 rows="4"
//                 placeholder="Tell us about the theme, flavors, or any allergies..."
//                 className="bg-white border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-shanora-purple outline-none transition resize-none"
//                 onChange={(e) => setFormData({...formData, message: e.target.value})}
//               ></textarea>
//             </div>

//             {/* Submit Button */}
//             <button 
//               type="submit"
//               className="w-full bg-shanora-purple text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-shanora-pink transition-all shadow-lg hover:shadow-shanora-pink/20"
//             >
//               Submit Order <IoSendOutline />
//             </button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;