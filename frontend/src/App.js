// src/App.js
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminLoginForm from './components/AdminLoginForm';
import ContactForm from './components/ContactForm';
import UploadExcel from './components/UploadExcel';
import Admin from './pages/Admin';
import Header from './layout/header';
import Footer from './layout/footer';
import { LanguageProvider } from './components/LanguageContext';
import Home from './components/Home';
import LookupPage from './pages/LookupPage'

function FooterWrapper() {
  const location = useLocation();

  // Chỉ hiển thị footer ở đường dẫn "/"
  return location.pathname === '/' ? <Footer /> : null;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<AdminLoginForm />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/upload" element={<UploadExcel />} />
          <Route path="/lookup" element={<LookupPage />} />
        </Routes>

        <FooterWrapper />
      </Router>
    </LanguageProvider>
  );
}

export default App;
