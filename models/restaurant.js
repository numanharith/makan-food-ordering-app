import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import bcrypt from 'bcryptjs';

// Create Schema
const restaurantSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  logo: { type: String },
});

restaurantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Restaurant = model('Restaurant', restaurantSchema);

export default Restaurant;
