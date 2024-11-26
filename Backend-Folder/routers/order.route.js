const express = require('express');
const mongoose = require('mongoose');
const OrderModel = require('../models/order.model'); // Assuming you have an Order model defined

const OrderRouter = express.Router();

// Middleware to parse incoming JSON data
OrderRouter.use(express.json());

// Route to place a new order
OrderRouter.post('/', async (req, res) => {
  const { product, quantity, buyer_name, contact_info, delivery_address, status } = req.body;

  try {
    // Create a new order
    const newOrder = new OrderModel({
      product, 
      quantity, 
      buyer_name, 
      contact_info, 
      delivery_address, 
      status: status || 'Pending', // Default status is 'Pending'
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error placing order' });
  }
});

// Route to view an order by ID
OrderRouter.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await OrderModel.findById(orderId).populate('product')
      .populate('product', 'name price')  // Populating product details (name, price)
      .exec();
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching order' });
  }
});

// Route to update the status of an order
OrderRouter.put('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!['Pending', 'In Progress', 'Delivered'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating order status' });
  }
});

// Route to get all orders (for admin)
OrderRouter.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate('product', 'name price')  // Populating product details (name, price)
      .exec();
    
    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

module.exports = OrderRouter;
