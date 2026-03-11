// src/Components/Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTruck, FaShippingFast, FaBoxOpen, FaRoute,
  FaClock, FaSmile, FaCalendarAlt, FaTruckLoading, FaHeadset
} from "react-icons/fa";

import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Home.css";
import statsBg from "../img/about-hero.png";
import hero1 from "../img/Hero.png";
import hero2 from "../img/Hero2.png";
import hero3 from "../img/Hero3.png";
import logo from "../img/logo.png";

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://amritha-logistics-backend.onrender.com/api/quote", // ✅ Make sure backend has this route
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      // ✅ Check if response is JSON
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Expected JSON but got:", text);
        alert("Something went wrong! Check backend route.");
        return;
      }

      alert(data.message);
      // ✅ Clear form after success
      setFormData({
        company: "",
        pickup: "",
        drop: "",
        date: "",
        material: "",
        weight: "",
        vehicleType: "",
        loadType: "FTL"
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  const setLoadType = (type) => {
    setFormData({ ...formData, loadType: type });
  };

  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [hero1, hero2, hero3];

  useEffect(() => {
    const counters = document.querySelectorAll(".count");
    const speed = 200;

    const countUp = (el) => {
      const target = +el.getAttribute("data-target");
      let count = 0;
      const update = () => {
        count += target / speed;
        if (count < target) {
          el.textContent = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

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

  const scrollToQuote = () => {
    const quoteSection = document.getElementById("quote");
    if (quoteSection) quoteSection.scrollIntoView({ behavior: "smooth" });
  };

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
            <img src={logo} alt="Amritha Logistics Logo" />
          </div>
          <h1>AMRITHA LOGISTICS</h1>
          <p>Reliable Domestic Transport Services Across India</p>
          <div className="hero-buttons">
            <button className="hero-button animated" onClick={scrollToQuote}>
              Send Quote
            </button>
            <Link to="/contact" className="hero-button outline animated">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services, Stats, Testimonials, Quotation sections remain same */}
      {/* ... you can keep your previous JSX for these sections ... */}

      <Footer />
    </div>
  );
}

export default Home;