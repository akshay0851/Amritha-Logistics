// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const quoteRoutes = require("./routes/quoteRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Mount API routes
app.use("/api", quoteRoutes);
app.use("/api", adminRoutes);

// ✅ Connect to MongoDB (non-blocking if env is missing)
connectDB().catch((err) => {
  console.error("MongoDB connection failed:", err);
});

// ✅ Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});