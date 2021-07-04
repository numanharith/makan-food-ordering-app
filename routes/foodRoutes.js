import express from 'express';
const router = express.Router();
import { deleteFood, addFood, getFoodById, getFoods } from '../controllers/foodControllers.js';
import { restaurantPrivateRoute } from '../middleware/restaurentAuthMiddleware.js'

router.route('/').get(getFoods);
router.route('/:foodId').get(getFoodById);
router.route('/add').post(restaurantPrivateRoute, addFood);
router.route('/delete/:foodId').delete(restaurantPrivateRoute, deleteFood); 

export default router;
