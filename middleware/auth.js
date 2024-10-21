const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Ensure you have a User model set up for MongoDB
require('dotenv').config();  // Load environment variables

exports.protect = async (req, res, next) => {
  // Assuming the token is stored in cookies
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/index');  // Redirect to login if token is missing
  }

  try {
    // Verify the token using the secret key from the .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database by their ID stored in the token
    req.user = await User.findById(decoded.id);

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Return unauthorized status if token verification fails
    return res.status(401).send('Not authorized');
  }
};
