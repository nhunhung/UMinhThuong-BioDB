<<<<<<< HEAD
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm'; 
import ContactForm from './components/ContactForm';
=======
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
>>>>>>> main

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
<<<<<<< HEAD
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
=======
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
>>>>>>> main
  );
}

export default App;
