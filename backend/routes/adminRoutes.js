const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// GET pending doctors
router.get("/pending-doctors", async (req, res) => {
  const docs = await Doctor.find({ approved: false });
  res.json(docs);
});

// APPROVE doctor
router.put("/approve/:id", async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ msg: "Approved" });
});

// GET approved doctors (for patient booking)
router.get("/approved-doctors", async (req, res) => {
  const docs = await Doctor.find({ approved: true });
  res.json(docs);
});

module.exports = router;