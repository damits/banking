const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  iban: {type: String, required: true, unique: true},
  balance: {type: Number, required: true, default: 100},
  transations: [{type: String, required: true}]
});

module.exports = mongoose.model('Account', AccountSchema);
