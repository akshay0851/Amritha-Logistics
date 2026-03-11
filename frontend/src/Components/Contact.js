// src/Components/Contact.js
import React from "react";
import Footer from "./Footer";
import "./Contact.css";
import Navbar from "./Navbar";
function Contact() {
  return (
    
    <div className="contact-page">
       <>
    <Navbar />
    {/* Page content below */}
  </>
      {/* Hero Section */}
      <header className="contact-hero">
        <div className="contact-overlay"></div>
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We’re here to assist you. Reach out to us anytime!</p>
        </div>
      </header>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p><strong>Address:</strong> Amritha Logistics,11/23,SPK Building,1st Floor,Goldwins,Coimbatore, Tamil Nadu, India</p>
            <p><strong>Email:</strong> salesamrithalog@gmail.com</p>
            <p><strong>Phone:</strong> +91 99439 10007</p>
          </div>

          <form className="contact-form">
            <h2>Send a Message</h2>
            <input type="text" placeholder="Your Name" required />
             <input type="tel" placeholder="Phone Number" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" rows="6" required></textarea>
            <button type="submit" className="contact-button">Send Message</button>
          </form>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="map-section">
        <h2>Find Us Here</h2>
        <div className="map-container">
          <iframe
            title="Amritha Logistics Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d823.2221561726067!2d77.04671853440975!3d11.044131400950201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857c8db07c20d%3A0x79a1760ebcb66e7f!2sSPK%20Building!5e0!3m2!1sen!2sin!4v1772996334920!5m2!1sen!2sin" 
            width="100%"
            height="400"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Contact;
