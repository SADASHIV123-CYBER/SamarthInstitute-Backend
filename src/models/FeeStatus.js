const mongoose = require('mongoose');

const feeStatusSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amountPaid: Number,
    totalFees: Number,
    dueDate: Date,
    status: { type: String, enum: ['paid', 'pending', 'partial'], default: 'pending' },
    paymentDate: Date,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FeeStatus', feeStatusSchema);