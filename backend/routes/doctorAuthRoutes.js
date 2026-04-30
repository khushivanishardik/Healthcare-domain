const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// REGISTER (apply for approval)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    const exists = await Doctor.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Doctor exists" });

    const doc = new Doctor({
      name,
      email,
      password,
      specialization,
      approved: false,
    });

    await doc.save();

    res.json({ msg: "Applied for approval" });

  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const doc = await Doctor.findOne({ email, password });

    if (!doc) return res.status(400).json({ msg: "Invalid credentials" });

    if (!doc.approved)
      return res.status(403).json({ msg: "Waiting for admin approval" });

    res.json({
      msg: "Login successful",
      doctor: doc,
    });

  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});

// GET PROFILE
router.get("/profile/:email", async (req, res) => {
  try {
    const doc = await Doctor.findOne({ email: req.params.email });
    res.json(doc);
  } catch {
    res.status(500).json({ msg: "Error" });
  }
});

module.exports = router;