import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';

// Restaurant Model
import Restaurant from '../models/Restaurant';

// @route   POST /api/restaurantAuth/register
// @desc    Restaurant registers for a new account
// @access  Public
router.post('/register', (req, res) => {
  const { name, password, logo } = req.body;

  // Validate inputs
  if (!name || !password) {
    return res.status(400).json({ msg: 'Please enter all the fields!' });
  }

  // Check for existing restaurant name
  Restaurant.findOne({ name }).then((restaurant) => {
    // Returns error if restaurant with the name has already exist
    if (restaurant)
      return res
        .status(400)
        .json({ msg: "The name is already in use!" });

    // Creates new restaurant
    const newRestaurant = new Restaurant({ name, password, logo });

    // Encrypts password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newRestaurant.password, salt, (err, hashedPW) => {
        if (err) throw err;
        // Overwrites password with hashed password
        newRestaurant.password = hashedPW;
        // Saves restaurant to DB
        newRestaurant.save().then((restaurant) => {
          jwt.sign(
            { restaurantId: restaurant.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                restaurantUser: { id: restaurant.id, name: restaurant.name, logo: restaurant.logo },
              });
            }
          );
        });
      });
    });
  });
});

// @route   POST /api/restaurantAuth/login
// @desc    Restaurant logs in to account
// @access  Public
router.post('/restaurantAuth/login', (req, res) => {
  const { name, password } = req.body;

  // Validate inputs
  if (!name || !password) {
    return res.status(400).json({ msg: 'Please enter all the fields!' });
  }

  // Check for existing restaurant
  Restaurant.findOne({ name }).then((restaurant) => {
    // Returns error if restaurant does not exist
    if (!restaurant) return res.status(400).json({ msg: 'Invalid credentials entered!' });

    // Compare input with encrypted PW
    bcrypt.compare(password, restaurant.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials entered!' });
      jwt.sign(
        { restaurantId: restaurant.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            restaurantUser: { id: restaurant.id, name: restaurant.name, logo: restaurant.logo },
          });
        }
      );
    });
  });
});

// @route   GET /api/restaurantAuth/restaurant
// @desc    Get restaurant data
// @access  Private
router.get('/restaurant', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((restaurant) => res.json(restaurant));
});

export default router;
