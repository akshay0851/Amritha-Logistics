const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const connectDB = require("./config/db");

// Load environment variables (API keys, DB URI, etc.)
dotenv.config();

const app = express();

// 1. Connect MongoDB
connectDB();

// 2. Optimized Middleware
// Replace with your actual Vercel URL later for better security
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 3. Health Check Route (For Render to see the app is alive)
app.get("/", (req, res) => {
  res.status(200).send("Amritha Logistics Backend is LIVE 🚀");
});

// 4. API Routes
// Note: These will be available at /api/quote and /api/admin/...
app.use("/api", quoteRoutes);
app.use("/api/admin", adminRoutes);

// 5. Global Error Handler (Prevents server from crashing and sending HTML errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Internal Server Error",
    error: err.message 
  });
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ✅ Server is running on port ${PORT}
  🚀 Local: http://localhost:${PORT}
  🔗 Health Check: http://localhost:${PORT}/
  `);
});