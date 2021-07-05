import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Restaurant from '../models/restaurant.js';

export const restaurantPrivateRoute = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.restaurant = await Restaurant.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Unauthorized, invalid token!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Unauthorized, no token!');
  }
});
