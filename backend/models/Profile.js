const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({

  userEmail: {
    type: String,
    unique: true
  },

  name: String,

  age: String,

  gender: String,

  bloodGroup: String,

  phone: String,

  address: String,

  allergies: String

});

module.exports = mongoose.model(
'Profile',
profileSchema
);