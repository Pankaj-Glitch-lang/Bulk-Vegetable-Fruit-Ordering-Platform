import React, { useState } from 'react';
import axios from 'axios';
const base_url = import.meta.env.VITE_HOST_URL;


const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);

  const handleTrackOrder = async () => {
    try {
      const response = await axios.get(`${base_url}/orders/${orderId}`);
      setOrder(response.data.order);
    } catch (err) {
      setOrder(null);
      alert('Order not found. Please check your Order ID.');
    }
  };

  return (
    <div className="track-order-container">
      <h1 className="track-order-heading">Track Your Order</h1>
      <div className="track-order-form">
        <label htmlFor="orderId" className="track-order-label">
          Order ID
        </label>
        <input
          id="orderId"
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter your Order ID"
          className="track-order-input"
        />
        <button onClick={handleTrackOrder} className="track-order-button">
          Track Order
        </button>
      </div>

      {order && (
        <div className="order-details">
          <h2 className="order-status">Order Status: {order.status}</h2>
          <p className="order-info">Buyer Name: {order.buyer_name}</p>
          <p className="order-info">Contact Info: {order.contact_info}</p>
          <p className="order-info">Delivery Address: {order.delivery_address}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
