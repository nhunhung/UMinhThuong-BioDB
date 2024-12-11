// src/App.js
import './App.css';
import { Container } from 'postcss';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginForm from './components/AdminLoginForm';
import UploadExcel from './components/UploadExcel';
import Admin from './pages/Admin';
import Header from './layout/header';
import Footer from './layout/footer';
import { LanguageProvider } from './components/LanguageContext';
import Home from './components/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <LanguageProvider>
      <Router>
      <Header />


        <Routes>

          {/* <Route path="/" element={<Navigate to="/admin" />} /> */}
          {/* Trang đăng nhập */}
          {/* <Route path="/admin" element={isAuthenticated ? <Admin /> : <AdminLoginForm />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<AdminLoginForm />} />
          <Route path="/upload" element={<UploadExcel />} />
        </Routes>
        
      </Router>
      <Footer />

    </LanguageProvider>
  );
}

export default App;
