const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// DB Config
const db = process.env.MONGODB_URI ;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/food', require('./routers/foodRoutes'));
app.use('/api/restaurant', require('./routers/restaurantRoutes'));
app.use('/api/restaurantAuth', require('./routers/restaurantAuthRoutes'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));