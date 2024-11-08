import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';
import StockManagement from './components/StockManagement';
import UserManagement from './components/UserManagement';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './components/AuthContext';  // Correct path for components folder
import Dashboard from './components/Dashboard';  // New dashboard component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/stock" 
            element={
              <ProtectedRoute>
                <StockManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users" 
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
