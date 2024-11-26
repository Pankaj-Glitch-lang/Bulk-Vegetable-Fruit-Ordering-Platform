import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const base_url = import.meta.env.VITE_HOST_URL;
const OrderPage = () => {
  const location = useLocation();
  const product = location.state?.product || null;

  const [products, setProducts] = useState([]); // State for product list
  const [orderSuccess, setOrderSuccess] = useState(null); // State for successful order
  const [formData, setFormData] = useState({
    product: product?._id || '',
    quantity: 1,
    buyer_name: '',
    contact_info: '',
    delivery_address: '',
  });

  // Fetch product list on component load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${base_url}/products`);
        setProducts(response.data.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/orders`, formData);
      if (response.status === 201) {
        setOrderSuccess(response.data); // Save order details on success
      } else {
        alert(response.data.message || 'Failed to place order.');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Error placing order. Please try again later.');
    }
  };
console.log(orderSuccess)
  return (
    <div className="container">
      <h1 className="heading">Place Your Order</h1>

      {orderSuccess ? (
        <div className="success-container">
          <h2>Order Placed Successfully!</h2>
          <p>
            <strong>Order ID:</strong> {orderSuccess.order._id}
          </p>
          <p>Use this ID to track your order.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Product</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-control">
            <label>Buyer Name</label>
            <input
              type="text"
              name="buyer_name"
              value={formData.buyer_name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-control">
            <label>Contact Info</label>
            <input
              type="text"
              name="contact_info"
              value={formData.contact_info}
              onChange={handleChange}
              placeholder="Phone or Email"
              required
            />
          </div>

          <div className="form-control">
            <label>Delivery Address</label>
            <textarea
              name="delivery_address"
              value={formData.delivery_address}
              onChange={handleChange}
              placeholder="Enter delivery address"
              required
            />
          </div>

          <button type="submit">Place Order</button>
        </form>
      )}
    </div>
  );
};

export default OrderPage;
