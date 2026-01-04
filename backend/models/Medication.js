const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Pill', 'Syrup', 'Injection', 'Tablet'], 
    default: 'Pill'
  },
  frequency: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  notes: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Medication', medicationSchema);