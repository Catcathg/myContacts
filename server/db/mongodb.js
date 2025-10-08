const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.error('Connection failed', error);
  }
}

module.exports = connectDB;
