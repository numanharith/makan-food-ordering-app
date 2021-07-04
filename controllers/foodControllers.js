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

// @route   DELETE api/foods/delete/foodId
// @desc    Delete a food
// @access  Private
export const deleteFood = asyncHandler(async (req, res) => {
  const food = Food.findById(req.params.foodId);
  if (food) {
    await food.deleteOne();
    res.json({ message: 'The food has been deleted.' });
  } else {
    res.status(404);
    throw new Error('The selected food is not found!');
  }
});

// @route   POST api/foods/add
// @desc    Add a food
// @access  Private
export const addFood = asyncHandler(async (req, res) => {
  const { name, price, image} = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please enter a name!');
  } else if (!price) {
    res.status(400);
    throw new Error('Please enter a price!');
  } else if (!image) {
    res.status(400);
    throw new Error('Please upload an image of the food!');
  }

  const food = await Food.create({ name, price, image });
  if (food) {
    res.json({ message: 'The food has been added.' });
  } else {
    res.status(500);
    throw new Error('New food failed to be added!');
  }
});

// @route   PUT api/foods/:foodId/edit
// @desc    Edit a food
// @access  Private
export const editFood = asyncHandler(async (req, res) => {
  const { name, price } = req.body;

  const food = await Food.findByIdAndUpdate(req.params.foodId, { name, price });
  if (food) {
    res.json({ message: 'The food has been added.' });
  } else {
    res.status(500);
    throw new Error('Food failed to be edited!');
  }
});
