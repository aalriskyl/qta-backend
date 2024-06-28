require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const RouteUser = require('../routes/user.routes');
const coffeeMenuRoutes = require('../routes/coffeeMenuRoutes');
const orderRoutes = require('../routes/orderRoutes');

const app = express();

// Print environment variables to verify they are loaded correctly
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

// Check if MONGODB_URI is undefined
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((e) => console.error('Database connection error:', e));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/user', RouteUser);
app.use('/menu', coffeeMenuRoutes);
app.use('/orders', orderRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
