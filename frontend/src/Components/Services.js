import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./Services.css";
import { FaTruck, FaShippingFast, FaBoxOpen, FaRoute, FaClock, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Correctly imported

const servicesData = [
  {
    id: 1,
    icon: <FaTruck />,
    title: "LCV Transport",
    shortDesc: "Efficient light commercial vehicle transport for small and medium-sized consignments.",
    longDesc: "Our LCV transport service ensures your goods are delivered on time with flexible scheduling. We specialize in transporting small and medium-sized consignments safely and efficiently across India."
  },
  {
    id: 2,
    icon: <FaShippingFast />,
    title: "Container & Trailer",
    shortDesc: "Secure containerized and trailer transport for long-distance shipments.",
    longDesc: "Our container and trailer services provide secure and reliable transport for large shipments. Every shipment is tracked and handled professionally to ensure it reaches its destination safely."
  },
  {
    id: 3,
    icon: <FaBoxOpen />,
    title: "Consignment Handling",
    shortDesc: "Professional loading, unloading, and handling of goods.",
    longDesc: "We provide expert loading, unloading, and consignment handling services. Our trained staff ensures that your goods are safe from damage and arrive at the destination intact."
  },
  {
    id: 4,
    icon: <FaRoute />,
    title: "Route Planning",
    shortDesc: "Optimized delivery routes to save time and reduce costs.",
    longDesc: "We plan the fastest and safest routes for your shipments using advanced logistics strategies. Our route planning minimizes delays and maximizes efficiency."
  },
  {
    id: 5,
    icon: <FaClock />,
    title: "24/7 Support",
    shortDesc: "Round-the-clock customer support for all logistics queries.",
    longDesc: "Our customer support team is available 24/7 to assist with queries, provide shipment updates, and ensure your logistics experience is smooth and reliable."
  },
];

function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate(); // ✅ Properly defined

  return (
    <div className="services-page">
      <>
    <Navbar />
    {/* Page content below */}
  </>
      {/* Hero Section */}
      <header className="services-hero">
        <div className="services-overlay"></div>
        <div className="services-hero-content">
          <h1>Our Services</h1>
          <p>Reliable, Safe, and Timely Logistics Solutions Across India</p>
        </div>
      </header>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          {servicesData.map(service => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => setSelectedService(service)}
            >
              <div className="service-icon">{service.icon}</div>
              <h2>{service.title}</h2>
              <p>{service.shortDesc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            className="service-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="service-modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button className="modal-close" onClick={() => setSelectedService(null)}>
                <FaTimes />
              </button>
              <div className="modal-icon">{selectedService.icon}</div>
              <h2>{selectedService.title}</h2>
              <p>{selectedService.longDesc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call-to-Action */}
      <section className="cta-section">
        <h2>Ready to Move Your Goods?</h2>
        <p>Contact us today for a customized transport solution tailored to your business needs.</p>
        <button 
          className="cta-button" 
          onClick={() => navigate("/quotation")}
        >
          Request a Quote
        </button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Services;
