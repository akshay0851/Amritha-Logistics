import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./About.css";
import team1 from "../img/team1.png";
import team2 from "../img/team2.png";
import team3 from "../img/team3.png";

function About() {
  return (
    <div className="about-page">
 <>
    <Navbar />
    {/* Page content below */}
  </>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-overlay"></div>
        <div className="about-hero-content">
          <h1>About Amritha Logistics</h1>
          <p>Reliable Domestic Transport Services Across India Since 2015</p>
        </div>
      </section>

      {/* Company Info */}
      <section className="company-info">
        <div className="info-container">
          <div className="info-text">
            <h2>Who We Are</h2>
            <p>
              Amritha Logistics is a trusted logistics company specializing in domestic on-road transport across India. 
              Our fleet includes LCVs, Containers, Trailers, and Taurus vehicles, ensuring your goods are delivered safely and on time.</p>
             <p> Amritha Logistics is a leading domestic transport and logistics company dedicated to providing safe, reliable, and timely delivery solutions across India. Established in 2015, we have consistently focused on building trust with our clients through transparency, professionalism, and superior service quality.</p>

<p>Our fleet includes LCVs, Taurus vehicles, Containers, and Trailers, enabling us to handle consignments of all sizes—from small parcels to heavy cargo. With a customer-centric approach, we customize our logistics solutions to meet the unique requirements of every client, ensuring efficiency, cost-effectiveness, and peace of mind.

At Amritha Logistics, we combine advanced route planning, modern tracking systems, and a team of skilled professionals to deliver seamless transportation experiences. Our commitment to safety, punctuality, and operational excellence has earned us a reputation as one of the most trusted logistics partners in the industry.

We are more than just a transport company—we are your strategic logistics partner, dedicated to helping your business grow by providing dependable and innovative solutions for every shipment.
            </p>
          </div>
          <div className="info-image">
            <img src={team1} alt="Company" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="mission-box">
          <h3>Our Mission</h3>
          <p>To provide seamless, safe, and efficient transport solutions across India.</p>
        </div>
        <div className="vision-box">
          <h3>Our Vision</h3>
          <p>To become the most trusted logistics partner for businesses nationwide.</p>
        </div>
      </section>

      {/* Team Section *
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <img src={team1} alt="Team Member" />
            <h4>Arjun Kumar</h4>
            <p>Logistics Manager</p>
          </div>
          <div className="team-card">
            <img src={team2} alt="Team Member" />
            <h4>Priya Sharma</h4>
            <p>Operations Head</p>
          </div>
          <div className="team-card">
            <img src={team3} alt="Team Member" />
            <h4>Ravi Menon</h4>
            <p>Customer Support</p>
          </div>
        </div>
      </section>
     */}
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
