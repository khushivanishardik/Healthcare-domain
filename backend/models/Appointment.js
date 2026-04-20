const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: String
  },

  doctorId: {
    type: String
  },

  patientName: {
    type: String,
    required: true
  },

  doctorName: {
    type: String,
    required: true
  },

  specialization: {
    type: String
  },

  appointmentDate: {
    type: String,
    required: true
  },

  appointmentTime: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: 'Pending'
  },

  completedAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model(
'Appointment',
appointmentSchema
);