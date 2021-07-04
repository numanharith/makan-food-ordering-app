import asyncHandler from 'express-async-handler';
import generateJWT from '../utils/generateJWT.js';

// Restaurant Model
import Restaurant from '../models/restaurant.js';

// @route   POST /api/restaurants/reg
// @desc    Restaurant registers for a new account
// @access  Public
export const restaurantUserReg = asyncHandler(async (req, res) => {
  const { name, password, logo } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please enter a name!');
  } else if (!password) {
    res.status(400);
    throw new Error('Please enter a password!');
  } else if (!logo) {
    res.status(400);
    throw new Error('Please upload a logo!');
  }

  // Checks for existing restaurant in DB
  const existingRestaurant = await Restaurant.findOne({ name });

  if (existingRestaurant) {
    res.status(400);
    throw new Error('Name is already in use!');
  }

  const restaurant = await Restaurant.create({ name, password, logo });
  if (restaurant) {
    res.status(201).json({
      _id: restaurant._id,
      name: restaurant.name,
      logo: restaurant.logo,
      token: generateJWT(restaurant._id), // inserts restaurant id into JWT
    });
  } else {
    res.status(400);
    throw new Error('Account registration failed!');
  }
});

// @route   POST /api/restaurants/login
// @desc    Restaurant logs in to account and gets token
// @access  Public
export const restaurantUserLogin = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  // Checks for existing restaurant in DB
  const restaurant = await Restaurant.findOne({ name });

  if (restaurant && (await restaurant.matchPassword(password))) {
    res.json({
      _id: restaurant._id,
      name: restaurant.name,
      logo: restaurant.logo,
      token: generateJWT(restaurant._id), // inserts restaurant id into JWT
    });
  } else {
    res.status(401);
    throw new Error('Invalid name or password!');
  }
});

// @route   GET /api/restaurants/myprofile
// @desc    Get restaurant user's profile
// @access  Private
export const getRestaurantUserProfile = asyncHandler(async (req, res) => {
  const restaurantUser = await Restaurant.findById(req.restaurant._id);

  if (restaurantUser) {
    res.json({
      _id: restaurantUser._id,
      name: restaurantUser.name,
      logo: restaurantUser.logo,
    });
  } else {
    res.status(404);
    throw new Error('Restaurant account not found!');
  }
});
