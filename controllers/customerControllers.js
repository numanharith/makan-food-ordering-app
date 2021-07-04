import asyncHandler from 'express-async-handler';
import generateJWT from '../utils/generateJWT.js';

// Customer Model
import Customer from '../models/customer.js';

// @route   POST /api/customers/reg
// @desc    Customer registers for a new account
// @access  Public
export const customerReg = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please enter a name!');
  } else if (!password) {
    res.status(400);
    throw new Error('Please enter a password!');
  }

  // Checks for existing customer in DB
  const existingCustomer = await Customer.findOne({ name });

  if (existingCustomer) {
    res.status(400);
    throw new Error('Name is already in use!');
  }

  const customer = await Customer.create({ name, password });
  if (customer) {
    res.status(201).json({
      _id: customer._id,
      name: customer.name,
      token: generateJWT(customer._id), // inserts customer id into JWT
    });
  } else {
    res.status(400);
    throw new Error('Account registration failed!');
  }
});

// @route   POST /api/customers/login
// @desc    Customer logs in to account and gets token
// @access  Public
export const customerLogin = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  // Checks for existing customer in DB
  const customer = await Customer.findOne({ name });

  if (customer && (await customer.matchPassword(password))) {
    res.json({
      _id: customer._id,
      name: customer.name,
      token: generateJWT(customer._id), // inserts customer id into JWT
    });
  } else {
    res.status(401);
    throw new Error('Invalid name or password!');
  }
});

// @route   GET /api/customers/myprofile
// @desc    Get customer user's profile
// @access  Private
export const getCustomerProfile = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.customer._id);

  if (customer) {
    res.json({
      _id: customer._id,
      name: customer.name,
    });
  } else {
    res.status(404);
    throw new Error('Customer account not found!');
  }
});
