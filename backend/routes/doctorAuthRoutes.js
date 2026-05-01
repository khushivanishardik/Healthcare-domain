const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// REGISTER (apply)
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
      approved: false
    });

    await doc.save();

    res.json({ msg: "Applied for approval" });

  } catch {
    res.status(500).json({ msg: "Application failed" });
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

    res.json({ msg: "Login success", doctor: doc });

  } catch {
    res.status(500).json({ msg: "Error" });
  }
});

// PROFILE
router.get("/profile/:email", async (req, res) => {
  const doc = await Doctor.findOne({ email: req.params.email });
  res.json(doc);
});

module.exports = router;