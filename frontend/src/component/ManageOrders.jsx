import React, { useEffect, useState } from 'react';
import axios from 'axios';
const base_url = import.meta.env.VITE_HOST_URL;
const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/admin/signin';
        return;
      }

      try {
        const response = await axios.get(`${base_url}/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setError('Invalid response format.');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again later.');
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/admin/signin';
      return;
    }

    try {
      const response = await axios.put(
        `${base_url}/admin/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      setError('Failed to update order status. Please try again.');
    }
  };

  return (
    <div className="manage-orders">
      <h2>Manage Orders</h2>
      {error && <p className="error-message">{error}</p>}
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p>
              <strong>Order ID:</strong> {order._id} | <strong>Buyer:</strong> {order.buyer_name} | <strong>Status:</strong> {order.status}
            </p>
            <div className="order-buttons">
              <button
                className="status-button in-progress"
                onClick={() => updateStatus(order._id, 'In Progress')}
              >
                Mark as In Progress
              </button>
              <button
                className="status-button delivered"
                onClick={() => updateStatus(order._id, 'Delivered')}
              >
                Mark as Delivered
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageOrders;
