const express = require('express');


const adminAuth = require('../middleware/authenticate');
const orderModel = require('../models/order.model');
const router = express.Router();

// Fetch all orders
router.get('/',adminAuth, async (req, res) => {
  try {
    const orders = await orderModel.find()
    res.status(200).json(orders);
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status
router.put('/:id', adminAuth,async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

    const updatedOrder = await orderModel.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ message: 'Order status updated', updatedOrder });
  } 
  catch (err) {
    res.status(500).json({ error: 'Error updating order status' });
  }
});

module.exports = router;
