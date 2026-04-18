const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: Number, required: true }, // index 0-3
});

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    duration: { type: Number, required: true }, // in minutes
    questions: [questionSchema],
    isActive: { type: Boolean, default: false },
    startTime: Date,
    endTime: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Test', testSchema);