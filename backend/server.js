// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json()); // to parse JSON POST requests

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Quote submission route
app.post("/api/quote", (req, res) => {
  const { company, email, phone, pickup, drop, date, material, weight, vehicleType, loadType } = req.body;

  // Simple validation
  if (!company || !pickup || !drop || !date || !material || !weight || !vehicleType || !loadType) {
    return res.status(400).json({ message: "Please fill all required fields!" });
  }

  console.log("New Quote Request:", req.body);

  // In production, you can save this to a database here

  res.json({ message: "Quotation submitted successfully!" });
});

// ✅ Port setup for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});