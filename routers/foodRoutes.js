const express = require('express');
const router = express.Router();

const Food = require('../models/Food');

// @route   GET api/food
// @desc    Get all food
// @access  Public
router.get('/', (req, res) => {
  Food.find().then((food) => res.json(food));
});

// @route   POST api/food/add
// @desc    Add a food
// @access  Public
router.post('/add', (req, res) => {
  // Creates a new food object
  const newFood = new Food({
    name: req.body.name,
    price: req.body.price,
    picture: req.body.picture,
  });

  // Adds created food to DB
  newFood.save().then((item) => res.json(item));
});

// @route   DELETE api/food/delete/foodId
// @desc    Delete a food
// @access  Public
router.delete('/delete/:foodId', (req, res) => {
  Food.findByIdAndDelete(req.params.foodId)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
