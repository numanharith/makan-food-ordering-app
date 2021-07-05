import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Create Schema
const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User' },
  orderItems: [
    {
      food: { type: Schema.Types.ObjectId, ref: 'Food' },
      qty: { type: Number },
    },
  ],
  status: { type: String, enum: ['Pending', 'Preparing', 'Delivering'] },
});

const Order = model('Order', orderSchema);

export default Order;
