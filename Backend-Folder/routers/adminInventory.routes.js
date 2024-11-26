const express = require('express');

const adminAuth = require('../middleware/authenticate');
const ProductModel = require('../models/products.model');
const router = express.Router();

// Add a new product
router.post('/',adminAuth, async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = new ProductModel({ name, price });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
});

// Update a product
router.put('/:id',adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, { name, price }, { new: true });
    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (err) {
    res.status(500).json({ error: 'Error updating product' });
  }
});

// Delete a product
router.delete('/:id',adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await ProductModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting product' });
  }
});

module.exports = router;
