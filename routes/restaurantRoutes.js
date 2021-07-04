import express from 'express';
const router = express.Router();
import { restaurantLogin } from '../controllers/restaurantControllers.js';

router.post('/login', restaurantLogin);

export default router;
