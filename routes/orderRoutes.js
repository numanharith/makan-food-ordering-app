import express from 'express';
const router = express.Router();
import { createOrder } from '../controllers/orderController.js';
import { customerPrivateRoute } from '../middleware/customerAuthMiddleware.js';

router.route('/').post(customerPrivateRoute, createOrder)

export default router;
