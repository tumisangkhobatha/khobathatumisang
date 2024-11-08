import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
  return (
    <div className="form-container">
      <h2 className="dashboard-header">Wings Cafe Inventory</h2>
      <div className="dashboard-content">
        <p>Welcome to the Wings Cafe Inventory Management System!</p>
        <div className="dashboard-links">
          <Link to="/stock" className="dashboard-link">Manage Stock</Link>
          <Link to="/users" className="dashboard-link">Manage Users</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
