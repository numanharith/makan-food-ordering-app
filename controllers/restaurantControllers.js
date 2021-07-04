import asyncHandler from 'express-async-handler';
import generateJWT from '../utils/generateJWT.js'
// import express from 'express';
// import bcrypt from 'bcryptjs';
// import auth from '../middleware/auth';

// Restaurant Model
import Restaurant from '../models/restaurant.js';

// @route   POST /api/restaurantAuth/register
// @desc    Restaurant registers for a new account
// @access  Public
// router.post('/register', (req, res) => {
//   const { name, password, logo } = req.body;

//   // Validate inputs
//   if (!name || !password) {
//     return res.status(400).json({ msg: 'Please enter all the fields!' });
//   }

//   // Check for existing restaurant name
//   Restaurant.findOne({ name }).then((restaurant) => {
//     // Returns error if restaurant with the name has already exist
//     if (restaurant) return res.status(400).json({ msg: 'The name is already in use!' });

//     // Creates new restaurant
//     const newRestaurant = new Restaurant({ name, password, logo });

//     // Encrypts password
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newRestaurant.password, salt, (err, hashedPW) => {
//         if (err) throw err;
//         // Overwrites password with hashed password
//         newRestaurant.password = hashedPW;
//         // Saves restaurant to DB
//         newRestaurant.save().then((restaurant) => {
//           jwt.sign({ restaurantId: restaurant.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
//             if (err) throw err;
//             res.json({
//               token,
//               restaurantUser: { id: restaurant.id, name: restaurant.name, logo: restaurant.logo },
//             });
//           });
//         });
//       });
//     });
//   });
// });

// @route   POST /api/restaurants/login
// @desc    Restaurant logs in to account and gets token
// @access  Public
export const restaurantLogin = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  // Checks for existing restaurant in DB
  const restaurant = await Restaurant.findOne({ name });
  
  if (restaurant && (await restaurant.matchPassword(password))) {
    res.json({
      _id: restaurant._id,
      name: restaurant.name,
      logo: restaurant.logo,
      token: generateJWT(restaurant._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials!');
  }
});

// @route   GET /api/restaurantAuth/restaurant
// @desc    Get restaurant data
// @access  Private
// router.get('/restaurant', auth, (req, res) => {
//   User.findById(req.user.id)
//     .select('-password')
//     .then((restaurant) => res.json(restaurant));
// });
