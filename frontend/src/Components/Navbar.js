// src/Components/Navbar.js

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../img/logo.png";

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Navbar background on scroll
  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (

    <nav className={`navbar-modern ${scrolled ? "scrolled" : ""}`}>

      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Amritha Logistics" className="nav-logo-img" />
          <span className="nav-company-name">AMRITHA LOGISTICS</span>
        </Link>

        {/* Mobile Toggle */}
        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Menu */}
        <div className={`nav-sidebar ${isOpen ? "open" : ""}`}>

          <ul className="sidebar-links">

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/services">Services</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

            <li>
              <Link to="/quotation" className="quote-btn">
                Get a Quote
              </Link>
            </li>

          </ul>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;