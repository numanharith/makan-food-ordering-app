const express = require('express');
const router = express.Router();
import { deleteFood, addFood, getFoodById, getFoods } from '../controllers/foodControllers.js';

router.route('/', get(getFoods));
router.route('/:foodId', get(getFoodById));
router.route('/add', post(addFood));
router.route('/delete/:foodId', delete(deleteFood));  

export default router;
