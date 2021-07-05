import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path'
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import foodRoutes from './routes/foodRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

app.use(express.json());

// DB Config
const db = process.env.MONGODB_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/foods', foodRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));
}

app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
