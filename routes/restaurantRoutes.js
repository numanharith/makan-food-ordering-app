import express from 'express';
const router = express.Router();
import { restaurantUserReg, restaurantUserLogin, getRestaurantUserProfile } from '../controllers/restaurantControllers.js';
import { privateRoute } from '../middleware/authMiddleware.js'

router.post('/reg', restaurantUserReg);
router.post('/login', restaurantUserLogin);
router.route('/myprofile').get(privateRoute, getRestaurantUserProfile);

export default router;
