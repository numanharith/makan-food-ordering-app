import asyncHandler from 'express-async-handler';

// Model
import Order from '../models/order.js';

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, restaurant } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      customer: req.customer._id,
      orderItems,
      restaurant,
      status: 'Pending',
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @route   GET /api/orders
// @desc    Customer gets all orders
// @access  Private
export const customerGetsOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customer: req.customer._id })
    .populate('restaurant', 'name')
    .populate('orderItems.food', 'name');
  console.log(orders);
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('Failed to load.');
  }
});

// @route   GET /api/orders/restaurant
// @desc    Restaurant gets all orders
// @access  Private
export const restaurantGetsOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ restaurant: req.restaurant._id }).populate('orderItems.food', 'name');
  console.log(orders);
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('Failed to load.');
  }
});

// @route   PUT /api/orders/:orderId
// @desc    Change order status
// @access  Private
export const changeOrderStatus = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (order.status === 'Pending') {
      order.status = 'Preparing';
    } else if (order.status === 'Preparing') {
      order.status = 'Delivering';
    } else if ('Delivering') {
      order.status = 'Pending';
    }
    order.save();
    res.json('Success');
  } catch (error) {
    res.status(401).json({ msg: 'Unauthorized!' });
  }
});
