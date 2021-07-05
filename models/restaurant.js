import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import bcrypt from 'bcryptjs';

// Create Schema
const restaurantSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  logo: { type: String },
});

// Validates encrypted password
restaurantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypts password during registration
restaurantSchema.pre('save', async function (next) {
  // Checks if PW is modified during update
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Restaurant = model('Restaurant', restaurantSchema);

export default Restaurant;
