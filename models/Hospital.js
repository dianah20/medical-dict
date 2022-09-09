
// Import mongoose
const mongoose = require("mongoose");

// Create donor model
const HospitalModal = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 30,
      min: 4,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
        type: String,
        max: 1000,
        required: true
    },
    tel: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("Hospital", HospitalModal);
