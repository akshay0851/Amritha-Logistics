// src/Components/Home.js
import React, { useState, useEffect } from "react";
import Footer from "./Footer"
import Navbar from "./Navbar";
import "./Home.css";
import statsBg from "../img/about-hero.png"; // Replace with your background image
import { Link } from "react-router-dom";
import hero1 from "../img/Hero.png";
import hero2 from "../img/Hero2.png";
import hero3 from "../img/Hero3.png";
import { 
  FaTruck, FaShippingFast, FaBoxOpen, FaRoute, FaClock, 
  FaSmile, FaCalendarAlt, FaTruckLoading, FaHeadset 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


function Home() {
  const [formData, setFormData] = useState({
  company: "",
  pickup: "",
  drop: "",
  date: "",
  material: "",
  weight: "",
  vehicleType: "",
  loadType: "FTL"
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://amritha-logistics-backend.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    alert(data.message);
  } catch (error) {
    console.error("Error:", error);
  }
};

const setLoadType = (type) => {
  setFormData({ ...formData, loadType: type });
};

  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [hero1, hero2, hero3];

  // ✅ Count-up animation for stats
  useEffect(() => {
    const counters = document.querySelectorAll(".count");
    const speed = 200;

    const countUp = (el) => {
      const target = +el.getAttribute("data-target");
      let count = 0;

      const update = () => {
        count += target / speed;
        if (count < target) {
          el.childNodes[0].nodeValue = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          el.childNodes[0].nodeValue = target;
        }
      };
      update();
    };

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countUp(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 1 }
    );

    counters.forEach((counter) => countObserver.observe(counter));

    const statBoxes = document.querySelectorAll(".stat-box");
    const boxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            boxObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    statBoxes.forEach((box) => boxObserver.observe(box));
  }, []);

  // ✅ Hero slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // ✅ Testimonials
  const testimonials = [
    {
      name: "Arjun Kumar",
      designation: "Logistics Manager",
      company: "Farmgate Agro Milch P LTD",
      feedback: "Amritha Logistics provides excellent on-time delivery. Truly reliable!",
      avatar: "https://api.dicebear.com/6.x/micah/png?seed=Rajesh&mouth=smile"
    },
    {
      name: "Rajesh A.R",
      designation: "Business Owner",
      company: "Amritha Bags",
      feedback: "Their service is professional and customer-friendly. Highly recommended!",
      avatar: "https://api.dicebear.com/6.x/micah/png?seed=Priya&mouth=smile"
    },
    {
      name: "Ganesan",
      designation: "Manager",
      company: "East India Transport",
      feedback: "Great communication and safe delivery of goods every time.",
      avatar: "https://api.dicebear.com/6.x/micah/png?seed=Arjun&mouth=smile"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!paused) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [paused, testimonials.length]);

  // ✅ Scroll to quote
  const scrollToQuote = () => {
    const quoteSection = document.getElementById("quote");
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  /*useEffect(() => {
  const toggles = document.querySelectorAll(".toggle");
  const loadInput = document.getElementById("loadType");

  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      toggles.forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      loadInput.value = btn.getAttribute("data-value");
    });
  });
}, []);
*/


  return (
    <div className="home">
       <>
    <Navbar />
    {/* Page content below */}
  </>

      {/* Hero Section */}
<section
  className="hero"
  style={{
    backgroundImage: `url(${heroImages[currentHero]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="overlay"></div>
  <div className="hero-content">
    {/* Logo */}
    <div className="hero-logo">
      <img src={require("../img/logo.png")} alt="Amritha Logistics Logo" />
    </div>
    <h1>AMRITHA LOGISTICS</h1>
    <p>Reliable Domestic Transport Services Across India</p>
    <div className="hero-buttons">
      {/* Scroll to Quote Section */}
      <button
        className="hero-button animated"
        onClick={scrollToQuote}
      >
        Send Quote
      </button>

      {/* Navigate to Contact Page using React Router */}
      <Link
        to="/contact"
        className="hero-button outline animated"
      >
        Contact Us
      </Link>
    </div>
  </div>
</section>

      {/* Services Section */}
      <section className="services" id="services">
        <h2>Our Services</h2>
        <p className="services-intro">We provide top-notch logistics services across India to ensure your goods are delivered safely and on time.</p>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon"><FaTruck /></div>
            <h3>LCV Transport</h3>
            <p>Efficient light commercial vehicle delivery for small and medium goods.</p>
          </div>
          <div className="service-card">
            <div className="service-icon"><FaShippingFast /></div>
            <h3>Container & Trailer</h3>
            <p>Secure containerized and trailer logistics for long-distance transport.</p>
          </div>
          <div className="service-card">
            <div className="service-icon"><FaBoxOpen /></div>
            <h3>Consignment Handling</h3>
            <p>Professional loading, unloading, and handling of consignments.</p>
          </div>
          <div className="service-card">
            <div className="service-icon"><FaRoute /></div>
            <h3>Route Planning</h3>
            <p>Optimized delivery routes to save time and reduce costs.</p>
          </div>
          <div className="service-card">
            <div className="service-icon"><FaClock /></div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support for your logistics needs.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
    {/* Stats Section */}
<section
  className="stats"
  id="stats"
  style={{
    backgroundImage: `url(${statsBg})`,
  }}
>
  <div className="stats-overlay"></div>
  <div className="stats-content">
    <h2 className="stats-heading">Our Achievements</h2>
    <p className="stats-intro">We take pride in delivering top-notch logistics solutions with consistent results.</p>

    <div className="stats-grid">
      <div className="stat-box">
        <div className="stat-icon"><FaSmile /></div>
        <h2 className="count" data-target="100">0<span>+</span></h2>
        <p>Happy Clients</p>
      </div>
      <div className="stat-box">
        <div className="stat-icon"><FaCalendarAlt /></div>
        <h2>10+</h2>
        <p>Years Experience</p>
      </div>
      <div className="stat-box">
        <div className="stat-icon"><FaTruckLoading /></div>
        <h2 className="count" data-target="1000">0<span>+</span></h2>
        <p>Successful Deliveries</p>
      </div>
      <div className="stat-box">
        <div className="stat-icon"><FaHeadset /></div>
        <h2>24/7</h2>
        <p>Customer Support</p>
      </div>
    </div>
  </div>
</section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <h2 className="testimonial-heading">What Our Clients Say</h2>
        <div
          className="testimonial-slider"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="testimonial-card"
            >
              <div className="testimonial-avatar">
                <img src={testimonials[currentIndex].avatar} alt="client" />
              </div>
              <h3 className="testimonial-name">{testimonials[currentIndex].name}</h3>
              <p className="testimonial-role">
                {testimonials[currentIndex].designation} @ <span>{testimonials[currentIndex].company}</span>
              </p>
              <p className="testimonial-feedback">"{testimonials[currentIndex].feedback}"</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

{/* Quotation Section */}
<section className="quote" id="quote">
  <h2>Request a Quotation</h2>
  <p className="quote-intro">
    Fill in the details below, and we will provide you with a tailored transport quotation.
  </p>

  <form className="quote-form" onSubmit={handleSubmit}>

    <div className="form-row">
      <div className="form-group">
        <label>Company Name</label>
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Pickup Location</label>
        <input
          type="text"
          name="pickup"
          placeholder="Pickup Location"
          value={formData.pickup}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Drop Location</label>
        <input
          type="text"
          name="drop"
          placeholder="Drop Location"
          value={formData.drop}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Material</label>
        <input
          type="text"
          name="material"
          placeholder="Material"
          value={formData.material}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Weight (kg)</label>
        <input
          type="text"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Vehicle Type</label>
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          required
        >
          <option value="">Select Vehicle Type</option>
          <option value="LCV">LCV</option>
          <option value="Container">Container</option>
          <option value="Trailer">Trailer</option>
          <option value="Taurus">Taurus</option>
        </select>
      </div>

      <div className="form-group">
        <label>Load Type</label>

        <div className="toggle-buttons">
          <button
            type="button"
            className={`toggle ${formData.loadType === "FTL" ? "active" : ""}`}
            onClick={() => setLoadType("FTL")}
          >
            Full Truck Load
          </button>

          <button
            type="button"
            className={`toggle ${formData.loadType === "PTL" ? "active" : ""}`}
            onClick={() => setLoadType("PTL")}
          >
            Part Truck Load
          </button>
        </div>

      </div>
    </div>

    {/* ✅ Submit Button */}
    <button type="submit" className="quote-button">
      Get Quotation
    </button>

  </form>
</section>

    <Footer />  {/* ✅ Footer appears at the bottom */}
</div>

  );
}


export default Home;
