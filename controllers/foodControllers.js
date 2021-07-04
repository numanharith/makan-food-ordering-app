import asyncHandler from 'express-async-handler';

// Model
import Food from '../models/food.js';

// @route   GET api/foods
// @desc    Get all food
// @access  Public
export const getFoods = asyncHandler(async (req, res) => {
  const foods = await Food.find();
  if (foods) {
    res.json(foods);
  } else {
    res.status(404);
    throw new Error('Failed to load.');
  }
});

// @route   GET api/foods/:foodId
// @desc    Get a specific food with its id
// @access  Public
export const getFoodById = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.foodId);
  if (food) {
    res.json(food);
  } else {
    res.status(404);
    throw new Error('Food not found.');
  }
});

// @route   POST api/food/add
// @desc    Add a food
// @access  Public
export const addFood = (req, res) => {
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
// @access  Private
export const deleteFood = asyncHandler(async (req, res) => {
  const food = Food.findById(req.params.foodId);
  if (food) {
    await food.remove();
    res.json({ message: 'The food has been deleted.' });
  } else {
    res.status(404);
    throw new Error('The selected food is not found!');
  }
});
