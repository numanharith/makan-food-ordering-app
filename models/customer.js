import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import bcrypt from 'bcryptjs';

// Create Schema
const customerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Validates encrypted password
customerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypts password during registration
customerSchema.pre('save', async function (next) {
  // Checks if PW is modified during update
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Customer = model('Customer', customerSchema);

export default Customer;
