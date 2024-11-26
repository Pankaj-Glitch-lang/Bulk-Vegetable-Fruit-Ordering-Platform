import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const base_url = import.meta.env.VITE_HOST_URL;
const AdminSignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_url}/admin/signup`, formData);
      console.log(response)
      alert('Admin account created!! You can login now ')
      navigate('/admin/signin'); // Redirect to sign-in page on successful sign-up
    } catch (err) {
      setError(err.response?.data?.message || 'Error during sign-up. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Admin Sign-Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <div className="signin-prompt">
        <p>Already have an account?</p>
        <a href="/admin/signin" className="signin-link">Sign in here</a>
      </div>
    </div>
  );
};

export default AdminSignUp;
