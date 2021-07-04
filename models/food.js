import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Create Schema
const foodSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
});

const Food = model('Food', foodSchema);

export default Food;