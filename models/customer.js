const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Create Schema
const customerSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: Number, required: true },
});

module.exports = model('Customer', customerSchema);
