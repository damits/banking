const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransationSchema = new Schema({
  account1: {type: String, required: true},
  account2: {type: String, required: true},
  amount: {type: Number, required: true},
  timestamp: {type: Date, required: true, default: Date.now()}
});

module.exports = mongoose.model('Transation', TransationSchema);
