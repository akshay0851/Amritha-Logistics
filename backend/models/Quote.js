const mongoose = require("mongoose");
const quoteSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  pickup: {
    type: String,
    required: true
  },
  drop: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  loadType: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Quote", quoteSchema);