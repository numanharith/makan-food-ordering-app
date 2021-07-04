import express from 'express';
const router = express.Router();
import { restaurantUserReg, restaurantUserLogin, getRestaurantUserProfile } from '../controllers/restaurantControllers.js';
import { restaurantPrivateRoute } from '../middleware/restaurentAuthMiddleware.js'

router.post('/reg', restaurantUserReg);
router.post('/login', restaurantUserLogin);
router.route('/myprofile').get(restaurantPrivateRoute, getRestaurantUserProfile);

export default router;
