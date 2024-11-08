import React, { useState } from 'react';
import '../App.css';

const UserManagement = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);

  const deleteUser = (username) => {
    const updatedUsers = users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  return (
    <div className="form-container">
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.username}>
            {user.username} 
            <button className="delete-btn" onClick={() => deleteUser(user.username)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
