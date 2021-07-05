import express from 'express';
const router = express.Router();
import { changeOrderStatus, createOrder, customerGetsOrders, restaurantGetsOrders } from '../controllers/orderController.js';
import { customerPrivateRoute } from '../middleware/customerAuthMiddleware.js';
import { restaurantPrivateRoute } from '../middleware/restaurentAuthMiddleware.js';

router.route('/restaurant').get(restaurantPrivateRoute, restaurantGetsOrders);
router.route('/:orderId').put(restaurantPrivateRoute, changeOrderStatus);
router.route('/').post(customerPrivateRoute, createOrder).get(customerPrivateRoute, customerGetsOrders);

export default router;
