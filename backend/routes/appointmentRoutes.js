const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// BOOK
router.post("/book", async (req, res) => {
  try {
    const appt = new Appointment(req.body);
    await appt.save();
    res.json({ msg: "Booked" });
  } catch {
    res.status(500).json({ msg: "Booking failed" });
  }
});

// GET ALL
router.get("/all", async (req, res) => {
  const data = await Appointment.find();
  res.json(data);
});

// UPDATE
router.put("/update/:id", async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, req.body);
  res.json({ msg: "Updated" });
});

module.exports = router;