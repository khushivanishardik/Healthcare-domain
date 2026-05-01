const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// PENDING
router.get("/pending-doctors", async (req, res) => {
  const docs = await Doctor.find({ approved: false });
  res.json(docs);
});

// APPROVE
router.put("/approve/:id", async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ msg: "Approved" });
});

// APPROVED
router.get("/approved-doctors", async (req, res) => {
  const docs = await Doctor.find({ approved: true });
  res.json(docs);
});

module.exports = router;