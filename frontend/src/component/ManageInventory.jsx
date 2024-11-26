import React, { useEffect, useState } from 'react';
import axios from 'axios';
const base_url = import.meta.env.VITE_HOST_URL;
const ManageInventory = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/admin/inventory', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched Products:', response.data);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${base_url}/admin/inventory`,
        newProduct,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Added Product:', response.data);
      setProducts([...products, response.data.product]);
      setNewProduct({ name: '', price: '' }); // Clear form
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  return (
    <div className="manage-inventory">
      <h2>Manage Inventory</h2>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      {products.map((product) => (
        <div key={product._id}>
          <p>
            {product.name} - ${product.price}
          </p>
          <button>Update</button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ManageInventory;
