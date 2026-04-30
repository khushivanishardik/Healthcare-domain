const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User exists" });

    const user = new User({ email, password });
    await user.save();

    res.json({ msg: "Registered successfully" });

  } catch {
    res.status(500).json({ msg: "Error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      msg: "Login successful",
      user,
    });

  } catch {
    res.status(500).json({ msg: "Error" });
  }
});

module.exports = router;