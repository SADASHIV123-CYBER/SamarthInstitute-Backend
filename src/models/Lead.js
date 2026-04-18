const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    class: { type: String, enum: ['11', '12'] },
    targetExam: { type: String, enum: ['NEET', 'JEE', 'MHT-CET'] },
    mobile: { type: String, required: true },
    source: { type: String, default: 'chatbot' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);