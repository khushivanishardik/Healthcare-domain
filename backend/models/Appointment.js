const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: String,
  patientName: String,
  doctorId: String,
  doctorName: String,
  specialization: String,
  appointmentDate: String,
  appointmentTime: String,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Appointment", appointmentSchema);