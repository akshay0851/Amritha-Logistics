// src/Components/Home.js
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./Home.css";
import statsBg from "../img/about-hero.png";
import { Link } from "react-router-dom";
import hero1 from "../img/Hero.png";
import hero2 from "../img/Hero2.png";
import hero3 from "../img/Hero3.png";
import {
  FaTruck,
  FaShippingFast,
  FaBoxOpen,
  FaRoute,
  FaClock,
  FaSmile,
  FaCalendarAlt,
  FaTruckLoading,
  FaHeadset,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [hero1, hero2, hero3];

  // Count-up animation for stats
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

  // Hero Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Testimonials
  const testimonials = [
    {
      name: "Arjun Kumar",
      designation: "Logistics Manager",
      company: "Farmgate Agro Milch P LTD",
      feedback:
        "Amritha Logistics provides excellent on-time delivery. Truly reliable!",
      avatar:
        "https://api.dicebear.com/6.x/micah/png?seed=Rajesh&mouth=smile",
    },
    {
      name: "Rajesh A.R",
      designation: "Business Owner",
      company: "Amritha Bags",
      feedback:
        "Their service is professional and customer-friendly. Highly recommended!",
      avatar:
        "https://api.dicebear.com/6.x/micah/png?seed=Priya&mouth=smile",
    },
    {
      name: "Vijayalakshmi",
      designation: "Transport Manager",
      company: "Classik Cooling Towers",
      feedback:
        "Great communication and safe delivery of goods every time.",
      avatar:
        "https://api.dicebear.com/6.x/micah/png?seed=Arjun&mouth=smile",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!paused) {
      const timer = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % testimonials.length
        );
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [paused, testimonials.length]);

  return (
    <div className="home">
      <Navbar />

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
          <div className="hero-logo">
            <img
              src={require("../img/logo.png")}
              alt="Amritha Logistics Logo"
            />
          </div>

          <h1>AMRITHA LOGISTICS</h1>

          <p>Reliable Domestic Transport Services Across India</p>

          <div className="hero-buttons">
            <Link
              to="/quotation"
              className="hero-button animated"
            >
              Send Quote
            </Link>

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

        <p className="services-intro">
          We provide top-notch logistics services across India to ensure your
          goods are delivered safely and on time.
        </p>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <FaTruck />
            </div>
            <h3>LCV Transport</h3>
            <p>
              Efficient light commercial vehicle delivery for small and medium
              goods.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaShippingFast />
            </div>
            <h3>Container & Trailer</h3>
            <p>
              Secure containerized and trailer logistics for long-distance
              transport.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaBoxOpen />
            </div>
            <h3>Consignment Handling</h3>
            <p>
              Professional loading, unloading, and handling of consignments.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaRoute />
            </div>
            <h3>Route Planning</h3>
            <p>
              Optimized delivery routes to save time and reduce costs.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaClock />
            </div>
            <h3>24/7 Support</h3>
            <p>
              Round-the-clock customer support for your logistics needs.
            </p>
          </div>
        </div>
      </section>

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

          <p className="stats-intro">
            We take pride in delivering top-notch logistics solutions with
            consistent results.
          </p>

          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-icon">
                <FaSmile />
              </div>

              <h2 className="count" data-target="100">
                0<span>+</span>
              </h2>

              <p>Happy Clients</p>
            </div>

            <div className="stat-box">
              <div className="stat-icon">
                <FaCalendarAlt />
              </div>

              <h2>10+</h2>

              <p>Years Experience</p>
            </div>

            <div className="stat-box">
              <div className="stat-icon">
                <FaTruckLoading />
              </div>

              <h2 className="count" data-target="1000">
                0<span>+</span>
              </h2>

              <p>Successful Deliveries</p>
            </div>

            <div className="stat-box">
              <div className="stat-icon">
                <FaHeadset />
              </div>

              <h2>24/7</h2>

              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <h2 className="testimonial-heading">
          What Our Clients Say
        </h2>

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
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                />
              </div>

              <h3 className="testimonial-name">
                {testimonials[currentIndex].name}
              </h3>

              <p className="testimonial-role">
                {testimonials[currentIndex].designation} @{" "}
                <span>
                  {testimonials[currentIndex].company}
                </span>
              </p>

              <p className="testimonial-feedback">
                "{testimonials[currentIndex].feedback}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;