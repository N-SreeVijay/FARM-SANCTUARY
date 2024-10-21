const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables

// Connect to MongoDB using async/await
const connectDB = async () => {
  try {
    // Connect to MongoDB using the MONGO_URL from environment variables
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,    // Handle deprecation warnings
      useUnifiedTopology: true, // For server discovery and monitoring engine
    });

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Exit process with failure if connection fails
    process.exit(1);
  }
};

// Export the connection function to be used in other parts of the application
module.exports = connectDB;
