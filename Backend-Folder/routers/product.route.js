const express = require('express');
const ProductModel = require('../models/products.model');

const ProductRouter = express.Router();

ProductRouter.use(express.json());

// Get all products
ProductRouter.get('/', async (req, res) => {
  try {
    const data = await ProductModel.find();
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get by product id

ProductRouter.get('/:id', async (req, res) => {
  const id=req.params.id
  try {
    const data = await ProductModel.findById(id);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new product or multiple products
ProductRouter.post('/', async (req, res) => {
  const newData = req.body; 
  try {
    const data = await ProductModel.insertMany(newData);
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product by ID
ProductRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ data: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product by ID
ProductRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = ProductRouter
