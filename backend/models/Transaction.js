const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionID: { type: String, required: true, unique: true },
  userID: { type: String, required: true },
  userName: { type: String, required: true }, // Encrypted
  accountNumber: { type: String, required: true }, // Encrypted
  amount: { type: Number, required: true },
  merchant: { type: String, required: true },
  location: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  riskScore: { type: Number, default: 0 },
  status: { type: String, enum: ['normal', 'suspicious'], default: 'normal' }
}, { timestamps: true });

transactionSchema.index({ timestamp: -1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ riskScore: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
