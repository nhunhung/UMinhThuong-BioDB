// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginForm from './components/AdminLoginForm';
import Admin from './pages/Admin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/admin" />} /> */}
        {/* Trang đăng nhập */}
        {/* <Route path="/admin" element={isAuthenticated ? <Admin /> : <AdminLoginForm />} /> */}

        <Route path="/" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
