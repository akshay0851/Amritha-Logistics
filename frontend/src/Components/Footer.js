import React from "react";
import "./Footer.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay">
        <div className="footer-container">
          {/* About Section */}
          <div className="footer-section about">
            <h2>Amritha Logistics</h2>
            <p>
              Trusted domestic transport service across India since 2015. Safe, timely, and reliable delivery with LCVs, Taurus, Containers, and Trailers. Our mission is service excellence and customer satisfaction.
            </p>
          </div>

          {/* Contact Section */}
          <div className="footer-section contact">
            <h2>Contact Us</h2>
            <ul>
              <li><FaMapMarkerAlt className="footer-icon location-icon" /> 11/23, SPK Building, 1st Floor, Goldwins, Avinashi Road, Coimbatore-641014</li>
              <li><FaPhoneAlt className="footer-icon" /> +91 81390 85459</li>
              <li><FaEnvelope className="footer-icon" /> salesamrithalog@gmail.com</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/quotation" className="quote-link">Request a Quote</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-section social">
            <h2>Follow Us</h2>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://in.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer"><FaX /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Amritha Logistics | All Rights Reserved | Designed by <strong>Amritha Technolab</strong></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
