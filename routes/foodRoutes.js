import express from 'express';
const router = express.Router();
import { deleteFood, addFood, getFoodById, getFoods, editFood } from '../controllers/foodControllers.js';
import { restaurantPrivateRoute } from '../middleware/restaurentAuthMiddleware.js';

router.route('/').get(getFoods);
router
  .route('/:foodId')
  .get(getFoodById)
  .put(restaurantPrivateRoute, editFood)
  .delete(restaurantPrivateRoute, deleteFood);
router.route('/add').post(restaurantPrivateRoute, addFood);

export default router;
