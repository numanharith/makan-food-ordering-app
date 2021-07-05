import express from 'express';
const router = express.Router();
import { restaurantUserReg, restaurantUserLogin, getRestaurantUserProfile, getRestaurants } from '../controllers/restaurantController.js';
import { restaurantPrivateRoute } from '../middleware/restaurentAuthMiddleware.js'

router.post('/reg', restaurantUserReg);
router.post('/login', restaurantUserLogin);
router.route('/myprofile').get(restaurantPrivateRoute, getRestaurantUserProfile);
router.route('/').get(getRestaurants);

export default router;
