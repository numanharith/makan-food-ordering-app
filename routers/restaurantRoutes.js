const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
// Restaurant Model
const Restaurant = require('../models/Restaurant');

module.exports = router;
