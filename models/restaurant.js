const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Create Schema
const restaurantSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  logo: { type: String },
});

module.exports = model('Restaurant', restaurantSchema);
