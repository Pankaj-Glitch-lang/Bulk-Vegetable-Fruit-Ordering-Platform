const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  buyer_name: {
    type: String,
    required: true,
  },
  contact_info: {
    type: String,
    required: true,
  },
  delivery_address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Delivered'],
    default: 'Pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
