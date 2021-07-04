const express = require('express');
const router = express.Router();

const Food = require('../models/Food');

// @route   GET api/foods
// @desc    Get all food
// @access  Public
const getFoods = (req, res) => {
  Food.find().then((foods) => res.json(foods));
};

// @route   GET api/foods/:foodId
// @desc    Get a specific food with its id
// @access  Public
const getFoodById = (req, res) => {
  Food.findById(req.params.foodId)
    .then((food) => res.json(food))
    .catch((error) => res.status(500).json({ msg: 'pukimak' }));
};

// @route   POST api/food/add
// @desc    Add a food
// @access  Public
const addFood = (req, res) => {
  // Creates a new food object
  const newFood = new Food({
    name: req.body.name,
    price: req.body.price,
    picture: req.body.picture,
  });

  // Adds created food to DB
  newFood.save().then((item) => res.json(item));
};

// @route   DELETE api/food/delete/foodId
// @desc    Delete a food
// @access  Public
const deleteFood = (req, res) => {
  Food.findByIdAndDelete(req.params.foodId)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
};

export { getFoods, getFoodById, addFood, deleteFood };
