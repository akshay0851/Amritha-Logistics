import React from "react";
import AdminQuotes from "./Components/AdminQuotes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import Quotation from "./Components/Quotation"; // make sure you have this page
import ScrollToTop from "./Components/scrolltotop";
import AdminLogin from "./Components/AdminLogin";
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminQuotes />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quotation" element={<Quotation />} />
      </Routes>
    </Router>
  );
}

export default App;
