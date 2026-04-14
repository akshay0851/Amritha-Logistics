// server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Quote route (ONLY ONE)
app.post("/api/quote", async (req, res) => {
  try {
    const {
      company,
      email,
      phone,
      pickup,
      drop,
      date,
      material,
      weight,
      vehicleType,
      loadType
    } = req.body;

    // ✅ Validation
    if (!company || !pickup || !drop || !date || !material || !weight || !vehicleType || !loadType) {
      return res.status(400).json({
        message: "Please fill all required fields!"
      });
    }

    console.log("📦 New Quote Request:", req.body);

    // ✅ Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // you receive it
      subject: "🚚 New Quotation Request - Amritha Logistics",
      html: `
        <h2>New Quote Request</h2>
        <p><b>Company:</b> ${company}</p>
        <p><b>Email:</b> ${email || "N/A"}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Pickup:</b> ${pickup}</p>
        <p><b>Drop:</b> ${drop}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Material:</b> ${material}</p>
        <p><b>Weight:</b> ${weight}</p>
        <p><b>Vehicle Type:</b> ${vehicleType}</p>
        <p><b>Load Type:</b> ${loadType}</p>
      `
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    res.json({
      message: "Quotation sent successfully ✅"
    });

  } catch (error) {
    console.error("❌ Error:", error);

    res.status(500).json({
      message: "Failed to send quotation ❌"
    });
  }
});

// ✅ Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});