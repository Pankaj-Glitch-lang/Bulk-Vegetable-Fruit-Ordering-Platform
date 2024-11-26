import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">
          HomePage
        </Link>
        <Link to="/order" className="navbar-link">
          Orders
        </Link>
        <Link to="/trackorder" className="navbar-link">
          Track Order
        </Link>
        <Link to="/admin/dashboard" className="navbar-link">
          Admin Dashboard
        </Link>
        <Link to="/admin/signin" className="navbar-link">
          Admin LogIn
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
