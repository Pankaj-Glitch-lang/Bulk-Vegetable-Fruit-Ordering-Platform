const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const ProductRouter = require('./routers/product.route');
const OrderRouter = require('./routers/order.route');
const InventoryRouter = require('./routers/adminInventory.routes');
const AdminOrderRouter = require('./routers/adminOrders.route');
const SignUp = require('./routers/adminSignUp');
const SignIn = require('./routers/adminSignIn');


// Configure environment variables
dotenv.config();

// Get environment variables
const uri = process.env.mongodb_uri;
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/admin/inventory',InventoryRouter)
app.use('/admin/orders',AdminOrderRouter)
app.use('/admin/signup',SignUp)
app.use('/admin/signin',SignIn)


// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Routes
app.use('/products', ProductRouter);
app.use('/orders', OrderRouter);


// Fallback route for unhandled paths
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
const startServer = async () => {
  await connectToDatabase(); // Ensure database connection
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
