import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Customer from '../models/customer.js';

export const customerPrivateRoute = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.customer = await Customer.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Unauthorized!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Unauthorized!');
  }
});