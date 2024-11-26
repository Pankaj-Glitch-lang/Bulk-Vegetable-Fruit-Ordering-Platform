import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const base_url = import.meta.env.VITE_HOST_URL;

const AdminSignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/admin/signin`, formData);
      // Save JWT in localStorage
      localStorage.setItem('token', response.data.token); 
      
      
      // Redirect to Admin Dashboard after login
      navigate('/admin/dashboard');
    } catch (err) {
      console.log(err);
      // Handle error response properly
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Admin Sign-In</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="signin-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          autoComplete='off'
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete='off'
          required
        />
        <button type="submit" className="signin-button">Sign In</button>
      </form>
      <div className="signup-prompt">
        <p>Not registered?</p>
        <Link to="/admin/signup" className="signup-link">Sign up here</Link>
      </div>
    </div>
  );
};

export default AdminSignIn;
