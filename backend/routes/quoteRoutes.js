const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");
const nodemailer = require("nodemailer");

const emailUser = process.env.EMAIL_USER || "salesamrithalog@gmail.com";
const emailPass = process.env.EMAIL_PASS || "";

// ============================
// Email Transporter
// ============================
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error.message);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

// ============================
// GET all quotations
// ============================
router.get("/quotes", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ============================
// DELETE quotation
// ============================
router.delete("/quotes/:id", async (req, res) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);

    if (!deletedQuote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    res.json({
      success: true,
      message: "Quote deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting quote:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ============================
// POST new quotation
// ============================
router.post("/quote", async (req, res) => {
  try {
    const {
      company,
      pickup,
      drop,
      date,
      material,
      weight,
      vehicleType,
      loadType,
    } = req.body;

    // Validation
    if (!company || !pickup || !drop) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Save quotation
    const newQuote = new Quote({
      company,
      pickup,
      drop,
      date,
      material,
      weight,
      vehicleType,
      loadType,
    });

    await newQuote.save();

    console.log("✅ Quotation saved to MongoDB");

    // Respond immediately
    res.status(201).json({
      success: true,
      message: "Quotation submitted successfully!",
    });

    // Send email in the background
    if (emailUser && emailPass) {
      const mailOptions = {
        from: emailUser,
        to: emailUser,
        subject: `New Quote Request from ${company}`,
        text: `
You have received a new quotation request.

Company: ${company}

Pickup Location: ${pickup}

Drop Location: ${drop}

Date of Shipment: ${date}

Material Type: ${material}

Weight: ${weight}

Vehicle Type: ${vehicleType}

Load Type: ${loadType}

This quotation has also been saved to the Admin Dashboard.
`,
      };

      transporter
        .sendMail(mailOptions)
        .then(() => {
          console.log("📧 Notification email sent successfully");
        })
        .catch((err) => {
          console.error("❌ Email Error:", err.message);
        });
    } else {
      console.warn("⚠️ Email skipped because SMTP credentials are missing.");
    }
  } catch (error) {
    console.error("❌ Critical Error in /api/quote:", error);

    res.status(500).json({
      success: false,
      message: "Server error while processing quotation.",
    });
  }
});

module.exports = router;