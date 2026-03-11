// src/Components/Quotation.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Quotation.css";

function Quotation() {
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
    material: "",
    weight: "",
    vehicleType: "",
    loadType: "FTL",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setLoadType = (type) => {
    setFormData({ ...formData, loadType: type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://amritha-logistics-backend.onrender.com/api/quote",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      // ✅ Safe JSON parsing
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        alert(data.message);

        // ✅ Reset form
        setFormData({
          company: "",
          email: "",
          phone: "",
          pickup: "",
          drop: "",
          date: "",
          material: "",
          weight: "",
          vehicleType: "",
          loadType: "FTL",
        });
      } else {
        const text = await response.text();
        console.error("Expected JSON but got:", text);
        alert("Something went wrong! Check backend route.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting quotation");
    }

    setLoading(false);
  };

  return (
    <div className="quotation-page">
      <Navbar />

      {/* Hero Section */}
      <header className="quotation-hero">
        <div className="quotation-overlay"></div>
        <div className="quotation-hero-content">
          <h1>Request a Quotation</h1>
          <p>Fill out the form below and get a customized logistics quote.</p>
        </div>
      </header>

      {/* Form Section */}
      <section className="quotation-section">
        <form className="quotation-form" onSubmit={handleSubmit}>
          <h2>Your Company Details</h2>

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="pickup"
            placeholder="Pickup Location"
            value={formData.pickup}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="drop"
            placeholder="Drop Location"
            value={formData.drop}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="material"
            placeholder="Material"
            value={formData.material}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            required
          />

          {/* Vehicle Type */}
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

          {/* Load Type */}
          <div className="toggle-buttons">
            <button
              type="button"
              className={formData.loadType === "FTL" ? "active" : ""}
              onClick={() => setLoadType("FTL")}
            >
              Full Truck Load
            </button>
            <button
              type="button"
              className={formData.loadType === "PTL" ? "active" : ""}
              onClick={() => setLoadType("PTL")}
            >
              Part Truck Load
            </button>
          </div>

          <button type="submit" className="quotation-button" disabled={loading}>
            {loading ? "Submitting..." : "Get Quotation"}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default Quotation;