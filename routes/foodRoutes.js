import express from 'express';
const router = express.Router();
import { deleteFood, addFood, getFoodById, getFoods, editFood, getMyFoods, getRestaurantMenu } from '../controllers/foodController.js';
import { restaurantPrivateRoute } from '../middleware/restaurentAuthMiddleware.js';

router.route('/restaurants/:restaurantId').get(getRestaurantMenu);
router.route('/mymenu').get(restaurantPrivateRoute, getMyFoods);
router.route('/add').post(restaurantPrivateRoute, addFood);
router
.route('/:foodId')
.get(getFoodById)
.put(restaurantPrivateRoute, editFood)
.delete(restaurantPrivateRoute, deleteFood);
router.route('/').get(getFoods);

export default router;
