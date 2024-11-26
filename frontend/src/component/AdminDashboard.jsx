import React from 'react';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {
  return (
    <div >
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all key areas of the application effectively.</p><br /> 
      </header>
      <div className="dashboard-nav-container">
        <nav className="nav" >
          <button><Link to="/admin/orders" className="dashboard-link">
            Manage Orders
          </Link></button> <br /> <br />
          {/* <button><Link to="/admin/inventory" className="dashboard-link">
            Manage Inventory
          </Link></button> */}
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
