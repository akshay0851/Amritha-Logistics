const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");
const nodemailer = require("nodemailer");

// ✅ Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "salesamrithalog@gmail.com",
    // It's best practice to use process.env.EMAIL_PASS here later
    pass: "zqmthpzdbhbwildf" 
  }
});

// ============================
// GET all quotations (For Admin Dashboard)
// Path: GET /api/quotes
// ============================
router.get("/quotes", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ============================
// DELETE quotation
// Path: DELETE /api/quotes/:id
// ============================
router.delete("/quotes/:id", async (req, res) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.json({ success: true, message: "Quote deleted successfully" });
  } catch (error) {
    console.error("Error deleting quote:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ============================
// POST new quotation
// Path: POST /api/quote
// ============================
router.post("/quote", async (req, res) => {
  try {
    const {
      company, pickup, drop, date, material, weight, vehicleType, loadType
    } = req.body;

    // 1. Basic Validation
    if (!company || !pickup || !drop) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // 2. Save to MongoDB
    const newQuote = new Quote({
      company, pickup, drop, date, material, weight, vehicleType, loadType
    });
    await newQuote.save();
    console.log("✅ Quotation saved to MongoDB");

    // 3. Email notification setup
    const mailOptions = {
      from: "salesamrithalog@gmail.com",
      to: "salesamrithalog@gmail.com",
      subject: `New Quote Request from ${company}`,
      text: `
        You have received a new quotation request:

        Company: ${company}
        Pickup Location: ${pickup}
        Drop Location: ${drop}
        Date of Shipment: ${date}
        Material Type: ${material}
        Weight: ${weight}
        Vehicle Type: ${vehicleType}
        Load Type: ${loadType}

        This data has also been saved to your admin dashboard.
      `
    };

    // 4. Send Email
    await transporter.sendMail(mailOptions);
    console.log("📧 Notification email sent successfully");

    // 5. Send final success response
    res.status(201).json({
      success: true,
      message: "Quotation submitted and email sent successfully!"
    });

  } catch (error) {
    console.error("❌ Critical Error in /api/quote:", error);
    
    // Send a JSON error instead of letting it crash
    res.status(500).json({
      success: false,
      message: "Server error occurred while processing your request.",
      error: error.message
    });
  }
});

module.exports = router;