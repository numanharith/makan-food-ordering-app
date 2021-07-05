import asyncHandler from 'express-async-handler';

// Model
import Order from '../models/order.js';

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      user: req.customer._id,
      orderItems,
      status: 'Pending'
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder);
  }
});