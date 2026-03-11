// src/Components/Quotation.js
import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./Quotation.css";

function QuotationForm() {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [loadType, setLoadType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      company,
      email,
      phone,
      pickup,
      drop,
      date,
      material,
      weight,
      vehicleType,
      loadType
    };

    try {
      const response = await fetch(
        "https://amritha-logistics-backend.onrender.com/api/quote", // ✅ Correct backend route
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      // ✅ Handle non-OK responses
      if (!response.ok) {
        const text = await response.text();
        console.error("Backend error:", text);
        alert("Error submitting quotation. Check backend API route.");
        return;
      }

      // ✅ Safely parse JSON
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Expected JSON but got:", text);
        alert("Unexpected response from backend.");
        return;
      }

      alert(data.message || "Quotation submitted successfully!");

      // ✅ Reset form
      setCompany("");
      setEmail("");
      setPhone("");
      setPickup("");
      setDrop("");
      setDate("");
      setMaterial("");
      setWeight("");
      setVehicleType("");
      setLoadType("");

    } catch (error) {
      console.error("Error submitting quotation:", error);
      alert("Something went wrong! Please try again.");
    }
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
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Pickup Location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Drop Location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />

          {/* Vehicle Type */}
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="">Select Vehicle Type</option>
            <option value="LCV">LCV</option>
            <option value="Container">Container</option>
            <option value="Trailer">Trailer</option>
            <option value="Taurus">Taurus</option>
          </select>

          {/* Load Type */}
          <select
            value={loadType}
            onChange={(e) => setLoadType(e.target.value)}
            required
          >
            <option value="">Select Load Type</option>
            <option value="FTL">Full Truck Load</option>
            <option value="PTL">Part Truck Load</option>
          </select>

          <button type="submit" className="quotation-button">
            Get Quotation
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default QuotationForm;