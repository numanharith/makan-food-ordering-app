const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Create Schema
const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  food: { type: Schema.Types.ObjectId, ref: 'Food' },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Delivering'] }
});

module.exports = model('Order', orderSchema);
