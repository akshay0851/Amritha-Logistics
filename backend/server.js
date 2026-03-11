const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");

// ✅ Import database connection
const connectDB = require("./config/db");

// ✅ Import routes
const quoteRoutes = require("./routes/quoteRoutes");

const app = express();

// ✅ Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Amritha Logistics Backend Running");
});

// API routes
app.use("/api", quoteRoutes);
app.use("/api/admin", adminRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});