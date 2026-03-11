// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // optional if using .env for PORT or DB

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors()); // allow requests from frontend
app.use(bodyParser.json()); // parse JSON bodies

// ✅ Test route to check server
app.get("/", (req, res) => {
  res.send("Amritha Logistics Backend Running!");
});

// ✅ Quotation POST route
app.post("/api/quote", (req, res) => {
  const quoteData = req.body; // form data from frontend
  console.log("Received quote:", quoteData);

  // Optional: Save quoteData to database here (MongoDB, MySQL, etc.)

  // ✅ Respond with JSON so frontend can parse it safely
  res.json({
    message: "Quotation submitted successfully!",
    receivedData: quoteData
  });
});

// ✅ Optional: Catch-all for other routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});