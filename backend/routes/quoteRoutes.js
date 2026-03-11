const express = require("express");
const router = express.Router();

const Quote = require("../models/Quote");
const nodemailer = require("nodemailer");

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "salesamrithalog@gmail.com",
    pass: "zqmthpzdbhbwildf"
  }
});


// ============================
// GET all quotations
// ============================
router.get("/quotes", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ============================
// DELETE quotation
// ============================
router.delete("/quotes/:id", async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: "Quote deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// ============================
// POST new quotation
// ============================
router.post("/quote", async (req, res) => {

  try {

    console.log("Incoming Quote:", req.body);

    const {
      company,
      pickup,
      drop,
      date,
      material,
      weight,
      vehicleType,
      loadType
    } = req.body;

    const newQuote = new Quote({
      company,
      pickup,
      drop,
      date,
      material,
      weight,
      vehicleType,
      loadType
    });

    await newQuote.save();

    console.log("Quotation saved to MongoDB");


    // Email notification
    const mailOptions = {
      from: "salesamrithalog@gmail.com",
      to: "salesamrithalog@gmail.com",
      subject: "New Quote Request - Amritha Logistics",
      text: `
New Quote Received

Company: ${company}
Pickup: ${pickup}
Drop: ${drop}
Material: ${material}
Vehicle: ${vehicleType}
Weight: ${weight}
Date: ${date}
Load Type: ${loadType}
`
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");

    res.status(201).json({
      message: "Quotation submitted successfully"
    });

  } catch (error) {

    console.error("Error saving quotation:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;