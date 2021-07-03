const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Create Schema
const foodSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  picture: { type: String },
});

module.exports = model('Food', foodSchema);
