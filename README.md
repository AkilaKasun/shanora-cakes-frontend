
# 🎂 Shanora Cakes – Premium Confections & Web Portal

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

A high-performance, visually stunning e-commerce and portfolio hybrid built for **Shanora Cakes**. This platform combines cinematic food photography with modern web animations to provide a seamless cake-ordering experience for customers in **Matale and Colombo**.

## ✨ Key Features

* **Cinematic Hero Section:** Dynamic background slider featuring high-end 4K food photography with GSAP-powered entrance animations.
* **Responsive Masonry Gallery:** A fluid, multi-column gallery (2-4 columns) that intelligently adapts to mobile, tablet, and desktop screens.
* **Animated Hamburger Navigation:** A custom-built mobile drawer using `Framer Motion` for smooth spring transitions.
* **Smart Order System:** A validated ordering form integrated with **EmailJS** for instant admin notifications and customer confirmations.
* **Glassmorphism UI:** Modern design aesthetic using light purple/pink color schemes, backdrop blurs, and elegant pastel glows.
* **Lazy Loading & Performance:** Optimized for high-speed loading of high-resolution dessert imagery.

## 🚀 Tech Stack

* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Animations:** GSAP (GreenSock Animation Platform) & Framer Motion
* **Routing:** React Router DOM
* **Icons:** React Icons (Ionicons, Hi Icons)
* **Backend Integration:** EmailJS (Client-side SMTP)

## 🛠️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/shanora-cakes.git
    ```

2.  **Install dependencies:**
    ```bash
    cd shanora-cakes
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your EmailJS credentials:
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 📸 Component Structure

* `Navigation.jsx`: Responsive navbar with animated hamburger menu.
* `Hero.jsx`: Main landing section with GSAP scroll/entrance triggers.
* `Gallery.jsx`: Masonry grid with "Explore More" functionality.
* `OrderPage.jsx`: Fully validated form with custom error handling.

## 🍰 About Shanora Cakes
Owned and operated by a professional baker, Shanora Cakes specializes in:
* **Customized Cakes** (Birthday, Anniversary, Wedding)
* **Artisan Brownies**
* **Gourmet Cupcakes**
* **Bento Cakes**

---

### 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

### 📧 Contact
Project Link: [https://github.com/your-username/shanora-cakes](https://github.com/your-username/shanora-cakes)  
Business Instagram: [@shanora_cakes](https://instagram.com/shanora_cakes)