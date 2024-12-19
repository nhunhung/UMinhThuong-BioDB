import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminLoginForm from './components/AdminLoginForm';
import LoginForm from './components/LoginForm';
import UploadExcel from './components/UploadExcel';
import Admin from './pages/Admin';
import Header from './layout/header';
import Footer from './layout/footer';
import { LanguageProvider } from './components/LanguageContext';
import Home from './components/Home';
import LookupPage from './pages/LookupPage';
import ContactForm from './components/ContactForm';
import Search from './pages/Search';

function HeaderWrapper() {
  const location = useLocation();
  // Không hiển thị header ở các trang admin và login
  const excludedPaths = ['/admin', '/admin-login', '/login'];
  return excludedPaths.includes(location.pathname) ? null : <Header />;
}

function FooterWrapper() {
  const location = useLocation();
  // Không hiển thị footer ở các trang admin và login
  const excludedPaths = ['/admin', '/admin-login', '/login', '/contact', '/search'];
  return excludedPaths.includes(location.pathname) ? null : <Footer />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        <HeaderWrapper />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<AdminLoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/upload" element={<UploadExcel />} />
          <Route path="/search" element={<LookupPage />} />
          <Route path="/admin-search" element={<Search />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
        <FooterWrapper />
      </Router>
    </LanguageProvider>
  );
}

export default App;
