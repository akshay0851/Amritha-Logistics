const express = require("express");
const router = express.Router();

const ADMIN_EMAIL = "admin@amrithalogistics.com";
const ADMIN_PASSWORD = "admin123";

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({
      success: true,
      message: "Login successful"
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

});

module.exports = router;