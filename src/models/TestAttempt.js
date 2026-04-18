const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionIndex: Number,
  selectedOption: Number,
  isCorrect: Boolean,
});

const testAttemptSchema = new mongoose.Schema(
  {
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [answerSchema],
    score: { type: Number, default: 0 },
    totalQuestions: Number,
    startedAt: Date,
    submittedAt: Date,
    timeTaken: Number, // in seconds
  },
  { timestamps: true }
);

// Ensure one attempt per student per test
testAttemptSchema.index({ test: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('TestAttempt', testAttemptSchema);