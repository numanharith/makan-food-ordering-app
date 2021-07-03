const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    res.status(401).json({ msg: 'Unauthorized! There is no token.' });
  }

  try {
    // Validate token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload
    req.restaurant = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Unauthorized! Token is invalid' });
  }
};

module.exports = auth;