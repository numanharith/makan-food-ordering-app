import express from 'express';
const router = express.Router();
import { customerReg, customerLogin, getCustomerProfile } from '../controllers/customerControllers.js';
import { customerPrivateRoute } from '../middleware/customerAuthMiddleware.js'

router.post('/reg', customerReg);
router.post('/login', customerLogin);
router.route('/myprofile').get(customerPrivateRoute, getCustomerProfile);

export default router;
